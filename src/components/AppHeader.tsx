"use client";

import Link from "next/link";
import { useTheme } from "next-themes";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      className="rounded-xl border border-zinc-200 px-3 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      type="button"
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}

export default function AppHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white/70 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/60">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900" />
          <div>
            <div className="text-sm font-semibold leading-tight">Bharath</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">Password Strength & Crack-Time</div>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          <Link className="rounded-xl px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900" href="/">
            Home
          </Link>
          <Link className="rounded-xl px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900" href="/learn">
            Learn
          </Link>
          <Link className="rounded-xl px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900" href="/privacy">
            Privacy
          </Link>
          <Link className="rounded-xl px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900" href="/about">
            About
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
