"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Project } from "@/lib/data";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const reduce = useReducedMotionSafe();

  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      layout
      initial={reduce ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { delay: index * 0.08 } }}
      exit={reduce ? {} : { opacity: 0 }}
      whileHover={reduce ? {} : { y: -4 }}
      className="group project-card relative flex flex-col gap-5 p-6 md:p-8 overflow-hidden"
      aria-label={`Lihat proyek ${project.title} di GitHub`}
    >
      {/* Liquid glass top specular highlight overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-[20px] bg-gradient-to-b from-white/[0.08] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight leading-tight">
          {project.title}
        </h3>
        <ArrowUpRight
          aria-hidden="true"
          weight="bold"
          className="text-xl mt-1 text-muted shrink-0 opacity-0 -translate-x-1 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
        />
      </div>
      <p className="mt-1 leading-relaxed text-sm text-secondary">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.techs.map((tech) => (
          <span key={tech} className="badge border-default bg-surface-alt text-secondary">
            {tech}
          </span>
        ))}
      </div>
    </motion.a>
  );
}
