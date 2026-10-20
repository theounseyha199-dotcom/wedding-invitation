"use client";

import { motion } from "motion/react";
import { GoldDivider } from "@/components/ui/GoldDivider";

export function AnimatedDivider() {
  return (
    <motion.div
      data-ornament-reveal
      initial={{ opacity: 0, scaleX: 0.88 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
    >
      <GoldDivider />
    </motion.div>
  );
}
