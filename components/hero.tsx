"use client";

import { motion, type Variants } from "framer-motion";
import dynamic from "next/dynamic";
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
              <h1
                className="font-display font-black text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none"
                style={{ WebkitTextStroke: "2px #F0F0F5", color: "transparent" }}
              >
                Digital products
              </h1>
              <h1 className="font-display font-black text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight">
                <span className="bg-gradient-to-r from-[#6C47FF] to-[#00D9FF] bg-clip-text text-transparent">
                  built to outlast
                </span>
              </h1>
              <h1 className="font-display font-black text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight text-white">
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

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
              <motion.a
                href="#work"
                className="inline-flex items-center justify-center gap-2 bg-[#6C47FF] hover:bg-violet-500 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                See Our Work <ArrowRight size={18} />
              </motion.a>
              <motion.a
                href="#process"
                className="inline-flex items-center justify-center border border-white/20 hover:border-white/50 text-white font-medium px-8 py-4 rounded-xl text-lg backdrop-blur-sm bg-white/5 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                How We Work
              </motion.a>
            </motion.div>

            <motion.div variants={fadeUp} className="pt-4">
              <p className="text-muted text-sm tracking-widest uppercase opacity-60">
                Digital Cards · Web Apps · Mobile Apps · Marketing Sites
              </p>
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
