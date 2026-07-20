import type { Metadata } from "next";
import Link from "next/link";
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
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,

  alternates: {
    canonical: SITE_URL,
  },

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

  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },

  icons: {
    icon: "/kkn-logo.png",
    apple: "/kkn-logo.png",
  },

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
        {/* WebSite + Organization + BreadcrumbList schema              */}
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
                    address: {
                      "@type": "PostalAddress",
                      addressLocality: "Desa Candiareng",
                      addressRegion: "Jawa Tengah",
                      postalCode: "51252",
                      addressCountry: "ID",
                    },
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
      <body className="flex min-h-screen flex-col">
        <div className="flex-1">{children}</div>

        {/* ============================================================ */}
        {/* SEO: Global site footer with internal links across all pages */}
        {/* ============================================================ */}
        <footer className="border-t border-slate-200 bg-white/80">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Brand */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-slate-900">Posyandu Digital</h3>
                <p className="text-xs leading-6 text-slate-600">
                  Alat skrining stunting berbasis standar WHO untuk deteksi dini gangguan pertumbuhan anak balita di Indonesia.
                </p>
              </div>

              {/* Informasi */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-slate-900">Informasi</h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li><Link href="/apa-itu-stunting" className="underline hover:text-emerald-600 transition-colors">Apa Itu Stunting?</Link></li>
                  <li><Link href="/cara-menghitung-z-score" className="underline hover:text-emerald-600 transition-colors">Cara Menghitung Z-Score</Link></li>
                  <li><Link href="/tinggi-badan-ideal-anak" className="underline hover:text-emerald-600 transition-colors">Tinggi Badan Ideal Anak</Link></li>
                  <li><Link href="/faq-stunting" className="underline hover:text-emerald-600 transition-colors">FAQ Seputar Stunting</Link></li>
                </ul>
              </div>

              {/* Blog */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-slate-900">Artikel</h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li><Link href="/blog/ciri-ciri-anak-stunting" className="underline hover:text-emerald-600 transition-colors">Ciri-Ciri Anak Stunting</Link></li>
                  <li><Link href="/blog/makanan-bergizi-anak-1-3-tahun" className="underline hover:text-emerald-600 transition-colors">Makanan Bergizi 1–3 Tahun</Link></li>
                  <li><Link href="/blog/berat-badan-ideal-bayi-balita" className="underline hover:text-emerald-600 transition-colors">Berat Badan Ideal Bayi</Link></li>
                </ul>
              </div>

              {/* Referensi */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-slate-900">Referensi</h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li><a href="https://www.who.int/tools/child-growth-standards/standards" target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-600 transition-colors">Standar WHO</a></li>
                  <li><a href="https://p2ptm.kemkes.go.id/" target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-600 transition-colors">Kemenkes RI</a></li>
                  <li><Link href="/" className="underline hover:text-emerald-600 transition-colors">Beranda</Link></li>
                  <li><Link href="/sitemap.xml" className="underline hover:text-emerald-600 transition-colors">Sitemap</Link></li>
                </ul>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-6 text-center text-xs text-slate-500">
              <p>&copy; {new Date().getFullYear()} Posyandu Digital — Desa Candiareng, Kec. Warungasem, Kab. Batang, Jawa Tengah.</p>
              <p className="mt-1">Alat skrining ini bersifat edukatif dan tidak menggantikan konsultasi medis profesional.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}