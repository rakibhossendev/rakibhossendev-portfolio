import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Layers,
} from "lucide-react"
import { GithubIcon } from "@/src/components/ui/SocialIcons"
import { TechIcon } from "@/src/components/ui/TechIcon"
import { Readme } from "@/src/components/projects/Readme"
import { ReadmeUnavailable } from "@/src/components/projects/ReadmeUnavailable"
import { projects } from "@/src/data/projects"
import { getAdjacentProjects, getProjectBySlug } from "@/src/lib/projects"
import { getProjectReadme, parseRepo } from "@/src/lib/github"
import { extractHeadings, stripLeadingH1 } from "@/src/lib/markdown"

interface ProjectDetailProps {
  params: Promise<{ slug: string }>
}

/** Pre-renders every project page at build time; unknown slugs 404 on demand. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: ProjectDetailProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: "Project not found" }

  return {
    title: project.title,
    description: project.shortDescription,
    keywords: project.technologies,
    openGraph: {
      type: "article",
      title: project.title,
      description: project.shortDescription,
      images: [{ url: project.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.shortDescription,
    },
  }
}

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const repo = parseRepo(project.githubUrl)
  const readme = await getProjectReadme({
    githubUrl: project.githubUrl,
    readmeUrl: project.readmeUrl,
  })

  const { prev, next } = getAdjacentProjects(slug)

  const readmeReady = readme?.status === "ok" && !!readme.markdown
  const markdown = readmeReady ? stripLeadingH1(readme!.markdown!) : ""
  const headings = readmeReady ? extractHeadings(markdown) : []
  // Deep TOCs get noisy; the reference-style index keeps top two levels.
  const toc = headings.filter((heading) => heading.level <= 3)

  const readmeUrl =
    readme?.htmlUrl ??
    (project.githubUrl
      ? `${project.githubUrl.replace(/\.git$/, "")}/blob/main/README.md`
      : "")

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 font-mono text-xs text-[var(--text-secondary)] sm:text-sm">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--brand-accent)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All projects
        </Link>
        <span aria-hidden="true" className="opacity-30">
          /
        </span>
        <span aria-current="page" className="font-semibold text-[var(--text-primary)]">
          {project.title}
        </span>
      </nav>

      <div className="mt-8 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
        {/* ── Main column ─────────────────────────────────────────── */}
        <div className="min-w-0 lg:col-span-8">
          <header className="border-b border-[var(--border-subtle)] pb-8">
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-3 py-1 text-xs font-semibold text-[var(--text-secondary)] transition-colors hover:border-[var(--border-accent)] hover:text-[var(--brand-accent)]"
                >
                  <TechIcon name={tech} className="h-3 w-3" />
                  {tech}
                </span>
              ))}
            </div>

            <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-[var(--text-primary)] sm:text-4xl md:text-5xl">
              {project.title}
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              {project.shortDescription}
            </p>
          </header>

          {/* Screenshot */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover object-top"
              />
            </div>
          </div>

          {/* README content (or a friendly fallback) */}
          <div className="mt-10">
            {readmeReady && repo ? (
              <Readme markdown={markdown} repo={repo} branch={readme!.branch} />
            ) : (
              <ReadmeUnavailable
                status={readme?.status ?? "not-found"}
                readmeUrl={readmeUrl}
                repoUrl={project.githubUrl}
                description={project.fullDescription}
              />
            )}
          </div>

          {/* Back to projects */}
          <div className="mt-14 border-t border-[var(--border-subtle)] pt-8">
            <Link
              href="/#projects"
              className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-accent)]"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to projects
            </Link>
          </div>

          {/* Previous / next project */}
          <nav aria-label="Project pagination" className="mt-8 grid gap-4 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/projects/${prev.slug}`}
                rel="prev"
                className="group flex flex-col gap-1 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 transition-all hover:border-[var(--border-accent)]"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  <ChevronLeft className="h-3.5 w-3.5" />
                  Previous
                </span>
                <span className="text-sm font-bold text-[var(--text-primary)] transition-colors group-hover:text-[var(--brand-accent)]">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
            {next ? (
              <Link
                href={`/projects/${next.slug}`}
                rel="next"
                className="group flex flex-col items-end gap-1 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 text-right transition-all hover:border-[var(--border-accent)]"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Next
                  <ChevronRight className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-bold text-[var(--text-primary)] transition-colors group-hover:text-[var(--brand-accent)]">
                  {next.title}
                </span>
              </Link>
            ) : null}
          </nav>
        </div>

        {/* ── Sidebar ─────────────────────────────────────────────── */}
        <aside className="flex w-full flex-col gap-6 lg:col-span-4 lg:sticky lg:top-28">
          {/* Project info */}
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6">
            <h2 className="border-b border-[var(--border-subtle)] pb-3 text-xs font-bold uppercase tracking-widest text-[var(--text-primary)]">
              Project Info
            </h2>

            <dl className="mt-4 flex flex-col gap-3 font-mono text-xs text-[var(--text-secondary)]">
              <div className="flex justify-between border-b border-[var(--border-subtle)] pb-2">
                <dt>Repository</dt>
                <dd className="font-semibold text-[var(--text-primary)]">Public</dd>
              </div>
              <div className="flex justify-between border-b border-[var(--border-subtle)] pb-2">
                <dt>README</dt>
                <dd className="font-semibold text-[var(--text-primary)]">
                  {readmeReady ? readme!.branch : "Unavailable"}
                </dd>
              </div>
              <div className="flex justify-between pb-1">
                <dt>Stack</dt>
                <dd className="font-semibold text-[var(--text-primary)]">
                  {project.technologies.length} technologies
                </dd>
              </div>
            </dl>

            <div className="mt-5 flex flex-col gap-2.5">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--brand-accent)] px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-[var(--brand-lighter)] hover:shadow-[0_0_20px_rgba(79,110,247,0.35)]"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Live Preview
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border-subtle)] px-5 py-2.5 text-xs font-bold text-[var(--text-primary)] transition-all hover:border-[var(--border-accent)] hover:text-[var(--brand-accent)]"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  View Repository
                </a>
              )}
              {readmeUrl && readmeReady && (
                <a
                  href={readmeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-accent)]"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  View README on GitHub
                </a>
              )}
            </div>
          </div>

          {/* Documentation index */}
          {toc.length > 0 && (
            <nav
              aria-label="Documentation index"
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6"
            >
              <h2 className="border-b border-[var(--border-subtle)] pb-3 text-xs font-bold uppercase tracking-widest text-[var(--text-primary)]">
                <span className="mr-2 inline-flex align-middle">
                  <Layers className="h-3.5 w-3.5 text-[var(--brand-accent)]" />
                </span>
                Documentation Index
              </h2>
              <ul className="mt-4 max-h-72 space-y-2 overflow-y-auto pr-1 text-xs">
                {toc.map((heading) => (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      className={
                        heading.level === 3
                          ? "block pl-4 leading-normal text-[var(--text-muted)] transition-colors hover:text-[var(--brand-accent)]"
                          : "block leading-normal text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-accent)]"
                      }
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </aside>
      </div>
    </div>
  )
}
