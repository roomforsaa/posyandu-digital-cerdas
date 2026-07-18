import Image from "next/image";
import { HeroCard } from "@/components/hero-card";
import { CalculatorForm } from "@/components/calculator-form";
import { ShieldAlert } from "lucide-react";

export default function Page() {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="glass-card soft-ring flex items-center gap-3 rounded-2xl px-4 py-3 sm:px-6">
          <Image
            src="/kkn-logo.png"
            alt="Logo KKN"
            width={48}
            height={48}
            className="h-10 w-10 shrink-0 rounded-xl object-cover shadow sm:h-12 sm:w-12"
          />
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">posyandu digital</p>
            <h1 className="text-lg font-semibold text-slate-900 sm:text-xl">Kalkulator Skrining Stunting Anak Cerdas</h1>
            <p className="text-sm text-slate-600">Desa Candiareng, Kecamatan Warungasem, Kabupaten Batang, Provinsi Jawa Tengah, Kode Pos 51252</p>
          </div>
          <Image
            src="/undip-logo.png"
            alt="Logo Undip"
            width={48}
            height={48}
            className="h-10 w-10 shrink-0 rounded-xl object-cover shadow sm:h-12 sm:w-12"
          />
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <HeroCard />
          <CalculatorForm />
        </section>

        <section className="glass-card soft-ring rounded-2xl border border-amber-200/70 px-5 py-4 text-sm text-slate-700 shadow-soft">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
            <div>
              <p className="font-semibold text-amber-800">Penting untuk diketahui</p>
              <p className="mt-1">
                Ini hanya skrining awal, bukan diagnosis medis. Untuk evaluasi lengkap, konsultasikan ke dokter atau tenaga kesehatan.
                Referensi utama: Permenkes No. 2 Tahun 2020 tentang Standar Antropometri Anak.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}