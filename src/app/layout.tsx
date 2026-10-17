import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { personal } from "@/src/data/personal"

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://rakibhossen.dev"),
  title: {
    default: `${personal.name} — ${personal.role}`,
    template: `%s | ${personal.name}`,
  },
  description: personal.shortBio,
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Node.js",
    "Python Developer",
    "Bangladesh Developer",
    "Rakib Hossen",
    "Portfolio",
    "Web Developer",
  ],
  authors: [{ name: personal.name }],
  creator: personal.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rakibhossen.dev",
    title: `${personal.name} — ${personal.role}`,
    description: personal.shortBio,
    siteName: `${personal.name} Portfolio`,
    images: [
      {
        url: personal.profileImage,
        width: 1200,
        height: 630,
        alt: `${personal.name} — ${personal.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} — ${personal.role}`,
    description: personal.shortBio,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={plusJakarta.variable}>
      <body className="bg-[var(--bg)] text-[var(--text-primary)] antialiased">
        {children}
      </body>
    </html>
  )
}
