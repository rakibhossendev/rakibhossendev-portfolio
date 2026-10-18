import type { ReactNode } from "react"
import { Navbar } from "@/src/components/layout/Navbar"
import { Footer } from "@/src/components/layout/Footer"

/**
 * Chrome for /projects/[slug] — the homepage renders its Navbar/Footer inside
 * PortfolioClient, so detail routes need their own.
 */
export default function ProjectLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen pt-28 md:pt-36">{children}</main>
      <Footer />
    </>
  )
}
