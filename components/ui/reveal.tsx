"use client";

import { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay before the entrance starts, in seconds. */
  delay?: number;
  /** Direction the content travels in from. */
  direction?: "up" | "down" | "left" | "right";
}

const OFFSET = 32;

/**
 * Lightweight scroll-entrance wrapper. Fades + slides content into view the
 * first time it enters the viewport. Built on framer-motion's whileInView.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: RevealProps) {
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
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

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
