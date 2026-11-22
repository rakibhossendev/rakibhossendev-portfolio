"use client"

import { useCallback, useRef } from "react"
import type { ReactNode } from "react"
import { Trophy, Users } from "lucide-react"
import type { Achievement } from "@/src/types"

/** Icon keys are stored as plain strings in src/data/achievements.ts. */
const ICONS: Record<string, ReactNode> = {
  trophy: <Trophy className="h-5 w-5" />,
  users: <Users className="h-5 w-5" />,
}

interface AchievementCardProps {
  achievement: Achievement
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  // The role usually duplicates the badge pill — skip it to avoid showing it twice.
  const showRole = !!achievement.role && achievement.role !== achievement.badge
  const locationLine = [achievement.location, achievement.year].filter(Boolean).join(" · ")

  const glowRef = useRef<HTMLDivElement>(null)

  // Reference-style radial spotlight that tracks the pointer inside the card
  // (same as ProjectCard / Contact).
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
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[var(--border-accent)] hover:shadow-[0_24px_60px_rgba(79,110,247,0.16)] sm:p-7"
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

      <div className="relative z-20 flex flex-col gap-4">
        {/* Icon box */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--brand-accent)] transition-all duration-300 group-hover:border-[var(--border-accent)] group-hover:scale-105">
          {ICONS[achievement.icon] ?? ICONS.trophy}
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[var(--brand-accent)]">
            {achievement.title}
          </h3>

          {/* Meta lines render only when the data exists */}
          {(showRole || achievement.institution || locationLine) && (
            <div className="flex flex-col gap-1 text-sm leading-relaxed">
              {showRole && (
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-accent)]">
                  {achievement.role}
                </span>
              )}
              {achievement.institution && (
                <span className="text-[var(--text-secondary)]">{achievement.institution}</span>
              )}
              {locationLine && (
                <span className="text-xs text-[var(--text-muted)]">{locationLine}</span>
              )}
            </div>
          )}

          <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            {achievement.description}
          </p>
        </div>

        {/* Badge pill (placement / role) */}
        <div className="flex">
          <span className="rounded-full border border-[var(--border-accent)] bg-[var(--brand-accent)]/10 px-3 py-1 text-xs font-bold text-[var(--brand-accent)]">
            {achievement.badge}
          </span>
        </div>
      </div>
    </article>
  )
}
