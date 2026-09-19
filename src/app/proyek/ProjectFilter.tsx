"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup } from "motion/react";
import { projects, allTechs } from "@/lib/data";
import { ProjectCard } from "@/components/magic/ProjectCard";

const filters = ["Semua", ...allTechs];

export function ProjectFilter() {
  const [active, setActive] = useState("Semua");

  const filtered =
    active === "Semua"
      ? projects
      : projects.filter((p) => p.techs.includes(active));

  return (
    <>
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
          <button onClick={() => setActive("Semua")} className="btn btn-outline mt-6">
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
    </>
  );
}
