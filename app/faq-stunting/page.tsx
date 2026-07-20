import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, ExternalLink } from "lucide-react";

// ============================================================
// SEO: Page metadata — targeting "FAQ stunting", "pertanyaan stunting"
// ============================================================
export const metadata: Metadata = {
  title: "FAQ Seputar Stunting pada Anak — Tanya Jawab Lengkap",
  description:
    "Kumpulan pertanyaan dan jawaban seputar stunting pada anak: penyebab, ciri-ciri, cara mencegah, skrining, Z-score, dan kapan harus ke dokter. Untuk orang tua Indonesia.",
  openGraph: {
    title: "FAQ Seputar Stunting pada Anak — Tanya Jawab Lengkap",
    description:
      "Jawaban atas pertanyaan umum tentang stunting, gizi anak, dan skrining pertumbuhan berdasarkan standar WHO.",
  },
};

const faqData = [
  {
    question: "Apa itu stunting pada anak?",
    answer:
      "Stunting adalah kondisi gagal tumbuh pada anak balita akibat kekurangan gizi kronis dalam waktu lama. Anak stunting memiliki tinggi badan di bawah standar usianya (Z-score TB/U < -2 SD). Stunting tidak hanya memengaruhi tinggi badan, tetapi juga perkembangan otak dan daya tahan tubuh anak."
  },
  {
    question: "Apa penyebab utama stunting?",
    answer:
      "Penyebab stunting sangat multifaktorial. Penyebab utamanya meliputi: (1) kekurangan gizi kronis terutama protein hewani, zat besi, dan zinc; (2) ASI eksklusif tidak terpenuhi dan MPASI tidak memadai; (3) infeksi berulang seperti diare dan ISPA; (4) sanitasi dan higiene yang buruk; (5) akses layanan kesehatan terbatas; serta (6) faktor kemiskinan dan rendahnya pendidikan ibu."
  },
  {
    question: "Apa perbedaan stunting dengan pendek karena faktor genetik?",
    answer:
      "Stunting disebabkan oleh kekurangan gizi dan faktor lingkungan. Sementara anak pendek karena genetik biasanya tetap memiliki proporsi tubuh normal dan perkembangan kognitif yang baik. Stunting juga disertai gangguan perkembangan otak dan sistem imun. Skrining menggunakan Z-score dapat membantu membedakan keduanya."
  },
  {
    question: "Bagaimana cara mendeteksi stunting sejak dini?",
    answer:
      "Deteksi dini stunting dilakukan dengan mengukur tinggi badan dan berat badan anak secara rutin setiap bulan di Posyandu, kemudian membandingkannya dengan standar WHO menggunakan metode Z-score. Anda juga bisa menggunakan <a href='/' class='text-emerald-600 underline'>kalkulator skrining stunting digital</a> kami secara gratis."
  },
  {
    question: "Apa itu Z-score dan bagaimana cara membacanya?",
    answer:
      "Z-score adalah nilai statistik yang menunjukkan seberapa jauh ukuran tubuh anak menyimpang dari rata-rata anak seusianya. Jika Z-score TB/U di bawah -2 SD berarti anak pendek (stunting), di bawah -3 SD berarti sangat pendek (stunting berat). Nilai antara -2 SD hingga +3 SD tergolong normal. Pelajari lebih lanjut tentang <a href='/cara-menghitung-z-score' class='text-emerald-600 underline'>cara menghitung Z-score</a>."
  },
  {
    question: "Apa saja indikator status gizi anak?",
    answer:
      "Ada tiga indikator utama: (1) TB/U (Tinggi Badan menurut Usia) untuk mendeteksi stunting; (2) BB/U (Berat Badan menurut Usia) untuk mendeteksi underweight atau overweight; (3) BB/TB (Berat Badan menurut Tinggi Badan) untuk mendeteksi kurus (wasting) atau gemuk (overweight). Ketiganya dihitung berdasarkan standar WHO."
  },
  {
    question: "Berapa tinggi badan ideal anak usia 2 tahun?",
    answer:
      "Menurut standar WHO, tinggi badan ideal (median) anak laki-laki usia 24 bulan adalah 87,8 cm, sedangkan anak perempuan 86,4 cm. Variasi normal berada dalam rentang ±2 SD. Lihat <a href='/tinggi-badan-ideal-anak' class='text-emerald-600 underline'>tabel lengkap tinggi badan ideal anak</a> untuk semua usia."
  },
  {
    question: "Apakah stunting bisa disembuhkan?",
    answer:
      "Stunting yang sudah terjadi sebelum anak berusia 2 tahun bersifat reversibel (bisa diperbaiki) jika intervensi gizi dilakukan secara intensif. Namun setelah usia 2 tahun, dampak pada tinggi badan cenderung permanen. Inilah mengapa deteksi dini dan intervensi sebelum 2 tahun sangat penting."
  },
  {
    question: "Apa saja makanan yang bisa mencegah stunting?",
    answer:
      "Makanan pencegah stunting harus kaya protein hewani (telur, ikan, hati ayam, daging), sumber zat besi (bayam, hati), zinc (kerang, kacang-kacangan), dan vitamin A (wortel, pepaya). ASI eksklusif 6 bulan dan MPASI bergizi sangat penting. Baca artikel tentang <a href='/blog/makanan-bergizi-anak-1-3-tahun' class='text-emerald-600 underline'>makanan bergizi untuk anak 1-3 tahun</a>."
  },
  {
    question: "Kapan harus membawa anak ke dokter jika dicurigai stunting?",
    answer:
      "Segera bawa ke dokter spesialis anak atau posyandu jika: (1) Z-score TB/U anak di bawah -2 SD; (2) berat badan tidak naik dalam 2 bulan; (3) anak tampak lebih kecil dibanding teman seusianya; (4) ada keterlambatan perkembangan; atau (5) hasil skrining menunjukkan tingkat risiko 'serius'."
  },
  {
    question: "Apakah skrining stunting ini bisa menggantikan diagnosis dokter?",
    answer:
      "Tidak. Alat skrining ini bersifat indikatif dan edukatif, bukan alat diagnosis medis. Hasilnya hanya menunjukkan risiko awal yang perlu dikonfirmasi oleh tenaga kesehatan profesional. Konsultasikan selalu ke dokter spesialis anak, bidan, atau puskesmas untuk diagnosis dan penanganan lebih lanjut."
  },
  {
    question: "Apa peran Posyandu dalam mencegah stunting?",
    answer:
      "Posyandu berperan sangat penting dalam pencegahan stunting melalui: pemantauan pertumbuhan bulanan (penimbangan, pengukuran tinggi badan), penyuluhan gizi, imunisasi, pemberian vitamin A, dan deteksi dini gangguan pertumbuhan. Di Desa Candiareng, Kecamatan Warungasem, Kabupaten Batang, Posyandu aktif setiap bulan."
  },
  {
    question: "Apa itu Permenkes No. 2 Tahun 2020?",
    answer:
      "Permenkes No. 2 Tahun 2020 adalah Peraturan Menteri Kesehatan Republik Indonesia tentang Standar Antropometri Anak. Peraturan ini mengadopsi standar pertumbuhan WHO sebagai acuan resmi untuk menilai status gizi anak di Indonesia, termasuk deteksi stunting, underweight, dan wasting."
  },
  {
    question: "Apakah stunting hanya dipengaruhi oleh faktor makanan?",
    answer:
      "Tidak. Stunting dipengaruhi oleh banyak faktor: asupan gizi, sanitasi, akses air bersih, infeksi, imunisasi, pendidikan ibu, pendapatan keluarga, hingga pola asuh. Pendekatan pencegahan stunting harus holistik dan melibatkan banyak sektor."
  },
  {
    question: "Berapa lama waktu yang dibutuhkan untuk memperbaiki status gizi anak stunting?",
    answer:
      "Perbaikan status gizi pada anak stunting membutuhkan waktu minimal 3-6 bulan intervensi gizi intensif dengan pemantauan rutin. Pada kasus berat, bisa memakan waktu lebih lama. Yang terpenting adalah konsistensi dalam memberikan makanan bergizi dan pemantauan pertumbuhan setiap bulan."
  },
];

