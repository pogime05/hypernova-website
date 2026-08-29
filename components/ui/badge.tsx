"use client";

import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  /** Show a small static accent dot before the label. */
  dot?: boolean;
  className?: string;
}

/**
 * Flat editorial tag — monospace, tracked, hairline rule border. No glow,
 * no pulse. Used for availability / status labels.
 */
export function Badge({ children, dot = false, className = "" }: BadgeProps) {
  return (
    <span
      className={`eyebrow inline-flex items-center gap-2 border border-rule px-3 py-1.5 text-ash ${className}`}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
      {children}
    </span>
  );
}
