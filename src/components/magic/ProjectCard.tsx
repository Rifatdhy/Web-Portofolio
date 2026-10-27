"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react";
import { Project } from "@/lib/data";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

interface ProjectCardProps {
  project: Project;
  index: number;
}

function monogram(title: string): string {
  return title
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/[\s._-]+/)
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const reduce = useReducedMotionSafe();

  return (
    <motion.article
      layout={!reduce}
      initial={reduce ? {} : { opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { delay: reduce ? 0 : index * 0.08 },
      }}
      exit={reduce ? {} : { opacity: 0 }}
      whileHover={reduce ? {} : { y: -4 }}
      className="group project-card relative flex flex-col overflow-hidden"
    >
      {/* Liquid glass top specular highlight overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px z-10 rounded-[20px] bg-gradient-to-b from-white/[0.08] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="relative aspect-video overflow-hidden border-b border-white/10 bg-[var(--color-surface)]">
        {project.image ? (
          <>
            <Image
              src={project.image}
              alt={`Pratinjau proyek ${project.title}`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover opacity-90 motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.02]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-surface)]/55 via-transparent to-transparent"
            />
          </>
        ) : (
          <div
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/[0.07] via-transparent to-transparent"
          >
            <span className="font-display text-6xl font-bold tracking-tight text-white/15 select-none">
              {monogram(project.title)}
            </span>
          </div>
        )}
      </div>
      <div className="flex grow flex-col gap-4 p-6 md:p-8">
        <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight leading-tight">
          <Link href={`/proyek/${project.slug}`} className="transition-colors hover:text-[var(--color-text-secondary)]">
            {project.title}
          </Link>
        </h3>
        <p className="leading-relaxed text-sm text-secondary">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.techs.map((tech) => (
            <span key={tech} className="badge">
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Live Demo
              <span className="sr-only">
                {" "}
                — demo {project.title} (dibuka di tab baru)
              </span>
              <ArrowUpRight aria-hidden="true" weight="bold" />
            </a>
          )}
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <GithubLogo aria-hidden="true" weight="bold" />
            Kode
            <span className="sr-only">
              {" "}
              — {project.title} di GitHub (dibuka di tab baru)
            </span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}
