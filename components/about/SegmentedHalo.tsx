"use client";

import React from "react";
import { ABOUT_SECTIONS, AboutSection } from "@/data/aboutSections";

interface SegmentedHaloProps {
  activeSection: AboutSection | null;
  onSelectSection: (section: AboutSection | null) => void;
  className?: string;
}

const CX = 380;
const CY = 380;
const INNER_R = 210;
const OUTER_R = 330;
const GAP_DEG = 3.2;

const polarToCartesian = (cx: number, cy: number, r: number, angleInDegrees: number) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy + r * Math.sin(angleInRadians),
  };
};

const describeArcSector = (
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngle: number,
  endAngle: number
) => {
  const startOuter = polarToCartesian(cx, cy, outerR, startAngle);
  const endOuter = polarToCartesian(cx, cy, outerR, endAngle);
  const startInner = polarToCartesian(cx, cy, innerR, endAngle);
  const endInner = polarToCartesian(cx, cy, innerR, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  return [
    "M",
    startOuter.x,
    startOuter.y,
    "A",
    outerR,
    outerR,
    0,
    largeArcFlag,
    1,
    endOuter.x,
    endOuter.y,
    "L",
    startInner.x,
    startInner.y,
    "A",
    innerR,
    innerR,
    0,
    largeArcFlag,
    0,
    endInner.x,
    endInner.y,
    "Z",
  ].join(" ");
};

export default function SegmentedHalo({
  activeSection,
  onSelectSection,
  className = "",
}: SegmentedHaloProps) {
  const count = ABOUT_SECTIONS.length;
  const sliceDeg = 360 / count;

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center pointer-events-none select-none ${className}`}
    >
      <svg
        viewBox="0 0 760 760"
        className="w-full h-full max-w-[620px] max-h-[620px] overflow-visible"
        aria-label="Interactive Sectioned Halo for About Me"
      >
        <defs>
          <filter id="halo-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="halo-grad-active" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d49b6a" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#d49b6a" stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id="halo-grad-idle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#d49b6a" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Ambient Decorative Outer Guideline Rings */}
        <g className="opacity-40">
          <circle
            cx={CX}
            cy={CY}
            r={355}
            fill="none"
            stroke="rgba(212, 155, 106, 0.25)"
            strokeWidth="1"
            strokeDasharray="3 6"
          />
          <circle
            cx={CX}
            cy={CY}
            r={365}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
          />
          <circle
            cx={CX}
            cy={CY}
            r={195}
            fill="none"
            stroke="rgba(212, 155, 106, 0.2)"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
        </g>

        {/* Outer Circular Perimeter Ticks (Every 5 degrees) */}
        <g className="opacity-30">
          {Array.from({ length: 72 }).map((_, i) => {
            const deg = i * 5;
            const isMajor = deg % 45 === 0;
            const r1 = 350;
            const r2 = isMajor ? 362 : 355;
            const p1 = polarToCartesian(CX, CY, r1, deg);
            const p2 = polarToCartesian(CX, CY, r2, deg);
            return (
              <line
                key={`tick-${i}`}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke={isMajor ? "#d49b6a" : "rgba(255,255,255,0.4)"}
                strokeWidth={isMajor ? 1.5 : 1}
              />
            );
          })}
        </g>

        {/* The 8 Interactive Halo Arc Sectors */}
        <g className="pointer-events-auto">
          {ABOUT_SECTIONS.map((sec, i) => {
            const startAngle = i * sliceDeg + GAP_DEG / 2;
            const endAngle = (i + 1) * sliceDeg - GAP_DEG / 2;
            const midAngle = (startAngle + endAngle) / 2;
            const isHovered = activeSection?.id === sec.id;

            // Compute radial translation when expanded slightly
            const rad = ((midAngle - 90) * Math.PI) / 180;
            const expandDist = isHovered ? 16 : 0;
            const dx = Math.cos(rad) * expandDist;
            const dy = Math.sin(rad) * expandDist;

            // Label coordinate in the center of the arc band
            const labelR = (INNER_R + OUTER_R) / 2;
            const labelPos = polarToCartesian(CX, CY, labelR, midAngle);
            const pathData = describeArcSector(CX, CY, INNER_R, OUTER_R, startAngle, endAngle);

            return (
              <g
                key={sec.id}
                onMouseEnter={() => onSelectSection(sec)}
                onMouseLeave={() => onSelectSection(null)}
                onClick={() => onSelectSection(isHovered ? null : sec)}
                tabIndex={0}
                role="button"
                aria-label={`Explore ${sec.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectSection(isHovered ? null : sec);
                  }
                }}
                className="cursor-pointer focus:outline-none"
                style={{
                  transform: `translate(${dx}px, ${dy}px) scale(${isHovered ? 1.04 : 1})`,
                  transformOrigin: `${CX}px ${CY}px`,
                  transition: "transform 360ms cubic-bezier(0.16, 1, 0.3, 1), filter 360ms ease",
                  filter: isHovered
                    ? "drop-shadow(0 0 18px rgba(212, 155, 106, 0.65))"
                    : "drop-shadow(0 0 6px rgba(0, 0, 0, 0.5))",
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

                {/* Inner Accent Line on outer boundary for high-tech bezel look */}
                {isHovered && (
                  <path
                    d={describeArcSector(CX, CY, OUTER_R - 3, OUTER_R, startAngle + 1, endAngle - 1)}
                    fill="#d49b6a"
                    opacity={0.9}
                  />
                )}

                {/* Sector Label / Indicator */}
                <g
                  style={{
                    transform: `translate(${labelPos.x}px, ${labelPos.y}px)`,
                  }}
                  className="pointer-events-none"
                >
                  <circle
                    cx="0"
                    cy="-10"
                    r={isHovered ? 3 : 2}
                    fill={isHovered ? "#d49b6a" : "rgba(255,255,255,0.4)"}
                    className="transition-all duration-300"
                  />
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    className={`font-mono text-[10px] tracking-widest uppercase transition-colors duration-300 ${
                      isHovered ? "fill-accent font-semibold" : "fill-foreground/60"
                    }`}
                  >
                    {sec.index}
                  </text>
                  <text
                    x="0"
                    y="17"
                    textAnchor="middle"
                    className={`font-mono text-[8px] tracking-widest uppercase transition-colors duration-300 ${
                      isHovered ? "fill-accent font-medium opacity-100" : "fill-muted opacity-60"
                    }`}
                  >
                    {sec.id.slice(0, 8)}
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
