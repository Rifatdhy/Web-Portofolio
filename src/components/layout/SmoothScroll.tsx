"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

const SCROLL_OFFSET = -40;

function getHashTarget(hash: string): HTMLElement | null {
  if (!hash || hash.length <= 1) return null;

  let id = hash.slice(1);
  try {
    id = decodeURIComponent(id);
  } catch {
    // Keep the raw value when the hash contains malformed escapes.
  }

  return id ? document.getElementById(id) : null;
}

/**
 * Move keyboard focus to a hash target without stealing the browser's scroll
 * position. A programmatic tabindex makes non-interactive sections focusable.
 */
function focusHashTarget(hash: string) {
  const element = getHashTarget(hash);
  if (!element) return;

  if (!element.hasAttribute("tabindex")) {
    element.setAttribute("tabindex", "-1");
  }

  element.focus({ preventScroll: true });
}

/** Hash links on this page, including Next's `/#section` form on the home page. */
function hashFromLink(link: HTMLAnchorElement): string | null {
  const href = link.getAttribute("href");
  if (!href) return null;
  if (href.startsWith("#")) return href;
  if (href.startsWith("/#") && window.location.pathname === "/") {
    return href.slice(1);
  }
  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reduce = useReducedMotionSafe();
  const pathname = usePathname();

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
        if (target.hasAttribute("download")) return;

        // The skip link must keep native focus + scroll behaviour.
        const hash = hashFromLink(target);
        if (!hash || hash === "#main-content") return;

        const element = getHashTarget(hash);
        // If Lenis has not loaded yet, leave the click to the browser.
        if (!element || !lenis) return;

        e.preventDefault();
        const destination = hash;
        lenis.scrollTo(element, {
          offset: SCROLL_OFFSET,
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          onComplete: () => {
            // Anchor clicks update the URL natively; since preventDefault
            // suppressed that, mirror the hash so deep links still work.
            if (window.location.hash !== destination) {
              window.history.pushState(null, "", destination);
            }
            focusHashTarget(destination);
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

  // Focus is part of navigation, not an optional smooth-scroll extra: this
  // effect keeps working for reduced motion, deep links, and back/forward.
  useEffect(() => {
    const focusFromLocation = () => focusHashTarget(window.location.hash);

    const handleHashChange = () => {
      // The browser owns scrolling on hash changes; focus after it settles.
      requestAnimationFrame(focusFromLocation);
    };

    const handleHashLinkClick = (event: MouseEvent) => {
      // Next's Link calls preventDefault before the event reaches document,
      // so defaultPrevented is expected here and must not block focus.
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = (event.target as HTMLElement | null)?.closest("a");
      if (!target) return;
      if (target.target && target.target !== "_self") return;
      if (target.hasAttribute("download")) return;

      const hash = hashFromLink(target);
      if (!hash || hash === "#main-content") return;

      // Do not preventDefault: Next's Link or the browser owns navigation.
      // Same-page hash navigation (and Next's pushState) can settle a few
      // frames later, so poll briefly instead of assuming one fixed delay.
      const focusWhenSettled = (attempts: number) => {
        if (window.location.hash === hash) {
          focusHashTarget(hash);
          return;
        }

        if (attempts > 0) {
          window.setTimeout(() => focusWhenSettled(attempts - 1), 50);
        }
      };

      focusWhenSettled(20);
    };

    // Initial deep link and client-side route changes that carry a fragment.
    const rafId = requestAnimationFrame(focusFromLocation);

    window.addEventListener("hashchange", handleHashChange);
    document.addEventListener("click", handleHashLinkClick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("hashchange", handleHashChange);
      document.removeEventListener("click", handleHashLinkClick);
    };
  }, [pathname]);

  return <>{children}</>;
}
