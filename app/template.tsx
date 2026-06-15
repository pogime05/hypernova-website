"use client";

import { motion } from "framer-motion";

/**
 * Per-route transition wrapper. Next.js remounts `template.tsx` on every
 * navigation (unlike `layout.tsx`), so a mount-time enter animation gives each
 * page a subtle fade + slide. It only animates page content — the nav, footer
 * and shader live in the layout, outside this wrapper — so it never fights
 * Lenis (which owns the scroll position) and won't trap `position: fixed`
 * descendants.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
