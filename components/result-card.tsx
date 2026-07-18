import { BadgeCheck, CircleAlert, LoaderCircle, ShieldAlert, FileText, Wand2, Salad, Utensils } from "lucide-react";
import type { StuntingResult } from "@/lib/stunting";
import type { FoodFlagResult } from "@/lib/food-flag";

interface ResultCardProps {
  result: StuntingResult | null;
  foodFlag: FoodFlagResult | null;
  aiText: string;
  loadingAi: boolean;
  submitted: boolean;
  detailRequested: boolean;
  onRequestDetail: () => void;
}

function splitSections(text: string) {
  const pieces = text
    .split(/\n(?=\[(?:Analisis Kondisi|Evaluasi Pola Makan|Saran Praktis|Langkah Selanjutnya|Peringatan)\])/)
    .map((piece) => piece.trim())
    .filter(Boolean);

  return pieces.map((piece) => {
    const match = piece.match(/^\[(.*?)\]\s*([\s\S]*)$/);
    return {
      title: match?.[1] || "Detail",
      content: (match?.[2] || piece).trim(),
    };
  });
}

function FoodNote({ note }: { note: string }) {
  if (!note) return null;
  const lines = note.split(/\n\n/).filter(Boolean);
  if (lines.length <= 1) {
    return <div className="text-sm text-slate-600">{note}</div>;
  }
  return (
    <div className="space-y-1 text-sm text-slate-600">
      {lines.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  );
}

export function ResultCard({ result, foodFlag, aiText, loadingAi, submitted, detailRequested, onRequestDetail }: ResultCardProps) {
  if (!submitted || !result) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-6 text-sm text-slate-500">
        Hasil skrining akan muncul di sini setelah formulir dikirim.
      </div>
    );
  }

  const isStunting = result.status === "stunting";

  return (
    <div
      className={`fade-in-up rounded-3xl border p-5 shadow-soft ${
        isStunting
          ? "border-orange-200 bg-gradient-to-br from-orange-50 to-rose-50"
          : "border-emerald-200 bg-gradient-to-br from-emerald-50 to-cyan-50"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`rounded-2xl p-3 ${
            isStunting ? "bg-orange-100 text-orange-600" : "bg-emerald-100 text-emerald-600"
          }`}
        >
          {isStunting ? <CircleAlert className="h-6 w-6" /> : <BadgeCheck className="h-6 w-6" />}
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Status</p>
          <h3 className="mt-1 text-2xl font-bold text-slate-900">{isStunting ? "Stunting" : "Normal"}</h3>
          <p className="mt-1 text-sm text-slate-600">
            Estimasi tinggi acuan: {result.expectedHeight.toFixed(1)} cm &#xB7; Z-score: {result.zScore.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
        {isStunting ? (
          <>
            <div className="rounded-2xl bg-white/80 p-4">
              <p className="font-semibold text-orange-700">Rekomendasi utama</p>
              <ul className="mt-2 space-y-1.5 text-slate-600">
                <li>&bull; Tingkatkan protein hewani</li>
                <li>&bull; Ikuti Posyandu rutin</li>
                <li>&bull; Konsultasi dokter</li>
                <li>&bull; Monitoring pertumbuhan</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-white/80 p-4">
              <p className="font-semibold text-slate-900">Catatan cepat</p>
              <p className="mt-2 text-slate-600">
                Hasil ini adalah skrining awal. Dibutuhkan penilaian lanjutan untuk memastikan status gizi anak.
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="rounded-2xl bg-white/80 p-4">
              <p className="font-semibold text-emerald-700">Pesan utama</p>
              <ul className="mt-2 space-y-1.5 text-slate-600">
                <li>&bull; Pertahankan gizi seimbang</li>
                <li>&bull; Lakukan monitoring berkala</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-white/80 p-4">
              <p className="font-semibold text-slate-900">Lanjutkan kebiasaan baik</p>
              <p className="mt-2 text-slate-600">
                Pertahankan pola makan sehat, imunisasi, dan pemantauan tumbuh kembang sesuai jadwal.
              </p>
            </div>
          </>
        )}
      </div>

      <div className="mt-4 rounded-2xl bg-white/85 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
          <Salad className="h-4 w-4 text-emerald-600" />
          Evaluasi Makanan
        </div>
        <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
          {foodFlag ? (
            <div className="flex flex-wrap items-start gap-3">
              <div
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                  foodFlag.tone === "good"
                    ? "bg-emerald-100 text-emerald-700"
                    : foodFlag.tone === "warning"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-slate-200 text-slate-700"
                }`}
              >
                {foodFlag.label}
              </div>
              <FoodNote note={foodFlag.note} />
            </div>
          ) : (
            <div className="text-sm text-slate-500">Isi makanan untuk evaluasi otomatis.</div>
          )}
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-white/85 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
          <Utensils className="h-4 w-4 text-sky-500" />
          Detail Saran
        </div>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-slate-600">
            Klik tombol di bawah untuk mendapatkan saran makanan yang lebih detail berdasarkan hasil skrining dan
            makanan yang sudah dikonsumsi.
          </p>
          <button
            type="button"
            onClick={onRequestDetail}
            disabled={loadingAi}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loadingAi ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
            {loadingAi ? "Membuat detail..." : "Detail Saran"}
          </button>
        </div>

        <div className="mt-3 min-h-[72px] rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700">
          {loadingAi ? (
            <div className="flex items-center gap-2 text-slate-500">
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Mengambil saran kesehatan dari server...
            </div>
          ) : aiText ? (
            <div className="space-y-3 text-slate-700">
              {splitSections(aiText).map((section) => (
                <div key={section.title} className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
                  <p className="mb-2 text-sm font-semibold text-slate-900">{section.title}</p>
                  <div className="whitespace-pre-line text-sm leading-6 text-slate-700">{section.content}</div>
                </div>
              ))}
            </div>
          ) : detailRequested ? (
            <div className="flex items-center gap-2 text-slate-500">
              <FileText className="h-4 w-4" />
              Detail saran sudah diproses.
            </div>
          ) : (
            <div className="flex items-center gap-2 text-slate-500">
              <FileText className="h-4 w-4" />
              Saran detail akan muncul setelah tombol ditekan.
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
        <p>Ini hanya skrining awal, bukan diagnosis medis. Referensi: Permenkes No. 2 Tahun 2020.</p>
      </div>
    </div>
  );
}