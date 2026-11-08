"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { services } from "@/data/projects";

const serviceIcons = {
  code: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  "shopping-cart": <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>,
  briefcase: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /><rect x="2" y="6" width="20" height="12" rx="2" /></svg>,
  layers: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>,
};

export default function Services() {
  const ref = useRef(null);
  useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative section-padding" ref={ref}>
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
            What I Do
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight leading-[1.1]">
            <span className="text-foreground">Services I</span>
            <span className="block gradient-text">Offer</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            End-to-end development from concept to deployment and beyond.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="relative glass rounded-2xl p-6 transition-all duration-500 hover:glass-strong group"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                background: "radial-gradient(ellipse at center, var(--accent) 0%, transparent 70%)",
                opacity: 0.1,
              }} />

              <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-6 text-accent" style={{
                background: "linear-gradient(135deg, var(--accent)/10, var(--accent-muted)/10)",
                border: "1px solid var(--accent)/20",
              }}>
                {serviceIcons[service.icon as keyof typeof serviceIcons]}
              </div>

              <h3 className="text-xl font-display font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>

              <div className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                background: "linear-gradient(90deg, var(--accent), var(--accent-muted), var(--accent))",
                backgroundSize: "200% 100%",
              }}>
                <div className="absolute inset-0" style={{ background: "inherit", animation: "shimmer 3s ease-in-out infinite" }} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Don&apos;t see exactly what you need? I&apos;m open to custom projects and consultations.
          </p>
          <a
            href="#contact"
            className="btn-primary inline-flex"
          >
            Discuss Your Project
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline h-4 w-4 ml-2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}