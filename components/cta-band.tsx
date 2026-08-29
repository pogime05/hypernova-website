"use client";

import Link from "next/link";
import { Reveal } from "./ui/reveal";

/**
 * Closing call-to-action band — the near-black "punctuation" section that
 * anchors the foot of Home and the deeper pages and routes to /contact.
 */
export default function CTABand({
  heading = "Have something in mind?",
  sub = "Tell us what you're building. We'll tell you how we'd ship it — no fluff, no lock-in.",
}: {
  heading?: string;
  sub?: string;
}) {
  return (
    <section className="relative bg-ink text-paper py-24 md:py-32">
      <div className="max-w-8xl mx-auto px-6 md:px-10">
        <Reveal>
          <div className="grid md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-8">
              <p className="eyebrow text-paper/50 mb-6">Start a project</p>
              <h2
                className="font-display font-extrabold tracking-[-0.02em] leading-[0.95]"
                style={{ fontSize: "clamp(2.5rem, 6.5vw, 6rem)" }}
              >
                {heading}
              </h2>
              <p className="text-paper/70 text-lg mt-6 max-w-xl leading-relaxed">
                {sub}
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-accent text-paper font-medium px-8 py-4 text-base hover:bg-[#3a1fe0] transition-colors"
              >
                Start a project <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
