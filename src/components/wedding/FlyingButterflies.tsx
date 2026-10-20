"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { Butterfly } from "./Butterfly";

type Scene = "hero" | "story" | "gallery" | "blessing";

export function FlyingButterflies({ scene }: { scene: Scene }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    amount: 0.05,
  });
  const reducedMotion = useReducedMotion();
  const count = scene === "blessing" ? 1 : scene === "gallery" ? 2 : 3;

  return (
    <div
      ref={ref}
      className={`butterfly-stage butterfly-stage-${scene}`}
      data-active={inView && !reducedMotion ? "true" : "false"}
      aria-hidden="true"
    >
      {Array.from({ length: count }, (_, index) => (
        <span
          className={`butterfly-flight butterfly-flight-${index + 1}`}
          key={index}
        >
          <span className="butterfly-float">
            <Butterfly />
          </span>
        </span>
      ))}
    </div>
  );
}
