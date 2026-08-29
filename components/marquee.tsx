"use client";

// Honest capabilities ticker — the disciplines the studio actually ships.
// (Replaces the old fabricated "trusted by" client logos.)
const capabilities = [
  "Marketing Sites",
  "Web Applications",
  "AI Integration",
  "Mobile Apps",
  "Digital Business Cards",
  "Dashboards & SaaS",
  "Brand & Identity",
];

export default function Marquee() {
  const doubled = [...capabilities, ...capabilities];

  return (
    <section className="relative border-y border-rule overflow-hidden py-6 bg-paper">
      <div className="flex overflow-hidden select-none">
        <div className="flex shrink-0 items-center gap-8 pr-8 animate-marquee whitespace-nowrap">
          {doubled.map((item, i) => (
            <div key={i} className="flex items-center gap-8 shrink-0">
              <span className="font-display font-semibold text-2xl md:text-3xl tracking-tight text-ink">
                {item}
              </span>
              <span aria-hidden="true" className="text-accent text-2xl md:text-3xl">
                /
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
