import OpenAI from "openai";

// ──────────────────────────────────────────────────────────────
// Slot-based concurrent user limiter
// 40 slots, each held for 2 minutes per IP.
// 4 API keys, randomized per request to distribute load.
// ──────────────────────────────────────────────────────────────
const MAX_SLOTS = 40;
const SLOT_TIMEOUT_MS = 120_000; // 2 minutes

const activeSlots = new Map<string, number>(); // ip → expiresAt (timestamp)

function cleanExpiredSlots(): void {
  const now = Date.now();
  for (const [ip, expiresAt] of activeSlots) {
    if (now >= expiresAt) activeSlots.delete(ip);
  }
}

function getSlotCount(): { used: number; total: number } {
  cleanExpiredSlots();
  return { used: activeSlots.size, total: MAX_SLOTS };
}

/**
 * Try to acquire a slot for this IP.
 * Returns true if the slot was granted, false if busy or already in cooldown.
 */
function acquireSlot(ip: string): boolean {
  cleanExpiredSlots();

  // Already has an active slot → still in cooldown
  const existing = activeSlots.get(ip);
  if (existing && Date.now() < existing) return false;

  // All slots full
  if (activeSlots.size >= MAX_SLOTS) return false;

  // Grant slot
  activeSlots.set(ip, Date.now() + SLOT_TIMEOUT_MS);
  return true;
}

// ──────────────────────────────────────────────────────────────
// Prompt builder
// ──────────────────────────────────────────────────────────────
function buildPrompt(data: {
  nama: string;
  usia: number;
  gender: string;
  makanan: string;
  tb_u: { z: number; status: string };
  bb_u: { z: number; status: string };
  bb_tb: { z: number; status: string };
  risk_level: string;
  food_valid: boolean;
}) {
  const makananNote = data.food_valid
    ? data.makanan || "belum diisi"
    : "⚠️ Makanan mengandung bahan tidak layak (rokok/alkohol/kopi)";

  return `Kamu adalah asisten gizi anak yang membantu orang tua memahami hasil skrining gizi.

TUGAS KAMU HANYA:
- Menjelaskan hasil skrining dengan bahasa sederhana
- Memberi saran praktis berdasarkan data yang sudah dihitung

JANGAN:
- Jangan mengubah atau mempertanyakan status gizi yang sudah ditentukan
- Jangan menghitung ulang Z-score
- Jangan memberikan diagnosis medis

====================

DATA SKRINING (sudah dihitung oleh sistem):

Nama: ${data.nama || "Anak"}
Usia: ${data.usia} bulan
Jenis Kelamin: ${data.gender}

INDIKATOR GIZI:
1. TB/U (Tinggi Badan menurut Usia): ${data.tb_u.status} (Z-score: ${data.tb_u.z.toFixed(2)})
2. BB/U (Berat Badan menurut Usia): ${data.bb_u.status} (Z-score: ${data.bb_u.z.toFixed(2)})
3. BB/TB (Berat Badan menurut Tinggi): ${data.bb_tb.status} (Z-score: ${data.bb_tb.z.toFixed(2)})

TINGKAT RISIKO: ${data.risk_level}
- normal = pertumbuhan baik
- risiko = perlu perhatian
- serius = perlu intervensi segera

MAKANAN: ${makananNote}

====================

FORMAT OUTPUT (WAJIB IKUTI):

[Analisis Kondisi]
Jelaskan kondisi anak berdasarkan 3 indikator di atas dengan bahasa sederhana. Sebutkan mana yang perlu perhatian.

[Evaluasi Pola Makan]
Beri evaluasi berdasarkan makanan yang dikonsumsi. Jika ada makanan tidak layak, beri peringatan tegas.

[Saran Praktis]
- Minimal 3 langkah nyata yang spesifik
- Sesuaikan dengan kondisi anak (stunting/normal, risiko/serius)
- Beri contoh makanan nyata (telur, ikan, tempe, dll)

[Langkah Selanjutnya]
Apa yang harus dilakukan: posyandu, dokter, atau monitoring mandiri.

====================

Jawab langsung tanpa tambahan lain. Maksimal 130 kata.`;
}

