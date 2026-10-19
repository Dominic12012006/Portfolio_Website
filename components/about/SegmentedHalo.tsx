"use client";

import React from "react";
import { ABOUT_SECTIONS, AboutSection } from "@/data/aboutSections";

interface SegmentedHaloProps {
  hoveredSection?: AboutSection | null;
  activeSection?: AboutSection | null;
  onHoverSection?: (section: AboutSection | null) => void;
  onOpenSection?: (section: AboutSection) => void;
  onSelectSection?: (section: AboutSection | null) => void;
  className?: string;
}

const R_OUTER = 535;
const R_INNER = 480;
const GAP_DEG = 2.5;

const toRad = (deg: number) => (deg * Math.PI) / 180;

const polarToCartesian = (r: number, deg: number) => {
  const rad = toRad(deg);
  return {
    x: r * Math.cos(rad),
    y: r * Math.sin(rad),
  };
};

const describeSectorArc = (
  rIn: number,
  rOut: number,
  t1Deg: number,
  t2Deg: number
) => {
  const p1 = polarToCartesian(rOut, t1Deg);
  const p2 = polarToCartesian(rOut, t2Deg);
  const p3 = polarToCartesian(rIn, t2Deg);
  const p4 = polarToCartesian(rIn, t1Deg);

  return [
    `M ${p1.x} ${p1.y}`,
    `A ${rOut} ${rOut} 0 0 1 ${p2.x} ${p2.y}`,
    `L ${p3.x} ${p3.y}`,
    `A ${rIn} ${rIn} 0 0 0 ${p4.x} ${p4.y}`,
    "Z",
  ].join(" ");
};

const describeGuidelineArc = (r: number, t1Deg: number, t2Deg: number) => {
  const p1 = polarToCartesian(r, t1Deg);
  const p2 = polarToCartesian(r, t2Deg);
  return `M ${p1.x} ${p1.y} A ${r} ${r} 0 0 1 ${p2.x} ${p2.y}`;
};

const describeHorizontalLane = (
  rOut: number,
  t1Deg: number,
  t2Deg: number,
  isLeft: boolean
) => {
  const p1 = polarToCartesian(rOut, t1Deg);
  const p2 = polarToCartesian(rOut, t2Deg);
  const edgeX = isLeft ? -800 : 800;

  return [
    `M ${p1.x} ${p1.y}`,
    `A ${rOut} ${rOut} 0 0 1 ${p2.x} ${p2.y}`,
    `L ${edgeX} ${p2.y}`,
    `L ${edgeX} ${p1.y}`,
    "Z",
  ].join(" ");
};

