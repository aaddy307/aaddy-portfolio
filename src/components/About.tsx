"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { personal } from "@/data/projects";
import Image from "next/image";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: "10+", label: "Projects Delivered" },
    { value: "4", label: "Sectors Served" },
    { value: "2+", label: "Years Coding" },
    { value: "1", label: "Co-founded Startup" },
  ];

  return (
    <section id="about" className="relative section-padding" ref={ref}>
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-0 left-1/2 w-full h-full max-w-4xl bg-gradient-to-b from-transparent via-transparent to-transparent" style={{
          background: "radial-gradient(ellipse at top, var(--accent) 0%, transparent 50%)",
          opacity: 0.05,
        }} />
      </div>

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-border text-sm font-medium text-accent mb-6">
            <span className="relative h-2 w-2 rounded-full bg-accent animate-pulse" />
            About Me
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight leading-[1.1]">
            <span className="text-foreground">Who I</span>
            <span className="block gradient-text">Am</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            First-year IT student turning ideas into production-ready applications.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: isInView ? 0.2 : 0 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] max-w-md mx-auto md:mx-0">
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/20 via-transparent to-accent-muted/20 rounded-3xl blur-2xl" />
              <div className="relative aspect-[4/5] glass-strong rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                {personal.avatar !== "/avatar.jpg" ? (
                  <Image
                    src={personal.avatar}
                    alt={personal.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-accent/10 to-accent-muted/10">
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" className="h-24 w-24 opacity-50">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                    </svg>
                  </div>
                )}
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-6 -right-6 h-20 w-20 rounded-2xl glass-strong flex items-center justify-center"
                style={{ border: "1px solid var(--border)" }}
              >
                <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-muted))" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--background)" strokeWidth="2.5" className="h-6 w-6">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: isInView ? 0.3 : 0 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className="text-2xl sm:text-3xl font-display font-bold tracking-tight">
                <span className="text-foreground">Building with</span>
                <span className="block gradient-text">Code & AI</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {personal.bio}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="glass rounded-xl p-5 text-center transition-all hover:glass-strong hover:border-accent/50"
                  style={{ border: "1px solid var(--border)" }}
                >
                  <div className="text-3xl sm:text-4xl font-display font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              {["MERN Stack", "Next.js", "React Native", "TypeScript", "AI Agents", "Freelance"].map((focus, i) => (
                <motion.span
                  key={focus}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: "linear-gradient(135deg, var(--accent)/10, var(--accent-muted)/10)",
                    border: "1px solid var(--accent)/20",
                    color: "var(--accent)",
                  }}
                >
                  {focus}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-4"
            >
              <a
                href={personal.resume}
                className="btn-secondary"
                download
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="inline h-4 w-4 mr-2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                Download Resume
              </a>
              <a
                href={personal.github}
                className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href={personal.linkedin}
                className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}