"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ClipReveal } from "./ui/reveal";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We learn your goals, your users, and your constraints before touching a pixel. No assumptions, no templates — we start from what you actually need.",
    duration: "1–2 days",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Wireframes to high-fidelity in Figma. You see and approve every screen before a single line of code is written. No surprises at launch.",
    duration: "3–7 days",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Clean code, fast delivery, daily updates. We move in short sprints and keep you in the loop — you can see progress in real time, no black boxes.",
    duration: "1–6 weeks",
  },
  {
    number: "04",
    title: "Launch & Support",
    description:
      "We ship, monitor, and iterate. Your site or app goes live with us watching the metrics. Post-launch support isn't extra — it's part of how we work.",
    duration: "Ongoing",
  },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="process"
      className="py-24 md:py-32 relative border-t border-rule bg-paper"
      ref={ref}
    >
      <div className="max-w-8xl mx-auto px-6 md:px-10">
        {/* Header */}
        <ClipReveal className="mb-12 md:mb-16 max-w-2xl">
          <p className="eyebrow text-ash mb-5">Our approach</p>
          <h2
            className="font-display font-extrabold text-ink tracking-[-0.02em] leading-[0.95]"
            style={{ fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)" }}
          >
            How we work.
          </h2>
        </ClipReveal>

        {/* Numbered steps */}
        <div className="border-t border-rule">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.08 }}
              className="group border-b border-rule py-8 md:py-11 grid md:grid-cols-12 gap-4 md:gap-8 items-baseline"
            >
              <div className="md:col-span-2 font-mono text-ash text-sm group-hover:text-accent transition-colors">
                {step.number}
              </div>

              <h3 className="md:col-span-4 font-display font-bold text-3xl md:text-4xl text-ink tracking-tight leading-none">
                {step.title}
              </h3>

              <p className="md:col-span-4 text-ash text-base leading-relaxed">
                {step.description}
              </p>

              <div className="md:col-span-2 md:text-right">
                <span className="eyebrow text-ash">{step.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
