import { projects } from "@/data/projects";

export default function WorkSection() {
  return (
    <section id="work" className="px-5 py-24 sm:px-10 sm:py-32 lg:py-40">
      <div className="mb-14 flex items-baseline justify-between sm:mb-20">
        <h2 className="text-[0.6875rem] tracking-[0.2em] uppercase text-ink-soft sm:text-[0.75rem]">
          <span className="text-ink-soft">01 —</span> Selected Work
        </h2>
        <span className="text-[0.6875rem] tracking-[0.2em] uppercase text-ink-soft sm:text-[0.75rem]">
          {projects.length} {projects.length === 1 ? "project" : "projects"}
        </span>
      </div>

      <ol className="space-y-2">
        {projects.map((project, i) => {
          const number = String(i + 1).padStart(2, "0");
          return (
            <li key={project.slug}>
              <a
                href={project.href ?? `#work-${project.slug}`}
                className="group relative grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 border-t border-stone-soft py-7 transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:pl-3 focus-visible:pl-3 sm:grid-cols-[auto_1fr_auto] sm:gap-x-8 sm:py-10 sm:hover:pl-4 sm:focus-visible:pl-4"
                aria-label={`${project.title}, ${project.role}, ${project.year}`}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-1/2 h-px w-0 -translate-y-1/2 bg-clay transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-2 group-focus-visible:w-2 sm:group-hover:w-3 sm:group-focus-visible:w-3"
                />
                <span
                  aria-hidden
                  className="font-sans text-[0.75rem] tabular-nums tracking-[0.14em] text-ink-soft sm:text-[0.8125rem]"
                >
                  {number}
                </span>
                <div className="col-start-2 flex flex-col gap-2 sm:col-start-2 sm:gap-3">
                  <h3 className="font-display text-[clamp(1.625rem,4vw,2.75rem)] leading-[1.05] tracking-tight text-ink transition-colors group-hover:text-clay-deep group-focus-visible:text-clay-deep">
                    {project.title}
                  </h3>
                  <p className="max-w-[55ch] text-[0.9375rem] leading-[1.55] text-ink-soft sm:text-[1rem]">
                    {project.blurb}
                  </p>
                </div>
                <div className="col-start-2 flex flex-wrap gap-x-3 gap-y-1 text-[0.6875rem] tracking-[0.18em] uppercase text-ink-soft sm:col-start-3 sm:flex-col sm:gap-1 sm:text-right sm:text-[0.75rem]">
                  <span>{project.role}</span>
                  <span className="text-stone sm:hidden" aria-hidden>·</span>
                  <span className="tabular-nums">{project.year}</span>
                </div>
              </a>
            </li>
          );
        })}
      </ol>

      <div className="mt-2 border-t border-stone-soft pt-6">
        <p className="text-[0.6875rem] tracking-[0.18em] uppercase text-ink-soft sm:text-[0.75rem]">
          More work in progress, filed under quietly.
        </p>
      </div>
    </section>
  );
}
