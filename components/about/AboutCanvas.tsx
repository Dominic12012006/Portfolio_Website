"use client";

import React, { useState } from "react";
import DitherVeil from "@/components/effects/DitherVeil";
import SegmentedHalo from "@/components/about/SegmentedHalo";
import SectorModal from "@/components/about/SectorModal";
import { ABOUT_SECTIONS, AboutSection } from "@/data/aboutSections";

export default function AboutCanvas() {
  const [hoveredSection, setHoveredSection] = useState<AboutSection | null>(null);
  const [modalSection, setModalSection] = useState<AboutSection | null>(null);

  return (
    <div className="relative w-full h-[calc(100svh-var(--navbar-height))] overflow-hidden flex items-center justify-center select-none bg-background">
      {/* 
        Layer 1 (Behind): Flanking Arcs of the Unified Giant Circle
        Both sides are arcs of the same colossal circle centered at the screen center,
        which goes off-page in the center.
      */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <SegmentedHalo
          hoveredSection={hoveredSection}
          activeSection={modalSection}
          onHoverSection={setHoveredSection}
          onOpenSection={setModalSection}
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

      {/* 
        Layer 3: Central Identity HUD at the bottom
        - Low visual profile, clean, compact.
        - Preserves focal attention on the portrait.
        - Contains only concise intro, headline, and compact sector pills.
        - Never repurposed to display full sector descriptions.
      */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 w-[calc(100%-2rem)] max-w-xl sm:max-w-2xl px-2 pointer-events-none">
        <div className="pointer-events-auto rounded-2xl border border-white/12 bg-background/90 backdrop-blur-xl p-3.5 sm:p-4 text-center shadow-[0_12px_36px_rgba(0,0,0,0.9),_0_0_20px_rgba(212,155,106,0.1)] transition-all duration-300">
          <div className="space-y-1 sm:space-y-1.5 text-muted">
            <div className="flex items-center justify-center gap-2">
              <span className="font-mono text-[10px] sm:text-xs tracking-widest text-accent uppercase font-medium">
                AI / ML · SYSTEMS · ENGINEERING
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-light tracking-wider text-foreground uppercase">
              DOMINIC THOMAS
            </h1>

            <p className="text-xs sm:text-[13px] text-muted/90 leading-relaxed max-w-lg mx-auto italic">
              &ldquo;I enjoy building intelligent systems, exploring unfamiliar technologies, and bringing complex ideas into working reality.&rdquo;
            </p>

            {/* Compact Orbital Sector Navigation Pills to trigger Modal */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-2 mt-1 border-t border-white/10">
              {ABOUT_SECTIONS.map((s) => {
                const isHighlighted = hoveredSection?.id === s.id || modalSection?.id === s.id;
                return (
                  <button
                    key={s.id}
                    onMouseEnter={() => setHoveredSection(s)}
                    onMouseLeave={() => setHoveredSection(null)}
                    onClick={() => setModalSection(s)}
                    aria-label={`Open ${s.index} ${s.shortCode} details`}
                    className={`text-[11px] sm:text-xs font-mono px-2 sm:px-2.5 py-1 rounded-md border transition-all font-medium focus:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                      isHighlighted
                        ? "border-accent bg-accent/20 text-accent shadow-[0_0_10px_rgba(212,155,106,0.35)]"
                        : "border-white/10 bg-white/[0.03] text-foreground/80 hover:border-accent/50 hover:text-accent hover:bg-white/[0.06]"
                    }`}
                  >
                    {s.index} {s.shortCode}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 
        Layer 4 (Foreground): Dedicated Sector Details Modal Dialog
        - Triggered upon clicking any orbital sector or navigation pill.
        - Dark translucent backdrop blur.
        - Keyboard accessible (ESC to dismiss, focus management).
      */}
      <SectorModal
        section={modalSection}
        onClose={() => setModalSection(null)}
      />
    </div>
  );
}
