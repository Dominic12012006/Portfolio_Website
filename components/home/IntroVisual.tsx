"use client";

import { useState } from "react";
import Image from "next/image";
import type { VisualAssetConfig } from "@/data/assets";

interface IntroVisualProps {
  asset: VisualAssetConfig;
  className?: string;
  priority?: boolean;
}

/**
 * IntroVisual abstracts the side panel visual pipeline:
 * Future GIF/animation asset plays once, settles into final still image.
 * If no intro animation is configured, renders the final still image.
 */
export default function IntroVisual({
  asset,
  className = "",
  priority = false,
}: IntroVisualProps) {
  const [introFinished, setIntroFinished] = useState(!asset.introSrc);

  return (
    <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
      {/* If an intro asset exists and hasn't finished, display it */}
      {asset.introSrc && !introFinished ? (
        <img
          src={asset.introSrc}
          alt={asset.alt}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          onLoad={() => {
            // Can attach timing or ended handler when provided
          }}
        />
      ) : (
        /* Final still image representation */
        <div className="relative w-full h-full">
          <Image
            src={asset.finalSrc}
            alt={asset.alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 35vw"
            className="object-cover object-center pointer-events-none transition-opacity duration-700 ease-out"
          />
        </div>
      )}

      {/* Atmospheric dark vignette overlay to blend edges with continuous canvas */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background/40 via-transparent to-background/60" />
    </div>
  );
}

