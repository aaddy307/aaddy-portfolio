"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { projects } from "@/data/projects";

const MediAIPreview = dynamic(
  () => import("./MediAIPreview").then((mod) => mod.default),
  { ssr: false, loading: () => <ProjectPlaceholder title="Loading..." /> }
);

const projectColors: Record<string, string> = {
  "Full Stack": "rgba(163, 230, 53, 0.08)",
  "E-commerce": "rgba(234, 179, 8, 0.08)",
  "Mobile App": "rgba(236, 72, 153, 0.08)",
  "B2B": "rgba(34, 211, 238, 0.08)",
  "Client Work": "rgba(139, 92, 246, 0.08)",
};

export default function Projects() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const prefersReducedMotionRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotionRef.current = mq.matches;
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = e.matches;
      setPrefersReducedMotion(e.matches);
    };
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  return (
    <section id="projects" className="relative overflow-hidden">
      <div className="grain" aria-hidden="true" />
      <div className="grid-bg" aria-hidden="true" />

      <div className="section-container relative z-10 pt-24 lg:pt-32">
        <motion.div
          className="reveal-line mb-16 lg:mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="micro-label accent mb-6">04 / PROJECTS</span>
          <span className="display-xl text-foreground">SELECTED WORK</span>
        </motion.div>

        <motion.p
          className="text-lg lg:text-xl text-muted-foreground max-w-2xl mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          A collection of production applications, side projects, and experiments.
          Each one taught me something new.
        </motion.p>

        <div className="relative">
          {projects.map((project, i) => (
            <ProjectPanel
              key={project.id}
              project={project}
              index={i}
              total={projects.length}
              color={projectColors[project.category] || projectColors["Full Stack"]}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProjectPanelProps {
  project: typeof projects[0];
  index: number;
  total: number;
  color: string;
  prefersReducedMotion: boolean;
}

function ProjectPanel({ project, index, total, color, prefersReducedMotion }: ProjectPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const isReducedMotionRef = useRef(prefersReducedMotion);

  useEffect(() => {
    isReducedMotionRef.current = prefersReducedMotion;
    if (prefersReducedMotion) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" }
    );

    if (panelRef.current) {
      observer.observe(panelRef.current);
    }
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const isMediAI = project.title === "MediAI";

  return (
    <motion.div
      ref={panelRef}
      className="project-panel relative"
      style={{
        background: color,
        zIndex: total - index,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="project-panel-index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="project-panel-content relative z-10">
        <motion.div
          className="mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <p className="micro-label mb-4" style={{ color: "var(--accent)" }}>
            {project.category.toUpperCase()}
          </p>
          <h2 className="display-lg font-display font-bold text-foreground">
            {project.title}
          </h2>
        </motion.div>

        <motion.div
          className="mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </motion.div>

        <motion.div
          className="mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag, i) => (
              <motion.span
                key={tag}
                className="tag-pill"
                data-cursor={tag.toUpperCase()}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.06 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {isMediAI ? (
            <MediAIPreview url={project.liveUrl} />
          ) : (
            <ProjectPlaceholder title={project.title} />
          )}
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center gap-4 pt-6 border-t border-[var(--border)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {project.liveUrl && project.liveUrl !== "#" && project.liveUrl !== "[ADD: Live URL]" && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-btn btn-primary px-6 py-3 focus-ring"
              data-cursor="LIVE DEMO"
              style={{
                background: "linear-gradient(135deg, var(--accent), var(--accent-muted))",
                color: "var(--background)",
              }}
            >
              Live Demo
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <path d="M15 3h6v6" />
                <path d="M10 14L21 3" />
              </svg>
            </a>
          )}
          {project.githubUrl && project.githubUrl !== "#" && project.githubUrl !== "[ADD: GitHub URL]" && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-btn btn-secondary px-6 py-3 focus-ring"
              data-cursor="SOURCE CODE"
            >
              Source Code
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          )}
          <div className="flex-1" />
          <div className="micro-label text-[var(--muted-foreground)]">{project.year}</div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ProjectPlaceholder({ title }: { title: string }) {
  return (
    <div className="placeholder-visual">
      <div className="placeholder-visual-content">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1" className="opacity-50" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 12l2 2 4-4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
        </svg>
        <span className="font-display text-lg text-[var(--muted-foreground)]">Preview: {title}</span>
        <span className="micro-label text-[var(--muted-foreground)]">Placeholder visual</span>
      </div>
    </div>
  );
}