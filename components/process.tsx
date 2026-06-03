"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
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

  // Scroll progress across the whole section — drives the sticky progress line.
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end end"],
  });
  const progressScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="process"
      className="py-32 relative overflow-hidden border-t border-white/[0.04] bg-white/[0.01]"
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6" ref={sectionRef}>
        {/* Desktop — sticky header column + scrolling steps */}
        <div className="hidden lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Sticky left column */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs text-accent tracking-widest uppercase font-semibold mb-4">
                Our approach
              </p>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary leading-tight mb-6">
                How we work
              </h2>
              <p className="text-muted text-lg leading-relaxed max-w-sm mb-10">
                A clear, four-step process — no black boxes, no surprises. You
                see exactly where your project stands at every stage.
              </p>

              {/* Scroll-driven progress track */}
              <div className="relative h-48 w-px bg-white/[0.06] ml-2">
                <motion.div
                  className="absolute top-0 left-0 w-px bg-gradient-to-b from-accent to-cyan origin-top"
                  style={{ scaleY: progressScaleY, height: "100%" }}
                />
              </div>
            </motion.div>
          </div>

          {/* Scrolling steps */}
          <div className="flex flex-col gap-20 pb-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  className="relative group"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Decorative number */}
                  <div className="absolute -top-14 -left-2 font-display font-black text-8xl text-white/[0.03] select-none leading-none">
                    {step.number}
                  </div>

                  <div className="relative">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all">
                      <Icon size={20} className="text-accent" />
                    </div>

                    <p className="text-xs font-mono text-muted mb-2">
                      {step.number}
                    </p>
                    <h3 className="font-display font-bold text-2xl text-primary mb-3 group-hover:text-accent transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted text-base leading-relaxed mb-4 max-w-md">
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

        {/* Mobile vertical timeline */}
        <div className="lg:hidden">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs text-accent tracking-widest uppercase font-semibold mb-4">
              Our approach
            </p>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl text-primary leading-tight">
              How we work
            </h2>
          </motion.div>

          <div className="flex flex-col gap-0">
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
                    <p className="text-xs font-mono text-muted mb-1">
                      {step.number}
                    </p>
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
      </div>
    </section>
  );
}
