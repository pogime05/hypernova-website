"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./ui/reveal";

/**
 * Closing call-to-action band. Connective tissue for the multi-page layout —
 * sits at the foot of Home and the deeper pages and routes to /contact.
 */
export default function CTABand({
  heading = "Have something in mind?",
  sub = "Tell us what you're building. We'll tell you how we'd ship it — no fluff, no lock-in.",
}: {
  heading?: string;
  sub?: string;
}) {
  return (
    <section className="relative py-28 border-t border-white/[0.06] overflow-hidden">
      {/* layered accent glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[420px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(108,71,255,0.10), rgba(0,217,255,0.04) 45%, transparent 70%)",
        }}
      />
      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <Reveal>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary leading-tight">
            {heading}
          </h2>
          <p className="text-muted text-lg mt-5 max-w-xl mx-auto leading-relaxed">
            {sub}
          </p>
          <motion.div
            className="mt-9 inline-block"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-accent text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-[#7c5aff] transition-colors shadow-lg shadow-accent/25"
            >
              Start a Project <ArrowRight size={18} />
            </Link>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
