"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/data/routes";

interface SubpageLayoutProps {
  badge: string;
  title: string;
  children?: React.ReactNode;
}

export default function SubpageLayout({
  badge,
  title,
  children,
}: SubpageLayoutProps) {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const isNavigatingRef = useRef(false);

  // Return to the canvas by sliding the page downward
  const returnToCanvas = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      router.push(ROUTES.home);
      return;
    }

    setIsExiting(true);
    setTimeout(() => {
      router.push(ROUTES.home);
    }, 550);
  }, [router]);

  // Scrolling up returns to canvas
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (isNavigatingRef.current) return;
      if (e.deltaY < -35) {
        returnToCanvas();
      }
    },
    [returnToCanvas]
  );

  return (
    <div
      onWheel={handleWheel}
      style={{
        transform: isExiting
          ? "translate3d(0, 100%, 0)"
          : "translate3d(0, 0, 0)",
        transition: "transform 650ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="w-full h-[calc(100svh-var(--navbar-height))] overflow-hidden flex flex-col items-center justify-center p-8 text-center bg-background select-none will-change-transform"
    >
      <div className="space-y-4 max-w-md">
        <span className="text-xs font-mono tracking-widest text-accent uppercase">
          {badge}
        </span>
        <h1 className="text-2xl md:text-3xl font-light tracking-wider uppercase text-foreground">
          {title}
        </h1>
        {children ? (
          children
        ) : (
          <p className="text-sm font-mono text-muted">
            Under development.
          </p>
        )}
        <div className="pt-6">
          <button
            onClick={returnToCanvas}
            className="inline-block text-xs font-mono tracking-widest uppercase text-muted hover:text-accent transition-colors underline underline-offset-8 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          >
            ← Return to Canvas
          </button>
        </div>
      </div>
    </div>
  );
}

