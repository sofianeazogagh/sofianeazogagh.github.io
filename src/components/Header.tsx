"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#publications", label: "Publications" },
  { href: "/#teaching", label: "Teaching" },
  { href: "/#talks", label: "Talks & Posters" },
  { href: "/blog/", label: "Blog" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-paper/80 dark:bg-night/80 border-b border-zinc-200/70 dark:border-zinc-800/70">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight hover:text-accent-600 dark:hover:text-accent-300 transition-colors"
        >
          Sofiane Azogagh
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-accent-600 dark:hover:text-accent-300 rounded-lg hover:bg-accent-50 dark:hover:bg-zinc-800/70 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="ml-2 pl-2 border-l border-zinc-200 dark:border-zinc-700">
            <ThemeToggle />
          </div>
        </nav>

        <div className="flex md:hidden items-center gap-1">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
              {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-paper dark:bg-night px-5 py-3 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-accent-600 dark:hover:text-accent-300 rounded-lg hover:bg-accent-50 dark:hover:bg-zinc-800/70 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
