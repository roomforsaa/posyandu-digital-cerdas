import type { MetadataRoute } from "next";

// ============================================================
// SEO: Dynamic sitemap.xml generation
// All important routes indexed with proper metadata
// ============================================================

const SITE_URL = "https://posyandu-digital-cerdas.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  return [
    {
      url: SITE_URL,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}