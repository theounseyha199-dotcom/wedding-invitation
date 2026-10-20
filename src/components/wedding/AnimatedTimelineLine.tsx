"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "motion/react";

export function AnimatedTimelineLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const furthestProgress = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (progress > furthestProgress.get()) furthestProgress.set(progress);
  });

  return (
    <motion.div
      ref={ref}
      className="timeline-stem"
      aria-hidden="true"
      style={{ scaleY: furthestProgress }}
    />
  );
}
