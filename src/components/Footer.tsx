"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { personal, socialLinks } from "@/data/projects";

export default function Footer() {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      setMounted(true);
    }
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer id="footer" className="relative section-padding overflow-hidden">
      <div className="grain" aria-hidden="true" />
      <div className="grid-bg" aria-hidden="true" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-12 lg:gap-16 text-center"
        >
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-display font-bold text-foreground tracking-tight select-none" style={{ fontSize: "clamp(4rem, 12vw, 10rem)", lineHeight: 0.9 }}>
              AADDY
            </span>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-md h-px" style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }} aria-hidden="true" />
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p className="clock text-foreground font-mono" style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}>
              {mounted ? time : "--:--:--"}
            </p>
            <p className="micro-label text-[var(--muted-foreground)]">LOCAL TIME</p>
          </motion.div>

          <motion.nav
            className="flex flex-wrap items-center justify-center gap-6 lg:gap-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            aria-label="Social links"
          >
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : undefined}
                rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className="magnetic-btn flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors focus-ring"
                data-cursor={link.name.toUpperCase()}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.08 }}
              >
                {link.icon}
                <span className="font-display font-medium hidden sm:inline">{link.name}</span>
              </motion.a>
            ))}
          </motion.nav>

          <motion.div
            className="w-full max-w-2xl pt-8 border-t border-[var(--border)] text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <p className="text-muted-foreground leading-relaxed mb-4">
              Built with Next.js, Tailwind, Framer Motion, and way too much coffee.
            </p>
            <p className="text-[var(--muted-foreground)] text-sm font-mono">
              &copy; {new Date().getFullYear()} {personal.name}. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}