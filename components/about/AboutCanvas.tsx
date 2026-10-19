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
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 h-full w-[min(54vw,640px)] overflow-hidden flex items-end justify-center pointer-events-auto"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <DitherVeil
          src="/images/about/portrait-green-kurta.png"
          pattern="floyd"
          pixelSize={2}
          levels={2}
          palette="duotone"
          inkColor="#0a0a0d"
          paperColor="#f2f2f5"
          contrast={1.25}
          brightness={0}
          revealRadius={250}
          softness={0.65}
          linger={1.0}
          rimColor="#ffffff"
          rim={0.03}
          reverse={false}
          wander={false}
          clickBurst={true}
          fit="cover"
          coverOrigin={[0.5, 0.0]}
          className="w-full h-full"
        />
      </div>

      {/* Floating Dynamic Telemetry / Section HUD Readout at the bottom */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-30 w-[calc(100%-2rem)] max-w-2xl sm:max-w-3xl px-2 pointer-events-none">
        <div className="pointer-events-auto rounded-2xl border border-white/15 bg-background/95 backdrop-blur-2xl p-4 sm:p-5 text-center shadow-[0_12px_40px_rgba(0,0,0,0.95),_0_0_24px_rgba(212,155,106,0.18)] transition-all duration-300">
          {activeSection ? (
            <div className="space-y-2 sm:space-y-2.5 animate-fadeIn">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs sm:text-sm text-accent tracking-widest uppercase font-semibold">
                    {activeSection.coordinate}
                  </span>
                  <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
                </div>
                <button
                  onClick={() => setActiveSection(null)}
                  className="font-mono text-xs sm:text-sm text-muted/80 hover:text-accent uppercase transition-colors px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.04]"
                  aria-label="Return to central identity card"
                >
                  ✕ Close
                </button>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-light tracking-wide text-foreground uppercase">
                {activeSection.title}
              </h2>

              <p className="text-sm sm:text-base font-mono text-accent italic max-w-xl mx-auto">
                {activeSection.tagline}
              </p>

              <div className="text-sm sm:text-base text-muted/95 leading-relaxed max-w-2xl mx-auto pt-1 max-h-[28vh] overflow-y-auto whitespace-pre-line text-left px-2 sm:px-4">
                {activeSection.description}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                {activeSection.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs sm:text-sm font-mono px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Tab navigation strip always visible */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-2 border-t border-white/10">
                {ABOUT_SECTIONS.map((s) => {
                  const isCurrent = activeSection.id === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setActiveSection(isCurrent ? null : s)}
                      className={`text-xs sm:text-sm font-mono px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border transition-all font-medium ${
                        isCurrent
                          ? "border-accent bg-accent/20 text-accent shadow-[0_0_12px_rgba(212,155,106,0.4)]"
                          : "border-white/10 bg-white/[0.03] text-foreground/80 hover:border-accent/50 hover:text-accent"
                      }`}
                    >
                      {s.index} {s.shortCode}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-2 sm:space-y-2.5 text-muted animate-fadeIn">
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono text-xs sm:text-sm tracking-widest text-accent uppercase font-semibold">
                  AI / ML · SYSTEMS · ENGINEERING
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-wider text-foreground uppercase">
                DOMINIC THOMAS
              </h2>

              <p className="text-sm sm:text-base text-muted/95 leading-relaxed max-w-2xl mx-auto pt-0.5">
                I enjoy building intelligent systems, exploring unfamiliar technologies, and bringing complex ideas into working reality. My work spans AI/ML, intelligent applications, software infrastructure, and robotics, united by a simple instinct: understand the problem, figure out what it takes, and build something that works.
              </p>

              {/* All 8 Sectors always visible as prominent tabs */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-2 border-t border-white/10">
                {ABOUT_SECTIONS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSection(s)}
                    className="text-xs sm:text-sm font-mono px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-white/10 bg-white/[0.03] hover:border-accent/60 hover:text-accent hover:bg-accent/10 transition-all font-medium text-foreground/85"
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
