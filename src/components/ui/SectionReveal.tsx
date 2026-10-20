"use client";
import { motion } from "motion/react";
import type { ReactNode } from "react";
export function SectionReveal({
  children,
  className = "",
  delay = 0,
  distance = 18,
  variant = "content",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  variant?: "content" | "photo";
}) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{
        opacity: variant === "photo" ? 0.78 : 0.94,
        y: distance,
        scale: variant === "photo" ? 0.975 : 1,
      }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.64, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
