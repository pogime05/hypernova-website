"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

const projectTypes = [
  "Digital Business Card",
  "Web App / SaaS",
  "AI Services",
  "Mobile App",
  "Something else",
];

// TODO: add Web3Forms key — create a free access key at https://web3forms.com
// and paste it here. Submissions POST to https://api.web3forms.com/submit and
// route to pogime05@gmail.com. The form is fully wired; it just needs the key.
const WEB3FORMS_KEY = "TODO_ADD_KEY";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", WEB3FORMS_KEY);
    formData.append("subject", "New project inquiry — HyperNova Technologies");
    formData.append("from_name", "HyperNova Technologies Website");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error — please try again, or email us directly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-32 relative overflow-hidden border-t border-white/[0.06] bg-white/[0.015]" ref={ref}>
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
              className="glass-card rounded-2xl p-8 md:p-10 flex flex-col gap-5"
            >
              {/* honeypot — spam bots fill this; humans never see it */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-muted font-medium tracking-wide uppercase">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
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
                    name="email"
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
                    name="project_type"
                    required
                    defaultValue=""
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
                  name="message"
                  required
                  rows={5}
                  placeholder="What are you building? What's the timeline? Any constraints we should know about?"
                  className="bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-primary placeholder-muted/50 text-sm outline-none focus:border-accent/50 focus:bg-accent/[0.03] transition-all resize-none"
                />
              </div>

              {error && (
                <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/25 rounded-lg px-4 py-3">
                  {error}
                </p>
              )}

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
