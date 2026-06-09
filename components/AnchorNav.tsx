"use client";

import { useEffect, useState } from "react";

const ITEMS = [
  { id: "about", label: "About" },
  { id: "work", label: "Projects" },
  { id: "contact", label: "Contact Me" },
] as const;

export default function AnchorNav() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = ITEMS
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0 && visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Sections" className="flex items-center gap-5 sm:gap-7">
      {ITEMS.map((item) => {
        const isActive = active === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={isActive ? "true" : undefined}
            className="group relative font-mono text-[0.75rem] tracking-[0.18em] uppercase transition-colors"
            style={{
              color: isActive
                ? "var(--color-white)"
                : "oklch(55% 0.008 70 / 0.8)",
              textShadow: isActive
                ? "0 0 10px oklch(95% 0.006 75 / 0.4)"
                : "none",
            }}
          >
            {isActive && (
              <span
                className="rec-dot mr-1.5 inline-block"
                aria-hidden="true"
                style={{ width: "5px", height: "5px" }}
              />
            )}
            {item.label}
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-0.5 left-0 h-px transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                width: isActive ? "100%" : "0%",
                background: "var(--color-cream)",
                boxShadow: "none",
              }}
            />
          </a>
        );
      })}
    </nav>
  );
}
