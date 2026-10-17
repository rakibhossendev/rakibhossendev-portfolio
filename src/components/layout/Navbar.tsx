"use client"

import { useState, useEffect, useCallback } from "react"
import { Menu, X, Download, ExternalLink } from "lucide-react"
import { GithubIcon } from "@/src/components/ui/SocialIcons"
import { personal } from "@/src/data/personal"
import { cn } from "@/src/lib/utils"

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Blogs", href: "#blogs" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Determine active section
      const sections = navLinks.map((l) => l.href.slice(1))
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()
      const id = href.slice(1)
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      }
      setMobileOpen(false)
    },
    []
  )

  // Close mobile menu on escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  const initials = personal.name
    .split(" ")
    .map((w) => w[0])
    .join("")

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "glass-strong shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        )}
        role="banner"
      >
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-2.5 group"
            aria-label="Rakib Hossen - Home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--brand-accent)] to-purple-600 shadow-lg shadow-[var(--brand-glow)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(79,110,247,0.4)]">
              <span className="text-sm font-black text-white tracking-tighter">
                {initials}
              </span>
            </div>
            <span className="hidden font-bold text-[var(--text-primary)] sm:block text-sm tracking-wide">
              {personal.name.split(" ")[0]}{" "}
              <span className="text-[var(--brand-accent)]">
                {personal.name.split(" ")[1]}
              </span>
            </span>
          </a>

          {/* Desktop nav links */}
          <ul className="hidden items-center gap-1 md:flex" role="list">
            {navLinks.map((link) => {
              const id = link.href.slice(1)
              const isActive = activeSection === id
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={cn(
                      "relative px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200",
                      "hover:text-[var(--text-primary)] hover:bg-white/5",
                      isActive
                        ? "text-[var(--brand-accent)]"
                        : "text-[var(--text-secondary)]"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-[var(--brand-accent)]" />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 md:flex">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-secondary)] transition-all duration-200 hover:bg-white/5 hover:text-[var(--text-primary)]"
              aria-label="GitHub profile"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href={personal.resumePath}
              download="Rakib-Hossen-Resume.pdf"
              className="flex items-center gap-2 rounded-lg border border-[var(--brand-accent)] bg-[var(--brand-accent)]/10 px-4 py-1.5 text-sm font-semibold text-[var(--brand-accent)] transition-all duration-200 hover:bg-[var(--brand-accent)] hover:text-white hover:shadow-[0_0_20px_rgba(79,110,247,0.3)]"
            >
              <Download className="h-3.5 w-3.5" />
              Resume
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-secondary)] transition-colors hover:bg-white/5 hover:text-[var(--text-primary)] md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 glass-strong md:hidden"
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex h-full flex-col pt-20 pb-8 px-6">
            <nav>
              <ul className="flex flex-col gap-1" role="list">
                {navLinks.map((link, i) => {
                  const id = link.href.slice(1)
                  const isActive = activeSection === id
                  return (
                    <li key={link.href} className="animate-fade-in-up opacity-0" style={{ animationDelay: `${i * 60}ms`, animationFillMode: "forwards" }}>
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium transition-all duration-200",
                          isActive
                            ? "bg-[var(--brand-accent)]/10 text-[var(--brand-accent)] border border-[var(--border-accent)]"
                            : "text-[var(--text-secondary)] hover:bg-white/5 hover:text-[var(--text-primary)]"
                        )}
                      >
                        {link.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* Mobile actions */}
            <div className="mt-8 flex flex-col gap-3">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-[var(--border-subtle)] px-4 py-3 text-sm font-medium text-[var(--text-secondary)] transition-all hover:bg-white/5 hover:text-[var(--text-primary)]"
              >
                <GithubIcon className="h-4 w-4" />
                GitHub Profile
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href={personal.resumePath}
                download="Rakib-Hossen-Resume.pdf"
                className="flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-accent)] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--brand-lighter)] hover:shadow-[0_0_20px_rgba(79,110,247,0.3)]"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
