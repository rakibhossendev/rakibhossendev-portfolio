export interface MarkdownHeading {
  level: number
  text: string
  id: string
}

/**
 * Single slug function used for heading anchors *and* the table of contents,
 * so in-page links always match the ids rendered in the article.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/<[^>]+>/g, "") // leftover HTML in the raw markdown line
    .replace(/[^\p{L}\p{N}\p{M}\s-]/gu, "")
    .trim() // dropped chars (e.g. an emoji) can leave stray spaces
    .replace(/\s+/g, "-")
}

/** Removes markdown syntax from a heading line so its plain text remains. */
function stripInlineMarkdown(text: string): string {
  return text
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1") // images -> alt text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links -> label
    .replace(/`([^`]*)`/g, "$1") // inline code
    .replace(/(\*\*|__)(.*?)\1/g, "$2") // bold
    .replace(/(\*|_)(.*?)\1/g, "$2") // emphasis
    .replace(/<[^>]+>/g, "") // inline HTML
    .trim()
}

/**
 * Pulls `##`–`####` headings out of a README, skipping fenced code blocks.
 * Ids are deduplicated in document order (`heading`, `heading-1`, ...).
 */
export function extractHeadings(markdown: string): MarkdownHeading[] {
  const headings: MarkdownHeading[] = []
  const seen = new Map<string, number>()
  let inFence = false

  for (const line of markdown.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence) continue

    const match = /^(#{1,6})\s+(.*)$/.exec(line)
    if (!match) continue

    const level = match[1].length
    if (level < 2 || level > 4) continue

    const text = stripInlineMarkdown(match[2])
    if (!text) continue

    const base = slugify(text) || "section"
    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)
    const id = count === 0 ? base : `${base}-${count}`

    headings.push({ level, text, id })
  }

  return headings
}

/**
 * Matches `extractHeadings` ids at render time: walks React children and joins
 * their text, which yields the same string as `stripInlineMarkdown` for the
 * raw line (formatting markup is gone by the time React renders it).
 */
export function nodeText(node: unknown): string {
  if (node === null || node === undefined || typeof node === "boolean") return ""
  if (typeof node === "string") return node
  if (typeof node === "number" || typeof node === "bigint") return String(node)
  if (Array.isArray(node)) return node.map(nodeText).join("")
  if (typeof node === "object" && "props" in node) {
    const el = node as { props?: { children?: unknown } }
    return nodeText(el.props?.children)
  }
  return ""
}

/** Stateful dedupe helper mirroring `extractHeadings`' id allocation. */
export function createSlugger(): (node: unknown) => string {
  const seen = new Map<string, number>()
  return (node: unknown) => {
    const base = slugify(nodeText(node)) || "section"
    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)
    return count === 0 ? base : `${base}-${count}`
  }
}

/**
 * The page already renders the project title as its `h1`, so drop a leading
 * `# ...` line from the README before rendering it (titles like
 * "# Project Name: X" would otherwise duplicate the page heading).
 */
export function stripLeadingH1(markdown: string): string {
  const lines = markdown.split("\n")

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue
    if (/^#\s+/.test(line)) {
      lines.splice(i, 1)
      // Drop the blank line that followed the heading, if any.
      if (lines[i]?.trim() === "") lines.splice(i, 1)
      return lines.join("\n")
    }
    break // only inspect the first non-empty line
  }
  return markdown
}
