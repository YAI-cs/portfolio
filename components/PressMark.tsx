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
      className="group inline-flex h-9 w-9 items-center justify-center border transition-colors"
      style={{ borderColor: "oklch(38% 0.008 68 / 0.55)" }}
    >
      <span
        className="font-display text-sm transition-colors"
        style={{
          color: "var(--color-cream-dim)",
          letterSpacing: "0.12em",
        }}
      >
        {initials}
      </span>
    </a>
  );
}
