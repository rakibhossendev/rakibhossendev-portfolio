"use client";

import { useState } from "react";
import Link from "next/link";
import "@/styles/animation.css";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full px-4 pt-4 sm:px-6">
      <nav
        className="
          navbar-entrance
          mx-auto flex h-16 max-w-6xl items-center justify-between
          rounded-2xl border border-[var(--border)]
          bg-[rgba(9,9,11,0.75)]
          px-4 shadow-2xl shadow-black/20
          backdrop-blur-xl
          sm:px-6
        "
      >
        {/* Logo */}
        <Link
          href="/"
          className="group relative flex items-center gap-2"
          onClick={() => setIsOpen(false)}
        >
          <span
            className="
              relative flex h-9 w-9 items-center justify-center
              overflow-hidden rounded-xl
              bg-[var(--primary)]
              text-sm font-black text-white
              shadow-lg shadow-[var(--primary-glow)]
              transition-all duration-300
              group-hover:scale-105
              group-hover:shadow-xl
              group-hover:shadow-[var(--primary-glow-strong)]
            "
          >
            R
          </span>

          <span className="hidden text-base font-bold tracking-tight text-[var(--text-primary)] sm:block">
            Rakib<span className="text-[var(--primary)]"> Hossen</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="nav-link group relative rounded-lg px-4 py-2 text-sm font-medium text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--text-primary)]"
            >
              <span className="relative z-10">{item.name}</span>

              {/* Hover background */}
              <span
                className="
                  absolute inset-0 -z-0 rounded-lg
                  bg-[var(--primary-glow)]
                  opacity-0
                  scale-90
                  transition-all duration-300
                  group-hover:scale-100
                  group-hover:opacity-100
                "
              />

              {/* Animated underline */}
              <span
                className="
                  absolute bottom-1 left-1/2 h-px w-0
                  -translate-x-1/2
                  bg-[var(--primary)]
                  shadow-[0_0_8px_var(--primary)]
                  transition-all duration-300
                  group-hover:w-1/2
                "
              />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="#contact"
          className="
            nav-cta hidden items-center gap-2
            rounded-xl border border-[var(--primary)]
            bg-[var(--primary)]
            px-4 py-2.5
            text-sm font-semibold text-white
            shadow-lg shadow-[var(--primary-glow)]
            transition-all duration-300
            hover:-translate-y-0.5
            hover:bg-[var(--primary-hover)]
            hover:shadow-xl
            hover:shadow-[var(--primary-glow-strong)]
            active:translate-y-0
            md:flex
          "
        >
          <span>Hire Me</span>

          <svg
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h14m-6-6 6 6-6 6"
            />
          </svg>
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className="
            relative flex h-10 w-10 items-center justify-center
            rounded-xl border border-[var(--border)]
            bg-[var(--surface)]
            text-[var(--text-primary)]
            transition-all duration-300
            hover:border-[var(--border-hover)]
            hover:bg-[var(--surface-hover)]
            md:hidden
          "
        >
          <span
            className={`hamburger-line absolute h-px w-5 bg-current transition-all duration-300 ${
              isOpen ? "rotate-45" : "-translate-y-1.5"
            }`}
          />

          <span
            className={`hamburger-line absolute h-px w-5 bg-current transition-all duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />

          <span
            className={`hamburger-line absolute h-px w-5 bg-current transition-all duration-300 ${
              isOpen ? "-rotate-45" : "translate-y-1.5"
            }`}
          />
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`
          mx-auto mt-2 max-w-6xl overflow-hidden
          rounded-2xl border border-[var(--border)]
          bg-[rgba(9,9,11,0.92)]
          shadow-2xl shadow-black/30
          backdrop-blur-xl
          transition-all duration-500
          md:hidden
          ${
            isOpen
              ? "max-h-[420px] translate-y-0 opacity-100"
              : "pointer-events-none max-h-0 -translate-y-3 opacity-0"
          }
        `}
      >
        <div className="flex flex-col p-3">
          {navItems.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`
                mobile-nav-item
                rounded-xl px-4 py-3.5
                text-sm font-medium
                text-[var(--text-muted)]
                transition-all duration-300
                hover:bg-[var(--primary-glow)]
                hover:pl-6
                hover:text-[var(--text-primary)]
              `}
              style={{
                animationDelay: `${index * 60}ms`,
              }}
            >
              <span className="flex items-center justify-between">
                {item.name}

                <span className="text-[var(--primary)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  →
                </span>
              </span>
            </Link>
          ))}

          <Link
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="
              mt-2 flex items-center justify-center
              rounded-xl bg-[var(--primary)]
              px-4 py-3.5
              text-sm font-semibold text-white
              shadow-lg shadow-[var(--primary-glow)]
              transition-all duration-300
              hover:bg-[var(--primary-hover)]
              hover:shadow-xl
            "
          >
            Hire Me
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;