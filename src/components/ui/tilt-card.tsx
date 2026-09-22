import React, { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Max rotation in degrees (default 12) */
  rotateDepth?: number;
  /** Glare overlay opacity 0-1 (default 0.55) */
  glareOpacity?: number;
}

/**
 * Pure-CSS/JS 3-D tilt card — no external animation library.
 * Tracks pointer position relative to the card, applies perspective
 * rotateX/Y, a subtle translateZ lift, and a radial glare overlay.
 * Touch events are intentionally left untilted to avoid scroll conflicts.
 * Respects prefers-reduced-motion.
 */
export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className,
  rotateDepth = 12,
  glareOpacity = 0.55,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion || !cardRef.current || !glareRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const xPct = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 → 0.5
      const yPct = (e.clientY - rect.top) / rect.height - 0.5;

      cardRef.current.style.transform = `
        perspective(900px)
        rotateX(${-yPct * rotateDepth}deg)
        rotateY(${xPct * rotateDepth}deg)
        scale3d(1.03, 1.03, 1.03)
      `;

      const gx = (xPct + 0.5) * 100; // 0 → 100
      const gy = (yPct + 0.5) * 100;
      glareRef.current.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,${glareOpacity}) 0%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0) 75%)`;
    },
    [reducedMotion, rotateDepth, glareOpacity],
  );

  const onMouseLeave = useCallback(() => {
    if (!cardRef.current || !glareRef.current) return;
    cardRef.current.style.transform = "";
    glareRef.current.style.background = "none";
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn("relative will-change-transform", className)}
      style={{
        // Spring-like settle on mouse leave
        transition: "transform 0.55s cubic-bezier(0.03, 0.98, 0.52, 0.99)",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
      {/* Glare overlay — pointer-events: none so children stay interactive */}
      <div
        ref={glareRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] mix-blend-overlay"
        style={{ transition: "background 0.15s ease" }}
      />
    </div>
  );
};

