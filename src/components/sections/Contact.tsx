import { Mail, MessageSquare, Send, ArrowUpRight } from "lucide-react"
import { GithubIcon, LinkedinIcon, FacebookIcon } from "@/src/components/ui/SocialIcons"
import { personal } from "@/src/data/personal"
import { SectionHeader } from "@/src/components/ui/SectionHeader"

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: personal.email,
    href: `mailto:${personal.email}`,
    description: "Drop me a line anytime",
    color: "text-[#EA4335]",
    bg: "bg-[#EA4335]/10",
    border: "border-[#EA4335]/20",
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "github.com/rakibhossen",
    href: personal.github,
    description: "Check out my repositories",
    color: "text-[var(--text-primary)]",
    bg: "bg-white/5",
    border: "border-[var(--border-subtle)]",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "linkedin.com/in/rakibhossen",
    href: personal.linkedin,
    description: "Connect professionally",
    color: "text-[#0A66C2]",
    bg: "bg-[#0A66C2]/10",
    border: "border-[#0A66C2]/20",
  },
  {
    icon: FacebookIcon,
    label: "Facebook",
    value: "facebook.com/rakibhossen",
    href: personal.facebook,
    description: "Find me on Facebook",
    color: "text-[#1877F2]",
    bg: "bg-[#1877F2]/10",
    border: "border-[#1877F2]/20",
  },
]

export function Contact() {
  return (
    <section id="contact" className="section-padding relative bg-[var(--bg-secondary)]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border-accent)] to-transparent" />
      <div className="absolute left-1/4 bottom-0 h-64 w-64 rounded-full bg-[var(--brand-accent)] opacity-[0.04] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Get In Touch"
          title="Let&apos;s Work Together"
          description="I'm always open to new opportunities, collaborations, and interesting conversations. Feel free to reach out through any of the channels below."
          icon={<MessageSquare className="h-5 w-5" />}
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactLinks.map(({ icon: Icon, label, value, href, description, color, bg, border }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className={`group relative flex flex-col gap-3 rounded-2xl border ${border} ${bg} p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg card-hover`}
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${border} ${bg} transition-transform duration-200 group-hover:scale-110`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">{label}</p>
                <p className="mt-0.5 text-xs text-[var(--text-secondary)] truncate">{value}</p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">{description}</p>
              </div>
              <ArrowUpRight className={`absolute right-4 top-4 h-4 w-4 ${color} opacity-0 transition-opacity group-hover:opacity-100`} />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-[var(--border-accent)] bg-gradient-to-br from-[var(--brand-accent)]/10 to-purple-600/5 p-8 text-center">
          <div className="mx-auto max-w-md">
            <div className="mb-4 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--brand-accent)]/10 border border-[var(--border-accent)]">
                <Send className="h-6 w-6 text-[var(--brand-accent)]" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)]">
              Have a project in mind?
            </h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              I&apos;m available for freelance projects, full-time positions, and interesting collaborations.
            </p>
            <a
              href={`mailto:${personal.email}`}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[var(--brand-accent)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--brand-accent)]/20 transition-all hover:bg-[var(--brand-lighter)] hover:shadow-[0_0_30px_rgba(79,110,247,0.4)]"
            >
              <Mail className="h-4 w-4" />
              Send Me an Email
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
