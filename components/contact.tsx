"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

const projectTypes = [
  "Digital Business Card",
  "Web App / SaaS",
  "Marketing Site",
  "Mobile App",
  "Something else",
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  }

  return (
    <section id="contact" className="py-32 relative overflow-hidden border-t border-white/[0.04] bg-white/[0.01]" ref={ref}>
      {/* Accent gradient border top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs text-accent tracking-widest uppercase font-semibold mb-4">
            Let&apos;s work together
          </p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary leading-tight mb-5">
            Got a project in mind?
          </h2>
          <p className="text-muted text-lg max-w-lg mx-auto">
            We take on a limited number of projects each quarter. Let&apos;s see if we&apos;re a good
            fit.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {submitted ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
                <Send size={24} className="text-emerald-400" />
              </div>
              <h3 className="font-display font-bold text-2xl text-primary mb-3">
                Message received.
              </h3>
              <p className="text-muted">
                We&apos;ll be in touch within 24 hours. Keep an eye on{" "}
                <span className="text-primary">hello@hypernovatech.co</span>
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-surface border border-white/[0.06] rounded-2xl p-8 md:p-10 flex flex-col gap-5"
            >
              <div className="grid md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-muted font-medium tracking-wide uppercase">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Johnson"
                    className="bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-primary placeholder-muted/50 text-sm outline-none focus:border-accent/50 focus:bg-accent/[0.03] transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-muted font-medium tracking-wide uppercase">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.co"
                    className="bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-primary placeholder-muted/50 text-sm outline-none focus:border-accent/50 focus:bg-accent/[0.03] transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-muted font-medium tracking-wide uppercase">
                  Project Type
                </label>
                <div className="relative">
                  <select
                    required
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-primary text-sm outline-none focus:border-accent/50 appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-surface">
                      Select a project type
                    </option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type} className="bg-surface">
                        {type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-muted font-medium tracking-wide uppercase">
                  Tell us about your project
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="What are you building? What's the timeline? Any constraints we should know about?"
                  className="bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-primary placeholder-muted/50 text-sm outline-none focus:border-accent/50 focus:bg-accent/[0.03] transition-all resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                <p className="text-xs text-muted">
                  Or email us directly at{" "}
                  <a
                    href="mailto:hello@hypernovatech.co"
                    className="text-accent hover:underline"
                  >
                    hello@hypernovatech.co
                  </a>
                </p>
                <Button type="submit" size="lg" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      Send Message <Send size={16} />
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
