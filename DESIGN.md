<!-- SEED: re-run /impeccable document once there's code to capture the actual tokens and components. -->
---
name: Yailan Bordas Portfolio
description: Editorial-frame, builder's-body portfolio for a design engineer. Warm, curious, hand-made.
---

# Design System: Yailan Bordas Portfolio

## 1. Overview

**Creative North Star: "The Letterpress Studio."**

Imagine a small letterpress shop on a quiet street: warm cream paper, ink that's been mixed by hand, type set deliberately, mistakes left visible because they prove a person was there. The visitor arrives, sees the type, and immediately understands two things — the place is run by someone who cares, and the work being printed is the point. The frame is editorial; the body of work is whatever's currently on the press.

The portfolio borrows that posture. Cream surfaces, hand-old-style display type, a single warm accent that earns its appearances. No dark-mode-by-default. No drenched color. No scroll-jacking. The system says "slow craft" without saying it out loud.

This system explicitly rejects the saturated 2025 editorial-typographic lane: cold Klim-style Didone + Fraunces italic on monochrome cream, three rule-separated columns of mono labels, the Notion-adjacent / Stripe-adjacent landing page that has flooded design-engineer portfolios. Warmth is the differentiator. Old-style humanist serifs over high-contrast modern Didones. Letters that have weight and warmth, not glass.

**Key Characteristics:**
- Cream paper surface with one committed warm accent
- Old-style display serif as the voice; warm humanist sans for body
- Asymmetric typographic compositions, not centered stacks
- Restrained motion: state changes and orientation transitions only
- Visible craft: ligatures, optical sizing, alternates where they fit
- Mobile is a first-class surface, not a courtesy

## 2. Colors

A **Restrained** strategy. Tinted neutrals carry 90%+ of every screen. One warm accent — a clay-brick orange — earns roughly 5–10% of any given surface. The accent is for emphasis (active links, the rare pull-quote, a hover tell), not decoration.

### Primary
- **Clay Brick** [to be resolved during implementation, anchor: warm orange-red, oklch ~52% 0.13 38]: The single accent. Used for active links, current section markers, hover treatments, and the rare pull-quote rule. Never on body text. Never as a fill behind text.

### Neutral
- **Warm Cream** [anchor: oklch ~96% 0.012 75, slightly tinted toward the accent hue]: Page background. Never `#fff`.
- **Warm Ink** [anchor: oklch ~22% 0.012 75]: Body text. Never `#000`.
- **Soft Stone** [anchor: oklch ~78% 0.008 75]: Hairlines, dividers, secondary metadata.

### Named Rules

**The One-Voice Rule.** Only one color speaks per screen. The accent is rare; the cream and ink are the voice. If a section feels like it needs a second accent, the section needs editing, not a second color.

**The No Pure Rule.** No `#000`, no `#fff`. Every neutral carries a faint chroma toward the accent hue (chroma 0.005–0.012). Pure black and pure white are forbidden.

## 3. Typography

**Display Font:** [to be resolved during implementation — old-style or transitional warm display serif. NOT in the reflex-reject list (no Fraunces, Newsreader, Lora, Crimson, Playfair, Cormorant, DM Serif, Instrument Serif). Candidates: Young Serif, Gambarino, Boldonse, Source Serif 4 Display.]
**Body Font:** [to be resolved during implementation — warm humanist sans. Candidates: Bricolage Grotesque, Switzer, Söhne (paid), Mona Sans.]
**Label/Mono Font:** [optional, for project metadata only — JetBrains Mono, Departure Mono, IBM Plex Mono *only* if it actively earns its place; mono is not the default voice.]

**Character:** Old-style serif with hand-cut warmth, not a high-contrast Didone. The body sans is humanist and faintly mechanical, the kind of letter you'd see on a 1970s museum caption. Together they should read as if a person mixed the type, not as if a template chose it.

### Hierarchy
- **Display** (regular or medium, `clamp(3rem, 10vw, 9rem)`, line-height 0.95): Hero name, project titles when they want to be the moment.
- **Headline** (regular, `clamp(2rem, 4.5vw, 3.5rem)`, line-height 1.05): Section openers.
- **Title** (medium, `clamp(1.25rem, 2vw, 1.625rem)`, line-height 1.2): Project tile headlines, page titles.
- **Body** (regular, `clamp(1rem, 1.1vw, 1.125rem)`, line-height 1.55, max-width 65ch): Long-form text, project blurbs.
- **Label** (medium, `0.75rem`, letter-spacing `0.06em`, uppercase or small-caps): Metadata, dates, section markers, taxonomy.

### Named Rules

**The Asymmetric Rule.** Display type is rarely centered. Right-staggered, left-anchored, or off-grid — there's almost always a deliberate offset that says someone composed it.

**The Italic Reserve Rule.** Italic is reserved for genuine emphasis or titles of works (a book, a project name within a sentence). Never italicize a whole headline for vibes. Editorial italic without a reason is the trap.

## 4. Elevation

**Flat by default.** No drop shadows on rest. Depth is conveyed through tonal layering (a half-shade-darker cream for a recessed footer, hairline rules between sections, generous spacing rather than borders).

The single elevation event in the system is the **focus ring** on keyboard focus: a 2px clay-brick outline at 2px offset, deliberately the only "lift" the design produces.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. Hover states never lift visually; they shift color, underline, or reveal a label. The page reads as paper, not glass.

## 5. Components

[Components are not yet implemented. Re-run `/impeccable document` after the first build to capture actual button, link, project-tile, and navigation tokens.]

## 6. Do's and Don'ts

### Do:
- **Do** anchor the surface in warm cream with one committed warm accent.
- **Do** pick an old-style or transitional warm display serif. Test the choice against the reflex-reject list before committing.
- **Do** compose display typography asymmetrically — right-staggered, left-anchored, off-grid.
- **Do** size hero typography with `clamp()` so 360px and 1440px both feel deliberate.
- **Do** carry the accent through ≤10% of each screen, including states (active link, focus ring, hover tell).
- **Do** tint every neutral toward the accent hue, even by 0.005 chroma.
- **Do** gate every animation behind `prefers-reduced-motion`.
- **Do** self-host every typeface via `next/font`.
- **Do** treat hairline rules and tonal shifts as the elevation system.

### Don't:
- **Don't** use `#000` or `#fff`. Pure black and pure white are forbidden.
- **Don't** drop into the saturated editorial-typographic lane: cold Klim-style Didone + Fraunces italic + monochrome cream + three rule-separated mono columns. That's the trap one tier deeper than the obvious one.
- **Don't** ship "Hi, I'm X 👋" as the hero. No waving emoji, no skill-bar grid, no GitHub heatmap, no coffee-mug photo next to a "Let's connect" CTA.
- **Don't** ship a Linear/SaaS clone — Inter + indigo + cards + gradient hero metric.
- **Don't** scroll-jack, parallax, or animate entrance choreography. No autoplay reels.
- **Don't** stretch typography across the full viewport on every section. Vary; rhythm comes from contrast.
- **Don't** wrap every block in a card. Cards on a portfolio are the lazy answer.
- **Don't** use side-stripe borders (border-left > 1px as a colored stripe).
- **Don't** use gradient text (background-clip: text).
- **Don't** use glassmorphism decoratively.
- **Don't** italicize whole headlines for vibes. Italic is for genuine emphasis or titles of works.
- **Don't** use monospace as lazy shorthand for "technical." Mono only earns its place where it carries information (dates, project IDs, keystrokes).
