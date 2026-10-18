/** Route-level fallback while a project page (and its README) resolves. */
export default function ProjectLoading() {
  return (
    <div
      className="mx-auto w-full max-w-7xl animate-pulse px-4 pb-20 sm:px-6 lg:px-8"
      role="status"
      aria-label="Loading project"
    >
      {/* Breadcrumb */}
      <div className="skeleton-bar h-4 w-40" />

      <div className="mt-8 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-8">
          {/* Header */}
          <div className="border-b border-[var(--border-subtle)] pb-8">
            <div className="flex flex-wrap gap-1.5">
              <div className="skeleton-bar h-6 w-20 rounded-full" />
              <div className="skeleton-bar h-6 w-24 rounded-full" />
              <div className="skeleton-bar h-6 w-16 rounded-full" />
            </div>
            <div className="skeleton-bar mt-5 h-10 w-3/5 rounded-lg" />
            <div className="mt-5 space-y-2.5">
              <div className="skeleton-bar h-4 w-full" />
              <div className="skeleton-bar h-4 w-4/5" />
            </div>
          </div>

          {/* Screenshot */}
          <div className="skeleton-bar mt-8 aspect-[16/10] w-full rounded-2xl" />

          {/* README */}
          <div className="mt-10 space-y-3">
            <div className="skeleton-bar h-7 w-2/5" />
            <div className="skeleton-bar h-4 w-full" />
            <div className="skeleton-bar h-4 w-11/12" />
            <div className="skeleton-bar h-4 w-3/4" />
            <div className="skeleton-bar mt-6 h-5 w-1/3" />
            <div className="skeleton-bar h-40 w-full rounded-xl" />
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6 lg:col-span-4">
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6">
            <div className="skeleton-bar h-4 w-28" />
            <div className="mt-5 space-y-3">
              <div className="skeleton-bar h-3.5 w-full" />
              <div className="skeleton-bar h-3.5 w-full" />
              <div className="skeleton-bar h-3.5 w-2/3" />
            </div>
            <div className="mt-5 space-y-2.5">
              <div className="skeleton-bar h-9 w-full rounded-xl" />
              <div className="skeleton-bar h-9 w-full rounded-xl" />
            </div>
          </div>
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6">
            <div className="skeleton-bar h-4 w-36" />
            <div className="mt-4 space-y-2.5">
              <div className="skeleton-bar h-3 w-full" />
              <div className="skeleton-bar h-3 w-5/6" />
              <div className="skeleton-bar h-3 w-4/6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
