"use client";

import { HOME_ASSETS } from "@/data/assets";
import IntroVisual from "./IntroVisual";

interface AboutPanelProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  isHovered: boolean;
}

export default function AboutPanel({
  onMouseEnter,
  onMouseLeave,
  onClick,
  onKeyDown,
  isHovered,
}: AboutPanelProps) {
  return (
    <div
      role="link"
      tabIndex={0}
      aria-label="Navigate to About Me section"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={`group relative h-full w-full overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset select-none transition-all duration-500 ease-canvas`}
    >
      {/* Background Visual Asset */}
      <div className="absolute inset-0 transition-transform duration-700 ease-canvas group-hover:scale-[1.02]">
        <IntroVisual asset={HOME_ASSETS.about} />
      </div>

      {/* Subtle darkening overlay on non-hover / focus */}
      <div
        className={`absolute inset-0 bg-background/25 transition-opacity duration-500 pointer-events-none ${
          isHovered ? "opacity-0" : "opacity-40"
        }`}
      />

      {/* Atmospheric edge dissolution into the center canvas */}
      <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background/90 via-background/40 to-transparent pointer-events-none z-[5]" />

      {/* Overlaid refined ABOUT ME Typography */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 z-10 pointer-events-none">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-widest text-foreground transition-colors duration-300 group-hover:text-accent">
          ABOUT ME
        </h2>
      </div>
    </div>
  );
}

