import { GoogleGenAI } from "@google/genai";

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

async function callGemini(
  apiKey: string,
  data: Parameters<typeof buildPrompt>[0]
) {
  const ai = new GoogleGenAI({ apiKey });

  return ai.interactions.create({
    model: "gemini-3.5-flash",
    input: buildPrompt(data),
  });
}

export async function POST(req: Request) {
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