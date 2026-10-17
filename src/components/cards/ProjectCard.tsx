"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, ChevronDown, ChevronUp, ImageOff } from "lucide-react"
import { GithubIcon } from "@/src/components/ui/SocialIcons"
import type { Project } from "@/src/types"
import { cn } from "@/src/lib/utils"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [imgError, setImgError] = useState(false)

  const hasLive = !!project.liveUrl
  const hasGithub = !!project.githubUrl

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] card-hover">
      {/* Project image */}
      <div className="relative h-48 w-full overflow-hidden bg-[var(--bg-secondary)]">
        {!imgError ? (
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-[var(--text-muted)]">
              <ImageOff className="h-8 w-8" />
              <span className="text-xs">No image</span>
            </div>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-60" />

        {/* Tech badge */}
        {project.technologies[0] && (
          <div className="absolute left-3 top-3 rounded-full border border-[var(--border-accent)] bg-[var(--bg-card)]/80 px-2.5 py-1 text-xs font-medium text-[var(--brand-accent)] backdrop-blur-sm">
            {project.technologies[0]}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-accent)] transition-colors">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
            {project.shortDescription}
          </p>
        </div>

        {/* Expanded description */}
        {project.fullDescription !== project.shortDescription && (
          <>
            <div
              className={cn(
                "overflow-hidden transition-all duration-400",
                expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {project.fullDescription}
              </p>
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex w-fit items-center gap-1.5 text-xs font-semibold text-[var(--brand-accent)] hover:underline"
              aria-expanded={expanded}
            >
              {expanded ? (
                <>Show Less <ChevronUp className="h-3 w-3" /></>
              ) : (
                <>Read More <ChevronDown className="h-3 w-3" /></>
              )}
            </button>
          </>
        )}

        {/* Technologies */}
        {project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-2 py-0.5 text-xs font-medium text-[var(--text-secondary)]"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Action links */}
        <div className="mt-auto flex items-center gap-2 pt-2">
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
