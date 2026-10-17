import Link from "next/link"
import { Home, AlertTriangle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg)] px-4 text-center">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="relative flex flex-col items-center gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[var(--border-accent)] bg-[var(--bg-card)]">
          <AlertTriangle className="h-10 w-10 text-[var(--brand-accent)]" />
        </div>
        <div>
          <h1 className="text-7xl font-black text-shimmer">404</h1>
          <p className="mt-2 text-xl font-semibold text-[var(--text-primary)]">
            Page not found
          </p>
          <p className="mt-2 text-[var(--text-secondary)]">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl bg-[var(--brand-accent)] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--brand-lighter)] hover:shadow-[0_0_20px_rgba(79,110,247,0.3)]"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
