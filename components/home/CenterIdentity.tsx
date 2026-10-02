"use client";

import TechText from "../effects/TechText";
import CenterNavigationLayer from "./CenterNavigationLayer";

interface CenterIdentityProps {
  onNavigate: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isHovered: boolean;
  isOvershadowed: boolean;
  children?: React.ReactNode;
}

/**
 * CenterIdentity:
 * The continuous central canvas housing:
 * 1. Infinite Spiral background (passed as children)
 * 2. Interactive TechText wordmark: DOMINIC THOMAS
 * 3. Implicit CenterNavigationLayer gateway to /experience
 *
 * By default, this section overtakes the other two sections with rounded boundaries,
 * elevated depth, outer shadows, and a cinematic perimeter vignette.
 * When either side tab is hovered, it drops down so the hovered side becomes overbearing.
 */
export default function CenterIdentity({
  onNavigate,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  isHovered,
  isOvershadowed,
  children,
}: CenterIdentityProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative h-full w-full flex flex-col items-center justify-center overflow-hidden select-none transition-all duration-700 ease-canvas ${
        isOvershadowed
          ? "opacity-50 brightness-[0.7] saturate-[0.75] z-10"
          : `md:-mx-4 lg:-mx-6 md:rounded-3xl lg:rounded-[2.5rem] md:border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.95),_0_0_35px_rgba(212,155,106,0.12)] z-20 ${
              isHovered ? "scale-[1.008]" : "scale-100"
            }`
      }`}
    >
      {/* Background Decorative Layer (Infinite Spiral) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {children}
      </div>

      {/* Cinematic Vignette Overlay to overshadow and frame the center */}
      <div
        className={`absolute inset-0 pointer-events-none z-[1] transition-opacity duration-700 ${
          isOvershadowed
            ? "bg-black/70 opacity-100"
            : "bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.75)_100%)] opacity-100"
        }`}
      />

      {/* Interactive TechText Wordmark */}
      <div className="relative z-10 w-full max-w-4xl h-44 sm:h-52 md:h-64 px-4 flex items-center justify-center pointer-events-auto">
        <TechText
          text="DOMINIC THOMAS"
          fontFamily=""
          fontWeight={700}
          fontSize={110}
          letterSpacing={-0.03}
          color="#f4f4f6"
          accentColor="#d49b6a"
          reveal="letter"
          reach={200}
          softness={0.7}
          dashLength={4}
          dashGap={2}
          strokeWidth={1.5}
          lineStyle="dashed"
          specks={15}
          selection={true}
          labels={true}
          draggable={true}
          sweep={true}
          speed={0.9}
          onClick={onNavigate}
        />
      </div>

      {/* Implicit Navigation Gateway Layer for clicks around wordmark & keyboard access */}
      <CenterNavigationLayer
        onClick={onNavigate}
        onKeyDown={onKeyDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    </div>
  );
}
