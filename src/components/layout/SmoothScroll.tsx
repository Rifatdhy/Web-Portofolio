"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

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

    const start = () => {
      if (cancelled) return;

      // Initialize Lenis with refined inertia momentum physics.
      // Deferred until the browser is idle so lib init + the rAF loop
      // don't compete with hydration and LCP. Native smooth scroll
      // (CSS) covers the gap seamlessly.
      lenis = new Lenis({
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
      (window as unknown as { lenis: Lenis }).lenis = lenis;

      // RAF loop
      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      // Smooth anchor navigation
      const handleAnchorClick = (e: MouseEvent) => {
        const target = (e.target as HTMLElement).closest("a");
        if (!target) return;

        const href = target.getAttribute("href");
        if (href && href.startsWith("#") && href.length > 1) {
          const element = document.querySelector(href);
          if (element) {
            e.preventDefault();
            lenis?.scrollTo(href, {
              offset: -40,
              duration: 1.4,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          }
        }
      };

      document.addEventListener("click", handleAnchorClick, { passive: false });
      removeAnchorListener = () =>
        document.removeEventListener("click", handleAnchorClick);
    };

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(start, { timeout: 2000 });
    } else {
      timeoutId = setTimeout(start, 1200);
    }

    return () => {
      cancelled = true;
      if (idleId !== null) window.cancelIdleCallback(idleId);
      if (timeoutId !== null) clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
      removeAnchorListener?.();
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, [reduce]);

  return <>{children}</>;
}
