"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotionSafe();
  // Skip the enter animation on initial page load so LCP can paint
  // immediately without waiting for JS animation. Client-side
  // navigations (template remounts with the flag set) still animate.
  const [animateEnter] = useState(() => {
    if (typeof sessionStorage === "undefined") return false;
    if (sessionStorage.getItem("rw-enter") !== null) return true;
    sessionStorage.setItem("rw-enter", "1");
    return false;
  });

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
