"use client";

import { useEffect, useState } from "react";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import type { Certification } from "@/data/certifications";

export function CredentialModal({
  cert,
  onClose,
}: {
  cert: Certification;
  onClose: () => void;
}) {
  const [zoom, setZoom] = useState(1);
  const [imgOk, setImgOk] = useState(true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[55] flex items-center justify-center bg-black/80 p-3">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${cert.code} certificate`}
        className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--panel-0)]"
      >
        <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] px-4 py-3">
          <div>
            <p className="font-mono text-sm text-[var(--cyan)]">
              {cert.code} · {cert.title}
            </p>
            <p className="font-mono text-[10px] text-[var(--green)]">
              VERIFIED / Online Verifiable
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://learn.microsoft.com/en-us/credentials/certifications/security-operations-analyst/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-[var(--border)] px-2 py-1 font-mono text-[10px] text-[var(--text-muted)] hover:border-[var(--cyan)]/40 hover:text-[var(--cyan)]"
            >
              Verify
            </a>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(z + 0.25, 2.5))}
              className="rounded border border-[var(--border)] p-1.5 text-[var(--text-muted)] hover:text-[var(--cyan)]"
              aria-label="Zoom in"
            >
              <ZoomIn size={16} />
            </button>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(z - 0.25, 0.75))}
              className="rounded border border-[var(--border)] p-1.5 text-[var(--text-muted)] hover:text-[var(--cyan)]"
              aria-label="Zoom out"
            >
              <ZoomOut size={16} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded p-1.5 text-[var(--text-muted)] hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cyan)]"
              aria-label="Close certificate modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4">
          {imgOk ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cert.imagePath}
              alt={`${cert.issuer} ${cert.title} certificate for Manikanta`}
              style={{ transform: `scale(${zoom})`, transformOrigin: "top center" }}
              className="mx-auto max-w-full transition-transform"
              onError={() => setImgOk(false)}
            />
          ) : (
            <div className="rounded border border-dashed border-[var(--border)] p-8 text-center">
              <p className="font-mono text-sm text-[var(--amber)]">
                Certificate image not found at {cert.imagePath}
              </p>
              <p className="mt-2 font-mono text-xs text-[var(--text-dim)]">
                Place sc-200-certificate.png in public/assets/ to enable preview.
              </p>
              <p className="mt-4 font-mono text-xs text-[var(--text-muted)]">
                {cert.issuer}: {cert.title} · Earned {cert.earned} · Expires{" "}
                {cert.expires}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
