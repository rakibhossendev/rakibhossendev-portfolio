"use client"

import { useState } from "react"
import { Mail, Send, ArrowUpRight, Shield, User, AtSign, MessageSquare, PenLine } from "lucide-react"
import { GithubIcon, LinkedinIcon} from "@/src/components/ui/SocialIcons"
import { personal } from "@/src/data/personal"
import { SectionHeader } from "@/src/components/ui/SectionHeader"

const contactLinks = [
  {
    icon: Mail,
    label: "Direct Email",
    value: personal.email,
    href: `mailto:${personal.email}`,
    color: "text-[#EA4335]",
    bg: "bg-[#EA4335]/10",
    border: "border-[#EA4335]/25",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn Professional",
    value: "linkedin.com/in/rakib-hossendev",
    href: personal.linkedin,
    color: "text-[#0A66C2]",
    bg: "bg-[#0A66C2]/10",
    border: "border-[#0A66C2]/25",
  },
  {
    icon: GithubIcon,
    label: "GitHub Repositories",
    value: "github.com/rakibhossendev",
    href: personal.github,
    color: "text-[var(--text-primary)]",
    bg: "bg-white/5",
    border: "border-[var(--border-subtle)]",
  },
]

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [sent, setSent] = useState(false)

  // Builds a mailto link prefilled with the form, addressed to personal.email
  const buildMailtoUrl = () => {
    const subject = formData.subject.trim() || "Portfolio Contact"
    const body = [
      `Name: ${formData.name.trim()}`,
      `Email: ${formData.email.trim()}`,
      "",
      formData.message.trim(),
    ].join("\r\n")
    return `mailto:${personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Hand the prefilled draft to the visitor's mail app — they press Send there
    window.location.href = buildMailtoUrl()
    setSent(true)
    setTimeout(() => setSent(false), 8000)
  }

  return (
    <section id="contact" className="section-padding relative bg-[var(--bg-secondary)]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border-accent)] to-transparent" />
      <div className="absolute left-1/4 bottom-0 h-64 w-64 rounded-full bg-[var(--brand-accent)] opacity-[0.04] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Get In Touch"
          title="Let's Work Together"
          description="I'm always open to new opportunities, collaborations, and interesting conversations."
          icon={<MessageSquare className="h-5 w-5" />}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left — Info */}
          <div>
            <h3 className="text-2xl font-bold text-[var(--text-primary)] leading-tight">
              Let&apos;s build something<br />
              <span className="text-shimmer">amazing together.</span>
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
              I am open to freelance projects, full-time positions, and interesting
              collaborations. Whether you have a project in mind or just want to connect,
              feel free to reach out through any of the channels below.
            </p>

            {/* Contact links */}
            <div className="mt-8 flex flex-col gap-4">
              {contactLinks.map(({ icon: Icon, label, value, href, color, bg, border }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-4 rounded-xl border ${border} ${bg} p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg card-hover`}
                >
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${border} ${bg}`}>
                    <Icon className={`h-5 w-5 ${color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                      {label}
                    </p>
                    <p className="mt-0.5 truncate text-sm font-semibold text-[var(--text-primary)]">
                      {value}
                    </p>
                  </div>
                  <ArrowUpRight className={`ml-auto h-4 w-4 shrink-0 ${color} opacity-0 transition-opacity group-hover:opacity-100`} />
                </a>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="rounded-2xl border border-[var(--border-accent)] bg-[var(--bg-card)] p-6 sm:p-8 shadow-[0_0_40px_rgba(79,110,247,0.06)]">
            {/* Form header */}
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand-accent)]/10 border border-[var(--border-accent)]">
                <Shield className="h-4 w-4 text-[var(--brand-accent)]" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
                Send Secure Message
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                  Your Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] py-3 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--border-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]/30 transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                  Your Email
                </label>
                <div className="relative">
                  <AtSign className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] py-3 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--border-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]/30 transition-colors"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="contact-subject" className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                  Subject
                </label>
                <div className="relative">
                  <PenLine className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    placeholder="Project inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))}
                    className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] py-3 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--border-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]/30 transition-colors"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  placeholder="Describe your project, job opening, or just say hi..."
                  value={formData.message}
                  onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                  className="w-full resize-none rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--border-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]/30 transition-colors"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group mt-1 flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[var(--brand-accent)] to-purple-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-[var(--brand-accent)]/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(79,110,247,0.4)] hover:brightness-110"
              >
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                Transmit Message
              </button>

              {/* Success notice — mail app handed the prefilled draft */}
              {sent && (
                <div className="rounded-xl border border-emerald-400/25 bg-emerald-500/10 p-4">
                  <p className="text-sm font-semibold text-emerald-400">
                    ✓ Mail app opened
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                    Your email is drafted and addressed to{" "}
                    <span className="font-semibold text-[var(--text-primary)]">{personal.email}</span>.
                    Review it and press <span className="font-semibold text-[var(--text-primary)]">Send</span> to
                    deliver your message.
                  </p>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">
                    Nothing opened?{" "}
                    <a
                      href={buildMailtoUrl()}
                      className="font-semibold text-[var(--brand-accent)] underline underline-offset-2 hover:text-[var(--text-primary)] transition-colors"
                    >
                      Click here to open the prefilled email
                    </a>
                    , or email directly at{" "}
                    <a
                      href={`mailto:${personal.email}`}
                      className="font-semibold text-[var(--brand-accent)] underline underline-offset-2 hover:text-[var(--text-primary)] transition-colors"
                    >
                      {personal.email}
                    </a>
                    .
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
