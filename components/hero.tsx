"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { Badge } from "./ui/badge";

const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const disciplines = ["Digital Cards", "Web Apps", "Mobile Apps", "Marketing Sites"];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-[68px] overflow-hidden">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="w-full max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-20"
      >
        {/* Eyebrow row */}
        <motion.div
          variants={rise}
          className="flex items-center justify-between gap-4 border-t border-rule pt-5"
        >
          <span className="eyebrow text-ash">
            HyperNova Technologies — Independent digital studio
          </span>
          <Badge dot className="hidden sm:inline-flex">
            Available for new projects
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={rise}
          className="font-display font-extrabold text-ink tracking-[-0.02em] leading-[0.92] mt-10 md:mt-14"
          style={{ fontSize: "clamp(2.75rem, 9vw, 9.5rem)" }}
        >
          Digital products,
          <br />
          built to outlast
          <br />
          <span className="text-accent">the hype.</span>
        </motion.h1>

        {/* Asymmetric supporting row */}
        <div className="mt-12 md:mt-16 grid md:grid-cols-12 gap-8 items-end">
          <motion.div variants={rise} className="md:col-span-5 md:col-start-1 flex flex-wrap gap-3">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 bg-accent text-paper text-base font-medium px-7 py-4 hover:bg-[#3a1fe0] transition-colors"
            >
              See our work <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center border border-ink text-ink text-base font-medium px-7 py-4 hover:bg-ink hover:text-paper transition-colors"
            >
              How we work
            </Link>
          </motion.div>

          <motion.p
            variants={rise}
            className="md:col-span-5 md:col-start-8 text-ash text-lg md:text-xl leading-relaxed text-pretty"
          >
            We design and develop websites, apps, and digital experiences for
            founders, brands, and businesses ready to grow.
          </motion.p>
        </div>

        {/* Disciplines meta strip */}
        <motion.div
          variants={rise}
          className="mt-16 md:mt-24 border-t border-rule pt-5 flex flex-wrap items-center gap-x-6 gap-y-2"
        >
          {disciplines.map((d) => (
            <span key={d} className="eyebrow text-ash">
              {d}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
