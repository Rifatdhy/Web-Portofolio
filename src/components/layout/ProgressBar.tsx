"use client";

import { useRef } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

export function ProgressBar() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    ref.current?.setAttribute("aria-valuenow", String(Math.round(v * 100)));
  });

  return (
    <motion.div
      ref={ref}
      id="progress-bar"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      aria-label="Scroll progress"
      className="fixed top-0 left-0 h-[2px] z-[60] pointer-events-none"
      style={{ scaleX: scrollYProgress, background: "var(--color-text-primary)" }}
    />
  );
}
