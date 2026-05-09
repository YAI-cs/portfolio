import { site } from "@/data/site";

export default function PressMark() {
  const initials = site.name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .join("");

  return (
    <a
      href="#top"
      aria-label={`${site.name} — back to top`}
      className="group inline-flex h-9 w-9 items-center justify-center border border-ink/40 text-[0.6875rem] tracking-[0.14em] text-ink/80 transition-colors hover:border-clay hover:text-clay focus-visible:border-clay focus-visible:text-clay"
    >
      <span className="font-sans">{initials}</span>
    </a>
  );
}
