"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Search, Pen, Code2, Rocket } from "lucide-react";
import { SectionDivider } from "./ui/section-glow";

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

// Large decorative numeral: rgba-white fill + a violet→cyan gradient stroke.
function GhostNumber({ n }: { n: string }) {
  const id = `ghost-${n}`;
  return (
    <svg
      className="absolute -top-10 right-2 h-40 w-40 pointer-events-none select-none"
      viewBox="0 0 140 140"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6C47FF" />
          <stop offset="100%" stopColor="#00D9FF" />
        </linearGradient>
      </defs>
      <text
        x="50%"
        y="116"
        textAnchor="middle"
        fontFamily="var(--font-syne), sans-serif"
        fontWeight={900}
        fontSize={150}
        fill="rgba(255,255,255,0.06)"
        stroke={`url(#${id})`}
        strokeWidth={0.75}
        strokeOpacity={0.55}
      >
        {n}
      </text>
    </svg>
  );
}

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const Icon = step.icon;
  return (
    <motion.div
      className="relative glass-card rounded-2xl p-7 overflow-hidden group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -4,
        borderColor: "rgba(108,71,255,0.45)",
        boxShadow:
          "0 0 36px rgba(108,71,255,0.16), 0 24px 60px -20px rgba(0,0,0,0.7)",
      }}
    >
      {/* decorative numeral behind the text */}
      <GhostNumber n={step.number} />

      {/* on-scroll glow */}
      <motion.div
        aria-hidden="true"
        className="absolute -top-16 -left-16 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(108,71,255,0.18), transparent 70%)",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9 }}
      />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-accent/12 border border-accent/25 flex items-center justify-center mb-5 group-hover:bg-accent/20 group-hover:border-accent/45 transition-all">
          <Icon size={20} className="text-accent" />
        </div>
        <h3 className="font-display font-bold text-2xl text-primary mb-3 group-hover:text-white transition-colors">
          {step.title}
        </h3>
        <p className="text-muted text-base leading-relaxed mb-5 max-w-md">
          {step.description}
        </p>
        <span className="text-xs text-accent font-mono border border-accent/30 bg-accent/5 px-2.5 py-1 rounded-md">
          {step.duration}
        </span>
      </div>
    </motion.div>
  );
}

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
      className="py-32 relative overflow-hidden border-t border-white/[0.06] bg-white/[0.015]"
      ref={ref}
    >
      <SectionDivider />
      {/* top-center violet glow for rhythm */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[760px] h-[420px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(108,71,255,0.06), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1/4 right-1/5 w-72 h-72 bg-cyan/[0.05] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative" ref={sectionRef}>
        {/* Desktop — sticky panel + scrolling step cards */}
        <div className="hidden lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          {/* Sticky left panel */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.div
              className="glass-card rounded-2xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs text-accent tracking-widest uppercase font-semibold mb-4">
                Our approach
              </p>
              <h2 className="font-display font-extrabold text-4xl xl:text-5xl text-primary leading-tight mb-5">
                How we work
              </h2>
              <p className="text-muted text-base leading-relaxed mb-8">
                A clear, four-step process — no black boxes, no surprises. You
                see exactly where your project stands at every stage.
              </p>

              {/* Scroll-driven progress track with labelled ticks */}
              <div className="relative pl-1">
                <div className="relative h-60 w-px bg-white/[0.1] ml-3">
                  <motion.div
                    className="absolute top-0 left-0 w-px bg-gradient-to-b from-accent to-cyan origin-top"
                    style={{ scaleY: progressScaleY, height: "100%" }}
                  />
                  {steps.map((s, i) => (
                    <div
                      key={s.number}
                      className="absolute flex items-center gap-3"
                      style={{
                        top: `${(i / (steps.length - 1)) * 100}%`,
                        transform: "translateY(-50%)",
                      }}
                    >
                      <span className="w-2 h-2 rounded-full bg-cyan -ml-[3.5px] ring-4 ring-bg shadow-[0_0_10px_rgba(0,217,255,0.6)]" />
                      <span className="flex items-baseline gap-2 whitespace-nowrap">
                        <span className="text-[11px] font-mono text-accent">
                          {s.number}
                        </span>
                        <span className="text-sm text-primary/80">
                          {s.title}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scrolling step cards */}
          <div className="flex flex-col gap-8 pb-8">
            {steps.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* Mobile — stacked step cards */}
        <div className="lg:hidden">
          <motion.div
            className="mb-12"
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

          <div className="flex flex-col gap-6">
            {steps.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
