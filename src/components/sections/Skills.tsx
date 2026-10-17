import { Code2 } from "lucide-react"
import { skills } from "@/src/data/skills"
import { SkillCard } from "@/src/components/cards/SkillCard"
import { SectionHeader } from "@/src/components/ui/SectionHeader"
import type { SkillCategory } from "@/src/types"

const categories: SkillCategory[] = [
  "Programming Languages",
  "Frameworks, Libraries & Tools",
  "Databases",
]

export function Skills() {
  return (
    <section id="skills" className="section-padding relative bg-[var(--bg)]">
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

        <div className="mt-12 flex flex-col gap-10">
          {categories.map((category) => {
            const categorySkills = skills.filter((s) => s.category === category)
            if (categorySkills.length === 0) return null

            return (
              <div key={category}>
                {/* Category header */}
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-[var(--border-accent)] to-transparent" />
                  <h3 className="rounded-full border border-[var(--border-accent)] bg-[var(--brand-accent)]/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--brand-accent)]">
                    {category}
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-l from-[var(--border-accent)] to-transparent" />
                </div>

                {/* Skills grid */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {categorySkills.map((skill) => (
                    <SkillCard key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
