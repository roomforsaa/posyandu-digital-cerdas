import { BadgeCheck, CircleAlert, LoaderCircle, ShieldAlert, FileText, Wand2, Salad, Utensils, AlertTriangle, Baby, Weight, Ruler } from "lucide-react";
import type { NutritionResult } from "@/lib/stunting";
import type { FoodFlagResult, FoodAlert } from "@/lib/food-flag";

interface ResultCardProps {
  result: NutritionResult | null;
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

/** Convert **bold** markdown to <strong> tags using split approach for robustness */
function renderBold(text: string): string {
  const parts = text.split(/\*\*/);
  if (parts.length < 3) return text;
  let result = "";
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) {
      result += "<strong>" + parts[i] + "</strong>";
    } else {
      result += parts[i];
    }
  }
  return result;
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

function RiskBadge({ risk_level }: { risk_level: string }) {
  if (risk_level === "serius") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
        <AlertTriangle className="h-3 w-3" />
        Serius
      </span>
    );
  }
  if (risk_level === "risiko") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
        <AlertTriangle className="h-3 w-3" />
        Risiko
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
      <BadgeCheck className="h-3 w-3" />
      Normal
    </span>
  );
}

function IndicatorCard({
  label,
  result,
  icon,
}: {
  label: string;
  result: { z: number; status: string };
  icon: React.ReactNode;
}) {
  const isSangat = result.status.startsWith("Sangat");
  const isBad = isSangat || result.status === "Pendek" || result.status === "Kurang" || result.status === "Kurus" || result.status === "Gemuk" || result.status === "Lebih";

  return (
    <div className={`rounded-2xl p-4 ${isSangat ? "bg-red-50 ring-1 ring-red-200" : isBad ? "bg-amber-50 ring-1 ring-amber-200" : "bg-emerald-50 ring-1 ring-emerald-200"}`}>
      <div className="flex items-center gap-2">
        <div className={`${isSangat ? "text-red-500" : isBad ? "text-amber-500" : "text-emerald-500"}`}>
          {icon}
        </div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
      </div>
      <p className={`mt-1 text-lg font-bold ${isSangat ? "text-red-700" : isBad ? "text-amber-700" : "text-emerald-700"}`}>
        {result.status}
      </p>
      <p className="mt-0.5 text-xs text-slate-500">
        Z-score: {result.z.toFixed(2)}
      </p>
    </div>
  );
}

function AlertBadge({ alert }: { alert: FoodAlert }) {
  const cfg: Record<string, { bg: string; text: string; label: string }> = {
    dangerous: { bg: "bg-red-100", text: "text-red-700", label: "Berbahaya" },
    high_sodium: { bg: "bg-orange-100", text: "text-orange-700", label: "Tinggi Natrium" },
    high_sugar: { bg: "bg-amber-100", text: "text-amber-700", label: "Tinggi Gula" },
    allergen: { bg: "bg-purple-100", text: "text-purple-700", label: "Alergen" },
    fortified: { bg: "bg-emerald-100", text: "text-emerald-700", label: "Fortifikasi" },
  };
  const c = cfg[alert.type] || cfg.allergen;
  return (
    <span className={`inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${c.bg} ${c.text}`}>
      {c.label}: {alert.items.length}
    </span>
  );
}

