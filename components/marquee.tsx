"use client";

import { motion } from "framer-motion";

const clients = [
  "Veritas Co.",
  "Bloom Studio",
  "NovaDeck",
  "ShiftHR",
  "Meridian Labs",
  "Crest Digital",
  "Apex Ventures",
  "Flux Agency",
  "Orbit Brands",
  "Pulse Health",
  "Stackr",
  "Forma",
];

export default function Marquee() {
  const doubled = [...clients, ...clients];

  return (
    <section className="relative py-16 overflow-hidden border-y border-white/[0.06]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />

      <motion.p
        className="text-center text-xs text-muted tracking-widest uppercase mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Trusted by founders &amp; brands
      </motion.p>

      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg to-transparent z-10" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg to-transparent z-10" />

        <div className="flex overflow-hidden">
          <motion.div
            className="flex items-center gap-12 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            {doubled.map((client, i) => (
              <div key={i} className="flex items-center gap-12 flex-shrink-0">
                <span className="text-muted font-display font-semibold text-lg tracking-wide hover:text-primary transition-colors cursor-default select-none">
                  {client}
                </span>
                <span className="w-1 h-1 rounded-full bg-accent/40 flex-shrink-0" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
