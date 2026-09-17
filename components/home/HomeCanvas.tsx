"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/data/routes";
import { LAYOUT_CONFIG } from "@/data/layout";
import BuildPanel from "./BuildPanel";
import AboutPanel from "./AboutPanel";
import CenterIdentity from "./CenterIdentity";

export type ActiveRegion = "build" | "center" | "about" | null;

interface HomeCanvasProps {
  children?: React.ReactNode; // Optional slot for Infinite Spiral in center
}

export default function HomeCanvas({ children }: HomeCanvasProps) {
  const router = useRouter();
  const [activeRegion, setActiveRegion] = useState<ActiveRegion>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const isNavigatingRef = useRef(false);
  const accumulatedWheelRef = useRef(0);
  const wheelResetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateMedia = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    updateMedia();
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  // Navigate safely to a target route with transition lock
  const navigateTo = useCallback(
    (route: string) => {
      if (isNavigatingRef.current) return;
      isNavigatingRef.current = true;
      router.push(route);
    },
    [router]
  );

  // Keyboard navigation handler
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, route: string) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        navigateTo(route);
      }
    },
    [navigateTo]
  );

  // Intentional scroll navigation on desktop
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      // Only enable intentional scroll navigation on desktop pointer devices
      if (typeof window === "undefined") return;
      const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (!isFinePointer || !activeRegion || isNavigatingRef.current) return;

      accumulatedWheelRef.current += e.deltaY;

      if (wheelResetTimeoutRef.current) {
        clearTimeout(wheelResetTimeoutRef.current);
      }

      wheelResetTimeoutRef.current = setTimeout(() => {
        accumulatedWheelRef.current = 0;
      }, 250);

      if (Math.abs(accumulatedWheelRef.current) >= LAYOUT_CONFIG.scrollNav.wheelThreshold) {
        accumulatedWheelRef.current = 0;
        if (activeRegion === "build") {
          navigateTo(ROUTES.build);
        } else if (activeRegion === "about") {
          navigateTo(ROUTES.about);
        } else if (activeRegion === "center") {
          navigateTo(ROUTES.experience);
        }
      }
    },
    [activeRegion, navigateTo]
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (wheelResetTimeoutRef.current) {
        clearTimeout(wheelResetTimeoutRef.current);
      }
    };
  }, []);

  // Compute dynamic widths for desktop:
  // Center NEVER expands (always remains fixed at 40%).
  // Side hover expands that side by sideExpansion (3%), compressing the other side to 27%.
  const { leftNormal, centerNormal, rightNormal, sideExpansion } =
    LAYOUT_CONFIG.desktopWidths;

  let leftWidth = leftNormal;
  const centerWidth = centerNormal; // Stays fixed at 40%
  let rightWidth = rightNormal;

  if (activeRegion === "build") {
    leftWidth = leftNormal + sideExpansion; // 33%
    rightWidth = rightNormal - sideExpansion; // 27%
  } else if (activeRegion === "about") {
    leftWidth = leftNormal - sideExpansion; // 27%
    rightWidth = rightNormal + sideExpansion; // 33%
  }

  return (
    <div
      onWheel={handleWheel}
      className="relative w-full h-[calc(100svh-var(--navbar-height))] overflow-hidden flex flex-col md:flex-row bg-background select-none"
    >
      {/* Left Region — BUILD (Desktop ~30%) */}
      <section
        style={{
          flexBasis: isDesktop ? `${leftWidth}%` : undefined,
        }}
        className="relative h-1/3 md:h-full md:flex-none transition-[flex-basis] duration-500 ease-canvas z-10"
      >
        <BuildPanel
          onMouseEnter={() => setActiveRegion("build")}
          onMouseLeave={() => setActiveRegion((prev) => (prev === "build" ? null : prev))}
          onClick={() => navigateTo(ROUTES.build)}
          onKeyDown={(e) => handleKeyDown(e, ROUTES.build)}
          isHovered={activeRegion === "build"}
        />
      </section>

      {/* Center Region — DOMINIC THOMAS Identity + Canvas (Desktop ~40%, NEVER expands) */}
      <section
        style={{
          flexBasis: isDesktop ? `${centerWidth}%` : undefined,
        }}
        className="relative h-1/3 md:h-full md:flex-none flex-1 z-0"
      >
        <CenterIdentity
          onNavigate={() => navigateTo(ROUTES.experience)}
          onKeyDown={(e) => handleKeyDown(e, ROUTES.experience)}
          onMouseEnter={() => setActiveRegion("center")}
          onMouseLeave={() => setActiveRegion((prev) => (prev === "center" ? null : prev))}
          isHovered={activeRegion === "center"}
        >
          {children}
        </CenterIdentity>
      </section>

      {/* Right Region — ABOUT ME (Desktop ~30%) */}
      <section
        style={{
          flexBasis: isDesktop ? `${rightWidth}%` : undefined,
        }}
        className="relative h-1/3 md:h-full md:flex-none transition-[flex-basis] duration-500 ease-canvas z-10"
      >
        <AboutPanel
          onMouseEnter={() => setActiveRegion("about")}
          onMouseLeave={() => setActiveRegion((prev) => (prev === "about" ? null : prev))}
          onClick={() => navigateTo(ROUTES.about)}
          onKeyDown={(e) => handleKeyDown(e, ROUTES.about)}
          isHovered={activeRegion === "about"}
        />
      </section>
    </div>
  );
}
