import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroCard } from "@/components/hero-card";
import { CalculatorForm } from "@/components/calculator-form";
import { ShieldAlert, BookOpen, Scale, Stethoscope, ExternalLink, GraduationCap, Users } from "lucide-react";

// ============================================================
// SEO: Page-specific metadata — keyword-rich for Indonesian SEO
// ============================================================
export const metadata: Metadata = {
  title: "Skrining Stunting Anak — Deteksi Dini Berbasis WHO",
  description:
    "Gunakan kalkulator skrining stunting gratis untuk deteksi dini risiko stunting pada anak balita (0-60 bulan). Cek tinggi badan anak, status gizi, dan Z-score berdasarkan standar WHO. Dukung oleh KKN Universitas Diponegoro.",
  openGraph: {
    title: "Skrining Stunting Anak — Deteksi Dini Berbasis WHO | Posyandu Digital",
    description:
      "Kalkulator skrining stunting gratis untuk deteksi dini risiko stunting pada anak balita berdasarkan standar WHO. Cepat, jelas, dan ramah orang tua.",
  },
  twitter: {
    title: "Skrining Stunting Anak — Deteksi Dini Berbasis WHO | Posyandu Digital",
    description:
      "Kalkulator skrining stunting gratis untuk deteksi dini risiko stunting pada anak balita berdasarkan standar WHO.",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        {/* ============================================================ */}
        {/* SEO: <header> — site branding with logo, title, and location  */}
        {/* ============================================================ */}
        <header className="glass-card soft-ring flex items-center gap-3 rounded-2xl px-4 py-3 sm:px-6">
          <Image
            src="/kkn-logo.png"
            alt="Logo KKN Posyandu Digital — Skrining Stunting Anak"
            width={48}
            height={48}
            className="h-10 w-10 shrink-0 rounded-xl object-cover shadow sm:h-12 sm:w-12"
          />
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Posyandu Digital</p>
            <h1 className="text-lg font-semibold text-slate-900 sm:text-xl">Kalkulator Skrining Stunting Anak Cerdas</h1>
            <p className="text-sm text-slate-600">
              Desa Candiareng, Kecamatan Warungasem, Kabupaten Batang, Provinsi Jawa Tengah, Kode Pos 51252
            </p>
          </div>
          <Image
            src="/undip-logo.png"
            alt="Logo Universitas Diponegoro (UNDIP) — Mitra Posyandu Digital"
            width={48}
            height={48}
            className="h-10 w-10 shrink-0 rounded-xl object-cover shadow sm:h-12 sm:w-12"
          />
        </header>

        {/* ============================================================ */}
        {/* SEO: <section> — hero + calculator (two-column on lg)        */}
        {/* ============================================================ */}
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <HeroCard />
          <CalculatorForm />
        </section>

        {/* ============================================================ */}
        {/* SEO: <section> — Disclaimer                                 */}
        {/* ============================================================ */}
        <section
          aria-label="Informasi penting tentang skrining stunting"
          className="glass-card soft-ring rounded-2xl border border-amber-200/70 px-5 py-4 text-sm text-slate-700 shadow-soft"
        >
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" aria-hidden="true" />
            <div>
              <h2 className="font-semibold text-amber-800">Penting untuk diketahui</h2>
              <p className="mt-1">
                Ini hanya <strong>skrining awal</strong>, bukan diagnosis medis. Untuk evaluasi lengkap, konsultasikan ke dokter atau tenaga kesehatan.
                Referensi utama: Permenkes No. 2 Tahun 2020 tentang Standar Antropometri Anak dan standar pertumbuhan WHO.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SEO: RICH CONTENT SECTION (below the tool) — 1000+ words     */}
        {/* TARGET KEYWORDS: skrining stunting anak, status gizi anak,   */}
        {/* tinggi badan ideal anak, z-score, WHO growth standards        */}
        {/* ============================================================ */}

        {/* --- Section A: Apa Itu Stunting? --- */}
        <section className="glass-card soft-ring rounded-2xl px-5 py-6 sm:p-8" aria-labelledby="section-stunting">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-600">
              <BookOpen className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h2 id="section-stunting" className="text-xl font-bold text-slate-900 sm:text-2xl">Apa Itu Stunting dan Mengapa Penting untuk Skrining?</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  <strong>Stunting</strong> adalah kondisi gagal tumbuh pada anak balita akibat kekurangan gizi kronis dalam waktu lama. Stunting tidak hanya membuat tinggi badan anak lebih pendek dari standar usianya, tetapi juga mengganggu perkembangan otak, sistem kekebalan tubuh, dan kemampuan belajar di masa depan.
                </p>
                <p>
                  Menurut <strong>Permenkes No. 2 Tahun 2020</strong>, stunting didefinisikan berdasarkan indeks Tinggi Badan menurut Usia (TB/U) dengan Z-score kurang dari -2 SD (standar deviasi) dari median standar pertumbuhan WHO. Dengan kata lain, jika tinggi badan anak berada di bawah ambang normal untuk usianya, anak tersebut berisiko stunting.
                </p>
                <p>
                  Oleh karena itu, <strong>skrining stunting anak</strong> secara rutin sangat penting. Dengan deteksi dini, orang tua bisa segera mengambil langkah perbaikan gizi dan konsultasi ke tenaga kesehatan sebelum kondisi semakin parah.
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href="/apa-itu-stunting"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 underline-offset-2 hover:bg-emerald-100 hover:underline transition-colors"
                >
                  Baca selengkapnya tentang stunting
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* --- Section B: Cara Kerja Skrining Ini --- */}
        <section className="glass-card soft-ring rounded-2xl px-5 py-6 sm:p-8" aria-labelledby="section-cara-kerja">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-sky-100 p-3 text-sky-600">
              <Scale className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h2 id="section-cara-kerja" className="text-xl font-bold text-slate-900 sm:text-2xl">Cara Kerja Skrining Stunting dan Cara Hitung Z-Score</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  Alat ini menggunakan metode <strong>Z-score</strong> berdasarkan standar antropometri WHO untuk menghitung status gizi anak. Anda cukup memasukkan <strong>usia (bulan), jenis kelamin, tinggi badan (cm), dan berat badan (kg)</strong> anak. Sistem kemudian membandingkan data tersebut dengan tabel referensi WHO untuk menghasilkan tiga indikator utama:
                </p>
                <ul className="ml-5 list-disc space-y-2">
                  <li><strong>TB/U (Tinggi Badan menurut Usia)</strong> — indikator utama stunting. Menunjukkan apakah tinggi anak sesuai dengan rata-rata anak seusianya.</li>
                  <li><strong>BB/U (Berat Badan menurut Usia)</strong> — menunjukkan status berat badan anak. Bisa menunjukkan kurang gizi, normal, atau kelebihan berat badan.</li>
                  <li><strong>BB/TB (Berat Badan menurut Tinggi Badan)</strong> — menunjukkan proporsi tubuh anak, apakah kurus, normal, atau gemuk.</li>
                </ul>
                <p>
                  <strong>Z-score</strong> adalah nilai yang menunjukkan seberapa jauh data anak menyimpang dari median populasi referensi WHO. Misalnya, Z-score TB/U -2,5 berarti tinggi anak 2,5 standar deviasi di bawah rata-rata anak seusianya — ini masuk kategori <strong>stunting (pendek)</strong>.
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href="/cara-menghitung-z-score"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 underline-offset-2 hover:bg-sky-100 hover:underline transition-colors"
                >
                  Pelajari cara menghitung Z-score
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* --- Section C: Standar WHO Tinggi Badan Anak --- */}
        <section className="glass-card soft-ring rounded-2xl px-5 py-6 sm:p-8" aria-labelledby="section-who">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-teal-100 p-3 text-teal-600">
              <GraduationCap className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h2 id="section-who" className="text-xl font-bold text-slate-900 sm:text-2xl">Standar WHO untuk Tinggi dan Berat Badan Ideal Anak</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  Organisasi Kesehatan Dunia (<strong>WHO</strong>) telah menetapkan <strong>standar pertumbuhan anak</strong> global yang digunakan di lebih dari 140 negara, termasuk Indonesia. Standar ini didasarkan pada data anak-anak yang mendapat ASI eksklusif dan tumbuh dalam kondisi optimal. Pemerintah Indonesia mengadopsi standar ini melalui <strong>Permenkes No. 2 Tahun 2020</strong>.
                </p>
                <p>
                  Secara umum, berikut <strong>tinggi badan ideal anak</strong> berdasarkan usia menurut standar WHO:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-slate-300">
                        <th className="pb-2 font-semibold text-slate-800">Usia</th>
                        <th className="pb-2 font-semibold text-slate-800">Tinggi Ideal (Laki-laki)</th>
                        <th className="pb-2 font-semibold text-slate-800">Tinggi Ideal (Perempuan)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr><td className="py-2">0 bulan</td><td>49,9 cm</td><td>49,1 cm</td></tr>
                      <tr><td className="py-2">6 bulan</td><td>67,6 cm</td><td>65,7 cm</td></tr>
                      <tr><td className="py-2">12 bulan</td><td>75,7 cm</td><td>74,0 cm</td></tr>
                      <tr><td className="py-2">24 bulan</td><td>87,8 cm</td><td>86,4 cm</td></tr>
                      <tr><td className="py-2">36 bulan</td><td>96,7 cm</td><td>95,2 cm</td></tr>
                      <tr><td className="py-2">48 bulan</td><td>103,5 cm</td><td>102,1 cm</td></tr>
                      <tr><td className="py-2">60 bulan</td><td>109,0 cm</td><td>107,6 cm</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-2 text-xs text-slate-500">* Tabel di atas adalah nilai median. Variasi normal berada dalam rentang ±2 SD.</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href="/tinggi-badan-ideal-anak"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700 underline-offset-2 hover:bg-teal-100 hover:underline transition-colors"
                >
                  Lihat tabel lengkap tinggi badan ideal anak
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* --- Section D: Kapan Harus ke Dokter? --- */}
        <section className="glass-card soft-ring rounded-2xl px-5 py-6 sm:p-8" aria-labelledby="section-dokter">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-amber-100 p-3 text-amber-600">
              <Stethoscope className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h2 id="section-dokter" className="text-xl font-bold text-slate-900 sm:text-2xl">Kapan Harus ke Dokter atau Posyandu?</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  Hasil <strong>skrining</strong> dari alat ini bersifat indikatif. Segera konsultasi ke <strong>dokter spesialis anak</strong>, bidan, atau <strong>posyandu</strong> terdekat jika:
                </p>
                <ul className="ml-5 list-disc space-y-2">
                  <li>Z-score TB/U anak berada di bawah -2 SD (status <strong>&ldquo;Pendek&rdquo;</strong> atau <strong>&ldquo;Sangat Pendek&rdquo;</strong>).</li>
                  <li>Berat badan anak tidak naik dalam 2 bulan berturut-turut.</li>
                  <li>Anak tampak lebih kecil dibandingkan teman seusianya.</li>
                  <li>Ada keterlambatan perkembangan (bicara, duduk, berjalan).</li>
                  <li>Sistem memberikan tingkat risiko <strong>&ldquo;Serius&rdquo;</strong>.</li>
                </ul>
                <p>
                  Di <strong>Desa Candiareng, Kecamatan Warungasem, Kabupaten Batang</strong>, Anda bisa memanfaatkan layanan <strong>Posyandu</strong> setiap bulan untuk memantau tumbuh kembang anak secara gratis.
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href="/faq-stunting"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 underline-offset-2 hover:bg-amber-100 hover:underline transition-colors"
                >
                  Baca FAQ seputar stunting
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SEO: E-E-A-T Section — Kredibilitas & Didukung Oleh          */}
        {/* ============================================================ */}
        <section className="glass-card soft-ring rounded-2xl px-5 py-6 sm:p-8" aria-labelledby="section-credibility">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-purple-100 p-3 text-purple-600">
              <Users className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h2 id="section-credibility" className="text-xl font-bold text-slate-900 sm:text-2xl">Didukung oleh KKN Universitas Diponegoro</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  Website <strong>skrining stunting anak cerdas</strong> ini dikembangkan oleh tim <strong>Kuliah Kerja Nyata (KKN) Universitas Diponegoro (UNDIP)</strong> yang bertempat di <strong>Desa Candiareng, Kecamatan Warungasem, Kabupaten Batang, Provinsi Jawa Tengah</strong>. Program ini bertujuan untuk membantu orang tua dan kader posyandu dalam <strong>deteksi dini stunting</strong> menggunakan teknologi digital.
                </p>
                <p>
                  Alat ini menggunakan <strong>referensi standar pertumbuhan WHO</strong> dan <strong>Permenkes No. 2 Tahun 2020</strong> sebagai dasar perhitungan. Fitur saran AI didukung oleh <strong>Google Gemini AI</strong> untuk memberikan rekomendasi gizi yang lebih personal.
                </p>
                <p className="text-xs text-slate-500">
                  <strong>Peringatan:</strong> Ini bukan diagnosis medis. Konsultasikan dengan tenaga kesehatan profesional untuk evaluasi lebih lanjut.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SEO: Internal linking section to all content pages           */}
        {/* ============================================================ */}
        <section className="glass-card soft-ring rounded-2xl px-5 py-6 sm:p-8" aria-labelledby="section-baca-juga">
          <h2 id="section-baca-juga" className="text-lg font-bold text-slate-900 sm:text-xl">Baca Juga</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/apa-itu-stunting" className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all">
              <h3 className="font-semibold text-slate-900">Apa Itu Stunting?</h3>
              <p className="mt-1 text-xs leading-6 text-slate-500">Penyebab, dampak, dan cara mencegah stunting pada anak balita.</p>
            </Link>
            <Link href="/cara-menghitung-z-score" className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all">
              <h3 className="font-semibold text-slate-900">Cara Menghitung Z-Score</h3>
              <p className="mt-1 text-xs leading-6 text-slate-500">Pahami cara hitung Z-score TB/U, BB/U, dan BB/TB dengan contoh sederhana.</p>
            </Link>
            <Link href="/tinggi-badan-ideal-anak" className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all">
              <h3 className="font-semibold text-slate-900">Tinggi Badan Ideal Anak</h3>
              <p className="mt-1 text-xs leading-6 text-slate-500">Tabel lengkap tinggi dan berat badan ideal anak 0-60 bulan berdasarkan WHO.</p>
            </Link>
            <Link href="/faq-stunting" className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all">
              <h3 className="font-semibold text-slate-900">FAQ Seputar Stunting</h3>
              <p className="mt-1 text-xs leading-6 text-slate-500">Jawaban atas pertanyaan umum tentang stunting, gizi anak, dan skrining.</p>
            </Link>
            <Link href="/blog/ciri-ciri-anak-stunting" className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all">
              <h3 className="font-semibold text-slate-900">Ciri-Ciri Anak Stunting</h3>
              <p className="mt-1 text-xs leading-6 text-slate-500">Kenali tanda-tanda awal stunting pada anak balita sejak dini.</p>
            </Link>
            <Link href="/blog/makanan-bergizi-anak-1-3-tahun" className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all">
              <h3 className="font-semibold text-slate-900">Makanan Bergizi 1–3 Tahun</h3>
              <p className="mt-1 text-xs leading-6 text-slate-500">Menu makanan bergizi untuk mendukung tumbuh kembang anak usia 1-3 tahun.</p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}