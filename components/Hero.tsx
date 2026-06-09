"use client";

import React from "react";
import dynamic from "next/dynamic";
import { site } from "@/data/site";

const TVScene = dynamic(() => import("./TVScene"), { ssr: false });

// TV test-pattern color bars cycle: White → Yellow → Cyan → Green → Magenta → Red → Blue
const TV_COLORS = ['#ffffff', '#ffff00', '#00ffff', '#00ff00', '#ff00ff', '#ff0000', '#3366ff'];

function tvLetterStyle(index: number): React.CSSProperties {
  const c = TV_COLORS[index % TV_COLORS.length];
  return {
    color: '#ffffff',
    textShadow: `-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 1px 1px 0 ${c}bb, 2px 2px 0 ${c}99, 3px 3px 0 ${c}77, 4px 4px 0 ${c}55, 5px 5px 0 ${c}33, 6px 6px 8px ${c}44`,
  };
}

const FIRST = 'YAILAN';
const LAST = 'BORDAS';

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
          "linear-gradient(to bottom, oklch(6% 0.018 260) 0%, oklch(9% 0.022 260) 30%, oklch(12% 0.028 260) 100%)",
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
              {FIRST.split('').map((l, i) => <span key={i} style={tvLetterStyle(i)}>{l}</span>)}
            </span>
            <span
              className="hero-title-word"
              style={{
                fontSize: "clamp(4.5rem, 20vw, 9rem)",
                paddingLeft: "clamp(1rem, 4.5vw, 3rem)",
              }}
            >
              {LAST.split('').map((l, i) => <span key={i} style={tvLetterStyle(FIRST.length + i)}>{l}</span>)}
            </span>
          </span>
        </h1>

        <div
          className="mt-4"
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, rgba(255,255,255,0.75), rgba(255,255,255,0.15) 70%, transparent)",
          }}
        />

        <div
          className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(0.65rem, 2.2vw, 0.875rem)",
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
            background: "linear-gradient(to bottom, oklch(6% 0.018 260), transparent)",
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
                {FIRST.split('').map((l, i) => <span key={i} style={tvLetterStyle(i)}>{l}</span>)}
              </span>
              <span
                className="hero-title-word"
                style={{
                  fontSize: "clamp(4rem, 9.5vw, 8.5rem)",
                  paddingLeft: "clamp(1.5rem, 3vw, 3rem)",
                }}
              >
                {LAST.split('').map((l, i) => <span key={i} style={tvLetterStyle(FIRST.length + i)}>{l}</span>)}
              </span>
            </span>
          </h1>

          <div
            className="mt-8"
            style={{
              height: "1px",
              background:
                "linear-gradient(to right, rgba(255,255,255,0.75), rgba(255,255,255,0.15) 65%, transparent)",
              boxShadow: "0 0 6px rgba(255,255,255,0.25)",
            }}
          />

          <div
            className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.875rem",
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
