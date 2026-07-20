import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Berat Badan Ideal Bayi dan Balita 0–60 Bulan — Standar WHO",
  description:
    "Tabel berat badan ideal bayi dan balita usia 0-60 bulan berdasarkan standar WHO. Cek apakah berat badan anak Anda normal, kurang, atau lebih. Lengkap dengan panduan skrining.",
  openGraph: {
    title: "Berat Badan Ideal Bayi dan Balita 0–60 Bulan — Standar WHO",
    description:
      "Panduan lengkap berat badan ideal bayi dan balita berdasarkan standar WHO. Cocok untuk orang tua dan kader posyandu.",
  },
};

export default function BeratBadanIdealPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 text-xs text-slate-500" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="underline hover:text-emerald-600">Beranda</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/" className="underline hover:text-emerald-600">Blog</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-800" aria-current="page">Berat Badan Ideal Bayi</li>
        </ol>
      </nav>

      <article>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Berat Badan Ideal Bayi dan Balita Usia 0–60 Bulan</h1>

        <div className="mt-8 space-y-5 text-sm leading-7 text-slate-700 sm:text-base sm:leading-8">
          <p>
            Memantau <strong>berat badan ideal bayi dan balita</strong> adalah salah satu cara paling penting untuk memastikan tumbuh kembang anak berjalan optimal. Berat badan yang tidak sesuai standar bisa menjadi indikasi awal masalah gizi, termasuk risiko <strong>stunting</strong>.
          </p>

          <h2 className="text-xl font-bold text-slate-900">Mengapa Berat Badan Penting?</h2>
          <p>
            Berat badan adalah indikator yang paling sensitif untuk menilai status gizi anak dalam jangka pendek. Jika berat badan anak tidak naik sesuai standar, ini bisa menandakan:
          </p>
          <ul className="ml-5 list-disc space-y-2">
            <li>Asupan gizi yang tidak mencukupi</li>
            <li>Adanya infeksi atau penyakit kronis</li>
            <li>Gangguan penyerapan nutrisi</li>
            <li>Risiko awal stunting atau underweight</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900">Standar Berat Badan Ideal Bayi (0–12 Bulan)</h2>
          <p>Berikut adalah rentang berat badan ideal bayi berdasarkan standar WHO:</p>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100">
                <tr className="border-b border-slate-300">
                  <th className="px-3 py-2 font-semibold text-slate-800">Usia</th>
                  <th className="px-3 py-2 font-semibold text-slate-800">Bayi Laki-laki (kg)</th>
                  <th className="px-3 py-2 font-semibold text-slate-800">Bayi Perempuan (kg)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr><td className="px-3 py-2">0 bulan</td><td>3,3 kg</td><td>3,2 kg</td></tr>
                <tr><td className="px-3 py-2">1 bulan</td><td>4,5 kg</td><td>4,2 kg</td></tr>
                <tr><td className="px-3 py-2">2 bulan</td><td>5,6 kg</td><td>5,1 kg</td></tr>
                <tr><td className="px-3 py-2">3 bulan</td><td>6,4 kg</td><td>5,8 kg</td></tr>
                <tr><td className="px-3 py-2">4 bulan</td><td>7,0 kg</td><td>6,4 kg</td></tr>
                <tr><td className="px-3 py-2">5 bulan</td><td>7,5 kg</td><td>6,9 kg</td></tr>
                <tr><td className="px-3 py-2">6 bulan</td><td>7,9 kg</td><td>7,3 kg</td></tr>
                <tr><td className="px-3 py-2">7 bulan</td><td>8,3 kg</td><td>7,6 kg</td></tr>
                <tr><td className="px-3 py-2">8 bulan</td><td>8,6 kg</td><td>7,9 kg</td></tr>
                <tr><td className="px-3 py-2">9 bulan</td><td>8,9 kg</td><td>8,2 kg</td></tr>
                <tr><td className="px-3 py-2">10 bulan</td><td>9,2 kg</td><td>8,5 kg</td></tr>
                <tr><td className="px-3 py-2">11 bulan</td><td>9,4 kg</td><td>8,7 kg</td></tr>
                <tr><td className="px-3 py-2">12 bulan</td><td>9,6 kg</td><td>8,9 kg</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-slate-900">Standar Berat Badan Ideal Balita (1–5 Tahun)</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100">
                <tr className="border-b border-slate-300">
                  <th className="px-3 py-2 font-semibold text-slate-800">Usia</th>
                  <th className="px-3 py-2 font-semibold text-slate-800">Laki-laki (kg)</th>
                  <th className="px-3 py-2 font-semibold text-slate-800">Perempuan (kg)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr><td className="px-3 py-2">12 bulan</td><td>9,6 kg</td><td>8,9 kg</td></tr>
                <tr><td className="px-3 py-2">18 bulan</td><td>10,9 kg</td><td>10,2 kg</td></tr>
                <tr><td className="px-3 py-2">24 bulan</td><td>12,0 kg</td><td>11,3 kg</td></tr>
                <tr><td className="px-3 py-2">30 bulan</td><td>13,0 kg</td><td>12,3 kg</td></tr>
                <tr><td className="px-3 py-2">36 bulan</td><td>13,9 kg</td><td>13,2 kg</td></tr>
                <tr><td className="px-3 py-2">42 bulan</td><td>14,8 kg</td><td>14,1 kg</td></tr>
                <tr><td className="px-3 py-2">48 bulan</td><td>15,7 kg</td><td>15,0 kg</td></tr>
                <tr><td className="px-3 py-2">54 bulan</td><td>16,6 kg</td><td>15,9 kg</td></tr>
                <tr><td className="px-3 py-2">60 bulan</td><td>17,5 kg</td><td>16,8 kg</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-slate-900">Cara Menilai Berat Badan Anak</h2>
          <p>
            Untuk menilai apakah berat badan anak ideal, gunakan indikator <strong>BB/U (Berat Badan menurut Usia)</strong>:
          </p>
          <ul className="ml-5 list-disc space-y-2">
            <li>Z-score {"<"} -3 SD: <strong>Sangat Kurang</strong> (gizi buruk)</li>
            <li>Z-score -3 SD hingga {"<"} -2 SD: <strong>Kurang</strong> (underweight)</li>
            <li>Z-score -2 SD hingga +2 SD: <strong>Normal</strong></li>
            <li>Z-score {">"} +2 SD: <strong>Lebih</strong> (overweight)</li>
          </ul>
          <p>
            Gunakan <Link href="/" className="text-emerald-600 underline">kalkulator Z-score</Link> kami untuk menghitung secara otomatis. Lihat juga <Link href="/tinggi-badan-ideal-anak" className="text-emerald-600 underline">tabel tinggi badan ideal anak</Link> untuk pemantauan yang lebih lengkap.
          </p>

          <h2 className="text-xl font-bold text-slate-900">Tips Menjaga Berat Badan Ideal Anak</h2>
          <ol className="ml-5 list-decimal space-y-2">
            <li>Berikan ASI eksklusif selama 6 bulan pertama.</li>
            <li>Mulai MPASI bergizi tinggi protein hewani pada usia 6 bulan.</li>
            <li>Pantau berat badan setiap bulan di Posyandu.</li>
            <li>Catat grafik pertumbuhan di KMS (Kartu Menuju Sehat).</li>
            <li>Segera konsultasi ke dokter jika berat badan tidak naik dalam 2 bulan.</li>
          </ol>

          <p>
            Baca juga: <Link href="/blog/ciri-ciri-anak-stunting" className="text-emerald-600 underline">Ciri-ciri anak stunting sejak dini</Link> dan <Link href="/blog/makanan-bergizi-anak-1-3-tahun" className="text-emerald-600 underline">makanan bergizi untuk anak 1-3 tahun</Link>.
          </p>
        </div>
      </article>

      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900">
        <p><strong>Peringatan:</strong> Tabel ini bersifat referensi. Konsultasikan ke dokter untuk evaluasi tumbuh kembang anak.</p>
      </div>
    </main>
  );
}