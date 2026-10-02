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
        Background Layer: The 2 Large Semi-Circles on each side of the central Veil
      */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="relative w-full h-full max-w-[1560px] flex items-center justify-between px-2 sm:px-6 md:px-10 lg:px-14">
          {/* Left Semi-Circle (Sectors 01 - 04) */}
          <div className="relative w-[min(36vw,440px)] h-[min(84vh,740px)] flex items-center justify-end">
            <SegmentedHalo
              side="left"
              activeSection={activeSection}
              onSelectSection={setActiveSection}
              className="w-full h-full"
            />
          </div>

          {/* Center Spacer corresponding to the central full-length veil */}
          <div className="w-[min(46vw,560px)] h-full shrink-0" />

          {/* Right Semi-Circle (Sectors 05 - 08) */}
          <div className="relative w-[min(36vw,440px)] h-[min(84vh,740px)] flex items-center justify-start">
            <SegmentedHalo
              side="right"
              activeSection={activeSection}
              onSelectSection={setActiveSection}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* 
        Center Veil: Takes up the ENTIRE LENGTH of the page!
        Full height from top to bottom, cutting through the center and splitting the halo.
      */}
      <div className="relative z-20 h-full w-[min(46vw,560px)] border-x border-white/12 shadow-[0_0_80px_rgba(0,0,0,0.95),_0_0_35px_rgba(212,155,106,0.18)] ring-1 ring-accent/20 bg-[#0a0a0d] overflow-hidden flex items-center justify-center">
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
          revealRadius={240}
          softness={0.65}
          linger={1.0}
          rimColor="#d49b6a"
          rim={0.05}
          reverse={false}
          wander={false}
          clickBurst={true}
          fit="cover"
          className="w-full h-full"
        />

        {/* Top/Bottom Vignette Fade & Edge Bezel */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.9)] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.75)_0%,transparent_14%,transparent_86%,rgba(0,0,0,0.75)_100%)]" />

        {/* Subtle Tech Badge at Top of the Veil */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none z-10 px-3 py-1 rounded-full border border-white/10 bg-black/60 backdrop-blur-md">
          <span className="font-mono text-[9px] text-accent/80 tracking-widest uppercase">
            [ APERTURE // DITHER VEIL ]
          </span>
        </div>
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
                Full-length dither veil flanked by two orbital semi-circle halos. Hover any sector on either side to inspect focus areas, or hover the central veil to reveal color.
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
