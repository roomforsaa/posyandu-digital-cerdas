import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Makanan Bergizi untuk Anak 1–3 Tahun — Cegah Stunting",
  description:
    "Panduan makanan bergizi untuk anak usia 1-3 tahun: protein hewani, sayur, buah, dan sumber zat besi. Cegah stunting dengan MPASI dan makanan pendamping yang tepat.",
  openGraph: {
    title: "Makanan Bergizi untuk Anak 1–3 Tahun — Cegah Stunting",
    description:
      "Panduan lengkap makanan bergizi untuk anak usia 1-3 tahun guna mendukung tumbuh kembang optimal dan mencegah stunting.",
  },
};

export default function MakananBergiziPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 text-xs text-slate-500" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="underline hover:text-emerald-600">Beranda</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/" className="underline hover:text-emerald-600">Blog</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-800" aria-current="page">Makanan Bergizi 1-3 Tahun</li>
        </ol>
      </nav>

      <article>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Makanan Bergizi untuk Anak Usia 1–3 Tahun Cegah Stunting</h1>

        <div className="mt-8 space-y-5 text-sm leading-7 text-slate-700 sm:text-base sm:leading-8">
          <p>
            Usia 1–3 tahun adalah periode emas (golden age) pertumbuhan anak. Pada fase ini, otak anak berkembang sangat pesat dan kebutuhan nutrisi sangat tinggi. Kekurangan gizi di usia ini dapat menyebabkan <strong>stunting</strong> yang dampaknya bisa permanen.
          </p>

          <h2 className="text-xl font-bold text-slate-900">Kebutuhan Gizi Anak Usia 1–3 Tahun</h2>
          <p>Anak usia 1–3 tahun membutuhkan sekitar 1.000–1.300 kalori per hari dengan komposisi:</p>
          <ul className="ml-5 list-disc space-y-2">
            <li><strong>Karbohidrat</strong> — nasi, kentang, pasta, roti (sekitar 45-65% dari total kalori)</li>
            <li><strong>Protein</strong> — telur, ikan, daging, ayam, tahu, tempe (15-20%)</li>
            <li><strong>Lemak sehat</strong> — minyak ikan, alpukat, minyak zaitun (25-35%)</li>
            <li><strong>Vitamin dan mineral</strong> — sayur, buah, hati, susu</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900">Makanan Pencegah Stunting</h2>
          <p>Berikut makanan yang paling penting untuk mencegah stunting:</p>

          <h3 className="font-semibold text-slate-900">1. Protein Hewani (WAJIB setiap hari)</h3>
          <p>
            Penelitian menunjukkan protein hewani lebih efektif mencegah stunting dibanding protein nabati. Berikan minimal 1 porsi setiap hari:
          </p>
          <ul className="ml-5 list-disc space-y-1">
            <li><strong>Telur</strong> — sumber protein lengkap, murah, mudah diolah.</li>
            <li><strong>Ikan</strong> — terutama ikan laut: kembung, tongkol, salmon (kaya omega-3).</li>
            <li><strong>Hati ayam</strong> — sumber zat besi dan vitamin A yang sangat baik.</li>
            <li><strong>Daging sapi/ayam</strong> — cincang halus untuk anak.</li>
          </ul>

          <h3 className="font-semibold text-slate-900">2. Sumber Zat Besi</h3>
          <p>
            Zat besi penting untuk mencegah anemia yang memperparah stunting. Sumber: hati, daging merah, bayam, kacang hijau, dan telur.
          </p>

          <h3 className="font-semibold text-slate-900">3. Sumber Zinc</h3>
          <p>
            Zinc memperkuat sistem imun dan mendukung pertumbuhan. Sumber: tiram, daging sapi, hati, kacang-kacangan, dan telur.
          </p>

          <h3 className="font-semibold text-slate-900">4. Vitamin A</h3>
          <p>
            Vitamin A penting untuk penglihatan dan kekebalan tubuh. Sumber: wortel, pepaya, mangga, ubi jalar, dan hati.
          </p>

          <h3 className="font-semibold text-slate-900">5. Kalsium dan Vitamin D</h3>
          <p>
            Untuk pertumbuhan tulang. Sumber: susu, yogurt, keju, tahu, dan paparan sinar matahari pagi.
          </p>

          <h2 className="text-xl font-bold text-slate-900">Contoh Menu Harian Anak 1–3 Tahun</h2>
          <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <p className="font-semibold text-slate-900">Sarapan:</p>
            <p>Bubur nasi + telur orak-arik + wortel parut + potongan pepaya</p>
            <p className="mt-2 font-semibold text-slate-900">Makan Siang:</p>
            <p>Nasi tim + ikan kembung kukus + sup bayam + tempe</p>
            <p className="mt-2 font-semibold text-slate-900">Makan Malam:</p>
            <p>Nasi + hati ayam cincang + tumis brokoli + potongan pisang</p>
            <p className="mt-2 font-semibold text-slate-900">Camilan:</p>
            <p>Yogurt + buah naga / biskuit gandum + susu</p>
          </div>

          <h2 className="text-xl font-bold text-slate-900">Makanan yang Harus Dibatasi</h2>
          <ul className="ml-5 list-disc space-y-2">
            <li>Makanan tinggi gula (permen, minuman kemasan, kue manis)</li>
            <li>Makanan tinggi garam (mi instan, snack kemasan)</li>
            <li>Makanan tinggi lemak jenuh (gorengan berlebihan)</li>
            <li>Kopi, alkohol, rokok (sangat berbahaya untuk anak)</li>
          </ul>

          <p>
            Pastikan Anda juga rutin melakukan <Link href="/" className="text-emerald-600 underline">skrining stunting</Link> untuk memantau pertumbuhan anak. Baca juga artikel tentang <Link href="/blog/berat-badan-ideal-bayi-balita" className="text-emerald-600 underline">berat badan ideal bayi dan balita</Link>.
          </p>
        </div>
      </article>

      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900">
        <p><strong>Peringatan:</strong> Konsultasikan ke dokter atau ahli gizi untuk rekomendasi menu yang sesuai dengan kondisi anak Anda.</p>
      </div>
    </main>
  );
}