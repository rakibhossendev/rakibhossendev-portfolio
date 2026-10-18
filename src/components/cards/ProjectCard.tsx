"use client"

import { useCallback, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ExternalLink, ImageOff } from "lucide-react"
import { GithubIcon } from "@/src/components/ui/SocialIcons"
import { TechIcon } from "@/src/components/ui/TechIcon"
import type { Project } from "@/src/types"

interface ProjectCardProps {
  project: Project
}

/** Tags beyond this count collapse into a "+N" chip so rows stay even. */
const MAX_VISIBLE_TAGS = 4

export function ProjectCard({ project }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false)
  const glowRef = useRef<HTMLDivElement>(null)

  const hasLive = !!project.liveUrl
  const hasGithub = !!project.githubUrl
  const visibleTags = project.technologies.slice(0, MAX_VISIBLE_TAGS)
  const extraTags = project.technologies.length - visibleTags.length

  // Reference-style radial spotlight that tracks the pointer inside the card.
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const glow = glowRef.current
    if (!glow) return
    const rect = e.currentTarget.getBoundingClientRect()
    glow.style.setProperty("--x", `${e.clientX - rect.left}px`)
    glow.style.setProperty("--y", `${e.clientY - rect.top}px`)
  }, [])

  return (
    <article
      onMouseMove={handleMouseMove}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[var(--border-accent)] hover:shadow-[0_24px_60px_rgba(79,110,247,0.16)]"
    >
      {/* Pointer spotlight */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgba(79, 110, 247, 0.14), transparent 65%)",
        }}
      />

      {/* Project image */}
      <div className="relative h-44 w-full shrink-0 overflow-hidden bg-[var(--bg-secondary)] sm:h-48">
        {!imgError ? (
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
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
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-[var(--bg-card)]/25 to-transparent" />

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute right-3 top-3 rounded-full bg-[var(--brand-accent)]/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            Featured
          </div>
        )}

        {/* Primary tech badge */}
        {project.technologies[0] && (
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-[var(--border-accent)] bg-[var(--bg-card)]/85 px-2.5 py-1 text-xs font-medium text-[var(--brand-accent)] backdrop-blur-sm">
            <TechIcon name={project.technologies[0]} className="h-3.5 w-3.5" />
            {project.technologies[0]}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="text-base font-bold leading-snug text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[var(--brand-accent)]">
            {project.title}
          </h3>
          {/* Card copy stays at 2–3 lines — the README carries the full story. */}
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--text-secondary)]">
            {project.shortDescription}
          </p>
        </div>

        {/* Technologies */}
        {project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {visibleTags.map((tech) => (
              <span
                key={tech}
                className="flex items-center gap-1.5 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-2 py-0.5 text-xs font-medium text-[var(--text-secondary)] transition-colors group-hover:border-[var(--border-accent)]/50"
              >
                <TechIcon name={tech} className="h-3 w-3" />
                {tech}
              </span>
            ))}
            {extraTags > 0 && (
              <span className="flex items-center rounded-md border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-2 py-0.5 text-xs font-medium text-[var(--text-muted)]">
                +{extraTags}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="mt-auto flex items-center gap-2 border-t border-[var(--border-subtle)] pt-4">
          <Link
            href={`/projects/${project.slug}`}
            data-cursor-label="View"
            className="group/more flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[var(--brand-accent)] px-3 py-2 text-xs font-bold text-white transition-all hover:bg-[var(--brand-lighter)] hover:shadow-[0_0_16px_rgba(79,110,247,0.35)]"
          >
            View Details
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/more:translate-x-0.5" />
          </Link>

          {hasLive && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`Live demo of ${project.title}`}
              aria-label={`Live demo of ${project.title}`}
              className="flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] transition-all hover:border-[var(--border-accent)] hover:text-[var(--text-primary)]"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Demo
            </a>
          )}

          {hasGithub && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`${project.title} source code`}
              aria-label={`${project.title} source code on GitHub`}
              className="flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] transition-all hover:border-[var(--border-accent)] hover:text-[var(--text-primary)]"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              Code
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
