// WHO Anthropometric Z-score Calculator
// Reference: Permenkes No. 2 Tahun 2020 tentang Standar Antropometri Anak
// Simplified WHO LMS-based Z-score estimation for community screening

import {
  classifyTB_U,
  classifyBB_U,
  classifyBB_TB,
  resolveBB_TBConflict,
  calculateRiskLevel,
  checkFoodValid,
  type IndicatorResult,
  type RiskLevel,
} from "./indicator";

export type StuntingStatus = "stunting" | "normal";

export interface NutritionResult {
  // Original stunting check (TB/U based)
  status: StuntingStatus;
  expectedHeight: number;
  zScore: number;

  // Three indicators
  tb_u: IndicatorResult;
  bb_u: IndicatorResult;
  bb_tb: IndicatorResult;

  // Risk level
  risk_level: RiskLevel;

  // Food validation
  food_valid: boolean;
  makanan_tidak_layak: boolean;

  // Input validation
  input_warning: string | null;
}

// ============================================================
// WHO LMS Reference Tables (simplified median + SD)
// These are simplified approximations for community screening.
// For clinical use, use actual WHO Anthro tables.
// ============================================================

interface GrowthReference {
  medianHeight: number; // cm
  sdHeight: number; // cm
  medianWeight: number; // kg
  sdWeight: number; // kg
}

/**
 * Simplified WHO growth references for Indonesian children.
 * Based on WHO Child Growth Standards median and SD values.
 * Age in months, interpolated for community screening purposes.
 */
