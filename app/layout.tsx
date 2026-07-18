import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Kalkulator Skrining Stunting Anak",
  description: "Deteksi dini berdasarkan standar WHO dengan saran kesehatan berbasis Gemini.",
  icons: {
    icon: "/kkn-logo.png",
    apple: "/kkn-logo.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}