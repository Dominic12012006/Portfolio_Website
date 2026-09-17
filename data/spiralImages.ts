export interface SpiralImageItem {
  id: string;
  src: string;
  alt: string;
}

/**
 * Centralized image configuration for the Infinite Spiral.
 * Replace, reorder, add, or remove items here.
 * Currently uses local abstract geometric cards (zero external dependencies, zero fake portraits).
 */
export const SPIRAL_IMAGES: SpiralImageItem[] = [
  { id: "sp-1", src: "/images/spiral/spiral-1.svg", alt: "Abstract geometric texture 01" },
  { id: "sp-2", src: "/images/spiral/spiral-2.svg", alt: "Abstract geometric texture 02" },
  { id: "sp-3", src: "/images/spiral/spiral-3.svg", alt: "Abstract geometric texture 03" },
  { id: "sp-4", src: "/images/spiral/spiral-4.svg", alt: "Abstract geometric texture 04" },
  { id: "sp-5", src: "/images/spiral/spiral-5.svg", alt: "Abstract geometric texture 05" },
  { id: "sp-6", src: "/images/spiral/spiral-6.svg", alt: "Abstract geometric texture 06" },
  { id: "sp-7", src: "/images/spiral/spiral-7.svg", alt: "Abstract geometric texture 07" },
  { id: "sp-8", src: "/images/spiral/spiral-8.svg", alt: "Abstract geometric texture 08" },
  { id: "sp-9", src: "/images/spiral/spiral-9.svg", alt: "Abstract geometric texture 09" },
  { id: "sp-10", src: "/images/spiral/spiral-10.svg", alt: "Abstract geometric texture 10" },
  { id: "sp-11", src: "/images/spiral/spiral-11.svg", alt: "Abstract geometric texture 11" },
  { id: "sp-12", src: "/images/spiral/spiral-12.svg", alt: "Abstract geometric texture 12" },
];

