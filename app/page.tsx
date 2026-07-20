import type { Metadata } from "next";
import Image from "next/image";
import { HeroCard } from "@/components/hero-card";
import { CalculatorForm } from "@/components/calculator-form";
import { ShieldAlert } from "lucide-react";

// ============================================================
// SEO: Page-specific metadata
// ============================================================
export const metadata: Metadata = {
  title: "Skrining Stunting Anak — Deteksi Dini Berbasis WHO",
  description:
    "Gunakan kalkulator skrining stunting gratis untuk deteksi dini risiko stunting pada anak balita (0-60 bulan). Masukkan usia, jenis kelamin, tinggi, dan berat untuk mendapatkan hasil analisis berdasarkan standar WHO.",
  openGraph: {
    title: "Skrining Stunting Anak — Deteksi Dini Berbasis WHO | Posyandu Digital",
    description:
      "Kalkulator skrining stunting gratis untuk deteksi dini risiko stunting pada anak balita berdasarkan standar WHO. Cepat, jelas, dan ramah orang tua.",
  },
  twitter: {
    title: "Skrining Stunting Anak — Deteksi Dini Berbasis WHO | Posyandu Digital",
    description:
      "Kalkulator skrining stunting gratis untuk deteksi dini risiko stunting pada anak balita berdasarkan standar WHO. Cepat, jelas, dan ramah orang tua.",
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
        {/* SEO: <section> — important disclaimer with semantic markup   */}
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
                Ini hanya skrining awal, bukan diagnosis medis. Untuk evaluasi lengkap, konsultasikan ke dokter atau tenaga kesehatan.
                Referensi utama: Permenkes No. 2 Tahun 2020 tentang Standar Antropometri Anak.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* SEO: <footer> — internal links and legal information          */}
      {/* ============================================================ */}
      <footer className="mx-auto mt-8 max-w-6xl border-t border-slate-200 px-2 py-6 text-center text-xs text-slate-500">
        <p className="mb-2">
          <a
            href="/"
            className="underline hover:text-emerald-600 transition-colors"
            aria-label="Beranda — Kalkulator Skrining Stunting Anak"
          >
            Beranda
          </a>
          <span className="mx-2" aria-hidden="true">·</span>
          <a
            href="https://www.who.int/tools/child-growth-standards/standards"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-emerald-600 transition-colors"
            aria-label="Referensi WHO tentang standar pertumbuhan anak (buka di tab baru)"
          >
            Standar WHO
          </a>
          <span className="mx-2" aria-hidden="true">·</span>
          <a
            href="https://p2ptm.kemkes.go.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-emerald-600 transition-colors"
            aria-label="Kementerian Kesehatan RI — Pencegahan dan Pengendalian Penyakit (buka di tab baru)"
          >
            Kemenkes RI
          </a>
        </p>
        <p>
          &copy; {new Date().getFullYear()} Posyandu Digital — Desa Candiareng, Kec. Warungasem, Kab. Batang, Jawa Tengah.
        </p>
        <p className="mt-1">
          Alat skrining ini bersifat edukatif dan tidak menggantikan konsultasi medis profesional.
        </p>
      </footer>
    </main>
  );
}