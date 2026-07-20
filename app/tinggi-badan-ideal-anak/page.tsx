import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Ruler, Weight, ExternalLink } from "lucide-react";

// ============================================================
// SEO: Page metadata — targeting "tinggi badan ideal anak"
// ============================================================
export const metadata: Metadata = {
  title: "Tinggi Badan Ideal Anak 0–60 Bulan — Tabel Standar WHO",
  description:
    "Tabel lengkap tinggi dan berat badan ideal anak laki-laki dan perempuan usia 0-60 bulan berdasarkan standar WHO dan Permenkes No. 2 Tahun 2020. Cek apakah tinggi anak Anda normal.",
  openGraph: {
    title: "Tinggi Badan Ideal Anak 0–60 Bulan — Tabel Standar WHO",
    description:
      "Lihat tabel tinggi dan berat badan ideal anak berdasarkan standar WHO. Cocok untuk orang tua dan kader posyandu.",
  },
};

export default function TinggiBadanIdealPage() {
  // Height data: [age, boy_cm, girl_cm]
  const heightData: [number, number, number][] = [
    [0, 49.9, 49.1],
    [1, 54.7, 53.7],
    [2, 58.4, 57.1],
    [3, 61.4, 59.8],
    [4, 63.9, 62.1],
    [5, 65.9, 64.0],
    [6, 67.6, 65.7],
    [7, 69.2, 67.3],
    [8, 70.6, 68.7],
    [9, 72.0, 70.1],
    [10, 73.3, 71.5],
    [11, 74.5, 72.8],
    [12, 75.7, 74.0],
    [13, 76.9, 75.2],
    [14, 78.0, 76.4],
    [15, 79.1, 77.5],
    [16, 80.2, 78.6],
    [17, 81.2, 79.7],
    [18, 82.3, 80.7],
    [19, 83.2, 81.7],
    [20, 84.2, 82.7],
    [21, 85.1, 83.7],
    [22, 86.0, 84.6],
    [23, 86.9, 85.5],
    [24, 87.8, 86.4],
    [25, 88.6, 87.2],
    [26, 89.4, 88.0],
    [27, 90.2, 88.8],
    [28, 91.0, 89.6],
    [29, 91.8, 90.4],
    [30, 92.5, 91.1],
    [31, 93.2, 91.8],
    [32, 93.9, 92.5],
    [33, 94.6, 93.2],
    [34, 95.3, 93.9],
    [35, 96.0, 94.6],
    [36, 96.7, 95.2],
    [37, 97.3, 95.9],
    [38, 97.9, 96.5],
    [39, 98.5, 97.1],
    [40, 99.1, 97.7],
    [41, 99.7, 98.3],
    [42, 100.3, 98.9],
    [43, 100.9, 99.5],
    [44, 101.4, 100.0],
    [45, 102.0, 100.6],
    [46, 102.5, 101.1],
    [47, 103.0, 101.6],
    [48, 103.5, 102.1],
    [49, 104.0, 102.6],
    [50, 104.5, 103.1],
    [51, 105.0, 103.6],
    [52, 105.5, 104.1],
    [53, 106.0, 104.6],
    [54, 106.4, 105.0],
    [55, 106.9, 105.5],
    [56, 107.3, 105.9],
    [57, 107.8, 106.4],
    [58, 108.2, 106.8],
    [59, 108.6, 107.2],
    [60, 109.0, 107.6],
  ];

  // Weight data: [age, boy_kg, girl_kg]
  const weightData: [number, number, number][] = [
    [0, 3.3, 3.2],
    [1, 4.5, 4.2],
    [2, 5.6, 5.1],
    [3, 6.4, 5.8],
    [4, 7.0, 6.4],
    [5, 7.5, 6.9],
    [6, 7.9, 7.3],
    [7, 8.3, 7.6],
    [8, 8.6, 7.9],
    [9, 8.9, 8.2],
    [10, 9.2, 8.5],
    [11, 9.4, 8.7],
    [12, 9.6, 8.9],
    [13, 9.9, 9.2],
    [14, 10.1, 9.4],
    [15, 10.3, 9.6],
    [16, 10.5, 9.8],
    [17, 10.7, 10.0],
    [18, 10.9, 10.2],
    [19, 11.1, 10.4],
    [20, 11.3, 10.6],
    [21, 11.5, 10.8],
    [22, 11.7, 10.9],
    [23, 11.8, 11.1],
    [24, 12.0, 11.3],
    [25, 12.2, 11.5],
    [26, 12.4, 11.7],
    [27, 12.5, 11.8],
    [28, 12.7, 12.0],
    [29, 12.9, 12.2],
    [30, 13.0, 12.3],
    [31, 13.2, 12.5],
    [32, 13.3, 12.6],
    [33, 13.5, 12.8],
    [34, 13.6, 12.9],
    [35, 13.8, 13.1],
    [36, 13.9, 13.2],
    [37, 14.1, 13.4],
    [38, 14.2, 13.5],
    [39, 14.4, 13.7],
    [40, 14.5, 13.8],
    [41, 14.7, 14.0],
    [42, 14.8, 14.1],
    [43, 15.0, 14.3],
    [44, 15.1, 14.4],
    [45, 15.3, 14.6],
    [46, 15.4, 14.7],
    [47, 15.6, 14.9],
    [48, 15.7, 15.0],
    [49, 15.9, 15.2],
    [50, 16.0, 15.3],
    [51, 16.2, 15.5],
    [52, 16.3, 15.6],
    [53, 16.5, 15.8],
    [54, 16.6, 15.9],
    [55, 16.8, 16.1],
    [56, 16.9, 16.2],
    [57, 17.1, 16.4],
    [58, 17.2, 16.5],
    [59, 17.4, 16.7],
    [60, 17.5, 16.8],
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-xs text-slate-500" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="underline hover:text-emerald-600">Beranda</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-800" aria-current="page">Tinggi Badan Ideal Anak</li>
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
              { "@type": "ListItem", position: 2, name: "Tinggi Badan Ideal Anak", item: "https://posyandu-digital-cerdas.vercel.app/tinggi-badan-ideal-anak" },
            ],
          }),
        }}
      />

      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Tinggi dan Berat Badan Ideal Anak 0–60 Bulan</h1>
      <p className="mt-3 text-base leading-7 text-slate-600">
        Tabel lengkap tinggi dan berat badan ideal anak berdasarkan standar WHO. Gunakan sebagai referensi untuk memantau tumbuh kembang anak Anda.
      </p>

      {/* Section: Penjelasan */}
      <section className="mt-8" aria-labelledby="penjelasan">
        <div className="glass-card soft-ring rounded-2xl p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-teal-100 p-3 text-teal-600">
              <GraduationCap className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h2 id="penjelasan" className="text-xl font-bold text-slate-900 sm:text-2xl">Tinggi Badan Ideal Anak Berdasarkan Standar WHO</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  <strong>Standar pertumbuhan anak WHO</strong> (World Health Organization) adalah acuan global yang digunakan untuk menilai apakah pertumbuhan fisik seorang anak berjalan normal. Standar ini diadopsi oleh Kementerian Kesehatan RI melalui <strong>Permenkes No. 2 Tahun 2020</strong>.
                </p>
                <p>
                  Tabel di bawah menunjukkan nilai <strong>median</strong> (rata-rata) tinggi dan berat badan ideal anak laki-laki dan perempuan usia 0–60 bulan. Perlu diingat bahwa variasi normal berada dalam rentang ±2 SD (standar deviasi). Artinya, anak yang tingginya sedikit di bawah atau di atas nilai median belum tentu bermasalah.
                </p>
                <p>
                  Jika tinggi atau berat anak Anda berada jauh di bawah nilai median (Z-score {"<"} -2 SD), segera lakukan <Link href="/" className="text-emerald-600 underline">skrining stunting</Link> dan konsultasi ke tenaga kesehatan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabel Tinggi Badan */}
      <section className="mt-6" aria-labelledby="tabel-tinggi">
        <div className="glass-card soft-ring rounded-2xl p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-600">
              <Ruler className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h2 id="tabel-tinggi" className="text-xl font-bold text-slate-900 sm:text-2xl">Tabel Tinggi Badan Ideal Anak (cm)</h2>
              <p className="mt-2 text-sm text-slate-500">Berdasarkan standar WHO — nilai median</p>
              <div className="mt-4 max-h-[500px] overflow-y-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="sticky top-0 bg-slate-100">
                    <tr className="border-b border-slate-300">
                      <th className="px-3 py-2 font-semibold text-slate-800">Usia (Bulan)</th>
                      <th className="px-3 py-2 font-semibold text-slate-800">Laki-laki (cm)</th>
                      <th className="px-3 py-2 font-semibold text-slate-800">Perempuan (cm)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {heightData.map(([age, boy, girl]) => (
                      <tr key={age} className="hover:bg-slate-50">
                        <td className="px-3 py-1.5 font-medium">{age}</td>
                        <td className="px-3 py-1.5">{boy.toFixed(1)}</td>
                        <td className="px-3 py-1.5">{girl.toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabel Berat Badan */}
      <section className="mt-6" aria-labelledby="tabel-berat">
        <div className="glass-card soft-ring rounded-2xl p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-sky-100 p-3 text-sky-600">
              <Weight className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h2 id="tabel-berat" className="text-xl font-bold text-slate-900 sm:text-2xl">Tabel Berat Badan Ideal Anak (kg)</h2>
              <p className="mt-2 text-sm text-slate-500">Berdasarkan standar WHO — nilai median</p>
              <div className="mt-4 max-h-[500px] overflow-y-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="sticky top-0 bg-slate-100">
                    <tr className="border-b border-slate-300">
                      <th className="px-3 py-2 font-semibold text-slate-800">Usia (Bulan)</th>
                      <th className="px-3 py-2 font-semibold text-slate-800">Laki-laki (kg)</th>
                      <th className="px-3 py-2 font-semibold text-slate-800">Perempuan (kg)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {weightData.map(([age, boy, girl]) => (
                      <tr key={age} className="hover:bg-slate-50">
                        <td className="px-3 py-1.5 font-medium">{age}</td>
                        <td className="px-3 py-1.5">{boy.toFixed(1)}</td>
                        <td className="px-3 py-1.5">{girl.toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cara Menggunakan */}
      <section className="mt-6" aria-labelledby="cara-gunakan">
        <div className="glass-card soft-ring rounded-2xl p-6 sm:p-8">
          <h2 id="cara-gunakan" className="text-xl font-bold text-slate-900 sm:text-2xl">Cara Menggunakan Tabel Ini</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
            <ol className="ml-5 list-decimal space-y-2">
              <li>Cari baris yang sesuai dengan <strong>usia anak</strong> dalam bulan.</li>
              <li>Pilih kolom sesuai <strong>jenis kelamin</strong> anak (laki-laki atau perempuan).</li>
              <li>Bandingkan tinggi/berat anak Anda dengan nilai di tabel.</li>
              <li>Jika selisihnya besar (lebih dari 2 SD), gunakan <Link href="/" className="text-emerald-600 underline">kalkulator Z-score</Link> untuk perhitungan yang lebih akurat.</li>
            </ol>
            <p className="mt-3">
              <strong>Catatan:</strong> Tabel ini hanya menunjukkan nilai median. Untuk penilaian yang lebih komprehensif, gunakan alat <Link href="/" className="text-emerald-600 underline">skrining stunting</Link> kami yang menghitung Z-score secara otomatis.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-6">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white sm:p-8">
          <h2 className="text-xl font-bold sm:text-2xl">Cek Status Gizi Anak Sekarang</h2>
          <p className="mt-2 text-sm leading-6 text-white/85">
            Gunakan kalkulator Z-score otomatis untuk mengetahui status gizi anak secara lengkap.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-emerald-700 shadow-lg transition hover:bg-white/90"
            >
              Mulai Skrining
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/cara-menghitung-z-score"
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 px-5 py-3 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/25"
            >
              Pelajari Z-Score
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900">
        <p><strong>Peringatan:</strong> Tabel ini bersifat referensi. Konsultasikan ke dokter untuk evaluasi tumbuh kembang anak.</p>
      </div>
    </main>
  );
}