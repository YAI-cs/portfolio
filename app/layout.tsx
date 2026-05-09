import type { Metadata, Viewport } from "next";
import { Young_Serif, Bricolage_Grotesque } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const youngSerif = Young_Serif({
  variable: "--font-young-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "wdth"],
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: `Portfolio of ${site.name}, design engineer based in ${site.city}.`,
  authors: [{ name: site.name }],
};

export const viewport: Viewport = {
  themeColor: "#f6f1e7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${youngSerif.variable} ${bricolage.variable}`}>
      <body className="bg-cream text-ink antialiased">{children}</body>
    </html>
  );
}
