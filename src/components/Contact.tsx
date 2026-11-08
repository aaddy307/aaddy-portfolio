"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { personal } from "@/data/projects";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "name":
        return value.length < 2 ? "Name must be at least 2 characters" : "";
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Please enter a valid email" : "";
      case "message":
        return value.length < 10 ? "Message must be at least 10 characters" : "";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const error = validateField(e.target.name, e.target.value);
    setErrors(prev => ({ ...prev, [e.target.name]: error }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<typeof formData> = {};
    let hasErrors = false;

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        newErrors[key as keyof typeof formData] = error;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative section-padding overflow-hidden">
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
          <span className="micro-label accent mb-6">06 / CONTACT</span>
          <span className="display-xl text-foreground">LET&apos;S BUILD</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Have a project in mind? Questions about my work? Just want to say hi?
                I&apos;d love to hear from you.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-wrap items-center gap-6 lg:gap-10"
            >
              <a
                href={`mailto:${personal.email}`}
                className="magnetic-btn flex items-center gap-2 font-display font-medium text-foreground hover:text-[var(--accent)] transition-colors focus-ring"
                data-cursor="EMAIL"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                {personal.email}
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn flex items-center gap-2 font-display font-medium text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors focus-ring"
                data-cursor="GITHUB"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn flex items-center gap-2 font-display font-medium text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors focus-ring"
                data-cursor="LINKEDIN"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="pt-6 border-t border-[var(--border)]"
            >
              <h3 className="font-display font-semibold text-foreground mb-5 flex items-center gap-2">
                <span className="h-8 w-px bg-gradient-to-b from-[var(--accent)] to-[var(--accent-muted)]" />
                WHAT HAPPENS NEXT
              </h3>
              <ol className="space-y-4">
                {[
                  "I&apos;ll personally review your message within 24 hours",
                  "We&apos;ll schedule a quick call to discuss your vision",
                  "I&apos;ll send a proposal with timeline and approach",
                  "We start building something amazing together",
                ].map((step, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-start gap-4 text-muted-foreground"
                  >
                    <div className="relative flex-shrink-0">
                      <div className="h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold" style={{
                        background: `linear-gradient(135deg, ${i % 2 === 0 ? "var(--accent)" : "var(--accent-muted)"}, ${i % 2 === 0 ? "var(--accent-muted)" : "var(--accent)"})`,
                        color: "var(--background)"
                      }}>
                        {i + 1}
                      </div>
                      {i < 3 && <div className="absolute left-4 top-8 bottom-0 w-px" style={{ background: "linear-gradient(180deg, var(--accent)/30, var(--accent-muted)/30)" }} />}
                    </div>
                    <span>{step}</span>
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <form onSubmit={handleSubmit} className="form-terminal bg-[var(--card)] border border-[var(--border)] p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-[var(--accent-muted)]/5" aria-hidden="true" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative mb-10"
              >
                <h3 className="font-display font-bold text-foreground mb-2 text-2xl lg:text-3xl">SEND A MESSAGE</h3>
                <p className="text-muted-foreground">I&apos;ll get back to you as soon as possible.</p>
              </motion.div>

              <div className="relative space-y-6">
                <TerminalField
                  name="name"
                  label="NAME"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.name}
                  delay={0.4}
                />
                <TerminalField
                  name="email"
                  label="EMAIL"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email}
                  delay={0.5}
                />
                <TerminalField
                  name="message"
                  label="MESSAGE"
                  type="textarea"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.message}
                  delay={0.6}
                  rows={6}
                />

                <motion.button
                  type="submit"
                  disabled={status === "submitting"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  className="magnetic-btn relative w-full py-4 font-display font-semibold text-lg focus-ring group overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, var(--accent), var(--accent-muted))",
                    color: "var(--background)",
                  }}
                  data-cursor="SEND MESSAGE"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {status === "submitting" ? (
                      <>
                        <motion.svg
                          animate={{ rotate: 360 }}
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                          <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                        </motion.svg>
                        SENDING...
                      </>
                    ) : status === "success" ? (
                      <>
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="h-5 w-5"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </motion.svg>
                        SENT SUCCESSFULLY
                      </>
                    ) : (
                      <>
                        SEND MESSAGE
                        <motion.svg
                          whileHover={{ x: 4 }}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="h-5 w-5"
                        >
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </motion.svg>
                      </>
                    )}
                  </span>
                </motion.button>

                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-sm text-[var(--accent-muted)] flex items-center justify-center gap-1"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                    Please fix the errors above and try again.
                  </motion.p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface TerminalFieldProps {
  name: string;
  label: string;
  type: "text" | "email" | "textarea";
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  delay: number;
  rows?: number;
}

function TerminalField({
  name,
  label,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  delay,
  rows = 1,
}: TerminalFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      className="field relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <label className="block mb-2 font-mono text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
        {label}
        <span className="ml-2 text-[var(--accent)]">{focused ? "_" : ""}</span>
      </label>

      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={(e) => { setFocused(false); onBlur(e); }}
          placeholder={placeholder}
          rows={rows}
          className={`w-full bg-[var(--card-hover)] border rounded-none px-4 py-3 text-foreground placeholder:text-[var(--muted-foreground)] transition-all duration-200 resize-none font-mono text-base ${
            focused
              ? "border-[var(--accent)] shadow-[0_0_0_2px_var(--accent-dim)]"
              : error
              ? "border-[var(--accent-muted)]"
              : "border-[var(--border)] hover:border-[var(--muted)]"
          }`}
          style={{
            background: "linear-gradient(135deg, var(--card) 0%, var(--card-hover) 100%)",
            fontFamily: "var(--font-mono)",
          }}
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={(e) => { setFocused(false); onBlur(e); }}
          placeholder={placeholder}
          className={`w-full bg-[var(--card-hover)] border rounded-none px-4 py-3 text-foreground placeholder:text-[var(--muted-foreground)] transition-all duration-200 font-mono text-base ${
            focused
              ? "border-[var(--accent)] shadow-[0_0_0_2px_var(--accent-dim)]"
              : error
              ? "border-[var(--accent-muted)]"
              : "border-[var(--border)] hover:border-[var(--muted)]"
          }`}
          style={{
            background: "linear-gradient(135deg, var(--card) 0%, var(--card-hover) 100%)",
            fontFamily: "var(--font-mono)",
          }}
        />
      )}

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused || error ? 1 : 0 }}
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{
          background: error
            ? "linear-gradient(90deg, var(--accent-muted), var(--accent))"
            : "linear-gradient(90deg, var(--accent), var(--accent-muted))",
        }}
      />

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-[var(--accent-muted)] flex items-center gap-1 font-mono"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}