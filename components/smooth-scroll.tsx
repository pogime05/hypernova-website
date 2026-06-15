"use client";

import { ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SCROLL_OFFSET = -90; // clears the fixed nav when jumping to anchors

/**
 * Wraps the app in a Lenis smooth-scroll context.
 * - Respects prefers-reduced-motion (no-ops if the user opts out of motion).
 * - Drives Lenis off GSAP's ticker and feeds its scroll into ScrollTrigger, so
 *   pinned/scrubbed GSAP animations (e.g. the Process deck) stay perfectly in
 *   sync with smooth scrolling.
 * - Routes in-page hash links (including full-path links like
 *   /services#web-apps when already on that route) through Lenis.
 * - Lives in the root layout, so it mounts once and survives route changes;
 *   on navigation it jumps to the hash target if present, else to the top.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;
    // Expose the instance for debugging / programmatic scrolling.
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // Keep ScrollTrigger in lockstep with Lenis, and drive Lenis from the GSAP
    // ticker (the recommended sync — one rAF loop, no drift).
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Route in-page hash clicks through Lenis for smooth jumps.
    function handleAnchorClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement)?.closest(
        "a[href]"
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const raw = anchor.getAttribute("href");
      if (!raw) return;

      let hash = "";
      if (raw.startsWith("#")) {
        hash = raw;
      } else if (raw.includes("#")) {
        // Same-path links carrying a hash (e.g. /services#web-apps while
        // already on /services) — let Lenis handle them in-page.
        try {
          const url = new URL(anchor.href);
          if (url.pathname === window.location.pathname) hash = url.hash;
        } catch {
          /* ignore malformed urls */
        }
      }
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: SCROLL_OFFSET });
    }

    document.addEventListener("click", handleAnchorClick);

    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", ScrollTrigger.update);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  // On navigation, scroll to the hash target if the new URL has one, else top.
  // Wait a couple frames so the new route's DOM (and any pin layout) exists.
  useEffect(() => {
    const lenis = lenisRef.current;
    const hash = window.location.hash;

    const run = () => {
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          if (lenis) lenis.scrollTo(el as HTMLElement, { offset: SCROLL_OFFSET });
          else (el as HTMLElement).scrollIntoView();
          return;
        }
      }
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    };

    // Let the new route's layout settle (fonts / reveals) before measuring,
    // so the hash target lands clear of the fixed nav.
    const id = window.setTimeout(run, 160);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return <>{children}</>;
}
