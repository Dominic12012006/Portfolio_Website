/**
 * Centralized layout tokens and interaction constants.
 * No magic numbers inline in components.
 */

export const LAYOUT_CONFIG = {
  // Desktop panel width percentages (total = 100)
  desktopWidths: {
    leftNormal: 30,
    centerNormal: 40,
    rightNormal: 30,
    // Side expansion percentage (2-4% per spec, tuning to 3%)
    sideExpansion: 3.0,
  },

  // Transition parameters
  transitions: {
    durationMs: 400,
    easing: "cubic-bezier(0.16, 1, 0.3, 1)", // refined smooth ease-out
  },

  // Infinite Spiral decorative parameters
  spiral: {
    speed: 0.32, // calm automatic speed (0.25 - 0.40)
    direction: "up" as const,
    animationMode: "auto" as const,
    pauseOnHover: false,
    cardsPerTurn: 7,
    radius: 175,
    cardWidth: 110,
    cardHeight: 145,
    verticalSpacing: 65,
    perspective: 1000,
    rotation: 0,
    cardTilt: 0,
    cardRadius: 8,
    centerScale: 1.18,
    edgeFade: 0.35,
    edgeBlur: 5,
    imageFit: "cover" as const,
  },

  // Scroll navigation safeguards
  scrollNav: {
    wheelThreshold: 75, // intentional gesture required
    cooldownMs: 600, // prevent repeated triggers
  },
} as const;

