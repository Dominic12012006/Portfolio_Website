"use client";

import CenterNavigationLayer from "./CenterNavigationLayer";

interface CenterIdentityProps {
  onNavigate: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isHovered: boolean;
  children?: React.ReactNode;
}

/**
 * CenterIdentity:
 * The continuous central canvas housing:
 * 1. Infinite Spiral background (passed as children in Milestone 4)
 * 2. Primary identity typography: DOMINIC THOMAS
 * 3. Implicit CenterNavigationLayer gateway to /experience
 */
export default function CenterIdentity({
  onNavigate,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  isHovered,
  children,
}: CenterIdentityProps) {
  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden select-none">
      {/* Background Decorative Layer (Infinite Spiral will live here) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {children}
      </div>

      {/* Primary Identity Statement */}
      <div
        className={`relative z-10 text-center px-4 pointer-events-none transition-all duration-500 ease-canvas ${
          isHovered ? "opacity-100 scale-[1.01]" : "opacity-90 scale-100"
        }`}
      >
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-widest text-foreground uppercase whitespace-nowrap">
          Dominic Thomas
        </h1>
      </div>

      {/* Implicit Navigation Gateway Layer */}
      <CenterNavigationLayer
        onClick={onNavigate}
        onKeyDown={onKeyDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    </div>
  );
}

