import type { Project } from "@/src/types"

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Result Management System",
    shortDescription:
      "A full-featured e-commerce app with product listings, cart, checkout, and admin dashboard.",
    fullDescription:
      "Built with Next.js 14 and TypeScript on the frontend, with a Node.js/Express backend and MongoDB database. Features include real-time inventory, Stripe payment integration, JWT authentication, and an admin panel for managing products and orders.",
    image: "/images/projects/result-management-system.png",
    technologies: ["Flask", "Python","JavaScript", "SQLAlchemy", "Bootstrap", "CSS"],
    liveUrl: "https://polytechnic-result-management-system.onrender.com/",
    githubUrl: "https://github.com/rakibhossendev/Result_Management_System.git",
    featured: true,
  },
  {
    id: "project-2",
    title: "Bangla News",
    shortDescription:
      "Bangla News is a production-ready, real-time frontend news platform.",
    fullDescription:
      "Integrates OpenAI API to analyze task descriptions and suggest optimal breakdowns, priority levels, and time estimates. Built with React.js, Python/Flask backend, and PostgreSQL. Includes drag-and-drop kanban board and team collaboration features.",
    image: "/images/projects/bangla-news.png",
    technologies: ["Next.js", "TypeScript", "better-auth", "Tailwind Css"],
    liveUrl: "https://bangla-news-ebon.vercel.app/",
    githubUrl: "https://github.com/rakibhossendev/bangla-news.git",
    featured: true,
  },
  {
    id: "project-3",
    title: "Bazar Dor",
    shortDescription:
      "Bazar-Dor is a web application designed to help users track market prices of everyday products in differentWebSocket-powered chat with rooms, file sharing, and end-to-end message encryption local markets.",
    fullDescription:
      "A scalable real-time chat platform built with Socket.io, React.js, and Node.js. Supports multiple chat rooms, direct messaging, file uploads to AWS S3, and end-to-end encryption. Deployed on Railway with Redis for session management.",
    image: "/images/projects/bazar-dor.png",
    technologies: ["Next.js", "TypeScript", "Better-Auth", "TailwindCss"],
    liveUrl: "https://bazar-dor-five.vercel.app/",
    githubUrl: "https://github.com/rakibhossendev/bazar-dor.git",
    featured: true,
  },
]
