"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, ImageOff } from "lucide-react"
import { GithubIcon } from "@/src/components/ui/SocialIcons"
import type { Project } from "@/src/types"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false)

  const hasLive = !!project.liveUrl
  const hasGithub = !!project.githubUrl

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] transition-all duration-400 ease-out hover:-translate-y-2 hover:border-[var(--border-accent)] hover:shadow-[0_20px_60px_rgba(79,110,247,0.18)] hover:shadow-[var(--brand-accent)]/10">

      {/* Glow overlay on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-inset ring-[var(--brand-accent)]/20 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Project image */}
      <div className="relative h-48 w-full overflow-hidden bg-[var(--bg-secondary)]">
        {!imgError ? (
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--brand)]/30">
            <div className="flex flex-col items-center gap-2 text-[var(--text-muted)]">
              <ImageOff className="h-8 w-8" />
              <span className="text-xs">No image</span>
            </div>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-[var(--bg-card)]/20 to-transparent" />

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute right-3 top-3 rounded-full bg-[var(--brand-accent)]/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            Featured
          </div>
        )}

        {/* Primary tech badge */}
        {project.technologies[0] && (
          <div className="absolute left-3 top-3 rounded-full border border-[var(--border-accent)] bg-[var(--bg-card)]/80 px-2.5 py-1 text-xs font-medium text-[var(--brand-accent)] backdrop-blur-sm">
            {project.technologies[0]}
          </div>
        )}

        {/* Hover quick-action overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-[var(--bg-card)]/80 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {hasLive && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 rounded-lg bg-[var(--brand-accent)] px-4 py-2 text-xs font-bold text-white shadow-lg shadow-[var(--brand-accent)]/30 transition-all hover:brightness-110"
              aria-label={`Live demo for ${project.title}`}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live Demo
            </a>
          )}
          {hasGithub && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 rounded-lg border border-[var(--border-accent)] bg-[var(--bg-card)] px-4 py-2 text-xs font-bold text-[var(--text-primary)] transition-all hover:bg-[var(--bg-card-hover)]"
              aria-label={`GitHub for ${project.title}`}
            >
              <GithubIcon className="h-3.5 w-3.5" />
              GitHub
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="text-base font-bold text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[var(--brand-accent)]">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
            {project.shortDescription}
          </p>
        </div>

        {/* Technologies */}
        {project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-2 py-0.5 text-xs font-medium text-[var(--text-secondary)] transition-colors group-hover:border-[var(--border-accent)]/50"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Action links — visible at bottom */}
        <div className="mt-auto flex items-center gap-2 border-t border-[var(--border-subtle)] pt-4">
          {hasLive ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[var(--brand-accent)] px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-[var(--brand-lighter)] hover:shadow-[0_0_16px_rgba(79,110,247,0.3)]"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live Demo
            </a>
          ) : (
            <span className="flex flex-1 cursor-not-allowed items-center justify-center gap-1.5 rounded-lg border border-[var(--border-subtle)] px-3 py-2 text-xs font-medium text-[var(--text-muted)]">
              <ExternalLink className="h-3.5 w-3.5" />
              No Demo
            </span>
          )}

          {hasGithub ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-white/5 px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] transition-all hover:border-[var(--border-accent)] hover:text-[var(--text-primary)]"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              GitHub
            </a>
          ) : (
            <span className="flex flex-1 cursor-not-allowed items-center justify-center gap-1.5 rounded-lg border border-[var(--border-subtle)] px-3 py-2 text-xs font-medium text-[var(--text-muted)]">
              <GithubIcon className="h-3.5 w-3.5" />
              Private
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
