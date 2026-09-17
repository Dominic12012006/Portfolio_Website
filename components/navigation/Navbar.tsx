"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/data/navigation";
import { ROUTES } from "@/data/routes";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[var(--navbar-height)] flex items-center justify-between px-6 md:px-10 pointer-events-auto backdrop-blur-md bg-background/60 border-b border-border-subtle transition-colors duration-300">
      <Link
        href={ROUTES.home}
        className="text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
        aria-label="Dominic Thomas - Home"
      >
        DT
      </Link>

      <nav aria-label="Main navigation">
        <ul className="flex items-center gap-6 md:gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`text-xs font-mono tracking-widest uppercase transition-colors relative py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                    isActive
                      ? "text-accent"
                      : "text-muted hover:text-foreground"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-[1px] bg-accent opacity-80" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

