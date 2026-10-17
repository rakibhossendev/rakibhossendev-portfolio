import type { ReactNode } from "react"

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  icon?: ReactNode
  centered?: boolean
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  icon,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={["flex flex-col gap-3", centered ? "items-center text-center" : "items-start"].join(" ")}>
      {eyebrow && (
        <div className="flex items-center gap-2">
          {icon && (
            <span className="text-[var(--brand-accent)]" aria-hidden="true">
              {icon}
            </span>
          )}
          <span className="text-sm font-semibold uppercase tracking-widest text-[var(--brand-accent)]">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="text-3xl font-black tracking-tight text-[var(--text-primary)] sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-base text-[var(--text-secondary)] leading-relaxed">
          {description}
        </p>
      )}
      {/* Decorative underline */}
      <div className="mt-1 flex items-center gap-1.5">
        <div className="h-1 w-12 rounded-full bg-[var(--brand-accent)]" />
        <div className="h-1 w-4 rounded-full bg-[var(--brand-accent)] opacity-50" />
        <div className="h-1 w-2 rounded-full bg-[var(--brand-accent)] opacity-25" />
      </div>
    </div>
  )
}