export default function SegmentedHalo({
  hoveredSection,
  activeSection,
  onHoverSection,
  onOpenSection,
  onSelectSection,
  className = "",
}: SegmentedHaloProps) {
  const currentHover = hoveredSection !== undefined ? hoveredSection : activeSection ?? null;
  const handleHover = onHoverSection ?? onSelectSection ?? (() => {});
  const handleOpen = onOpenSection ?? onSelectSection ?? (() => {});

  // Sectors definitions on the single unified circle:
  // Left Arc: 116° to 244° (spanning the left flank, top to bottom)
  // Right Arc: -64° to +64° (spanning the right flank, top to bottom)
  // Each section owns its entire horizontal lane extending outward away from the center!
  const sectorsConfig = [
    // Left Arc (Sectors 01 - 04, ordered top to bottom)
    {
      sec: ABOUT_SECTIONS[0], // 01 SYSTEMS
      t1: 212 + GAP_DEG / 2,
      t2: 244 - GAP_DEG / 2,
      mid: 228,
      isLeft: true,
    },
    {
      sec: ABOUT_SECTIONS[1], // 02 AI / ML
      t1: 180 + GAP_DEG / 2,
      t2: 212 - GAP_DEG / 2,
      mid: 196,
      isLeft: true,
    },
    {
      sec: ABOUT_SECTIONS[2], // 03 BUILDING
      t1: 148 + GAP_DEG / 2,
      t2: 180 - GAP_DEG / 2,
      mid: 164,
      isLeft: true,
    },
    {
      sec: ABOUT_SECTIONS[3], // 04 OWNERSHIP
      t1: 116 + GAP_DEG / 2,
      t2: 148 - GAP_DEG / 2,
      mid: 132,
      isLeft: true,
    },

    // Right Arc (Sectors 05 - 08, ordered top to bottom)
    {
      sec: ABOUT_SECTIONS[4], // 05 ENGINEERING
      t1: -64 + GAP_DEG / 2,
      t2: -32 - GAP_DEG / 2,
      mid: -48,
      isLeft: false,
    },
    {
      sec: ABOUT_SECTIONS[5], // 06 MILESTONES
      t1: -32 + GAP_DEG / 2,
      t2: 0 - GAP_DEG / 2,
      mid: -16,
      isLeft: false,
    },
    {
      sec: ABOUT_SECTIONS[6], // 07 BEYOND CODE
      t1: 0 + GAP_DEG / 2,
      t2: 32 - GAP_DEG / 2,
      mid: 16,
      isLeft: false,
    },
    {
      sec: ABOUT_SECTIONS[7], // 08 CURIOSITY
      t1: 32 + GAP_DEG / 2,
      t2: 64 - GAP_DEG / 2,
      mid: 48,
      isLeft: false,
    },
  ];

  // Outer Perimeter Ticks
  const leftTickAngles = Array.from({ length: 43 }).map((_, i) => 116 + i * 3);
  const rightTickAngles = Array.from({ length: 43 }).map((_, i) => -64 + i * 3);
  const allTickAngles = [...leftTickAngles, ...rightTickAngles];

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center pointer-events-none select-none ${className}`}
    >
      <svg
        viewBox="-800 -500 1600 1000"
        className="w-full h-full max-w-[1700px] overflow-visible"
        aria-label="Orbital Halo Arcs of the Unified Circle with Extended Horizontal Sections"
      >
        <defs>
          <filter id="halo-glow-arc" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="halo-grad-active" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d49b6a" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#d49b6a" stopOpacity="0.16" />
          </linearGradient>
          <linearGradient id="halo-grad-idle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.09" />
            <stop offset="100%" stopColor="#d49b6a" stopOpacity="0.07" />
          </linearGradient>

          {/* Left Lane Active Highlight (from outer screen edge to arc) */}
          <linearGradient id="lane-grad-left-active" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d49b6a" stopOpacity="0.03" />
            <stop offset="50%" stopColor="#d49b6a" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#d49b6a" stopOpacity="0.22" />
          </linearGradient>

          {/* Right Lane Active Highlight (from arc to outer screen edge) */}
          <linearGradient id="lane-grad-right-active" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d49b6a" stopOpacity="0.22" />
            <stop offset="50%" stopColor="#d49b6a" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#d49b6a" stopOpacity="0.03" />
          </linearGradient>
        </defs>

        {/* Ambient Decorative Guideline Arcs on Left & Right Flanks */}
        <g className="opacity-40 pointer-events-none">
          {/* Outer Guideline Arcs (dashed) */}
          <path
            d={describeGuidelineArc(558, 116, 244)}
            fill="none"
            stroke="rgba(212, 155, 106, 0.28)"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          <path
            d={describeGuidelineArc(558, -64, 64)}
            fill="none"
            stroke="rgba(212, 155, 106, 0.28)"
            strokeWidth="1"
            strokeDasharray="4 8"
          />

          {/* Outer Guideline Arcs (fine solid) */}
          <path
            d={describeGuidelineArc(570, 116, 244)}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
          />
          <path
            d={describeGuidelineArc(570, -64, 64)}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
          />

          {/* Inner Guideline Arcs (dashed) */}
          <path
            d={describeGuidelineArc(468, 116, 244)}
            fill="none"
            stroke="rgba(212, 155, 106, 0.22)"
            strokeWidth="1"
            strokeDasharray="3 6"
          />
          <path
            d={describeGuidelineArc(468, -64, 64)}
            fill="none"
            stroke="rgba(212, 155, 106, 0.22)"
            strokeWidth="1"
            strokeDasharray="3 6"
          />

          {/* Inner Guideline Arcs (subtle) */}
          <path
            d={describeGuidelineArc(445, 116, 244)}
            fill="none"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
          <path
            d={describeGuidelineArc(445, -64, 64)}
            fill="none"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
        </g>

        {/* Outer Circular Perimeter Ticks (Every 3 degrees along both arcs) */}
        <g className="opacity-35 pointer-events-none">
          {allTickAngles.map((deg, k) => {
            const isMajor = Math.abs(deg) % 15 === 0;
            const r1 = isMajor ? 550 : 558;
            const r2 = 569;
            const p1 = polarToCartesian(r1, deg);
            const p2 = polarToCartesian(r2, deg);
            return (
              <line
                key={`tick-${k}`}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke={isMajor ? "#d49b6a" : "rgba(255,255,255,0.22)"}
                strokeWidth={isMajor ? 1.8 : 0.9}
              />
            );
          })}
        </g>

        {/* 
          Interactive Halo Sections:
          Each section encompasses BOTH:
          1. The entire horizontal section attached away from the center to the screen edge.
          2. The precision curved arc of the orbital halo.
        */}
        <g className="pointer-events-auto">
          {sectorsConfig.map(({ sec, t1, t2, mid, isLeft }) => {
            const isHovered = currentHover?.id === sec.id;

            // Radial translation outward from circle center (0, 0) for the arc
            const rad = toRad(mid);
            const expandDist = isHovered ? 18 : 0;
            const dx = Math.cos(rad) * expandDist;
            const dy = Math.sin(rad) * expandDist;

            // Coordinates for the arc & labels
            const labelR = (R_INNER + R_OUTER) / 2;
            const labelPos = polarToCartesian(labelR, mid);
            const arcPath = describeSectorArc(R_INNER, R_OUTER, t1, t2);

            // Extended horizontal lane polygon (attached away from center)
            const lanePath = describeHorizontalLane(R_OUTER, t1, t2, isLeft);

            // Midpoint of outer arc where the horizontal projection beam attaches
            const pOuterMid = polarToCartesian(R_OUTER, mid);
            const beamEndX = isLeft ? -780 : 780;
            const headingX = isLeft ? pOuterMid.x + dx - 24 : pOuterMid.x + dx + 24;

            return (
              <g
                key={sec.id}
                onMouseEnter={() => handleHover(sec)}
                onMouseLeave={() => handleHover(null)}
                onClick={() => handleOpen(sec)}
                tabIndex={0}
                role="button"
                aria-label={`Open details for ${sec.index} ${sec.shortCode}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOpen(sec);
                  }
                }}
                className="cursor-pointer focus:outline-none group"
              >
                {/* 
                  1. The Extended Horizontal Section (Away from Center to Screen Edge)
                  Selecting anywhere in this horizontal lane activates the sector!
                */}
                <path
                  d={lanePath}
                  fill={
                    isHovered
                      ? isLeft
                        ? "url(#lane-grad-left-active)"
                        : "url(#lane-grad-right-active)"
                      : "transparent"
                  }
                  pointerEvents="all"
                  className="transition-all duration-300"
                />

                {/* 
                  2. Horizontal Technical Projection Beam & Heading
                  Positioned right NEXT TO the circle arc (no overlap with the circle).
                */}
                <g className="pointer-events-none transition-all duration-300">
                  {/* Horizontal Guideline running from arc edge outward */}
                  <line
                    x1={pOuterMid.x + dx}
                    y1={pOuterMid.y + dy}
                    x2={beamEndX}
                    y2={pOuterMid.y + dy}
                    stroke={isHovered ? "#d49b6a" : "rgba(212, 155, 106, 0.45)"}
                    strokeWidth={isHovered ? 2.5 : 1.5}
                    strokeDasharray={isHovered ? "none" : "4 6"}
                    className="transition-colors duration-300"
                    style={{
                      filter: isHovered
                        ? "drop-shadow(0 0 8px rgba(212, 155, 106, 0.8))"
                        : "drop-shadow(0 0 2px rgba(0, 0, 0, 0.6))",
                    }}
                  />

                  {/* Precision Interface Pin at Circle Arc Boundary */}
                  <circle
                    cx={pOuterMid.x + dx}
                    cy={pOuterMid.y + dy}
                    r={isHovered ? 4 : 2.5}
                    fill="#d49b6a"
                    className="transition-all duration-300"
                    style={{
                      filter: isHovered ? "drop-shadow(0 0 6px rgba(212, 155, 106, 0.9))" : "none",
                    }}
                  />

                  {/* Outer Technical Terminal Bracket & Crosshair Tick */}
                  <line
                    x1={beamEndX}
                    y1={pOuterMid.y + dy - 18}
                    x2={beamEndX}
                    y2={pOuterMid.y + dy + 22}
                    stroke={isHovered ? "#d49b6a" : "rgba(212, 155, 106, 0.6)"}
                    strokeWidth={isHovered ? 3 : 2}
                    className="transition-colors duration-300"
                  />

                  {/* Section Heading positioned NEXT TO the circle (enlarged, prominent, non-overlapping) */}
                  <text
                    x={headingX}
                    y={pOuterMid.y + dy - 8}
                    textAnchor={isLeft ? "end" : "start"}
                    className={`font-mono text-[17px] sm:text-[19px] md:text-[21px] tracking-wider uppercase font-bold transition-all duration-300 ${
                      isHovered
                        ? "fill-accent drop-shadow-[0_0_12px_rgba(212,155,106,0.95)]"
                        : "fill-foreground drop-shadow-[0_0_6px_rgba(0,0,0,0.85)]"
                    }`}
                  >
                    {`${sec.index} ${sec.shortCode}`}
                  </text>

                  {/* Tagline revealed on hover directly under the heading */}
                  {isHovered && (
                    <text
                      x={headingX}
                      y={pOuterMid.y + dy + 20}
                      textAnchor={isLeft ? "end" : "start"}
                      className="font-mono text-[11px] sm:text-[12px] tracking-wide fill-accent/95 font-medium animate-fadeIn drop-shadow-[0_0_4px_rgba(0,0,0,0.8)]"
                    >
                      {sec.tagline}
                    </text>
                  )}
                </g>

                {/* 
                  3. Precision Curved Arc Sector on the Orbital Halo
                  Translates radially outward on hover with golden bloom.
                */}
                <g
                  style={{
                    transform: `translate(${dx}px, ${dy}px) scale(${isHovered ? 1.03 : 1})`,
                    transformOrigin: "0px 0px",
                    transition:
                      "transform 360ms cubic-bezier(0.16, 1, 0.3, 1), filter 360ms ease",
                    filter: isHovered
                      ? "drop-shadow(0 0 22px rgba(212, 155, 106, 0.75))"
                      : "drop-shadow(0 0 6px rgba(0, 0, 0, 0.6))",
                  }}
                >
                  {/* Arc Sector Background */}
                  <path
                    d={arcPath}
                    fill={isHovered ? "url(#halo-grad-active)" : "url(#halo-grad-idle)"}
                    stroke={isHovered ? "#d49b6a" : "rgba(212, 155, 106, 0.3)"}
                    strokeWidth={isHovered ? 2.5 : 1.5}
                    className="transition-colors duration-300"
                  />

                  {/* Outer Bezel Accent Strip on Hover */}
                  {isHovered && (
                    <path
                      d={describeSectorArc(
                        R_OUTER - 3.5,
                        R_OUTER,
                        t1 + 0.4,
                        t2 - 0.4
                      )}
                      fill="#d49b6a"
                      opacity={0.95}
                    />
                  )}

                  {/* Precision Indicator Pip inside the Arc (No text overlapping the circle) */}
                  <g
                    style={{
                      transform: `translate(${labelPos.x}px, ${labelPos.y}px)`,
                    }}
                    className="pointer-events-none"
                  >
                    <circle
                      cx="0"
                      cy="0"
                      r={isHovered ? 4.5 : 3}
                      fill={isHovered ? "#d49b6a" : "rgba(212,155,106,0.75)"}
                      className="transition-all duration-300"
                      style={{
                        filter: isHovered
                          ? "drop-shadow(0 0 8px rgba(212, 155, 106, 0.9))"
                          : "none",
                      }}
                    />
                  </g>
                </g>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
