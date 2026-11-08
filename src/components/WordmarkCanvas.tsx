"use client";

import { useEffect, useRef, useState } from "react";

export default function WordmarkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        const width = Math.floor(rect.width);
        const height = Math.min(120, Math.floor(width * 0.15));
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const text = "AADDY";
    const fontSize = Math.min(canvas.height * 0.8, canvas.width / text.length * 1.2);

    let frame = 0;
    const draw = () => {
      if (!ctx || canvas.width === 0 || canvas.height === 0) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      const cssWidth = canvas.width / window.devicePixelRatio;
      const cssHeight = canvas.height / window.devicePixelRatio;
      const centerX = cssWidth / 2;
      const centerY = cssHeight / 2;

      ctx.font = `700 ${fontSize}px "Space Grotesk", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Draw distorted text based on mouse position
      const distortionX = (mousePos.x - 0.5) * 30;
      const distortionY = (mousePos.y - 0.5) * 20;

      // Base color
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim() || "#fafafa";

      // Draw multiple layers for distortion effect
      const layers = 5;
      for (let i = 0; i < layers; i++) {
        const alpha = 1 - Math.abs(i - layers / 2) / layers * 0.7;

        ctx.globalAlpha = alpha;
        ctx.fillText(
          text,
          centerX + distortionX * (i / layers) + Math.sin(frame * 0.02 + i) * 2,
          centerY + distortionY * (i / layers) + Math.cos(frame * 0.015 + i) * 1.5
        );
      }

      // Accent highlight
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#a3e635";
      ctx.fillText(
        text,
        centerX + distortionX * 0.5 + Math.sin(frame * 0.03) * 3,
        centerY + distortionY * 0.5 + Math.cos(frame * 0.025) * 2
      );

      ctx.restore();
      frame++;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-auto" aria-hidden="true" />;
}