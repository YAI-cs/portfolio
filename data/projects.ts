export type Project = {
  slug: string;
  title: string;
  year: string;
  role: string;
  tagline: string;
  blurb: string;
  href?: string;
};

export const projects: Project[] = [
  {
    slug: "insider-insights",
    title: "Insider Insights",
    year: "2026",
    role: "Next.js · TypeScript · PostgreSQL",
    tagline: "The trades they didn't want you to see.",
    blurb:
      "Bloomberg-terminal-style insider trading dashboard. Fetches SEC EDGAR filings and Yahoo Finance data, enriches via LLM, and surfaces real-time Form 4 and STOCK Act disclosures for political and executive insiders.",
    href: "https://insiderinsights.yailanbordas.com/",
  },
  {
    slug: "portfolio",
    title: "Portfolio",
    year: "2026",
    role: "Next.js · React 19 · Tailwind v4",
    tagline: "Built to haunt you.",
    blurb:
      "Single-page portfolio built with Next.js 16, React 19, and TypeScript. Custom OKLCH color token system, semantic accessibility throughout, and a prefers-reduced-motion media query that disables all transitions site-wide.",
    href: "/",
  },
  {
    slug: "text-analysis",
    title: "Text Analysis",
    year: "2025",
    role: "Python · React · NLP",
    tagline: "Every word leaves a mark.",
    blurb:
      "AI-powered text analysis model combining sentiment analysis and named entity recognition to evaluate emotional intensity and extract key information from unstructured text. React interface to visualize the results.",
  },
];
