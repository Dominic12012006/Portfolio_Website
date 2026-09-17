"use client";

import React, { useEffect, useMemo, useRef } from "react";
import type { SpiralImageItem } from "@/data/spiralImages";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const modulo = (value: number, divisor: number) =>
  ((value % divisor) + divisor) % divisor;

const smoothstep = (min: number, max: number, value: number) => {
  const x = clamp((value - min) / (max - min || 1), 0, 1);
  return x * x * (3 - 2 * x);
};

export interface InfiniteSpiralProps {
  items: SpiralImageItem[];
  speed?: number;
  direction?: "up" | "down";
  animationMode?: "auto";
  radius?: number;
  cardWidth?: number;
  cardHeight?: number;
  verticalSpacing?: number;
  perspective?: number;
  cardsPerTurn?: number;
  rotation?: number;
  cardTilt?: number;
  cardRadius?: number;
  centerScale?: number;
  edgeFade?: number;
  edgeBlur?: number;
  pauseOnHover?: boolean;
  imageFit?: "cover" | "contain" | "fill";
  grayscale?: number;
  className?: string;
}

/**
 * InfiniteSpiral:
 * Adapted from the official React Bits Infinite Spiral component.
 * Configured as a non-interactive, atmospheric, continuous decorative background.
 * Strictly ignores pointer dragging, scroll input, and hovering.
 * Has pointer-events: none so all center navigation events pass through cleanly.
 */
export default function InfiniteSpiral({
  items = [],
  speed = 0.32,
  direction = "up",
  radius = 175,
  cardWidth = 110,
  cardHeight = 145,
  verticalSpacing = 65,
  perspective = 1000,
  cardsPerTurn = 7,
  rotation = 0,
  cardTilt = 0,
  cardRadius = 8,
  centerScale = 1.18,
  edgeFade = 0.35,
  edgeBlur = 5,
  pauseOnHover = false,
  imageFit = "cover",
  grayscale = 0,
  className = "",
}: InfiniteSpiralProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const autoSpeedRef = useRef(0);
  const visibleRef = useRef(true);

  const normalizedItems = useMemo(
    () =>
      items.map((item, index) => ({
        id: item.id || `spiral-${index}`,
        src: item.src,
        alt: item.alt || `Spiral image ${index + 1}`,
      })),
    [items]
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root || normalizedItems.length === 0) return;

    let frameId: number;
    let previousTime = performance.now();
    let bounds = root.getBoundingClientRect();
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const resizeObserver = new ResizeObserver(() => {
      bounds = root.getBoundingClientRect();
    });
    resizeObserver.observe(root);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.02 }
    );
    intersectionObserver.observe(root);

    const render = (time: number) => {
      const delta = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;

      // Automatic travel calculation (pauses if user prefers reduced motion)
      const directionMultiplier = direction === "down" ? -1 : 1;
      const desiredAutoSpeed =
        visibleRef.current && !reducedMotionQuery.matches
          ? speed * directionMultiplier
          : 0;

      const speedBlend = 1 - Math.exp(-delta * 7);
      autoSpeedRef.current += (desiredAutoSpeed - autoSpeedRef.current) * speedBlend;
      targetProgressRef.current += autoSpeedRef.current * delta;

      const followBlend = 1 - Math.exp(-delta * 11);
      progressRef.current +=
        (targetProgressRef.current - progressRef.current) * followBlend;

      const count = normalizedItems.length;
      const half = count / 2;
      const width = Math.max(bounds.width, 1);
      const height = Math.max(bounds.height, 1);
      const fit = Math.min(
        1,
        width / (cardWidth * 2.8),
        height / (cardHeight * 2.35)
      );
      const responsiveRadius = Math.min(radius, Math.max(72, width * 0.36)) * fit;
      const fadeStart = clamp(1 - edgeFade, 0, 0.98);
      const turnSize = Math.max(cardsPerTurn, 1);

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        let offset = index - progressRef.current;
        offset = modulo(offset + half, count) - half;

        const edge = Math.min(Math.abs(offset) / Math.max(half, 1), 1);
        const opacity = 1 - smoothstep(fadeStart, 1, edge);
        const focus = 1 - Math.min(Math.abs(offset) / Math.max(turnSize * 0.65, 1), 1);
        const scale = (1 + (centerScale - 1) * focus) * fit;
        const angle = offset * (360 / turnSize) + rotation;
        const angleRadians = (angle * Math.PI) / 180;
        const x = Math.sin(angleRadians) * responsiveRadius;
        const z = Math.cos(angleRadians) * responsiveRadius;
        const depthScale = clamp(
          perspective / Math.max(perspective - z, 1),
          0.72,
          1.45
        );
        const visualScale = scale * depthScale;
        const depth = (z / Math.max(responsiveRadius, 1) + 1) / 2;
        const blur = edgeBlur * smoothstep(0.35, 1, edge);

        card.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${
          offset * verticalSpacing * fit
        }px, 0) rotateZ(${cardTilt}deg) scale(${visualScale})`;
        card.style.opacity = opacity.toFixed(3);
        card.style.filter = blur > 0.01 ? `blur(${blur.toFixed(2)}px)` : "none";
        card.style.zIndex = String(Math.round(depth * 100000) + index);
      });

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [
    normalizedItems,
    speed,
    direction,
    radius,
    perspective,
    cardWidth,
    cardHeight,
    verticalSpacing,
    cardsPerTurn,
    rotation,
    cardTilt,
    centerScale,
    edgeFade,
    edgeBlur,
  ]);

  return (
    <div
      ref={rootRef}
      className={`relative isolate h-full w-full overflow-hidden pointer-events-none select-none ${className}`}
      style={{
        perspective: `${perspective}px`,
      }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 [transform-style:preserve-3d] pointer-events-none">
        {normalizedItems.map((item, index) => (
          <div
            key={item.id}
            ref={(node) => {
              cardRefs.current[index] = node;
            }}
            className="absolute left-1/2 top-1/2 block overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.03] shadow-[0_12px_36px_rgba(0,0,0,0.5)] [backface-visibility:hidden] [transform-style:preserve-3d] [will-change:transform,opacity,filter] pointer-events-none motion-reduce:transition-none"
            style={{
              width: `${cardWidth}px`,
              height: `${cardHeight}px`,
              borderRadius: `${cardRadius}px`,
            }}
          >
            <img
              src={item.src}
              alt={item.alt}
              loading={index < 8 ? "eager" : "lazy"}
              draggable={false}
              className="absolute inset-0 block h-full w-full select-none object-cover object-center pointer-events-none"
              style={{
                objectFit: imageFit,
                filter:
                  grayscale > 0
                    ? `grayscale(${Math.min(1, Math.max(0, grayscale))})`
                    : undefined,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

