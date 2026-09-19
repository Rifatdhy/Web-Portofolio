"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

function subscribe(onChange: () => void): () => void {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function readPreference(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Live, SSR-safe reduced-motion flag.
 *
 * NOTE: intentionally NOT based on motion's `useReducedMotion()` — that hook
 * snapshots the preference once in `useState` and never updates, so toggling
 * the OS setting would have no effect until a full page reload. This hook
 * subscribes to the media query directly and re-renders on change.
 *
 * The first client render always returns `false` (matching the SSR output)
 * and re-reads the live value right after hydration, so there is never a
 * hydration mismatch for reduced-motion users.
 */
export function useReducedMotionSafe(): boolean {
  const mountedRef = useRef(false);
  const [, setTick] = useState(0);

  const reduce = useSyncExternalStore(
    subscribe,
    () => (mountedRef.current ? readPreference() : false),
    () => false,
  );

  useEffect(() => {
    mountedRef.current = true;
    // Re-read after hydration (inside rAF, not the effect body) so the
    // first client render stays identical to the SSR HTML.
    const raf = requestAnimationFrame(() => setTick((t) => t + 1));
    return () => {
      mountedRef.current = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  return reduce;
}
