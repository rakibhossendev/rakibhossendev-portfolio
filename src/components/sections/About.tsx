"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp, User } from "lucide-react"
import { personal } from "@/src/data/personal"
import { SectionHeader } from "@/src/components/ui/SectionHeader"

export function About() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section id="about" className="section-padding relative bg-[var(--bg-secondary)]">
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border-accent)] to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Get to Know Me"
          title="About Me"
          icon={<User className="h-5 w-5" />}
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16 items-center">
          {/* Image */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative">
              {/* Decorative border */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[var(--brand-accent)] to-purple-600 opacity-20 blur-sm" />
              <div className="relative h-72 w-64 overflow-hidden rounded-2xl border border-[var(--border-accent)] bg-[var(--bg-card)] sm:h-80 sm:w-72">
                <Image
                  src={personal.profileImage}
                  alt={personal.name}
                  fill
                  sizes="(max-width: 640px) 256px, 288px"
                  className="object-cover"
                />
              </div>
              {/* Location badge */}
              <div className="absolute -right-4 -bottom-4 rounded-xl border border-[var(--border-accent)] bg-[var(--bg-card)] px-4 py-2 shadow-xl glass">
                <p className="text-xs text-[var(--text-secondary)]">Based in</p>
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  {personal.location}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6">
            {/* Short bio */}
            <p className="text-lg font-medium leading-relaxed text-[var(--text-secondary)]">
              {personal.shortBio}
            </p>

            {/* Expandable full bio */}
            <div
              className={[
                "overflow-hidden transition-all duration-500",
                expanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0",
              ].join(" ")}
              aria-hidden={!expanded}
            >
              <div className="flex flex-col gap-4 pt-2">
                {personal.fullBio.map((paragraph, i) => (
                  <p key={i} className="leading-relaxed text-[var(--text-secondary)]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Toggle button */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="group flex w-fit items-center gap-2 rounded-lg border border-[var(--border-accent)] bg-[var(--brand-accent)]/5 px-5 py-2.5 text-sm font-semibold text-[var(--brand-accent)] transition-all duration-200 hover:bg-[var(--brand-accent)]/10"
              aria-expanded={expanded}
              aria-controls="full-bio"
            >
              {expanded ? (
                <>
                  Show Less
                  <ChevronUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                </>
              ) : (
                <>
                  Read More
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </>
              )}
            </button>

            {/* Quick stats */}
            <div className="mt-2 grid grid-cols-3 gap-4">
              {[
                { label: "Languages", value: "4+" },
                { label: "Frameworks", value: "7+" },
                { label: "Projects", value: "3+" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 text-center card-hover"
                >
                  <p className="text-2xl font-black text-[var(--brand-accent)]">{value}</p>
                  <p className="mt-0.5 text-xs text-[var(--text-secondary)]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
