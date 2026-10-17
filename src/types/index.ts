export interface Project {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
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
