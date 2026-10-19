"use client";

import React, { useState } from "react";
import DitherVeil from "@/components/effects/DitherVeil";
import SegmentedHalo from "@/components/about/SegmentedHalo";
import { ABOUT_SECTIONS, AboutSection } from "@/data/aboutSections";

const CARD_TAGS = [
  { index: "01", label: "AI / ML", targetCode: "AI / ML" },
  { index: "02", label: "SYSTEMS", targetCode: "SYSTEMS" },
  { index: "03", label: "INTELLIGENT APPLICATIONS", targetCode: "BUILDING" },
  { index: "04", label: "ENGINEERING", targetCode: "ENGINEERING" },
  { index: "05", label: "RESEARCH", targetCode: "MILESTONES" },
  { index: "06", label: "EXPLORATION", targetCode: "CURIOSITY" },
];

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
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-accent tracking-widest uppercase">
                    {activeSection.coordinate}
                  </span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                </div>
                <button
                  onClick={() => setActiveSection(null)}
                  className="font-mono text-[10px] text-muted/60 hover:text-accent uppercase transition-colors px-1.5 py-0.5 rounded border border-white/5 bg-white/[0.02]"
                  aria-label="Return to central identity card"
                >
                  ✕ Close
                </button>
              </div>
              <h2 className="text-base sm:text-lg font-light tracking-wide text-foreground uppercase">
                {activeSection.title}
              </h2>
              <p className="text-xs font-mono text-accent/90 italic max-w-lg mx-auto">
                {activeSection.tagline}
              </p>
              <div className="text-xs text-muted/90 leading-relaxed max-w-xl mx-auto pt-1 max-h-[26vh] overflow-y-auto whitespace-pre-line text-left px-1 sm:px-3">
                {activeSection.description}
              </div>
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
            <div className="space-y-1.5 text-muted animate-fadeIn">
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono text-[10px] tracking-widest text-accent uppercase">
                  AI / ML · SYSTEMS · ENGINEERING
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              </div>
              <h2 className="text-base sm:text-lg font-light tracking-wide text-foreground uppercase">
                DOMINIC THOMAS
              </h2>
              <p className="text-xs text-muted/90 leading-relaxed max-w-xl mx-auto pt-0.5">
                I enjoy building intelligent systems, exploring unfamiliar technologies, and bringing complex ideas into working reality. My work spans AI/ML, intelligent applications, software infrastructure, and robotics, united by a simple instinct: understand the problem, figure out what it takes, and build something that works.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1.5 opacity-80">
                {CARD_TAGS.map((tag) => {
                  const targetSec = ABOUT_SECTIONS.find(
                    (s) => s.shortCode === tag.targetCode
                  );
                  return (
                    <button
                      key={tag.index}
                      onClick={() => targetSec && setActiveSection(targetSec)}
                      className="text-[9px] font-mono px-2 py-0.5 rounded border border-white/10 bg-white/[0.03] hover:border-accent/40 hover:text-accent transition-colors"
                    >
                      {tag.index} {tag.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
