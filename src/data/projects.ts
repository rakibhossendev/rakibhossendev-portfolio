import type { Project } from "@/src/types"

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Project One",
    shortDescription:
      "A placeholder for your first featured project. Replace this with your actual project title and description.",
    fullDescription:
      "This is a placeholder project. Please update this file at src/data/projects.ts with your real project details including title, description, technologies used, live demo URL, and GitHub repository link. You can also add your project's README content here.",
    image: "/images/projects/project-1.webp",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "",
    githubUrl: "",
    featured: true,
  },
  {
    id: "project-2",
    title: "Project Two",
    shortDescription:
      "A placeholder for your second featured project. Replace this with your actual project title and description.",
    fullDescription:
      "This is a placeholder project. Please update this file at src/data/projects.ts with your real project details including title, description, technologies used, live demo URL, and GitHub repository link. You can also add your project's README content here.",
    image: "/images/projects/project-2.webp",
    technologies: ["React.js", "Node.js", "MongoDB"],
    liveUrl: "",
    githubUrl: "",
    featured: true,
  },
  {
    id: "project-3",
    title: "Project Three",
    shortDescription:
      "A placeholder for your third featured project. Replace this with your actual project title and description.",
    fullDescription:
      "This is a placeholder project. Please update this file at src/data/projects.ts with your real project details including title, description, technologies used, live demo URL, and GitHub repository link. You can also add your project's README content here.",
    image: "/images/projects/project-3.webp",
    technologies: ["Python", "Flask", "MySQL"],
    liveUrl: "",
    githubUrl: "",
    featured: true,
  },
]
