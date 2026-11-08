"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const bootLines = [
  "> INIT ORCHESTRATOR v1.0.0",
  "> LOADING AGENT REGISTRY...",
  "> CONNECTING TO AI SWARM...",
  "> SCAFFOLDING MediAI PANELS... DONE",
  "> COMPILING 10+ CLIENT BUILDS... DONE",
  "> SYS.STATUS: AVAILABLE",
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true);
  const [skipTriggered, setSkipTriggered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!skipTriggered) {
        setShow(false);
        onComplete();
      }
    }, 1800);

    return () => clearTimeout(timer);
  }, [skipTriggered, onComplete]);

  const handleSkip = () => {
    setSkipTriggered(true);
    setShow(false);
    onComplete();
  };

  if (!show) return null;

  return (
    <motion.div
      className="preloader"
      initial={{ opacity: 1 }}
      animate={{ opacity: show ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={handleSkip}
      role="alert"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="preloader-text">
        {bootLines.map((line, i) => (
          <motion.span
            key={i}
            className="preloader-line"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.2, duration: 0.3 }}
          >
            {line}
          </motion.span>
        ))}
      </div>
      <div className="preloader-bar">
        <motion.div
          className="preloader-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 1.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <motion.p
        className="micro-label"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        style={{ color: "var(--muted-foreground)" }}
      >
        CLICK TO SKIP
      </motion.p>
    </motion.div>
  );
}