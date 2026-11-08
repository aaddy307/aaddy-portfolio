"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import ThemeToggle from "./ThemeToggle";

const CustomCursor = dynamic(() => import("./CustomCursor").then((mod) => mod.default), { ssr: false });

const navSections = [
  { id: "about", label: "ABOUT" },
  { id: "skills", label: "SKILLS" },
  { id: "projects", label: "PROJECTS" },
  { id: "services", label: "SERVICES" },
  { id: "contact", label: "CONTACT" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion) return;

    let lenis: any = null;

    const initLenis = async () => {
      const LenisModule = await import("lenis");
      const LenisClass = LenisModule.default;
      lenis = new LenisClass({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      function raf(time: number) {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      navSections.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) {
          lenis?.on("scroll", ({ scroll }: { scroll: number }) => {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
              setActiveSection(id);
            }
          });
        }
      });
    };

    initLenis();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    setIsScrolled(window.scrollY > 20);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      lenis?.destroy();
    };
  }, [prefersReducedMotion]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      {!prefersReducedMotion && !isMobile && <CustomCursor />}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)]" : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link
              href="#"
              className="font-display font-bold text-xl lg:text-2xl tracking-tight text-foreground hover:text-[var(--accent)] transition-colors focus-ring"
              aria-label="Aaddy - Home"
            >
              AADDY
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {navSections.map(({ id, label }) => (
                <Link
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(id);
                  }}
                  className={`relative micro-label transition-colors ${
                    activeSection === id
                      ? "text-[var(--accent)]"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  }`}
                  style={{ padding: "0.25rem 0" }}
                >
                  {label}
                  {activeSection === id && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ background: "var(--accent)" }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
              <ThemeToggle />
            </div>

            <div className="lg:hidden flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-[var(--foreground)] focus-ring"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  {mobileOpen ? (
                    <>
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </>
                  ) : (
                    <>
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isMobile && mobileOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-40 bg-[var(--background)]/98 backdrop-blur-md flex flex-col items-center justify-center gap-8 p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-6 text-center">
              {navSections.map(({ id, label }, i) => (
                <Link
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(id);
                  }}
                  className={`font-display text-3xl font-bold transition-colors ${
                    activeSection === id ? "text-[var(--accent)]" : "text-[var(--foreground)]"
                  }`}
                >
                  {label}
                </Link>
              ))}
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </nav>
    </>
  );
}