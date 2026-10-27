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
      <h2 id="daftar-proyek-heading" className="sr-only">
        Daftar proyek
      </h2>

      <p
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {active === "Semua"
          ? `Menampilkan ${filtered.length} proyek.`
          : `Menampilkan ${filtered.length} proyek dengan filter ${active}.`}
      </p>

      <div
        role="group"
        aria-label="Filter proyek berdasarkan teknologi"
        className="flex flex-wrap gap-2.5 mb-10"
      >
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActive(f)}
            aria-pressed={active === f}
            aria-controls="daftar-proyek"
            className={`filter-pill ${active === f ? "active" : ""}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div id="daftar-proyek" aria-labelledby="daftar-proyek-heading">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted">
              Tidak ada proyek dengan filter tersebut.
            </p>
            <button
              type="button"
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
    </>
  );
}
