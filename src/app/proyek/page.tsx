import { Suspense } from "react";
import { SITE } from "@/lib/constants";
import { projects } from "@/lib/data";
import { buildPageMetadata } from "@/lib/metadata";
import { BackLink } from "@/components/layout/BackLink";
import { ProjectCard } from "@/components/magic/ProjectCard";
import { ProjectFilter } from "./ProjectFilter";

export const metadata = buildPageMetadata({
  title: "Proyek",
  description: `Kumpulan proyek ${SITE.name} — aplikasi web, desktop, dan mobile beserta teknologi yang dipakai.`,
  path: "/proyek",
});

/**
 * Static fallback used while the URL-aware filter hydrates. Keeping the full
 * project grid in the server HTML means the list remains crawlable and usable
 * without JavaScript; the client boundary only adds filtering on top.
 */
function ProjectListFallback() {
  return (
    <div id="daftar-proyek" aria-labelledby="daftar-proyek-heading">
      <h2 id="daftar-proyek-heading" className="sr-only">
        Daftar proyek
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}

export default function ProyekPage() {
  return (
    <div className="pt-20 md:pt-24 pb-24 md:pb-32">
      <div className="max-w-6xl mx-auto px-6">
        <BackLink />
        <div className="mb-12 md:mb-16 flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
            Selected Work
          </span>
          <h1 className="font-display text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight text-balance">
            Semua Proyek.
          </h1>
        </div>

        <Suspense fallback={<ProjectListFallback />}>
          <ProjectFilter />
        </Suspense>
      </div>
    </div>
  );
}
