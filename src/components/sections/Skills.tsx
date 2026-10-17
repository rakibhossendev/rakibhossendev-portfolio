"use client"

import { useState } from "react"
import { Code2 } from "lucide-react"
import { skills } from "@/src/data/skills"
import { SkillCard } from "@/src/components/cards/SkillCard"
import { SectionHeader } from "@/src/components/ui/SectionHeader"
import type { SkillCategory } from "@/src/types"
import { cn } from "@/src/lib/utils"

const categories: SkillCategory[] = [
  "Programming Languages",
  "Frameworks, Libraries & Tools",
  "Databases",
]

const categoryIcons: Record<SkillCategory, string> = {
  "Programming Languages": "</>",
  "Frameworks, Libraries & Tools": "⚡",
  "Databases": "🗄️",
}

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "All">("All")

  const displayedSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory)

  const tabs: Array<SkillCategory | "All"> = ["All", ...categories]

  return (
    <section id="skills" className="section-padding relative bg-[var(--bg-secondary)]">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute right-0 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[var(--brand-accent)] opacity-[0.03] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Technical Skills"
          title="My Tech Stack"
          description="Technologies I work with to build full-stack applications"
          icon={<Code2 className="h-5 w-5" />}
        />

        {/* Category Tabs Toggle */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {tabs.map((tab) => {
            const isActive = activeCategory === tab
            return (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className={cn(
                  "relative flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-300",
                  isActive
                    ? "border-[var(--border-accent)] bg-[var(--brand-accent)]/15 text-[var(--brand-accent)] shadow-[0_0_16px_rgba(79,110,247,0.2)]"
                    : "border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[var(--border-accent)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]"
                )}
                aria-pressed={isActive}
              >
                {tab !== "All" && (
                  <span className="text-xs opacity-75">{categoryIcons[tab as SkillCategory]}</span>
                )}
                {tab === "All" ? "All Skills" : tab}
                <span
                  className={cn(
                    "ml-1 rounded-full px-1.5 py-0.5 text-xs",
                    isActive
                      ? "bg-[var(--brand-accent)]/20 text-[var(--brand-accent)]"
                      : "bg-[var(--bg-secondary)] text-[var(--text-muted)]"
                  )}
                >
                  {tab === "All"
                    ? skills.length
                    : skills.filter((s) => s.category === tab).length}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-[var(--brand-accent)]" />
                )}
              </button>
            )
          })}
        </div>

        {/* Skills Grid */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {displayedSkills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>

        {/* Category count footer */}
        {activeCategory !== "All" && (
          <p className="mt-6 text-center text-xs text-[var(--text-muted)]">
            Showing{" "}
            <span className="text-[var(--brand-accent)]">{activeCategory}</span> —{" "}
            {displayedSkills.length} skill{displayedSkills.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>
    </section>
  )
}
