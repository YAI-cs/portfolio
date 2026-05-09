import { site } from "@/data/site";

export default function AboutSection() {
  return (
    <section id="about" className="bg-cream-deep px-5 py-24 sm:px-10 sm:py-32 lg:py-40">
      <div className="mb-14 sm:mb-20">
        <h2 className="text-[0.6875rem] tracking-[0.2em] uppercase text-ink-soft sm:text-[0.75rem]">
          <span className="text-ink-soft">02 —</span> About
        </h2>
      </div>

      <div className="grid gap-12 sm:grid-cols-12">
        <div className="sm:col-span-7 sm:col-start-2">
          <p className="font-display text-[clamp(1.625rem,3.4vw,2.5rem)] leading-[1.15] tracking-tight text-ink">
            <span
              className="float-left mr-3 leading-[0.85] text-clay sm:mr-5"
              style={{ fontSize: "clamp(4.5rem, 10vw, 8rem)" }}
            >
              I
            </span>
            make tools and websites where the interface itself is the design — small, considered things that try to feel made by a person, not a template.
          </p>

          <div className="mt-12 max-w-[60ch] space-y-6 text-[1rem] leading-[1.6] text-ink-soft sm:text-[1.0625rem]">
            <p>
              I&apos;m {site.name}, a design engineer in {site.city}. I sit
              between the two desks: the one with the typeface specimens and the
              one with the keyboard. Most of what I make starts as a question
              about how something should feel, and ends in code that answers it.
            </p>
            <p>
              I like writing that respects the reader&apos;s attention,
              interfaces that prefer paper over glass, and tools that get out of
              the way. I&apos;m allergic to demo gloss and skill bars.
            </p>
            <p>
              Currently open to selective work: product design with engineering
              depth, or engineering with design ownership. Brief notes welcome.
            </p>
          </div>
        </div>

        <aside className="sm:col-span-3 sm:col-start-10">
          <div className="border-t border-stone pt-5">
            <h3 className="text-[0.6875rem] tracking-[0.2em] uppercase text-ink-soft sm:text-[0.75rem]">
              Currently
            </h3>
            <ul className="mt-3 space-y-2 text-[0.9375rem] leading-[1.4] text-ink-soft">
              <li>Reading <em className="font-display">The Architecture of Happiness</em>.</li>
              <li>Building small writing tools.</li>
              <li>Re-learning to letterpress, badly.</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
