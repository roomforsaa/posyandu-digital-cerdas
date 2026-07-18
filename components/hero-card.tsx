import Image from "next/image";
import { Baby, HeartPulse, Sparkles } from "lucide-react";

export function HeroCard() {
  return (
    <section className="glass-card soft-ring relative overflow-hidden rounded-3xl border border-white/70 shadow-soft">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-sky-400" />
      <div className="relative flex flex-col gap-6 p-5 text-white sm:p-8 lg:flex-row lg:items-center">
        <div className="flex-1">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/16 px-3 py-1 text-sm font-medium backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            Deteksi dini berbasis WHO
          </div>
          <h2 className="max-w-xl text-2xl font-bold leading-tight sm:text-3xl">
            Skrining pertumbuhan anak yang cepat, jelas, dan ramah orang tua.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/85 sm:text-base">
            Masukkan usia, jenis kelamin, dan tinggi anak untuk melihat status skrining serta saran sederhana yang mudah dipahami.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <div className="flex-1 rounded-2xl bg-white/15 px-4 py-3 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Baby className="h-4 w-4" />
                Usia 0-60 bulan
              </div>
              <p className="mt-1 text-xs text-white/80">Dirancang untuk skrining awal anak balita.</p>
            </div>
            <div className="flex-1 rounded-2xl bg-white/15 px-4 py-3 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <HeartPulse className="h-4 w-4" />
                Hasil langsung
              </div>
              <p className="mt-1 text-xs text-white/80">Status, rekomendasi, dan saran AI muncul setelah submit.</p>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-center lg:w-[340px]">
          <div className="relative w-full rounded-2xl bg-white/20 p-3 backdrop-blur-sm sm:p-4">
            <Image
              src="/child-health.svg"
              alt="Ilustrasi anak sehat"
              width={1166}
              height={896}
              priority
              className="h-auto w-full drop-shadow-lg"
            />
            <Image
              src="/logo.png"
              alt="Logo"
              width={80}
              height={80}
              className="absolute bottom-6 left-6 h-12 w-12 rounded-xl object-cover shadow-xl sm:h-16 sm:w-16"
            />
          </div>
        </div>
      </div>
    </section>
  );
}