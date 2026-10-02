"use client";

import { HOME_ASSETS } from "@/data/assets";
import IntroVisual from "./IntroVisual";

interface BuildPanelProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  isHovered: boolean;
  isOvershadowed: boolean;
}

export default function BuildPanel({
  onMouseEnter,
  onMouseLeave,
  onClick,
  onKeyDown,
  isHovered,
  isOvershadowed,
}: BuildPanelProps) {
  return (
    <div
      role="link"
      tabIndex={0}
      aria-label="Navigate to Build section"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={`group relative h-full w-full overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset select-none transition-all duration-700 ease-canvas ${
        isHovered
          ? "md:rounded-r-3xl md:border-r border-accent/40 shadow-[25px_0_60px_rgba(0,0,0,0.95)] z-30"
          : "z-10"
      }`}
    >
      {/* Background Visual Asset */}
      <div
        className={`absolute inset-0 transition-all duration-700 ease-canvas ${
          isHovered
            ? "scale-[1.03] filter-none"
            : isOvershadowed
            ? "scale-100 brightness-[0.65] saturate-[0.7]"
            : "scale-100 brightness-[0.8] saturate-[0.85]"
        }`}
      >
        <IntroVisual asset={HOME_ASSETS.build} priority />
      </div>

      {/* Darkening vignette overlay when overshadowed */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
          isHovered
            ? "opacity-0"
            : "bg-gradient-to-r from-black/50 via-black/40 to-black/80 opacity-100"
        }`}
      />

      {/* Atmospheric edge dissolution into the center canvas */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background via-background/60 to-transparent pointer-events-none z-[5] transition-opacity duration-500 ${
          isHovered ? "opacity-0" : "opacity-90"
        }`}
      />

      {/* Overlaid refined BUILD Typography */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 z-10 pointer-events-none">
        <h2
          className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-widest transition-all duration-500 whitespace-nowrap ${
            isHovered
              ? "text-accent translate-x-2 drop-shadow-[0_4px_24px_rgba(212,155,106,0.4)]"
              : "text-foreground/75 group-hover:text-foreground"
          }`}
        >
          BUILD
        </h2>
      </div>
    </div>
  );
}
