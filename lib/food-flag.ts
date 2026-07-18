import defaultConfigJson from "./food-keywords.json";
export type FoodTone = "good" | "warning" | "neutral" | "danger";

export interface FoodFlagResult {
  label: string;
  note: string;
  tone: FoodTone;
  matchedKeywords?: Record<string, string[]>;
  scores?: Record<string, number>;
}

interface KeywordEntry {
  term: string;
  note?: string;
  severity?: "low" | "medium" | "high";
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

class FoodFlagEngine {
  private config: FoodKeywordConfig;
  private thresholds: FoodThresholds;

  constructor(config: FoodKeywordConfig) {
    this.config = config;
    this.thresholds = { ...DEFAULT_THRESHOLDS, ...config.thresholds };
  }

  /** Pick a random element from an array */
  private pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
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
        const note = kw.note ? `: ${kw.note}` : "";
        return `${kw.term}${severity}${note}`;
      });
      if (allergenHits.length === 1) {
        parts.push(`⚠️ Potensi alergen: ${items[0]}.`);
      } else {
        parts.push(`⚠️ Beberapa potensi alergen terdeteksi: ${items.join("; ")}.`);
      }
      // Add a random caution message
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
        parts.push(`🧂 ${names[0]} tergolong tinggi natrium. Batasi konsumsi agar tidak membebani ginjal anak.`);
      } else {
        parts.push(`🧂 Beberapa makanan tinggi natrium: ${names.join(", ")}. Sebaiknya kurangi frekuensinya.`);
      }
    }

    // --- Fortified ---
    const fortifiedHits = (this.config.categories.fortified?.keywords ?? []).filter((kw) =>
      [kw.term, ...(kw.aliases ?? [])].some((term) => matchesKeyword(normalized, term)),
    );
    if (fortifiedHits.length > 0) {
      const names = fortifiedHits.map((kw) => kw.term);
      if (fortifiedHits.length === 1) {
        parts.push(`✅ ${names[0]} diperkaya zat gizi mikro. Pilihan yang baik untuk mendukung pertumbuhan.`);
      } else {
        parts.push(`✅ Terdapat makanan fortifikasi: ${names.join(", ")}. Kandungan gizi mikronya membantu cegah stunting.`);
      }
    }

    if (parts.length === 0) return "";
    return "\n\n" + parts.join("\n");
  }

  analyze(status: string, makanan: string): FoodFlagResult {
    const normalized = normalizeText(makanan);

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
    const dangerousScore = scores.dangerous ?? 0;

    // --- Dangerous overrides everything ---
    if (dangerousScore > 0) {
      const dangerousItems = (this.config.categories.dangerous?.keywords ?? [])
        .filter((keyword) =>
          [keyword.term, ...(keyword.aliases ?? [])].some((term) => matchesKeyword(normalized, term))
        )
        .map((keyword) => (keyword.note ? `${keyword.term} (${keyword.note})` : keyword.term));
      const labels = status === "stunting" ? "Berbahaya — perlu segera dihindari" : "Berbahaya";
      const suffix = this.buildSupplementaryNotes(matchedKeywords, normalized);
      const notes = [
        `Terdeteksi item berisiko: ${dangerousItems.join("; ")}. Segera hentikan pemberian makanan ini.`,
        `⚠️ ${dangerousItems.join("; ")} — makanan ini tidak aman untuk anak. Konsultasi ke dokter jika sudah terlanjur dikonsumsi.`,
        `Bahaya! ${dangerousItems.join("; ")}. Jangan diberikan lagi kepada anak dalam kondisi apa pun.`,
      ];
      return {
        label: labels,
        note: this.pick(notes) + suffix,
        tone: "danger",
        matchedKeywords,
        scores,
      };
    }

    // --- Unhealthy dominant (no healthy) ---
    if (unhealthyScore >= this.thresholds.unhealthyDominantMin && healthyScore === 0) {
      const labels = status === "stunting" ? "Sangat tidak mendukung" : "Tidak sehat";
      const suffix = this.buildSupplementaryNotes(matchedKeywords, normalized);
      const notes = [
        "Didominasi gula/kalori kosong, minim nutrisi penting. Kurangi makanan manis dan ganti dengan protein serta sayur.",
        "Terlalu banyak makanan tinggi gula dan minim gizi. Anak butuh protein hewani dan nabati untuk tumbuh.",
        `Pola makan ini kekurangan protein dan kelebihan gula. Tambahkan telur, ikan, atau tahu/tempe.`,
        "Gula berlebih menghambat penyerapan nutrisi penting. Batasi camilan manis dan beri buah segar sebagai gantinya.",
      ];
      return {
        label: labels,
        note: this.pick(notes) + suffix,
        tone: "warning",
        matchedKeywords,
        scores,
      };
    }

    // --- Unhealthy + Healthy mixed (warning) ---
    if (unhealthyScore > 0 && healthyScore > 0) {
      const labels: Record<string, string> = {
        normal: "Normal tapi berisiko",
        stunting: "Stunting & pola makan lemah",
      };
      const suffix = this.buildSupplementaryNotes(matchedKeywords, normalized);
      const notes = [
        "Ada makanan bergizi, tapi tertutup oleh gula atau makanan rendah nutrisi. Tingkatkan porsi protein dan kurangi camilan kemasan.",
        "Campuran makanan baik dan kurang baik. Perbanyak protein hewani, kurangi minuman manis.",
        "Sudah ada beberapa sumber gizi, tapi masih ada 'kalori kosong' yang bisa menghambat pertumbuhan optimal.",
        "Langkah positif sudah ada, namun makanan tinggi gula bisa menekan manfaat gizinya. Evaluasi ulang menu harian.",
      ];
      return {
        label: labels[status] || "Normal tapi berisiko",
        note: this.pick(notes) + suffix,
        tone: "warning",
        matchedKeywords,
        scores,
      };
    }

    // --- Healthy dominant (good) ---
    if (healthyScore >= this.thresholds.healthyDominantMin && unhealthyScore === 0) {
      const labels: Record<string, string> = {
        normal: "Baik",
        stunting: "Cukup baik (perlu ditingkatkan)",
      };
      const suffix = this.buildSupplementaryNotes(matchedKeywords, normalized);
      const notes = [
        "Sudah ada protein dan nutrisi penting untuk pertumbuhan. Lanjutkan dan variasikan sumber proteinnya.",
        "Menu mengandung zat gizi penting. Pertahankan dan tambahkan variasi sayur serta buah untuk hasil optimal.",
        `Kandungan protein cukup baik. Untuk hasil maksimal, pastikan juga ada sayuran dan sumber zat besi.`,
        "Pola makan sudah mendukung pertumbuhan. Jaga konsistensi dan tambahkan variasi sumber vitamin.",
      ];
      return {
        label: labels[status] || "Baik",
        note: this.pick(notes) + suffix,
        tone: "good",
        matchedKeywords,
        scores,
      };
    }

    // --- Neutral only ---
    if (neutralScore > 0 && healthyScore === 0 && unhealthyScore === 0) {
      const labels: Record<string, string> = {
        normal: "Kurang kuat",
        stunting: "Kurang mendukung",
      };
      const suffix = this.buildSupplementaryNotes(matchedKeywords, normalized);
      const notes = [
        "Makanan ada, tapi belum cukup mendukung pertumbuhan optimal. Tambahkan sumber protein seperti telur, ayam, atau kacang-kacangan.",
        "Menu ini perlu diperkuat dengan protein dan vitamin. Coba tambahkan ikan, tahu, atau sayuran berwarna.",
        "Kalori tercukupi, tapi gizi mikro masih kurang. Perkaya dengan hati ayam, daun kelor, atau kacang hijau.",
        "Makanan cenderung netral. Untuk pertumbuhan maksimal, pastikan ada sumber protein dan zat besi setiap hari.",
      ];
      return {
        label: labels[status] || "Kurang kuat",
        note: this.pick(notes) + suffix,
        tone: "warning",
        matchedKeywords,
        scores,
      };
    }

    // --- Stunting + no healthy ---
    if (status === "stunting" && healthyScore === 0) {
      const suffix = this.buildSupplementaryNotes(matchedKeywords, normalized);
      const notes = [
        "Belum ada sumber protein penting untuk mengejar pertumbuhan. Segera tambahkan telur, hati ayam, atau ikan setiap hari.",
        "Anak dalam kondisi stunting tapi belum ada asupan protein yang cukup. Intervensi gizi harus segera dilakukan.",
        "Prioritas utama: berikan protein hewani setiap hari. Telur, ikan, dan hati ayam adalah pilihan terbaik untuk kejar tumbuh.",
        "Tanpa protein yang cukup, pertumbuhan sulit dikejar. Mulai besok, pastikan ada lauk hewani di setiap porsi makan.",
      ];
      return {
        label: "Perlu intervensi",
        note: this.pick(notes) + suffix,
        tone: "warning",
        matchedKeywords,
        scores,
      };
    }

    // --- Normal + no healthy ---
    if (status === "normal" && healthyScore === 0) {
      const suffix = this.buildSupplementaryNotes(matchedKeywords, normalized);
      const notes = [
        "Belum terlihat makanan yang kuat mendukung tumbuh kembang. Tambahkan telur, ikan, atau sayur mayur ke menu harian.",
        "Meski tinggi badan normal, pola makan ini kurang gizi. Jaga agar anak tidak kekurangan protein dan vitamin.",
        "Pertumbuhan saat ini normal, tapi untuk jangka panjang perlu asupan gizi yang lebih baik. Variasikan menu dengan protein dan sayur.",
        "Ini saat yang tepat untuk membangun kebiasaan makan sehat. Perkenalkan protein, sayur, dan buah sejak dini.",
      ];
      return {
        label: "Perlu dibenahi",
        note: this.pick(notes) + suffix,
        tone: "warning",
        matchedKeywords,
        scores,
      };
    }

    // --- Fallback — build label from what IS matched ---
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

      // Build context-aware fallback label
      let fallbackLabel: string;
      const suffix = this.buildSupplementaryNotes(matchedKeywords, normalized);

      if (matchedCats.length > 0) {
        // Has some category matches (allergen/high_sodium/fortified) but no primary
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
        // Truly nothing matched
        fallbackLabel = labels[status] || "Cukup";
      }

      const notes = [
        "Pola makan belum optimal, perlu variasi dan peningkatan kualitas gizi. Pastikan ada protein, sayur, dan buah setiap hari.",
        "Perlu diversifikasi menu. Tambahkan variasi sumber protein dan sayuran untuk mendukung pertumbuhan optimal.",
        "Kualitas gizi masih bisa ditingkatkan. Fokus pada protein hewani, sayuran hijau, dan sumber zat besi.",
        "Menu anak perlu diperkaya. Coba kombinasikan lauk hewani, nabati, dan sayuran dalam satu piring.",
      ];
      return {
        label: fallbackLabel,
        note: this.pick(notes) + suffix,
        tone: "warning",
        matchedKeywords,
        scores,
      };
    }
  }
}

const defaultEngine = new FoodFlagEngine(loadFoodKeywordConfig(defaultConfigJson as FoodKeywordConfig));

export function getFoodFlag(status: string, makanan: string): FoodFlagResult {
  return defaultEngine.analyze(status, makanan);
}

export { FoodFlagEngine };