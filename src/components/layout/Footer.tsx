import { Mail, Heart } from "lucide-react"
import { GithubIcon, LinkedinIcon, FacebookIcon } from "@/src/components/ui/SocialIcons"
import { personal } from "@/src/data/personal"

export function Footer() {
  const year = new Date().getFullYear()

  const socials = [
    { icon: GithubIcon, href: personal.github, label: "GitHub" },
    { icon: LinkedinIcon, href: personal.linkedin, label: "LinkedIn" },
    { icon: FacebookIcon, href: personal.facebook, label: "Facebook" },
    { icon: Mail, href: `mailto:${personal.email}`, label: "Email" },
  ]

  const initials = personal.name
    .split(" ")
    .map((w) => w[0])
    .join("")

  return (
    <footer className="relative border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Logo + name */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--brand-accent)] to-purple-600">
              <span className="text-sm font-black text-white">{initials}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                {personal.name}
              </p>
              <p className="text-xs text-[var(--text-secondary)]">{personal.role}</p>
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-secondary)] transition-all duration-200 hover:bg-[var(--brand-accent)]/10 hover:text-[var(--brand-accent)]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 border-t border-[var(--border-subtle)] pt-6 text-center">
          <p className="flex items-center justify-center gap-1.5 text-xs text-[var(--text-muted)]">
            © {year} {personal.name}. Built with{" "}
            <Heart className="h-3 w-3 fill-[var(--brand-accent)] text-[var(--brand-accent)]" />{" "}
            using Next.js & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  )
}
