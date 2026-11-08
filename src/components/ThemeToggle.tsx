"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const mountedRef = useRef(false);
  const [isClient, setIsClient] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return stored ? stored === "dark" : prefersDark;
  });

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      document.documentElement.classList.toggle("light", !dark);
      localStorage.setItem("theme", dark ? "dark" : "light");
    }
  }, [dark, isClient]);

  function toggle() {
    const next = !dark;
    setDark(next);
    if (isClient) {
      document.documentElement.classList.toggle("light", next);
      localStorage.setItem("theme", next ? "light" : "dark");
    }
  }

  if (!isClient) {
    return (
      <button
        aria-label="Toggle theme"
        className="h-10 w-10 rounded-lg glass flex items-center justify-center focus-ring"
      >
        <span className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative h-10 w-10 rounded-lg glass flex items-center justify-center focus-ring transition-all hover:glass-strong group"
      data-cursor={dark ? "LIGHT MODE" : "DARK MODE"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: dark ? 0 : 180, scale: [1, 0.8, 1] }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {dark ? (
          <motion.svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-5 w-5 text-[var(--accent)]"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </motion.svg>
        ) : (
          <motion.svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-5 w-5 text-[var(--muted-foreground)]"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </motion.svg>
        )}
      </motion.div>
      <span className="sr-only">{dark ? "Dark mode" : "Light mode"}</span>
    </button>
  );
}