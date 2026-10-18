/** Placeholder shown while a repository README is being retrieved. */
export function ReadmeSkeleton() {
  return (
    <div className="md-article" aria-busy="true" aria-live="polite">
      <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[var(--border-accent)] border-t-transparent" />
        Loading README from GitHub…
      </div>

      <div className="mt-6 space-y-3">
        <div className="skeleton-bar h-7 w-2/5" />
        <div className="skeleton-bar h-4 w-full" />
        <div className="skeleton-bar h-4 w-11/12" />
        <div className="skeleton-bar h-4 w-3/4" />
      </div>

      <div className="mt-8 space-y-3">
        <div className="skeleton-bar h-5 w-1/3" />
        <div className="skeleton-bar h-4 w-full" />
        <div className="skeleton-bar h-4 w-5/6" />
        <div className="skeleton-bar h-40 w-full rounded-xl" />
      </div>
    </div>
  )
}
