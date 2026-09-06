"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup } from "motion/react";
import { projects } from "@/lib/data";
import { ProjectCard } from "../magic/ProjectCard";
import { Reveal } from "../magic/Reveal";

const allFilters = ["Semua", ...Array.from(new Set(projects.flatMap((p) => p.techs)))];

export function Projects() {
  const [active, setActive] = useState("Semua");

  const filtered =
    active === "Semua"
      ? projects
      : projects.filter((p) => p.techs.includes(active));

  return (
    <section id="proyek" className="pt-20 pb-36 md:pt-24 md:pb-44">
      <div className="max-w-6xl mx-auto px-6">
          <Reveal>
          <div className="mb-12 md:mb-16 flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
              Selected Work
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
              Beberapa yang pernah
              <br />
              saya kerjakan.
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="flex flex-wrap gap-2 mb-10">
            {allFilters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                aria-pressed={active === f}
                className={`badge transition-all duration-200 cursor-pointer ${
                  active === f
                    ? "bg-[var(--color-text-primary)] text-[var(--color-surface)] shadow-sm"
                    : "border-default bg-surface-alt text-secondary hover:text-[var(--color-text-primary)]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted">
              Tidak ada proyek dengan filter tersebut.
            </p>
            <button
              onClick={() => setActive("Semua")}
              className="btn btn-outline mt-6"
            >
              Reset filter
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <LayoutGroup>
              <AnimatePresence>
                {filtered.map((project, i) => (
                  <ProjectCard key={project.title} project={project} index={i} />
                ))}
              </AnimatePresence>
            </LayoutGroup>
          </div>
        )}
      </div>
    </section>
  );
}
