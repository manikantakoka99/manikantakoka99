"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/profile";
import { useWorkstation } from "@/context/WorkstationContext";
import { HeroWorkstation } from "@/components/hero/HeroWorkstation";

export function HeroTerminal() {
  const { setSection } = useWorkstation();
  const reduce = useReducedMotion();
  const githubUrl = `https://github.com/${profile.contact.githubUsername}`;

  return (
    <section
      id="section-home"
      className="relative scroll-mt-16 overflow-hidden border-b border-[var(--border)]"
      aria-labelledby="hero-heading"
    >
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-2 lg:py-16">
        <div>
          <p className="font-mono text-xs text-[var(--green)]">
            {profile.prompt} whoami
          </p>
          <h1
            id="hero-heading"
            className="mt-4 font-mono text-4xl font-semibold tracking-tight text-[var(--text)] sm:text-5xl"
          >
            <span className="text-[var(--cyan)]">MANIKANTA</span>
            <motion.span
              className="inline-block text-[var(--cyan)]"
              animate={reduce ? undefined : { opacity: [1, 0, 1] }}
              transition={{ duration: 1.1, repeat: Infinity }}
            >
              _
            </motion.span>
          </h1>
          <p className="mt-3 font-mono text-sm tracking-[0.18em] text-[var(--text-muted)]">
            CYBERSECURITY ANALYST
          </p>
          <p className="mt-3 font-mono text-xs text-[var(--cyan)]/90">
            {profile.specialties.join(" | ")}
          </p>
          <p className="mt-6 max-w-xl text-lg text-[var(--text)]">{profile.tagline}</p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--text-muted)]">
            {profile.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setSection("projects")}
              className="rounded border border-[var(--cyan)]/50 bg-[var(--cyan)]/10 px-4 py-2.5 font-mono text-xs tracking-wider text-[var(--cyan)] transition hover:bg-[var(--cyan)]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)]"
            >
              VIEW PROJECTS
            </button>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-[var(--border)] px-4 py-2.5 font-mono text-xs tracking-wider text-[var(--text-muted)] transition hover:border-[var(--cyan)]/40 hover:text-[var(--cyan)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)]"
            >
              GITHUB
            </a>
            <a
              href={profile.assets.resume}
              className="rounded border border-[var(--border)] px-4 py-2.5 font-mono text-xs tracking-wider text-[var(--text-muted)] transition hover:border-[var(--amber)]/40 hover:text-[var(--amber)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)]"
              title="Resume PDF — placeholder if not yet uploaded"
            >
              RESUME
            </a>
          </div>
        </div>
        <HeroWorkstation />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-12">
        <h2 className="font-mono text-xs tracking-[0.25em] text-[var(--text-dim)]">
          SECURITY OPERATIONS
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {profile.dashboardCards.map((card) => (
            <div
              key={card.id}
              className="rounded border border-[var(--border)] bg-[var(--panel-1)]/80 px-3 py-3"
            >
              <p className="font-mono text-[11px] text-[var(--text-muted)]">{card.title}</p>
              <p className="mt-2 flex items-center gap-2 font-mono text-xs text-[var(--green)]">
                <span className="status-led h-1.5 w-1.5 rounded-full bg-[var(--green)]" />
                {card.status}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {profile.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded border border-[var(--border)] bg-[var(--panel-0)] px-4 py-4"
            >
              <p className="font-mono text-2xl text-[var(--cyan)]">{m.value}</p>
              <p className="mt-1 font-mono text-[11px] text-[var(--text-muted)]">{m.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded border border-[var(--border)] bg-[var(--panel-0)] p-4">
          <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--text-dim)]">
            CURRENT FOCUS
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {profile.focus.map((f) => (
              <li key={f} className="font-mono text-sm text-[var(--text-muted)]">
                <span className="text-[var(--cyan)]">›</span> {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
