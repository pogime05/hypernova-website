"use client";

import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /** The exact final value to land on (e.g. 48.2, 2941, 99.9). */
  value: number;
  /** Decimal places to display — also the count-up precision. */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Seconds. */
  duration?: number;
  className?: string;
}

function format(n: number, decimals: number) {
  // en-US → comma thousands grouping + fixed decimals.
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Counts up from 0 to `value` once, when scrolled into view.
 * Lands on the EXACT value (animate() resolves to target; onComplete hard-sets
 * the formatted final string as a belt-and-suspenders against float drift).
 * Reduced-motion users see the final value immediately.
 */
export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.2,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const mv = useMotionValue(0);
  // Server + first client render share this, so no hydration mismatch.
  const [display, setDisplay] = useState(() => format(0, decimals));

  useEffect(() => {
    if (!inView) return;

    if (reduced) {
      setDisplay(format(value, decimals));
      return;
    }

    const controls = animate(mv, value, {
      duration,
      ease: [0.22, 1, 0.36, 1], // expo-out — matches the site's easing
      onUpdate: (latest) => setDisplay(format(latest, decimals)),
      onComplete: () => setDisplay(format(value, decimals)),
    });

    return () => controls.stop();
  }, [inView, reduced, value, decimals, duration, mv]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
