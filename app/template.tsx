"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

/**
 * Per-route transition wrapper. Next.js remounts `template.tsx` on every
 * navigation (unlike `layout.tsx`), so a mount-time enter animation gives each
 * page a subtle fade + slide.
 *
 * Important: once the slide finishes we clear the inline transform. Framer
 * leaves a lingering `translateY(0px)`, and any transform on an ancestor turns
 * it into the containing block for `position: fixed` — which would break
 * GSAP ScrollTrigger pinning (the Process deck) further down the page.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => {
        if (ref.current) ref.current.style.transform = "none";
      }}
    >
      {children}
    </motion.div>
  );
}
