"use client";

import { useState } from "react";
import { Send, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

const projectTypes = [
  "Digital Business Card",
  "Web App / SaaS",
  "AI Services",
  "Mobile App",
  "Something else",
];

// Web3Forms — submissions POST to https://api.web3forms.com/submit and route
// to pogime05@gmail.com. Free access key (250 submissions/mo).
const WEB3FORMS_KEY = "064d7e2a-4e74-470d-a6d2-0ecd0824f5c3";

const CONTACT_EMAIL = "pogime05@gmail.com";

const inputClasses =
  "bg-paper border border-rule px-4 py-3 text-ink placeholder-ash/60 text-sm outline-none focus:border-accent transition-colors";

export default function Contact() {
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
    <section
      id="contact"
      className="pt-28 md:pt-32 pb-16 md:pb-20 relative bg-paper"
    >
      <div className="max-w-8xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          {/* Left — heading + direct contact */}
          <div className="rise md:col-span-5">
            <p className="eyebrow text-ash mb-6">Let&apos;s work together</p>
            <h1
              className="font-display font-extrabold text-ink tracking-[-0.02em] leading-[0.95]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              Got a project in mind?
            </h1>
            <p className="text-ash text-lg leading-relaxed mt-6 max-w-sm">
              We take on a limited number of projects each quarter. Tell us what
              you&apos;re building and we&apos;ll see if we&apos;re a good fit.
            </p>

            <div className="mt-10 border-t border-rule pt-6">
              <p className="eyebrow text-ash mb-2">Or email directly</p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-ink text-lg hover:text-accent transition-colors"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div className="rise md:col-span-7" style={{ animationDelay: "0.12s" }}>
            {submitted ? (
              <div className="border border-rule p-10 md:p-12 flex flex-col items-start">
                <div className="w-12 h-12 border border-accent flex items-center justify-center mb-6 text-accent">
                  <Send size={20} />
                </div>
                <h3 className="font-display font-bold text-2xl text-ink mb-3">
                  Message received.
                </h3>
                <p className="text-ash">
                  We&apos;ll be in touch within 24 hours at the email you provided.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="border border-rule p-6 md:p-9 flex flex-col gap-5"
              >
                {/* honeypot */}
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
                    <label className="eyebrow text-ash">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Alex Johnson"
                      className={inputClasses}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="eyebrow text-ash">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="alex@company.co"
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="eyebrow text-ash">Project Type</label>
                  <div className="relative">
                    <select
                      name="project_type"
                      required
                      defaultValue=""
                      className={`w-full appearance-none cursor-pointer ${inputClasses}`}
                    >
                      <option value="" disabled>
                        Select a project type
                      </option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-ash pointer-events-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="eyebrow text-ash">
                    Tell us about your project
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="What are you building? What's the timeline? Any constraints we should know about?"
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                {error && (
                  <p className="text-sm text-accent border border-accent/40 px-4 py-3">
                    {error}
                  </p>
                )}

                <div className="pt-1">
                  <Button type="submit" size="lg" disabled={loading}>
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-paper/40 border-t-paper rounded-full animate-spin" />
                        Sending…
                      </span>
                    ) : (
                      <>
                        Send message <Send size={16} />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
