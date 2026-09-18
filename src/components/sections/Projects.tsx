import { projects } from "@/lib/data";
import { ProjectCard } from "../magic/ProjectCard";
import { Reveal } from "../magic/Reveal";

export function Projects() {
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

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
