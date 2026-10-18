# AGENTS.md

Single-page personal portfolio. Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + shadcn/ui (Base UI style). No tests, no CI. Package manager is npm (use `package-lock.json`; not pnpm/yarn).

## Commands

```bash
npm run dev         # dev server (also re-writes the managed block below)
npm run lint        # eslint (flat config, eslint-config-next)
npm run typecheck   # tsc --noEmit
npm run build       # next build
```

- There are no tests. Verify changes with `npm run lint && npm run typecheck`.
- `npm run format` is currently broken: `.prettierrc` sets `tailwindStylesheet: "app/globals.css"` but the file is at `src/app/globals.css`, so the prettier Tailwind plugin fails with ENOENT. Don't rely on it; match existing formatting by hand (no semicolons, double quotes).
- shadcn components: `npx shadcn@latest add <component>` — it writes to the **root** `components/` dir (see `components.json` aliases).

## Directory / import quirks (easy to get wrong)

- Path alias `@/*` maps to the repo **root** (`tsconfig.json`), not `src/`. App code therefore imports as `@/src/components/...`, `@/src/lib/utils`, etc. Follow that convention.
- Two parallel `components/` + `lib/` trees exist:
  - `src/` — the real app (routes, sections, data, utils). Put new code here.
  - Root `components/`, `lib/`, `hooks/` — shadcn scaffolding only (`ui/button.tsx`, `theme-provider.tsx`, `lib/utils.ts`). Nothing in `src/` imports from it yet. Note the duplicate `cn`: root `lib/utils.ts` re-exports the `cn` npm package; the one used by app code is `src/lib/utils.ts` (clsx + tailwind-merge, plus `formatDate`).

## Content & routing

- All site copy/data is hardcoded TypeScript in `src/data/` (`personal.ts`, `projects.ts`, `skills.ts`, `blogs.ts`), typed by `src/types/index.ts`. To change site content, edit these files.
- `src/lib/projects.ts` exports selectors (`getFeaturedProjects`, `getAllProjects`, `getProjectById`) that nothing imports yet — sections read `src/data/projects` directly.
- `content/projects/*.md` is dead weight — no code reads it; there is no markdown/MDX pipeline.
- Routing is hash-based on one page: `/` renders `src/components/PortfolioClient.tsx`, which composes all sections. `/about`, `/blogs`, `/projects` just `redirect("/#...")`.
- `PortfolioClient.tsx` is a client component gated on the intro loader's `loaded` state; the root layout itself is a server component.

## Styling

- Tailwind v4 is CSS-first: no `tailwind.config`, configured via `@import "tailwindcss"` and `@custom-variant dark` in `src/app/globals.css`.
- Design tokens are CSS variables (`--bg`, `--brand`, `--text-primary`, ...) defined in `src/app/globals.css`, used directly in JSX (e.g. `bg-[var(--bg)]`). Dark navy theme; reuse these vars instead of hardcoding colors.
- `next-themes`' `ThemeProvider` exists in `components/theme-provider.tsx` but is not wired into the layout.

## Next.js 16

Next.js here is newer than your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing Next-specific code.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
