import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react/ssr";
import { BackLink } from "@/components/layout/BackLink";
import { getProjectBySlug, projects } from "@/lib/data";
import { SITE } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/metadata";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return buildPageMetadata({
    title: project.title,
    description: project.description,
    path: `/proyek/${project.slug}`,
  });
}

function projectJsonLd(project: NonNullable<ReturnType<typeof getProjectBySlug>>) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.description,
    codeRepository: project.href,
    image: project.image ? `${SITE.url}${project.image}` : undefined,
    programmingLanguage: project.techs,
    creator: { "@type": "Person", name: SITE.name, url: SITE.url },
    url: `${SITE.url}/proyek/${project.slug}`,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="pt-20 md:pt-24 pb-24 md:pb-32">
      <div className="max-w-4xl mx-auto px-6">
        <BackLink href="/proyek" label="Kembali ke Proyek" />
        <article>
          <header className="mb-10 md:mb-14">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {project.status && <span className="badge badge-category">{project.status}</span>}
              {project.year && <span className="font-mono text-xs text-muted">{project.year}</span>}
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-balance">
              {project.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-secondary">
              {project.description}
            </p>
          </header>

          {project.image && (
            <div className="relative aspect-video overflow-hidden rounded-[22px] border border-white/10 bg-[var(--color-surface-card)] mb-10 md:mb-14">
              <Image
                src={project.image}
                alt={`Pratinjau proyek ${project.title}`}
                fill
                priority
                sizes="(min-width: 1024px) 896px, 100vw"
                className="object-cover"
              />
            </div>
          )}

          <div className="grid md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-4">
              <h2 className="font-display text-2xl font-bold">Ringkasan proyek.</h2>
              <div className="section-divider" />
            </div>
            <div className="md:col-span-8 space-y-8">
              {project.contribution && (
                <section>
                  <h2 className="font-display text-lg font-bold mb-2">Kontribusi</h2>
                  <p className="leading-relaxed text-secondary">{project.contribution}</p>
                </section>
              )}
              <section>
                <h2 className="font-display text-lg font-bold mb-3">Teknologi</h2>
                <div className="flex flex-wrap gap-2">
                  {project.techs.map((tech) => <span key={tech} className="badge">{tech}</span>)}
                </div>
              </section>
              {project.challenge && (
                <section>
                  <h2 className="font-display text-lg font-bold mb-2">Tantangan</h2>
                  <p className="leading-relaxed text-secondary">{project.challenge}</p>
                </section>
              )}
              {project.solution && (
                <section>
                  <h2 className="font-display text-lg font-bold mb-2">Solusi</h2>
                  <p className="leading-relaxed text-secondary">{project.solution}</p>
                </section>
              )}
              {project.highlights && project.highlights.length > 0 && (
                <section>
                  <h2 className="font-display text-lg font-bold mb-2">Highlight</h2>
                  <ul className="list-disc pl-5 space-y-2 leading-relaxed text-secondary">
                    {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                </section>
              )}
              <div className="flex flex-wrap gap-3 pt-2">
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Live Demo <ArrowUpRight aria-hidden="true" weight="bold" />
                    <span className="sr-only"> — dibuka di tab baru</span>
                  </a>
                )}
                <a href={project.href} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  <GithubLogo aria-hidden="true" weight="bold" /> Kode
                  <span className="sr-only"> — dibuka di tab baru</span>
                </a>
              </div>
            </div>
          </div>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project)).replace(/</g, "\\u003c") }} />
        </article>
        <div className="mt-16 pt-8 border-t border-[var(--color-border)]">
          <Link href="/proyek" className="text-sm text-secondary hover:text-[var(--color-text-primary)] transition-colors">
            Lihat semua proyek
          </Link>
        </div>
      </div>
    </div>
  );
}
