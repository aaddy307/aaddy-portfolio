"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const WordmarkCanvas = dynamic(
  () => import("./WordmarkCanvas").then((mod) => mod.default),
  { ssr: false }
);

const agentLogLines = [
  { type: "prompt", text: "> INIT ORCHESTRATOR" },
  { type: "info", text: "  Loading agent registry..." },
  { type: "success", text: "  [OK] 12 agents registered" },
  { type: "prompt", text: "> DEPLOY MediAI" },
  { type: "info", text: "  Scaffolding 4 role-based panels..." },
  { type: "success", text: "  [OK] User / Doctor / Admin / SuperAdmin" },
  { type: "info", text: "  Socket.io + WebRTC initialized" },
  { type: "info", text: "  Groq AI + OCR + Facial recognition ready" },
  { type: "success", text: "  [OK] React Native companion linked" },
  { type: "prompt", text: "> BUILD 10+ CLIENT PROJECTS" },
  { type: "info", text: "  E-commerce / Real estate / Industrial / Finance" },
  { type: "success", text: "  [OK] All builds passing" },
  { type: "prompt", text: "> SYS.STATUS: AVAILABLE" },
  { type: "success", text: "  Orchestrator online. Standing by." },
];

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [showWordmark, setShowWordmark] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [showCTAs, setShowCTAs] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);

  const isMobileRef = useRef(false);
  const prefersReducedMotionRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    isMobileRef.current = mq.matches;
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => {
      isMobileRef.current = e.matches;
      setIsMobile(e.matches);
    };
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

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

  useEffect(() => {
    const timeline = [
      { key: "showWordmark", delay: 0 },
      { key: "showLog", delay: prefersReducedMotion ? 100 : 400 },
      { key: "showCTAs", delay: prefersReducedMotion ? 200 : 800 },
      { key: "showIndicator", delay: prefersReducedMotion ? 300 : 1200 },
    ];

    timeline.forEach(({ key, delay }) => {
      setTimeout(() => {
        if (key === "showWordmark") setShowWordmark(true);
        if (key === "showLog") setShowLog(true);
        if (key === "showCTAs") setShowCTAs(true);
        if (key === "showIndicator") setShowIndicator(true);
      }, delay);
    });
  }, [prefersReducedMotion]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="grain" aria-hidden="true" />
      <div className="grid-bg" aria-hidden="true" />

      <div className="section-container relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-16 pt-20 lg:pt-0">
          <div className="flex-1 min-w-0 lg:pr-8">
            <motion.div
              className="reveal-line"
              initial={{ opacity: 0 }}
              animate={{ opacity: showWordmark ? 1 : 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ opacity: showWordmark ? 1 : 0 }}
            >
              <span className="display-hero text-foreground">AADDY</span>
              {(!isMobile && !prefersReducedMotion) && (
                <div className="mt-4 max-w-full">
                  <WordmarkCanvas />
                </div>
              )}
            </motion.div>

            <motion.div
              className="mt-6 lg:mt-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: showLog ? 1 : 0, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ opacity: showLog ? 1 : 0 }}
            >
              <p className="micro-label accent mb-4">01 / HERO</p>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Full-stack developer building web apps with the MERN stack and AI.{" "}
                <span className="font-medium text-foreground">10+ client projects</span>{" "}
                across e-commerce, real estate, industrial, and loan consultancy sectors.
              </p>
            </motion.div>

            <motion.div
              className="mt-10 lg:mt-16 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showCTAs ? 1 : 0, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ opacity: showCTAs ? 1 : 0 }}
            >
              <a
                href="#projects"
                className="magnetic-btn btn-primary px-8 py-4 text-lg focus-ring"
                style={{
                  background: "linear-gradient(135deg, var(--accent), var(--accent-muted))",
                  color: "var(--background)",
                }}
              >
                View Work
              </a>
              <a
                href="#contact"
                className="magnetic-btn btn-secondary px-8 py-4 text-lg focus-ring"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--card)",
                  color: "var(--foreground)",
                }}
              >
                Let&apos;s Build
              </a>
            </motion.div>

            <motion.div
              className="mt-16 lg:mt-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showIndicator ? 1 : 0, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ opacity: showIndicator ? 1 : 0 }}
            >
              <div className="flex items-center gap-4">
                <p className="micro-label">SYS.STATUS</p>
                <div className="status-indicator active">
                  <span>ORCHESTRATOR ONLINE</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="hidden lg:block w-96"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: showLog ? 1 : 0, x: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ opacity: showLog ? 1 : 0 }}
          >
            <div className="agent-log bg-[var(--card)] border border-[var(--border)] p-6 h-[400px] overflow-y-auto">
              {agentLogLines.map((line, i) => (
                <motion.div
                  key={i}
                  className={`agent-log-line ${line.type}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.12, duration: 0.4 }}
                >
                  <span className="prompt">{line.type === "prompt" ? line.text : ""}</span>
                  <span className={line.type === "success" ? "success" : line.type === "info" ? "info" : ""}>
                    {line.type !== "prompt" ? line.text : ""}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: showIndicator ? 1 : 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        style={{ opacity: showIndicator ? 1 : 0 }}
      >
        <p className="micro-label">SCROLL</p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-1 h-8 border border-[var(--accent)] rounded-full flex items-end justify-center p-1"
        >
          <motion.div
            className="w-full h-1.5 bg-[var(--accent)] rounded-full"
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}