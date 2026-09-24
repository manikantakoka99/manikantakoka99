"use client";

import { forwardRef } from "react";
import { profile } from "@/data/profile";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  promptOverride?: string;
};

export const TerminalPrompt = forwardRef<HTMLInputElement, Props>(
  function TerminalPrompt({ value, onChange, onKeyDown, promptOverride }, ref) {
    return (
      <label className="flex items-center gap-2 font-mono text-xs sm:text-sm">
        <span className="shrink-0 text-[var(--green)]">
          {promptOverride ?? profile.prompt}
        </span>
        <span className="relative flex min-w-0 flex-1 items-center">
          <input
            ref={ref}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            className="w-full bg-transparent text-[var(--text)] outline-none"
            aria-label="Terminal command input"
            autoComplete="off"
            spellCheck={false}
          />
          {!value && (
            <span
              className="pointer-events-none absolute left-0 h-4 w-2 animate-pulse bg-[var(--cyan)]"
              aria-hidden
            />
          )}
        </span>
      </label>
    );
  },
);
