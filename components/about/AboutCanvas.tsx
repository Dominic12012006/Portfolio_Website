"use client";

import React, { useState } from "react";
import DitherVeil from "@/components/effects/DitherVeil";
import SegmentedHalo from "@/components/about/SegmentedHalo";
import { ABOUT_SECTIONS, AboutSection } from "@/data/aboutSections";

export default function AboutCanvas() {
  const [activeSection, setActiveSection] = useState<AboutSection | null>(null);

  return (
    <div className="w-full flex flex-col items-center justify-center select-none pt-2 pb-6">
      {/* Central Visual Composition: DitherVeil in middle + Circular Halo behind it */}
      <div className="relative w-full max-w-3xl h-[400px] sm:h-[460px] md:h-[520px] flex items-center justify-center">
        {/* Layer 0 (Behind): Segmented Circular Halo with 8 expanding sectors */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
          <SegmentedHalo
            activeSection={activeSection}
            onSelectSection={setActiveSection}
            className="w-full h-full"
          />
        </div>

        {/* Layer 1 (Middle): Central DitherVeil Aperture */}
        <div className="relative z-10 w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden border border-white/15 shadow-[0_0_80px_rgba(0,0,0,0.95),_0_0_35px_rgba(212,155,106,0.18)] ring-1 ring-accent/30 pointer-events-auto bg-[#0a0a0d] transition-transform duration-500 hover:scale-[1.015]">
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
            revealRadius={190}
            softness={0.65}
            linger={1.2}
            rimColor="#d49b6a"
            rim={0.06}
            reverse={false}
            wander={true}
            clickBurst={true}
            fit="cover"
            className="w-full h-full"
          />

          {/* Vignette & Inner Bezel */}
          <div className="absolute inset-0 pointer-events-none rounded-full ring-1 ring-accent/30 shadow-[inset_0_0_30px_rgba(0,0,0,0.85)] bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.4)_100%)]" />
        </div>
      </div>

      {/* Dynamic Telemetry / Section HUD Readout */}
      <div className="w-full max-w-2xl mt-4 px-4">
        <div className="rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-md p-5 md:p-6 text-center transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          {activeSection ? (
            <div className="space-y-2.5 animate-fadeIn">
              <div className="flex items-center justify-center gap-3">
                <span className="font-mono text-xs text-accent tracking-widest uppercase">
                  {activeSection.coordinate}
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              </div>
              <h2 className="text-xl md:text-2xl font-light tracking-wide text-foreground uppercase">
                {activeSection.title}
              </h2>
              <p className="text-xs md:text-sm font-mono text-accent/90 italic max-w-lg mx-auto">
                {activeSection.tagline}
              </p>
              <p className="text-xs md:text-sm text-muted leading-relaxed max-w-xl mx-auto pt-1">
                {activeSection.description}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
                {activeSection.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent/90"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-muted">
              <span className="font-mono text-[11px] tracking-widest text-accent uppercase">
                [ HALO ARRAY // HOVER ANY ARC SECTOR TO EXPAND & INSPECT ]
              </span>
              <h2 className="text-lg md:text-xl font-light tracking-wide text-foreground uppercase">
                Dominic Thomas
              </h2>
              <p className="text-xs font-mono text-muted/80 max-w-md mx-auto">
                Interactive dither veil centered with an 8-segment orbital halo. Hover over any sector above to examine specific engineering dimensions.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2 opacity-60">
                {ABOUT_SECTIONS.slice(0, 4).map((s) => (
                  <span
                    key={s.id}
                    className="text-[10px] font-mono px-2 py-0.5 rounded border border-white/5 bg-white/[0.02]"
                  >
                    {s.index} {s.title}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
