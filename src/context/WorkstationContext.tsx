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
import { navItems, type SectionId } from "@/data/profile";

type WorkstationContextValue = {
  section: SectionId;
  setSection: (id: SectionId) => void;
  path: string;
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
  const [booted, setBootedState] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      setBootedState(readBooted());
      setHydrated(true);
    });
    return () => window.cancelAnimationFrame(id);
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

  const setSection = useCallback((id: SectionId) => {
    setSectionState(id);
    setMobileNavOpen(false);
    const el = document.getElementById(`section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

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

  const path = useMemo(
    () => navItems.find((n) => n.id === section)?.path ?? "~/home",
    [section],
  );

  const value = useMemo(
    () => ({
      section,
      setSection,
      path,
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
    }),
    [
      section,
      setSection,
      path,
      booted,
      hydrated,
      setBooted,
      mobileNavOpen,
      paletteOpen,
      searchOpen,
      terminalOpen,
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
