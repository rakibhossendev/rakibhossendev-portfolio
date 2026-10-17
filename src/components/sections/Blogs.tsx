import { BookOpen, PenLine } from "lucide-react"
import { blogs } from "@/src/data/blogs"
import { BlogCard } from "@/src/components/cards/BlogCard"
import { SectionHeader } from "@/src/components/ui/SectionHeader"

export function Blogs() {
  return (
    <section id="blogs" className="section-padding relative bg-[var(--bg)]">
      <div className="absolute inset-0 bg-grid opacity-10" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Writing"
          title="Blog & Articles"
          description="Thoughts on development, technology, and best practices"
          icon={<BookOpen className="h-5 w-5" />}
        />

        {blogs.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border-subtle)] py-20 text-center">
            <PenLine className="h-12 w-12 text-[var(--text-muted)]" />
            <h3 className="mt-4 text-lg font-semibold text-[var(--text-secondary)]">
              Articles coming soon
            </h3>
            <p className="mt-2 max-w-md text-sm text-[var(--text-muted)]">
              I&apos;m working on some articles. Add blog entries to{" "}
              <code className="text-[var(--brand-accent)]">src/data/blogs.ts</code> when ready.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
