"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Category = "website" | "app" | "cards";

type Project = {
  name: string;
  category: Category;
  categoryLabel: string;
  description: string;
  /** Unsplash photo id — omitted for abstract products (rendered as an ink block). */
  image?: string;
  alt?: string;
  stack: string[];
  url?: string;
  samples?: { name: string; url: string }[];
};

const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=70`;

// Real, shipped work — every entry links out to the live project.
const projects: Project[] = [
  {
    name: "FSI Freight Solutions",
    category: "website",
    categoryLabel: "Website",
    description:
      "Freight logistics + carrier compliance — full-truckload/LTL coordination, 60+ driver-training modules, MTO/DOT compliance.",
    image: "photo-1591768793355-74d04bb6608f",
    alt: "Freight semi-truck travelling a highway at dawn",
    stack: ["HTML", "CSS", "JS", "Vercel"],
    url: "https://fsi-website-pi.vercel.app/",
  },
  {
    name: "Atlas Group Partners",
    category: "website",
    categoryLabel: "Website",
    description:
      "Driver screening & background checks — CVOR reports, driver abstracts, 24-hour turnaround. MTO-authorized, PIPEDA-compliant.",
    image: "photo-1601584115197-04ecc0da31d7",
    alt: "Long-haul truck on an open highway",
    stack: ["Web", "Vercel"],
    url: "https://atlasgpi.com/",
  },
  {
    name: "Asees Visa Services",
    category: "website",
    categoryLabel: "Website",
    description:
      "Immigration & visa services site with clear service breakdowns and an inquiry flow.",
    image: "photo-1569154941061-e231b4725ef1",
    alt: "Passenger aircraft on the tarmac at an airport terminal",
    stack: ["Next.js", "Vercel"],
    url: "https://asees-visa-services.vercel.app/",
  },
  {
    name: "DriveProctor",
    category: "app",
    categoryLabel: "Web App",
    description:
      "A digital road-test app for trucking examiners — structured test administration and scoring, built for the field.",
    image: "photo-1449965408869-eaa3f722e40d",
    alt: "Driver's hands on a steering wheel at dusk",
    stack: ["Web App", "Cloudflare Pages"],
    url: "https://driveproctor.pages.dev/",
  },
  {
    name: "Sunny Meadow Medical Clinic",
    category: "app",
    categoryLabel: "Web App",
    description:
      "Appointment booking with a digital buzzer — book, check in, and skip the waiting-room wait.",
    image: "photo-1576091160399-112ba8d25d1d",
    alt: "Doctor in a white coat using a smartphone",
    stack: ["Next.js", "Vercel"],
    url: "https://sunny-meadow-app.vercel.app/",
  },
  {
    name: "Digital Business Cards",
    category: "cards",
    categoryLabel: "Digital Cards",
    description:
      "Smart NFC + QR business cards for multiple clients — tap-to-share profiles, links, contact.",
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
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const activeCategory: Category | "all" =
    category === "website" || category === "app" || category === "cards"
      ? category
      : "all";

  const visible = preview
    ? projects.slice(0, 4)
    : activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="work"
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
          <div>
            <p className="eyebrow text-ash mb-5">
              {preview ? "(01) Selected work" : "Selected work"}
            </p>
            <h2
              className="font-display font-extrabold text-ink tracking-[-0.02em] leading-[0.95]"
              style={{ fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)" }}
            >
              Work that speaks.
            </h2>
          </div>
          {preview ? (
            <Link
              href="/work"
              className="group inline-flex items-center gap-1.5 text-sm text-ink hover:text-accent transition-colors"
            >
              See all work
              <ArrowUpRight
                size={15}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </Link>
          ) : (
            <p className="text-ash text-base max-w-xs">
              Real, shipped work — tap any project to see it live.
            </p>
          )}
        </motion.div>

        {/* Filter pills (full page only) */}
        {!preview && (
          <motion.div
            className="flex flex-wrap gap-x-6 gap-y-2 mb-12 border-b border-rule pb-5"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {filters.map((f) => {
              const active = activeCategory === f.value;
              return (
                <Link
                  key={f.value}
                  href={f.value === "all" ? "/work" : `/work?category=${f.value}`}
                  scroll={false}
                  className={`eyebrow transition-colors ${
                    active
                      ? "text-accent"
                      : "text-ash hover:text-ink"
                  }`}
                >
                  {f.label}
                </Link>
              );
            })}
          </motion.div>
        )}

        {/* Editorial project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 md:gap-y-20">
          {visible.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 26 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.08 + (i % 2) * 0.08 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {/* Also delivered (full page only) */}
        {!preview && (
          <motion.div
            className="mt-20 border-t border-rule pt-10"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="eyebrow text-ash mb-5">Also delivered</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {alsoDelivered.map((item) => (
                <span key={item} className="text-sm text-ash">
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
    <article className="group flex flex-col">
      {/* Visual — full-bleed photo, or an ink block for abstract products */}
      <div className="relative aspect-[16/10] overflow-hidden border border-rule bg-ink">
        {project.image ? (
          <Image
            src={IMG(project.image)}
            alt={project.alt ?? project.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex items-end p-6">
            <span className="font-display font-bold text-paper text-3xl leading-tight">
              {project.name}
            </span>
            <span
              aria-hidden="true"
              className="absolute right-5 top-5 text-accent font-display font-black text-5xl opacity-80"
            >
              ⌇
            </span>
          </div>
        )}

        {/* Live label */}
        {(project.url || isCards) && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 bg-paper px-2.5 py-1 eyebrow text-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Live
          </span>
        )}
      </div>

      {/* Meta */}
      <div className="mt-5 flex flex-col">
        <div className="flex items-center justify-between gap-4">
          <span className="eyebrow text-ash">{project.categoryLabel}</span>
          <span className="eyebrow text-ash">{project.stack.join(" · ")}</span>
        </div>

        <h3 className="mt-3 font-display font-bold text-2xl md:text-[1.7rem] text-ink leading-tight">
          {project.name}
        </h3>
        <p className="mt-2 text-ash text-[0.95rem] leading-relaxed max-w-md">
          {project.description}
        </p>

        {isCards ? (
          <div className="mt-5">
            <p className="eyebrow text-ash mb-3">Sample cards</p>
            <div className="flex flex-wrap gap-2">
              {project.samples!.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm px-3 py-1.5 border border-rule text-ink hover:border-accent hover:text-accent transition-colors"
                >
                  {s.name} <ArrowUpRight size={13} />
                </a>
              ))}
            </div>
          </div>
        ) : (
          project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent w-fit group/link"
            >
              View project
              <ArrowUpRight
                size={15}
                className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
              />
            </a>
          )
        )}
      </div>
    </article>
  );
}
