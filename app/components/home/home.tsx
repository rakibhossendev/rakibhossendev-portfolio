"use client";

import { HomeDataType } from "@/app/Typescript/home";
import { use } from "react";

import DecayCard from "./DecayCard";
import SplashCursor from "./SplashCursor";

interface HomeDataTypeProps {
  homeData: Promise<HomeDataType>;
}

export default function HomePageComponent({
  homeData,
}: HomeDataTypeProps) {
  const data = use(homeData);

  return (
    <section className="relative min-h-screen overflow-hidden px-6 pt-28 md:px-10 lg:px-16">

      {/* =========================
          Splash Cursor
         ========================= */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <SplashCursor
          DENSITY_DISSIPATION={3.5}
          VELOCITY_DISSIPATION={2}
          PRESSURE={0.1}
          CURL={3}
          SPLAT_RADIUS={0.2}
          SPLAT_FORCE={6000}
          COLOR_UPDATE_SPEED={10}
          SHADING
          RAINBOW_MODE={false}
          COLOR="#A855F7"
        />
      </div>

      {/* Decorative elements */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[8%] top-[30%] z-0 h-32 w-32 rounded-full border border-[var(--border)] opacity-40"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[15%] right-[10%] z-0 h-24 w-24 rounded-full border border-[var(--primary)] opacity-20"
      />

      {/* =========================
          Content
         ========================= */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl items-center">

        <div className="grid w-full items-center gap-16 lg:grid-cols-[1fr_0.8fr] lg:gap-20">

          {/* =========================
              LEFT — Content
             ========================= */}
          <div className="home-content relative z-10 max-w-3xl">

            {/* Availability */}
            <div className="home-item mb-7 inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--success)] opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--success)]" />
              </span>

              <span className="text-sm font-medium text-[var(--text-secondary)]">
                Available for opportunities
              </span>
            </div>

            {/* Heading */}
            <h1 className="home-item text-5xl font-bold tracking-tight text-[var(--text-primary)] sm:text-6xl lg:text-7xl">
              Hi, I&apos;m{" "}
              <span className="relative inline-block text-[var(--primary)]">
                {data.name}

                <span className="absolute -bottom-2 left-0 h-1 w-1/2 rounded-full bg-[var(--primary)]" />
              </span>
            </h1>

            {/* Role */}
            <h2 className="home-item mt-6 text-2xl font-semibold text-[var(--text-secondary)] sm:text-3xl">
              {data.role}
            </h2>

            {/* Specialization */}
            <p className="home-item mt-3 text-lg font-medium text-[var(--primary-hover)]">
              {data.specialization}
            </p>

            {/* Description */}
            <p className="home-item mt-6 max-w-2xl text-base leading-8 text-[var(--text-muted)] sm:text-lg">
              {data.description}
            </p>

            {/* CTA */}
            <div className="home-item mt-9 flex flex-wrap items-center gap-4">

              <a
                href="#projects"
                className="group inline-flex items-center gap-3 rounded-xl bg-[var(--primary)] px-6 py-3.5 font-semibold text-[var(--primary-foreground)] transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[var(--primary-hover)] hover:shadow-[0_12px_35px_var(--primary-glow-strong)]"
              >
                View My Work

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-3.5 font-semibold text-[var(--text-secondary)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[var(--border-hover)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
              >
                Let&apos;s Talk
              </a>

            </div>

            {/* Tech Stack */}
            <div className="home-item mt-12">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-subtle)]">
                Working with
              </p>

              <div className="flex flex-wrap gap-3">
                {[
                  "TypeScript",
                  "React",
                  "Next.js",
                  "Flask",
                  "Tailwind CSS",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-sm font-medium text-[var(--text-secondary)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)] hover:text-[var(--primary-hover)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* =========================
              RIGHT — Image
             ========================= */}
          <div className="home-image relative z-10 flex justify-center lg:justify-end">

            {/* Glow */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 m-auto h-64 w-64 rounded-full bg-[var(--primary-glow)] opacity-60"
            />

            {/* Decorative ring */}
            <div
              aria-hidden="true"
              className="absolute -inset-5 rounded-[2rem] border border-[var(--primary)] opacity-10"
            />

            <div className="relative transition-transform duration-500 ease-out hover:-translate-y-2">

              <DecayCard
                width={300}
                height={400}
                image={data.image}
                baseFrequency={0.015}
                numOctaves={5}
                seed={4}
                maxDisplacement={15}
                movementBound={30}
              >
                <div className="flex h-full items-end p-6">
                  <div>
                    <p className="text-sm font-medium text-white/70">
                      Software Developer
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-white">
                      Rakib
                      <br />
                      Hossen
                    </h2>
                  </div>
                </div>
              </DecayCard>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}