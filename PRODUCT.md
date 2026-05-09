# Product

## Register

brand

## Users

Two audiences, in order of weight:

1. **Hiring managers and prospective collaborators** scanning the site on a laptop, often after a referral, often with a dozen other tabs open. They have 60 seconds before they decide whether to keep reading. They want to answer: *what does this person actually make, and is it any good?*
2. **Other design engineers, designers, and friends of friends** arriving from a link in a chat. They have more time and more curiosity. They want to see craft up close and possibly poke at the demos.

Mobile is a real surface, not a courtesy: about a third of links get opened on a phone first. The site needs to feel made-for-mobile, not shrunk-down.

## Product Purpose

Yailan Bordas's portfolio. A standing piece of work that shows what a design engineer actually produces: interactive built things, considered visual choices, writing where it fits. Success is measurable in two ways:

- A reader who didn't know Yailan can describe the work and the sensibility after one visit.
- A peer who already knows Yailan thinks "yeah, that's right" rather than "huh, that's not how I'd describe them."

The portfolio is a placeholder-first build. The shell ships now; real projects fill in over time. The design must hold up at both extremes: with three projects and with twelve.

## Brand Personality

**Warm, curious, hand-made.**

Voice is letters-as-objects. Visible craft. The site should feel made by a person who likes making things, not assembled from a template. It should feel inviting, not performative; quietly confident, not arch. Closer to a small letterpress shop than a glass-walled office.

Editorial restraint as the frame, not the content. The typography sets the room; the work fills it. The work is the point.

## Anti-references

Things this should NOT look like:

- **Generic SaaS / Linear-clone**: Inter + indigo + cards + gradient hero metric. Anything that could be a YC-batch landing page.
- **Cookie-cutter dev portfolio**: "Hi, I'm X" with a waving emoji, skill-bar grids, GitHub contribution heatmaps, a "Let's connect" CTA next to a coffee mug photo.
- **Mood-board with no content**: gorgeous typography wrapping nothing. A site that says "I have taste" but doesn't show work or thinking.
- **Loud, scroll-jacked, overstimulating**: heavy parallax, color drench, aggressive entrance animations, autoplay reels.
- **The saturated editorial-typographic lane**: cold Klim-style Didone + Fraunces italic + monochrome cream + small mono labels in three rule-separated columns. The reference is Schwaibold, but the trap is becoming every Notion-adjacent Stripe-adjacent landing page from 2025. Warmth is the differentiator; pick humanist-old-style typography over high-contrast modern Didone.

## Design Principles

1. **The work is the design.** Layouts, typography, and motion exist to frame projects, not to be the projects. Every aesthetic move should make a piece of work read more clearly.
2. **Show your hands.** A design engineer's portfolio should have at least one moment where the reader can poke a thing — a live component, a slider, an interaction — not just look at screenshots. The site demonstrates the discipline.
3. **Editorial frame, builder's body.** The serif and the cream set the tone. The projects themselves can be pixel-precise, technical, even bare. Don't impose the editorial voice on the work; let the frame and the body contrast.
4. **Hold up empty, hold up full.** With three placeholder cards or twelve real projects, the index page should feel intentional, not under-filled or stuffed. Variable section heights and asymmetry over fixed grids.
5. **Slow over loud.** No entrance choreography, no scroll-jacking. Motion only where it earns its keep — a hover that reveals craft, a transition that orients. Reduced-motion users get the still version with no loss.

## Accessibility & Inclusion

- **WCAG 2.2 AA** minimum on contrast (text 4.5:1, large text 3:1) and keyboard navigation.
- **`prefers-reduced-motion`** strictly respected: any motion gates behind the query and falls back to instant state changes.
- Mobile-first sizing; hero typography fluid via `clamp()`, target 360–1440 viewport range cleanly.
- All imagery (when added) gets descriptive alt text written in the brand voice, not "image of laptop."
- Self-hosted typefaces only (no external CDN), loaded via `next/font` for stability and offline fidelity.
