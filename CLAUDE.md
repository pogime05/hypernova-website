# HyperNova Technologies — Project CLAUDE.md

Brand site for **HyperNova Technologies**, a modern tech studio: app builders, web platforms,
AI integration, digital cards. The site IS the portfolio — it must prove capability, not just describe it.

Live: https://hypernova-website.vercel.app · Repo: github.com/pogime05/hypernova-website (auto-deploys from `main`).

---

## Brand identity

- **Always write the full name "HyperNova Technologies"** — never "Hypernova" or "Hypernova Studio".
- **Fonts:** Orbitron (company name only — all-caps, tracking-wider) · Syne (headings) · Inter (body).
- **Palette:**
  - bg `#0A0A0F` · surface `#13131A` · elevated `#1A1A24` · border `rgba(255,255,255,0.06)`
  - accent violet `#6C47FF` · accent cyan `#00D9FF`
  - text `#F0F0F5` · muted `#9B9BAD` (raised from `#6B6B7B` for WCAG AA on dark)
- Dark theme but **always layered** — surfaces, accent glows, light pockets. Never flat-black void.
- Tagline: "We build digital things that actually work."

## Do / Don't

- **Do** show real coded UI (mini dashboards, digital-card previews, app screens) as proof of work.
- **Do** keep a signature interactive moment (3D logo, scripted AI showcase) that feels premium.
- **Don't** ship fabricated clients / testimonials / case studies without flagging them as samples.
- **Don't** add a second WebGL context — the hero 3D logo is the only `<Canvas>`.
- `hello@hypernovatech.co` is shown on the site but the domain is **not owned** — not a working inbox.
  Real form submissions should route to a real backend (Supabase/Web3Forms) → pogime05@gmail.com.

---

## Stack & structure

- Next.js 14 (App Router) · TypeScript · Tailwind · framer-motion · Lenis smooth scroll.
- 3D: `@react-three/fiber@8` + `@react-three/drei@9` + `three@0.168` (React 18 lock — see global rules).
- `.npmrc` has `legacy-peer-deps=true` (required for the R3F peer-dep mismatch).
- Components in `/components`, primitives in `/components/ui`.
- Interactions already in place: Lenis, hero parallax, magnetic buttons, in-view reveals.

## Known cleanup / backlog

- Contact form is currently a fake `setTimeout` — wire to a real backend.
- `components/logo3d-mini.tsx` is dead code (nav uses `next/image`) — safe to delete.
- Missing `app/robots.ts` + `app/sitemap.ts`.
- OG image is the square logo — needs a dedicated 1200×630.
- Redesign in progress: depth/light system, live service-card visuals, scripted "AI in action" showcase.
