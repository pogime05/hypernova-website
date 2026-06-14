"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Mail,
  Phone,
  Nfc,
  Bot,
  Send,
  TrendingUp,
  Wifi,
  Battery,
  SignalHigh,
  Home,
  Search,
  Bell,
  User,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────────────────
   Live, coded mini-UIs that live INSIDE each service card. CSS + SVG only,
   framer-motion for motion. No images, no extra deps, no WebGL.
   ──────────────────────────────────────────────────────────────────────── */

// 1 ── DIGITAL CARDS → a mini interactive digital business card ───────────────
export function DigitalCardVisual() {
  return (
    <div className="relative w-full [perspective:900px]">
      <motion.div
        className="glass-inset rounded-xl p-4 relative overflow-hidden"
        initial={{ rotateX: 6, rotateY: -6 }}
        whileHover={{ rotateX: 0, rotateY: 0, y: -2 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* gradient header band */}
        <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-r from-accent/45 via-accent/20 to-cyan/35" />
        {/* shimmer sweep */}
        <div
          className="absolute inset-0 animate-shimmer opacity-60"
          style={{
            background:
              "linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.10) 50%, transparent 65%)",
            backgroundSize: "200% 100%",
          }}
        />

        <div className="relative flex items-center gap-3 pt-6">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-accent to-cyan ring-2 ring-white/15 shrink-0" />
          <div className="min-w-0">
            <div className="text-sm font-semibold text-primary leading-tight">
              Ava Mercer
            </div>
            <div className="text-[11px] text-muted">Founder · Mercer Studio</div>
          </div>
          <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-cyan bg-cyan/10 border border-cyan/25 rounded-full px-2 py-0.5">
            <Nfc size={11} /> Tap
          </span>
        </div>

        <div className="relative flex items-center gap-2 mt-4">
          {[Globe, Mail, Phone].map((Icon, i) => (
            <motion.span
              key={i}
              className="w-7 h-7 rounded-lg grid place-items-center bg-white/[0.04] border border-white/[0.07] text-primary/80"
              whileHover={{ y: -2, color: "#00D9FF" }}
            >
              <Icon size={13} />
            </motion.span>
          ))}
          {/* mini QR */}
          <div className="ml-auto grid grid-cols-4 gap-[2px] p-1 rounded-md bg-white/[0.04] border border-white/[0.07]">
            {QR_PATTERN.map((on, i) => (
              <span
                key={i}
                className={`w-[3px] h-[3px] rounded-[1px] ${
                  on ? "bg-primary/80" : "bg-transparent"
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const QR_PATTERN = [
  1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0,
];

// 2 ── WEB APPS → a tiny dashboard (stat tiles + animated sparkline) ──────────
export function DashboardVisual() {
  const stats = [
    { label: "Revenue", value: "$48.2k", delta: "+12%" },
    { label: "Active", value: "2,941", delta: "+5.4%" },
    { label: "Uptime", value: "99.9%", delta: "30d" },
  ];

  return (
    <div className="glass-inset rounded-xl p-4 w-full">
      <div className="grid grid-cols-3 gap-2 mb-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg bg-white/[0.03] border border-white/[0.06] px-2.5 py-2"
          >
            <div className="text-[10px] text-muted truncate">{s.label}</div>
            <div className="text-sm font-semibold text-primary leading-tight">
              {s.value}
            </div>
            <div className="flex items-center gap-0.5 text-[10px] text-emerald-400">
              <TrendingUp size={10} /> {s.delta}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-muted">Weekly traffic</span>
          <span className="text-[10px] text-cyan">+18.6%</span>
        </div>
        <svg
          viewBox="0 0 240 56"
          className="w-full h-12"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#00D9FF" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="spark-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6C47FF" />
              <stop offset="100%" stopColor="#00D9FF" />
            </linearGradient>
          </defs>
          {/* area fill */}
          <motion.path
            d={`${SPARK_LINE} L240,56 L0,56 Z`}
            fill="url(#spark-fill)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          {/* stroke */}
          <motion.path
            d={SPARK_LINE}
            fill="none"
            stroke="url(#spark-line)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </div>
  );
}

const SPARK_LINE =
  "M0,42 C20,40 28,20 48,24 C68,28 80,8 100,14 C120,20 132,34 152,30 C172,26 186,10 208,16 C224,20 232,30 240,26";

// 3 ── AI SERVICES → a small chat / prompt UI snippet ─────────────────────────
export function AIChatVisual() {
  return (
    <div className="glass-inset rounded-xl p-3 w-full flex flex-col gap-2">
      {/* user message */}
      <div className="self-end max-w-[85%] rounded-2xl rounded-br-sm bg-accent/15 border border-accent/25 px-3 py-1.5 text-[11px] text-primary/90">
        Summarize today&apos;s signups
      </div>

      {/* assistant message + typing */}
      <div className="self-start flex items-end gap-1.5 max-w-[90%]">
        <span className="w-5 h-5 rounded-full grid place-items-center bg-gradient-to-br from-accent to-cyan text-white shrink-0">
          <Bot size={11} />
        </span>
        <div className="rounded-2xl rounded-bl-sm bg-white/[0.05] border border-white/[0.07] px-3 py-2">
          <div className="flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-cyan"
                animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.18,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* prompt bar */}
      <div className="mt-1 flex items-center gap-2 rounded-lg bg-white/[0.04] border border-white/[0.08] px-2.5 py-1.5">
        <span className="text-[11px] text-muted">
          Ask anything
          <span className="inline-block w-[1px] h-3 align-middle ml-0.5 bg-cyan animate-blink" />
        </span>
        <span className="ml-auto w-6 h-6 rounded-md grid place-items-center bg-accent text-white">
          <Send size={11} />
        </span>
      </div>
    </div>
  );
}

// 4 ── MOBILE APPS → a phone frame with an app screen ─────────────────────────
export function MobileVisual() {
  return (
    <div className="w-full grid place-items-center py-1">
      <motion.div
        className="relative w-[148px] rounded-[1.8rem] border border-white/[0.1] bg-[#0b0b12] p-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: "transform" }}
      >
        {/* notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-black rounded-b-xl z-10" />
        <div className="rounded-[1.4rem] overflow-hidden bg-gradient-to-b from-[#14141d] to-[#0c0c12] border border-white/[0.05]">
          {/* status bar */}
          <div className="flex items-center justify-between px-3 pt-2 pb-1 text-[8px] text-primary/70">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <SignalHigh size={9} />
              <Wifi size={9} />
              <Battery size={9} />
            </span>
          </div>

          {/* app header */}
          <div className="px-3 pt-1">
            <div className="text-[8px] text-muted">Good morning</div>
            <div className="text-[11px] font-semibold text-primary">
              Your Wallet
            </div>
          </div>

          {/* balance card */}
          <div className="mx-3 mt-2 rounded-lg p-2.5 bg-gradient-to-br from-accent to-[#4a2fcc]">
            <div className="text-[7px] text-white/70">Balance</div>
            <div className="text-[13px] font-bold text-white leading-tight">
              $12,480
            </div>
            <div className="mt-1 flex items-center gap-0.5 text-[7px] text-white/80">
              <TrendingUp size={8} /> +3.2% this week
            </div>
          </div>

          {/* list rows */}
          <div className="px-3 mt-2 flex flex-col gap-1.5">
            {["Spotify", "Transfer", "Apple"].map((row, i) => (
              <div key={row} className="flex items-center gap-2">
                <span
                  className="w-5 h-5 rounded-md shrink-0"
                  style={{
                    background:
                      i === 0
                        ? "rgba(16,185,129,0.25)"
                        : i === 1
                        ? "rgba(0,217,255,0.25)"
                        : "rgba(108,71,255,0.25)",
                  }}
                />
                <span className="flex-1 text-[8px] text-primary/80">{row}</span>
                <span className="text-[8px] text-muted">
                  -${(i + 1) * 9}.0
                </span>
              </div>
            ))}
          </div>

          {/* bottom tab bar */}
          <div className="mt-3 flex items-center justify-around border-t border-white/[0.06] py-1.5 text-primary/50">
            <Home size={11} className="text-cyan" />
            <Search size={11} />
            <Bell size={11} />
            <User size={11} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
