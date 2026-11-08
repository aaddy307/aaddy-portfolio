"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { projects } from "@/data/projects";

const categories = ["All", ...new Set(projects.flatMap((p) => p.category))];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProjects = filter === "All"
    ? projects
    : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative section-padding">
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
          className="mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-border text-sm font-medium text-accent mb-6">
            <span className="relative h-2 w-2 rounded-full bg-accent animate-pulse" />
            Selected Work
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight leading-[1.1]">
            <span className="gradient-text">Projects</span>
            <span className="block text-foreground">That Ship</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            A collection of production applications, side projects, and experiments.
            Each one taught me something new.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 flex flex-wrap items-center gap-3"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all overflow-hidden ${
                filter === cat
                  ? "text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={{
                background: filter === cat
                  ? "linear-gradient(135deg, var(--accent), var(--accent-muted))"
                  : "transparent",
                border: filter === cat ? "none" : "1px solid var(--border)",
              }}
            >
              {cat}
              {filter === cat && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{ background: "linear-gradient(90deg, var(--accent), var(--accent-muted))" }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-between gap-4 mb-10"
        >
          <div className="glass rounded-xl px-4 py-2 text-sm text-muted-foreground">
            {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"} found
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-xl transition-all ${viewMode === "grid" ? "glass-strong text-accent" : "glass text-muted-foreground hover:text-foreground"}`}
              aria-label="Grid view"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-xl transition-all ${viewMode === "list" ? "glass-strong text-accent" : "glass text-muted-foreground hover:text-foreground"}`}
              aria-label="List view"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={viewMode === "grid"
              ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              : "space-y-4"
            }
          >
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-12 text-center"
            style={{ border: "1px solid var(--border)" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-16 w-16 mx-auto mb-4 text-muted-foreground">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <h3 className="text-xl font-semibold text-foreground mb-2">No projects found</h3>
            <p className="text-muted-foreground">Try adjusting your filter to see more projects.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="relative group glass rounded-2xl overflow-hidden transition-all duration-500"
      style={{
        border: "1px solid var(--border)",
        background: "linear-gradient(135deg, var(--card) 0%, var(--card-hover) 100%)",
      }}
    >
      <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
        background: "radial-gradient(ellipse at center, var(--accent) 0%, transparent 70%)",
        opacity: 0.1,
      }} />

      <div className="relative aspect-video overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[rgba(0,0,0,0.8)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              whileHover={{ scale: 1.1, rotate: 0 }}
              className="inline-flex h-16 w-16 items-center justify-center rounded-2xl mb-4"
              style={{
                background: "linear-gradient(135deg, var(--accent)/30, var(--accent-muted)/30)",
                border: "1px solid var(--accent)/50",
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" className="h-8 w-8">
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                <path d="M18 3v6h6" />
                <path d="M10 14L21 3" />
              </svg>
            </motion.div>
            <p className="text-sm font-medium text-foreground">View Live Demo</p>
          </div>
        </div>

        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
          />
        )}

        {!project.image && (
          <div className="absolute inset-0 flex items-center justify-center" style={{
            background: "linear-gradient(135deg, var(--accent)/10, var(--accent-muted)/10)",
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1" className="h-16 w-16 opacity-30">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 12l2 2 4-4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
            </svg>
          </div>
        )}

        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="px-3 py-1 rounded-full text-xs font-semibold text-background"
            style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-muted))" }}
          >
            {project.category}
          </motion.span>
          {project.featured && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: "linear-gradient(135deg, #fbbf24, #f43f5e)", color: "#030305" }}
            >
              Featured
            </motion.span>
          )}
        </div>

        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-10 rounded-xl flex items-center justify-center transition-all"
            style={{
              background: "linear-gradient(135deg, var(--accent), var(--accent-muted))",
              boxShadow: "0 4px 20px var(--accent)/40",
            }}
            aria-label={`View ${project.title} live demo`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--background)" strokeWidth="2" className="h-5 w-5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <path d="M15 3h6v6" />
              <path d="M10 14L21 3" />
            </svg>
          </a>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all"
              style={{
                background: "linear-gradient(135deg, var(--accent)/10, var(--accent-muted)/10)",
                border: "1px solid var(--accent)/20",
                color: "var(--accent)",
              }}
            >
              {tag}
            </motion.span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2.5 py-1 rounded-lg text-xs text-muted-foreground border border-border">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-accent-muted group-hover:bg-clip-text transition-all duration-300">
          {project.title}
        </h3>

        <p className="text-muted-foreground text-base leading-relaxed line-clamp-3">
          {project.description}
        </p>

        <div className="flex items-center gap-3 pt-2 border-t border-border">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors group"
          >
            <motion.svg
              whileHover={{ rotate: 360 }}
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </motion.svg>
            Code
          </a>

          <div className="flex-1" />

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
            <span>{project.year}</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
        background: "linear-gradient(90deg, var(--accent), var(--accent-muted), var(--accent))",
        backgroundSize: "200% 100%",
      }}>
        <div className="absolute inset-0" style={{ background: "inherit", animation: "shimmer 3s ease-in-out infinite" }} />
      </div>
    </motion.article>
  );
}