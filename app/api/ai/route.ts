import { GoogleGenAI } from "@google/genai";

function buildPrompt(body: {
  usia: number;
  tinggi: number;
  gender: string;
  status: string;
  expectedHeight?: number;
  zScore?: number;
  nama?: string;
  makanan?: string;
  foodFlag?: string;
  foodNote?: string;
}) {
  return `Kamu adalah asisten gizi anak yang membantu orang tua mengambil keputusan penting untuk masa depan anaknya.

Jawaban kamu harus:
- Jelas
- Praktis
- Langsung bisa dilakukan
- Tidak menghakimi, tapi tetap jujur

====================

DATA ANAK:
- Usia: ${body.usia} bulan
- Tinggi: ${body.tinggi} cm
- Gender: ${body.gender}
- Status pertumbuhan: ${body.status}
- Z-score: ${body.zScore?.toFixed(2) || "-"}
- Estimasi tinggi normal: ${body.expectedHeight?.toFixed(1) || "-"} cm
- Makanan hari ini: ${body.makanan || "belum diisi"}
- Ringkasan pola makan: ${body.foodFlag || "-"} (${body.foodNote || "-"})

====================

TUGAS KAMU:

Bantu orang tua memahami:
1. Kondisi anak saat ini
2. Apakah pola makan sudah membantu atau justru menghambat
3. Apa yang HARUS dilakukan mulai BESOK

====================

ATURAN PENTING:

1. WAJIB jelaskan kondisi anak secara spesifik (bandingkan dengan normal).
2. WAJIB evaluasi makanan (apakah terlalu gula, kurang protein, dll).
3. JANGAN hanya bilang "gizi seimbang".
4. WAJIB beri contoh makanan nyata:
   (telur, ayam, ikan, tempe, buah, dll)
5. Fokus ke langkah sederhana yang bisa dilakukan orang tua dengan budget terbatas.
6. Jika ada makanan tinggi gula → jelaskan dampaknya.
7. Jika stunting → tekankan pentingnya intervensi cepat.
8. Gunakan bahasa sederhana dan hangat (seperti menjelaskan ke orang tua, bukan dokter ke dokter).
9. Maksimal 130 kata.

====================

FORMAT OUTPUT (WAJIB IKUTI):

[Analisis Kondisi]
(jelaskan posisi tinggi anak vs normal dengan bahasa sederhana)

[Evaluasi Pola Makan]
(jelaskan apakah makanan membantu atau justru menghambat pertumbuhan)

[Saran Praktis]
- (minimal 3 langkah nyata, spesifik, bisa dilakukan besok)
- (contoh makanan wajib disebutkan)

[Langkah Selanjutnya]
(apa yang harus dilakukan: posyandu, dokter, atau monitoring)

====================

Jawab langsung tanpa tambahan lain.`;
}

async function callGemini(
  apiKey: string,
  body: Parameters<typeof buildPrompt>[0]
) {
  const ai = new GoogleGenAI({ apiKey });

  return ai.interactions.create({
    model: "gemini-3.5-flash",
    input: buildPrompt(body),
  });
}

export async function POST(req: Request) {
  const fallbackText = `[Analisis Kondisi]
Data anak menunjukkan perlunya perhatian pada keseimbangan antara pertumbuhan dan pola makan.

[Evaluasi Pola Makan]
Pola makan saat ini belum cukup mendukung pertumbuhan optimal.

[Saran Praktis]
- Tambahkan telur atau tempe setiap hari
- Kurangi minuman manis dan makanan ringan
- Berikan buah seperti pisang atau pepaya

[Langkah Selanjutnya]
Pantau pertumbuhan secara rutin dan konsultasi ke posyandu jika ragu.`;

  try {
    const body = await req.json();

    const keys = [
      process.env.GEMINI_API_KEY,
      process.env.GEMINI_API_KEY_2,
    ].filter(Boolean) as string[];

    if (keys.length === 0) {
      return Response.json({ text: fallbackText });
    }

    for (const apiKey of keys) {
      try {
        const interaction = await callGemini(apiKey, body);

        const text = interaction.output_text;

        if (text && text.trim().length > 0) {
          return Response.json({
            text: text.trim(),
          });
        }

        console.error("Empty Gemini response:", interaction);
        continue;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : String(error);

        console.error("Gemini error:", message);

        const isQuotaIssue = /quota|rate|exceed|token|429/i.test(message);

        if (isQuotaIssue) {
          continue;
        }

        continue;
      }
    }

    return Response.json({ text: fallbackText });
  } catch (error) {
    console.error("Server error:", error);
    return Response.json({ text: fallbackText });
  }
}