import { experiences } from "@/lib/data";
import { Reveal } from "../magic/Reveal";

export function Experience() {
  return (
    <section id="pengalaman" className="pt-20 pb-36 md:pt-24 md:pb-40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-5">
            <Reveal>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
                Pengalaman.
              </h2>
              <div className="section-divider" />
              <p
                className="text-sm mt-6 leading-relaxed font-mono"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Tempat saya belajar
                <br />
                di luar ruang kelas
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-7">
            <div className="edu-timeline">
              {experiences.map((exp) => (
                <Reveal key={exp.company} className="edu-item">
                  <div className="edu-dot" />
                  <div className="edu-card">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-lg font-bold">
                          {exp.position}
                        </h3>
                        <p
                          className="text-sm font-medium mt-0.5"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          {exp.company}
                          {exp.period ? ` · ${exp.period}` : ""}
                        </p>
                        <p
                          className="text-sm leading-relaxed mt-2"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
