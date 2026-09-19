import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { ProjectFilter } from "./ProjectFilter";

export const metadata: Metadata = {
  title: `Proyek | ${SITE.name}`,
  description: `Kumpulan proyek ${SITE.name} — aplikasi web, desktop, dan mobile beserta teknologi yang dipakai.`,
  alternates: { canonical: "/proyek" },
};

export default function ProyekPage() {
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

        <ProjectFilter />
      </div>
    </div>
  );
}
