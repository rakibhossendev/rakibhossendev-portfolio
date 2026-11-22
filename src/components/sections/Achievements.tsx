import { Trophy } from "lucide-react"
import { achievements } from "@/src/data/achievements"
import { AchievementCard } from "@/src/components/cards/AchievementCard"
import { SectionHeader } from "@/src/components/ui/SectionHeader"
import { Reveal } from "@/src/components/animations/Reveal"

export function Achievements() {
  return (
    <section id="achievements" className="section-padding relative bg-[var(--bg)]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border-accent)] to-transparent" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="Milestones"
            title="Achievements"
            description="Key moments of leadership, community engagement, and technical problem-solving milestones."
            icon={<Trophy className="h-5 w-5" />}
          />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {achievements.map((achievement, i) => (
            <Reveal key={achievement.id} delay={Math.min(i * 60, 400)} className="h-full">
              <AchievementCard achievement={achievement} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
