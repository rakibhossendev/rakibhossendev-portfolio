import { AlertTriangle, BookOpen, ExternalLink } from "lucide-react"
import { GithubIcon } from "@/src/components/ui/SocialIcons"
import type { ReadmeStatus } from "@/src/lib/github"

interface ReadmeUnavailableProps {
  status: ReadmeStatus
  /** Direct link to the README on GitHub, shown as the recovery action. */
  readmeUrl: string
  repoUrl?: string
  /** Project metadata used as the visible content while the README is absent. */
  description: string
}

const COPY: Record<Exclude<ReadmeStatus, "ok">, { title: string; body: string }> = {
  "not-found": {
    title: "No README found",
    body: "This repository doesn't have a README.md yet, so there is no generated documentation to show.",
  },
  "rate-limited": {
    title: "GitHub rate limit reached",
    body: "The README couldn't be loaded right now because the unauthenticated GitHub API limit was exceeded. Try again in a few minutes.",
  },
  network: {
    title: "Couldn't reach GitHub",
    body: "Something went wrong while retrieving the README. Check your connection or open it directly on GitHub.",
  },
}

/**
 * Friendly fallback when a README can't be displayed: explains the reason,
 * links to the real README, and still shows the project's own description.
 */
export function ReadmeUnavailable({
  status,
  readmeUrl,
  repoUrl,
  description,
}: ReadmeUnavailableProps) {
  const copy = status === "ok" ? null : COPY[status]

  return (
    <div>
      {copy && (
        <div
          className="flex flex-col gap-3 rounded-2xl border border-[var(--border-accent)]/60 bg-[var(--brand-accent)]/5 p-5 sm:flex-row sm:items-start"
          role="status"
        >
          <AlertTriangle className="h-5 w-5 shrink-0 text-[var(--brand-accent)]" />
          <div>
            <h2 className="text-base font-bold text-[var(--text-primary)]">
              {copy.title}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
              {copy.body}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={readmeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[var(--brand-accent)] px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-[var(--brand-lighter)]"
              >
                <BookOpen className="h-3.5 w-3.5" />
                Open README on GitHub
              </a>
              {repoUrl && (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] transition-all hover:border-[var(--border-accent)] hover:text-[var(--text-primary)]"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  Repository
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <div className={copy ? "mt-8" : undefined}>
        <div className="flex items-center gap-2">
          <GithubIcon
            className="h-4 w-4 text-[var(--brand-accent)]"
            aria-hidden="true"
          />
          <h2 className="text-xl font-bold tracking-tight text-[var(--text-primary)] sm:text-2xl">
            About this project
          </h2>
        </div>
        <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
          {description}
        </p>
      </div>
    </div>
  )
}
