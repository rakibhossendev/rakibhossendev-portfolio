import Link from "next/link"
import { SearchX, ArrowLeft, Home } from "lucide-react"

export default function ProjectNotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-xl flex-col items-center justify-center px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--border-accent)] bg-[var(--bg-card)]">
        <SearchX className="h-8 w-8 text-[var(--brand-accent)]" />
      </div>
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
        Project not found
      </h1>
      <p className="mt-3 text-[var(--text-secondary)]">
        This project doesn&apos;t exist or has been renamed. It may live under a
        different slug.
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-accent)] px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--brand-lighter)] hover:shadow-[0_0_20px_rgba(79,110,247,0.3)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition-all hover:border-[var(--border-accent)]"
        >
          <Home className="h-4 w-4" />
          Home
        </Link>
      </div>
    </div>
  )
}
