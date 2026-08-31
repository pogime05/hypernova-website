"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { CornerDownLeft } from "lucide-react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ClipReveal } from "./ui/reveal";

/* Scripted, client-only "AI in action" demo. No API calls — auto-types a
   prompt, simulates a streamed answer, and loops through a few exchanges.
   Rendered in the editorial system: paper, hairline rules, mono spec labels,
   accent used once (the send key + streaming caret). Honestly labelled. */
const CONVOS = [
  {
    prompt: "Summarize this week's product metrics.",
    answer:
      "Signups are up 18% week-over-week, activation hit 64%, and churn dropped to 2.1%. The new onboarding flow is the biggest driver.",
  },
  {
    prompt: "Draft release notes for v2.4.",
    answer:
      "v2.4 — faster search (p95 down 40%), CSV export, and dark-mode fixes. Two crash reports resolved. Want this posted to the changelog?",
  },
  {
    prompt: "Find customers at churn risk.",
    answer:
      "14 accounts: usage down >30% for 3 weeks and no logins in 10 days. I can draft re-engagement emails and open the CRM tasks.",
  },
];

const CAPABILITIES = [
  "Streaming responses",
  "RAG over your data",
  "Tool & function calling",
  "On-brand tone",
];

type Phase = "typing" | "thinking" | "streaming" | "hold";

export default function AIShowcase({ preview = false }: { preview?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduced = useReducedMotion();

  const [active, setActive] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");
  const [words, setWords] = useState(0);

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

        for (let c = 1; c <= convo.prompt.length; c++) {
          if (cancelled) return;
          setTyped(convo.prompt.slice(0, c));
          await wait(30);
        }
        await wait(360);

        setPhase("thinking");
        await wait(700);

        setPhase("streaming");
        const total = convo.answer.split(" ").length;
        for (let w = 1; w <= total; w++) {
          if (cancelled) return;
          setWords(w);
          await wait(48);
        }

        setPhase("hold");
        await wait(2600);
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
  const showUser = reduced || phase !== "typing";
  const shownAnswer = reduced
    ? convo.answer
    : convo.answer.split(" ").slice(0, words).join(" ");
  const showAssistant = reduced || phase === "streaming" || phase === "hold";

  const heading = (
    <>
      <p className="eyebrow text-ash mb-5">
        {preview ? "(03) Signature capability" : "Signature capability"}
      </p>
      <h2
        className="font-display font-extrabold text-ink tracking-[-0.02em] leading-[0.98]"
        style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
      >
        Intelligence,
        <br />
        built in.
      </h2>
    </>
  );

  // The scripted demo panel (shared between preview and full layouts).
  const demo = (
    <div ref={ref} className="border border-rule bg-paper">
      {/* spec header */}
      <div className="flex items-center justify-between border-b border-rule px-4 py-2.5">
        <span className="eyebrow text-ash">assistant.session</span>
        <span className="eyebrow text-ash flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          illustrative demo
        </span>
      </div>

      {/* thread */}
      <div className="p-4 min-h-[220px] flex flex-col gap-3">
        {showUser && (
          <div className="self-end max-w-[85%] border border-rule bg-ink/[0.03] px-3 py-2">
            <p className="text-sm text-ink leading-relaxed">{convo.prompt}</p>
          </div>
        )}

        {phase === "thinking" && !reduced && (
          <div className="self-start">
            <span className="eyebrow text-ash mb-1 inline-block">AI</span>
            <div className="border border-rule px-3 py-2 font-mono text-xs text-ash">
              analyzing<span className="animate-pulse">…</span>
            </div>
          </div>
        )}

        {showAssistant && (
          <div className="self-start max-w-[92%]">
            <span className="eyebrow text-ash mb-1 inline-block">AI</span>
            <div className="border border-rule px-3 py-2">
              <p className="text-sm text-ink leading-relaxed">
                {shownAnswer}
                {!reduced && phase === "streaming" && (
                  <span className="inline-block w-[2px] h-4 align-text-bottom ml-0.5 bg-accent animate-pulse" />
                )}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* prompt bar */}
      <div className="border-t border-rule px-4 py-3 flex items-center gap-2">
        <span className="font-mono text-sm text-ink/90 flex-1 truncate">
          {reduced || phase !== "typing" ? (
            <span className="text-ash">Ask anything…</span>
          ) : (
            <>
              {typed}
              <span className="inline-block w-[2px] h-4 align-text-bottom ml-0.5 bg-accent animate-pulse" />
            </>
          )}
        </span>
        <CornerDownLeft size={15} strokeWidth={1.5} className="text-accent shrink-0" />
      </div>

      <p className="border-t border-rule px-4 py-2 font-mono text-[11px] text-ash">
        Scripted demo — illustrative of capabilities, not a live model.
      </p>
    </div>
  );

  return (
    <section
      id="ai"
      className="py-16 md:py-20 relative border-t border-rule bg-paper"
    >
      <div className="max-w-8xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* copy */}
          <div className="lg:col-span-5">
            <ClipReveal>{heading}</ClipReveal>
            <p className="text-ash text-lg leading-relaxed mt-6 max-w-md">
              We don&apos;t bolt AI on as a gimmick — we wire it into the core of
              your product. Streaming assistants, retrieval over your own data,
              and tool-calling that takes real actions.
            </p>

            <div className="mt-8 border-t border-rule">
              {CAPABILITIES.map((c) => (
                <div
                  key={c}
                  className="flex items-center gap-3 border-b border-rule py-3"
                >
                  <span className="font-mono text-xs text-accent">+</span>
                  <span className="text-sm text-ink">{c}</span>
                </div>
              ))}
            </div>

            {preview && (
              <Link
                href="/services#ai"
                className="group mt-8 inline-flex items-center gap-1.5 text-sm text-ink hover:text-accent transition-colors"
              >
                See it in action
                <ArrowUpRight
                  size={15}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </Link>
            )}
          </div>

          {/* demo */}
          <div className="lg:col-span-7">{demo}</div>
        </div>
      </div>
    </section>
  );
}
