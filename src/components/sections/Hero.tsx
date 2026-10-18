"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ArrowRight, Mail, MapPin, Sparkles } from "lucide-react"
import { GithubIcon } from "@/src/components/ui/SocialIcons"
import { personal } from "@/src/data/personal"

const roles = [
  "Full Stack Developer",
  "React Developer",
  "Next.js Developer",
  "Problem Solver",
]

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [typing, setTyping] = useState(true)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const currentRole = roles[roleIndex]

    if (typing) {
      if (charIndex < currentRole.length) {
        const t = setTimeout(() => {
          setDisplayed(currentRole.slice(0, charIndex + 1))
          setCharIndex((c) => c + 1)
        }, 60)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setTyping(false), 2000)
        return () => clearTimeout(t)
      }
    } else {
      if (charIndex > 0) {
        const t = setTimeout(() => {
          setDisplayed(currentRole.slice(0, charIndex - 1))
          setCharIndex((c) => c - 1)
        }, 35)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => {
          setRoleIndex((i) => (i + 1) % roles.length)
          setTyping(true)
        }, 0)
        return () => clearTimeout(t)
      }
    }
  }, [charIndex, typing, roleIndex])

  const handleScroll = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-hero-gradient"
      aria-label="Hero section"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-[var(--brand-accent)] opacity-[0.04] blur-3xl" />
      <div className="absolute right-1/4 bottom-1/3 h-96 w-96 rounded-full bg-purple-600 opacity-[0.04] blur-3xl" />
      <div className="absolute right-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--border-accent)] to-transparent opacity-50" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:justify-between">
          {/* Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:max-w-xl">
            {/* Badge */}
            <div className="mb-6 flex items-center gap-2 rounded-full border border-[var(--border-accent)] bg-[var(--brand-accent)]/5 px-4 py-1.5 text-xs font-medium text-[var(--brand-accent)] animate-fade-in-up opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
              <Sparkles className="h-3 w-3" />
              <span>Available for opportunities</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* Name */}
            <h1
              className="text-4xl font-black tracking-tight sm:text-5xl xl:text-6xl animate-fade-in-up opacity-0"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              Hi, I&apos;m{" "}
              <span className="text-shimmer">{personal.name}</span>
            </h1>

            {/* Typewriter role */}
            <div
              className="mt-4 flex h-10 items-center gap-2 animate-fade-in-up opacity-0"
              style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
              aria-label={`Role: ${roles[roleIndex]}`}
            >
              <span className="text-lg font-semibold text-[var(--text-secondary)] sm:text-xl">
                {displayed}
                <span className="animate-blink ml-0.5 inline-block h-5 w-0.5 bg-[var(--brand-accent)]" aria-hidden="true" />
              </span>
            </div>

            {/* Bio */}
            <p
              className="mt-6 text-base leading-relaxed text-[var(--text-secondary)] max-w-lg animate-fade-in-up opacity-0"
              style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
            >
              {personal.shortBio}
            </p>

            {/* Location */}
            <p
              className="mt-3 flex items-center gap-1.5 text-sm text-[var(--text-muted)] animate-fade-in-up opacity-0"
              style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
            >
              <MapPin className="h-3.5 w-3.5 text-[var(--brand-accent)]" />
              {personal.location}
            </p>

            {/* CTAs */}
            <div
              className="mt-8 flex flex-wrap items-center gap-3 animate-fade-in-up opacity-0"
              style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
            >
              <button
                onClick={() => handleScroll("projects")}
                className="group flex items-center gap-2 rounded-full bg-[var(--brand-accent)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--brand-accent)]/20 transition-all duration-300 hover:bg-[var(--brand-lighter)] hover:shadow-[0_0_30px_rgba(79,110,247,0.4)] hover:translate-y-[-2px]"
              >
                View Projects
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => handleScroll("contact")}
                className="flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-white/5 px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--border-accent)] hover:bg-[var(--brand-accent)]/5 hover:translate-y-[-2px]"
              >
                <Mail className="h-4 w-4" />
                Contact Me
              </button>
            </div>

            {/* GitHub link */}
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--brand-accent)] animate-fade-in-up opacity-0"
              style={{ animationDelay: "0.85s", animationFillMode: "forwards" }}
            >
              <GithubIcon className="h-4 w-4" />
              View GitHub Profile
            </a>
          </div>

          {/* Profile image */}
          <div
            className="relative flex-shrink-0 animate-fade-in opacity-0"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            {/* Outer decorative ring */}
            <div className="absolute inset-[-20px] rounded-full border border-[var(--border-accent)] opacity-30" />
            <div className="absolute inset-[-40px] rounded-full border border-[var(--border-subtle)] opacity-20" />

            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-[var(--brand-accent)] opacity-10 blur-2xl" />

            {/* Image container */}
            <div className="relative h-64 w-64 overflow-hidden rounded-full border-2 border-[var(--border-accent)] shadow-2xl shadow-[var(--brand-accent)]/20 animate-float sm:h-72 sm:w-72 lg:h-80 lg:w-80">
              <Image
                src={personal.profileImage}
                alt={`${personal.name} — ${personal.role}`}
                fill
                sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 320px"
                className="object-cover object-center"
                priority
              />
            </div>

            {/* Floating badge */}
             <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-[var(--border-accent)] bg-[var(--bg-card)] px-4 py-2 shadow-lg">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-[var(--text-primary)]">
                rakibhossendev
              </span> 
            </div> 
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in opacity-0" style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}>
          <span className="text-xs text-[var(--text-muted)]">Scroll</span>
          <div className="h-8 w-5 rounded-full border border-[var(--border-subtle)] flex items-start justify-center pt-1.5">
            <div className="h-1.5 w-1 rounded-full bg-[var(--brand-accent)] animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
