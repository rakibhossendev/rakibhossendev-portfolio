# AGENTS.md

Single-page personal portfolio. Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + shadcn/ui (Base UI style). No tests, no CI. Package manager is npm (use `package-lock.json`; not pnpm/yarn).

## Commands

```bash
npm run dev         # dev server (also re-writes the managed block below)
npm run lint        # eslint (flat config, eslint-config-next)
npm run typecheck   # tsc --noEmit
npm run build       # next build
```

- There are no tests. Verify changes with `npm run lint && npm run typecheck` (both currently pass).
- `npm run format` is currently broken: `.prettierrc` sets `tailwindStylesheet: "app/globals.css"` but the file is at `src/app/globals.css`, so the prettier Tailwind plugin fails with ENOENT. Either fix that path or don't rely on it; match existing formatting by hand (no semicolons, double quotes).
- shadcn components: `npx shadcn@latest add <component>` — it writes to the **root** `components/` dir (see `components.json` aliases).

## Directory / import quirks (easy to get wrong)

- Path alias `@/*` maps to the repo **root** (`tsconfig.json`), not `src/`. App code therefore imports as `@/src/components/...`, `@/src/lib/utils`, etc. Follow that convention.
- Two parallel `components/` + `lib/` trees exist:
  - `src/` — the real app (routes, sections, data, utils). Put new code here.
  - Root `components/`, `lib/`, `hooks/` — shadcn scaffolding only (`ui/button.tsx`, `theme-provider.tsx`, `lib/utils.ts`). Nothing in `src/` imports from it yet. Note the duplicate `cn`: root `lib/utils.ts` re-exports the `cn` npm package; the one used by app code is `src/lib/utils.ts` (clsx + tailwind-merge, plus `formatDate`).

## Content & routing

- All site copy/data is hardcoded TypeScript in `src/data/` (`personal.ts`, `projects.ts`, `skills.ts`, `blogs.ts`), typed by `src/types/index.ts`. To change site content, edit these files.
- `src/lib/projects.ts` holds the selectors (`getFeaturedProjects`, `getProjectBySlug`, `getAdjacentProjects`, ...). The detail route uses them; homepage sections still read `src/data/projects` directly.
- `content/projects/*.md` is dead weight — no code reads it. Real project docs come from each repo's GitHub README at build time via `src/lib/github.ts` (raw endpoint → API fallback, `next: { revalidate: 3600 }`, optional `GITHUB_TOKEN` env var, never throws — returns a status the page renders as a friendly error). Markdown is rendered server-side by `src/components/projects/Readme.tsx` (react-markdown; raw HTML intentionally not rendered).
- Routing is hash-based on one page: `/` renders `src/components/PortfolioClient.tsx`, which composes all sections. `/about`, `/blogs`, `/projects` just `redirect("/#...")`. The exception is the real detail route `/projects/[slug]` (SSG via `generateStaticParams`, own layout with Navbar/Footer, segment `not-found.tsx`).
- `PortfolioClient.tsx` is a client component gated on the intro loader's `loaded` state; the root layout itself is a server component.
- `src/components/sections/Blogs.tsx` (`id="blogs"`) is **never mounted** — `PortfolioClient` renders Hero/About/Skills/Projects/Contact only, and `Navbar`'s `navLinks` has no blogs entry. So `/blogs` redirects to a `#blogs` anchor that doesn't exist. To ship blog content, mount `Blogs` in `PortfolioClient` (and optionally add a nav link).
- `src/components/layout/MobileMenu.tsx` is an intentional placeholder (`export {}`); the mobile menu lives inline in `Navbar.tsx`.

## Styling

- Tailwind v4 is CSS-first: no `tailwind.config`, configured via `@import "tailwindcss"` and `@custom-variant dark` in `src/app/globals.css`.
- Design tokens are CSS variables (`--bg`, `--brand`, `--text-primary`, ...) defined in `src/app/globals.css`, used directly in JSX (e.g. `bg-[var(--bg)]`). Dark navy theme; reuse these vars instead of hardcoding colors.
- Fonts are self-hosted through `next/font` in `src/app/layout.tsx`: Inter (`--font-sans`) for body, Montserrat (`--font-heading`) for all `h1–h6` (set in a base rule in `globals.css`). Unlayered CSS below the Tailwind layers holds the custom cursor and `.md-article` README styles.
- `next-themes`' `ThemeProvider` exists in `components/theme-provider.tsx` but is not wired into the layout.

## Next.js 16

Next.js here is newer than your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing Next-specific code.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
