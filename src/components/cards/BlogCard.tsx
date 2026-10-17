import Image from "next/image"
import { Calendar, ArrowUpRight, Tag } from "lucide-react"
import type { Blog } from "@/src/types"
import { formatDate } from "@/src/lib/utils"

interface BlogCardProps {
  blog: Blog
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] card-hover">
      {/* Cover image */}
      {blog.coverImage && (
        <div className="relative h-44 w-full overflow-hidden bg-[var(--bg-secondary)]">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-50" />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {blog.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 rounded-md border border-[var(--border-accent)] bg-[var(--brand-accent)]/5 px-2 py-0.5 text-xs font-medium text-[var(--brand-accent)]"
              >
                <Tag className="h-2.5 w-2.5" />
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3 className="text-base font-bold leading-snug text-[var(--text-primary)] group-hover:text-[var(--brand-accent)] transition-colors">
          {blog.title}
        </h3>

        <p className="text-sm leading-relaxed text-[var(--text-secondary)] line-clamp-3">
          {blog.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <Calendar className="h-3 w-3" />
            {formatDate(blog.publishedAt)}
          </span>
          <a
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-semibold text-[var(--brand-accent)] hover:underline"
          >
            Read Article
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </article>
  )
}
