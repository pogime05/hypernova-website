"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SectionGlow, SectionDivider } from "./ui/section-glow";
import { TiltCard } from "./ui/tilt-card";

type Category = "website" | "app" | "cards";

type Project = {
  name: string;
  category: Category;
  categoryLabel: string;
  description: string;
  gradient: string;
  accent: string;
  stack: string[];
  url?: string;
  samples?: { name: string; url: string }[];
};

// Real, shipped work — every entry links out to the live project.
const projects: Project[] = [
  {
    name: "FSI Freight Solutions",
    category: "website",
    categoryLabel: "Website",
    description:
      "Freight logistics + carrier compliance — full-truckload/LTL coordination, 60+ driver-training modules, MTO/DOT compliance.",
    gradient: "from-[#6C47FF] via-[#4A2FCC] to-[#0A0A1A]",
    accent: "#6C47FF",
    stack: ["HTML", "CSS", "JS", "Vercel"],
    url: "https://fsi-website-pi.vercel.app/",
  },
  {
    name: "Atlas Group Partners",
    category: "website",
    categoryLabel: "Website",
    description:
      "Driver screening & background checks — CVOR reports, driver abstracts, 24-hour turnaround. MTO-authorized, PIPEDA-compliant.",
    gradient: "from-[#00D9FF] via-[#0080AA] to-[#0A0A1A]",
    accent: "#00D9FF",
    stack: ["Web", "Vercel"],
    url: "https://atlasgpi.com/",
  },
  {
    name: "Asees Visa Services",
    category: "website",
    categoryLabel: "Website",
    description:
      "Immigration & visa services site with clear service breakdowns and an inquiry flow.",
    gradient: "from-[#A855F7] via-[#7C3AED] to-[#0A0A1A]",
    accent: "#A855F7",
    stack: ["Next.js", "Vercel"],
    url: "https://asees-visa-services.vercel.app/",
  },
  {
    name: "DriveProctor",
    category: "app",
    categoryLabel: "Web App",
    description:
      "A digital road-test app for trucking examiners — structured test administration and scoring, built for the field.",
    gradient: "from-[#00D9FF] via-[#0E7490] to-[#0A0A1A]",
    accent: "#00D9FF",
    stack: ["Web App", "Cloudflare Pages"],
    url: "https://driveproctor.pages.dev/",
  },
  {
    name: "Sunny Meadow Medical Clinic",
    category: "app",
    categoryLabel: "Web App",
    description:
      "Appointment booking with a digital buzzer — book, check in, and skip the waiting-room wait.",
    gradient: "from-[#10B981] via-[#0E7C5A] to-[#0A0A1A]",
    accent: "#10B981",
    stack: ["Next.js", "Vercel"],
    url: "https://sunny-meadow-app.vercel.app/",
  },
  {
    name: "Digital Business Cards",
    category: "cards",
    categoryLabel: "Digital Cards",
    description:
      "Smart NFC + QR business cards for multiple clients — tap-to-share profiles, links, contact.",
    gradient: "from-[#6C47FF] via-[#A855F7] to-[#0A0A1A]",
    accent: "#6C47FF",
    stack: ["HTML", "CSS", "Cloudflare Pages"],
    samples: [
      { name: "Prime Homez", url: "https://prime-homez-card.pages.dev/" },
      { name: "RFMI Bedi", url: "https://rfmi-bedi-card.pages.dev/" },
      { name: "Sanjeev", url: "https://sanjeev-business-whatsapp.pages.dev/" },
    ],
  },
];

const alsoDelivered = [
  "FleetSafety Dashboard",
  "SplitWatt",
  "Analytics dashboards",
  "Pitch presentations",
  "Private personal domains",
];

const filters: { label: string; value: Category | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Websites", value: "website" },
  { label: "Apps", value: "app" },
  { label: "Digital Cards", value: "cards" },
];

