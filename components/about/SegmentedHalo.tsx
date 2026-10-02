"use client";

import React from "react";
import { ABOUT_SECTIONS, AboutSection } from "@/data/aboutSections";

interface SegmentedHaloProps {
  activeSection: AboutSection | null;
  onSelectSection: (section: AboutSection | null) => void;
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

export default function SegmentedHalo({
  activeSection,
  onSelectSection,
  className = "",
}: SegmentedHaloProps) {
  // Sectors definitions on the single unified circle:
  // Left Arc: 116° to 244° (spanning the left flank, top to bottom)
  // Right Arc: -64° to +64° (spanning the right flank, top to bottom)
  // Center: circle goes off-screen at top and bottom, completely clear in the center
  const sectorsConfig = [
    // Left Arc (Sectors 01 - 04, ordered top to bottom)
    {
      sec: ABOUT_SECTIONS[0], // 01 SYSTEMS
      t1: 212 + GAP_DEG / 2,
      t2: 244 - GAP_DEG / 2,
      mid: 228,
    },
    {
      sec: ABOUT_SECTIONS[1], // 02 SHADERS
      t1: 180 + GAP_DEG / 2,
      t2: 212 - GAP_DEG / 2,
      mid: 196,
    },
    {
      sec: ABOUT_SECTIONS[2], // 03 INTERFACES
      t1: 148 + GAP_DEG / 2,
      t2: 180 - GAP_DEG / 2,
      mid: 164,
    },
    {
      sec: ABOUT_SECTIONS[3], // 04 AGENTS
      t1: 116 + GAP_DEG / 2,
      t2: 148 - GAP_DEG / 2,
      mid: 132,
    },

    // Right Arc (Sectors 05 - 08, ordered top to bottom)
    {
      sec: ABOUT_SECTIONS[4], // 05 PERFORMANCE
      t1: -64 + GAP_DEG / 2,
      t2: -32 - GAP_DEG / 2,
      mid: -48,
    },
    {
      sec: ABOUT_SECTIONS[5], // 06 INFRASTRUCTURE
      t1: -32 + GAP_DEG / 2,
      t2: 0 - GAP_DEG / 2,
      mid: -16,
    },
    {
      sec: ABOUT_SECTIONS[6], // 07 PHILOSOPHY
      t1: 0 + GAP_DEG / 2,
      t2: 32 - GAP_DEG / 2,
      mid: 16,
    },
    {
      sec: ABOUT_SECTIONS[7], // 08 RESEARCH
      t1: 32 + GAP_DEG / 2,
      t2: 64 - GAP_DEG / 2,
      mid: 48,
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
        aria-label="Orbital Halo Arcs of the Unified Circle"
      >
        <defs>
          <filter id="halo-glow-arc" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="halo-grad-active" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d49b6a" stopOpacity="0.40" />
            <stop offset="100%" stopColor="#d49b6a" stopOpacity="0.16" />
          </linearGradient>
          <linearGradient id="halo-grad-idle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#d49b6a" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Ambient Decorative Guideline Arcs on Left & Right Flanks */}
        <g className="opacity-40">
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
        <g className="opacity-35">
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

        {/* The 8 Interactive Halo Arc Sectors (4 on Left Arc, 4 on Right Arc) */}
        <g className="pointer-events-auto">
          {sectorsConfig.map(({ sec, t1, t2, mid }) => {
            const isHovered = activeSection?.id === sec.id;

            // Radial translation outward from circle center (0, 0)
            const rad = toRad(mid);
            const expandDist = isHovered ? 18 : 0;
            const dx = Math.cos(rad) * expandDist;
            const dy = Math.sin(rad) * expandDist;

            // Label coordinate inside the sector band
            const labelR = (R_INNER + R_OUTER) / 2;
            const labelPos = polarToCartesian(labelR, mid);
            const pathData = describeSectorArc(R_INNER, R_OUTER, t1, t2);

            return (
              <g
                key={sec.id}
                onMouseEnter={() => onSelectSection(sec)}
                onMouseLeave={() => onSelectSection(null)}
                onClick={() => onSelectSection(isHovered ? null : sec)}
                tabIndex={0}
                role="button"
                aria-label={`Explore sector ${sec.index}: ${sec.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectSection(isHovered ? null : sec);
                  }
                }}
                className="cursor-pointer focus:outline-none"
                style={{
                  transform: `translate(${dx}px, ${dy}px) scale(${isHovered ? 1.03 : 1})`,
                  transformOrigin: "0px 0px",
                  transition: "transform 360ms cubic-bezier(0.16, 1, 0.3, 1), filter 360ms ease",
                  filter: isHovered
                    ? "drop-shadow(0 0 22px rgba(212, 155, 106, 0.75))"
                    : "drop-shadow(0 0 6px rgba(0, 0, 0, 0.6))",
                }}
              >
                {/* Arc Sector Background */}
                <path
                  d={pathData}
                  fill={isHovered ? "url(#halo-grad-active)" : "url(#halo-grad-idle)"}
                  stroke={isHovered ? "#d49b6a" : "rgba(255, 255, 255, 0.14)"}
                  strokeWidth={isHovered ? 2 : 1}
                  className="transition-colors duration-300"
                />

                {/* Outer Bezel Accent Strip on Hover */}
                {isHovered && (
                  <path
                    d={describeSectorArc(R_OUTER - 3.5, R_OUTER, t1 + 0.4, t2 - 0.4)}
                    fill="#d49b6a"
                    opacity={0.95}
                  />
                )}

                {/* Sector Typography & Indicator Tag */}
                <g
                  style={{
                    transform: `translate(${labelPos.x}px, ${labelPos.y}px)`,
                  }}
                  className="pointer-events-none"
                >
                  <circle
                    cx="0"
                    cy="-7"
                    r={isHovered ? 3.5 : 2}
                    fill={isHovered ? "#d49b6a" : "rgba(255,255,255,0.45)"}
                    className="transition-all duration-300"
                  />
                  <text
                    x="0"
                    y="7"
                    textAnchor="middle"
                    className={`font-mono text-[9.5px] tracking-wider uppercase transition-colors duration-300 ${
                      isHovered ? "fill-accent font-bold" : "fill-foreground/75 font-medium"
                    }`}
                  >
                    {sec.index} · {sec.shortCode}
                  </text>
                </g>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
