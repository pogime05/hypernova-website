"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionGlow, SectionDivider } from "./ui/section-glow";
import { TiltCard } from "./ui/tilt-card";

const projects = [
  {
    name: "NovaDeck",
    category: "Web App",
    description:
      "A digital business card platform that turns a tap into a complete brand experience. Custom profiles, NFC support, QR generation, and analytics — all in one link.",
    gradient: "from-[#6C47FF] via-[#4A2FCC] to-[#0A0A1A]",
    accent: "#6C47FF",
    year: "2024",
    stack: ["Next.js", "Prisma", "Stripe"],
    size: "large",
  },
  {
    name: "ShiftHR",
    category: "SaaS",
    description:
      "An HR dashboard for remote-first teams — time tracking, leave management, performance reviews, and org charts. Built for teams of 10 to 500.",
    gradient: "from-[#00D9FF] via-[#0080AA] to-[#0A0A1A]",
    accent: "#00D9FF",
    year: "2024",
    stack: ["React", "Node.js", "PostgreSQL"],
    size: "small",
  },
  {
    name: "Bloom Studio",
    category: "Website",
    description:
      "Marketing site for a NYC-based creative agency. Zero templates. Custom scroll animations, a bespoke color system, and a Lighthouse score above 95.",
    gradient: "from-[#A855F7] via-[#7C3AED] to-[#0A0A1A]",
    accent: "#A855F7",
    year: "2023",
    stack: ["Next.js", "GSAP", "Sanity"],
    size: "small",
  },
];

export default function Work() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id="work"
      className="py-32 relative border-t border-white/[0.06] overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0E0E16 0%, #0A0A0F 100%)" }}
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
          className="mb-16"
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
            <a
              href="#contact"
              className="text-sm text-muted hover:text-accent transition-colors flex items-center gap-1 group"
            >
              View all projects{" "}
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
          </div>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Large card */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ProjectCard project={projects[0]} large />
          </motion.div>

          {/* Small cards stacked */}
          <div className="flex flex-col gap-5">
            {projects.slice(1).map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                className="flex-1"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  large = false,
}: {
  project: (typeof projects)[0];
  large?: boolean;
}) {
  return (
    <TiltCard className="h-full" glareColor={project.accent}>
    <motion.div
      className="group relative rounded-2xl overflow-hidden glass-card h-full cursor-pointer"
      whileHover={{
        y: -4,
        borderColor: "rgba(108,71,255,0.45)",
        boxShadow:
          "0 0 34px rgba(108,71,255,0.16), 0 24px 60px -20px rgba(0,0,0,0.7)",
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Gradient preview */}
      <div
        className={`bg-gradient-to-br ${project.gradient} ${large ? "h-64" : "h-40"} relative overflow-hidden`}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
        {/* Decorative shapes */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full opacity-20 blur-xl"
          style={{ background: project.accent }}
        />
        <div
          className="absolute top-1/4 right-1/4 w-12 h-12 rounded-lg opacity-30 rotate-45"
          style={{ background: project.accent, border: `1px solid ${project.accent}60` }}
        />

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-black/50 backdrop-blur-sm rounded-full p-3">
            <ArrowUpRight size={20} className="text-white" />
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className={`p-5 ${large ? "p-6" : ""}`}>
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-xs font-mono px-2 py-0.5 rounded"
            style={{
              background: `${project.accent}15`,
              color: project.accent,
              border: `1px solid ${project.accent}25`,
            }}
          >
            {project.category}
          </span>
          <span className="text-xs text-muted font-mono">{project.year}</span>
        </div>

        <h3
          className={`font-display font-bold text-primary mb-2 group-hover:text-accent transition-colors ${
            large ? "text-2xl" : "text-xl"
          }`}
        >
          {project.name}
        </h3>
        <p className="text-muted text-sm leading-relaxed line-clamp-2">
          {project.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {project.stack.map((tech) => (
              <span key={tech} className="text-xs text-muted/70 font-mono">
                {tech}
              </span>
            ))}
          </div>
          <span className="text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            View Project <ArrowUpRight size={12} />
          </span>
        </div>
      </div>

      {/* Bottom border glow on hover */}
      <div
        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
        style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
      />
    </motion.div>
    </TiltCard>
  );
}
