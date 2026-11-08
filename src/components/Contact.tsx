"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { personal } from "@/data/projects";

const formFields = [
  { name: "name", label: "Your Name", type: "text", placeholder: "John Doe", icon: "user" },
  { name: "email", label: "Email Address", type: "email", placeholder: "john@example.com", icon: "mail" },
  { name: "message", label: "Message", type: "textarea", placeholder: "Tell me about your project...", icon: "message" },
];

const icons = {
  user: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  mail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
  message: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
};

function FloatingLabelInput({
  field,
  value,
  onChange,
  onFocus,
  onBlur,
  error,
}: {
  field: typeof formFields[0];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className="relative">
      <label
        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-all duration-300 pointer-events-none"
        style={{
          transform: isFocused || hasValue ? "translate(-4px, -30px) scale(0.85)" : "translate(-50%, -50%)",
          color: isFocused ? "var(--accent)" : error ? "var(--accent-muted)" : "var(--muted-foreground)",
        }}
      >
        {field.label}
      </label>

      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-all duration-300" style={{ color: isFocused ? "var(--accent)" : "var(--muted)" }}>
          {icons[field.icon as keyof typeof icons]}
        </div>

        {field.type === "textarea" ? (
          <motion.textarea
            name={field.name}
            value={value}
            onChange={onChange}
            onFocus={(e) => { setIsFocused(true); onFocus(e); }}
            onBlur={(e) => { setIsFocused(false); onBlur(e); }}
            placeholder={hasValue || isFocused ? "" : field.placeholder}
            rows={5}
            className={`w-full bg-card border rounded-xl px-12 py-4 text-foreground placeholder:text-muted-foreground transition-all duration-300 resize-none focus-ring ${
              isFocused ? "border-accent shadow-[0_0_0_3px_var(--accent)/30]" : "border-border hover:border-border"
            } ${error ? "border-accent-muted" : ""}`}
            style={{
              background: "linear-gradient(135deg, var(--card) 0%, var(--card-hover) 100%)",
            }}
          />
        ) : (
          <motion.input
            name={field.name}
            type={field.type}
            value={value}
            onChange={onChange}
            onFocus={(e) => { setIsFocused(true); onFocus(e); }}
            onBlur={(e) => { setIsFocused(false); onBlur(e); }}
            placeholder={hasValue || isFocused ? "" : field.placeholder}
            className={`w-full bg-card border rounded-xl px-12 py-4 text-foreground placeholder:text-muted-foreground transition-all duration-300 focus-ring ${
              isFocused ? "border-accent shadow-[0_0_0_3px_var(--accent)/30]" : "border-border hover:border-border"
            } ${error ? "border-accent-muted" : ""}`}
            style={{
              background: "linear-gradient(135deg, var(--card) 0%, var(--card-hover) 100%)",
            }}
          />
        )}

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          className="absolute bottom-0 left-0 right-0 h-1 rounded-b-xl"
          style={{ background: error ? "linear-gradient(90deg, var(--accent-muted), var(--accent))" : "linear-gradient(90deg, var(--accent), var(--accent-muted))" }}
        />
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-accent-muted flex items-center gap-1"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
          {error}
        </motion.p>
      )}
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const ref = useRef(null);
  useInView(ref, { once: true, margin: "-100px" });

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

  const handleSubmit = async (e: React.FormEvent) => {
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

  const contactInfo = [
    { label: "Email", value: personal.email, href: `mailto:${personal.email}`, icon: icons.mail, color: "var(--accent)" },
    { label: "GitHub", value: personal.github, href: personal.github, icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>, color: "var(--foreground)" },
    { label: "LinkedIn", value: personal.linkedin, href: personal.linkedin, icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>, color: "var(--accent)" },
  ];

  return (
    <section id="contact" className="relative section-padding" ref={ref}>
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-accent/10 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-accent-muted/10 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-20" style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }} />
      </div>

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-border text-sm font-medium text-accent mb-6">
            <span className="relative h-2 w-2 rounded-full bg-accent animate-pulse" />
            Get in Touch
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight leading-[1.1]">
            <span className="gradient-text">Let&apos;s Build</span>
            <span className="block text-foreground">Something</span>
            <span className="block gradient-text">Together</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Have a project in mind? Questions about my work? Just want to say hi?
            I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="space-y-8 pr-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-strong rounded-2xl p-8 relative overflow-hidden"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-muted/5" />
              <h3 className="relative text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--accent)/20, var(--accent-muted)/20)", border: "1px solid var(--accent)/30" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" className="h-5 w-5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                </div>
                Start a Conversation
              </h3>
              <p className="relative text-muted-foreground leading-relaxed mb-8">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Whether it&apos;s a full-scale application, a quick consultation, or just a coffee chat — let&apos;s connect.
              </p>

              <div className="relative space-y-4">
                {contactInfo.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="relative flex items-center gap-4 p-4 rounded-xl glass transition-all hover:glass-strong group"
                    style={{ border: "1px solid var(--border)" }}
                  >
                    <div className="relative flex-shrink-0 h-12 w-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{
                      background: `linear-gradient(135deg, ${item.color}/20, ${item.color}/10)`,
                      border: `1px solid ${item.color}/30`,
                    }}>
                      <span style={{ color: item.color }}>{item.icon}</span>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 + i * 0.1 + 0.2 }}
                        className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                        style={{ background: item.color, color: "var(--background)" }}
                      >
                        {i + 1}
                      </motion.div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{item.label}</p>
                      <p className="text-sm font-medium text-foreground truncate group-hover:text-accent transition-colors">{item.value}</p>
                    </div>
                    <motion.svg
                      whileHover={{ x: 3 }}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </motion.svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass rounded-2xl p-6 border border-border"
            >
              <h3 className="text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
                <span className="h-8 w-px bg-gradient-to-b from-accent to-accent-muted" />
                What Happens Next
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
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="flex items-start gap-4 text-muted-foreground"
                  >
                    <div className="relative flex-shrink-0">
                      <div className="h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: `linear-gradient(135deg, ${i % 2 === 0 ? "var(--accent)" : "var(--accent-muted)"}, ${i % 2 === 0 ? "var(--accent-muted)" : "var(--accent)"})`, color: "var(--background)" }}>
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
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          >
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass-strong rounded-2xl p-8 relative overflow-hidden"
              style={{ border: "1px solid var(--border)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-muted/5" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-accent/10 to-transparent rounded-full blur-3xl" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative mb-8"
              >
                <h3 className="text-xl font-semibold text-foreground mb-2">Send a Message</h3>
                <p className="text-muted-foreground">I&apos;ll get back to you as soon as possible.</p>
              </motion.div>

              <div className="relative space-y-5">
                {formFields.map((field, i) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <FloatingLabelInput
                      field={field}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      onFocus={() => {}}
                      onBlur={handleBlur}
                      error={errors[field.name as keyof typeof formData]}
                    />
                  </motion.div>
                ))}

                <motion.button
                  type="submit"
                  disabled={status === "submitting"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="relative w-full btn-primary px-8 py-4 rounded-xl text-base font-semibold overflow-hidden group"
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
                        Sending...
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
                        Sent Successfully!
                      </>
                    ) : (
                      <>
                        Send Message
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
                    className="text-center text-sm text-accent-muted flex items-center justify-center gap-1"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                    Please fix the errors above and try again.
                  </motion.p>
                )}
              </div>
            </motion.form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <div className="glass rounded-2xl p-6 border border-border">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--accent)/20, var(--accent-muted)/20)", border: "1px solid var(--accent)/30" }}>
                  <span className="gradient-text text-xl font-bold">{personal.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{personal.name}</p>
                  <p className="text-sm text-muted-foreground">{personal.title}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-xl flex items-center justify-center glass transition-all hover:glass-strong group"
                  style={{ border: "1px solid var(--border)" }}
                  aria-label="GitHub"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-xl flex items-center justify-center glass transition-all hover:glass-strong group"
                  style={{ border: "1px solid var(--border)" }}
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
                <a
                  href={personal.email.startsWith("[ADD") ? "#" : `mailto:${personal.email}`}
                  className="h-10 w-10 rounded-xl flex items-center justify-center glass transition-all hover:glass-strong group"
                  style={{ border: "1px solid var(--border)" }}
                  aria-label="Email"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}