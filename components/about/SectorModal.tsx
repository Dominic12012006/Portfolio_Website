"use client";

import React, { useEffect, useRef } from "react";
import { AboutSection } from "@/data/aboutSections";

interface SectorModalProps {
  section: AboutSection | null;
  onClose: () => void;
}

export default function SectorModal({ section, onClose }: SectorModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<Element | null>(null);

  useEffect(() => {
    if (!section) return;

    // Capture element that opened the modal to restore focus on dismiss
    previousActiveElement.current = document.activeElement;

    // Focus close button on mount for accessibility
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (previousActiveElement.current && "focus" in previousActiveElement.current) {
        (previousActiveElement.current as HTMLElement).focus();
      }
    };
  }, [section, onClose]);

  if (!section) return null;

  // Split description into distinct paragraphs or structured achievement items
  const paragraphs = section.description
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  const isMilestones = section.id === "milestones";

  return (
    <div
      role="presentation"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-fadeIn"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sector-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl sm:max-w-2xl bg-[#0c0c0f]/95 border border-white/12 rounded-2xl p-5 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.95),_0_0_30px_rgba(212,155,106,0.15)] flex flex-col max-h-[85vh] text-left animate-scaleUp"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs sm:text-sm text-accent tracking-widest uppercase font-semibold">
              {section.index} / {section.shortCode}
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          </div>

          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close sector details modal"
            className="font-mono text-xs text-muted/80 hover:text-accent uppercase transition-colors px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] flex items-center gap-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          >
            <span>✕</span>
            <span className="text-[10px] text-muted/60 tracking-wider">ESC</span>
          </button>
        </div>

        {/* Title & Tagline */}
        <div className="pt-3 pb-1">
          <h2
            id="sector-modal-title"
            className="text-xl sm:text-2xl font-light tracking-wide text-foreground uppercase"
          >
            {section.title}
          </h2>
          <p className="text-xs sm:text-sm font-mono text-accent/90 italic mt-1">
            {section.tagline}
          </p>
        </div>

        {/* Detailed Body Content */}
        <div className="my-3 flex-1 overflow-y-auto pr-1 sm:pr-2 space-y-3 max-h-[50vh] text-muted/95 text-sm sm:text-base leading-relaxed">
          {isMilestones ? (
            <div className="space-y-3">
              {paragraphs.map((p, idx) => {
                if (idx === 0) {
                  return (
                    <p key={idx} className="text-foreground/80 font-mono text-xs uppercase tracking-wider pb-1">
                      {p}
                    </p>
                  );
                }
                const lines = p.split("\n");
                const awardTitle = lines[0];
                const awardDesc = lines.slice(1).join(" ");
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-white/8 bg-white/[0.02] hover:border-accent/30 transition-colors"
                  >
                    <div className="font-mono text-xs sm:text-sm font-semibold text-accent tracking-wide uppercase">
                      {awardTitle}
                    </div>
                    {awardDesc && (
                      <p className="text-xs sm:text-sm text-muted/90 pt-1 leading-relaxed">
                        {awardDesc}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            paragraphs.map((p, idx) => (
              <p key={idx} className="text-sm sm:text-base text-muted/90 leading-relaxed">
                {p}
              </p>
            ))
          )}
        </div>

        {/* Footer Tags */}
        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-1.5 sm:gap-2">
          {section.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] sm:text-xs font-mono px-2.5 py-0.5 rounded-full border border-accent/25 bg-accent/10 text-accent font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
