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
    technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/rakibhossen",
    featured: true,
  },
  {
    id: "project-2",
    title: "Bangla News",
    shortDescription:
      "A smart task management app with AI-generated subtask breakdowns and priority suggestions.",
    fullDescription:
      "Integrates OpenAI API to analyze task descriptions and suggest optimal breakdowns, priority levels, and time estimates. Built with React.js, Python/Flask backend, and PostgreSQL. Includes drag-and-drop kanban board and team collaboration features.",
    image: "/images/projects/project-2.webp",
    technologies: ["React.js", "Python", "Flask", "PostgreSQL", "OpenAI"],
    liveUrl: "",
    githubUrl: "https://github.com/rakibhossen",
    featured: true,
  },
  {
    id: "project-3",
    title: "Real-Time Chat Application",
    shortDescription:
      "WebSocket-powered chat with rooms, file sharing, and end-to-end message encryption.",
    fullDescription:
      "A scalable real-time chat platform built with Socket.io, React.js, and Node.js. Supports multiple chat rooms, direct messaging, file uploads to AWS S3, and end-to-end encryption. Deployed on Railway with Redis for session management.",
    image: "/images/projects/project-3.webp",
    technologies: ["React.js", "Node.js", "Socket.io", "Redis", "AWS S3"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/rakibhossen",
    featured: true,
  },
  {
    id: "project-4",
    title: "Developer Portfolio Builder",
    shortDescription:
      "A drag-and-drop portfolio generator for developers with dynamic theme customization.",
    fullDescription:
      "A SaaS tool that lets developers create stunning portfolios by filling out a form and choosing from 10+ dark/light themes. Built with Next.js, Prisma, and PostgreSQL. Includes live preview, custom domain support, and one-click Vercel deployment.",
    image: "/images/projects/project-4.webp",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "TypeScript"],
    liveUrl: "",
    githubUrl: "https://github.com/rakibhossen",
    featured: false,
  },
  {
    id: "project-5",
    title: "Expense Tracker with Analytics",
    shortDescription:
      "Track expenses by category with beautiful charts, budget goals, and monthly reports.",
    fullDescription:
      "A personal finance app built with React.js and Chart.js for interactive data visualization. Features include recurring transaction detection, CSV/PDF export, budget alerts, and a monthly summary email. Backend powered by Flask and MySQL.",
    image: "/images/projects/project-5.webp",
    technologies: ["React.js", "Flask", "MySQL", "Chart.js"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/rakibhossen",
    featured: false,
  },
  {
    id: "project-6",
    title: "API Rate Limiter Library",
    shortDescription:
      "An open-source middleware library for Node.js to handle API rate limiting with Redis.",
    fullDescription:
      "A production-ready npm package implementing sliding window and token bucket algorithms for rate limiting. Supports multiple storage backends (in-memory, Redis, MongoDB). Used by 200+ developers with full TypeScript support and configurable retry logic.",
    image: "/images/projects/project-6.webp",
    technologies: ["TypeScript", "Node.js", "Redis", "npm"],
    liveUrl: "",
    githubUrl: "https://github.com/rakibhossen",
    featured: false,
  },
]
