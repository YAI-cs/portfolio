import type { Metadata, Viewport } from "next";
import { Bebas_Neue, JetBrains_Mono, Bricolage_Grotesque, VT323 } from "next/font/google";
import { site } from "@/data/site";
import AnchorNav from "@/components/AnchorNav";
import PressMark from "@/components/PressMark";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "wdth"],
});

const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: `Portfolio | ${site.name}`,
  description: `Portfolio of ${site.name}, software engineer based in ${site.city}.`,
  authors: [{ name: site.name }],
};

export const viewport: Viewport = {
  themeColor: "#120d07",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${jetbrainsMono.variable} ${bricolage.variable} ${vt323.variable}`}
    >
      <body className="bg-void text-cream antialiased">
        <div className="film-grain-overlay" aria-hidden="true" />
        <div className="crt-overlay" aria-hidden="true" />
        <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 pt-4 sm:px-10 sm:pt-5">
          <PressMark />
          <AnchorNav />
        </header>

        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
