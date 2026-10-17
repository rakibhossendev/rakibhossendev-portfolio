"use client"

import { useState, useCallback } from "react"
import { IntroLoader } from "@/src/components/animations/IntroLoader"
import { Navbar } from "@/src/components/layout/Navbar"
import { Footer } from "@/src/components/layout/Footer"
import { Hero } from "@/src/components/sections/Hero"
import { About } from "@/src/components/sections/About"
import { Skills } from "@/src/components/sections/Skills"
import { Projects } from "@/src/components/sections/Projects"
import { Contact } from "@/src/components/sections/Contact"

export function PortfolioClient() {
  const [loaded, setLoaded] = useState(false)

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      <IntroLoader onComplete={handleLoaderComplete} />
      <div
        className={[
          "transition-opacity duration-700",
          loaded ? "opacity-100" : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <Navbar />
        <main id="main-content">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
