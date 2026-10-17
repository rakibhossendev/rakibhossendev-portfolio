"use client"

import { useState } from "react"
import { FolderOpen, ChevronDown, ChevronUp } from "lucide-react"
import { projects } from "@/src/data/projects"
import { ProjectCard } from "@/src/components/cards/ProjectCard"
import { SectionHeader } from "@/src/components/ui/SectionHeader"

const FEATURED_COUNT = 3

export function Projects() {
  const [showAll, setShowAll] = useState(false)

  const featuredProjects = projects.filter((p) => p.featured).slice(0, FEATURED_COUNT)
  const allProjects = projects
  const hasMore = allProjects.length > FEATURED_COUNT
  const displayedProjects = showAll ? allProjects : featuredProjects

  return (
    <section id="projects" className="section-padding relative bg-[var(--bg-secondary)]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border-accent)] to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="My Work"
          title="Featured Projects"
          description="A selection of projects I've built. Each project links to a live demo and GitHub repository when available."
          icon={<FolderOpen className="h-5 w-5" />}
        />

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
              {displayedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {hasMore && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="group flex items-center gap-2 rounded-xl border border-[var(--border-accent)] bg-[var(--brand-accent)]/5 px-6 py-3 text-sm font-semibold text-[var(--brand-accent)] transition-all duration-200 hover:bg-[var(--brand-accent)]/10"
                >
                  {showAll ? (
                    <>
                      Show Less
                      <ChevronUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                    </>
                  ) : (
                    <>
                      View All Projects ({allProjects.length})
                      <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