function getGrowthReference(usia: number, gender: string): GrowthReference {
  // Simplified WHO median height and weight for boys and girls
  // These are approximate values for community screening
  const isBoy = gender === "laki-laki";

  // Height references (cm) - WHO standards simplified
  const heightRef: Record<number, { boy: number; girl: number; sd: number }> = {
    0:  { boy: 49.9, girl: 49.1, sd: 2.0 },
    1:  { boy: 54.7, girl: 53.7, sd: 2.3 },
    2:  { boy: 58.4, girl: 57.1, sd: 2.5 },
    3:  { boy: 61.4, girl: 59.8, sd: 2.6 },
    4:  { boy: 63.9, girl: 62.1, sd: 2.7 },
    5:  { boy: 65.9, girl: 64.0, sd: 2.7 },
    6:  { boy: 67.6, girl: 65.7, sd: 2.8 },
    7:  { boy: 69.2, girl: 67.3, sd: 2.8 },
    8:  { boy: 70.6, girl: 68.7, sd: 2.8 },
    9:  { boy: 72.0, girl: 70.1, sd: 2.9 },
    10: { boy: 73.3, girl: 71.5, sd: 2.9 },
    11: { boy: 74.5, girl: 72.8, sd: 2.9 },
    12: { boy: 75.7, girl: 74.0, sd: 3.0 },
    13: { boy: 76.9, girl: 75.2, sd: 3.0 },
    14: { boy: 78.0, girl: 76.4, sd: 3.0 },
    15: { boy: 79.1, girl: 77.5, sd: 3.0 },
    16: { boy: 80.2, girl: 78.6, sd: 3.0 },
    17: { boy: 81.2, girl: 79.7, sd: 3.1 },
    18: { boy: 82.3, girl: 80.7, sd: 3.1 },
    19: { boy: 83.2, girl: 81.7, sd: 3.1 },
    20: { boy: 84.2, girl: 82.7, sd: 3.1 },
    21: { boy: 85.1, girl: 83.7, sd: 3.1 },
    22: { boy: 86.0, girl: 84.6, sd: 3.2 },
    23: { boy: 86.9, girl: 85.5, sd: 3.2 },
    24: { boy: 87.8, girl: 86.4, sd: 3.2 },
    25: { boy: 88.6, girl: 87.2, sd: 3.2 },
    26: { boy: 89.4, girl: 88.0, sd: 3.2 },
    27: { boy: 90.2, girl: 88.8, sd: 3.3 },
    28: { boy: 91.0, girl: 89.6, sd: 3.3 },
    29: { boy: 91.8, girl: 90.4, sd: 3.3 },
    30: { boy: 92.5, girl: 91.1, sd: 3.3 },
    31: { boy: 93.2, girl: 91.8, sd: 3.3 },
    32: { boy: 93.9, girl: 92.5, sd: 3.4 },
    33: { boy: 94.6, girl: 93.2, sd: 3.4 },
    34: { boy: 95.3, girl: 93.9, sd: 3.4 },
    35: { boy: 96.0, girl: 94.6, sd: 3.4 },
    36: { boy: 96.7, girl: 95.2, sd: 3.4 },
    37: { boy: 97.3, girl: 95.9, sd: 3.5 },
    38: { boy: 97.9, girl: 96.5, sd: 3.5 },
    39: { boy: 98.5, girl: 97.1, sd: 3.5 },
    40: { boy: 99.1, girl: 97.7, sd: 3.5 },
    41: { boy: 99.7, girl: 98.3, sd: 3.5 },
    42: { boy: 100.3, girl: 98.9, sd: 3.6 },
    43: { boy: 100.9, girl: 99.5, sd: 3.6 },
    44: { boy: 101.4, girl: 100.0, sd: 3.6 },
    45: { boy: 102.0, girl: 100.6, sd: 3.6 },
    46: { boy: 102.5, girl: 101.1, sd: 3.6 },
    47: { boy: 103.0, girl: 101.6, sd: 3.7 },
    48: { boy: 103.5, girl: 102.1, sd: 3.7 },
    49: { boy: 104.0, girl: 102.6, sd: 3.7 },
    50: { boy: 104.5, girl: 103.1, sd: 3.7 },
    51: { boy: 105.0, girl: 103.6, sd: 3.7 },
    52: { boy: 105.5, girl: 104.1, sd: 3.8 },
    53: { boy: 106.0, girl: 104.6, sd: 3.8 },
    54: { boy: 106.4, girl: 105.0, sd: 3.8 },
    55: { boy: 106.9, girl: 105.5, sd: 3.8 },
    56: { boy: 107.3, girl: 105.9, sd: 3.8 },
    57: { boy: 107.8, girl: 106.4, sd: 3.9 },
    58: { boy: 108.2, girl: 106.8, sd: 3.9 },
    59: { boy: 108.6, girl: 107.2, sd: 3.9 },
    60: { boy: 109.0, girl: 107.6, sd: 3.9 },
  };

  // Weight references (kg) - WHO standards simplified
  const weightRef: Record<number, { boy: number; girl: number; sd: number }> = {
    0:  { boy: 3.3, girl: 3.2, sd: 0.5 },
    1:  { boy: 4.5, girl: 4.2, sd: 0.6 },
    2:  { boy: 5.6, girl: 5.1, sd: 0.7 },
    3:  { boy: 6.4, girl: 5.8, sd: 0.8 },
    4:  { boy: 7.0, girl: 6.4, sd: 0.8 },
    5:  { boy: 7.5, girl: 6.9, sd: 0.9 },
    6:  { boy: 7.9, girl: 7.3, sd: 0.9 },
    7:  { boy: 8.3, girl: 7.6, sd: 1.0 },
    8:  { boy: 8.6, girl: 7.9, sd: 1.0 },
    9:  { boy: 8.9, girl: 8.2, sd: 1.0 },
    10: { boy: 9.2, girl: 8.5, sd: 1.1 },
    11: { boy: 9.4, girl: 8.7, sd: 1.1 },
    12: { boy: 9.6, girl: 8.9, sd: 1.1 },
    13: { boy: 9.9, girl: 9.2, sd: 1.1 },
    14: { boy: 10.1, girl: 9.4, sd: 1.2 },
    15: { boy: 10.3, girl: 9.6, sd: 1.2 },
    16: { boy: 10.5, girl: 9.8, sd: 1.2 },
    17: { boy: 10.7, girl: 10.0, sd: 1.2 },
    18: { boy: 10.9, girl: 10.2, sd: 1.2 },
    19: { boy: 11.1, girl: 10.4, sd: 1.3 },
    20: { boy: 11.3, girl: 10.6, sd: 1.3 },
    21: { boy: 11.5, girl: 10.8, sd: 1.3 },
    22: { boy: 11.7, girl: 10.9, sd: 1.3 },
    23: { boy: 11.8, girl: 11.1, sd: 1.3 },
    24: { boy: 12.0, girl: 11.3, sd: 1.4 },
    25: { boy: 12.2, girl: 11.5, sd: 1.4 },
    26: { boy: 12.4, girl: 11.7, sd: 1.4 },
    27: { boy: 12.5, girl: 11.8, sd: 1.4 },
    28: { boy: 12.7, girl: 12.0, sd: 1.4 },
    29: { boy: 12.9, girl: 12.2, sd: 1.5 },
    30: { boy: 13.0, girl: 12.3, sd: 1.5 },
    31: { boy: 13.2, girl: 12.5, sd: 1.5 },
    32: { boy: 13.3, girl: 12.6, sd: 1.5 },
    33: { boy: 13.5, girl: 12.8, sd: 1.5 },
    34: { boy: 13.6, girl: 12.9, sd: 1.6 },
    35: { boy: 13.8, girl: 13.1, sd: 1.6 },
    36: { boy: 13.9, girl: 13.2, sd: 1.6 },
    37: { boy: 14.1, girl: 13.4, sd: 1.6 },
    38: { boy: 14.2, girl: 13.5, sd: 1.6 },
    39: { boy: 14.4, girl: 13.7, sd: 1.7 },
    40: { boy: 14.5, girl: 13.8, sd: 1.7 },
    41: { boy: 14.7, girl: 14.0, sd: 1.7 },
    42: { boy: 14.8, girl: 14.1, sd: 1.7 },
    43: { boy: 15.0, girl: 14.3, sd: 1.7 },
    44: { boy: 15.1, girl: 14.4, sd: 1.8 },
    45: { boy: 15.3, girl: 14.6, sd: 1.8 },
    46: { boy: 15.4, girl: 14.7, sd: 1.8 },
    47: { boy: 15.6, girl: 14.9, sd: 1.8 },
    48: { boy: 15.7, girl: 15.0, sd: 1.8 },
    49: { boy: 15.9, girl: 15.2, sd: 1.9 },
    50: { boy: 16.0, girl: 15.3, sd: 1.9 },
    51: { boy: 16.2, girl: 15.5, sd: 1.9 },
    52: { boy: 16.3, girl: 15.6, sd: 1.9 },
    53: { boy: 16.5, girl: 15.8, sd: 1.9 },
    54: { boy: 16.6, girl: 15.9, sd: 2.0 },
    55: { boy: 16.8, girl: 16.1, sd: 2.0 },
    56: { boy: 16.9, girl: 16.2, sd: 2.0 },
    57: { boy: 17.1, girl: 16.4, sd: 2.0 },
    58: { boy: 17.2, girl: 16.5, sd: 2.0 },
    59: { boy: 17.4, girl: 16.7, sd: 2.1 },
    60: { boy: 17.5, girl: 16.8, sd: 2.1 },
  };

  // Clamp age to valid range
  const age = Math.max(0, Math.min(60, Math.round(usia)));

  const h = heightRef[age] || heightRef[0];
  const w = weightRef[age] || weightRef[0];

  const medianHeight = isBoy ? h.boy : h.girl;
  const medianWeight = isBoy ? w.boy : w.girl;

  return {
    medianHeight,
    sdHeight: h.sd,
    medianWeight,
    sdWeight: w.sd,
  };
}

