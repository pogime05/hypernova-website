"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: "digital-cards",
    index: "01",
    title: "Digital Cards",
    description:
      "Smart NFC + QR business cards that share everything in a tap — profile, links, contact, and analytics. The Linktree-killer your brand deserves.",
    tags: ["NFC", "QR", "Analytics"],
  },
  {
    id: "web-apps",
    index: "02",
    title: "Web Apps",
    description:
      "Dashboards, SaaS tools, and internal platforms. Full-stack, production-grade, and built to scale — we own the complexity so you don't have to.",
    tags: ["Full Stack", "SaaS", "APIs"],
  },
  {
    id: "ai-services",
    index: "03",
    title: "AI Services",
    description:
      "Chatbots, copilots, and AI workflows wired straight into your product — RAG, automation, and smart search that actually ship.",
    tags: ["LLMs", "RAG", "Automation"],
  },
  {
    id: "mobile-apps",
    index: "04",
    title: "Mobile Apps",
    description:
      "Native-quality iOS & Android apps with React Native — cross-platform without the compromise, shipped without the six-month runway.",
    tags: ["React Native", "iOS", "Android"],
  },
];

export default function Services({ preview = false }: { preview?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="services"
      className="py-24 md:py-32 relative border-t border-rule bg-paper"
      ref={ref}
    >
      <div className="max-w-8xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          className="flex flex-wrap items-end justify-between gap-6 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-2xl">
            <p className="eyebrow text-ash mb-5">
              {preview ? "(02) What we do" : "What we do"}
            </p>
            <h2
              className="font-display font-extrabold text-ink tracking-[-0.02em] leading-[0.95]"
              style={{ fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)" }}
            >
              What we build.
            </h2>
          </div>
          {preview ? (
            <Link
              href="/services"
              className="group inline-flex items-center gap-1.5 text-sm text-ink hover:text-accent transition-colors"
            >
              Explore services
              <ArrowUpRight
                size={15}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </Link>
          ) : (
            <p className="text-ash text-base max-w-sm">
              Four product types. One studio. No hand-offs, no guesswork.
            </p>
          )}
        </motion.div>

        {/* Numbered editorial index */}
        <div className="border-t border-rule">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              id={service.id}
              style={{ scrollMarginTop: "96px" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.07 }}
              className="group border-b border-rule py-8 md:py-11 grid md:grid-cols-12 gap-4 md:gap-8 items-baseline"
            >
              <div className="md:col-span-2 font-mono text-ash text-sm group-hover:text-accent transition-colors">
                {service.index}
              </div>

              <h3 className="md:col-span-4 font-display font-bold text-3xl md:text-4xl text-ink tracking-tight leading-none group-hover:text-accent transition-colors">
                {service.title}
              </h3>

              <p className="md:col-span-4 text-ash text-base leading-relaxed">
                {service.description}
              </p>

              <div className="md:col-span-2 flex flex-wrap gap-x-3 gap-y-1 md:justify-end">
                {service.tags.map((tag) => (
                  <span key={tag} className="eyebrow text-ash">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
