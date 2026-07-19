// WHO Anthropometric Z-score Classification
// Reference: Permenkes No. 2 Tahun 2020 tentang Standar Antropometri Anak

export interface IndicatorResult {
  z: number;
  status: string;
}

export type RiskLevel = "normal" | "risiko" | "serius";

// ============================================================
// Classification Functions
// ============================================================

/**
 * TB/U (Height/Length-for-Age)
 * < -3  → Sangat Pendek
 * -3 s/d -2 → Pendek
 * -2 s/d +3 → Normal
 * > +3  → Tinggi
 */
export function classifyTB_U(z: number): IndicatorResult {
  if (z < -3) return { z, status: "Sangat Pendek" };
  if (z < -2) return { z, status: "Pendek" };
  if (z <= 3) return { z, status: "Normal" };
  return { z, status: "Tinggi" };
}

/**
 * BB/U (Weight-for-Age)
 * < -3  → Sangat Kurang
 * -3 s/d -2 → Kurang
 * -2 s/d +2 → Normal
 * > +2  → Lebih
 */
export function classifyBB_U(z: number): IndicatorResult {
  if (z < -3) return { z, status: "Sangat Kurang" };
  if (z < -2) return { z, status: "Kurang" };
  if (z <= 2) return { z, status: "Normal" };
  return { z, status: "Lebih" };
}

/**
 * BB/TB (Weight-for-Height/Length)
 * < -3  → Sangat Kurus
 * -3 s/d -2 → Kurus
 * -2 s/d +2 → Normal
 * > +2  → Gemuk
 */
export function classifyBB_TB(z: number): IndicatorResult {
  if (z < -3) return { z, status: "Sangat Kurus" };
  if (z < -2) return { z, status: "Kurus" };
  if (z <= 2) return { z, status: "Normal" };
  return { z, status: "Gemuk" };
}

// ============================================================
// Consistency Validation (CRITICAL FIX)
// ============================================================

/**
 * IF bb_u == "Sangat Kurang" OR "Kurang"
 * THEN bb_tb TIDAK BOLEH "Gemuk"
 * 
 * If conflict: override bb_tb → "Normal"
 * Log warning for debugging
 */
export function resolveBB_TBConflict(
  bb_u: IndicatorResult,
  bb_tb: IndicatorResult
): IndicatorResult {
  const underweightStatuses = ["Sangat Kurang", "Kurang"];

  if (underweightStatuses.includes(bb_u.status) && bb_tb.status === "Gemuk") {
    console.warn(
      `[KONFLIK] BB/U="${bb_u.status}" tidak boleh dengan BB/TB="${bb_tb.status}". Override BB/TB ke "Normal".`
    );
    return { z: bb_tb.z, status: "Normal" };
  }

  return bb_tb;
}

// ============================================================
// Risk Level Calculation
// ============================================================

/**
 * IF ada z < -3 di ≥2 indikator → "serius"
 * ELSE IF ada z < -2 → "risiko"
 * ELSE → "normal"
 */
export function calculateRiskLevel(
  tb_u: IndicatorResult,
  bb_u: IndicatorResult,
  bb_tb: IndicatorResult
): RiskLevel {
  const indicators = [tb_u, bb_u, bb_tb];
  const severeCount = indicators.filter((i) => i.z < -3).length;

  if (severeCount >= 2) return "serius";

  const hasRisk = indicators.some((i) => i.z < -2);
  if (hasRisk) return "risiko";

  return "normal";
}

// ============================================================
// Food Validation
// ============================================================

const FORBIDDEN_FOOD_ITEMS = ["rokok", "alkohol", "kopi"];

/**
 * Check if food contains forbidden items (rokok, alkohol, kopi)
 * Returns food_valid flag and makanan_tidak_layak flag
 */
export function checkFoodValid(makanan: string): {
  food_valid: boolean;
  makanan_tidak_layak: boolean;
} {
  if (!makanan || makanan.trim() === "") {
    return { food_valid: true, makanan_tidak_layak: false };
  }

  const normalized = makanan.toLowerCase().trim();
  const hasForbidden = FORBIDDEN_FOOD_ITEMS.some((item) => {
    const pattern = new RegExp(`\\b${item}\\b`, "i");
    return pattern.test(normalized);
  });

  return {
    food_valid: !hasForbidden,
    makanan_tidak_layak: hasForbidden,
  };
}