import Link from "next/link";
import { ROUTES } from "@/data/routes";

export default function AboutPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <div className="space-y-4 max-w-md">
        <span className="text-xs font-mono tracking-widest text-accent uppercase">
          [ Section // About ]
        </span>
        <h1 className="text-2xl md:text-3xl font-light tracking-wider uppercase text-foreground">
          About Me
        </h1>
        <p className="text-sm font-mono text-muted">
          Under development.
        </p>
        <div className="pt-6">
          <Link
            href={ROUTES.home}
            className="inline-block text-xs font-mono tracking-widest uppercase text-muted hover:text-accent transition-colors underline underline-offset-8"
          >
            ← Return to Canvas
          </Link>
        </div>
      </div>
    </main>
  );
}

