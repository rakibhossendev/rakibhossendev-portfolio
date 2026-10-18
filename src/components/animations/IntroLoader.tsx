"use client"

import { useEffect, useState } from "react"
import { personal } from "@/src/data/personal"

export function IntroLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading")

  useEffect(() => {
    // Play the intro once per session — returning from a project detail page
    // should not replay the ~2s loader on every navigation. Deferred one frame
    // because setState must not run synchronously inside an effect.
    let seen = false
    try {
      seen = window.sessionStorage.getItem("portfolio-intro-seen") === "1"
    } catch {
      // Storage can be blocked in private modes; fall through and play it.
    }
    if (seen) {
      requestAnimationFrame(() => {
        setPhase("done")
        onComplete()
      })
      return
    }

    // Animate progress bar
    const startTime = Date.now()
    const duration = 1600

    const tick = () => {
      const elapsed = Date.now() - startTime
      const p = Math.min((elapsed / duration) * 100, 100)
      setProgress(p)

      if (p < 100) {
        requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setPhase("reveal")
          setTimeout(() => {
            setPhase("done")
            try {
              window.sessionStorage.setItem("portfolio-intro-seen", "1")
            } catch {
              // Ignore storage failures — the intro simply plays again.
            }
            onComplete()
          }, 600)
        }, 200)
      }
    }

    requestAnimationFrame(tick)
  }, [onComplete])

  if (phase === "done") return null

  const initials = personal.name
    .split(" ")
    .map((w) => w[0])
    .join("")

  return (
    <div
      className={[
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center",
        "bg-[var(--bg)] transition-opacity duration-500",
        phase === "reveal" ? "opacity-0" : "opacity-100",
      ].join(" ")}
      role="status"
      aria-label="Loading portfolio"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Glow orbs */}
      <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-[var(--brand-accent)] opacity-5 blur-3xl" />
      <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-purple-500 opacity-5 blur-3xl" />

      <div className="relative flex flex-col items-center gap-8">
        {/* Monogram */}
        <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-[var(--border-accent)] bg-[var(--bg-card)] shadow-2xl animate-pulse-glow">
          <span className="text-3xl font-black tracking-tighter text-[var(--brand-accent)]">
            {initials}
          </span>
          {/* Spinning ring */}
          <div
            className="absolute inset-[-6px] rounded-[calc(1rem+6px)] border-2 border-transparent"
            style={{
              borderTopColor: "var(--brand-accent)",
              borderRightColor: "rgba(79,110,247,0.3)",
              animation: "spin-slow 1.5s linear infinite",
            }}
          />
        </div>

        {/* Name */}
        <div className="text-center">
          <h1 className="text-3xl font-black tracking-tight text-shimmer md:text-4xl">
            {personal.name}
          </h1>
          <p className="mt-1 text-sm font-medium tracking-widest text-[var(--text-secondary)] uppercase">
            {personal.role}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-48 overflow-hidden rounded-full bg-[var(--bg-secondary)] p-[1px]">
          <div
            className="h-[3px] rounded-full bg-gradient-to-r from-[var(--brand-accent)] to-purple-500 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
