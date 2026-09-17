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

interface IncomingMeta {
  route: string;
  badge: string;
  title: string;
}

const getRouteMeta = (route: string): IncomingMeta => {
  if (route === ROUTES.build) {
    return { route: ROUTES.build, badge: "[ Section // Build ]", title: "Build" };
  }
  if (route === ROUTES.about) {
    return { route: ROUTES.about, badge: "[ Section // About ]", title: "About Me" };
  }
  return { route: ROUTES.experience, badge: "[ Gateway // Experience ]", title: "Experience" };
};

export default function HomeCanvas({ children }: HomeCanvasProps) {
  const router = useRouter();
  const [activeRegion, setActiveRegion] = useState<ActiveRegion>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [incomingMeta, setIncomingMeta] = useState<IncomingMeta>({
    route: ROUTES.experience,
    badge: "[ Gateway // Experience ]",
    title: "Experience",
  });

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

  // Trigger window-scrolling page transition to target route
  const triggerScrollNavigation = useCallback(
    (route: string) => {
      if (isNavigatingRef.current) return;
      isNavigatingRef.current = true;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        router.push(route);
        return;
      }

      setIncomingMeta(getRouteMeta(route));
      setIsScrollingDown(true);

      // Navigate as the window finishes scrolling down
      setTimeout(() => {
        router.push(route);
      }, 550);
    },
    [router]
  );

  // Keyboard navigation handler
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, route: string) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        triggerScrollNavigation(route);
      }
    },
    [triggerScrollNavigation]
  );

  // Intentional scroll down on desktop moves the window into the target page
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (typeof window === "undefined" || isNavigatingRef.current) return;
      const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (!isFinePointer) return;

      // Only scroll down (deltaY > 0) navigates down into the page
      if (e.deltaY <= 0) return;

      accumulatedWheelRef.current += e.deltaY;

      if (wheelResetTimeoutRef.current) {
        clearTimeout(wheelResetTimeoutRef.current);
      }

      wheelResetTimeoutRef.current = setTimeout(() => {
        accumulatedWheelRef.current = 0;
      }, 250);

      if (accumulatedWheelRef.current >= LAYOUT_CONFIG.scrollNav.wheelThreshold) {
        accumulatedWheelRef.current = 0;

        let targetRoute: string = ROUTES.experience;
        if (activeRegion === "build") {
          targetRoute = ROUTES.build;
        } else if (activeRegion === "about") {
          targetRoute = ROUTES.about;
        } else if (activeRegion === "center") {
          targetRoute = ROUTES.experience;
        } else {
          // Cursor position fallback
          const width = window.innerWidth;
          if (e.clientX < width * 0.35) {
            targetRoute = ROUTES.build;
          } else if (e.clientX > width * 0.65) {
            targetRoute = ROUTES.about;
          } else {
            targetRoute = ROUTES.experience;
          }
        }

        triggerScrollNavigation(targetRoute);
      }
    },
    [activeRegion, triggerScrollNavigation]
  );

  useEffect(() => {
    return () => {
      if (wheelResetTimeoutRef.current) {
        clearTimeout(wheelResetTimeoutRef.current);
      }
    };
  }, []);

  // Panel widths
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
      className="relative w-full h-[calc(100svh-var(--navbar-height))] overflow-hidden bg-background select-none"
    >
      {/* Sliding Window Container */}
      <div
        style={{
          transform: isScrollingDown
            ? "translate3d(0, -100%, 0)"
            : "translate3d(0, 0, 0)",
          transition: "transform 650ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="w-full h-full will-change-transform"
      >
        {/* Screen 1: The 30/40/30 Continuous Spatial Canvas */}
        <div className="w-full h-full flex flex-col md:flex-row">
          {/* Left Region — BUILD (Desktop ~30%) */}
          <section
            style={{
              flexBasis: isDesktop ? `${leftWidth}%` : undefined,
            }}
            className="relative h-1/3 md:h-full md:flex-none transition-[flex-basis] duration-500 ease-canvas z-10"
          >
            <BuildPanel
              onMouseEnter={() => setActiveRegion("build")}
              onMouseLeave={() =>
                setActiveRegion((prev) => (prev === "build" ? null : prev))
              }
              onClick={() => triggerScrollNavigation(ROUTES.build)}
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
              onNavigate={() => triggerScrollNavigation(ROUTES.experience)}
              onKeyDown={(e) => handleKeyDown(e, ROUTES.experience)}
              onMouseEnter={() => setActiveRegion("center")}
              onMouseLeave={() =>
                setActiveRegion((prev) => (prev === "center" ? null : prev))
              }
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
              onMouseLeave={() =>
                setActiveRegion((prev) => (prev === "about" ? null : prev))
              }
              onClick={() => triggerScrollNavigation(ROUTES.about)}
              onKeyDown={(e) => handleKeyDown(e, ROUTES.about)}
              isHovered={activeRegion === "about"}
            />
          </section>
        </div>

        {/* Screen 2: Incoming Target Page (directly below Screen 1) */}
        <div
          aria-hidden="true"
          className="absolute top-full left-0 right-0 w-full h-full flex flex-col items-center justify-center p-8 text-center bg-background border-t border-border-subtle pointer-events-none"
        >
          <div className="space-y-4 max-w-md">
            <span className="text-xs font-mono tracking-widest text-accent uppercase">
              {incomingMeta.badge}
            </span>
            <h1 className="text-2xl md:text-3xl font-light tracking-wider uppercase text-foreground">
              {incomingMeta.title}
            </h1>
            <p className="text-sm font-mono text-muted">
              Under development.
            </p>
            <div className="pt-6">
              <span className="inline-block text-xs font-mono tracking-widest uppercase text-muted underline underline-offset-8">
                ← Return to Canvas
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
