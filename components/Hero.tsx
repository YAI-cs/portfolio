"use client";

import dynamic from "next/dynamic";
import { site } from "@/data/site";

const TVScene = dynamic(() => import("./TVScene"), { ssr: false });

export default function Hero() {
  return (
    <section
      id="top"
      aria-label={`${site.name}, ${site.role}`}
      // Mobile: flex column — text on top, TV fixed height directly below
      // Desktop: block + relative so TV can be absolute full-bleed
      className="flex flex-col overflow-hidden lg:relative lg:block lg:min-h-svh"
      style={{
        background:
          "linear-gradient(to bottom, oklch(6% 0.018 16) 0%, oklch(9% 0.022 16) 30%, oklch(12% 0.028 16) 100%)",
      }}
    >
      {/* ── Mobile: text at top — hidden on desktop ── */}
      <div className="relative z-10 shrink-0 px-5 pt-20 pb-4 sm:px-10 sm:pt-24 lg:hidden">
        <h1 aria-label={`${site.name}, ${site.role}.`}>
          <span className="sr-only">{`${site.name}, ${site.role}.`}</span>
          <span aria-hidden className="flex flex-col">
            <span
              className="hero-title-word"
              style={{ fontSize: "clamp(4.5rem, 20vw, 9rem)" }}
            >
              YAILAN
            </span>
            <span
              className="hero-title-word"
              style={{
                fontSize: "clamp(4.5rem, 20vw, 9rem)",
                paddingLeft: "clamp(1rem, 4.5vw, 3rem)",
              }}
            >
              BORDAS
            </span>
          </span>
        </h1>

        <div
          className="mt-4"
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, oklch(52% 0.220 20 / 0.70), oklch(52% 0.220 20 / 0.12) 70%, transparent)",
          }}
        />

        <div
          className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(0.4rem, 1.6vw, 0.5625rem)",
            letterSpacing: "0.20em",
            textTransform: "uppercase",
            color: "var(--color-cream-dim)",
          }}
        >
          <span style={{ color: "var(--color-cream)" }}>{site.role}</span>
          <span style={{ color: "var(--color-cream-faint)" }}>·</span>
          <span>{site.city}</span>
          <span style={{ color: "var(--color-cream-faint)" }}>·</span>
          <span style={{ color: "var(--color-cream)" }}>Available</span>
        </div>
      </div>

      {/* TV scene
          Mobile: fixed vw-based height so it sits right below the text
          Desktop: absolute inset-0 full-bleed background */}
      <div className="relative h-[68vw] sm:h-[62vw] lg:absolute lg:inset-0 lg:z-0 lg:h-auto">
        <TVScene />
        {/* Gradient seam fix — mobile only */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-16 lg:hidden"
          style={{
            background: "linear-gradient(to bottom, oklch(6% 0.018 16), transparent)",
          }}
        />
      </div>

      {/* ── Desktop: text overlay left — hidden on mobile ── */}
      <div className="relative z-10 hidden min-h-svh items-center lg:flex">
        <div
          className="flex flex-col justify-center pb-70 pt-1"
          style={{
            width: "45%",
            paddingLeft: "clamp(3rem, 8vw, 7rem)",
            paddingRight: "2rem",
          }}
        >
          <h1 aria-label={`${site.name}, ${site.role}.`}>
            <span className="sr-only">{`${site.name}, ${site.role}.`}</span>
            <span aria-hidden className="flex flex-col">
              <span
                className="hero-title-word"
                style={{ fontSize: "clamp(4rem, 9.5vw, 8.5rem)" }}
              >
                YAILAN
              </span>
              <span
                className="hero-title-word"
                style={{
                  fontSize: "clamp(4rem, 9.5vw, 8.5rem)",
                  paddingLeft: "clamp(1.5rem, 3vw, 3rem)",
                }}
              >
                BORDAS
              </span>
            </span>
          </h1>

          <div
            className="mt-8"
            style={{
              height: "1px",
              background:
                "linear-gradient(to right, oklch(52% 0.220 20 / 0.70), oklch(52% 0.220 20 / 0.12) 65%, transparent)",
              boxShadow: "0 0 6px oklch(52% 0.220 20 / 0.30)",
            }}
          />

          <div
            className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.5625rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--color-cream-dim)",
            }}
          >
            <span style={{ color: "var(--color-cream)" }}>{site.role}</span>
            <span style={{ color: "var(--color-cream-faint)" }}>·</span>
            <span>{site.city}</span>
            <span style={{ color: "var(--color-cream-faint)" }}>·</span>
            <span style={{ color: "var(--color-cream)" }}>Available</span>
          </div>
        </div>
      </div>
    </section>
  );
}
