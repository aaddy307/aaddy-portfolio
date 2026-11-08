"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { skills } from "@/data/projects";

const marqueeSkills = [
  ...skills,
  ...skills,
  ...skills,
];

export default function Skills() {
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
    <section id="skills" className="relative section-padding overflow-hidden">
      <div className="grain" aria-hidden="true" />
      <div className="grid-bg" aria-hidden="true" />

      <div className="section-container relative z-10">
        <motion.div
          className="reveal-line mb-16 lg:mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="micro-label accent mb-6">03 / SKILLS</span>
          <span className="display-xl text-foreground">TECH STACK</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-16"
        >
          <Marquee
            items={marqueeSkills}
            reverse={false}
            prefersReducedMotion={prefersReducedMotion}
          />
          <Marquee
            items={marqueeSkills}
            reverse={true}
            prefersReducedMotion={prefersReducedMotion}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 pt-16 border-t border-[var(--border)]"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />
            <span className="micro-label text-[var(--muted-foreground)]">ALWAYS LEARNING</span>
            <div className="h-px w-24 bg-gradient-to-r from-[var(--accent)] via-transparent to-transparent" />
          </div>
          <h3 className="display-md font-display font-bold text-foreground mb-4 text-center">CURRENTLY EXPLORING</h3>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-center leading-relaxed">
            The best developers never stop learning. Here&apos;s what I&apos;m diving into right now.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["Rust", "WebAssembly", "AI/ML", "System Design", "Go", "Kubernetes"].map((tech, i) => (
              <motion.span
                key={tech}
                className="tag-pill text-sm px-5 py-2.5"
                data-cursor={tech.toUpperCase()}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.08 }}
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

function Marquee({
  items,
  reverse,
  prefersReducedMotion,
}: {
  items: string[];
  reverse: boolean;
  prefersReducedMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || !ref.current) return;

    const el = ref.current;
    const clone = el.cloneNode(true) as HTMLDivElement;
    el.parentNode?.appendChild(clone);

    let animationId: number;
    let position = 0;
    const speed = 0.5;

    const animate = () => {
      if (!paused) {
        position += reverse ? -speed : speed;
        if (Math.abs(position) >= el.scrollWidth / 2) {
          position = 0;
        }
        el.style.transform = `translateX(${position}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    animate();

    el.addEventListener("mouseenter", () => setPaused(true));
    el.addEventListener("mouseleave", () => setPaused(false));

    return () => {
      cancelAnimationFrame(animationId);
      clone.remove();
      el.removeEventListener("mouseenter", () => setPaused(true));
      el.removeEventListener("mouseleave", () => setPaused(false));
    };
  }, [items.length, reverse, prefersReducedMotion, paused]);

  return (
    <div className="marquee" style={{ overflow: "hidden" }}>
      <div
        ref={ref}
        className="marquee-inner flex items-center gap-8 whitespace-nowrap will-change-transform"
        style={{
          animation: prefersReducedMotion ? "none" : undefined,
          animationDuration: "30s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationName: reverse ? "marquee-reverse" : "marquee",
        }}
      >
        {items.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="tag-pill text-lg px-6 py-3 font-display font-medium uppercase tracking-wider"
            style={{
              borderColor: "var(--border)",
              background: "var(--card)",
              color: "var(--muted-foreground)",
              whiteSpace: "nowrap",
            }}
            data-cursor={skill.toUpperCase()}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}