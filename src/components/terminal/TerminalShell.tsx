"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import { profile, type SectionId } from "@/data/profile";
import { useWorkstation } from "@/context/WorkstationContext";
import { searchPortfolio } from "@/lib/search";
import { TerminalPrompt } from "@/components/terminal/TerminalPrompt";
import {
  HOME,
  autocomplete,
  catFile,
  changeDir,
  listDir,
  promptPath,
} from "@/lib/filesystem";

type Line = { type: "in" | "out" | "err"; text: string };

const HELP = [
  "Portfolio terminal (frontend simulation — no real shell).",
  "",
  "Navigation:  help  clear  history  whoami  pwd  ls  cd  cat",
  "Sections:    home about projects soc recon assessment",
  "             certs tools github writeups contact recruiter",
  "GitHub:      github  github repos  github activity  github profile",
  "Other:       search <q>  ssh github",
  "",
  "Tab autocomplete · ↑↓ history · Esc close",
];

const SHORTCUTS: Record<string, SectionId> = {
  home: "home",
  about: "about",
  projects: "projects",
  profile: "about",
  soc: "soc",
  recon: "recon",
  assessment: "assessment",
  certs: "certs",
  certifications: "certs",
  tools: "tools",
  writeups: "writeups",
  contact: "contact",
};

