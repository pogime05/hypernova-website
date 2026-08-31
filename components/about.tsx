"use client";

import Image from "next/image";
import { Reveal } from "./ui/reveal";

const principles = [
  {
    number: "01",
    title: "Clear communication",
    desc: "Direct updates, plain language, and one person who actually knows your project — no account-manager telephone game.",
  },
  {
    number: "02",
    title: "Fast delivery",
    desc: "Short sprints and live progress. You see real, working software early and often instead of waiting months for a reveal.",
  },
  {
    number: "03",
    title: "You own the code",
    desc: "Your project, your repo, your accounts. No lock-in, no rented platforms holding your business hostage.",
  },
];

export default function About() {
  return (
    <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 bg-paper">
      <div className="max-w-8xl mx-auto px-6 md:px-10">
        {/* Heading — CSS load entrance (above the fold, never JS-gated) */}
        <div className="rise">
          <p className="eyebrow text-ash mb-6">Who&apos;s behind it</p>
          <h1
            className="font-display font-extrabold text-ink tracking-[-0.02em] leading-[0.95] max-w-4xl"
            style={{ fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)" }}
          >
            Built by an independent studio, not a{" "}
            <span className="text-accent">faceless agency.</span>
          </h1>
        </div>

        <div className="mt-14 md:mt-20 grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* Studio photo */}
          <Reveal className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden border border-rule bg-ink">
              <Image
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=70"
                alt="Two people building software together at a studio workstation"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <p className="eyebrow text-ash mt-4">HyperNova Technologies — in the build</p>
          </Reveal>

          {/* Bio + principles */}
          <div className="md:col-span-7 flex flex-col gap-12">
            <Reveal delay={0.1}>
              <p className="text-ink text-xl md:text-2xl leading-relaxed text-pretty">
                HyperNova Technologies is a hands-on independent studio building
                websites, apps, and AI for founders and businesses. We keep teams
                small and ownership direct — the same person who scopes your
                project designs it, builds it, and ships it. No layers, no
                hand-offs, no guesswork.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="eyebrow text-ash mb-2">What you can expect</p>
              <div className="border-t border-rule">
                {principles.map((p) => (
                  <div
                    key={p.title}
                    className="group border-b border-rule py-6 grid grid-cols-12 gap-4 items-baseline"
                  >
                    <span className="col-span-2 font-mono text-sm text-ash group-hover:text-accent transition-colors">
                      {p.number}
                    </span>
                    <div className="col-span-10">
                      <h3 className="font-display font-bold text-xl md:text-2xl text-ink mb-1.5">
                        {p.title}
                      </h3>
                      <p className="text-ash text-base leading-relaxed max-w-md">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
