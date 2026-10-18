"use client"

import { useEffect, useRef } from "react"

/**
 * Custom cursor: an exact-following dot plus a slightly trailing ring that
 * grows over interactive elements (and can show a short label).
 *
 * Safety rules baked in:
 * - Only activates for fine pointers (`hover: hover` + `pointer: fine`) — touch
 *   devices keep the native cursor.
 * - Skipped entirely when `prefers-reduced-motion` is set.
 * - `pointer-events: none` everywhere, so it never blocks clicks or selection.
 * - The `html.custom-cursor` class (which hides the native cursor) is only
 *   added after successful activation — if anything fails the OS cursor stays.
 */

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], [data-cursor], summary, input, textarea, select"

interface CursorState {
  visible: boolean
  active: boolean
  label: string
}

export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    )
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    const root = rootRef.current
    const dot = dotRef.current
    const ring = ringRef.current
    if (!root || !dot || !ring) return

    const target = { x: -100, y: -100 }
    const ringPos = { x: -100, y: -100 }
    const state: CursorState = { visible: false, active: false, label: "" }

    let frame = 0
    let running = false

    const paint = () => {
      root.dataset.visible = String(state.visible)
      root.dataset.state = state.label
        ? "label"
        : state.active
          ? "active"
          : "idle"
      if (labelRef.current && labelRef.current.textContent !== state.label) {
        labelRef.current.textContent = state.label
      }
    }

    const loop = () => {
      // Ring trails the pointer a touch for a smooth, weighty feel.
      ringPos.x += (target.x - ringPos.x) * 0.22
      ringPos.y += (target.y - ringPos.y) * 0.22
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`

      const dx = target.x - ringPos.x
      const dy = target.y - ringPos.y
      if (Math.hypot(dx, dy) < 0.15) {
        running = false
        return
      }
      frame = requestAnimationFrame(loop)
    }

    const startLoop = () => {
      if (running) return
      running = true
      frame = requestAnimationFrame(loop)
    }

    const onPointerMove = (event: PointerEvent) => {
      target.x = event.clientX
      target.y = event.clientY
      if (!state.visible) {
        state.visible = true
        // Snap on first appearance so the ring doesn't fly in from off-screen.
        ringPos.x = target.x
        ringPos.y = target.y
        // Hide the native cursor only now that ours is actually painted.
        document.documentElement.classList.add("custom-cursor")
        dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`
        paint()
        startLoop()
        return
      }
      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`
      startLoop()
    }

    const onPointerOver = (event: PointerEvent) => {
      const el = (event.target as Element | null)?.closest?.(
        INTERACTIVE_SELECTOR
      )
      state.active = !!el
      state.label = el?.getAttribute("data-cursor-label") ?? ""
      paint()
    }

    const onPointerOut = (event: PointerEvent) => {
      // Leaving the window entirely (no next target) hides the cursor.
      if (event.relatedTarget === null) {
        state.visible = false
        paint()
        return
      }
      state.active = false
      state.label = ""
      paint()
    }

    const activate = () => {
      root.style.display = "block"
      window.addEventListener("pointermove", onPointerMove, { passive: true })
      window.addEventListener("pointerover", onPointerOver, { passive: true })
      document.addEventListener("pointerout", onPointerOut, { passive: true })
    }

    const deactivate = () => {
      document.documentElement.classList.remove("custom-cursor")
      root.style.display = "none"
      cancelAnimationFrame(frame)
      running = false
      state.visible = false
      state.active = false
      state.label = ""
      paint()
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerover", onPointerOver)
      document.removeEventListener("pointerout", onPointerOut)
    }

    const sync = () => {
      if (finePointer.matches && !reducedMotion.matches) activate()
      else deactivate()
    }

    sync()
    finePointer.addEventListener("change", sync)
    reducedMotion.addEventListener("change", sync)

    return () => {
      finePointer.removeEventListener("change", sync)
      reducedMotion.removeEventListener("change", sync)
      deactivate()
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className="custom-cursor-root"
      data-state="idle"
      data-visible="false"
      style={{ display: "none" }}
      aria-hidden="true"
    >
      <div ref={ringRef} className="cursor-ring">
        <span className="cursor-ring-body" />
        <span ref={labelRef} className="cursor-label" />
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  )
}
