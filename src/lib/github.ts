/**
 * Server-side README access.
 *
 * Everything in this module runs in Server Components only — the optional
 * `GITHUB_TOKEN` never reaches the browser. Responses are cached by Next's
 * fetch cache and revalidated hourly.
 *
 * Strategy: read the README from the public raw endpoint first (no rate
 * limit), and fall back to the GitHub API (which is rate limited to 60
 * unauthenticated requests/hour). The default branch is discovered from the
 * repository API instead of assuming `main`.
 */

const GITHUB_API = "https://api.github.com"
const RAW_HOST = "https://raw.githubusercontent.com"
const REVALIDATE_SECONDS = 3600

export interface RepoRef {
  owner: string
  repo: string
}

export type ReadmeStatus = "ok" | "not-found" | "rate-limited" | "network"

export interface ReadmeResult {
  status: ReadmeStatus
  /** Markdown source when `status === "ok"`. */
  markdown?: string
  /** Branch the README was read from (best effort when unknown). */
  branch: string
  /** Human-friendly fallback link to the README on GitHub. */
  htmlUrl: string
}

/** Extracts `{ owner, repo }` from a GitHub repository URL (`.git` tolerated). */
export function parseRepo(url?: string): RepoRef | null {
  if (!url) return null
  const match = /github\.com\/([^/]+)\/([^/]+?)(?:\.git)?(?:[/?#]|$)/.exec(url)
  if (!match) return null
  const [, owner, repo] = match
  if (!owner || !repo) return null
  return { owner, repo }
}

function apiHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "rakibhossendev-portfolio",
  }
  // Optional; raises the rate limit. Never referenced from client code.
  const token = process.env.GITHUB_TOKEN
  if (token) headers.Authorization = `Bearer ${token}`
  return headers
}

/** Discovers the repository's default branch (falls back to "main"). */
async function getDefaultBranch(ref: RepoRef): Promise<string> {
  try {
    const res = await fetch(
      `${GITHUB_API}/repos/${ref.owner}/${ref.repo}`,
      {
        headers: apiHeaders(),
        next: { revalidate: REVALIDATE_SECONDS },
      }
    )
    if (res.ok) {
      const data = (await res.json()) as { default_branch?: string }
      if (data.default_branch) return data.default_branch
    }
    if (res.status === 403 || res.status === 429) return "main"
  } catch {
    // Network failure — the raw attempt below decides the final status.
  }
  return "main"
}

/** Turns a GitHub blob/raw/readme URL into a raw content URL. */
function toRawUrl(url: string): string {
  return url
    .replace(/^https?:\/\/github\.com\//, `${RAW_HOST}/`)
    .replace(/\/blob\//, "/")
}

async function readRemote(url: string): Promise<
  { ok: true; text: string } | { ok: false; status: number }
> {
  try {
    const res = await fetch(url, {
      headers: apiHeaders(),
      next: { revalidate: REVALIDATE_SECONDS },
    })
    if (res.ok) return { ok: true, text: await res.text() }
    return { ok: false, status: res.status }
  } catch {
    return { ok: false, status: 0 }
  }
}

/**
 * Loads a repository README.
 *
 * Never throws: failures are reported through `status` so the page can render
 * a friendly error state with a direct link to the README on GitHub.
 */
export async function getReadme(
  ref: RepoRef,
  branchHint?: string
): Promise<ReadmeResult> {
  const branch = branchHint ?? (await getDefaultBranch(ref))
  const htmlUrl = `https://github.com/${ref.owner}/${ref.repo}/blob/${branch}/README.md`

  // 1. Explicit raw README link when the project configures one.
  // 2. Public raw endpoint, trying the common README filenames.
  const candidates = [
    `${RAW_HOST}/${ref.owner}/${ref.repo}/${branch}/README.md`,
    `${RAW_HOST}/${ref.owner}/${ref.repo}/${branch}/readme.md`,
    `${RAW_HOST}/${ref.owner}/${ref.repo}/${branch}/README`,
  ]

  for (const url of candidates) {
    const result = await readRemote(url)
    if (result.ok && result.text.trim()) {
      return { status: "ok", markdown: result.text, branch, htmlUrl }
    }
    // A hard failure other than 404 (rate limit / network) still falls
    // through to the API attempt below, which reports the real reason.
    if (!result.ok && result.status !== 404 && result.status !== 0) {
      return {
        status: result.status === 403 || result.status === 429 ? "rate-limited" : "network",
        branch,
        htmlUrl,
      }
    }
  }

  // 3. API fallback — resolves case-insensitive README names and detects
  //    rate limiting explicitly.
  try {
    const res = await fetch(
      `${GITHUB_API}/repos/${ref.owner}/${ref.repo}/readme`,
      {
        headers: { ...apiHeaders(), Accept: "application/vnd.github.raw+json" },
        next: { revalidate: REVALIDATE_SECONDS },
      }
    )
    if (res.ok) {
      const text = await res.text()
      if (text.trim()) return { status: "ok", markdown: text, branch, htmlUrl }
      return { status: "not-found", branch, htmlUrl }
    }
    if (res.status === 403 || res.status === 429) {
      return { status: "rate-limited", branch, htmlUrl }
    }
    if (res.status === 404) return { status: "not-found", branch, htmlUrl }
    return { status: "network", branch, htmlUrl }
  } catch {
    return { status: "network", branch, htmlUrl }
  }
}

/** Resolves a project's README: explicit `readmeUrl` first, then its repo. */
export async function getProjectReadme(options: {
  githubUrl?: string
  readmeUrl?: string
}): Promise<ReadmeResult | null> {
  if (options.readmeUrl) {
    const raw = toRawUrl(options.readmeUrl)
    const result = await readRemote(raw)
    const branch = "main"
    const htmlUrl = options.readmeUrl
    if (result.ok) return { status: "ok", markdown: result.text, branch, htmlUrl }
    return {
      status:
        result.status === 403 || result.status === 429
          ? "rate-limited"
          : result.status === 404
            ? "not-found"
            : "network",
      branch,
      htmlUrl,
    }
  }

  const ref = parseRepo(options.githubUrl)
  if (!ref) return null
  return getReadme(ref)
}
