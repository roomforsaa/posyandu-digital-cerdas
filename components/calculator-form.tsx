"use client";

import { FormEvent, useMemo, useState } from "react";
import { Info, Send, Users } from "lucide-react";
import { checkStunting, type NutritionResult } from "@/lib/stunting";
import { getFoodFlag, type FoodFlagResult } from "@/lib/food-flag";
import { ResultCard } from "@/components/result-card";

type Gender = "" | "laki-laki" | "perempuan";

interface FormState {
  nama: string;
  usia: string;
  gender: Gender;
  tinggi: string;
  berat: string;
  makanan: string;
}

interface FormErrors {
  usia?: string;
  gender?: string;
  tinggi?: string;
  berat?: string;
}

const initialState: FormState = {
  nama: "",
  usia: "",
  gender: "",
  tinggi: "",
  berat: "",
  makanan: "",
};

export function CalculatorForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [result, setResult] = useState<NutritionResult | null>(null);
  const [foodFlag, setFoodFlag] = useState<FoodFlagResult | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [aiText, setAiText] = useState("");
  const [loadingAi, setLoadingAi] = useState(false);
  const [detailRequested, setDetailRequested] = useState(false);

  const canSubmit = useMemo(() => {
    return form.usia !== "" && form.gender !== "" && form.tinggi !== "" && form.berat !== "";
  }, [form]);

  function handleChange(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function validate() {
    const nextErrors: FormErrors = {};
    const usia = Number(form.usia);
    const tinggi = Number(form.tinggi);
    const berat = Number(form.berat);

    if (!form.usia || Number.isNaN(usia) || usia <= 0 || usia > 60) {
      nextErrors.usia = "Usia harus di antara 1-60 bulan.";
    }

    if (!form.gender) {
      nextErrors.gender = "Pilih jenis kelamin anak.";
    }

    if (!form.tinggi || Number.isNaN(tinggi) || tinggi <= 0 || tinggi > 140) {
      nextErrors.tinggi = "Masukkan tinggi/panjang badan yang valid.";
    }

    if (!form.berat || Number.isNaN(berat) || berat <= 0 || berat > 50) {
      nextErrors.berat = "Masukkan berat badan yang valid.";
    }

    setErrors(nextErrors);
    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      setResult(null);
      setFoodFlag(null);
      setAiText("");
      setDetailRequested(false);
      return;
    }

    const usia = Number(form.usia);
    const tinggi = Number(form.tinggi);
    const berat = Number(form.berat);
    const computed = checkStunting(usia, tinggi, berat, form.gender, form.makanan);
    const flag = getFoodFlag(computed.status, form.makanan, usia);

    setResult(computed);
    setFoodFlag(flag);
    setSubmitted(true);
    setAiText("");
    setDetailRequested(false);
    setLoadingAi(false);
  }

  async function handleDetailAdvice() {
    if (!result) return;

    setLoadingAi(true);
    setDetailRequested(true);
    setAiText("");

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama: form.nama,
          usia: Number(form.usia),
          gender: form.gender,
          makanan: form.makanan,
          tb_u: result.tb_u,
          bb_u: result.bb_u,
          bb_tb: result.bb_tb,
          risk_level: result.risk_level,
          food_valid: result.food_valid,
        }),
      });

      const data: { text?: string } = await response.json();
      setAiText(data.text || "Tidak ada saran");
    } catch {
      setAiText("Saran AI belum dapat dimuat saat ini.");
    } finally {
      setLoadingAi(false);
    }
  }

  return (
    <div className="glass-card soft-ring rounded-3xl border border-white/80 p-5 shadow-soft sm:p-6">
      <div className="mb-5 flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
        <div className="rounded-xl bg-sky-100 p-2 text-sky-600">
          <Users className="h-5 w-5" />
        </div>
        <div>
          <p className="font-semibold text-slate-900">Masukkan data anak</p>
          <p className="mt-1 leading-6">
            Gunakan angka yang sesuai dan tulis tinggi dalam sentimeter. Tooltip kecil di setiap field membantu pengisian.
          </p>
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-800" htmlFor="nama">
            Nama Anak <span className="text-xs font-normal text-slate-400">(opsional)</span>
          </label>
          <input
            id="nama"
            type="text"
            placeholder="Contoh: Budi"
            value={form.nama}
            onChange={(event) => handleChange("nama", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        <div>
          <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <label htmlFor="usia">Usia</label>
            <span className="text-xs font-normal text-slate-400">(bulan, 1-60)</span>
            <span className="group relative inline-flex items-center text-slate-400">
              <Info className="h-4 w-4" />
              <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-52 -translate-x-1/2 rounded-xl bg-slate-900 px-3 py-2 text-xs font-normal leading-5 text-white opacity-0 shadow-lg transition group-hover:opacity-100">
                Masukkan usia anak dalam bulan penuh.
              </span>
            </span>
          </div>
          <input
            id="usia"
            type="number"
            min="1"
            max="60"
            placeholder="1 - 60 bulan"
            value={form.usia}
            onChange={(event) => handleChange("usia", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
          />
          {errors.usia ? <p className="mt-2 text-xs text-rose-600">{errors.usia}</p> : null}
        </div>

        <div>
          <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <label htmlFor="gender">Jenis Kelamin</label>
            <span className="group relative inline-flex items-center text-slate-400">
              <Info className="h-4 w-4" />
              <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-56 -translate-x-1/2 rounded-xl bg-slate-900 px-3 py-2 text-xs font-normal leading-5 text-white opacity-0 shadow-lg transition group-hover:opacity-100">
                Data gender diperlukan untuk analisis skrining.
              </span>
            </span>
          </div>
          <select
            id="gender"
            value={form.gender}
            onChange={(event) => handleChange("gender", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
          >
            <option value="">Pilih jenis kelamin</option>
            <option value="laki-laki">Laki-laki</option>
            <option value="perempuan">Perempuan</option>
          </select>
          {errors.gender ? <p className="mt-2 text-xs text-rose-600">{errors.gender}</p> : null}
        </div>

        <div>
          <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <label htmlFor="tinggi">Tinggi / Panjang Badan</label>
            <span className="text-xs font-normal text-slate-400">(cm)</span>
            <span className="group relative inline-flex items-center text-slate-400">
              <Info className="h-4 w-4" />
              <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-60 -translate-x-1/2 rounded-xl bg-slate-900 px-3 py-2 text-xs font-normal leading-5 text-white opacity-0 shadow-lg transition group-hover:opacity-100">
                Gunakan tinggi badan dalam sentimeter dengan angka desimal jika perlu.
              </span>
            </span>
          </div>
          <input
            id="tinggi"
            type="number"
            min="0"
            max="140"
            step="0.1"
            placeholder="Contoh: 75.5"
            value={form.tinggi}
            onChange={(event) => handleChange("tinggi", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
          />
          {errors.tinggi ? <p className="mt-2 text-xs text-rose-600">{errors.tinggi}</p> : null}
        </div>

        <div>
          <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <label htmlFor="berat">Berat Badan</label>
            <span className="text-xs font-normal text-slate-400">(kg)</span>
            <span className="group relative inline-flex items-center text-slate-400">
              <Info className="h-4 w-4" />
              <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-60 -translate-x-1/2 rounded-xl bg-slate-900 px-3 py-2 text-xs font-normal leading-5 text-white opacity-0 shadow-lg transition group-hover:opacity-100">
                Gunakan berat badan dalam kilogram dengan angka desimal jika perlu.
              </span>
            </span>
          </div>
          <input
            id="berat"
            type="number"
            min="0"
            max="50"
            step="0.1"
            placeholder="Contoh: 8.5"
            value={form.berat}
            onChange={(event) => handleChange("berat", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
          />
          {errors.berat ? <p className="mt-2 text-xs text-rose-600">{errors.berat}</p> : null}
        </div>

        <div>
          <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <label htmlFor="makanan">Makanan yang Sudah Dikonsumsi</label>
            <span className="text-xs font-normal text-slate-400">(opsional)</span>
            <span className="group relative inline-flex items-center text-slate-400">
              <Info className="h-4 w-4" />
              <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-64 -translate-x-1/2 rounded-xl bg-slate-900 px-3 py-2 text-xs font-normal leading-5 text-white opacity-0 shadow-lg transition group-hover:opacity-100">
                Tulis makanan/minuman yang dikonsumsi anak hari ini atau 24 jam terakhir agar saran AI lebih tepat.
              </span>
            </span>
          </div>
          <textarea
            id="makanan"
            rows={4}
            placeholder="Contoh: bubur, telur, nasi, ikan, susu, pisang, biskuit"
            value={form.makanan}
            onChange={(event) => handleChange("makanan", event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-3 font-semibold text-white shadow-lg shadow-emerald-200 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Send className="h-5 w-5" />
          Cek Status Gizi
        </button>
      </form>

      <div className="mt-5">
        <ResultCard
          result={result}
          foodFlag={foodFlag}
          aiText={aiText}
          loadingAi={loadingAi}
          submitted={submitted}
          detailRequested={detailRequested}
          onRequestDetail={handleDetailAdvice}
        />
      </div>
    </div>
  );
}