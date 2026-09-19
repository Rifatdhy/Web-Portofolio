"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

const roles = ["Web & App Developer", "Network Engineer", "IT Support"];

export function Hero() {
  const reduce = useReducedMotionSafe();
  const [roleIdx, setRoleIdx] = useState(0);
  const { scrollY } = useScroll();
  const glowY = useTransform(scrollY, [0, 700], [0, 140]);
  const glowOpacity = useTransform(scrollY, [0, 700], [0.6, 0]);

  useEffect(() => {
    if (reduce) return;
    let id: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      if (id === null) {
        id = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 2600);
      }
    };
    const stop = () => {
      if (id !== null) {
        clearInterval(id);
        id = null;
      }
    };

    // Don't rotate while the tab is hidden — the interval would keep
    // scheduling re-renders that nobody can see.
    const onVisibility = () => (document.hidden ? stop() : start());

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduce]);

  const nameWords = ["Rifat", "Dhiya", "Ul Lail"];

  return (
    <section
      id="hero"
      className="relative text-[var(--color-text-primary)] min-h-[100dvh] pt-20 flex flex-col justify-center overflow-hidden"
    >
      {/* Decorative parallax glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {reduce ? (
          <div className="absolute left-1/2 top-1/4 h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-radial-soft opacity-60 blur-3xl" />
        ) : (
          <motion.div
            style={{ y: glowY, x: "-50%", opacity: glowOpacity }}
            className="absolute left-1/2 top-1/4 h-[420px] w-[680px] rounded-full bg-radial-soft blur-3xl"
          />
        )}
      </div>

      <div className="relative max-w-6xl mx-auto px-6 w-full">
        <div className="max-w-4xl">
          {/* Static H1 on purpose: hero content must paint with the HTML
              without waiting for JS animation (LCP). */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02]">
            {nameWords.map((word) => (
              <span key={word} className="inline-block mr-[0.25em]">
                {word}
              </span>
            ))}
          </h1>

          {/* Static role line: the wrapper must paint immediately (the hero
              paragraph below is the LCP element). Only the rotating word
              itself animates. */}
          <div className="mt-6 flex items-center gap-2 font-display text-lg sm:text-2xl text-[var(--color-text-secondary)]">
            <span className="h-px w-8 bg-[var(--color-border-hover)]" />
            <span className="relative inline-flex h-[1.6em] overflow-hidden">
              {reduce ? (
                <span className="inline-block whitespace-nowrap font-medium text-[var(--color-text-primary)]">
                  {roles[0]}
                </span>
              ) : (
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
              )}
            </span>
          </div>

          {/* Static paragraph on purpose: this is the LCP element, so it
              must paint with the HTML without waiting for JS animation. */}
          <p className="text-lg sm:text-xl max-w-xl mt-8 text-[var(--color-text-secondary)]">
            Mahasiswa S1 Teknik Informatika di Jakarta Global University
            dengan latar belakang Teknik Komputer dan Jaringan.
          </p>

          <div className="flex flex-wrap gap-3 mt-12">
            <Link href="/#proyek" className="btn btn-primary">
              Lihat Proyek
            </Link>
            <Link href="/#kontak" className="btn btn-outline">
              Hubungi Saya
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
