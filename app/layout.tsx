import type { Metadata } from "next";
import "@/styles/globals.css";

// ============================================================
// SEO: Global Metadata — used by all pages as fallback
// Includes Open Graph, Twitter Cards, and Canonical URL
// ============================================================
const SITE_URL = "https://posyandu-digital-cerdas.vercel.app";
const SITE_NAME = "Kalkulator Skrining Stunting Anak Cerdas — Posyandu Digital";
const SITE_DESCRIPTION =
  "Deteksi dini risiko stunting pada anak balita berdasarkan standar WHO. Skrining pertumbuhan anak yang cepat, jelas, dan ramah orang tua. Desa Candiareng, Batang, Jawa Tengah.";
const OG_IMAGE = "/og-image.png";

export const metadata: Metadata = {
  // ============================================================
  // SEO: metadataBase required for resolving OG/Twitter image URLs
  // ============================================================
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,

  // ============================================================
  // SEO: Canonical URL prevents duplicate content issues
  // ============================================================
  alternates: {
    canonical: SITE_URL,
  },

  // ============================================================
  // SEO: Open Graph tags (Facebook, LinkedIn, etc.)
  // ============================================================
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },

  // ============================================================
  // SEO: Twitter Card metadata
  // ============================================================
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },

  // ============================================================
  // SEO: Icons / Favicon
  // ============================================================
  icons: {
    icon: "/kkn-logo.png",
    apple: "/kkn-logo.png",
  },

  // ============================================================
  // SEO: Allow indexing in production, noindex disabled
  // ============================================================
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <head>
        {/* ============================================================ */}
        {/* SEO: JSON-LD Structured Data (Schema.org)                    */}
        {/* WebSite + Organization schema for search engine enrichment   */}
        {/* ============================================================ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: SITE_NAME,
                  description: SITE_DESCRIPTION,
                  inLanguage: "id-ID",
                  publisher: {
                    "@type": "Organization",
                    "@id": `${SITE_URL}/#organization`,
                    name: "Posyandu Digital — Desa Candiareng",
                    url: SITE_URL,
                    logo: {
                      "@type": "ImageObject",
                      url: `${SITE_URL}/kkn-logo.png`,
                      width: 512,
                      height: 512,
                    },
                    description:
                      "Posyandu digital untuk skrining stunting anak di Desa Candiareng, Kecamatan Warungasem, Kabupaten Batang, Provinsi Jawa Tengah.",
                  },
                },
                {
                  "@type": "WebPage",
                  "@id": `${SITE_URL}/#webpage`,
                  url: SITE_URL,
                  name: SITE_NAME,
                  description: SITE_DESCRIPTION,
                  isPartOf: {
                    "@id": `${SITE_URL}/#website`,
                  },
                  about: {
                    "@type": "Thing",
                    name: "Skrining Stunting Anak",
                    description:
                      "Deteksi dini stunting pada anak balita menggunakan standar antropometri WHO.",
                  },
                  inLanguage: "id-ID",
                },
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}