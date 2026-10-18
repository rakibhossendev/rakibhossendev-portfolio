import {
  siBootstrap,
  siCss,
  siFlask,
  siJavascript,
  siBetterauth,
  siMongodb,
  siMysql,
  siNodedotjs,
  siNextdotjs,
  siPython,
  siReact,
  siSqlalchemy,
  siTailwindcss,
  siTypescript,
} from "simple-icons"

type SimpleIcon = { path: string; hex: string }

/**
 * Official brand logo + brand color from the `simple-icons` package.
 * Keys are normalized names (see `normalize`); slugs use "dotjs" for ".js",
 * so display names get both forms as aliases.
 */
const icons: Record<string, SimpleIcon> = {
  typescript: siTypescript,
  python: siPython,
  javascript: siJavascript,
  react: siReact,
  reactjs: siReact,
  nodejs: siNodedotjs,
  nodedotjs: siNodedotjs,
  nextjs: siNextdotjs,
  nextdotjs: siNextdotjs,
  flask: siFlask,
  tailwindcss: siTailwindcss,
  betterauth: siBetterauth,
  sqlalchemy: siSqlalchemy,
  mysql: siMysql,
  mongodb: siMongodb,
  bootstrap: siBootstrap,
  css: siCss,
}

/**
 * Brand colors adjusted for legibility on this site's dark navy background
 * (`--bg: #070b1a`). Everything not listed here keeps its official brand hex.
 */
const colorOverrides: Record<string, string> = {
  // Official black is invisible on dark cards — use the site's text color.
  nextjs: "var(--text-primary)",
  nextdotjs: "var(--text-primary)",
  // Official #663399 is too dark on navy.
  css: "#A98BE8",
  // Official #D71F00 is too dark on navy.
  sqlalchemy: "#F4674A",
  // Official #3776AB is dim on navy.
  python: "#5A9BD5",
}

/** Normalize a display name ("Node.js", "Tailwind Css", "better-auth") to a slug key. */
function normalize(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "")
}

interface TechIconProps {
  /** Display name or slug of the technology, e.g. "Next.js", "Tailwind CSS". */
  name: string
  className?: string
}

/** Real brand logo (from `simple-icons`) colored to fit the dark theme; falls back to a letter badge. */
export function TechIcon({ name, className = "h-4 w-4" }: TechIconProps) {
  const icon = icons[normalize(name)]

  if (!icon) {
    return (
      <span
        className={`flex items-center justify-center font-bold text-[var(--brand-accent)] ${className}`}
        aria-hidden="true"
      >
        {name.charAt(0).toUpperCase()}
      </span>
    )
  }

  const color = colorOverrides[normalize(name)] ?? `#${icon.hex}`

  return (
    <svg
      viewBox="0 0 24 24"
      fill={color}
      role="img"
      aria-label={name}
      className={className}
    >
      <path d={icon.path} />
    </svg>
  )
}
