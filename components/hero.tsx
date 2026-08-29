import Link from "next/link";
import { Badge } from "./ui/badge";

const disciplines = ["Digital Cards", "Web Apps", "Mobile Apps", "Marketing Sites"];

// Entrance is CSS-driven (.rise + staggered animationDelay) so the hero is
// visible at first paint and never gated behind JS hydration.
export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-[68px] overflow-hidden">
      <div className="w-full max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-20">
        {/* Eyebrow row */}
        <div
          className="rise flex items-center justify-between gap-4 border-t border-rule pt-5"
          style={{ animationDelay: "0.05s" }}
        >
          <span className="eyebrow text-ash">
            HyperNova Technologies — Independent digital studio
          </span>
          <Badge dot className="hidden sm:inline-flex">
            Available for new projects
          </Badge>
        </div>

        {/* Headline */}
        <h1
          className="rise font-display font-extrabold text-ink tracking-[-0.02em] leading-[0.92] mt-10 md:mt-14"
          style={{ fontSize: "clamp(2.75rem, 9vw, 9.5rem)", animationDelay: "0.13s" }}
        >
          Digital products,
          <br />
          built to outlast
          <br />
          <span className="text-accent">the hype.</span>
        </h1>

        {/* Asymmetric supporting row */}
        <div className="mt-12 md:mt-16 grid md:grid-cols-12 gap-8 items-end">
          <div
            className="rise md:col-span-5 md:col-start-1 flex flex-wrap gap-3"
            style={{ animationDelay: "0.22s" }}
          >
            <Link
              href="/work"
              className="inline-flex items-center gap-2 bg-accent text-paper text-base font-medium px-7 py-4 hover:bg-[#3a1fe0] transition-colors"
            >
              See our work <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center border border-ink text-ink text-base font-medium px-7 py-4 hover:bg-ink hover:text-paper transition-colors"
            >
              How we work
            </Link>
          </div>

          <p
            className="rise md:col-span-5 md:col-start-8 text-ash text-lg md:text-xl leading-relaxed text-pretty"
            style={{ animationDelay: "0.3s" }}
          >
            We design and develop websites, apps, and digital experiences for
            founders, brands, and businesses ready to grow.
          </p>
        </div>

        {/* Disciplines meta strip */}
        <div
          className="rise mt-16 md:mt-24 border-t border-rule pt-5 flex flex-wrap items-center gap-x-6 gap-y-2"
          style={{ animationDelay: "0.38s" }}
        >
          {disciplines.map((d) => (
            <span key={d} className="eyebrow text-ash">
              {d}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
