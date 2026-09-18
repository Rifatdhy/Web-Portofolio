"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

// Module flag: distinguishes the hydration mount (which must render exactly
// like the SSR output) from later client-side navigation mounts. Checking
// sessionStorage alone is not hydration-safe: the server always renders the
// "skip" variant, while a returning visitor's first client render would pick
// the "animate" variant -> React hydration mismatch.
let hasMountedOnce = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotionSafe();
  // Skip the enter animation on full page loads (SSR + hydration) so LCP
  // can paint immediately without waiting for JS animation. Client-side
  // navigations (template remounts with the flag set) still animate.
  const [animateEnter] = useState(() => {
    if (typeof sessionStorage === "undefined") return false;
    if (!hasMountedOnce) {
      hasMountedOnce = true;
      return false;
    }
    return sessionStorage.getItem("rw-enter") !== null;
  });

  useEffect(() => {
    try {
      sessionStorage.setItem("rw-enter", "1");
    } catch {
      // storage unavailable (private mode, blocked cookies) — animation stays skipped
    }
  }, []);

  const skip = reduce || !animateEnter;

  return (
    <motion.div
      initial={skip ? {} : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
