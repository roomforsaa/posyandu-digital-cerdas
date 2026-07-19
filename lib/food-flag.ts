import defaultConfigJson from "./food-keywords.json";
export type FoodTone = "good" | "warning" | "neutral" | "danger" | "light";

export interface FoodFlagResult {
  label: string;
  note: string;
  tone: FoodTone;
  matchedKeywords?: Record<string, string[]>;
  scores?: Record<string, number>;
  // Additional structured data for UI alerts
  alerts?: FoodAlert[];
}

export interface FoodAlert {
  type: "allergen" | "high_sodium" | "high_sugar" | "dangerous" | "fortified" | "unhealthy" | "neutral" | "healthy";
  label: string;
  items: string[];
  severity: "low" | "medium" | "high";
}

interface KeywordEntry {
  term: string;
  note?: string;
  severity?: "low" | "medium" | "high";
  minAgeMonths?: number;
  aliases?: string[];
}

interface FoodCategoryConfig {
  label: string;
  tone: FoodTone;
  weight: number;
  note?: string;
  keywords: KeywordEntry[];
}

interface FoodThresholds {
  unhealthyDominantMin: number;
  healthyDominantMin: number;
}

interface FoodKeywordConfig {
  version: number;
  thresholds?: Partial<FoodThresholds>;
  categories: Record<string, FoodCategoryConfig>;
}

const DEFAULT_THRESHOLDS: FoodThresholds = {
  unhealthyDominantMin: 2,
  healthyDominantMin: 2,
};

