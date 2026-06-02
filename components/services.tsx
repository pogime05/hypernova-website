"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CreditCard, LayoutDashboard, Globe, Smartphone } from "lucide-react";
import { Card } from "./ui/card";

const services = [
  {
    icon: CreditCard,
    title: "Digital Cards",
    description:
      "Smart, interactive business cards with NFC & QR. Share everything in a tap — your portfolio, socials, contact info. The Linktree-killer your brand deserves.",
    tag: "NFC · QR · Analytics",
    color: "#6C47FF",
  },
  {
    icon: LayoutDashboard,
    title: "Web Apps",
    description:
      "Custom dashboards, SaaS tools, internal platforms. Full-stack, production-grade, and built to scale. We own the complexity so you don't have to.",
    tag: "Full Stack · SaaS · APIs",
    color: "#00D9FF",
  },
  {
    icon: Globe,
    title: "Marketing Sites",
    description:
      "Conversion-optimized, fast, and genuinely beautiful. Not a Webflow template with your logo swapped in — a site that earns its place.",
    tag: "Next.js · Performance · SEO",
    color: "#A855F7",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "React Native apps for iOS & Android, shipped without the 6-month runway. Cross-platform doesn't mean compromised — we build native-quality UX.",
    tag: "React Native · iOS · Android",
    color: "#10B981",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="services" className="py-32 relative border-t border-white/[0.04] bg-white/[0.01]" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs text-accent tracking-widest uppercase font-semibold mb-4">
            What we do
          </p>
          <div className="flex items-end justify-between flex-wrap gap-6">
            <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary leading-tight">
              What we build
            </h2>
            <p className="text-muted text-lg max-w-sm">
              Four product types. One studio. No hand-offs, no guesswork.
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div key={i} variants={itemVariants}>
                <Card className="h-full group">
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${service.color}18`, border: `1px solid ${service.color}30` }}
                    >
                      <Icon size={22} style={{ color: service.color }} />
                    </div>
                    <span
                      className="text-xs font-mono px-2 py-1 rounded-md"
                      style={{
                        background: `${service.color}10`,
                        color: service.color,
                        border: `1px solid ${service.color}20`,
                      }}
                    >
                      {service.tag.split(" · ")[0]}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl text-primary mb-3 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted leading-relaxed">{service.description}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.tag.split(" · ").map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{
                          background: `${service.color}08`,
                          color: `${service.color}CC`,
                          border: `1px solid ${service.color}15`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Subtle accent line on hover */}
                  <div
                    className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
                    style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }}
                  />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
