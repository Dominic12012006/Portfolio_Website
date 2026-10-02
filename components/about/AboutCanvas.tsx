"use client";

import React, { useState } from "react";
import DitherVeil from "@/components/effects/DitherVeil";
import SegmentedHalo from "@/components/about/SegmentedHalo";
import { ABOUT_SECTIONS, AboutSection } from "@/data/aboutSections";

export default function AboutCanvas() {
  const [activeSection, setActiveSection] = useState<AboutSection | null>(null);

  return (
    <div className="relative w-full h-[calc(100svh-var(--navbar-height))] overflow-hidden flex items-center justify-center select-none bg-background">
      {/* 
        Layer 1 (Behind): Flanking Arcs of the Unified Giant Circle
        Both sides are arcs of the same colossal circle centered at the screen center,
        which goes off-page in the center.
      */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <SegmentedHalo
          activeSection={activeSection}
          onSelectSection={setActiveSection}
          className="w-full h-full"
        />
      </div>

      {/* 
        Layer 2 (Center): Full-Length Dither Veil
        - Takes up the entire length of the page (from bottom to top).
        - No enclosing boundary box, borders, or rings.
        - Base starts from the bottom of the page; head is just below the top.
        - Softly feathered lateral edges seamlessly blend into the canvas space.
      */}
      <div
        className="relative z-20 h-full w-[min(54vw,640px)] overflow-hidden flex items-end justify-center pointer-events-auto"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <DitherVeil
          src="https://images.unsplash.com/photo-1737071371043-761e02b1ef95?q=80&w=1400&auto=format&fit=crop"
          pattern="floyd"
          pixelSize={2}
          levels={2}
          palette="duotone"
          inkColor="#0a0a0d"
          paperColor="#d49b6a"
          contrast={1.2}
          brightness={0}
          revealRadius={250}
          softness={0.65}
          linger={1.0}
          rimColor="#d49b6a"
          rim={0.05}
          reverse={false}
          wander={false}
          clickBurst={true}
          fit="cover"
          coverOrigin={[0.5, 0.0]}
          className="w-full h-full"
        />
      </div>

      {/* Floating Dynamic Telemetry / Section HUD Readout at the bottom */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-30 w-[calc(100%-2rem)] max-w-xl px-2 pointer-events-none">
        <div className="pointer-events-auto rounded-2xl border border-white/12 bg-background/90 backdrop-blur-xl p-3.5 sm:p-4 text-center shadow-[0_8px_32px_rgba(0,0,0,0.9),_0_0_20px_rgba(212,155,106,0.12)] transition-all duration-300">
          {activeSection ? (
            <div className="space-y-1 sm:space-y-1.5 animate-fadeIn">
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono text-[10px] text-accent tracking-widest uppercase">
                  {activeSection.coordinate}
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              </div>
              <h2 className="text-base sm:text-lg font-light tracking-wide text-foreground uppercase">
                {activeSection.title}
              </h2>
              <p className="text-xs font-mono text-accent/90 italic max-w-lg mx-auto line-clamp-1 sm:line-clamp-none">
                {activeSection.tagline}
              </p>
              <p className="text-xs text-muted/90 leading-relaxed max-w-xl mx-auto pt-0.5 hidden sm:block">
                {activeSection.description}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                {activeSection.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-mono px-2 py-0.5 rounded-full border border-accent/25 bg-accent/10 text-accent"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-1 text-muted">
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono text-[10px] tracking-widest text-accent uppercase">
                  [ HALO ARRAY // HOVER ANY ARC SECTOR TO INSPECT ]
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-light tracking-wide text-foreground uppercase">
                Dominic Thomas · Systems & Interfaces
              </h2>
              <p className="text-xs font-mono text-muted/80 max-w-lg mx-auto line-clamp-2 sm:line-clamp-none">
                Continuous dither veil framed by the flanking arcs of an expansive orbital halo. Hover any sector on either side to inspect focus areas, or hover the central veil to reveal color.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1 opacity-70">
                {ABOUT_SECTIONS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSection(s)}
                    className="text-[9px] font-mono px-2 py-0.5 rounded border border-white/10 bg-white/[0.03] hover:border-accent/40 hover:text-accent transition-colors"
                  >
                    {s.index} {s.shortCode}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
