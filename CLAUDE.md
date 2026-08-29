# HyperNova Technologies — Project CLAUDE.md

Brand site for **HyperNova Technologies**, a modern tech studio: app builders, web platforms,
AI integration, digital cards. The site IS the portfolio — it must prove capability, not just describe it.

Live: https://hypernova-website.vercel.app · Repo: github.com/pogime05/hypernova-website (auto-deploys from `main`).

---

## Brand identity — Light Editorial ("Studio Ledger")

Print/editorial system inspired by Pentagram, Instrument, Basement Studio, Stripe marketing.
Warm paper, near-black ink, ONE electric-indigo accent used like a highlighter. Hairline rules are
the primary structural device. Flat surfaces only — no glass, no glow, no elevation shadows.

- **Always write the full name "HyperNova Technologies"** — never "Hypernova" or "Hypernova Studio".
- **Fonts:**
  - Orbitron — company wordmark ONLY (nav + footer), flat ink, `tracking-[0.12em]` uppercase. No gradient/glow.
  - Syne — display headings, very large `clamp()`, tight tracking (`-0.02em`), heavy (700–800), ink on paper.
  - Inter — body, generous line-height, `ash` for secondary text.
  - JetBrains Mono (`font-mono`) — eyebrows, section indices (01–04), tags, metadata. The `.eyebrow` utility.
- **Palette (tokens in `tailwind.config.ts`):**
  - `paper #FAF9F6` (warm off-white base — NOT pure white) · `ink #0E0E10` (near-black text + punctuation bands)
  - `ash #5A5A63` (secondary text — passes WCAG AA on paper, ~6.6:1) · `rule #E2E0DA` (hairline borders/dividers)
  - `accent #4A2BFF` (single electric indigo — links, ONE primary CTA per view, small marks; used sparingly)
- **Layout:** generous whitespace, wide margins, editorial asymmetry (never centered-everything / symmetrical bento).
  Cards = paper with a 1px `rule` border or plain whitespace separation. Dividers = thin rules. `max-w-8xl` container.
- **Motion:** restrained — Lenis smooth scroll + simple in-view fades/slides only. Nothing pulses, glows, or floats.
- **Imagery:** real Unsplash photography (commercial-use), full-bleed/large, matched to each project's world,
  with proper `alt`. Abstract products (digital cards) → flat `ink` block with the name, never a gradient placeholder.
- Tagline: "We build digital things that actually work."

## Do / Don't

- **Do** treat photography as content — large, full-bleed, relevant, with real `alt` text.
- **Do** use the accent like a highlighter — one accent moment per view, not everywhere.
- **Don't** reintroduce the old AI-look: aurora/WebGL shader, 3D logo canvas, glassmorphism (`backdrop-blur`),
  glow/drop-shadow, radial "orb" gradients, gradient-filled text, tilt/magnetic/count-up motion.
- **Don't** ship fabricated clients / testimonials / case studies without flagging them as samples.
- **Contact email is `pogime05@gmail.com`** everywhere. The old `hello@hypernovatech.co` domain is NOT owned
  and bounces — never use it. Form posts via Web3Forms → routes to `pogime05@gmail.com`.

---

## Stack & structure

- Next.js 14 (App Router) · TypeScript · Tailwind · framer-motion · Lenis smooth scroll.
- 5-page architecture: `/` `/work` `/services` `/about` `/contact`. Nav has restyled mega-menu dropdowns.
- `.npmrc` has `legacy-peer-deps=true`. (`three`/`@react-three/*`/`gsap` remain in package.json but are no longer
  used after the redesign — safe to prune later; not currently imported anywhere.)
- Components in `/components`, primitives in `/components/ui` (`Button`, `Badge`, `Reveal`).
- `next.config.mjs` allows `images.unsplash.com` via `images.remotePatterns` for `next/image`.

## Known cleanup / backlog

- Contact form is wired to Web3Forms (key in `components/contact.tsx`) → `pogime05@gmail.com`.
- `robots.ts` + `sitemap.ts` exist; sitemap still lists the old single-page anchors — could be updated to the 5 routes.
- Prune unused deps (`three`, `@react-three/fiber`, `@react-three/drei`, `gsap`) when convenient.
- Footer social links are placeholder `#` — swap in real profiles when available.