export default function FAQPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-xs text-slate-500" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="underline hover:text-emerald-600">Beranda</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-800" aria-current="page">FAQ Stunting</li>
        </ol>
      </nav>

      {/* ============================================================ */}
      {/* SEO: JSON-LD FAQ Schema + BreadcrumbList                     */}
      {/* ============================================================ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Beranda", item: "https://posyandu-digital-cerdas.vercel.app/" },
                  { "@type": "ListItem", position: 2, name: "FAQ Stunting", item: "https://posyandu-digital-cerdas.vercel.app/faq-stunting" },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: faqData.map((faq) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer.replace(/<[^>]*>/g, ""), // strip HTML tags for schema
                  },
                })),
              },
            ],
          }),
        }}
      />

      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">FAQ Seputar Stunting pada Anak</h1>
      <p className="mt-3 text-base leading-7 text-slate-600">
        Kumpulan pertanyaan dan jawaban lengkap tentang stunting, cara skrining, Z-score, gizi anak, dan pencegahannya.
      </p>

      <div className="mt-8 space-y-4">
        {faqData.map((faq, index) => (
          <details
            key={index}
            className="glass-card soft-ring group rounded-2xl border border-white/70 shadow-soft transition hover:shadow-md"
          >
            <summary className="flex cursor-pointer items-start gap-3 px-5 py-4 sm:px-6">
              <div className="rounded-xl bg-emerald-100 p-2 text-emerald-600 shrink-0">
                <HelpCircle className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
                {faq.question}
              </h2>
            </summary>
            <div className="border-t border-slate-100 px-5 pb-5 sm:px-6">
              <p
                className="mt-3 text-sm leading-7 text-slate-700"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            </div>
          </details>
        ))}
      </div>

      {/* CTA */}
      <section className="mt-8">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white sm:p-8">
          <h2 className="text-xl font-bold sm:text-2xl">Masih Punya Pertanyaan?</h2>
          <p className="mt-2 text-sm leading-6 text-white/85">
            Coba gunakan kalkulator skrining stunting kami untuk mengecek status gizi anak secara langsung.
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
              href="/apa-itu-stunting"
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 px-5 py-3 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/25"
            >
              Baca Artikel Stunting
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900">
        <p><strong>Peringatan:</strong> Informasi ini bersifat edukatif. Konsultasikan dengan tenaga kesehatan profesional untuk kondisi spesifik anak Anda.</p>
      </div>
    </main>
  );
}