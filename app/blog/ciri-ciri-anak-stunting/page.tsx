import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, ExternalLink } from "lucide-react";

// ============================================================
// SEO: Blog article — "ciri-ciri anak stunting"
// ============================================================
export const metadata: Metadata = {
  title: "Ciri-Ciri Anak Stunting Sejak Dini — Panduan untuk Orang Tua",
  description:
    "Kenali ciri-ciri anak stunting sejak dini: tinggi badan di bawah standar, wajah tampak lebih muda, berat badan kurang, dan perkembangan lambat. Dilengkapi panduan skrining dan pencegahan.",
  openGraph: {
    title: "Ciri-Ciri Anak Stunting Sejak Dini — Panduan untuk Orang Tua",
    description:
      "Kenali tanda-tanda awal stunting pada anak balita. Deteksi dini bisa menyelamatkan masa depan anak.",
  },
};

export default function CiriCiriAnakStuntingPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 text-xs text-slate-500" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="underline hover:text-emerald-600">Beranda</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/" className="underline hover:text-emerald-600">Blog</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-800" aria-current="page">Ciri-Ciri Anak Stunting</li>
        </ol>
      </nav>

      <article>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
          <time dateTime="2024-01-15">15 Januari 2024</time>
        </div>
        <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Ciri-Ciri Anak Stunting Sejak Dini yang Perlu Orang Tua Ketahui</h1>

        <div className="mt-8 space-y-5 text-sm leading-7 text-slate-700 sm:text-base sm:leading-8">
          <p>
            <strong>Stunting</strong> adalah salah satu masalah gizi utama yang dihadapi Indonesia. Sayangnya, masih banyak orang tua yang tidak menyadari bahwa anaknya mengalami stunting karena ciri-cirinya tidak selalu terlihat jelas di awal. Padahal, <strong>deteksi dini stunting</strong> sangat penting untuk mencegah dampak jangka panjang yang permanen.
          </p>

          <h2 className="text-xl font-bold text-slate-900">Ciri-Ciri Fisik Anak Stunting</h2>
          <p>Berikut adalah tanda-tanda fisik yang bisa diamati oleh orang tua:</p>

          <h3 className="font-semibold text-slate-900">1. Tinggi Badan di Bawah Standar Usia</h3>
          <p>
            Ini adalah ciri paling utama. Anak stunting memiliki tinggi badan yang lebih pendek dibandingkan anak seusianya. Untuk memastikan, bandingkan tinggi anak dengan <Link href="/tinggi-badan-ideal-anak" className="text-emerald-600 underline">tabel tinggi badan ideal anak</Link> berdasarkan standar WHO. Jika selisihnya signifikan, segera lakukan <Link href="/" className="text-emerald-600 underline">skrining stunting</Link>.
          </p>

          <h3 className="font-semibold text-slate-900">2. Berat Badan Kurang atau Sulit Naik</h3>
          <p>
            Anak stunting seringkali juga mengalami underweight (berat badan kurang). Berat badan anak sulit naik meskipun sudah diberi makan. Ini menandakan adanya masalah penyerapan nutrisi.
          </p>

          <h3 className="font-semibold text-slate-900">3. Wajah Tampak Lebih Muda dari Usianya</h3>
          <p>
            Anak stunting seringkali memiliki wajah yang tampak lebih muda dibandingkan anak seusianya. Ini karena pertumbuhan tulang wajah dan struktur tubuh secara keseluruhan terhambat.
          </p>

          <h3 className="font-semibold text-slate-900">4. Pertumbuhan Gigi Terlambat</h3>
          <p>
            Gigi susu anak stunting biasanya tumbuh lebih lambat. Misalnya, pada usia 12 bulan seharusnya sudah memiliki beberapa gigi, tapi anak stunting mungkin belum memiliki gigi sama sekali.
          </p>

          <h3 className="font-semibold text-slate-900">5. Proporsi Tubuh Tidak Ideal</h3>
          <p>
            Anak stunting cenderung memiliki tubuh yang lebih kecil dan kurus jika dibandingkan dengan anak seusianya. Mereka juga sering terlihat lesu dan kurang energik.
          </p>

          <h2 className="text-xl font-bold text-slate-900">Ciri-Ciri Perkembangan Anak Stunting</h2>
          <p>Selain fisik, stunting juga memengaruhi perkembangan anak:</p>
          <ul className="ml-5 list-disc space-y-2">
            <li><strong>Keterlambatan bicara</strong> — Anak stunting cenderung berbicara lebih lambat dibandingkan anak seusianya.</li>
            <li><strong>Kemampuan motorik terganggu</strong> — Duduk, merangkak, berjalan, dan berlari lebih lambat dari standar.</li>
            <li><strong>Mudah sakit</strong> — Sistem kekebalan tubuh lemah, anak mudah terkena infeksi.</li>
            <li><strong>Kurang fokus dan mudah lelah</strong> — Anak tampak lemas dan kurang bersemangat bermain.</li>
            <li><strong>Kemampuan kognitif lebih rendah</strong> — Sulit berkonsentrasi, lambat dalam belajar hal baru.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900">Kapan Harus Curiga Anak Mengalami Stunting?</h2>
          <p>
            Orang tua perlu curiga jika anak menunjukkan beberapa ciri di atas, terutama jika tinggi badan anak jauh di bawah teman-teman seusianya. Cara paling akurat adalah dengan melakukan <Link href="/" className="text-emerald-600 underline">skrining menggunakan kalkulator Z-score</Link>. Alat ini akan menghitung secara objektif apakah anak Anda berisiko stunting berdasarkan standar WHO.
          </p>

          <h2 className="text-xl font-bold text-slate-900">Apa yang Harus Dilakukan Jika Anak Dicurigai Stunting?</h2>
          <ol className="ml-5 list-decimal space-y-2">
            <li>Lakukan <strong>skrining</strong> menggunakan alat ini untuk mengetahui status gizi anak.</li>
            <li>Bawa anak ke <strong>Posyandu</strong> atau <strong>puskesmas</strong> terdekat untuk pemantauan lebih lanjut.</li>
            <li>Konsultasi ke <strong>dokter spesialis anak</strong> untuk evaluasi medis lengkap.</li>
            <li>Tingkatkan asupan <strong>protein hewani</strong> (telur, ikan, hati ayam, daging) setiap hari.</li>
            <li>Pastikan anak mendapat <strong>imunisasi lengkap</strong> dan lingkungan yang bersih.</li>
          </ol>

          <p>
            Baca juga artikel tentang <Link href="/blog/makanan-bergizi-anak-1-3-tahun" className="text-emerald-600 underline">makanan bergizi untuk anak 1–3 tahun</Link> untuk mendukung tumbuh kembang optimal.
          </p>
        </div>
      </article>

      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900">
        <p><strong>Peringatan:</strong> Artikel ini bersifat informatif. Konsultasikan ke dokter untuk diagnosis dan penanganan medis.</p>
      </div>
    </main>
  );
}