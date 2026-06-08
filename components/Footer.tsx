import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="px-5 pb-10 pt-20 sm:px-10 sm:pb-14 sm:pt-28"
    >
      {/* Section label */}
      <div
        className="mb-10 sm:mb-14"
        style={{ borderTop: "1px solid oklch(28% 0.010 62)", paddingTop: "1.5rem" }}
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
          03
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
          Contact
        </h2>
      </div>

      {/* REWIND headline */}
      <div className="mb-12 sm:mb-16">
        <p
          className="rewind-text"
          aria-hidden
          style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}
        >
          REWIND ◄◄
        </p>
        <p className="sr-only">Contact Yailan Bordas</p>
      </div>

      {/* Contact grid */}
      <div className="grid gap-10 sm:grid-cols-12">
        <div className="sm:col-span-7">
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
              lineHeight: "1.05",
              letterSpacing: "0.02em",
              color: "var(--color-cream)",
            }}
          >
            Working on something quiet and interesting?{" "}
            <a
              href={`mailto:${site.email}`}
              style={{ color: "var(--color-crimson-bright)", textDecoration: "none" }}
              className="transition-opacity hover:opacity-75 focus-visible:opacity-75"
            >
              Send a note.
            </a>
          </p>

          {/* Contact details */}
          <ul className="mt-10 space-y-4">
            <li className="flex items-baseline gap-5">
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.4375rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--color-crimson-deep)",
                  width: "4.5rem",
                  flexShrink: 0,
                }}
              >
                Email
              </span>
              <a
                href={`mailto:${site.email}`}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(0.75rem, 1.5vw, 1rem)",
                  letterSpacing: "0.05em",
                  color: "var(--color-crimson-bright)",
                  textDecoration: "none",
                  textShadow: "0 0 14px oklch(52% 0.220 20 / 0.30)",
                }}
                className="transition-opacity hover:opacity-75 focus-visible:opacity-75"
              >
                {site.email}
              </a>
            </li>
            <li className="flex items-baseline gap-5">
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.4375rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--color-crimson-deep)",
                  width: "4.5rem",
                  flexShrink: 0,
                }}
              >
                Located
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.1em",
                  color: "var(--color-cream-dim)",
                }}
              >
                {site.city}
              </span>
            </li>
          </ul>
        </div>

        {/* Colophon */}
        <aside className="sm:col-span-4 sm:col-start-9">
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
            Colophon
          </h3>
          <dl
            className="space-y-2"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.5625rem",
              lineHeight: "1.5",
              letterSpacing: "0.05em",
              color: "var(--color-cream-faint)",
            }}
          >
            <div className="flex gap-3">
              <dt style={{ width: "3.5rem", flexShrink: 0 }}>Display</dt>
              <dd>Bebas Neue</dd>
            </div>
            <div className="flex gap-3">
              <dt style={{ width: "3.5rem", flexShrink: 0 }}>Labels</dt>
              <dd>JetBrains Mono</dd>
            </div>
            <div className="flex gap-3">
              <dt style={{ width: "3.5rem", flexShrink: 0 }}>Body</dt>
              <dd>Bricolage Grotesque</dd>
            </div>
            <div className="flex gap-3">
              <dt style={{ width: "3.5rem", flexShrink: 0 }}>Built</dt>
              <dd>Next.js, {site.year}</dd>
            </div>
          </dl>
        </aside>
      </div>

      {/* Footer bar */}
      <hr className="mt-16 sm:mt-24" />
      <div className="flex items-center justify-between pt-5">
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.4375rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--color-cream-faint)",
          }}
        >
          © {site.year} · {site.name}
        </span>
        <a
          href="#top"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.4375rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--color-cream-faint)",
          }}
          className="transition-colors hover:text-amber focus-visible:text-amber"
        >
          Top ↑
        </a>
      </div>
    </footer>
  );
}
