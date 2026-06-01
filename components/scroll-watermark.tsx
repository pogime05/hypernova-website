"use client";

import { useScroll, useVelocity, useSpring, useTransform, motion } from "framer-motion";
import Image from "next/image";

export default function ScrollWatermark() {
  const { scrollY } = useScroll();

  // Derive velocity from raw scroll position
  const velocity = useVelocity(scrollY);

  // Smooth the velocity spike into a gentle curve
  const smoothVelocity = useSpring(velocity, {
    damping: 40,
    stiffness: 200,
    mass: 0.5,
  });

  // Map |velocity| → opacity: resting = 0.04, actively scrolling peaks at 0.12
  const opacity = useTransform(
    smoothVelocity,
    [-1200, -400, 0, 400, 1200],
    [0.10, 0.07, 0.04, 0.07, 0.10]
  );

  // Slight scale bloom while scrolling: resting = 1.0, moving = 1.06
  const scale = useTransform(
    smoothVelocity,
    [-1200, -400, 0, 400, 1200],
    [1.06, 1.03, 1.0, 1.03, 1.06]
  );

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <motion.div
        style={{ opacity, scale }}
        className="relative w-[600px] h-[600px] max-w-[80vw] max-h-[80vw] select-none"
      >
        <Image
          src="/logo.png"
          alt=""
          fill
          sizes="(max-width: 768px) 80vw, 600px"
          className="object-contain"
          priority={false}
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
}
