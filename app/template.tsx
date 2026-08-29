/**
 * Per-route transition wrapper. Next.js remounts `template.tsx` on every
 * navigation (unlike `layout.tsx`), so the `.page-enter` CSS animation replays
 * on each route change for a subtle fade.
 *
 * The transition is CSS-driven (see app/globals.css) rather than framer-motion
 * on purpose: a CSS animation runs at first paint and ends in the visible
 * state, so the page is never rendered at opacity:0 while waiting for React to
 * hydrate. Opacity-only (no transform) keeps this element from becoming the
 * containing block for any `position: fixed` descendants.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
