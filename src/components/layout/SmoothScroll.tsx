"use client";

import { useEffect, useRef } from "react";
import type Lenis from "lenis";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

const SCROLL_OFFSET = -40;

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reduce = useReducedMotionSafe();

  useEffect(() => {
    if (reduce) return;

    let lenis: Lenis | null = null;
    let rafId = 0;
    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;
    let removeAnchorListener: (() => void) | undefined;

    const start = async () => {
      if (cancelled) return;

      // Loaded on demand so the Lenis runtime stays out of the initial bundle.
      const { default: LenisCtor } = await import("lenis");
      if (cancelled) return;

      // Initialize Lenis with refined inertia momentum physics.
      // Deferred until the browser is idle so lib init + the rAF loop
      // don't compete with hydration and LCP. Native smooth scroll
      // (CSS) covers the gap seamlessly.
      lenis = new LenisCtor({
        lerp: 0.08,
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.15,
        touchMultiplier: 1.6,
        autoResize: true,
      });

      lenisRef.current = lenis;
      (window as unknown as { lenis?: Lenis }).lenis = lenis;

      // RAF loop
      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      // Smooth anchor navigation (both "#hash" and same-page "/#hash" links)
      const handleAnchorClick = (e: MouseEvent) => {
        // Leave modified clicks and non-primary buttons to the browser.
        if (e.defaultPrevented || e.button !== 0) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        const target = (e.target as HTMLElement | null)?.closest("a");
        if (!target) return;
        if (target.target && target.target !== "_self") return;

        const href = target.getAttribute("href");
        if (!href) return;

        // The skip link must keep native focus + scroll behaviour.
        if (href === "#main-content") return;

        let hash: string | null = null;
        if (href.startsWith("#")) {
          hash = href;
        } else if (href.startsWith("/#") && window.location.pathname === "/") {
          hash = href.slice(1);
        }
        if (!hash || hash.length <= 1) return;

        const element = document.getElementById(hash.slice(1));
        if (!element) return;

        e.preventDefault();
        lenis?.scrollTo(element, {
          offset: SCROLL_OFFSET,
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          onComplete: () => {
            // Anchor clicks update the URL natively; since preventDefault
            // suppressed that, mirror the hash so deep links still work.
            if (window.location.hash !== hash) {
              window.history.pushState(null, "", hash);
            }
          },
        });
      };

      document.addEventListener("click", handleAnchorClick, { passive: false });
      removeAnchorListener = () =>
        document.removeEventListener("click", handleAnchorClick);
    };

    // If the chunk fails to load, fall back to native scrolling.
    const startSafely = () => {
      start().catch(() => undefined);
    };

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(startSafely, { timeout: 2000 });
    } else {
      timeoutId = setTimeout(startSafely, 1200);
    }

    return () => {
      cancelled = true;
      if (idleId !== null) window.cancelIdleCallback(idleId);
      if (timeoutId !== null) clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
      removeAnchorListener?.();
      lenis?.destroy();
      if ((window as unknown as { lenis?: Lenis }).lenis === lenis) {
        delete (window as unknown as { lenis?: Lenis }).lenis;
      }
      lenisRef.current = null;
    };
  }, [reduce]);

  return <>{children}</>;
}
