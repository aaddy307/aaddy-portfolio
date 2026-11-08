"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { services } from "@/data/projects";

export default function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="services" className="relative section-padding overflow-hidden">
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
          <span className="micro-label accent mb-6">05 / SERVICES</span>
          <span className="display-xl text-foreground">WHAT I DO</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-16 lg:mb-24">
            End-to-end development from concept to deployment and beyond.
          </p>

          <div className="space-y-4" role="list" aria-label="Services offered">
            {services.map((service, i) => (
              <ServiceAccordion
                key={service.title}
                service={service}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>

          <motion.div
            className="mt-16 lg:mt-24 pt-12 border-t border-[var(--border)] text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              Don&apos;t see exactly what you need? I&apos;m open to custom projects and consultations.
            </p>
            <a
              href="#contact"
              className="magnetic-btn btn-primary px-8 py-4 text-lg focus-ring inline-flex"
              data-cursor="LET&apos;S BUILD"
              style={{
                background: "linear-gradient(135deg, var(--accent), var(--accent-muted))",
                color: "var(--background)",
              }}
            >
              Let's Build Something
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

interface ServiceAccordionProps {
  service: typeof services[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function ServiceAccordion({ service, index, isOpen, onToggle }: ServiceAccordionProps) {
  const icons = {
    code: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    "shopping-cart": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
    briefcase: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        <rect x="2" y="6" width="20" height="12" rx="2" />
      </svg>
    ),
    layers: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  };

  const counterIcons = {
    code: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-30" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    "shopping-cart": (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-30" aria-hidden="true">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
    briefcase: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-30" aria-hidden="true">
        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        <rect x="2" y="6" width="20" height="12" rx="2" />
      </svg>
    ),
    layers: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-30" aria-hidden="true">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  };

  return (
    <motion.div
      className="group bg-[var(--card)] border border-[var(--border)] overflow-hidden transition-all duration-500 hover:border-[var(--accent)]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      layout
    >
      <button
        onClick={onToggle}
        className="accordion-trigger w-full flex items-center justify-between gap-6 p-6 lg:p-8"
        aria-expanded={isOpen}
        aria-controls={`service-content-${index}`}
        data-cursor={service.title.toUpperCase()}
      >
        <div className="flex items-center gap-5">
          <motion.span
            className="text-[var(--accent)] flex-shrink-0"
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {icons[service.icon as keyof typeof icons]}
          </motion.span>
          <div>
            <span className="micro-label text-[var(--accent)] mb-2 block">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-display font-bold text-foreground">
              {service.title}
            </span>
          </div>
        </div>
        <motion.div
          className="flex items-center gap-3 text-[var(--muted-foreground)] font-mono text-sm"
          animate={{ opacity: isOpen ? 0 : 1 }}
        >
          <span>CLICK TO EXPAND</span>
          <motion.svg
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </motion.svg>
        </motion.div>
      </button>

      <motion.div
        id={`service-content-${index}`}
        className="accordion-content"
        animate={{ maxHeight: isOpen ? 500 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        role="region"
        aria-label={`${service.title} details`}
      >
        <div className="accordion-content-inner px-6 lg:px-8 pb-8 border-t border-[var(--border)] bg-[var(--card-hover)]">
          <div className="flex gap-8 lg:gap-12">
            <div className="flex-1 min-w-0">
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                {service.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {service.title === "Web Development" && (
                  <>
                    <FeatureTag>Next.js / React</FeatureTag>
                    <FeatureTag>TypeScript</FeatureTag>
                    <FeatureTag>Tailwind CSS</FeatureTag>
                    <FeatureTag>Vercel Deploy</FeatureTag>
                  </>
                )}
                {service.title === "E-commerce" && (
                  <>
                    <FeatureTag>MERN Stack</FeatureTag>
                    <FeatureTag>Payment Integration</FeatureTag>
                    <FeatureTag>Admin Dashboard</FeatureTag>
                    <FeatureTag>Inventory Management</FeatureTag>
                  </>
                )}
                {service.title === "Business Websites" && (
                  <>
                    <FeatureTag>CMS Integration</FeatureTag>
                    <FeatureTag>SEO Optimized</FeatureTag>
                    <FeatureTag>Responsive Design</FeatureTag>
                    <FeatureTag>Analytics Setup</FeatureTag>
                  </>
                )}
                {service.title === "Full-Stack Apps" && (
                  <>
                    <FeatureTag>Auth & Database</FeatureTag>
                    <FeatureTag>Real-time Features</FeatureTag>
                    <FeatureTag>Mobile Companion</FeatureTag>
                    <FeatureTag>AI Integration</FeatureTag>
                  </>
                )}
              </div>
            </div>

            <div className="hidden lg:block w-32 flex-shrink-0 text-right">
              <motion.div
                className="counter text-[var(--accent)]"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.5 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {String(index + 1).padStart(2, "0")}
              </motion.div>
              <div className="mt-8">
                {counterIcons[service.icon as keyof typeof counterIcons]}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function FeatureTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="tag-pill text-sm px-4 py-2 font-medium" style={{ background: "var(--card)" }}>
      {children}
    </span>
  );
}