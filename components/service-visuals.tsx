"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Globe,
  Mail,
  Phone,
  Nfc,
  ArrowUp,
  ArrowUpRight,
  Wifi,
  BatteryMedium,
  SignalHigh,
  Home,
  BarChart3,
  Wallet,
  User,
  CornerDownLeft,
} from "lucide-react";

/* ───────────────────────────────────────────────────────────────────────────
   Live, coded mini-interfaces for the service cards — proof of capability,
   redrawn as precise technical drawings on paper. Paper backgrounds, 1px `rule`
   borders, ink line-art, monospace spec labels, and the accent used exactly
   once per interface. No fills, no glow, no gradients.
   ─────────────────────────────────────────────────────────────────────────── */

/** Shared figure caption bar — gives each visual a "spec sheet" header. */
function FigureBar({ label, right }: { label: string; right: string }) {
  return (
    <div className="flex items-center justify-between border-b border-rule px-3 py-2">
      <span className="eyebrow text-ash">{label}</span>
      <span className="eyebrow text-ash">{right}</span>
    </div>
  );
}

// 1 ── DIGITAL CARDS → a rendered digital business card ───────────────────────
export function DigitalCardVisual() {
  return (
    <div className="border border-rule bg-paper">
      <FigureBar label="card.preview" right="NFC · QR" />
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center border border-ink text-ink font-display font-bold text-sm">
            AM
          </div>
          <div className="min-w-0">
            <div className="font-display font-bold text-ink leading-tight">
              Ava Mercer
            </div>
            <div className="text-xs text-ash">Founder · Mercer Studio</div>
          </div>
          <span className="ml-auto inline-flex items-center gap-1.5 eyebrow text-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Tap
          </span>
        </div>

        {/* contact rows — line-art */}
        <div className="mt-4 border-t border-rule">
          {[
            { Icon: Globe, label: "mercer.studio" },
            { Icon: Mail, label: "ava@mercer.studio" },
            { Icon: Phone, label: "+1 (416) 555-0148" },
          ].map(({ Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 border-b border-rule py-2"
            >
              <Icon size={14} strokeWidth={1.5} className="text-ash shrink-0" />
              <span className="font-mono text-xs text-ink">{label}</span>
            </div>
          ))}
        </div>

        {/* footer: NFC tag + mini QR drawn as ink cells */}
        <div className="mt-4 flex items-end justify-between">
          <span className="inline-flex items-center gap-1.5 text-ash">
            <Nfc size={14} strokeWidth={1.5} />
            <span className="eyebrow">tap-to-share</span>
          </span>
          <div className="grid grid-cols-5 gap-[2px]">
            {QR_CELLS.map((on, i) => (
              <span
                key={i}
                className={`h-[5px] w-[5px] ${on ? "bg-ink" : "bg-transparent"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// deterministic 5×5 "QR" pattern
const QR_CELLS = [
  1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1,
];

// 2 ── WEB APPS → a compact dashboard with an ink line chart ──────────────────
export function DashboardVisual() {
  const reduced = useReducedMotion();
  const stats = [
    { label: "Revenue", value: "$48.2k", delta: "+12%" },
    { label: "Active", value: "2,941", delta: "+5.4%" },
    { label: "Uptime", value: "99.9%", delta: "30d" },
  ];

  return (
    <div className="border border-rule bg-paper">
      <FigureBar label="dashboard.tsx" right="LIVE" />
      {/* stat row */}
      <div className="grid grid-cols-3 divide-x divide-rule border-b border-rule">
        {stats.map((s) => (
          <div key={s.label} className="px-3 py-2.5">
            <div className="eyebrow text-ash">{s.label}</div>
            <div className="font-display font-bold text-ink text-lg leading-tight mt-1">
              {s.value}
            </div>
            <div className="font-mono text-[11px] text-ash mt-0.5">{s.delta}</div>
          </div>
        ))}
      </div>

      {/* line chart */}
      <div className="px-3 pt-3 pb-2">
        <div className="flex items-center justify-between mb-1.5">
          <span className="eyebrow text-ash">weekly traffic</span>
          <span className="font-mono text-[11px] text-accent">+18.6%</span>
        </div>
        <svg viewBox="0 0 300 96" className="w-full h-24" preserveAspectRatio="none">
          {/* gridlines (rule) */}
          {[0, 24, 48, 72, 96].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="300"
              y2={y}
              stroke="#E2E0DA"
              strokeWidth="1"
            />
          ))}
          {/* accent stroke — draws itself in once on scroll */}
          <motion.path
            d={CHART_PATH}
            fill="none"
            stroke="#4A2BFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduced ? false : { pathLength: 0 }}
            whileInView={reduced ? undefined : { pathLength: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* end marker */}
          <circle cx="288" cy="26" r="3" fill="#0E0E10" />
        </svg>
        <div className="flex justify-between mt-1">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span key={i} className="font-mono text-[10px] text-ash">
              {d}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const CHART_PATH =
  "M6,72 L48,60 L90,66 L132,40 L174,48 L216,30 L258,36 L288,26";

// 3 ── AI SERVICES → a chat exchange UI ───────────────────────────────────────
export function AIChatVisual() {
  return (
    <div className="border border-rule bg-paper">
      <FigureBar label="assistant.chat" right="RAG · TOOLS" />
      <div className="p-4 flex flex-col gap-3">
        {/* user prompt */}
        <div className="self-end max-w-[85%] border border-rule bg-ink/[0.03] px-3 py-2">
          <p className="text-xs text-ink leading-relaxed">
            Summarize this week&apos;s signups.
          </p>
        </div>

        {/* assistant response */}
        <div className="self-start max-w-[92%]">
          <span className="eyebrow text-ash mb-1 inline-block">AI</span>
          <div className="border border-rule px-3 py-2">
            <p className="text-xs text-ink leading-relaxed">
              Signups are up 18% w/w, activation hit 64%, churn down to 2.1%.
              Onboarding is the biggest driver.
            </p>
          </div>
        </div>

        {/* prompt bar */}
        <div className="mt-1 flex items-center gap-2 border border-rule px-3 py-2">
          <span className="font-mono text-xs text-ash flex-1">Ask anything…</span>
          <CornerDownLeft size={14} strokeWidth={1.5} className="text-accent" />
        </div>
      </div>
    </div>
  );
}

// 4 ── MOBILE APPS → a line-art phone frame ───────────────────────────────────
export function MobileVisual() {
  return (
    <div className="border border-rule bg-paper grid place-items-center py-4">
      <div className="w-[150px] rounded-[1.6rem] border border-ink p-1.5">
        {/* notch */}
        <div className="mx-auto mb-1 h-1 w-10 rounded-full bg-ink/70" />
        <div className="rounded-[1.2rem] border border-rule overflow-hidden">
          {/* status bar */}
          <div className="flex items-center justify-between px-3 pt-1.5 pb-1 border-b border-rule">
            <span className="font-mono text-[9px] text-ink">9:41</span>
            <span className="flex items-center gap-1 text-ash">
              <SignalHigh size={9} strokeWidth={1.5} />
              <Wifi size={9} strokeWidth={1.5} />
              <BatteryMedium size={9} strokeWidth={1.5} />
            </span>
          </div>

          {/* header */}
          <div className="px-3 pt-2">
            <div className="eyebrow text-ash">good morning</div>
            <div className="font-display font-bold text-ink text-sm leading-tight">
              Your Wallet
            </div>
          </div>

          {/* balance */}
          <div className="mx-3 my-2 border border-rule px-2.5 py-2">
            <div className="eyebrow text-ash">balance</div>
            <div className="font-display font-bold text-ink text-base leading-tight">
              $12,480
            </div>
            <div className="flex items-center gap-0.5 font-mono text-[9px] text-ash mt-0.5">
              <ArrowUp size={9} strokeWidth={1.5} /> 3.2% this week
            </div>
          </div>

          {/* rows */}
          <div className="px-3 pb-1">
            {["Transfer", "Payment", "Refund"].map((row, i) => (
              <div
                key={row}
                className="flex items-center gap-2 border-t border-rule py-1.5"
              >
                <span className="grid h-4 w-4 place-items-center border border-rule shrink-0">
                  <ArrowUpRight size={9} strokeWidth={1.5} className="text-ash" />
                </span>
                <span className="font-mono text-[9px] text-ink flex-1">{row}</span>
                <span className="font-mono text-[9px] text-ash">
                  ${(i + 1) * 24}.00
                </span>
              </div>
            ))}
          </div>

          {/* tab bar */}
          <div className="flex items-center justify-around border-t border-rule py-1.5 text-ash">
            <Home size={13} strokeWidth={1.5} className="text-accent" />
            <BarChart3 size={13} strokeWidth={1.5} />
            <Wallet size={13} strokeWidth={1.5} />
            <User size={13} strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </div>
  );
}
