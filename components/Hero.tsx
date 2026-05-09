"use client";

import { useEffect, useRef } from "react";
import { site } from "@/data/site";

const STACK = ["YAILAN", "BORDAS", "DESIGN", "ENGINEER"] as const;

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const letters = Array.from(
      hero.querySelectorAll<HTMLSpanElement>("[data-letter]"),
    );
    if (letters.length === 0) return;

    type LetterCenter = { el: HTMLSpanElement; cx: number; cy: number };
    let centers: LetterCenter[] = [];
    const computeCenters = () => {
      const heroRect = hero.getBoundingClientRect();
      centers = letters.map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          el,
          cx: rect.left - heroRect.left + rect.width / 2,
          cy: rect.top - heroRect.top + rect.height / 2,
        };
      });
    };
    computeCenters();

    const target = { x: -9999, y: -9999, active: false };
    const RADIUS = 260;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
      target.active = true;
    };
    const onLeave = () => {
      target.active = false;
    };
    const onResize = () => {
      computeCenters();
    };

    const tick = () => {
      for (const { el, cx, cy } of centers) {
        const dx = target.x - cx;
        const dy = target.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = target.active ? Math.max(0, 1 - dist / RADIUS) : 0;
        const eased = proximity * proximity;
        const scale = 1 + eased * 0.08;
        const ty = -eased * 5;
        el.style.transform = `translateY(${ty.toFixed(2)}px) scale(${scale.toFixed(3)})`;
      }
      raf = requestAnimationFrame(tick);
    };

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="top"
      aria-label={`${site.name}, ${site.role}`}
      className="relative flex min-h-svh flex-col justify-end px-5 pb-10 pt-28 sm:px-10 sm:pb-14 sm:pt-32 lg:pb-20"
    >
      <h1 className="font-display text-right leading-[0.95] tracking-tight text-ink">
        <span className="sr-only">{`${site.name}, ${site.role}.`}</span>
        {STACK.map((word, i) => (
          <span
            key={word}
            aria-hidden
            className="block text-[clamp(2.75rem,13vw,11.5rem)]"
            style={{
              paddingRight: `calc(${i} * clamp(0.5rem, 2.4vw, 2.75rem))`,
            }}
          >
            {Array.from(word).map((char, j) => (
              <span
                key={`${word}-${j}`}
                data-letter
                className="inline-block will-change-transform"
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </h1>

      <div className="mt-8 flex flex-wrap items-center justify-end gap-x-3 gap-y-1 text-[0.6875rem] tracking-[0.2em] uppercase text-ink-soft sm:mt-12 sm:gap-x-4 sm:text-[0.75rem]">
        <span>Based in {site.city}</span>
        <span className="text-stone" aria-hidden>·</span>
        <span>Available for work</span>
        <span className="text-stone" aria-hidden>·</span>
        <span>{site.yearRoman}</span>
      </div>
    </section>
  );
}
