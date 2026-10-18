import type { Skill } from "@/src/types"
import { TechIcon } from "@/src/components/ui/TechIcon"

interface SkillCardProps {
  skill: Skill
}

export function SkillCard({ skill }: SkillCardProps) {
  return (
    <div className="group flex flex-col items-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 text-center card-hover cursor-default">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--bg-secondary)] transition-all duration-300 group-hover:bg-[var(--brand-accent)]/10 group-hover:scale-110">
        <TechIcon name={skill.name} className="h-8 w-8" />
      </div>
      <span className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--brand-accent)] transition-colors">
        {skill.name}
      </span>
    </div>
  )
}
