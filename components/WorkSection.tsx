import type React from "react";
import Image from "next/image";
import { projects, type Project } from "@/data/projects";
import RainbowText from "./RainbowText";

const PARTS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

function HorrorPoster({ project, index, style }: { project: Project; index: number; style?: React.CSSProperties }) {
  const cardStyle: React.CSSProperties = {
    ...style,
    gridTemplateColumns: project.screenshot ? "55% 1fr" : "1fr",
  };

  const RAINBOW = 'linear-gradient(to right, #ffffff 0%,#ffffff 14.28%,#ffff00 14.28%,#ffff00 28.57%,#00ffff 28.57%,#00ffff 42.85%,#00ff00 42.85%,#00ff00 57.14%,#ff00ff 57.14%,#ff00ff 71.42%,#ff0000 71.42%,#ff0000 85.71%,#3366ff 85.71%,#3366ff 100%)';

  const inner = (
    <>
      <div style={{ height: '3px', background: RAINBOW, gridColumn: '1 / -1' }} />
      {project.screenshot && (
        <div className="poster-image">
          <Image
            src={project.screenshot}
            alt={`Screenshot of ${project.title}`}
            fill
            sizes="(max-width: 640px) 100vw, 55vw"
            className="object-contain"
          />
        </div>
      )}

      <div className="poster-content">
        <span className="poster-year">{project.year}</span>
        <h3 className="poster-title">{project.title}</h3>
        <div className="poster-rule" aria-hidden />
        <p className="poster-tagline">&ldquo;{project.tagline}&rdquo;</p>
        <p className="poster-blurb">{project.blurb}</p>
        <div className="poster-credits">
          <span className="poster-stack">{project.role}</span>
        </div>
        {project.href && <span className="poster-arrow" aria-hidden>↗</span>}
      </div>
    </>
  );

  if (project.href) {
    const isExternal = project.href.startsWith("http");
    return (
      <a
        href={project.href}
        className="horror-poster-card"
        style={cardStyle}
        aria-label={`View project: ${project.title}`}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <div className="horror-poster-card" style={cardStyle} role="article">
      {inner}
    </div>
  );
}

export default function WorkSection() {
  return (
    <section id="work" className="px-5 py-20 sm:px-10 sm:py-28 lg:py-36">
      {/* Section header */}
      <div
        className="mb-12 sm:mb-16"
        style={{
          borderTop: "1px solid oklch(20% 0.016 18)",
          paddingTop: "1.5rem",
        }}
      >
        <div className="flex items-end justify-between">
          <div>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-mono)",
                fontSize: "1rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--color-white)",
                marginBottom: "0.25rem",
              }}
            >
              02
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3.5rem, 7vw, 6rem)",
                letterSpacing: "0.03em",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              <RainbowText text="Projects" />
            </h2>
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.5rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--color-cream-faint)",
              paddingBottom: "0.25rem",
            }}
          >
            {projects.length} {projects.length === 1 ? "title" : "titles"}
          </span>
        </div>
      </div>

      {/* Horror poster grid */}
      <div className="horror-poster-grid" style={{ maxWidth: "1200px", marginInline: "auto", width: "100%" }}>
        {projects.map((project, i) => (
          <HorrorPoster
            key={project.slug}
            project={project}
            index={i}
            style={{ "--card-index": i } as React.CSSProperties}
          />
        ))}
      </div>

      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.4375rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--color-cream-faint)",
          borderTop: "1px solid oklch(18% 0.014 18)",
          paddingTop: "1.25rem",
          marginTop: "2rem",
        }}
      >
        More work in progress — filed under quietly.
      </p>
    </section>
  );
}
