import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="px-5 pb-12 pt-24 sm:px-10 sm:pb-16 sm:pt-32"
    >
      <div className="mb-14 sm:mb-20">
        <h2 className="text-[0.6875rem] tracking-[0.2em] uppercase text-ink-soft sm:text-[0.75rem]">
          <span className="text-stone">03 —</span> Contact
        </h2>
      </div>

      <div className="grid gap-12 sm:grid-cols-12">
        <div className="sm:col-span-7">
          <p className="font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] tracking-tight text-ink">
            Working on something quiet and interesting?{" "}
            <a
              href={`mailto:${site.email}`}
              className="relative inline-block underline decoration-stone decoration-1 underline-offset-[0.2em] transition-colors hover:text-clay-deep hover:decoration-clay focus-visible:text-clay-deep focus-visible:decoration-clay"
            >
              Send a note.
            </a>
          </p>

          <ul className="mt-10 space-y-3 text-[0.9375rem] text-ink-soft sm:text-[1rem]">
            <li className="flex gap-4">
              <span
                aria-hidden
                className="w-20 shrink-0 text-[0.6875rem] tracking-[0.2em] uppercase text-stone"
              >
                Email
              </span>
              <a
                href={`mailto:${site.email}`}
                className="font-display text-[1.125rem] underline decoration-stone-soft decoration-1 underline-offset-[0.2em] transition-colors hover:text-clay-deep hover:decoration-clay focus-visible:text-clay-deep focus-visible:decoration-clay sm:text-[1.25rem]"
              >
                {site.email}
              </a>
            </li>
            <li className="flex gap-4">
              <span
                aria-hidden
                className="w-20 shrink-0 text-[0.6875rem] tracking-[0.2em] uppercase text-stone"
              >
                Located
              </span>
              <span>{site.city}</span>
            </li>
          </ul>
        </div>

        <aside className="sm:col-span-4 sm:col-start-9">
          <h3 className="text-[0.6875rem] tracking-[0.2em] uppercase text-stone sm:text-[0.75rem]">
            Colophon
          </h3>
          <dl className="mt-3 space-y-2 text-[0.875rem] leading-[1.45] text-ink-soft">
            <div className="flex gap-3">
              <dt className="w-16 shrink-0 text-stone">Display</dt>
              <dd>Young Serif by Bastien Sozeau</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-16 shrink-0 text-stone">Body</dt>
              <dd>Bricolage Grotesque by Mathieu Triay</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-16 shrink-0 text-stone">Built</dt>
              <dd>Next.js, hand-set in {site.year}</dd>
            </div>
          </dl>
        </aside>
      </div>

      <hr className="mt-16 sm:mt-24" />
      <div className="flex items-center justify-between pt-6">
        <span className="text-[0.6875rem] tracking-[0.2em] uppercase text-stone sm:text-[0.75rem]">
          © {site.yearRoman} · {site.name}
        </span>
        <a
          href="#top"
          className="text-[0.6875rem] tracking-[0.2em] uppercase text-stone transition-colors hover:text-clay focus-visible:text-clay sm:text-[0.75rem]"
        >
          Top ↑
        </a>
      </div>
    </footer>
  );
}
