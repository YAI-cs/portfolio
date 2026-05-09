import Image from "next/image";
import { site } from "@/data/site";

const STACK = ["YAILAN", "BORDAS", "DESIGN", "ENGINEER"] as const;

export default function Hero() {
  return (
    <section
      id="top"
      aria-label={`${site.name}, ${site.role}`}
      className="relative flex min-h-svh flex-col justify-end px-5 pb-8 pt-28 sm:px-10 sm:pb-10 sm:pt-32 lg:pb-12"
    >
      <figure className="absolute left-5 top-24 flex flex-col items-start gap-2 sm:left-10 sm:top-28 lg:top-32">
        <div className="relative aspect-[3/4] w-28 overflow-hidden border border-stone bg-cream-deep sm:w-36 lg:w-48">
          <Image
            src="/portrait.jpg"
            alt={`Portrait of ${site.name}`}
            fill
            priority
            sizes="(min-width: 1024px) 12rem, (min-width: 640px) 9rem, 7rem"
            className="object-cover"
          />
        </div>
        <figcaption className="font-sans text-[0.625rem] tracking-[0.2em] uppercase text-stone sm:text-[0.6875rem]">
          Fig. 01 — Y.B., {site.year}
        </figcaption>
      </figure>

      <h1 className="font-display text-right leading-[0.95] tracking-tight text-ink">
        <span className="sr-only">{`${site.name}, ${site.role}.`}</span>
        {STACK.map((word, i) => (
          <span
            key={word}
            aria-hidden
            className="block text-[clamp(3rem,11vw,8.5rem)]"
            style={{
              paddingRight: `calc(${i} * clamp(0.5rem, 2vw, 2rem))`,
            }}
          >
            {word}
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
