"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "accent" | "cyan" | "green";
  pulse?: boolean;
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  pulse = false,
  className = "",
}: BadgeProps) {
  const variants = {
    default: "bg-white/5 border-white/10 text-muted",
    accent: "bg-accent/10 border-accent/30 text-accent",
    cyan: "bg-cyan/10 border-cyan/30 text-cyan",
    green: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  };

  return (
    <motion.span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
      )}
      {children}
    </motion.span>
  );
}
