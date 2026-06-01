"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Pen, Code2, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery",
    description:
      "We learn your goals, your users, and your constraints before touching a pixel. No assumptions, no templates — we start from what you actually need.",
    duration: "1–2 days",
  },
  {
    number: "02",
    icon: Pen,
    title: "Design",
    description:
      "Wireframes to high-fidelity in Figma. You see and approve every screen before a single line of code is written. No surprises at launch.",
    duration: "3–7 days",
  },
  {
    number: "03",
    icon: Code2,
    title: "Build",
    description:
      "Clean code, fast delivery, daily updates. We move in short sprints and keep you in the loop. You can see progress in real-time — no black boxes.",
    duration: "1–6 weeks",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch & Support",
    description:
      "We ship, monitor, and iterate. Your site or app goes live with us watching the metrics. Post-launch support isn't extra — it's part of how we work.",
    duration: "Ongoing",
  },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="process" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs text-accent tracking-widest uppercase font-semibold mb-4">
            Our approach
          </p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary leading-tight">
            How we work
          </h2>
        </motion.div>

        {/* Desktop horizontal timeline */}
        <div className="hidden lg:block">
          {/* Connector line */}
          <motion.div
            className="relative h-px bg-white/[0.06] mx-auto mb-16"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          >
            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent to-cyan h-px w-1/2" />
          </motion.div>

          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  className="relative group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
                >
                  {/* Decorative number */}
                  <div className="absolute -top-16 left-0 font-display font-black text-8xl text-white/[0.03] select-none leading-none">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all">
                    <Icon size={18} className="text-accent" />
                  </div>

                  <p className="text-xs font-mono text-muted mb-2">{step.number}</p>
                  <h3 className="font-display font-bold text-xl text-primary mb-3 group-hover:text-accent transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mb-4">
                    {step.description}
                  </p>
                  <span className="text-xs text-accent/70 font-mono border border-accent/20 px-2 py-0.5 rounded">
                    {step.duration}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="lg:hidden flex flex-col gap-0">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                className="flex gap-6 relative pb-10 last:pb-0"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Left spine */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center z-10">
                    <Icon size={18} className="text-accent" />
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex-1 w-px bg-gradient-to-b from-accent/20 to-transparent mt-2" />
                  )}
                </div>

                <div className="pt-1.5 pb-2">
                  <p className="text-xs font-mono text-muted mb-1">{step.number}</p>
                  <h3 className="font-display font-bold text-xl text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mb-3">
                    {step.description}
                  </p>
                  <span className="text-xs text-accent/70 font-mono border border-accent/20 px-2 py-0.5 rounded">
                    {step.duration}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