// ──────────────────────────────────────────────────────────────
// Groq caller via OpenAI-compatible API
// ──────────────────────────────────────────────────────────────
const MODEL = "llama-3.1-8b-instant";
const BASE_URL = "https://api.groq.com/openai/v1";

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function callGroq(
  apiKey: string,
  data: Parameters<typeof buildPrompt>[0],
  maxRetries = 3
): Promise<string | null> {
  const client = new OpenAI({
    apiKey,
    baseURL: BASE_URL,
  });

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await client.responses.create({
        input: buildPrompt(data),
        model: MODEL,
      });

      const text = response.output_text;

      if (text && text.trim().length > 0) {
        return text.trim();
      }

      console.error(`Empty response from ${MODEL}`, response);
      continue;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : String(error);
      const isQuota = /quota|rate|exceed|429/i.test(message);

      if (isQuota) {
        const retryMatch = message.match(/retry after\s+([\d.]+)/i);
        const delay = retryMatch
          ? Math.min(parseFloat(retryMatch[1]) * 1000 + 1000, 65_000)
          : (attempt + 1) * 10_000;

        console.error(
          `Quota hit, retry ${attempt + 1}/${maxRetries} after ${Math.round(delay / 1000)}s`
        );

        if (attempt < maxRetries - 1) {
          await sleep(delay);
          continue;
        }
      } else {
        console.error(`${MODEL} failed: ${message}`);
        if (attempt < maxRetries - 1) {
          continue;
        }
      }

      return null;
    }
  }

  return null;
}

// ──────────────────────────────────────────────────────────────
// GET handler — returns current slot usage info
// ──────────────────────────────────────────────────────────────
export async function GET() {
  return Response.json(getSlotCount());
}

// ──────────────────────────────────────────────────────────────
// POST handler
// ──────────────────────────────────────────────────────────────
const fallbackText = `[Analisis Kondisi]
Data skrining menunjukkan perlunya perhatian pada keseimbangan gizi anak.

[Evaluasi Pola Makan]
Pola makan saat ini perlu dievaluasi untuk mendukung pertumbuhan optimal.

[Saran Praktis]
- Tambahkan telur atau tempe setiap hari
- Kurangi makanan manis dan minuman kemasan
- Berikan buah segar seperti pisang atau pepaya

[Langkah Selanjutnya]
Pantau pertumbuhan secara rutin dan konsultasi ke posyandu jika ragu.`;

const busyText = `[Analisis Kondisi]
Server sedang sibuk melayani pengguna lain.

[Saran Praktis]
Silakan tunggu beberapa saat dan coba lagi. Tombol akan aktif otomatis dalam 2 menit.

[Langkah Selanjutnya]
Coba lagi nanti dengan menekan tombol "Detail Saran".`;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ── Get client IP ─────────────────────────────────────
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // ── Slot check ────────────────────────────────────────
    if (!acquireSlot(ip)) {
      console.warn(`Slot full or cooldown active for IP: ${ip}`);
      return Response.json({ text: busyText, busy: true });
    }

    // ── Collect all API keys ──────────────────────────────
    const keys = [
      process.env.GROQ_API_KEY_1,
      process.env.GROQ_API_KEY_2,
      process.env.GROQ_API_KEY_3,
      process.env.GROQ_API_KEY_4,
    ].filter(Boolean) as string[];

    if (keys.length === 0) {
      console.warn("No Groq API keys configured");
      return Response.json({ text: fallbackText });
    }

    // ── Pick a random key ─────────────────────────────────
    const apiKey = keys[Math.floor(Math.random() * keys.length)];

    // ── Call Groq with retry ──────────────────────────────
    const result = await callGroq(apiKey, body, 3);

    if (result !== null) {
      return Response.json({ text: result });
    }

    console.error("Groq API exhausted");
    return Response.json({ text: fallbackText });
  } catch (error) {
    console.error("Server error:", error);
    return Response.json({ text: fallbackText });
  }
}