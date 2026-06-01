"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function Card({ children, className = "", hover = true, glow = false }: CardProps) {
  return (
    <motion.div
      className={`
        bg-surface rounded-2xl border border-white/[0.06] p-6 relative overflow-hidden
        ${glow ? "shadow-lg shadow-accent/10" : ""}
        ${className}
      `}
      whileHover={
        hover
          ? {
              borderColor: "rgba(108, 71, 255, 0.3)",
              boxShadow: "0 0 30px rgba(108, 71, 255, 0.1), 0 20px 60px rgba(0,0,0,0.4)",
              y: -4,
            }
          : {}
      }
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