/**
 * Calculate Z-score for height-for-age (TB/U)
 */
function calculateZScore_TBU(usia: number, tinggi: number, gender: string): number {
  const ref = getGrowthReference(usia, gender);
  if (ref.sdHeight === 0) return 0;
  return (tinggi - ref.medianHeight) / ref.sdHeight;
}

/**
 * Calculate Z-score for weight-for-age (BB/U)
 */
function calculateZScore_BBU(usia: number, berat: number, gender: string): number {
  const ref = getGrowthReference(usia, gender);
  if (ref.sdWeight === 0) return 0;
  return (berat - ref.medianWeight) / ref.sdWeight;
}

/**
 * Calculate Z-score for weight-for-height (BB/TB)
 * Uses simplified BMI-for-age approach for community screening
 */
function calculateZScore_BBTB(tinggi: number, berat: number): number {
  if (tinggi <= 0) return 0;
  // Simplified: use BMI and compare to WHO median BMI for height
  // For community screening, we use a simplified approach
  const bmi = berat / ((tinggi / 100) * (tinggi / 100));

  // WHO median BMI varies by height; simplified reference
  // For children, median BMI ~15-17 depending on age/height
  const expectedBMI = 16.0;
  const sdBMI = 1.5;

  return (bmi - expectedBMI) / sdBMI;
}

// ============================================================
// Input Validation
// ============================================================

function validateInput(
  usia: number,
  tinggi: number,
  berat: number
): string | null {
  if (usia <= 0 || usia > 60) {
    return "Data tidak wajar, periksa kembali input";
  }

  if (tinggi <= 0 || tinggi > 140) {
    return "Data tidak wajar, periksa kembali input";
  }

  if (berat <= 0 || berat > 50) {
    return "Data tidak wajar, periksa kembali input";
  }

  // Height sanity check for children > 12 months
  if (usia > 12 && tinggi < 60) {
    return "Data tidak wajar, periksa kembali input";
  }

  // Weight sanity check for children > 12 months
  if (usia > 12 && berat < 5) {
    return "Data tidak wajar, periksa kembali input";
  }

  return null;
}

// ============================================================
// Main Calculation Function
// ============================================================

export function checkStunting(
  usia: number,
  tinggi: number,
  berat: number,
  gender: string,
  makanan: string
): NutritionResult {
  // Input validation
  const input_warning = validateInput(usia, tinggi, berat);

  // Calculate Z-scores
  const z_tb_u = calculateZScore_TBU(usia, tinggi, gender);
  const z_bb_u = calculateZScore_BBU(usia, berat, gender);
  const z_bb_tb = calculateZScore_BBTB(tinggi, berat);

  // Classify each indicator
  let tb_u = classifyTB_U(z_tb_u);
  let bb_u = classifyBB_U(z_bb_u);
  let bb_tb = classifyBB_TB(z_bb_tb);

  // Resolve BB/TB conflict (CRITICAL FIX)
  bb_tb = resolveBB_TBConflict(bb_u, bb_tb);

  // Calculate risk level
  const risk_level = calculateRiskLevel(tb_u, bb_u, bb_tb);

  // Food validation
  const { food_valid, makanan_tidak_layak } = checkFoodValid(makanan);

  // Original stunting status (TB/U based)
  const status: StuntingStatus = tb_u.status === "Sangat Pendek" || tb_u.status === "Pendek" ? "stunting" : "normal";
  const ref = getGrowthReference(usia, gender);

  return {
    status,
    expectedHeight: ref.medianHeight,
    zScore: z_tb_u,
    tb_u,
    bb_u,
    bb_tb,
    risk_level,
    food_valid,
    makanan_tidak_layak,
    input_warning,
  };
}