"use client";

import { Mail, FolderGit, Link as LinkIcon } from "lucide-react";
import { profile } from "@/data/profile";

export function ContactTerminal() {
  const { githubUsername, linkedin, email } = profile.contact;

  const channels = [
    {
      label: "GitHub",
      value: githubUsername ? `@${githubUsername}` : "Not configured",
      href: githubUsername ? `https://github.com/${githubUsername}` : undefined,
      icon: FolderGit,
    },
    {
      label: "LinkedIn",
      value: linkedin || "Not configured",
      href: linkedin || undefined,
      icon: LinkIcon,
    },
    {
      label: "Email",
      value: email || "Not configured",
      href: email ? `mailto:${email}` : undefined,
      icon: Mail,
    },
  ];

  return (
    <section
      id="section-contact"
      className="scroll-mt-16 border-b border-[var(--border)] px-4 py-12"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs text-[var(--green)]">
          root@manikanta:~$ contact
        </p>
        <h2
          id="contact-heading"
          className="mt-2 font-mono text-2xl text-[var(--text)]"
        >
          Contact
        </h2>
        <p className="mt-2 text-sm text-[var(--text-muted)]">Available channels:</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {channels.map((c) => {
            const Icon = c.icon;
            const inner = (
              <div className="flex items-start gap-3 rounded border border-[var(--border)] bg-[var(--panel-0)] p-4 transition hover:border-[var(--cyan)]/40">
                <Icon size={18} className="mt-0.5 text-[var(--cyan)]" />
                <div>
                  <p className="font-mono text-xs text-[var(--text-dim)]">{c.label}</p>
                  <p className="mt-1 break-all font-mono text-sm text-[var(--text-muted)]">
                    {c.value}
                  </p>
                </div>
              </div>
            );
            return (
              <li key={c.label}>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)]"
                  >
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
