"use client";

interface CenterNavigationLayerProps {
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

/**
 * Transparent semantic navigation gateway to /experience.
 * Provides accessible keyboard and pointer targets without displaying
 * any visible "Experience" text.
 */
export default function CenterNavigationLayer({
  onClick,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
}: CenterNavigationLayerProps) {
  return (
    <div
      role="link"
      tabIndex={0}
      aria-label="Dominic Thomas portfolio gateway"
      onClick={onClick}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute inset-0 z-20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
    >
      <span className="sr-only">Explore Dominic Thomas</span>
    </div>
  );
}

