"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { personal, socialLinks } from "@/data/projects";

export default function Footer() {
  const mountedRef = useRef(false);
  const [year, setYear] = useState(2024);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      setYear(new Date().getFullYear());
    }
  }, []);

  const footerLinks = {
    navigate: [
      { href: "#about", label: "About" },
      { href: "#skills", label: "Skills" },
      { href: "#projects", label: "Projects" },
      { href: "#services", label: "Services" },
      { href: "#contact", label: "Contact" },
    ],
    resources: [
      { href: personal.github, label: "GitHub" },
      { href: personal.linkedin, label: "LinkedIn" },
      { href: personal.resume, label: "Resume" },
      { href: "#", label: "Blog" },
    ],
    legal: [
      { href: "#", label: "Privacy" },
      { href: "#", label: "Terms" },
      { href: "#", label: "Cookie Policy" },
    ],
  };

  return (
    <footer className="relative section-padding border-t" style={{ borderColor: "var(--border)" }}>
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-gradient-to-b from-transparent via-transparent to-transparent" style={{
          background: "radial-gradient(ellipse at top, var(--accent) 0%, transparent 50%)",
          opacity: 0.08,
        }} />
      </div>

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <Link
            href="#"
            className="inline-flex items-center gap-1 text-2xl font-display font-bold tracking-tight text-foreground mb-6 group"
          >
            <span className="gradient-text group-hover:scale-110 transition-transform">{personal.name}</span>
          </Link>
          <p className="text-muted-foreground max-w-xs text-base leading-relaxed">
            {personal.tagline}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16"
        >
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Navigate</h4>
            <nav className="space-y-3">
              {footerLinks.navigate.map((link, i) => (
                <motion.a
                  key={`${link.href}-${i}`}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors group"
                >
                  <motion.span
                    whileHover={{ scale: [1, 1.2, 1] }}
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                  />
                  <span className="text-sm">{link.label}</span>
                </motion.a>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Resources</h4>
            <nav className="space-y-3">
              {footerLinks.resources.map((link, i) => (
                <motion.a
                  key={`${link.href}-${i}`}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors group"
                >
                  <motion.span
                    whileHover={{ scale: [1, 1.2, 1] }}
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                  />
                  <span className="text-sm">{link.label}</span>
                </motion.a>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Legal</h4>
            <nav className="space-y-3">
              {footerLinks.legal.map((link, i) => (
                <motion.a
                  key={`${link.href}-${i}`}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors group"
                >
                  <motion.span
                    whileHover={{ scale: [1, 1.2, 1] }}
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                  />
                  <span className="text-sm">{link.label}</span>
                </motion.a>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Connect</h4>
            <nav className="space-y-3">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors group"
                >
                  <motion.span
                    whileHover={{ scale: [1, 1.2, 1] }}
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                  />
                  <span className="text-sm">{social.name}</span>
                </motion.a>
              ))}
            </nav>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          <div className="absolute inset-0 h-px" style={{
            background: "linear-gradient(90deg, transparent, var(--border), transparent)",
          }} />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 pt-8">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-muted-foreground text-center md:text-left"
            >
              &copy; {year} {personal.name}. Built with Next.js, Tailwind CSS & Framer Motion.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3"
            >
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-10 w-10 rounded-xl flex items-center justify-center glass transition-all hover:glass-strong group"
                  style={{ border: "1px solid var(--border)" }}
                  aria-label={social.name}
                >
                  {social.icon === "github" && (
                    <motion.svg
                      whileHover={{ rotate: 360 }}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors"
                    >
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </motion.svg>
                  )}
                  {social.icon === "linkedin" && (
                    <motion.svg
                      whileHover={{ rotate: 360 }}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </motion.svg>
                  )}
                  {social.icon === "email" && (
                    <motion.svg
                      whileHover={{ rotate: 360 }}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </motion.svg>
                  )}
                </motion.a>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 pt-8"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
              <span>Made with</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex items-center gap-1"
                style={{ color: "var(--accent)" }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                <span>passion</span>
              </motion.span>
              <span className="hidden sm:inline">|</span>
              <span>TypeScript</span>
              <span className="hidden sm:inline">|</span>
              <span>React</span>
              <span className="hidden sm:inline">|</span>
              <span>Tailwind</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl glass border border-border transition-all hover:glass-strong"
            style={{ background: "linear-gradient(135deg, var(--accent)/20, var(--accent-muted)/20)" }}
            aria-label="Scroll to top"
          >
            <span className="text-sm text-muted-foreground">Scroll to top</span>
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-8 w-8 rounded-xl flex items-center justify-center transition-all"
              style={{ background: "linear-gradient(135deg, var(--accent)/20, var(--accent-muted)/20)", border: "1px solid var(--accent)/30" }}
            >
              <motion.svg
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <path d="M18 15l-6-6-6 6" />
              </motion.svg>
            </motion.div>
          </a>
        </motion.div>
      </div>
    </footer>
  );
}