export default function Work({
  preview = false,
  category = null,
}: {
  preview?: boolean;
  category?: string | null;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const activeCategory: Category | "all" =
    category === "website" || category === "app" || category === "cards"
      ? category
      : "all";

  // Home shows a 3-project preview; the full page filters by category.
  const visible = preview
    ? projects.slice(0, 3)
    : activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="work"
      className="py-32 relative border-t border-white/[0.06] overflow-hidden"
      style={{ background: "linear-gradient(180deg, #16161F 0%, #111119 100%)" }}
      ref={ref}
    >
      <SectionDivider />
      <SectionGlow
        glows={[
          { color: "#00D9FF", opacity: 0.05, top: "-6%", right: "-4%", size: 560 },
          { color: "#6C47FF", opacity: 0.05, bottom: "-10%", left: "-6%", size: 680 },
        ]}
      />
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs text-accent tracking-widest uppercase font-semibold mb-4">
            Selected work
          </p>
          <div className="flex items-end justify-between flex-wrap gap-6">
            <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary leading-tight">
              Work that speaks
            </h2>
            {preview ? (
              <Link
                href="/work"
                className="text-sm text-muted hover:text-accent transition-colors flex items-center gap-1 group"
              >
                See all work{" "}
                <ArrowUpRight
                  size={14}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </Link>
            ) : (
              <p className="text-sm text-muted max-w-xs">
                Real, shipped work — tap any project to see it live.
              </p>
            )}
          </div>
        </motion.div>

        {/* Filter pills (full page only) */}
        {!preview && (
          <motion.div
            className="flex flex-wrap gap-2.5 mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {filters.map((f) => {
              const active = activeCategory === f.value;
              return (
                <Link
                  key={f.value}
                  href={f.value === "all" ? "/work" : `/work?category=${f.value}`}
                  scroll={false}
                  className={`text-sm font-medium px-4 py-2 rounded-full border transition-all ${
                    active
                      ? "bg-accent text-white border-accent shadow-lg shadow-accent/20"
                      : "text-muted border-white/[0.1] hover:text-white hover:border-white/25 bg-white/[0.02]"
                  }`}
                >
                  {f.label}
                </Link>
              );
            })}
          </motion.div>
        )}

        {/* Grid — uniform so category filtering never leaves holes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 [grid-auto-flow:dense]">
          {visible.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {/* Also delivered + disclaimer (full page only) */}
        {!preview && (
          <motion.div
            className="mt-14"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-xs text-muted tracking-widest uppercase font-semibold mb-4">
              Also delivered
            </p>
            <div className="flex flex-wrap gap-2.5">
              {alsoDelivered.map((item) => (
                <span
                  key={item}
                  className="text-sm text-muted/80 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02]"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const isCards = !!project.samples;
  return (
    <TiltCard className="h-full" glareColor={project.accent}>
      <div className="group relative rounded-2xl overflow-hidden glass-card h-full flex flex-col transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[rgba(108,71,255,0.45)] hover:shadow-[0_0_34px_rgba(108,71,255,0.16),0_24px_60px_-20px_rgba(0,0,0,0.7)]">
        {/* Gradient preview */}
        <div
          className={`bg-gradient-to-br ${project.gradient} h-40 relative overflow-hidden shrink-0`}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full opacity-20 blur-xl"
            style={{ background: project.accent }}
          />
          <div
            className="absolute top-1/4 right-1/4 w-12 h-12 rounded-lg opacity-30 rotate-45"
            style={{ background: project.accent, border: `1px solid ${project.accent}60` }}
          />

          {/* Live badge */}
          <span className="absolute top-3 left-3 z-20 inline-flex items-center gap-1.5 rounded-full bg-accent/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-white shadow-lg shadow-accent/30">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            Live
          </span>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-xs font-mono px-2 py-0.5 rounded"
              style={{
                background: `${project.accent}15`,
                color: project.accent,
                border: `1px solid ${project.accent}25`,
              }}
            >
              {project.categoryLabel}
            </span>
          </div>

          <h3 className="font-display font-bold text-xl text-primary mb-2 group-hover:text-accent transition-colors">
            {project.name}
          </h3>
          <p className="text-muted text-sm leading-relaxed">
            {project.description}
          </p>

          <div className="mt-4 flex items-center gap-2 flex-wrap">
            {project.stack.map((tech) => (
              <span key={tech} className="text-xs text-muted/70 font-mono">
                {tech}
              </span>
            ))}
          </div>

          {/* Actions */}
          {isCards ? (
            <div className="mt-5 pt-4 border-t border-white/[0.06]">
              <p className="text-[11px] text-muted uppercase tracking-wider mb-2.5">
                Sample cards
              </p>
              <div className="flex flex-wrap gap-2">
                {project.samples!.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-20 inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full border border-white/[0.1] text-primary/90 bg-white/[0.03] hover:border-accent/50 hover:text-accent hover:bg-accent/[0.06] transition-all"
                  >
                    {s.name} <ArrowUpRight size={12} />
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-auto pt-5 flex items-center justify-between">
              <span className="text-sm font-medium text-accent flex items-center gap-1 group-hover:gap-1.5 transition-all">
                View Project <ArrowUpRight size={14} />
              </span>
            </div>
          )}
        </div>

        {/* Stretched link for single-destination cards */}
        {!isCards && project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.name} (opens in a new tab)`}
            className="absolute inset-0 z-10"
          />
        )}

        {/* Bottom border glow on hover */}
        <div
          className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500 pointer-events-none"
          style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
        />
      </div>
    </TiltCard>
  );
}
