"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ClipReveal } from "./ui/reveal";
import {
  DigitalCardVisual,
  DashboardVisual,
  AIChatVisual,
  MobileVisual,
} from "./service-visuals";

const services = [
  {
    id: "digital-cards",
    index: "01",
    title: "Digital Cards",
    description:
      "Smart NFC + QR business cards that share everything in a tap — profile, links, contact, and analytics.",
    tags: ["NFC", "QR", "Analytics"],
    Visual: DigitalCardVisual,
  },
  {
    id: "web-apps",
    index: "02",
    title: "Web Apps",
    description:
      "Dashboards, SaaS tools, and internal platforms. Full-stack, production-grade, and built to scale.",
    tags: ["Full Stack", "SaaS", "APIs"],
    Visual: DashboardVisual,
  },
  {
    id: "ai-services",
    index: "03",
    title: "AI Services",
    description:
      "Chatbots, copilots, and AI workflows wired straight into your product — RAG, automation, smart search.",
    tags: ["LLMs", "RAG", "Automation"],
    Visual: AIChatVisual,
  },
  {
    id: "mobile-apps",
    index: "04",
    title: "Mobile Apps",
    description:
      "Native-quality iOS & Android apps with React Native — cross-platform without the compromise.",
    tags: ["React Native", "iOS", "Android"],
    Visual: MobileVisual,
  },
];

function ServiceCard({
  service,
}: {
  service: (typeof services)[number];
}) {
  const { Visual } = service;
  return (
    <div
      id={service.id}
      style={{ scrollMarginTop: "96px" }}
      className="group border border-rule bg-paper flex flex-col"
    >
      <div className="p-5 md:p-6 border-b border-rule">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-sm text-ash group-hover:text-accent transition-colors duration-200">
            {service.index}
          </span>
          <div className="flex flex-wrap gap-x-3 gap-y-1 justify-end">
            {service.tags.map((tag) => (
              <span key={tag} className="eyebrow text-ash">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <h3 className="font-display font-bold text-2xl md:text-3xl text-ink tracking-tight leading-none">
          {service.title}
        </h3>
        <p className="mt-3 text-ash text-[0.95rem] leading-relaxed max-w-sm">
          {service.description}
        </p>
      </div>
      <div className="p-5 md:p-6">
        <Visual />
      </div>
    </div>
  );
}

export default function Services({ preview = false }: { preview?: boolean }) {
  const reduced = useReducedMotion();

  const heading = (
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
  );

  return (
    <section
      id="services"
      className="py-16 md:py-20 relative border-t border-rule bg-paper"
    >
      <div className="max-w-8xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8 md:mb-10">
          {/* Above-the-fold on /services → CSS load entrance; below-the-fold
              preview on Home → clip reveal on scroll. */}
          {preview ? <ClipReveal>{heading}</ClipReveal> : <div className="rise">{heading}</div>}

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
              Four product types. One studio — real, working interfaces, not
              promises.
            </p>
          )}
        </div>

        {/* Cards with live product UI */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-6 items-start">
          {services.map((service, i) =>
            preview ? (
              <motion.div
                key={service.id}
                initial={reduced ? false : { opacity: 0, y: 24 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ) : (
              <div
                key={service.id}
                className="rise"
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                <ServiceCard service={service} />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