function escapeRegExp(term: string): string {
  return term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function matchesKeyword(normalizedText: string, term: string): boolean {
  const escaped = escapeRegExp(term.toLowerCase());
  const pattern = new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`, "u");
  return pattern.test(normalizedText);
}

function normalizeText(makanan: string): string {
  return makanan.toLowerCase().trim().normalize("NFKC");
}

function normalizeKeywordInput(input: string | KeywordEntry): KeywordEntry {
  if (typeof input === "string") {
    return { term: input.trim().toLowerCase() };
  }
  return {
    ...input,
    term: input.term.trim().toLowerCase(),
    aliases: input.aliases?.map((alias) => alias.trim().toLowerCase()),
  };
}

function loadFoodKeywordConfig(json: FoodKeywordConfig): FoodKeywordConfig {
  return {
    ...json,
    categories: Object.fromEntries(
      Object.entries(json.categories).map(([key, cat]) => [
        key,
        { ...cat, keywords: cat.keywords.map(normalizeKeywordInput) },
      ])
    ) as Record<string, FoodCategoryConfig>,
  };
}

interface CategoryMatch {
  score: number;
  matched: KeywordEntry[];
}

function scanCategory(normalizedText: string, cat: FoodCategoryConfig): CategoryMatch {
  const matched: KeywordEntry[] = [];
  for (const kw of cat.keywords) {
    const terms = [kw.term, ...(kw.aliases ?? [])];
    if (terms.some((term) => matchesKeyword(normalizedText, term))) {
      matched.push(kw);
    }
  }
  return { score: matched.length, matched };
}

/** Strip trailing period from a string to avoid double-dot formatting */
function stripTrailingPeriod(s: string): string {
  return s.replace(/\.+$/, "");
}

class FoodFlagEngine {
  private config: FoodKeywordConfig;
  private thresholds: FoodThresholds;

  constructor(config: FoodKeywordConfig) {
    this.config = config;
    this.thresholds = { ...DEFAULT_THRESHOLDS, ...config.thresholds };
  }

  private pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /**
   * Check if a keyword is age-appropriate for the child
   * If minAgeMonths is set and child is younger, it's NOT appropriate (filter out)
   * If minAgeMonths is not set, it's always appropriate
   */
  private isKeywordAgeAppropriate(kw: KeywordEntry, childAge: number): boolean {
    if (!kw.minAgeMonths) return true;
    return childAge >= kw.minAgeMonths;
  }

  /** Build structured alerts from all categories (respecting age filters) */
  private buildAlerts(
    matchedKeywords: Record<string, string[]>,
    normalized: string,
    childAge: number,
  ): FoodAlert[] {
    const alerts: FoodAlert[] = [];

    // --- Allergen alerts ---
    const allergenHits = (this.config.categories.allergen?.keywords ?? []).filter((kw) =>
      [kw.term, ...(kw.aliases ?? [])].some((term) => matchesKeyword(normalized, term)),
    );
    if (allergenHits.length > 0) {
      const severity = allergenHits.some((kw) => kw.severity === "high") ? "high"
        : allergenHits.some((kw) => kw.severity === "medium") ? "medium" : "low";
      alerts.push({
        type: "allergen",
        label: "Potensi Alergen",
        items: allergenHits.map((kw) => kw.term),
        severity,
      });
    }

    // --- High Sodium alerts ---
    const sodiumHits = (this.config.categories.high_sodium?.keywords ?? []).filter((kw) =>
      [kw.term, ...(kw.aliases ?? [])].some((term) => matchesKeyword(normalized, term)),
    );
    if (sodiumHits.length > 0) {
      alerts.push({
        type: "high_sodium",
        label: "Tinggi Natrium",
        items: sodiumHits.map((kw) => kw.term),
        severity: "medium",
      });
    }

    // --- High Sugar (unhealthy category) alerts ---
    const sugarHits = (this.config.categories.unhealthy?.keywords ?? []).filter((kw) =>
      [kw.term, ...(kw.aliases ?? [])].some((term) => matchesKeyword(normalized, term)),
    );
    if (sugarHits.length > 0) {
      alerts.push({
        type: "high_sugar",
        label: "Tinggi Gula / Rendah Nutrisi",
        items: sugarHits.map((kw) => kw.term),
        severity: "medium",
      });
    }

    // --- Dangerous alerts (age-filtered: only show if child is BELOW minAge) ---
    const dangerHits = (this.config.categories.dangerous?.keywords ?? []).filter((kw) => {
      const matches = [kw.term, ...(kw.aliases ?? [])].some((term) => matchesKeyword(normalized, term));
      if (!matches) return false;
      // Only flag if child is below the minimum age for this item
      if (kw.minAgeMonths && childAge >= kw.minAgeMonths) return false;
      return true;
    });
    if (dangerHits.length > 0) {
      alerts.push({
        type: "dangerous",
        label: "Berbahaya",
        items: dangerHits.map((kw) => kw.term),
        severity: "high",
      });
    }

    // --- Fortified alerts ---
    const fortifiedHits = (this.config.categories.fortified?.keywords ?? []).filter((kw) =>
      [kw.term, ...(kw.aliases ?? [])].some((term) => matchesKeyword(normalized, term)),
    );
    if (fortifiedHits.length > 0) {
      alerts.push({
        type: "fortified",
        label: "Difortifikasi",
        items: fortifiedHits.map((kw) => kw.term),
        severity: "low",
      });
    }

    return alerts;
  }

  /** Build rich supplementary notes from allergen + high_sodium + fortified categories */
  private buildSupplementaryNotes(
    matchedKeywords: Record<string, string[]>,
    normalized: string,
  ): string {
    const parts: string[] = [];

    // --- Allergen ---
    const allergenHits = (this.config.categories.allergen?.keywords ?? []).filter((kw) =>
      [kw.term, ...(kw.aliases ?? [])].some((term) => matchesKeyword(normalized, term)),
    );
    if (allergenHits.length > 0) {
      const items = allergenHits.map((kw) => {
        const severity = kw.severity ? ` (${kw.severity})` : "";
        const note = kw.note ? `: ${stripTrailingPeriod(kw.note)}` : "";
        return `${kw.term}${severity}${note}`;
      });
      if (allergenHits.length === 1) {
        parts.push(`\u26A0\uFE0F Potensi alergen: ${items[0]}.`);
      } else {
        parts.push(`\u26A0\uFE0F Beberapa potensi alergen terdeteksi: ${items.join("; ")}.`);
      }
      const cautionMessages = [
        "Perkenalkan satu per satu untuk memantau reaksi.",
        "Pantau gejala alergi seperti ruam, gatal, atau sesak napas.",
        "Jika ada riwayat alergi keluarga, konsultasikan dulu ke dokter.",
        "Reaksi alergi bisa muncul hingga 2 jam setelah makan.",
      ];
      parts.push(this.pick(cautionMessages));
    }

    // --- High Sodium ---
    const sodiumHits = (this.config.categories.high_sodium?.keywords ?? []).filter((kw) =>
      [kw.term, ...(kw.aliases ?? [])].some((term) => matchesKeyword(normalized, term)),
    );
    if (sodiumHits.length > 0) {
      const names = sodiumHits.map((kw) => kw.term);
      if (sodiumHits.length === 1) {
        parts.push(`\uD83E\uDDC2 ${names[0]} tergolong tinggi natrium. Batasi konsumsi agar tidak membebani ginjal anak.`);
      } else {
        parts.push(`\uD83E\uDDC2 Beberapa makanan tinggi natrium: ${names.join(", ")}. Sebaiknya kurangi frekuensinya.`);
      }
    }

    // --- Fortified ---
    const fortifiedHits = (this.config.categories.fortified?.keywords ?? []).filter((kw) =>
      [kw.term, ...(kw.aliases ?? [])].some((term) => matchesKeyword(normalized, term)),
    );
    if (fortifiedHits.length > 0) {
      const names = fortifiedHits.map((kw) => kw.term);
      if (fortifiedHits.length === 1) {
        parts.push(`\u2705 ${names[0]} diperkaya zat gizi mikro. Pilihan yang baik untuk mendukung pertumbuhan.`);
      } else {
        parts.push(`\u2705 Terdapat makanan fortifikasi: ${names.join(", ")}. Kandungan gizi mikronya membantu cegah stunting.`);
      }
    }

    if (parts.length === 0) return "";
    return "\n\n" + parts.join("\n");
  }

  /**
   * Get age-filtered dangerous items (only those where child is BELOW minAgeMonths)
   */
  private getActiveDangerousItems(normalized: string, childAge: number): KeywordEntry[] {
    return (this.config.categories.dangerous?.keywords ?? []).filter((keyword) => {
      const matches = [keyword.term, ...(keyword.aliases ?? [])].some((term) =>
        matchesKeyword(normalized, term)
      );
      if (!matches) return false;
      // Only flag if child is below the minimum age for this item
      if (keyword.minAgeMonths && childAge >= keyword.minAgeMonths) return false;
      return true;
    });
  }

  analyze(status: string, makanan: string, usia?: number): FoodFlagResult {
    const normalized = normalizeText(makanan);
    const childAge = usia ?? 60;

    if (!normalized) {
      const emptyNotes = [
        "Isi makanan untuk analisis otomatis.",
        "Belum ada data makanan yang bisa dianalisis. Silakan isi menu hari ini.",
        "Tuliskan makanan anak untuk mendapat evaluasi gizi otomatis.",
      ];
      return {
        label: "Belum ada data",
        note: this.pick(emptyNotes),
        tone: "neutral",
      };
    }

    const matchedKeywords: Record<string, string[]> = {};
    const scores: Record<string, number> = {};

    for (const [key, category] of Object.entries(this.config.categories)) {
      const match = scanCategory(normalized, category);
      matchedKeywords[key] = match.matched.map((keyword) => keyword.term);
      scores[key] = match.score;
    }

    const healthyScore = scores.healthy ?? 0;
    const unhealthyScore = scores.unhealthy ?? 0;
    const neutralScore = scores.neutral ?? 0;

    // Calculate dangerous score ONLY for age-appropriate items
    const activeDangerous = this.getActiveDangerousItems(normalized, childAge);
    const dangerousScore = activeDangerous.length;

    // Build structured alerts (age-filtered inside buildAlerts)
    const alerts = this.buildAlerts(matchedKeywords, normalized, childAge);

    // --- Dangerous overrides everything (age-filtered) ---
    if (dangerousScore > 0) {
      const dangerousItems = activeDangerous
        .map((keyword) =>
          keyword.note
            ? `${keyword.term} (${stripTrailingPeriod(keyword.note)})`
            : keyword.term
        );
      const labels = status === "stunting" ? "Berbahaya \u2014 perlu segera dihindari" : "Berbahaya";
      const suffix = this.buildSupplementaryNotes(matchedKeywords, normalized);
      const notes = [
        `Terdeteksi item berisiko: ${dangerousItems.join("; ")}. Segera hentikan pemberian makanan ini.`,
        `\u26A0\uFE0F ${dangerousItems.join("; ")} \u2014 makanan ini tidak aman untuk anak. Konsultasi ke dokter jika sudah terlanjur dikonsumsi.`,
        `Bahaya! ${dangerousItems.join("; ")}. Jangan diberikan lagi kepada anak dalam kondisi apa pun.`,
      ];
      return {
        label: labels,
        note: this.pick(notes) + suffix,
        tone: "danger",
        matchedKeywords,
        scores,
        alerts,
      };
    }

    // --- Unhealthy dominant (no healthy) ---
    if (unhealthyScore >= this.thresholds.unhealthyDominantMin && healthyScore === 0) {
      const labels = status === "stunting" ? "Sangat tidak mendukung" : "Tidak sehat";
      const suffix = this.buildSupplementaryNotes(matchedKeywords, normalized);
      const stuntingNotes = [
        "Didominasi gula, minim protein. Stunting butuh protein hewani setiap hari.",
        "Terlalu banyak makanan manis, anak stunting butuh protein, bukan gula.",
        "Gula berlebih menghambat penyerapan gizi. Kurangi manis, tambah protein.",
        "Pola makan ini tidak mendukung kejar tumbuh. Ganti camilan dengan protein.",
      ];
      const normalNotes = [
        "Didominasi gula/kalori kosong. Kurangi manis, ganti dengan protein & sayur.",
        "Terlalu banyak gula, minim gizi. Anak butuh protein hewani dan nabati.",
        "Kelebihan gula, kurang nutrisi. Tambahkan telur, ikan, dan sayur setiap hari.",
        "Gula berlebih hambat penyerapan nutrisi. Batasi manis, perbanyak protein.",
      ];
      const notes = status === "stunting" ? stuntingNotes : normalNotes;
      return {
        label: labels,
        note: this.pick(notes) + suffix,
        tone: "warning",
        matchedKeywords,
        scores,
        alerts,
      };
    }

    // --- Unhealthy + Healthy mixed (warning) ---
    if (unhealthyScore > 0 && healthyScore > 0) {
      const labels: Record<string, string> = {
        normal: "Normal tapi berisiko",
        stunting: "Stunting & pola makan lemah",
      };
      const suffix = this.buildSupplementaryNotes(matchedKeywords, normalized);
      const stuntingNotes = [
        "Ada protein, tapi tertutup gula. Tingkatkan protein hewani untuk kejar tumbuh.",
        "Gizi campuran, dominasi gula kurangi manfaat protein. Perbanyak lauk hewani.",
        "Sumber gizi ada, namun gula berlebih hambat penyerapan. Kurangi manis.",
        "Sudah ada protein, tapi gula tinggi kurangi efektivitasnya. Evaluasi menu.",
      ];
      const normalNotes = [
        "Campuran baik & kurang baik. Perbanyak protein, kurangi minuman manis.",
        "Ada gizi, tapi tertutup gula. Tingkatkan porsi protein, kurangi camilan.",
        "Positif sudah ada, namun gula bisa hambat pertumbuhan. Kurangi manis.",
        "Gizi cukup, tapi gula berlebih. Evaluasi menu, perbanyak sayur & protein.",
      ];
      const notes = status === "stunting" ? stuntingNotes : normalNotes;
      return {
        label: labels[status] || "Normal tapi berisiko",
        note: this.pick(notes) + suffix,
        tone: "warning",
        matchedKeywords,
        scores,
        alerts,
      };
    }

    // --- Healthy dominant (good) ---
    if (healthyScore >= this.thresholds.healthyDominantMin && unhealthyScore === 0) {
      const labels: Record<string, string> = {
        normal: "Baik",
        stunting: "Cukup baik, namun perlu ditingkatkan",
      };
      const suffix = this.buildSupplementaryNotes(matchedKeywords, normalized);
      const stuntingNotes = [
        "Protein sudah ada, namun anak stunting butuh lebih banyak protein hewani setiap hari.",
        "Gizi cukup, tapi penambahan protein hewani tetap prioritas untuk kejar pertumbuhan.",
        "Sudah ada zat gizi, tingkatkan frekuensi protein, sayur, dan sumber zat besi.",
        "Pola makan cukup, namun untuk stunting perlu tambahan sumber protein & vitamin.",
      ];
      const normalNotes = [
        "Menu bergizi, pertahankan dan variasikan sumber protein & sayur.",
        "Pola makan sudah baik, jaga konsistensi dengan variasi buah dan protein.",
        "Gizi seimbang sudah terpenuhi, teruskan dan tambah variasi sumber vitamin.",
        "Kandungan protein dan gizi mikro baik. Pertahankan pola makan ini.",
      ];
      const notes = status === "stunting" ? stuntingNotes : normalNotes;
      const tone: FoodTone = status === "stunting" ? "light" : "good";
      return {
        label: labels[status] || "Baik",
        note: this.pick(notes) + suffix,
        tone,
        matchedKeywords,
        scores,
        alerts,
      };
    }

    // --- Neutral only ---
    if (neutralScore > 0 && healthyScore === 0 && unhealthyScore === 0) {
      const labels: Record<string, string> = {
        normal: "Kurang kuat",
        stunting: "Kurang mendukung",
      };
      const suffix = this.buildSupplementaryNotes(matchedKeywords, normalized);
      const stuntingNotes = [
        "Makanan belum cukup protein. Tambah telur, ikan, atau hati ayam setiap hari.",
        "Gizi belum optimal. Fokus pada protein hewani dan sayur untuk kejar tumbuh.",
        "Kalori ada, tapi gizi mikro kurang. Perbanyak protein, sayur, dan buah.",
        "Kurang sumber zat besi & protein. Prioritaskan lauk hewani di setiap makan.",
      ];
      const normalNotes = [
        "Makanan masih kurang protein. Tambahkan telur, ikan, atau tempe setiap hari.",
        "Perlu diversifikasi. Tambah protein dan sayur untuk gizi optimal.",
        "Kalori cukup, tapi gizi mikro perlu ditingkatkan. Perbanyak sayur dan lauk.",
        "Menu perlu diperkuat. Pastikan ada protein dan sayur setiap kali makan.",
      ];
      const notes = status === "stunting" ? stuntingNotes : normalNotes;
      return {
        label: labels[status] || "Kurang kuat",
        note: this.pick(notes) + suffix,
        tone: "warning",
        matchedKeywords,
        scores,
        alerts,
      };
    }

    // --- Stunting + no healthy ---
    if (status === "stunting" && healthyScore === 0) {
      const suffix = this.buildSupplementaryNotes(matchedKeywords, normalized);
      const notes = [
        "Belum ada protein hewani. Segera tambah telur, hati ayam, atau ikan setiap hari.",
        "Stunting tanpa protein. Intervensi gizi harus segera: telur, ikan, hati ayam.",
        "Prioritas utama: protein hewani setiap hari untuk kejar pertumbuhan.",
        "Tanpa protein, pertumbuhan sulit dikejar. Pastikan lauk hewani setiap makan.",
      ];
      return {
        label: "Perlu intervensi",
        note: this.pick(notes) + suffix,
        tone: "warning",
        matchedKeywords,
        scores,
        alerts,
      };
    }

    // --- Normal + no healthy ---
    if (status === "normal" && healthyScore === 0) {
      const suffix = this.buildSupplementaryNotes(matchedKeywords, normalized);
      const notes = [
        "Belum ada sumber protein kuat. Tambahkan telur, ikan, atau tahu setiap hari.",
        "Pola makan kurang gizi meski tinggi normal. Jaga asupan protein dan vitamin.",
        "Saatnya bangun kebiasaan sehat. Perkenalkan protein, sayur, dan buah sejak dini.",
        "Untuk jangka panjang, perlu gizi lebih baik. Variasikan menu dengan protein.",
      ];
      return {
        label: "Perlu dibenahi",
        note: this.pick(notes) + suffix,
        tone: "warning",
        matchedKeywords,
        scores,
        alerts,
      };
    }

    // --- Fallback
    {
      const labels: Record<string, string> = {
        normal: "Cukup",
        stunting: "Perlu perhatian",
      };

      const matchedCats: string[] = [];
      for (const [key, words] of Object.entries(matchedKeywords)) {
        if (key === "healthy" || key === "unhealthy" || key === "neutral") continue;
        if (words.length > 0) {
          matchedCats.push(key);
        }
      }

      let fallbackLabel: string;
      const suffix = this.buildSupplementaryNotes(matchedKeywords, normalized);

      if (matchedCats.length > 0) {
        if (matchedCats.includes("fortified")) {
          fallbackLabel = status === "stunting" ? "Ada gizi tambahan" : "Fortifikasi terdeteksi";
        } else if (matchedCats.includes("allergen") && matchedCats.includes("high_sodium")) {
          fallbackLabel = "Perlu diwaspadai";
        } else if (matchedCats.includes("allergen")) {
          fallbackLabel = "Mengandung alergen";
        } else if (matchedCats.includes("high_sodium")) {
          fallbackLabel = "Tinggi natrium";
        } else {
          fallbackLabel = labels[status] || "Cukup";
        }
      } else {
        fallbackLabel = labels[status] || "Cukup";
      }

      const stuntingNotes = [
        "Perlu variasi menu dengan protein hewani, sayur, dan buah untuk kejar tumbuh.",
        "Tambah variasi protein hewani setiap hari untuk dukung pertumbuhan.",
        "Fokus pada protein hewani, sayuran hijau, dan sumber zat besi.",
        "Kombinasikan lauk hewani, nabati, dan sayur dalam satu piring setiap hari.",
      ];
      const normalNotes = [
        "Perlu variasi menu. Pastikan ada protein, sayur, dan buah setiap hari.",
        "Tambah variasi sumber protein dan sayuran untuk gizi optimal.",
        "Tingkatkan kualitas gizi dengan protein hewani dan sayuran hijau.",
        "Kombinasikan lauk hewani, nabati, dan sayur dalam satu piring.",
      ];
      const notes = status === "stunting" ? stuntingNotes : normalNotes;
      return {
        label: fallbackLabel,
        note: this.pick(notes) + suffix,
        tone: "warning",
        matchedKeywords,
        scores,
        alerts,
      };
    }
  }
}

const defaultEngine = new FoodFlagEngine(loadFoodKeywordConfig(defaultConfigJson as FoodKeywordConfig));

export function getFoodFlag(status: string, makanan: string, usia?: number): FoodFlagResult {
  return defaultEngine.analyze(status, makanan, usia);
}

export { FoodFlagEngine };