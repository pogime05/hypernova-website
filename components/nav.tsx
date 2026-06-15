"use client";

import { useState, useEffect, type ComponentType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Globe,
  LayoutDashboard,
  CreditCard,
  Sparkles,
  Smartphone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SubItem = {
  label: string;
  href: string;
  desc: string;
  icon: ComponentType<{ size?: number | string; style?: React.CSSProperties }>;
  color: string;
};

type NavItem = {
  label: string;
  href: string;
  items?: SubItem[];
};

// Mega-menu contents. Every sub-item routes to its parent page for this pass
// (deep-linking to filtered/anchored sections comes in a later content pass).
const workItems: SubItem[] = [
  { label: "Websites", href: "/work?category=website", desc: "Marketing sites & landing pages", icon: Globe, color: "#A855F7" },
  { label: "Apps", href: "/work?category=app", desc: "Web apps, dashboards & SaaS", icon: LayoutDashboard, color: "#00D9FF" },
  { label: "Digital Cards", href: "/work?category=cards", desc: "NFC + QR smart cards", icon: CreditCard, color: "#6C47FF" },
];

const servicesItems: SubItem[] = [
  { label: "Digital Cards", href: "/services#digital-cards", desc: "Tap-to-share smart cards", icon: CreditCard, color: "#6C47FF" },
  { label: "Web Apps", href: "/services#web-apps", desc: "Full-stack platforms & tools", icon: LayoutDashboard, color: "#00D9FF" },
  { label: "AI Services", href: "/services#ai-services", desc: "Chatbots, copilots & RAG", icon: Sparkles, color: "#A855F7" },
  { label: "Mobile Apps", href: "/services#mobile-apps", desc: "iOS & Android, cross-platform", icon: Smartphone, color: "#10B981" },
];

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work", items: workItems },
  { label: "Services", href: "/services", items: servicesItems },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** The shared sliding active-route indicator (one instance via layoutId). */
function ActiveUnderline() {
  return (
    <motion.span
      layoutId="navUnderline"
      className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full"
      style={{ background: "linear-gradient(90deg, #6C47FF, #00D9FF)" }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
    />
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // mobile drawer
  const [openMega, setOpenMega] = useState<string | null>(null); // desktop dropdown
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close every menu whenever the route changes.
  useEffect(() => {
    setOpenMega(null);
    setMenuOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass" : "bg-transparent"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="HyperNova Technologies — home">
            <motion.div
              animate={{
                // Subtle accent halo behind the mark — capped at 6px blur and
                // kept translucent so it never washes out the logo itself.
                filter: [
                  "drop-shadow(0 0 2px rgba(108,71,255,0.35))",
                  "drop-shadow(0 0 6px rgba(108,71,255,0.55))",
                  "drop-shadow(0 0 2px rgba(108,71,255,0.35))",
                ],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" as const }}
            >
              <Image
                src="/logo.png"
                alt="HyperNova Technologies"
                height={44}
                width={44}
                className="h-11 w-11 object-contain opacity-100"
              />
            </motion.div>
            <motion.span
              className="font-orbitron font-bold text-sm md:text-base tracking-wider uppercase"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{
                background:
                  "linear-gradient(90deg, #6C47FF, #00D9FF, #a855f7, #6C47FF)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              HyperNova Technologies
            </motion.span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) =>
              item.items ? (
                <MegaItem
                  key={item.href}
                  item={item}
                  active={isActive(item.href)}
                  open={openMega === item.label}
                  setOpen={(v) => setOpenMega(v ? item.label : null)}
                />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href) ? "text-white" : "text-muted hover:text-white"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && <ActiveUnderline />}
                </Link>
              )
            )}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-accent text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-[#7c5aff] transition-colors shadow-lg shadow-accent/20"
              >
                Start a Project →
              </Link>
            </motion.div>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden text-muted hover:text-primary transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-bg/80 backdrop-blur-md"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="absolute top-20 left-4 right-4 glass-card rounded-2xl p-6 flex flex-col gap-1 max-h-[80vh] overflow-y-auto"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.25 }}
                  className="border-b border-white/[0.06] last:border-0"
                >
                  {item.items ? (
                    <MobileAccordion
                      item={item}
                      active={isActive(item.href)}
                      expanded={mobileExpanded === item.label}
                      toggle={() =>
                        setMobileExpanded((cur) =>
                          cur === item.label ? null : item.label
                        )
                      }
                      onNavigate={() => setMenuOpen(false)}
                    />
                  ) : (
                    <Link
                      href={item.href}
                      className={`block text-lg font-medium py-3 transition-colors ${
                        isActive(item.href) ? "text-accent" : "text-primary hover:text-accent"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                className="pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center w-full bg-accent text-white font-semibold px-5 py-3 rounded-lg hover:bg-[#7c5aff] transition-colors shadow-lg shadow-accent/20"
                >
                  Start a Project →
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- Desktop mega-menu item ---------- */

function MegaItem({
  item,
  active,
  open,
  setOpen,
}: {
  item: NavItem;
  active: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      // Close when keyboard focus leaves the whole group (tabbing out).
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
          (e.target as HTMLElement).blur();
        }
      }}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(!open)}
        className={`relative flex items-center gap-1 text-sm font-medium transition-colors duration-200 ${
          active || open ? "text-white" : "text-muted hover:text-white"
        }`}
      >
        {item.label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
        {active && <ActiveUnderline />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label={item.label}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50"
          >
            <div className="glass-card rounded-2xl p-2 w-[300px] border border-white/10 shadow-2xl shadow-black/50">
              {item.items!.map((sub, i) => {
                const Icon = sub.icon;
                return (
                  <motion.div
                    key={sub.label}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + i * 0.04, duration: 0.2 }}
                  >
                    <Link
                      href={sub.href}
                      role="menuitem"
                      onClick={() => setOpen(false)}
                      className="group/mega flex items-start gap-3 rounded-xl p-3 hover:bg-white/[0.05] transition-colors"
                    >
                      <span
                        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all"
                        style={{
                          background: `${sub.color}18`,
                          border: `1px solid ${sub.color}30`,
                        }}
                      >
                        <Icon size={17} style={{ color: sub.color }} />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-sm font-semibold text-primary group-hover/mega:text-white transition-colors">
                          {sub.label}
                        </span>
                        <span className="text-xs text-muted leading-snug">
                          {sub.desc}
                        </span>
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Mobile accordion item ---------- */

function MobileAccordion({
  item,
  active,
  expanded,
  toggle,
  onNavigate,
}: {
  item: NavItem;
  active: boolean;
  expanded: boolean;
  toggle: () => void;
  onNavigate: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={expanded}
        className={`flex w-full items-center justify-between py-3 text-lg font-medium transition-colors ${
          active ? "text-accent" : "text-primary"
        }`}
      >
        {item.label}
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-1 pb-3 pl-2">
              {item.items!.map((sub) => {
                const Icon = sub.icon;
                return (
                  <Link
                    key={sub.label}
                    href={sub.href}
                    onClick={onNavigate}
                    className="flex items-center gap-3 rounded-lg px-2 py-2 text-muted hover:text-primary hover:bg-white/[0.04] transition-colors"
                  >
                    <Icon size={16} style={{ color: sub.color }} />
                    <span className="text-sm font-medium">{sub.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
