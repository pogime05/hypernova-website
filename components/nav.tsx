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
  icon: ComponentType<{ size?: number | string; className?: string }>;
};

type NavItem = {
  label: string;
  href: string;
  items?: SubItem[];
};

// Mega-menu contents.
const workItems: SubItem[] = [
  { label: "Websites", href: "/work?category=website", desc: "Marketing sites & landing pages", icon: Globe },
  { label: "Apps", href: "/work?category=app", desc: "Web apps, dashboards & SaaS", icon: LayoutDashboard },
  { label: "Digital Cards", href: "/work?category=cards", desc: "NFC + QR smart cards", icon: CreditCard },
];

const servicesItems: SubItem[] = [
  { label: "Digital Cards", href: "/services#digital-cards", desc: "Tap-to-share smart cards", icon: CreditCard },
  { label: "Web Apps", href: "/services#web-apps", desc: "Full-stack platforms & tools", icon: LayoutDashboard },
  { label: "AI Services", href: "/services#ai-services", desc: "Chatbots, copilots & RAG", icon: Sparkles },
  { label: "Mobile Apps", href: "/services#mobile-apps", desc: "iOS & Android, cross-platform", icon: Smartphone },
];

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work", items: workItems },
  { label: "Services", href: "/services", items: servicesItems },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Shared sliding active-route indicator (one instance via layoutId). */
function ActiveUnderline() {
  return (
    <motion.span
      layoutId="navUnderline"
      className="absolute -bottom-1.5 left-0 right-0 h-px bg-accent"
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
    />
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0); // scroll-progress bar (0–1)
  const [menuOpen, setMenuOpen] = useState(false); // mobile drawer
  const [openMega, setOpenMega] = useState<string | null>(null); // desktop dropdown
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(1, Math.max(0, y / h)) : 0);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [pathname]);

  useEffect(() => {
    setOpenMega(null);
    setMenuOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Scroll-progress bar — thin accent line at the very top edge. */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-accent origin-left will-change-transform"
        style={{ transform: `scaleX(${progress})` }}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled || menuOpen
            ? "bg-paper border-b border-rule"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-8xl mx-auto px-6 md:px-10 h-[68px] flex items-center justify-between">
          {/* Logo + wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="HyperNova Technologies — home"
          >
            <Image
              src="/logo.png"
              alt="HyperNova Technologies"
              height={34}
              width={34}
              className="h-[34px] w-[34px] object-contain"
            />
            <span className="font-orbitron font-bold text-[13px] md:text-sm tracking-[0.12em] uppercase text-ink">
              HyperNova Technologies
            </span>
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
                  className={`group relative text-sm transition-colors duration-200 ${
                    isActive(item.href) ? "text-ink font-medium" : "text-ash hover:text-ink"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) ? (
                    <ActiveUnderline />
                  ) : (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-px bg-ink origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
                  )}
                </Link>
              )
            )}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-ink text-paper text-sm font-medium px-5 py-2.5 hover:bg-accent transition-colors"
            >
              Start a project
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden text-ink"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 top-[68px] z-40 md:hidden bg-paper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-6 py-4 flex flex-col max-h-[calc(100vh-68px)] overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.href} className="border-b border-rule">
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
                      className={`block text-lg py-4 transition-colors ${
                        isActive(item.href) ? "text-accent font-medium" : "text-ink"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="mt-6 flex items-center justify-center w-full bg-ink text-paper font-medium px-5 py-3.5 hover:bg-accent transition-colors"
              >
                Start a project →
              </Link>
            </div>
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
        className={`group relative flex items-center gap-1 text-sm transition-colors duration-200 ${
          active || open ? "text-ink font-medium" : "text-ash hover:text-ink"
        }`}
      >
        {item.label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
        {active ? (
          <ActiveUnderline />
        ) : (
          <span className="absolute -bottom-1.5 left-0 right-[18px] h-px bg-ink origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label={item.label}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50"
          >
            <div className="w-[320px] bg-paper border border-rule">
              {item.items!.map((sub) => {
                const Icon = sub.icon;
                return (
                  <Link
                    key={sub.label}
                    href={sub.href}
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className="group/mega flex items-start gap-3 p-4 border-b border-rule last:border-0 hover:bg-ink/[0.03] transition-colors"
                  >
                    <Icon
                      size={18}
                      className="mt-0.5 shrink-0 text-ash group-hover/mega:text-accent transition-colors"
                    />
                    <span className="flex flex-col">
                      <span className="text-sm font-medium text-ink">
                        {sub.label}
                      </span>
                      <span className="text-xs text-ash leading-snug mt-0.5">
                        {sub.desc}
                      </span>
                    </span>
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
        className={`flex w-full items-center justify-between py-4 text-lg transition-colors ${
          active ? "text-accent font-medium" : "text-ink"
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
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col pb-2">
              {item.items!.map((sub) => {
                const Icon = sub.icon;
                return (
                  <Link
                    key={sub.label}
                    href={sub.href}
                    onClick={onNavigate}
                    className="flex items-center gap-3 py-2.5 pl-1 text-ash hover:text-ink transition-colors"
                  >
                    <Icon size={16} />
                    <span className="text-sm">{sub.label}</span>
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
