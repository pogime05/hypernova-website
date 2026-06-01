"use client";

import { motion, type Variants } from "framer-motion";
import dynamic from "next/dynamic";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowRight } from "lucide-react";

const Logo3D = dynamic(() => import("./logo3d"), { ssr: false });

const stagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-cyan/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start gap-6"
          >
            <motion.div variants={fadeUp}>
              <Badge variant="green" pulse>
                Available for new projects
              </Badge>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-2">
              <h1 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-primary">
                Digital products
              </h1>
              <h1 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
                <span className="gradient-text">built to outlast</span>
              </h1>
              <h1 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-primary">
                the hype.
              </h1>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-muted text-lg md:text-xl leading-relaxed max-w-md"
            >
              We design and develop websites, apps, and digital experiences for
              founders, brands, and businesses ready to grow.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">
              <Button href="#work" size="lg">
                See Our Work <ArrowRight size={18} />
              </Button>
              <Button href="#process" size="lg" variant="ghost">
                How We Work
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex items-center gap-6 pt-4"
            >
              <div className="flex -space-x-2">
                {["A", "M", "K", "R"].map((l, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-bg flex items-center justify-center text-xs font-bold"
                    style={{
                      background: `hsl(${i * 60 + 240}, 70%, 50%)`,
                    }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm text-primary font-medium">
                  Trusted by 30+ clients
                </p>
                <p className="text-xs text-muted">
                  across 12 countries
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — 3D Logo */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* Glow behind the 3D */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-64 bg-accent/20 rounded-full blur-[80px]" />
              </div>
              <Logo3D />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-xs text-muted tracking-widest uppercase">
            scroll
          </span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-muted to-transparent"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
