"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { type SectionId } from "@/data/profile";
import {
  HOME,
  SECTION_CWD,
  displayPath,
  promptPath,
} from "@/lib/filesystem";

type WorkstationContextValue = {
  section: SectionId;
  setSection: (id: SectionId, opts?: { syncCwd?: boolean }) => void;
  cwd: string;
  setCwd: (path: string) => void;
  path: string;
  prompt: string;
  booted: boolean;
  setBooted: (v: boolean) => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (v: boolean) => void;
  paletteOpen: boolean;
  setPaletteOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  terminalOpen: boolean;
  setTerminalOpen: (v: boolean) => void;
  recruiterMode: boolean;
  setRecruiterMode: (v: boolean) => void;
  resumeAvailable: boolean;
  openCertModal: boolean;
  setOpenCertModal: (v: boolean) => void;
};

const WorkstationContext = createContext<WorkstationContextValue | null>(null);

const BOOT_KEY = "manikanta-portfolio-booted";

function readBooted(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return Boolean(localStorage.getItem(BOOT_KEY));
  } catch {
    return false;
  }
}

export function WorkstationProvider({ children }: { children: ReactNode }) {
  const [section, setSectionState] = useState<SectionId>("home");
  const [cwd, setCwd] = useState(HOME);
  const [booted, setBootedState] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [resumeAvailable, setResumeAvailable] = useState(false);
  const [openCertModal, setOpenCertModal] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      setBootedState(readBooted());
      setHydrated(true);
    });
    return () => window.cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/assets/resume.pdf", { method: "HEAD" });
        if (!cancelled) setResumeAvailable(res.ok);
      } catch {
        if (!cancelled) setResumeAvailable(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const setBooted = useCallback((v: boolean) => {
    setBootedState(v);
    if (v) {
      try {
        localStorage.setItem(BOOT_KEY, "1");
      } catch {
        /* ignore */
      }
    }
  }, []);

  const setSection = useCallback(
    (id: SectionId, opts?: { syncCwd?: boolean }) => {
      setSectionState(id);
      setMobileNavOpen(false);
      if (opts?.syncCwd !== false) {
        setCwd(SECTION_CWD[id] ?? HOME);
      }
      const el = document.getElementById(`section-${id}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const path = useMemo(() => displayPath(cwd), [cwd]);
  const prompt = useMemo(() => promptPath(cwd), [cwd]);

  const value = useMemo(
    () => ({
      section,
      setSection,
      cwd,
      setCwd,
      path,
      prompt,
      booted: hydrated ? booted : true,
      setBooted,
      mobileNavOpen,
      setMobileNavOpen,
      paletteOpen,
      setPaletteOpen,
      searchOpen,
      setSearchOpen,
      terminalOpen,
      setTerminalOpen,
      recruiterMode,
      setRecruiterMode,
      resumeAvailable,
      openCertModal,
      setOpenCertModal,
    }),
    [
      section,
      setSection,
      cwd,
      path,
      prompt,
      booted,
      hydrated,
      setBooted,
      mobileNavOpen,
      paletteOpen,
      searchOpen,
      terminalOpen,
      recruiterMode,
      resumeAvailable,
      openCertModal,
    ],
  );

  return (
    <WorkstationContext.Provider value={value}>
      {children}
    </WorkstationContext.Provider>
  );
}

export function useWorkstation() {
  const ctx = useContext(WorkstationContext);
  if (!ctx) {
    throw new Error("useWorkstation must be used within WorkstationProvider");
  }
  return ctx;
}
