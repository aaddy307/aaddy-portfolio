"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skillIcons: Record<string, React.ReactNode> = {
  "MongoDB": <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 2C6.48 2 2 5.58 2 11s4.48 9 10 9 10-3.58 10-9-4.48-9-10-9zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/></svg>,
  "Express": <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  "React": <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>,
  "Node.js": <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>,
  "Next.js": <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  "React Native": <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>,
  "Expo": <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>,
  "TypeScript": <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>,
  "JavaScript": <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M18 14v3.5c0 .28-.22.5-.5.5H6.5c-.28 0-.5-.22-.5-.5V14c0-.28.22-.5.5-.5h3v-3.5c0-.28.22-.5.5-.5h8c.28 0 .5.22.5.5V14h3c.28 0 .5.22.5.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>,
  "Socket.io": <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>,
  "WebRTC": <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M17 10.5V7a2 2 0 0 0-2-2h-3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3.5l4 4v-11l-4 4z"/></svg>,
  "Groq API": <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>,
  "Vercel": <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
  "AI coding agents": <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>,
};

const categories = [
  { name: "Frontend", skills: ["React", "Next.js", "React Native", "TypeScript", "JavaScript"] },
  { name: "Backend", skills: ["Node.js", "Express", "MongoDB", "Socket.io", "WebRTC"] },
  { name: "Tools & Platform", skills: ["Expo", "Groq API", "Vercel", "AI coding agents"] },
];

export default function Skills() {
  const ref = useRef(null);
  useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative section-padding" ref={ref}>
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
            Tech Stack
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight leading-[1.1]">
            <span className="text-foreground">Skills &</span>
            <span className="block gradient-text">Technologies</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The tools I use to build scalable, performant applications.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="space-y-12"
        >
          {categories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + catIndex * 0.1 }}
            >
              <h3 className="text-lg font-display font-semibold text-foreground mb-6 flex items-center gap-3">
                <span className="h-1 w-8" style={{ background: "linear-gradient(90deg, var(--accent), var(--accent-muted))" }} />
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => (
                  <motion.button
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.3 + catIndex * 0.1 + i * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group flex items-center gap-2 px-4 py-2.5 rounded-xl glass transition-all hover:glass-strong focus-ring"
                    style={{ border: "1px solid var(--border)" }}
                    aria-label={skill}
                  >
                    <span className="text-accent flex-shrink-0">{skillIcons[skill]}</span>
                    <span className="font-medium text-foreground">{skill}</span>
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                      style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-muted))", color: "var(--background)" }}
                    >
                      {i + 1}
                    </motion.span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="mt-16 glass rounded-2xl p-8 text-center"
          style={{ border: "1px solid var(--border)" }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-accent to-transparent" />
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Always Learning</span>
            <div className="h-px w-16 bg-gradient-to-r from-accent via-transparent to-transparent" />
          </div>
          <h3 className="text-2xl font-display font-bold text-foreground mb-3">Currently Exploring</h3>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            The best developers never stop learning. Here&apos;s what I&apos;m diving into right now.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["Rust", "WebAssembly", "AI/ML", "System Design", "Go", "Kubernetes"].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: "linear-gradient(135deg, var(--accent)/10, var(--accent-muted)/10)",
                  border: "1px solid var(--accent)/20",
                  color: "var(--accent)",
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}