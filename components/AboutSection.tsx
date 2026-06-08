import Image from "next/image";
import { site } from "@/data/site";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="px-5 py-20 sm:px-10 sm:py-28 lg:py-36"
      style={{ background: "var(--color-void-mid)" }}
    >
      {/* Section label */}
      <div
        className="mb-10 sm:mb-14"
        style={{ borderTop: "1px solid oklch(35% 0.010 64)", paddingTop: "1.5rem" }}
      >
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-mono)",
            fontSize: "0.5rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--color-crimson)",
            marginBottom: "0.25rem",
          }}
        >
          02
        </span>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            letterSpacing: "0.03em",
            textTransform: "uppercase",
            color: "var(--color-white)",
            lineHeight: 1,
          }}
        >
          About
        </h2>
      </div>

      <div className="grid gap-10 sm:grid-cols-12 lg:items-start">
        {/* Main copy: col 1-8 */}
        <div className="sm:col-span-8 sm:col-start-1">
          {/* Pull quote */}
          <p
            className="about-quote mb-10 sm:mb-12"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            I build full-stack products where the interface is part of the engineering.
          </p>

          {/* Body copy */}
          <div
            className="space-y-5"
            style={{
              fontSize: "clamp(0.9375rem, 1.2vw, 1.0625rem)",
              lineHeight: "1.65",
              color: "var(--color-cream-dim)",
              maxWidth: "60ch",
            }}
          >
            <p>
              I&apos;m {site.name}, a software engineer in {site.city}. I studied
              Computer Science at Florida International University and spent the
              last two years building across the stack — from rate limiters and
              GDPR-compliant account flows at a startup, to NLP interfaces at
              American Express.
            </p>
            <p>
              I care about interfaces that feel considered: type that earns its
              weight, data that explains itself, and tools that disappear once
              you learn them. Most of what I make starts as a question about how
              something should feel, and ends in code that answers it.
            </p>
            <p
              style={{
                color: "oklch(72% 0.160 75 / 0.75)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.875rem",
                letterSpacing: "0.04em",
              }}
            >
              Open to full-stack or frontend roles — especially teams that take
              the interface as seriously as the architecture.
            </p>
          </div>
        </div>

        {/* Right column: portrait + sidebar stacked — col 9-12 */}
        <div className="order-first sm:order-last sm:col-span-4 sm:col-start-9 lg:sticky lg:top-24 space-y-6">
          {/* Portrait */}
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "3/4",
              overflow: "hidden",
            }}
          >
            <Image
              src="/portrait-about.jpg"
              alt={`Portrait of ${site.name}`}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 25vw"
              className="object-cover object-top"
              priority
            />
          </div>
          {/* Amber caption strip */}
          <div
            className="flex items-center gap-2"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.4375rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--color-cream-faint)",
            }}
          >
            <span className="rec-dot" style={{ width: "4px", height: "4px" }} />
            <span>{site.name} — {site.city}</span>
          </div>

          {/* Sidebar */}
          <aside>
            <div
              style={{
                borderTop: "1px solid oklch(28% 0.010 62)",
                paddingTop: "1.25rem",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.4375rem",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "var(--color-crimson-deep)",
                  marginBottom: "0.875rem",
                }}
              >
                Currently
              </h3>
              <ul
                className="space-y-2"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.625rem",
                  lineHeight: "1.5",
                  letterSpacing: "0.04em",
                  color: "var(--color-cream-faint)",
                }}
              >
                <li>
                  B.A. Computer Science,{" "}
                  <em style={{ fontStyle: "italic", color: "var(--color-cream-dim)" }}>
                    FIU — GPA 3.6
                  </em>
                </li>
                <li>Previously: American Express, lux.dev.</li>
                <li>Building Insider Insights.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
