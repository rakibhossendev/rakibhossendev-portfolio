import type { Project } from "@/src/types"

/**
 * Single source of truth for project metadata.
 *
 * `shortDescription` is what the cards show (2–3 lines). The detail page pulls
 * the long-form documentation (overview, features, setup, env vars) from each
 * repository's README on GitHub — see `src/lib/github.ts`.
 */
export const projects: Project[] = [
  {
    id: "project-1",
    slug: "result-management-system",
    title: "Result Management System",
    shortDescription:
      "A Flask-based result management system for polytechnic institutes with four role-based dashboards — Admin, Principal, Teacher and Student — for managing departments, students, attendance and exam marks.",
    fullDescription:
      "A college result management system built with Flask. It implements four user roles (Admin, Principal, Teacher, Student) and the administrative workflows for managing principals, teachers, departments, subjects, students, attendance and marks topics.",
    image: "/images/projects/result-management-system.png",
    technologies: ["Python", "Flask", "SQLAlchemy", "SQLite", "JavaScript", "CSS"],
    liveUrl: "https://polytechnic-result-management-system.onrender.com/",
    githubUrl: "https://github.com/rakibhossendev/Result_Management_System.git",
    featured: true,
  },
  {
    id: "project-2",
    slug: "bangla-news",
    title: "Bangla News",
    shortDescription:
      "A Bangla-language news platform built with Next.js and TypeScript, styled with Tailwind CSS and backed by MongoDB, with sign-in handled by better-auth.",
    fullDescription:
      "Bangla News is a news website built with Next.js, TypeScript and Tailwind CSS. Authentication runs through better-auth with a MongoDB adapter, and article content is stored in MongoDB.",
    image: "/images/projects/bangla-news.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "better-auth", "MongoDB"],
    liveUrl: "https://bangla-news-ebon.vercel.app/",
    githubUrl: "https://github.com/rakibhossendev/bangla-news.git",
    featured: true,
  },
  {
    id: "project-3",
    slug: "bazar-dor",
    title: "Bazar Dor",
    shortDescription:
      "A real-time market price tracker that compares everyday products across local markets and shows minimum, maximum and average prices so shoppers can buy smarter.",
    fullDescription:
      "Bazar-Dor helps users track market prices of everyday products in different local markets. It compares prices across markets and shows minimum, maximum and average prices, price trends and demand insights so users can make informed purchasing decisions.",
    image: "/images/projects/bazar-dor.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "better-auth", "MongoDB"],
    liveUrl: "https://bazar-dor-five.vercel.app/",
    githubUrl: "https://github.com/rakibhossendev/bazar-dor.git",
    featured: true,
  },
]