export function TerminalShell() {
  const {
    terminalOpen,
    setTerminalOpen,
    setSection,
    cwd,
    setCwd,
    setRecruiterMode,
    setOpenCertModal,
  } = useWorkstation();
  const [lines, setLines] = useState<Line[]>([
    {
      type: "out",
      text: "Controlled website terminal — no real shell execution.",
    },
    { type: "out", text: 'Type "help" · Tab for autocomplete.' },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [value, setValue] = useState("");
  const [suggestIdx, setSuggestIdx] = useState(0);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = useMemo(() => autocomplete(value), [value]);
  const showSuggest = value.trim().length > 0 && suggestions.length > 0;

  useEffect(() => {
    if (terminalOpen) inputRef.current?.focus();
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

  const push = (extra: Line[]) => setLines((p) => [...p, ...extra]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    const prompt = promptPath(cwd);
    push([{ type: "in", text: `${prompt} ${cmd}` }]);
    setHistory((h) => [cmd, ...h.filter((x) => x !== cmd)].slice(0, 80));
    setHistIdx(-1);
    setValue("");

    const parts = cmd.split(/\s+/);
    const key = parts[0]?.toLowerCase() ?? "";
    const args = parts.slice(1);
    const arg = args.join(" ");

    if (key === "clear") {
      setLines([]);
      return;
    }
    if (key === "help") {
      push(HELP.map((t) => ({ type: "out" as const, text: t })));
      return;
    }
    if (key === "history") {
      if (!history.length) {
        push([{ type: "out", text: "(empty)" }]);
        return;
      }
      push(
        [...history].reverse().map((h, i) => ({
          type: "out" as const,
          text: ` ${i + 1}  ${h}`,
        })),
      );
      return;
    }
    if (key === "whoami") {
      push([
        { type: "out", text: "manikanta" },
        { type: "out", text: "Cybersecurity Analyst" },
      ]);
      return;
    }
    if (key === "pwd") {
      push([{ type: "out", text: cwd }]);
      return;
    }
    if (key === "ls") {
      let listCwd = cwd;
      if (args[0]) {
        const r = changeDir(cwd, args[0]);
        if (r.error) {
          push([{ type: "err", text: r.error.replace(/^cd:/, "ls:") }]);
          return;
        }
        listCwd = r.cwd;
      }
      const entries = listDir(listCwd);
      if (!entries) {
        push([{ type: "err", text: `ls: cannot access '${args[0] ?? "."}'` }]);
        return;
      }
      push(entries.map((e) => ({ type: "out" as const, text: e })));
      return;
    }
    if (key === "cd") {
      const r = changeDir(cwd, args[0] ?? HOME);
      if (r.error) {
        push([{ type: "err", text: r.error }]);
        return;
      }
      setCwd(r.cwd);
      if (r.section) setSection(r.section, { syncCwd: false });
      return;
    }
    if (key === "cat") {
      if (!args[0]) {
        push([{ type: "err", text: "usage: cat <file>" }]);
        return;
      }
      const r = catFile(cwd, args[0]);
      if (r.error) {
        push([{ type: "err", text: r.error }]);
        return;
      }
      push(r.lines.map((t) => ({ type: "out" as const, text: t })));
      if (r.section) setSection(r.section, { syncCwd: false });
      if (args[0].includes("SC-200")) setOpenCertModal(true);
      return;
    }
    if (key === "recruiter") {
      setRecruiterMode(true);
      setSection("home");
      push([
        { type: "out", text: "Entering recruiter mode…" },
        { type: "out", text: "Simplified professional overview enabled." },
      ]);
      return;
    }
    if (key === "search") {
      const q = arg;
      if (!q) {
        push([{ type: "err", text: "usage: search <query>" }]);
        return;
      }
      const results = searchPortfolio(q);
      if (!results.length) {
        push([{ type: "out", text: "No results." }]);
        return;
      }
      push(
        results.map((r) => ({
          type: "out" as const,
          text: `${r.category}: ${r.title}  (${r.hint})`,
        })),
      );
      return;
    }
    if (key === "ssh" && args[0]?.toLowerCase() === "github") {
      setSection("github");
      push([
        {
          type: "out",
          text: "Connecting… (website abstraction — not real SSH)",
        },
        { type: "out", text: "✓ Connected to public profile abstraction" },
        { type: "out", text: "→ ~/github" },
      ]);
      return;
    }
    if (key === "github") {
      setSection("github");
      const mode = args[0]?.toLowerCase() || "status";
      push([
        { type: "out", text: `github --${mode}` },
        { type: "out", text: "● CONNECTED (public API)" },
        { type: "out", text: "→ Navigating to ~/github" },
      ]);
      return;
    }
    if (SHORTCUTS[key]) {
      setSection(SHORTCUTS[key]);
      push([{ type: "out", text: `→ ${SHORTCUTS[key]}` }]);
      return;
    }
    push([
      { type: "err", text: `command not found: ${key}` },
      { type: "out", text: 'Type "help" for available commands.' },
    ]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && showSuggest) {
      e.preventDefault();
      const pick = suggestions[suggestIdx] ?? suggestions[0];
      if (pick) setValue(pick);
      return;
    }
    if (e.key === "ArrowDown" && showSuggest) {
      e.preventDefault();
      setSuggestIdx((i) => Math.min(i + 1, suggestions.length - 1));
      return;
    }
    if (e.key === "ArrowUp" && showSuggest && histIdx < 0) {
      // Prefer suggestion nav when suggestions visible and not browsing history
      e.preventDefault();
      setSuggestIdx((i) => Math.max(i - 1, 0));
      return;
    }
    if (e.key === "Enter") {
      if (showSuggest && e.shiftKey) {
        const pick = suggestions[suggestIdx];
        if (pick) {
          setValue(pick);
          return;
        }
      }
      run(value);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      if (history[next]) {
        setHistIdx(next);
        setValue(history[next]);
      }
      return;
    }
    if (e.key === "ArrowDown") {
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
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/55 p-3 sm:items-center">
      <div
        role="dialog"
        aria-label="Terminal"
        className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-0)] shadow-[0_0_40px_rgba(34,211,238,0.12)]"
      >
        <div className="scanline pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative flex items-center justify-between border-b border-[var(--border)] px-3 py-2">
          <span className="font-mono text-xs text-[var(--cyan)]">
            terminal@{profile.name.toLowerCase()} — simulation
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
        <div className="relative flex-1 space-y-1 overflow-y-auto p-3 font-mono text-xs leading-5 sm:text-[13px]">
          {lines.map((l, i) => (
            <div
              key={`${i}-${l.text.slice(0, 24)}`}
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
        <div className="relative border-t border-[var(--border)] p-3">
          {showSuggest && (
            <ul
              className="mb-2 max-h-28 overflow-y-auto rounded border border-[var(--border)] bg-[var(--panel-0)] py-1"
              role="listbox"
              aria-label="Command suggestions"
            >
              {suggestions.map((s, i) => (
                <li key={s}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={i === suggestIdx}
                    className={`block w-full px-3 py-1 text-left font-mono text-xs ${
                      i === suggestIdx
                        ? "bg-[var(--cyan)]/15 text-[var(--cyan)]"
                        : "text-[var(--text-muted)]"
                    }`}
                    onMouseEnter={() => setSuggestIdx(i)}
                    onClick={() => setValue(s)}
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          )}
          <TerminalPrompt
            ref={inputRef}
            value={value}
            onChange={(v) => {
              setValue(v);
              setSuggestIdx(0);
            }}
            onKeyDown={onKeyDown}
            promptOverride={promptPath(cwd)}
          />
        </div>
      </div>
    </div>
  );
}
