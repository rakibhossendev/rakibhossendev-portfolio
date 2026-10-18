"use client"

import { useState } from "react"
import { FolderOpen, ChevronDown, ChevronUp } from "lucide-react"
import { projects } from "@/src/data/projects"
import { ProjectCard } from "@/src/components/cards/ProjectCard"
import { SectionHeader } from "@/src/components/ui/SectionHeader"
import { Reveal } from "@/src/components/animations/Reveal"

const INITIAL_COUNT = 3

export function Projects() {
  const [showAll, setShowAll] = useState(false)

  const featuredProjects = projects.filter((p) => p.featured).slice(0, INITIAL_COUNT)
  const hasMore = projects.length > INITIAL_COUNT
  const displayedProjects = showAll ? projects : featuredProjects
  const hiddenCount = projects.length - INITIAL_COUNT

  return (
    <section id="projects" className="section-padding relative bg-[var(--bg-secondary)]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border-accent)] to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="My Work"
            title="Featured Projects"
            description="A selection of projects I've built. Each project links to a live demo and GitHub repository when available."
            icon={<FolderOpen className="h-5 w-5" />}
          />
        </Reveal>

        {displayedProjects.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border-subtle)] py-20 text-center">
            <FolderOpen className="h-12 w-12 text-[var(--text-muted)]" />
            <h3 className="mt-4 text-lg font-semibold text-[var(--text-secondary)]">
              No projects yet
            </h3>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Add projects to <code className="text-[var(--brand-accent)]">src/data/projects.ts</code> to display them here.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayedProjects.map((project, i) => (
                <Reveal key={project.id} delay={Math.min(i * 60, 400)}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>

            {hasMore && (
              <Reveal className="mt-10 flex flex-col items-center gap-3">
                <button
                  id="projects-show-more"
                  onClick={() => setShowAll(!showAll)}
                  className="group relative flex items-center gap-2.5 overflow-hidden rounded-xl border border-[var(--border-accent)] bg-[var(--brand-accent)]/5 px-7 py-3.5 text-sm font-bold text-[var(--brand-accent)] transition-all duration-300 hover:bg-[var(--brand-accent)]/12 hover:shadow-[0_0_20px_rgba(79,110,247,0.2)]"
                >
                  {/* Shine effect */}
                  <span className="absolute left-0 top-0 h-full w-0 bg-gradient-to-r from-transparent via-[var(--brand-accent)]/10 to-transparent transition-all duration-500 group-hover:w-full" />

                  {showAll ? (
                    <>
                      Show Less
                      <ChevronUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                    </>
                  ) : (
                    <>
                      Show More Projects
                      <span className="rounded-full bg-[var(--brand-accent)]/20 px-2 py-0.5 text-xs font-semibold">
                        +{hiddenCount}
                      </span>
                      <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                    </>
                  )}
                </button>
                {!showAll && (
                  <p className="text-xs text-[var(--text-muted)]">
                    {hiddenCount} more project{hiddenCount !== 1 ? "s" : ""} hidden
                  </p>
                )}
              </Reveal>
            )}
          </>
        )}
      </div>
    </section>
  )
}
