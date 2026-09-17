export interface VisualAssetConfig {
  /** Optional intro animation asset (e.g. GIF or video or webm) that plays once */
  introSrc?: string;
  /** Still final image that settles visually once intro finishes (or fallback) */
  finalSrc: string;
  /** Accessible alt description */
  alt: string;
}

export const HOME_ASSETS = {
  build: {
    introSrc: undefined, // slot for future /animations/build/build-intro.gif
    finalSrc: "/images/build/placeholder.svg",
    alt: "Dominic Thomas — Build visual showcase",
  } as VisualAssetConfig,

  about: {
    introSrc: undefined, // slot for future /animations/about/about-intro.gif
    finalSrc: "/images/about/placeholder.svg",
    alt: "Dominic Thomas — About Me visual showcase",
  } as VisualAssetConfig,
} as const;

