"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function MediAIPreview({ url }: { url: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative group">
      {!loaded && !error && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-[var(--card)] z-10"
          initial={{ opacity: 1 }}
          animate={{ opacity: loaded ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[var(--muted-foreground)]">Loading MediAI...</p>
          </div>
        </motion.div>
      )}

      <iframe
        className="medi-ai-preview"
        src={url}
        title="MediAI Live Preview"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {error && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-[var(--card)] z-20 p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" className="mx-auto mb-4 opacity-50" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 12l2 2 4-4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
            </svg>
            <p className="text-[var(--muted-foreground)]">Unable to load live preview</p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-btn btn-primary mt-4 inline-flex"
              data-cursor="OPEN IN NEW TAB"
            >
              Open MediAI
            </a>
          </div>
        </motion.div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/60 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
    </div>
  );
}