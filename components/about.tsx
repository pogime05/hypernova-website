"use client";

import Image from "next/image";
import { MessageSquare, Rocket, Code2 } from "lucide-react";
import { Reveal } from "./ui/reveal";
import { SectionGlow } from "./ui/section-glow";

const principles = [
  {
    icon: MessageSquare,
    title: "Clear communication",
    desc: "Direct updates, plain language, and one person who actually knows your project — no account-manager telephone game.",
  },
  {
    icon: Rocket,
    title: "Fast delivery",
    desc: "Short sprints and live progress. You see real, working software early and often instead of waiting months for a reveal.",
  },
  {
    icon: Code2,
    title: "You own the code",
    desc: "Your project, your repo, your accounts. No lock-in, no rented platforms holding your business hostage.",
  },
];

export default function About() {
  return (
    <section className="relative pt-40 pb-28 overflow-hidden">
      <SectionGlow
        glows={[
          { color: "#6C47FF", opacity: 0.06, top: "-4%", left: "-6%", size: 620 },
          { color: "#00D9FF", opacity: 0.05, bottom: "-10%", right: "-6%", size: 560 },
        ]}
      />
      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Heading */}
        <Reveal>
          <p className="text-xs text-accent tracking-widest uppercase font-semibold mb-4">
            Who&apos;s behind it
          </p>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl text-primary leading-[1.05] max-w-3xl">
            Built by an independent studio, not a{" "}
            <span className="bg-gradient-to-r from-[#6C47FF] to-[#00D9FF] bg-clip-text text-transparent">
              faceless agency.
            </span>
          </h1>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
          {/* Founder portrait — logo mark stands in until there's a real photo */}
          {/* TODO: founder photo */}
          <Reveal>
            <div className="relative aspect-[4/5] rounded-2xl glass-card overflow-hidden flex items-center justify-center">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                  backgroundSize: "28px 28px",
                }}
              />
              <div
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[80px]"
                style={{ background: "rgba(108,71,255,0.18)" }}
              />
              <div className="relative flex flex-col items-center gap-4">
                <Image
                  src="/logo.png"
                  alt="HyperNova Technologies"
                  width={96}
                  height={96}
                  className="w-24 h-24 object-contain drop-shadow-[0_0_18px_rgba(108,71,255,0.5)]"
                  style={{ height: "auto" }}
                />
                <span className="font-orbitron text-[11px] tracking-widest uppercase text-muted">
                  HyperNova Technologies
                </span>
              </div>
            </div>
          </Reveal>

          {/* Bio + principles */}
          <div className="flex flex-col gap-10">
            <Reveal delay={0.1}>
              {/* TODO: refine bio */}
              <p className="text-muted text-lg md:text-xl leading-relaxed">
                HyperNova Technologies is a hands-on independent studio building
                websites, apps, and AI for founders and businesses. We keep teams
                small and ownership direct — the same person who scopes your
                project designs it, builds it, and ships it. No layers, no
                hand-offs, no guesswork.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="text-xs text-accent tracking-widest uppercase font-semibold mb-5">
                What you can expect
              </p>
              <div className="flex flex-col gap-3">
                {principles.map((p) => {
                  const Icon = p.icon;
                  return (
                    <div
                      key={p.title}
                      className="glass-card rounded-xl p-5 flex items-start gap-4 hover:border-white/15 transition-colors"
                    >
                      <span className="shrink-0 w-10 h-10 rounded-lg bg-accent/12 border border-accent/25 flex items-center justify-center">
                        <Icon size={18} className="text-accent" />
                      </span>
                      <div>
                        <h3 className="font-display font-bold text-lg text-primary mb-1">
                          {p.title}
                        </h3>
                        <p className="text-muted text-sm leading-relaxed">
                          {p.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
