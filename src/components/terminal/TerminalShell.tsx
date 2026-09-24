"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { profile, type SectionId } from "@/data/profile";
import { useWorkstation } from "@/context/WorkstationContext";
import { searchPortfolio } from "@/lib/search";
import { TerminalPrompt } from "@/components/terminal/TerminalPrompt";

type Line = { type: "in" | "out" | "err"; text: string };

const HELP = [
  "Available commands:",
  "  help, home, about, projects, soc, recon, assessment,",
  "  certs, tools, github, writeups, contact, clear",
  "  github repos | github activity | github profile",
  "  search <query>",
  "  ssh github   (site abstraction — not a real SSH session)",
];

const CMD_TO_SECTION: Record<string, SectionId> = {
  home: "home",
  about: "about",
  projects: "projects",
  soc: "soc",
  recon: "recon",
  assessment: "assessment",
  certs: "certs",
  certifications: "certs",
  tools: "tools",
  github: "github",
  writeups: "writeups",
  contact: "contact",
};

export function TerminalShell() {
  const { terminalOpen, setTerminalOpen, setSection } = useWorkstation();
  const [lines, setLines] = useState<Line[]>([
    { type: "out", text: "Controlled website terminal — no real shell execution." },
    { type: "out", text: 'Type "help" for commands.' },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [value, setValue] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalOpen) {
      inputRef.current?.focus();
    }
  }, [terminalOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [lines]);

  useEffect(() => {
    if (!terminalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTerminalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [terminalOpen, setTerminalOpen]);

  if (!terminalOpen) return null;

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    setLines((prev) => [...prev, { type: "in", text: `${profile.prompt} ${cmd}` }]);
    setHistory((h) => [cmd, ...h.filter((x) => x !== cmd)].slice(0, 50));
    setHistIdx(-1);
    setValue("");

    const [head, ...rest] = cmd.split(/\s+/);
    const arg = rest.join(" ").toLowerCase();
    const key = head.toLowerCase();

    if (key === "clear") {
      setLines([]);
      return;
    }
    if (key === "help") {
      setLines((p) => [...p, ...HELP.map((t) => ({ type: "out" as const, text: t }))]);
      return;
    }
    if (key === "search") {
      const q = rest.join(" ");
      const results = searchPortfolio(q);
      if (!q) {
        setLines((p) => [...p, { type: "err", text: "usage: search <query>" }]);
        return;
      }
      if (!results.length) {
        setLines((p) => [...p, { type: "out", text: "No results." }]);
        return;
      }
      setLines((p) => [
        ...p,
        ...results.map((r) => ({
          type: "out" as const,
          text: `${r.category}: ${r.title}  (${r.hint})`,
        })),
      ]);
      return;
    }
    if (key === "ssh" && arg === "github") {
      setSection("github");
      setLines((p) => [
        ...p,
        { type: "out", text: "Connecting... (website abstraction — not real SSH)" },
        { type: "out", text: "✓ Connected to public profile abstraction" },
        { type: "out", text: "root@github:~$ ls repositories" },
        { type: "out", text: "→ Opening GitHub panel" },
      ]);
      return;
    }
    if (key === "github") {
      setSection("github");
      const mode = arg || "status";
      setLines((p) => [
        ...p,
        { type: "out", text: `github --${mode}` },
        { type: "out", text: "● CONNECTED (public API)" },
        { type: "out", text: "→ Navigating to ~/github" },
      ]);
      return;
    }
    if (CMD_TO_SECTION[key]) {
      setSection(CMD_TO_SECTION[key]);
      setLines((p) => [
        ...p,
        { type: "out", text: `→ cd ${CMD_TO_SECTION[key]}` },
      ]);
      return;
    }
    setLines((p) => [
      ...p,
      { type: "err", text: `command not found: ${head}` },
      { type: "out", text: 'Type "help" for available commands.' },
    ]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(value);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      if (history[next]) {
        setHistIdx(next);
        setValue(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = histIdx - 1;
      if (next < 0) {
        setHistIdx(-1);
        setValue("");
      } else {
        setHistIdx(next);
        setValue(history[next]);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-3 sm:items-center">
      <div
        role="dialog"
        aria-label="Terminal"
        className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-0)] shadow-[0_0_40px_rgba(34,211,238,0.1)]"
      >
        <div className="flex items-center justify-between border-b border-[var(--border)] px-3 py-2">
          <span className="font-mono text-xs text-[var(--cyan)]">
            terminal — controlled UI
          </span>
          <button
            type="button"
            onClick={() => setTerminalOpen(false)}
            className="rounded p-1 text-[var(--text-muted)] hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)]"
            aria-label="Close terminal"
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex-1 space-y-1 overflow-y-auto p-3 font-mono text-xs leading-5 sm:text-[13px]">
          {lines.map((l, i) => (
            <div
              key={`${i}-${l.text.slice(0, 12)}`}
              className={
                l.type === "in"
                  ? "text-[var(--green)]"
                  : l.type === "err"
                    ? "text-[var(--critical)]"
                    : "text-[var(--text-muted)]"
              }
            >
              {l.text}
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <div className="border-t border-[var(--border)] p-3">
          <TerminalPrompt
            ref={inputRef}
            value={value}
            onChange={setValue}
            onKeyDown={onKeyDown}
          />
        </div>
      </div>
    </div>
  );
}