function getStuntingDescription(tb_u: { z: number; status: string }): string {
  if (tb_u.status === "Sangat Pendek") return "Stunting (sangat pendek)";
  if (tb_u.status === "Pendek") return "Stunting (pendek)";
  return "Normal";
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
  const stuntingLabel = getStuntingDescription(result.tb_u);

  return (
    <div
      className={`fade-in-up rounded-3xl border p-5 shadow-soft ${
        isStunting
          ? "border-orange-200 bg-gradient-to-br from-orange-50 to-rose-50"
          : "border-emerald-200 bg-gradient-to-br from-emerald-50 to-cyan-50"
      }`}
    >
      {/* Input Warning */}
      {result.input_warning && (
        <div className="mb-4 flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{result.input_warning}</p>
        </div>
      )}

      {/* Status Header */}
      <div className="flex items-start gap-3">
        <div
          className={`rounded-2xl p-3 ${
            isStunting ? "bg-orange-100 text-orange-600" : "bg-emerald-100 text-emerald-600"
          }`}
        >
          {isStunting ? <CircleAlert className="h-6 w-6" /> : <BadgeCheck className="h-6 w-6" />}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Status Gizi</p>
          <div className="mt-1 flex items-center gap-3 flex-wrap">
            <h3 className="text-2xl font-bold text-slate-900">{stuntingLabel}</h3>
            <RiskBadge risk_level={result.risk_level} />
          </div>
          <p className="mt-1 text-sm text-slate-600">
            Estimasi tinggi acuan: {result.expectedHeight.toFixed(1)} cm · Z-score TB/U: {result.zScore.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Three Indicators */}
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <IndicatorCard label="TB/U" result={result.tb_u} icon={<Ruler className="h-4 w-4" />} />
        <IndicatorCard label="BB/U" result={result.bb_u} icon={<Weight className="h-4 w-4" />} />
        <IndicatorCard label="BB/TB" result={result.bb_tb} icon={<Baby className="h-4 w-4" />} />
      </div>

      {/* Food Validation Warning */}
      {!result.food_valid && (
        <div className="mt-4 flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="font-semibold">Makanan Tidak Layak</p>
            <p className="mt-1">Makanan mengandung bahan tidak layak (rokok/alkohol/kopi). Segera hentikan pemberian dan konsultasi ke dokter.</p>
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="mt-5 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
        {isStunting ? (
          <>
            <div className="rounded-2xl bg-white/80 p-4">
              <p className="font-semibold text-orange-700">Rekomendasi utama</p>
              <ul className="mt-2 space-y-1.5 text-slate-600">
                <li>&bull; Tingkatkan protein hewani (telur, ikan, hati ayam)</li>
                <li>&bull; Ikuti Posyandu rutin setiap bulan</li>
                <li>&bull; Konsultasi dokter untuk evaluasi lanjutan</li>
                <li>&bull; Pantau pertumbuhan dengan KMS atau aplikasi</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-white/80 p-4">
              <p className="font-semibold text-slate-900">Catatan cepat</p>
              <p className="mt-2 text-slate-600">
                Hasil ini adalah skrining awal. Dibutuhkan penilaian lanjutan untuk memastikan status gizi anak.
                {result.risk_level === "serius" && " Segera konsultasi ke tenaga kesehatan."}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="rounded-2xl bg-white/80 p-4">
              <p className="font-semibold text-emerald-700">Pesan utama</p>
              <ul className="mt-2 space-y-1.5 text-slate-600">
                <li>&bull; Pertahankan gizi seimbang</li>
                <li>&bull; Lakukan monitoring berkala setiap bulan</li>
                {result.risk_level === "risiko" && <li>&bull; Perhatikan indikator yang perlu perhatian</li>}
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

      {/* Food Evaluation (with inline alerts) */}
      <div className="mt-4 rounded-2xl bg-white/85 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
          <Salad className="h-4 w-4 text-emerald-600" />
          Evaluasi Makanan
        </div>

        {/* Alert badges inside evaluasi */}
        {foodFlag?.alerts && foodFlag.alerts.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {foodFlag.alerts.map((alert, i) => (
              <AlertBadge key={`${alert.type}-${i}`} alert={alert} />
            ))}
          </div>
        )}

        <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
          {foodFlag ? (
            <div className="flex flex-wrap items-start gap-3">
              <div
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                  foodFlag.tone === "good"
                    ? "bg-emerald-100 text-emerald-700"
                    : foodFlag.tone === "light"
                      ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200"
                      : foodFlag.tone === "danger"
                        ? "bg-red-100 text-red-700"
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

        {/* Alert item lists inside evaluasi */}
        {foodFlag?.alerts && foodFlag.alerts.length > 0 && (
          <div className="mt-2 space-y-1">
            {foodFlag.alerts.map((alert, i) => (
              <div key={`detail-${alert.type}-${i}`} className="flex items-start gap-1.5 text-xs text-slate-600">
                <span className="mt-0.5 shrink-0">-</span>
                <span><strong>{alert.label}:</strong> {alert.items.join(", ")}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI Detail Saran */}
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
                  <div
                    className="text-sm leading-6 text-slate-700"
                    dangerouslySetInnerHTML={{ __html: renderBold(section.content) }}
                  />
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