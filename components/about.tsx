"use client";

import { Reveal } from "./ui/reveal";
import { SectionGlow } from "./ui/section-glow";

/**
 * About / studio section — placeholder for this architecture pass. Real
 * narrative content (story, team, principles) lands in the next pass; for now
 * this establishes the page and its top spacing under the fixed nav.
 */
export default function About() {
  return (
    <section className="relative pt-40 pb-28 overflow-hidden">
      <SectionGlow
        glows={[
          { color: "#6C47FF", opacity: 0.06, top: "-4%", left: "-6%", size: 620 },
          { color: "#00D9FF", opacity: 0.05, bottom: "-10%", right: "-6%", size: 560 },
        ]}
      />
      <div className="max-w-4xl mx-auto px-6 relative">
        <Reveal>
          <p className="text-xs text-accent tracking-widest uppercase font-semibold mb-4">
            The studio
          </p>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl text-primary leading-tight">
            A boutique studio with{" "}
            <span className="bg-gradient-to-r from-[#6C47FF] to-[#00D9FF] bg-clip-text text-transparent">
              production-grade
            </span>{" "}
            standards.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-muted text-lg md:text-xl leading-relaxed mt-7 max-w-2xl">
            HyperNova Technologies is an independent studio building websites,
            web apps, AI services, and digital products. We keep teams small and
            ownership direct — the people who design your product are the people
            who ship it.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="text-muted/70 text-sm mt-8 inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Full studio story coming soon.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
