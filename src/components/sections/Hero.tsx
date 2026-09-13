"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

const roles = ["Web & App Developer", "Network Engineer", "IT Support"];

export function Hero() {
  const reduce = useReducedMotionSafe();
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, []);

  const nameWords = ["Rifat", "Dhiya", "Ul Lail"];

  return (
    <section
      id="hero"
      className="relative text-[var(--color-text-primary)] min-h-[100dvh] pt-20 flex flex-col justify-center overflow-hidden"
    >
      {/* Decorative parallax glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-radial-soft opacity-60 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 w-full">
        <div className="max-w-4xl">
          {/* Static H1 on purpose: the hero heading is the LCP element,
              so it must paint without waiting for JS animation. */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02]">
            {nameWords.map((word) => (
              <span key={word} className="inline-block mr-[0.25em]">
                {word}
              </span>
            ))}
          </h1>

          <motion.div
            className="mt-6 flex items-center gap-2 font-display text-lg sm:text-2xl text-[var(--color-text-secondary)]"
            initial={reduce ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            <span className="h-px w-8 bg-[var(--color-border-hover)]" />
            <span className="relative inline-flex h-[1.6em] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roles[roleIdx]}
                  className="inline-block whitespace-nowrap font-medium text-[var(--color-text-primary)]"
                  initial={{ opacity: 0, y: "80%" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: "-80%" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {roles[roleIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          <motion.p
            className="text-lg sm:text-xl max-w-xl mt-8 text-[var(--color-text-secondary)]"
            initial={reduce ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Mahasiswa S1 Teknik Informatika di Jakarta Global University
            dengan latar belakang Teknik Komputer dan Jaringan.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3 mt-12"
            initial={reduce ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/#proyek" className="btn btn-primary">
              Lihat Proyek
            </Link>
            <Link href="/#kontak" className="btn btn-outline">
              Hubungi Saya
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
