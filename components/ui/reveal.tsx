"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay before the entrance starts, in seconds. */
  delay?: number;
  /** Direction the content travels in from. */
  direction?: "up" | "down" | "left" | "right";
}

const OFFSET = 28;

/**
 * Lightweight scroll-entrance wrapper. Fades + slides content into view the
 * first time it enters the viewport. For below-the-fold content only — the
 * hero and page-opening headings use the CSS `.rise` load entrance instead so
 * they're never gated behind JS. Respects prefers-reduced-motion.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: RevealProps) {
  const reduced = useReducedMotion();

  const offset = {
    up: { y: OFFSET },
    down: { y: -OFFSET },
    left: { x: OFFSET },
    right: { x: -OFFSET },
  }[direction];

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Clip/mask reveal — content wipes in from the top edge as it scrolls into
 * view. Sharper and more "engineered" than a plain fade; used for section
 * headings. Below-the-fold use only (see note on Reveal).
 */
export function ClipReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
