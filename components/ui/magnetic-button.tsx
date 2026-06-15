"use client";

import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

// Animated next/link so internal routes get client-side navigation (and the
// page transition) while keeping the magnetic spring effect.
const MotionLink = motion.create(Link);

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  /** How strongly the element follows the cursor (0–1). */
  strength?: number;
  "aria-label"?: string;
}

/**
 * A button/link that "magnetically" drifts toward the cursor while hovered,
 * then springs back to center on leave. Uses framer-motion springs for the
 * pull. Falls back to a plain element on touch (no pointer = no offset).
 */
export function MagneticButton({
  children,
  href,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  strength = 0.35,
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const motionProps = {
    style: { x: springX, y: springY },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    whileTap: { scale: 0.96 },
    className,
  };

  if (href) {
    // Internal routes use next/link for client-side nav; hashes/external use <a>.
    const isInternal = href.startsWith("/");
    if (isInternal) {
      return (
        <MotionLink
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          aria-label={ariaLabel}
          {...motionProps}
        >
          {children}
        </MotionLink>
      );
    }
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
