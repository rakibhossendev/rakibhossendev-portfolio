"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { cn } from "@/src/lib/utils"

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

function subscribeReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY)
  mediaQuery.addEventListener("change", callback)
  return () => mediaQuery.removeEventListener("change", callback)
}

function getReducedMotion() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches
}

interface RevealProps {
  children: React.ReactNode
  /** Animation delay in ms (for staggering grids) */
  delay?: number
  /** Slide-in direction; animates once when scrolled into view */
  direction?: "up" | "left" | "right"
  className?: string
}

export function Reveal({ children, delay = 0, direction = "up", className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => false // SSR: assume no preference; effect below handles the client
  )

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            observer.unobserve(entry.target) // reveal once, ever
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [prefersReducedMotion])

  const visible = inView || prefersReducedMotion

  return (
    <div
      ref={ref}
      data-reveal={direction}
      className={cn("reveal", visible && "reveal-visible", className)}
      style={visible && delay > 0 ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
