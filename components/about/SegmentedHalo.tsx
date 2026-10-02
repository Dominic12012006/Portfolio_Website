"use client";

import React from "react";
import { ABOUT_SECTIONS, AboutSection } from "@/data/aboutSections";

interface SegmentedHaloProps {
  side: "left" | "right";
  activeSection: AboutSection | null;
  onSelectSection: (section: AboutSection | null) => void;
  className?: string;
}

const CY = 500;
const INNER_R = 390;
const OUTER_R = 440;
const GAP_DEG = 2.5;

const polarToCartesian = (cx: number, cy: number, r: number, angleDeg: number) => {
  const rad = (angleDeg * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
};

const describeSemiArcSector = (
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  aStart: number,
  aEnd: number,
  side: "left" | "right"
) => {
  if (side === "left") {
    const tStart = 270 - aStart;
    const tEnd = 270 - aEnd;
    const p1 = polarToCartesian(cx, cy, outerR, tStart);
    const p2 = polarToCartesian(cx, cy, outerR, tEnd);
    const p3 = polarToCartesian(cx, cy, innerR, tEnd);
    const p4 = polarToCartesian(cx, cy, innerR, tStart);
    return [
      `M ${p1.x} ${p1.y}`,
      `A ${outerR} ${outerR} 0 0 0 ${p2.x} ${p2.y}`,
      `L ${p3.x} ${p3.y}`,
      `A ${innerR} ${innerR} 0 0 1 ${p4.x} ${p4.y}`,
      "Z",
    ].join(" ");
  } else {
    const tStart = 270 + aStart;
    const tEnd = 270 + aEnd;
    const p1 = polarToCartesian(cx, cy, outerR, tStart);
    const p2 = polarToCartesian(cx, cy, outerR, tEnd);
    const p3 = polarToCartesian(cx, cy, innerR, tEnd);
    const p4 = polarToCartesian(cx, cy, innerR, tStart);
    return [
      `M ${p1.x} ${p1.y}`,
      `A ${outerR} ${outerR} 0 0 1 ${p2.x} ${p2.y}`,
      `L ${p3.x} ${p3.y}`,
      `A ${innerR} ${innerR} 0 0 0 ${p4.x} ${p4.y}`,
      "Z",
    ].join(" ");
  }
};

export default function SegmentedHalo({
  side,
  activeSection,
  onSelectSection,
  className = "",
}: SegmentedHaloProps) {
  const isLeft = side === "left";
  const sections = isLeft ? ABOUT_SECTIONS.slice(0, 4) : ABOUT_SECTIONS.slice(4, 8);
  const count = sections.length;
  const sliceDeg = 180 / count; // 45 degrees per sector

  // Center coordinate:
  // For Left: chord is at right edge (X = 510) and arch bows left toward X = 0
  // For Right: chord is at left edge (X = 20) and arch bows right toward X = 530
  const CX = isLeft ? 510 : 20;

  return (
    <div
      className={`relative w-full h-full flex items-center ${
        isLeft ? "justify-end" : "justify-start"
      } pointer-events-none select-none ${className}`}
    >
      <svg
        viewBox="0 0 530 1000"
        className="w-full h-full overflow-visible"
        aria-label={`${isLeft ? "Left" : "Right"} Semi-Circle Halo`}
      >
        <defs>
          <filter id={`halo-glow-${side}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id={`halo-grad-active-${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d49b6a" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#d49b6a" stopOpacity="0.14" />
          </linearGradient>
          <linearGradient id={`halo-grad-idle-${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#d49b6a" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Ambient Decorative Guideline Arcs */}
        <g className="opacity-40">
          {/* Outer Guideline Arc 1 (dashed) */}
          <path
            d={`M ${CX} ${CY - 462} A 462 462 0 0 ${isLeft ? 0 : 1} ${CX} ${CY + 462}`}
            fill="none"
            stroke="rgba(212, 155, 106, 0.25)"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          {/* Outer Guideline Arc 2 (fine solid) */}
          <path
            d={`M ${CX} ${CY - 475} A 475 475 0 0 ${isLeft ? 0 : 1} ${CX} ${CY + 475}`}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
          />
          {/* Inner Guideline Arc (dashed) */}
          <path
            d={`M ${CX} ${CY - 380} A 380 380 0 0 ${isLeft ? 0 : 1} ${CX} ${CY + 380}`}
            fill="none"
            stroke="rgba(212, 155, 106, 0.22)"
            strokeWidth="1"
            strokeDasharray="3 6"
          />
          {/* Inner Guideline Arc 2 (subtle) */}
          <path
            d={`M ${CX} ${CY - 354} A 354 354 0 0 ${isLeft ? 0 : 1} ${CX} ${CY + 354}`}
            fill="none"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
          {/* Vertical Chord Datum Line (touches the veil border) */}
          <line
            x1={CX}
            y1={CY - 480}
            x2={CX}
            y2={CY + 480}
            stroke="rgba(212, 155, 106, 0.35)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
        </g>

        {/* Outer Circular Perimeter Ticks (Every 3 degrees = 60 ticks per semi-circle) */}
        <g className="opacity-35">
          {Array.from({ length: 61 }).map((_, k) => {
            const aDeg = k * 3;
            const isMajor = aDeg % 45 === 0;
            const isMid = aDeg % 15 === 0;
            const r1 = isMajor ? 454 : isMid ? 460 : 465;
            const r2 = 474;
            const theta = isLeft ? 270 - aDeg : 270 + aDeg;
            const p1 = polarToCartesian(CX, CY, r1, theta);
            const p2 = polarToCartesian(CX, CY, r2, theta);
            return (
              <line
                key={`tick-${side}-${k}`}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke={isMajor ? "#d49b6a" : isMid ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.18)"}
                strokeWidth={isMajor ? 2 : isMid ? 1.2 : 0.8}
              />
            );
          })}
        </g>

        {/* Interactive Halo Arc Sectors for this Semi-Circle */}
        <g className="pointer-events-auto">
          {sections.map((sec, i) => {
            const aStart = i * sliceDeg + GAP_DEG / 2;
            const aEnd = (i + 1) * sliceDeg - GAP_DEG / 2;
            const aMid = (aStart + aEnd) / 2;
            const isHovered = activeSection?.id === sec.id;

            // Radial translation angle
            const thetaMid = isLeft ? 270 - aMid : 270 + aMid;
            const rad = (thetaMid * Math.PI) / 180;
            const expandDist = isHovered ? 16 : 0;
            const dx = Math.cos(rad) * expandDist;
            const dy = Math.sin(rad) * expandDist;

            // Label coordinate inside the sector band
            const labelR = (INNER_R + OUTER_R) / 2;
            const labelPos = polarToCartesian(CX, CY, labelR, thetaMid);
            const pathData = describeSemiArcSector(CX, CY, INNER_R, OUTER_R, aStart, aEnd, side);

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
                  transform: `translate(${dx}px, ${dy}px) scale(${isHovered ? 1.04 : 1})`,
                  transformOrigin: `${CX}px ${CY}px`,
                  transition: "transform 360ms cubic-bezier(0.16, 1, 0.3, 1), filter 360ms ease",
                  filter: isHovered
                    ? "drop-shadow(0 0 20px rgba(212, 155, 106, 0.75))"
                    : "drop-shadow(0 0 6px rgba(0, 0, 0, 0.6))",
                }}
              >
                {/* Arc Sector Background */}
                <path
                  d={pathData}
                  fill={isHovered ? `url(#halo-grad-active-${side})` : `url(#halo-grad-idle-${side})`}
                  stroke={isHovered ? "#d49b6a" : "rgba(255, 255, 255, 0.14)"}
                  strokeWidth={isHovered ? 2 : 1}
                  className="transition-colors duration-300"
                />

                {/* Outer Bezel Accent Strip on Hover */}
                {isHovered && (
                  <path
                    d={describeSemiArcSector(
                      CX,
                      CY,
                      OUTER_R - 3,
                      OUTER_R,
                      aStart + 0.5,
                      aEnd - 0.5,
                      side
                    )}
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
