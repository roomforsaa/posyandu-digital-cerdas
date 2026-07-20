import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, AlertTriangle, Heart, ShieldAlert, ExternalLink } from "lucide-react";

// ============================================================
// SEO: Page metadata — targeting "stunting", "stunting pada anak"
// ============================================================
export const metadata: Metadata = {
  title: "Apa Itu Stunting? Penyebab, Dampak, dan Pencegahan pada Anak",
  description:
    "Pelajari apa itu stunting pada anak: penyebab utama, dampak jangka panjang, cara mencegah, dan pentingnya skrining stunting sejak dini. Referensi Permenkes No. 2 Tahun 2020 dan standar WHO.",
  openGraph: {
    title: "Apa Itu Stunting? Penyebab, Dampak, dan Pencegahan — Posyandu Digital",
    description:
      "Pahami definisi stunting, penyebab, dampak jangka panjang, dan langkah pencegahan. Informasi lengkap untuk orang tua Indonesia.",
  },
};

export default function ApaItuStuntingPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-xs text-slate-500" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="underline hover:text-emerald-600">Beranda</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-800" aria-current="page">Apa Itu Stunting?</li>
        </ol>
      </nav>

      {/* H1 */}
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Apa Itu Stunting pada Anak? Penyebab, Dampak, dan Cara Mencegah</h1>
      <p className="mt-3 text-base leading-7 text-slate-600">
        Panduan lengkap untuk orang tua Indonesia memahami stunting, mengapa deteksi dini penting, dan bagaimana cara mencegahnya.
      </p>

      {/* ============================================================ */}
      {/* SEO: JSON-LD BreadcrumbList for this page                    */}
      {/* ============================================================ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Beranda", item: "https://posyandu-digital-cerdas.vercel.app/" },
              { "@type": "ListItem", position: 2, name: "Apa Itu Stunting?", item: "https://posyandu-digital-cerdas.vercel.app/apa-itu-stunting" },
            ],
          }),
        }}
      />

      {/* ============================================================ */}
      {/* Section 1: Definisi Stunting                                 */}
      {/* ============================================================ */}
      <section className="mt-8" aria-labelledby="definisi">
        <div className="glass-card soft-ring rounded-2xl p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-600">
              <BookOpen className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h2 id="definisi" className="text-xl font-bold text-slate-900 sm:text-2xl">Pengertian Stunting</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  <strong>Stunting</strong> adalah kondisi gagal tumbuh (growth faltering) pada anak balita akibat kekurangan gizi kronis yang berlangsung dalam waktu lama, terutama pada 1.000 Hari Pertama Kehidupan (HPK) — yaitu sejak janin dalam kandungan hingga anak berusia 2 tahun.
                </p>
                <p>
                  Secara teknis, seorang anak dikategorikan <strong>stunting</strong> jika nilai Z-score Tinggi Badan menurut Usia (TB/U) berada di bawah <strong>-2 standar deviasi (SD)</strong> dari median standar pertumbuhan WHO. Jika Z-score di bawah -3 SD, masuk kategori <strong>&ldquo;Sangat Pendek&rdquo;</strong> atau stunting berat.
                </p>
                <p>
                  <strong>Penting:</strong> Stunting bukan sekadar masalah tinggi badan. Kondisi ini mencerminkan gangguan tumbuh kembang otak, penurunan daya tahan tubuh, dan peningkatan risiko penyakit degeneratif di masa dewasa. Anak stunting juga cenderung memiliki kemampuan kognitif yang lebih rendah dibandingkan anak seusianya.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section 2: Penyebab Stunting                                 */}
      {/* ============================================================ */}
      <section className="mt-6" aria-labelledby="penyebab">
        <div className="glass-card soft-ring rounded-2xl p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-red-100 p-3 text-red-600">
              <AlertTriangle className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h2 id="penyebab" className="text-xl font-bold text-slate-900 sm:text-2xl">Penyebab Stunting pada Anak</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
                <p>Stunting disebabkan oleh multifaktor yang saling berkaitan. Berikut penyebab utama:</p>
                <h3 className="mt-4 font-semibold text-slate-900">1. Kekurangan Gizi Kronis</h3>
                <p>Asupan protein, zat besi, zinc, dan vitamin A yang tidak mencukupi dalam jangka panjang. Anak tidak mendapat ASI eksklusif 6 bulan atau MPASI yang tidak memadai.</p>

                <h3 className="mt-4 font-semibold text-slate-900">2. Infeksi Berulang</h3>
                <p>Diare, ISPA, kecacingan, dan infeksi lain yang mengganggu penyerapan nutrisi. Anak yang sering sakit cenderung kehilangan nafsu makan dan membakar lebih banyak energi.</p>

                <h3 className="mt-4 font-semibold text-slate-900">3. Sanitasi dan Higiene yang Buruk</h3>
                <p>Air minum tidak bersih, BAB sembarangan, dan cuci tangan tidak pakai sabun meningkatkan risiko diare dan infeksi yang menghambat pertumbuhan.</p>

                <h3 className="mt-4 font-semibold text-slate-900">4. Kurangnya Akses ke Layanan Kesehatan</h3>
                <p>Ibu hamil tidak rutin periksa kehamilan, anak tidak diimunisasi lengkap, dan tidak dipantau tumbuh kembangnya di posyandu.</p>

                <h3 className="mt-4 font-semibold text-slate-900">5. Faktor Sosial dan Ekonomi</h3>
                <p>Kemiskinan, ketahanan pangan rendah, pendidikan ibu yang rendah, dan kurangnya pengetahuan tentang gizi anak.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section 3: Dampak Stunting                                   */}
      {/* ============================================================ */}
      <section className="mt-6" aria-labelledby="dampak">
        <div className="glass-card soft-ring rounded-2xl p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-orange-100 p-3 text-orange-600">
              <Heart className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h2 id="dampak" className="text-xl font-bold text-slate-900 sm:text-2xl">Dampak Stunting Jangka Pendek dan Panjang</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
                <h3 className="font-semibold text-slate-900">Jangka Pendek:</h3>
                <ul className="ml-5 list-disc space-y-2">
                  <li>Pertumbuhan fisik terhambat (tinggi badan di bawah normal)</li>
                  <li>Perkembangan otak terganggu (kemampuan bicara, motorik, kognitif)</li>
                  <li>Daya tahan tubuh rendah — anak mudah sakit</li>
                  <li>Nafsu makan buruk</li>
                </ul>

                <h3 className="mt-4 font-semibold text-slate-900">Jangka Panjang:</h3>
                <ul className="ml-5 list-disc space-y-2">
                  <li>Postur tubuh pendek saat dewasa (irreversibel setelah usia 2 tahun)</li>
                  <li>Produktivitas rendah di masa dewasa</li>
                  <li>Risiko lebih tinggi terkena diabetes, hipertensi, dan obesitas</li>
                  <li>Prestasi belajar lebih rendah</li>
                  <li>Siklus kemiskinan antar generasi</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section 4: Pencegahan                                        */}
      {/* ============================================================ */}
      <section className="mt-6" aria-labelledby="pencegahan">
        <div className="glass-card soft-ring rounded-2xl p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-teal-100 p-3 text-teal-600">
              <ShieldAlert className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h2 id="pencegahan" className="text-xl font-bold text-slate-900 sm:text-2xl">Cara Mencegah Stunting</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
                <p>Stunting dapat dicegah jika intervensi dilakukan sejak dini. Berikut langkah-langkahnya:</p>

                <ol className="ml-5 list-decimal space-y-3">
                  <li>
                    <strong>Skrining rutin di Posyandu.</strong> Bawa anak setiap bulan untuk ditimbang, diukur tinggi badan, dan dipantau grafik pertumbuhannya. Gunakan alat <Link href="/" className="text-emerald-600 underline">skrining stunting digital</Link> ini sebagai alat bantu.
                  </li>
                  <li>
                    <strong>ASI eksklusif 6 bulan.</strong> Berikan ASI saja tanpa makanan/minuman lain selama 0-6 bulan pertama kehidupan.
                  </li>
                  <li>
                    <strong>MPASI bergizi.</strong> Mulai usia 6 bulan, berikan makanan pendamping ASI yang kaya protein hewani (telur, ikan, hati ayam), sayur, dan buah.
                  </li>
                  <li>
                    <strong>Imunisasi lengkap.</strong> Pastikan anak mendapat imunisasi dasar lengkap untuk mencegah infeksi.
                  </li>
                  <li>
                    <strong>Sanitasi dan higiene.</strong> Cuci tangan pakai sabun, gunakan air bersih, jamban sehat.
                  </li>
                  <li>
                    <strong>Tablet tambah darah untuk remaja putri.</strong> Cegah anemia sebelum kehamilan.
                  </li>
                  <li>
                    <strong>Ibu hamil periksa rutin.</strong> Minimal 4 kali selama kehamilan, konsumsi tablet Fe.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section 5: Hubungan dengan Skrining                         */}
      {/* ============================================================ */}
      <section className="mt-6" aria-labelledby="skrining">
        <div className="glass-card soft-ring rounded-2xl p-6 sm:p-8">
          <h2 id="skrining" className="text-xl font-bold text-slate-900 sm:text-2xl">Hubungan Stunting dengan Skrining Gizi</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
            <p>
              <strong>Skrining stunting</strong> menggunakan metode <strong>Z-score</strong> berdasarkan standar WHO adalah cara paling akurat untuk mendeteksi risiko stunting sejak dini. Dengan memasukkan usia, jenis kelamin, tinggi, dan berat badan anak ke dalam <Link href="/" className="text-emerald-600 underline">kalkulator skrining</Link>, Anda bisa langsung mengetahui:
            </p>
            <ul className="ml-5 list-disc space-y-1">
              <li>Status TB/U (normal, pendek, atau sangat pendek)</li>
              <li>Status BB/U (normal, kurang, atau sangat kurang)</li>
              <li>Status BB/TB (normal, kurus, atau gemuk)</li>
              <li>Tingkat risiko (normal, risiko, serius)</li>
              <li>Saran gizi yang dipersonalisasi oleh AI</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Internal links / CTA                                         */}
      {/* ============================================================ */}
      <section className="mt-6">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white sm:p-8">
          <h2 className="text-xl font-bold sm:text-2xl">Cek Status Gizi Anak Sekarang</h2>
          <p className="mt-2 text-sm leading-6 text-white/85">
            Gunakan kalkulator skrining stunting gratis kami. Masukkan data anak dan dapatkan hasil analisis berdasarkan standar WHO dalam hitungan detik.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-emerald-700 shadow-lg transition hover:bg-white/90"
            >
              Mulai Skrining Sekarang
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/cara-menghitung-z-score"
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 px-5 py-3 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/25"
            >
              Pelajari Cara Hitung Z-Score
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Disclaimer                                                  */}
      {/* ============================================================ */}
      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900">
        <p><strong>Peringatan:</strong> Ini bukan diagnosis medis. Konsultasikan dengan dokter spesialis anak atau tenaga kesehatan untuk evaluasi lebih lanjut. Referensi: Permenkes No. 2 Tahun 2020 dan standar WHO.</p>
      </div>
    </main>
  );
}