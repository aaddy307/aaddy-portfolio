"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const hoverTargets = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, .magnetic-btn, .tag-pill, .accordion-trigger'
    );

    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        setHover(true);
        const text = el.getAttribute("data-cursor") || el.getAttribute("aria-label") || "";
        setHoverText(text);
      });
      el.addEventListener("mouseleave", () => {
        setHover(false);
        setHoverText("");
      });
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <motion.div
        className="custom-cursor"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`,
        }}
        animate={{ scale: hover ? 1.2 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      {hoverText && (
        <motion.div
          className="custom-cursor-text"
          style={{
            transform: `translate(${pos.x}px, ${pos.y + 40}px) translate(-50%, -50%)`,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {hoverText}
        </motion.div>
      )}
    </>
  );
}