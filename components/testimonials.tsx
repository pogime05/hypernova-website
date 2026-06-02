"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "HyperNova Technologies rebuilt our entire web presence in three weeks. No missed deadlines, no vague updates — just a site that finally converts. Our lead form submissions doubled in the first month.",
    name: "Adriana Reyes",
    role: "CEO",
    company: "Crest Digital",
    initials: "AR",
    color: "#6C47FF",
  },
  {
    quote:
      "I've worked with four different agencies in the past two years. HyperNova Technologies is the only one that felt like a real partner. They pushed back when our ideas were wrong and shipped when they said they would.",
    name: "Marcus Chen",
    role: "Founder",
    company: "ShiftHR",
    initials: "MC",
    color: "#00D9FF",
  },
  {
    quote:
      "The NovaDeck platform they built for us handles 50k+ card scans a month with zero downtime. The code is clean, the architecture is solid, and they documented everything. Rare.",
    name: "Kemi Adeyemi",
    role: "Product Lead",
    company: "NovaDeck",
    initials: "KA",
    color: "#A855F7",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-32 relative overflow-hidden border-t border-white/[0.04] bg-transparent" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-cyan/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs text-accent tracking-widest uppercase font-semibold mb-4">
            Social proof
          </p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary leading-tight">
            From the people
            <br />
            we&apos;ve built for
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
            >
              <TestimonialCard testimonial={t} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
}) {
  return (
    <motion.div
      className="bg-surface rounded-2xl border border-white/[0.06] p-6 h-full flex flex-col gap-5 relative overflow-hidden group"
      whileHover={{
        borderColor: "rgba(108, 71, 255, 0.25)",
        y: -4,
        boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
      }}
      transition={{ duration: 0.25 }}
    >
      {/* Quote icon */}
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${testimonial.color}15`, border: `1px solid ${testimonial.color}25` }}
      >
        <Quote size={14} style={{ color: testimonial.color }} />
      </div>

      {/* Quote text */}
      <p className="text-primary/80 leading-relaxed text-sm flex-1">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-white/[0.06]">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
          style={{ background: testimonial.color }}
        >
          {testimonial.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-primary">{testimonial.name}</p>
          <p className="text-xs text-muted">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>

      {/* Glow accent */}
      <div
        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
        style={{ background: `linear-gradient(90deg, ${testimonial.color}, transparent)` }}
      />
    </motion.div>
  );
}
