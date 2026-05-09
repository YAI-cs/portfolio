"use client";

import { useEffect, useState } from "react";

const ITEMS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
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
            className="group relative text-[0.6875rem] tracking-[0.18em] uppercase text-ink/80 transition-colors hover:text-ink"
            aria-current={isActive ? "true" : undefined}
          >
            {item.label}
            <span
              className="pointer-events-none absolute -bottom-1 left-0 h-px bg-clay transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ width: isActive ? "100%" : "0%" }}
              aria-hidden
            />
          </a>
        );
      })}
    </nav>
  );
}
