import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import type { ReactNode } from "react"
import { createSlugger } from "@/src/lib/markdown"
import type { RepoRef } from "@/src/lib/github"

interface ReadmeProps {
  markdown: string
  repo: RepoRef
  branch: string
}

const BLOB_BASE = (repo: RepoRef, branch: string) =>
  `https://github.com/${repo.owner}/${repo.repo}/blob/${branch}/`

const RAW_BASE = (repo: RepoRef, branch: string) =>
  `https://raw.githubusercontent.com/${repo.owner}/${repo.repo}/${branch}/`

function isAbsolute(href: string): boolean {
  return /^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("//")
}

/** Relative → absolute against `base`, never throwing on odd input. */
function resolveUrl(href: string, base: string): string {
  try {
    return new URL(href, base).href
  } catch {
    return base
  }
}

/** `pre > code` blocks get a language badge and horizontal scrolling. */
function CodeBlock({ lang, children }: { lang?: string; children?: ReactNode }) {
  return (
    <div className="md-code-block">
      {lang && <span className="md-code-lang">{lang}</span>}
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  )
}

/**
 * Renders a GitHub README as server-side React (react-markdown builds React
 * elements directly — raw HTML in the markdown is never injected into the
 * page, so no separate sanitization pass is needed).
 *
 * Relative links resolve to the repository's `blob` URLs, relative images to
 * `raw.githubusercontent.com`.
 */
export function Readme({ markdown, repo, branch }: ReadmeProps) {
  // Shared with `extractHeadings` so the table of contents matches the ids
  // rendered here, including duplicate-heading suffixes.
  const slug = createSlugger()

  const blobBase = BLOB_BASE(repo, branch)
  const rawBase = RAW_BASE(repo, branch)

  return (
    <div className="md-article">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // The page already shows the project title as its h1; leftover h1s
          // in the README are demoted. Only h2–h4 allocate TOC ids.
          h1: ({ children }) => <h2 className="md-h2">{children}</h2>,
          h2: ({ children }) => (
            <h2 id={slug(children)} className="md-h2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 id={slug(children)} className="md-h3">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 id={slug(children)} className="md-h4">
              {children}
            </h4>
          ),
          a: ({ href = "", children }) => {
            if (href.startsWith("#")) {
              return (
                <a href={href} className="md-link md-anchor">
                  {children}
                </a>
              )
            }
            const url = isAbsolute(href) ? href : resolveUrl(href, blobBase)
            return (
              <a
                href={url}
                className="md-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            )
          },
          img: ({ src, alt = "" }) => {
            const source = typeof src === "string" ? src : ""
            if (!source) return null
            const label = typeof alt === "string" ? alt : ""
            const url = isAbsolute(source) ? source : resolveUrl(source, rawBase)
            // eslint-disable-next-line @next/next/no-img-element -- README images point at arbitrary repo paths
            return <img src={url} alt={label} loading="lazy" />
          },
          pre: ({ children }) => {
            const child = Array.isArray(children) ? children[0] : children
            const className =
              child && typeof child === "object" && "props" in child
                ? ((child as { props?: { className?: string } }).props?.className ??
                  "")
                : ""
            const lang = /language-([\w+-]+)/.exec(className)?.[1]
            const code =
              child && typeof child === "object" && "props" in child
                ? (child as { props?: { children?: ReactNode } }).props?.children
                : children
            return <CodeBlock lang={lang}>{code}</CodeBlock>
          },
          table: ({ children }) => (
            <div className="md-table-wrap">
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
