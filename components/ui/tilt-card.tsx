"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { PointerEvent, ReactNode, useRef } from "react";

const MAX_TILT = 6; // degrees — subtle, not gimmicky
const SPRING = { stiffness: 150, damping: 17, mass: 0.6 };

interface TiltCardProps {
  children: ReactNode;
  /** Applied to the outer (perspective) wrapper — pass layout classes here. */
  className?: string;
  /** Hex accent used to faintly tint the cursor sheen. */
  glareColor?: string;
}

/**
 * Wraps a card and tilts it toward the cursor (rotateX/rotateY, max ~6°) with a
 * faint cursor-following sheen. The tilt lives on an OUTER layer so it layers
 * cleanly over the inner card's existing hover lift/glow (no stacked transforms).
 *
 * Perf: the bounding rect is read once on pointer-enter and cached; pointer-move
 * only does arithmetic + motionValue.set (no layout reads → no thrash).
 * Reduced-motion users get a plain, static wrapper.
 */
export function TiltCard({
  children,
  className = "",
  glareColor = "#6C47FF",
}: TiltCardProps) {
  const reduced = useReducedMotion();

  const rotateX = useSpring(useMotionValue(0), SPRING);
  const rotateY = useSpring(useMotionValue(0), SPRING);

  // Sheen position (%) + opacity.
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useSpring(useMotionValue(0), {
    stiffness: 120,
    damping: 20,
  });
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.10), ${glareColor}0d 35%, transparent 60%)`;

  const rectRef = useRef<DOMRect | null>(null);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  function handleEnter(e: PointerEvent<HTMLDivElement>) {
    rectRef.current = e.currentTarget.getBoundingClientRect();
    glareOpacity.set(1);
  }

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    const rect = rectRef.current;
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    rotateY.set((px - 0.5) * 2 * MAX_TILT); // right tilts +Y
    rotateX.set((0.5 - py) * 2 * MAX_TILT); // up tilts +X (inverted)
    glareX.set(px * 100);
    glareY.set(py * 100);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
    glareOpacity.set(0);
    glareX.set(50);
    glareY.set(50);
  }

  return (
    <div
      className={className}
      style={{ perspective: 1000 }}
      onPointerEnter={handleEnter}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <motion.div
        className="relative h-full transform-gpu"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {children}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-2xl"
          style={{ background: glareBg, opacity: glareOpacity }}
        />
      </motion.div>
    </div>
  );
}
