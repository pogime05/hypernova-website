"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CreditCard, LayoutDashboard, Sparkles, Smartphone, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SectionGlow, SectionDivider } from "./ui/section-glow";
import { TiltCard } from "./ui/tilt-card";
import {
  DigitalCardVisual,
  DashboardVisual,
  AIChatVisual,
  MobileVisual,
} from "./service-visuals";

const services = [
  {
    icon: CreditCard,
    title: "Digital Cards",
    description:
      "Smart NFC + QR business cards that share everything in a tap — profile, links, contact, and analytics. The Linktree-killer your brand deserves.",
    tags: ["NFC", "QR", "Analytics"],
    color: "#6C47FF",
    span: "lg:col-span-2",
    Visual: DigitalCardVisual,
  },
  {
    icon: LayoutDashboard,
    title: "Web Apps",
    description:
      "Dashboards, SaaS tools, and internal platforms. Full-stack, production-grade, and built to scale — we own the complexity so you don't have to.",
    tags: ["Full Stack", "SaaS", "APIs"],
    color: "#00D9FF",
    span: "lg:col-span-4",
    Visual: DashboardVisual,
  },
  {
    icon: Sparkles,
    title: "AI Services",
    description:
      "Chatbots, copilots, and AI workflows wired straight into your product — RAG, automation, and smart search that actually ship.",
    tags: ["LLMs", "RAG", "Automation"],
    color: "#A855F7",
    span: "lg:col-span-3",
    Visual: AIChatVisual,
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Native-quality iOS & Android apps with React Native — cross-platform without the compromise, shipped without the six-month runway.",
    tags: ["React Native", "iOS", "Android"],
    color: "#10B981",
    span: "lg:col-span-3",
    Visual: MobileVisual,
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Services({ preview = false }: { preview?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id="services"
      className="py-32 relative border-t border-white/[0.06] bg-white/[0.015]"
      ref={ref}
    >
      <SectionDivider />
      {/* top-center violet glow for rhythm */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[760px] h-[420px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(108,71,255,0.06), transparent 70%)",
        }}
      />
      <SectionGlow
        glows={[
          { color: "#6C47FF", opacity: 0.05, top: "10%", left: "-8%", size: 560 },
          { color: "#00D9FF", opacity: 0.05, bottom: "-12%", right: "-6%", size: 680 },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
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
            {preview ? (
              <Link
                href="/services"
                className="text-sm text-muted hover:text-accent transition-colors flex items-center gap-1 group"
              >
                Explore services{" "}
                <ArrowUpRight
                  size={14}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </Link>
            ) : (
              <p className="text-muted text-lg max-w-sm">
                Four product types. One studio. No hand-offs, no guesswork — live
                previews, not promises.
              </p>
            )}
          </div>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {services.map((service) => {
            const Icon = service.icon;
            const Visual = service.Visual;
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className={service.span}
              >
                <TiltCard className="h-full" glareColor={service.color}>
                <motion.div
                  className="glass-card rounded-2xl p-6 h-full flex flex-col relative overflow-hidden group"
                  whileHover={{
                    y: -4,
                    borderColor: `${service.color}55`,
                    boxShadow: `0 0 34px ${service.color}1a, 0 24px 60px -20px rgba(0,0,0,0.7)`,
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  {/* per-card corner glow */}
                  <div
                    className="absolute -top-20 -right-16 w-52 h-52 rounded-full pointer-events-none opacity-[0.12]"
                    style={{
                      background: `radial-gradient(circle, ${service.color}, transparent 70%)`,
                    }}
                  />

                  {/* header */}
                  <div className="relative flex items-center justify-between mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{
                        background: `${service.color}18`,
                        border: `1px solid ${service.color}30`,
                      }}
                    >
                      <Icon size={20} style={{ color: service.color }} />
                    </div>
                    <div className="flex flex-wrap gap-1.5 justify-end">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2 py-0.5 rounded-full"
                          style={{
                            background: `${service.color}10`,
                            color: `${service.color}CC`,
                            border: `1px solid ${service.color}20`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="relative font-display font-bold text-2xl text-primary mb-2 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="relative text-muted text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* live visual */}
                  <div className="relative mt-auto pt-6">
                    <Visual />
                  </div>

                  {/* bottom accent line on hover */}
                  <div
                    className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
                    style={{
                      background: `linear-gradient(90deg, ${service.color}, transparent)`,
                    }}
                  />
                </motion.div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
