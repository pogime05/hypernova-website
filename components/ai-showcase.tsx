"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Sparkles, Send, Bot, Zap, Database, Wrench } from "lucide-react";
import { SectionGlow } from "./ui/section-glow";

/* Scripted, client-only "AI in action" demo. No API calls, no external deps
   beyond framer-motion. Auto-types a prompt → simulates a streaming answer →
   loops through a few realistic exchanges. */
const CONVOS = [
  {
    prompt: "Summarize this week's product metrics.",
    answer:
      "Signups are up 18% week-over-week, activation hit 64%, and churn dropped to 2.1%. The new onboarding flow is the biggest driver — want me to turn this into a board-ready summary?",
  },
  {
    prompt: "Generate a React pricing card component.",
    answer:
      "Done — a responsive <PricingCard /> with a highlighted tier, monthly / annual toggle, and Framer Motion hover states. It's typed, accessible, and theme-aware. Should I wire it to Stripe checkout?",
  },
  {
    prompt: "Write hero copy for a fintech app.",
    answer:
      '"Money that moves at your speed." Open an account in 90 seconds, send instantly, and track every dollar in real time — no fees, no waiting. Want three variations in different tones?',
  },
];

const FEATURES = [
  { icon: Zap, label: "Streaming responses" },
  { icon: Database, label: "RAG over your data" },
  { icon: Wrench, label: "Tool & function calling" },
  { icon: Sparkles, label: "On-brand tone" },
];

type Phase = "typing" | "thinking" | "streaming" | "hold";

export default function AIShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });

  const [active, setActive] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");
  const [words, setWords] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  // Drive the scripted loop only while the section is on screen.
  useEffect(() => {
    if (!inView || reduced) return;
    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((res) => {
        const t = window.setTimeout(res, ms);
        timers.push(t);
      });

    async function run() {
      let i = 0;
      while (!cancelled) {
        const convo = CONVOS[i % CONVOS.length];
        setActive(i % CONVOS.length);
        setTyped("");
        setWords(0);
        setPhase("typing");

        // 1 — auto-type the prompt
        for (let c = 1; c <= convo.prompt.length; c++) {
          if (cancelled) return;
          setTyped(convo.prompt.slice(0, c));
          await wait(32);
        }
        await wait(420);

        // 2 — "send" → thinking
        setPhase("thinking");
        await wait(1050);

        // 3 — stream the answer word by word
        setPhase("streaming");
        const total = convo.answer.split(" ").length;
        for (let w = 1; w <= total; w++) {
          if (cancelled) return;
          setWords(w);
          await wait(55);
        }

        // 4 — hold, then advance
        setPhase("hold");
        await wait(2800);
        i++;
      }
    }
    run();

    return () => {
      cancelled = true;
      timers.forEach((t) => clearTimeout(t));
    };
  }, [inView, reduced]);

  const convo = CONVOS[active];
  // When reduced-motion is on, render the first exchange fully and statically.
  const showUser = reduced || phase !== "typing";
  const shownAnswer = reduced
    ? convo.answer
    : convo.answer.split(" ").slice(0, words).join(" ");
  const showAssistant = reduced || phase === "streaming" || phase === "hold";

  return (
    <section
      id="ai"
      className="py-32 relative border-t border-white/[0.06] bg-transparent overflow-hidden"
    >
      <SectionGlow
        glows={[
          { color: "#A855F7", opacity: 0.07, top: "-6%", left: "30%", size: 720 },
          { color: "#00D9FF", opacity: 0.06, bottom: "-12%", right: "-4%", size: 620 },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Left: copy ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs text-accent tracking-widest uppercase font-semibold mb-4">
              Signature capability
            </p>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary leading-tight mb-5">
              Intelligence,
              <br />
              <span className="gradient-text">built in.</span>
            </h2>
            <p className="text-muted text-lg leading-relaxed max-w-md mb-8">
              We don&apos;t bolt AI on as a gimmick — we wire it into the core of
              your product. Streaming assistants, retrieval over your own data,
              and tool-calling that takes real actions.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 max-w-md">
              {FEATURES.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.label}
                    className="flex items-center gap-2.5 text-sm text-primary/85"
                  >
                    <span className="w-8 h-8 rounded-lg grid place-items-center bg-accent/10 border border-accent/20 text-accent shrink-0">
                      <Icon size={15} />
                    </span>
                    {f.label}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* ── Right: live demo ── */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card rounded-2xl p-4 sm:p-5 relative"
          >
            {/* window chrome */}
            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-white/[0.06]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <div className="ml-2 flex items-center gap-1.5 text-xs text-primary/80">
                <Sparkles size={13} className="text-accent" /> HyperNova AI
              </div>
              <span className="ml-auto flex items-center gap-1.5 text-[10px] text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                live
              </span>
            </div>

            {/* thread */}
            <div className="min-h-[260px] sm:min-h-[300px] flex flex-col gap-3">
              <AnimatePresence mode="popLayout">
                {showUser && (
                  <motion.div
                    key={`u-${active}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="self-end max-w-[88%] rounded-2xl rounded-br-sm bg-accent/15 border border-accent/25 px-3.5 py-2 text-sm text-primary/90"
                  >
                    {convo.prompt}
                  </motion.div>
                )}

                {phase === "thinking" && !reduced && (
                  <motion.div
                    key={`t-${active}`}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="self-start flex items-end gap-2"
                  >
                    <AssistantAvatar />
                    <div className="rounded-2xl rounded-bl-sm bg-white/[0.05] border border-white/[0.07] px-3.5 py-2.5">
                      <div className="flex items-center gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-cyan"
                            animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: i * 0.18,
                              ease: "easeInOut",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {showAssistant && (
                  <motion.div
                    key={`a-${active}`}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="self-start flex items-end gap-2 max-w-[92%]"
                  >
                    <AssistantAvatar />
                    <div className="rounded-2xl rounded-bl-sm bg-white/[0.05] border border-white/[0.07] px-3.5 py-2.5 text-sm text-primary/90 leading-relaxed whitespace-pre-wrap">
                      {shownAnswer}
                      {!reduced && phase === "streaming" && (
                        <span className="inline-block w-[2px] h-4 align-text-bottom ml-0.5 bg-cyan animate-blink" />
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* prompt input bar */}
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/[0.08] px-3.5 py-2.5">
              <span className="flex-1 text-sm text-primary/80 truncate">
                {reduced || phase !== "typing" ? (
                  <span className="text-muted">Ask HyperNova AI anything…</span>
                ) : (
                  <>
                    {typed}
                    <span className="inline-block w-[2px] h-4 align-text-bottom ml-0.5 bg-cyan animate-blink" />
                  </>
                )}
              </span>
              <motion.span
                className="w-8 h-8 rounded-lg grid place-items-center bg-accent text-white shrink-0"
                animate={
                  !reduced && phase === "typing" && typed.length > 0
                    ? { scale: [1, 1.08, 1] }
                    : {}
                }
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                <Send size={14} />
              </motion.span>
            </div>

            <p className="mt-3 text-center text-[10px] text-muted/70">
              Simulated demo — illustrative of capabilities, not a live model.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AssistantAvatar() {
  return (
    <span className="w-6 h-6 rounded-full grid place-items-center bg-gradient-to-br from-accent to-cyan text-white shrink-0 mb-0.5">
      <Bot size={13} />
    </span>
  );
}
