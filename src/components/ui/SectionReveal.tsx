"use client";
import { motion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
export function SectionReveal({
  children,
  className = "",
  delay = 0,
  distance = 18,
  duration = 0.64,
  variant = "content",
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  duration?: number;
  variant?: "content" | "photo";
  style?: CSSProperties;
}) {
  return (
    <motion.div
      data-reveal
      className={className}
      style={style}
      initial={{
        opacity: variant === "photo" ? 0.78 : 0.94,
        y: distance,
        scale: variant === "photo" ? 0.975 : 1,
      }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
