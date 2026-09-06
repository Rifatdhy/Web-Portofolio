import type { Metadata } from "next";
import { SITE, SOCIAL } from "@/lib/constants";
import { about, education, experiences, projects, skillCategories } from "@/lib/data";
import {
  WhatsappLogo,
  At,
  FilePdf,
  GithubLogo,
} from "@phosphor-icons/react/ssr";

export const metadata: Metadata = {
  title: `Curriculum Vitae | ${SITE.name}`,
  description: `CV ${SITE.name} — ${SITE.title}. Pendidikan, pengalaman, keahlian, dan proyek.`,
};

export default function CVPage() {
  return (
    <div className="pt-20 md:pt-24 pb-24 md:pb-32">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12 flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
            Resume
          </span>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Curriculum Vitae.
          </h1>
        </div>

        <div
          className="p-8 md:p-10 rounded-lg print:border-none"
          style={{
            background: "var(--color-surface-card)",
            border: "1px solid var(--color-border)",
          }}
        >
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-8" style={{ borderBottom: "1px solid var(--color-border)" }}>
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold">
                {SITE.name}
              </h2>
              <p style={{ color: "var(--color-text-secondary)" }}>
                {SITE.title}
              </p>
            </div>
            <div className="text-sm text-right" style={{ color: "var(--color-text-secondary)" }}>
              <p>Depok, Jawa Barat</p>
              <p>{SITE.email}</p>
              <p>{SITE.phone}</p>
              <p>{SOCIAL.linkedin.replace("https://", "")}</p>
            </div>
          </header>

          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            {[
              { href: SOCIAL.whatsapp, label: "WhatsApp", value: SITE.phone, icon: <WhatsappLogo aria-hidden="true" weight="bold" className="text-lg text-secondary" /> },
              { href: SITE.emailCompose, label: "Email", value: SITE.email, icon: <At aria-hidden="true" weight="bold" className="text-lg text-secondary" /> },
              { href: "/assets/CV Rifat.pdf", label: "Download CV", value: "PDF, Rifat Dhiya Ul Lail", icon: <FilePdf aria-hidden="true" weight="bold" className="text-lg text-secondary" /> },
              { href: SOCIAL.github, label: "GitHub", value: "@Rifatdhy", icon: <GithubLogo aria-hidden="true" weight="bold" className="text-lg text-secondary" /> },
            ].map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="cv-card">
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-display font-semibold">{item.label}</span>
                </div>
                <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>{item.value}</span>
              </a>
            ))}
          </div>

          <section className="mb-8">
            <h3 className="font-display text-lg font-bold mb-3">Ringkasan</h3>
            <p className="leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              {about}
            </p>
          </section>

          <section className="mb-8">
            <h3 className="font-display text-lg font-bold mb-3">Pendidikan</h3>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.school}>
                  <h4 className="font-semibold">{edu.school}</h4>
                  <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                    {edu.degree} · {edu.period}
                  </p>
                  {edu.info && (
                    <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                      {edu.info}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h3 className="font-display text-lg font-bold mb-3">Kemampuan</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {skillCategories.map((cat) => (
                <div key={cat.name}>
                  <p className="font-semibold text-sm mb-1">{cat.name}:</p>
                  <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                    {cat.skills.map((s) => s.name).join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h3 className="font-display text-lg font-bold mb-3">Pengalaman Kerja</h3>
            <div className="space-y-5">
              {experiences.map((exp) => (
                <div key={exp.company}>
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="font-semibold">{exp.position}</h4>
                    <p className="text-sm whitespace-nowrap" style={{ color: "var(--color-text-muted)" }}>
                      {exp.period === "-" ? "Magang" : exp.period}
                    </p>
                  </div>
                  <p className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
                    {exp.company}
                  </p>
                  <p className="text-sm leading-relaxed mt-1" style={{ color: "var(--color-text-secondary)" }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-display text-lg font-bold mb-3">Project</h3>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.title}>
                  <h4 className="font-semibold">
                    {project.title}
                    <span className="font-mono text-xs font-normal" style={{ color: "var(--color-text-muted)" }}>
                      {"  "}
                      ({project.techs.join(", ")})
                    </span>
                  </h4>
                  <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}