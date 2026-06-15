"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Pen, Code2, Rocket } from "lucide-react";
import { SectionDivider } from "./ui/section-glow";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

function StepCardBody({ step }: { step: (typeof steps)[number] }) {
  const Icon = step.icon;
  return (
    <div className="relative glass-card rounded-2xl p-8 md:p-9 overflow-hidden h-full">
      {/* corner glow */}
      <div
        aria-hidden="true"
        className="absolute -top-16 -right-16 w-52 h-52 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(108,71,255,0.18), transparent 70%)",
        }}
      />
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-xl bg-accent/12 border border-accent/25 flex items-center justify-center">
            <Icon size={20} className="text-accent" />
          </div>
          <span className="font-display font-black text-5xl leading-none bg-gradient-to-br from-[#6C47FF] to-[#00D9FF] bg-clip-text text-transparent opacity-90">
            {step.number}
          </span>
        </div>
        <h3 className="font-display font-bold text-2xl md:text-3xl text-primary mb-3">
          {step.title}
        </h3>
        <p className="text-muted text-base leading-relaxed mb-6 max-w-md">
          {step.description}
        </p>
        <span className="mt-auto w-fit text-xs text-accent font-mono border border-accent/30 bg-accent/5 px-2.5 py-1 rounded-md">
          {step.duration}
        </span>
      </div>
    </div>
  );
}

export default function Process() {
  const pinRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numeralRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const tickRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReduced(true);
      return;
    }

    const n = steps.length;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const lastActive = { i: -1 };

    // Position every card from one continuous progress value (depth = index − p).
    const place = (p: number) => {
      cards.forEach((card, i) => {
        const d = i - p;
        if (d < 0) {
          // dealt away — flies up and fades
          const t = Math.min(1, -d);
          gsap.set(card, {
            yPercent: -118 * t,
            rotate: -9 * t,
            scale: 1 + 0.04 * t,
            opacity: Math.max(0, 1 - t * 1.5),
            zIndex: 60,
          });
        } else {
          // still in the stack
          const dd = Math.min(d, 3);
          gsap.set(card, {
            yPercent: dd * 7,
            rotate: (i % 2 === 0 ? 1 : -1) * dd * 2,
            scale: 1 - dd * 0.05,
            opacity: dd > 2.3 ? Math.max(0, 1 - (dd - 2.3)) : 1,
            zIndex: 50 - Math.round(dd * 5),
          });
        }
      });

      // progress line + active numeral / tick highlight
      const ratio = n > 1 ? p / (n - 1) : 0;
      if (fillRef.current) fillRef.current.style.width = `${ratio * 100}%`;
      const active = Math.max(0, Math.min(n - 1, Math.round(p)));
      if (active !== lastActive.i) {
        lastActive.i = active;
        if (numeralRef.current) numeralRef.current.textContent = steps[active].number;
        tickRefs.current.forEach((tk, i) => {
          if (tk) tk.style.opacity = i <= active ? "1" : "0.35";
        });
      }
    };

    const ctx = gsap.context(() => {
      place(0);
      ScrollTrigger.create({
        trigger: pinRef.current!,
        start: "top top+=88",
        end: () => "+=" + (n - 1) * window.innerHeight * 0.9,
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => place(self.progress * (n - 1)),
      });
    }, pinRef);

    // Recompute once layout settles (fonts / route transition).
    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="process"
      className="relative overflow-hidden border-t border-white/[0.06] bg-white/[0.015]"
    >
      <SectionDivider />
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[760px] h-[420px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(108,71,255,0.06), transparent 70%)",
        }}
      />

      {/* Heading */}
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-4 relative">
        <p className="text-xs text-accent tracking-widest uppercase font-semibold mb-4">
          Our approach
        </p>
        <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary leading-tight">
          How we work
        </h2>
      </div>

      {reduced ? (
        /* Reduced-motion: static stacked list */
        <div className="max-w-3xl mx-auto px-6 pb-28 pt-6 flex flex-col gap-6">
          {steps.map((step) => (
            <StepCardBody key={step.number} step={step} />
          ))}
        </div>
      ) : (
        /* Pinned deck */
        <div
          ref={pinRef}
          className="relative h-screen flex flex-col items-center justify-center px-6"
        >
          {/* giant decorative numeral */}
          <span
            ref={numeralRef}
            aria-hidden="true"
            className="pointer-events-none select-none absolute font-display font-black text-[34vw] md:text-[26vw] leading-none text-white/[0.03]"
          >
            01
          </span>

          {/* progress line + ticks */}
          <div className="w-full max-w-xl mb-10 relative z-10">
            <div className="relative h-px bg-white/[0.12]">
              <div
                ref={fillRef}
                className="absolute left-0 top-0 h-px bg-gradient-to-r from-accent to-cyan"
                style={{ width: "0%" }}
              />
              <div className="absolute -top-2 left-0 right-0 flex justify-between">
                {steps.map((s, i) => (
                  <div
                    key={s.number}
                    ref={(el) => {
                      tickRefs.current[i] = el;
                    }}
                    className="flex flex-col items-center gap-2 transition-opacity duration-300"
                    style={{ opacity: i === 0 ? 1 : 0.35 }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_8px_rgba(0,217,255,0.7)]" />
                    <span className="text-[11px] font-mono text-muted whitespace-nowrap">
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* card deck */}
          <div ref={deckRef} className="relative w-full max-w-xl h-[360px] z-10">
            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="absolute inset-0 will-change-transform"
                style={{ transformOrigin: "center bottom" }}
              >
                <StepCardBody step={step} />
              </div>
            ))}
          </div>

          <p className="mt-10 text-xs text-muted/70 relative z-10">
            Scroll to step through →
          </p>
        </div>
      )}
    </section>
  );
}
