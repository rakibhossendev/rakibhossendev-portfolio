import { projects } from "@/src/data/projects"
import type { Project } from "@/src/types"

/** Returns only the projects marked as featured. */
export function getFeaturedProjects(limit?: number): Project[] {
  const featured = projects.filter((p) => p.featured)
  return limit !== undefined ? featured.slice(0, limit) : featured
}

/** Returns all projects. */
export function getAllProjects(): Project[] {
  return projects
}

/** Returns a project by its id, or undefined if not found. */
export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}
