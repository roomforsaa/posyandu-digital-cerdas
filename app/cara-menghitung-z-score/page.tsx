import type { Metadata } from "next";
import Link from "next/link";
import { Scale, Calculator, BookOpen, ExternalLink } from "lucide-react";

// ============================================================
// SEO: Page metadata — targeting "cara menghitung Z-score"
// ============================================================
export const metadata: Metadata = {
  title: "Cara Menghitung Z-Score Anak (TB/U, BB/U, BB/TB) — Panduan WHO",
  description:
    "Pelajari cara menghitung Z-score untuk status gizi anak: TB/U, BB/U, dan BB/TB berdasarkan standar antropometri WHO dan Permenkes No. 2 Tahun 2020. Lengkap dengan contoh perhitungan.",
  openGraph: {
    title: "Cara Menghitung Z-Score Anak — TB/U, BB/U, BB/TB",
    description:
      "Pahami rumus dan cara menghitung Z-score untuk deteksi stunting pada anak balita. Dilengkapi contoh perhitungan sederhana.",
  },
};

export default function CaraMenghitungZScorePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-xs text-slate-500" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="underline hover:text-emerald-600">Beranda</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-800" aria-current="page">Cara Menghitung Z-Score</li>
        </ol>
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Beranda", item: "https://posyandu-digital-cerdas.vercel.app/" },
              { "@type": "ListItem", position: 2, name: "Cara Menghitung Z-Score", item: "https://posyandu-digital-cerdas.vercel.app/cara-menghitung-z-score" },
            ],
          }),
        }}
      />

      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Cara Menghitung Z-Score untuk Status Gizi Anak</h1>
      <p className="mt-3 text-base leading-7 text-slate-600">
        Panduan lengkap memahami rumus Z-score TB/U, BB/U, dan BB/TB berdasarkan standar WHO untuk deteksi stunting pada anak balita.
      </p>

      {/* Section 1: Apa Itu Z-Score */}
      <section className="mt-8" aria-labelledby="apa-itu-zscore">
        <div className="glass-card soft-ring rounded-2xl p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-sky-100 p-3 text-sky-600">
              <Calculator className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h2 id="apa-itu-zscore" className="text-xl font-bold text-slate-900 sm:text-2xl">Apa Itu Z-Score?</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  <strong>Z-score</strong> adalah nilai statistik yang menunjukkan seberapa jauh data seorang anak menyimpang dari nilai median (nilai tengah) populasi referensi WHO. Dalam konteks gizi anak, Z-score digunakan untuk menentukan status gizi berdasarkan tiga indikator: TB/U, BB/U, dan BB/TB.
                </p>
                <p>
                  Rumus dasar Z-score adalah:
                </p>
                <div className="rounded-xl bg-slate-100 p-4 text-center font-mono text-sm">
                  <strong>Z = (Nilai Anak − Nilai Median) ÷ Standar Deviasi (SD)</strong>
                </div>
                <p>
                  Di mana nilai median dan standar deviasi diambil dari tabel referensi WHO untuk usia dan jenis kelamin yang sesuai.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Interpretasi Z-Score */}
      <section className="mt-6" aria-labelledby="interpretasi">
        <div className="glass-card soft-ring rounded-2xl p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-600">
              <BookOpen className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h2 id="interpretasi" className="text-xl font-bold text-slate-900 sm:text-2xl">Cara Membaca Nilai Z-Score</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
                <p>Berikut tabel interpretasi Z-score untuk masing-masing indikator:</p>

                <h3 className="font-semibold text-slate-900">TB/U (Tinggi Badan menurut Usia)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-slate-300">
                        <th className="pb-2 font-semibold text-slate-800">Z-Score</th>
                        <th className="pb-2 font-semibold text-slate-800">Status</th>
                        <th className="pb-2 font-semibold text-slate-800">Artinya</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr><td className="py-2">{"<"} -3 SD</td><td className="font-semibold text-red-700">Sangat Pendek</td><td>Stunting berat</td></tr>
                      <tr><td className="py-2">-3 SD hingga {"<"} -2 SD</td><td className="font-semibold text-amber-700">Pendek</td><td>Stunting</td></tr>
                      <tr><td className="py-2">-2 SD hingga +3 SD</td><td className="font-semibold text-emerald-700">Normal</td><td>Tinggi sesuai usia</td></tr>
                      <tr><td className="py-2">{">"} +3 SD</td><td className="font-semibold text-blue-700">Tinggi</td><td>Di atas rata-rata</td></tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="mt-4 font-semibold text-slate-900">BB/U (Berat Badan menurut Usia)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-slate-300">
                        <th className="pb-2 font-semibold text-slate-800">Z-Score</th>
                        <th className="pb-2 font-semibold text-slate-800">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr><td className="py-2">{"<"} -3 SD</td><td className="font-semibold text-red-700">Sangat Kurang</td></tr>
                      <tr><td className="py-2">-3 SD hingga {"<"} -2 SD</td><td className="font-semibold text-amber-700">Kurang</td></tr>
                      <tr><td className="py-2">-2 SD hingga +2 SD</td><td className="font-semibold text-emerald-700">Normal</td></tr>
                      <tr><td className="py-2">{">"} +2 SD</td><td className="font-semibold text-orange-700">Lebih</td></tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="mt-4 font-semibold text-slate-900">BB/TB (Berat Badan menurut Tinggi Badan)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-slate-300">
                        <th className="pb-2 font-semibold text-slate-800">Z-Score</th>
                        <th className="pb-2 font-semibold text-slate-800">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr><td className="py-2">{"<"} -3 SD</td><td className="font-semibold text-red-700">Sangat Kurus</td></tr>
                      <tr><td className="py-2">-3 SD hingga {"<"} -2 SD</td><td className="font-semibold text-amber-700">Kurus</td></tr>
                      <tr><td className="py-2">-2 SD hingga +2 SD</td><td className="font-semibold text-emerald-700">Normal</td></tr>
                      <tr><td className="py-2">{">"} +2 SD</td><td className="font-semibold text-orange-700">Gemuk</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Contoh Perhitungan */}
      <section className="mt-6" aria-labelledby="contoh">
        <div className="glass-card soft-ring rounded-2xl p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-teal-100 p-3 text-teal-600">
              <Scale className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h2 id="contoh" className="text-xl font-bold text-slate-900 sm:text-2xl">Contoh Perhitungan Z-Score</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
                <p><strong>Kasus:</strong> Seorang anak laki-laki berusia 24 bulan memiliki tinggi badan 80 cm dan berat badan 9 kg.</p>

                <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <h3 className="font-semibold text-slate-900">1. Hitung Z-score TB/U</h3>
                  <p>Dari tabel WHO, median tinggi anak laki-laki usia 24 bulan = 87,8 cm, SD = 3,2 cm.</p>
                  <p className="mt-2 font-mono text-sm">Z = (80 − 87,8) ÷ 3,2 = -7,8 ÷ 3,2 = <strong className="text-red-600">-2,44</strong></p>
                  <p className="mt-1">Karena -2,44 {"<"} -2 SD, anak ini masuk kategori <strong>Pendek (Stunting)</strong>.</p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <h3 className="font-semibold text-slate-900">2. Hitung Z-score BB/U</h3>
                  <p>Dari tabel WHO, median berat anak laki-laki usia 24 bulan = 12,0 kg, SD = 1,4 kg.</p>
                  <p className="mt-2 font-mono text-sm">Z = (9 − 12,0) ÷ 1,4 = -3,0 ÷ 1,4 = <strong className="text-red-600">-2,14</strong></p>
                  <p className="mt-1">Karena -2,14 {"<"} -2 SD, anak ini masuk kategori <strong>Kurang</strong> (underweight).</p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <h3 className="font-semibold text-slate-900">3. Hitung Z-score BB/TB (pendekatan BMI)</h3>
                  <p>BMI = 9 ÷ (0,80 × 0,80) = 9 ÷ 0,64 = 14,06. Median BMI anak = 16,0, SD = 1,5.</p>
                  <p className="mt-2 font-mono text-sm">Z = (14,06 − 16,0) ÷ 1,5 = -1,94 ÷ 1,5 = <strong className="text-amber-600">-1,29</strong></p>
                  <p className="mt-1">Z-score -1,29 masih dalam rentang normal (-2 SD hingga +2 SD), artinya proporsi BB/TB <strong>Normal</strong>.</p>
                </div>

                <p className="text-xs text-slate-500">* Ini adalah contoh ilustrasi. Kalkulator di website ini menghitung secara otomatis.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Kenapa Ini Penting */}
      <section className="mt-6" aria-labelledby="penting">
        <div className="glass-card soft-ring rounded-2xl p-6 sm:p-8">
          <h2 id="penting" className="text-xl font-bold text-slate-900 sm:text-2xl">Kenapa Perhitungan Z-Score Penting?</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
            <p>
              <strong>Skrining stunting</strong> menggunakan Z-score adalah standar emas (gold standard) yang direkomendasikan oleh WHO dan diadopsi oleh Kementerian Kesehatan RI melalui <strong>Permenkes No. 2 Tahun 2020</strong>. Dengan Z-score, kita bisa:
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>Mendeteksi stunting secara dini sebelum kondisi menjadi parah</li>
              <li>Membandingkan pertumbuhan anak secara objektif dengan standar global</li>
              <li>Memantau perubahan status gizi dari waktu ke waktu</li>
              <li>Menentukan intervensi gizi yang tepat</li>
            </ul>
            <p>
              Gunakan <Link href="/" className="text-emerald-600 underline">kalkulator Z-score otomatis</Link> kami untuk menghitung tanpa ribet.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-6">
        <div className="rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-600 p-6 text-white sm:p-8">
          <h2 className="text-xl font-bold sm:text-2xl">Hitung Z-Score Anak Secara Otomatis</h2>
          <p className="mt-2 text-sm leading-6 text-white/85">
            Tidak perlu menghitung manual. Masukkan data anak dan sistem akan menghitung Z-score beserta status gizi lengkap.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-sky-700 shadow-lg transition hover:bg-white/90"
            >
              Mulai Skrining Sekarang
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/tinggi-badan-ideal-anak"
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 px-5 py-3 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/25"
            >
              Lihat Tabel Tinggi Ideal
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900">
        <p><strong>Peringatan:</strong> Hasil perhitungan Z-score bersifat indikatif. Konsultasikan ke dokter untuk diagnosis dan penanganan lebih lanjut.</p>
      </div>
    </main>
  );
}