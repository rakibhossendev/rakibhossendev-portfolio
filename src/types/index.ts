export interface Project {
  id: string
  /** URL segment for the detail route: /projects/[slug] */
  slug: string
  title: string
  /** Card copy. Keep to ~2–3 lines; the README carries the full documentation. */
  shortDescription: string
  /** Longer intro used on the detail page when the GitHub README is unavailable. */
  fullDescription: string
  image: string
  gallery?: string[]
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  /**
   * Optional explicit README link (GitHub blob or raw URL). When omitted the
   * README is resolved automatically from `githubUrl`.
   */
  readmeUrl?: string
  featured: boolean
}

export interface Skill {
  name: string
  icon: string
  category: SkillCategory
}

export type SkillCategory =
  | "Programming Languages"
  | "Frameworks, Libraries & Tools"
  | "Databases"

export interface Blog {
  id: string
  title: string
  excerpt: string
  coverImage?: string
  publishedAt: string
  url: string
  tags?: string[]
}

export interface PersonalInfo {
  name: string
  role: string
  shortBio: string
  fullBio: string[]
  email: string
  github: string
  linkedin: string
  facebook: string
  resumePath: string
  profileImage: string
  location: string
}
