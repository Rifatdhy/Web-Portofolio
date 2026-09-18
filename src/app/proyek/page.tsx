"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup } from "motion/react";
import { projects, allTechs } from "@/lib/data";
import { ProjectCard } from "@/components/magic/ProjectCard";

const filters = ["Semua", ...allTechs];

export default function ProyekPage() {
  const [active, setActive] = useState("Semua");

  const filtered =
    active === "Semua"
      ? projects
      : projects.filter((p) => p.techs.includes(active));

  return (
    <div className="pt-20 md:pt-24 pb-24 md:pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 md:mb-16 flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
            Selected Work
          </span>
          <h1 className="font-display text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight text-balance">
            Semua Proyek.
          </h1>
        </div>

        <div className="flex flex-wrap gap-2.5 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              aria-pressed={active === f}
              className={`filter-pill ${active === f ? "active" : ""}`}
            >
              {f}
            </button>
          ))}
        </div>

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
    </div>
  );
}