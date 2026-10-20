"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { GoldDivider } from "@/components/ui/GoldDivider";

export function ParallaxOrnament({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-9, 9]);

  return (
    <motion.div
      ref={ref}
      className={className}
      data-parallax
      style={{ y }}
      initial={{ opacity: 0.65 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
    >
      <GoldDivider />
    </motion.div>
  );
}
