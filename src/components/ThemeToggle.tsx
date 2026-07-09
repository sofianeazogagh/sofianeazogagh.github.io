"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "./Icons";

// The <html> class is the single source of truth so the desktop and mobile
// toggle instances always stay in sync.
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const root = document.documentElement;
    setDark(root.classList.contains("dark"));
    const observer = new MutationObserver(() =>
      setDark(root.classList.contains("dark"))
    );
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="p-2 rounded-full text-zinc-500 hover:text-accent-600 hover:bg-accent-50 dark:text-zinc-400 dark:hover:text-accent-300 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
    >
      {/* Render a stable icon until mounted to avoid hydration mismatch */}
      {mounted ? (dark ? <SunIcon /> : <MoonIcon />) : <MoonIcon />}
    </button>
  );
}
