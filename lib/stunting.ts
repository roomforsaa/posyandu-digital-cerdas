export type StuntingStatus = "stunting" | "normal";

export interface StuntingResult {
  status: StuntingStatus;
  expectedHeight: number;
  zScore: number;
}

export function checkStunting(usia: number, tinggi: number): StuntingResult {
  const expected = 50 + usia * 0.7;
  const z = (tinggi - expected) / 3;

  return {
    status: z < -2 ? "stunting" : "normal",
    expectedHeight: expected,
    zScore: z,
  };
}