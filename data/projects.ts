export type Project = {
  slug: string;
  title: string;
  year: string;
  role: string;
  blurb: string;
  href?: string;
};

export const projects: Project[] = [
  {
    slug: "field-notes",
    title: "Field Notes",
    year: "2026",
    role: "Design + Build",
    blurb:
      "A small writing tool that treats the cursor like a pen. Built to feel like paper, run like a database.",
  },
  {
    slug: "kindling",
    title: "Kindling",
    year: "2025",
    role: "Design Engineering",
    blurb:
      "A reading app that quietly tracks the shape of your attention and lets you steer it without a streak counter in sight.",
  },
  {
    slug: "lattice",
    title: "Lattice",
    year: "2025",
    role: "Prototype",
    blurb:
      "An experiment in setting type the way a typesetter would, one block at a time. A toy for thinking about rhythm.",
  },
];
