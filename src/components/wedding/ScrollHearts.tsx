"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { Heart } from "lucide-react";

type ScrollHeart = {
  id: number;
  side: "left" | "right";
  size: number;
  start: number;
};

export function ScrollHearts() {
  const [hearts, setHearts] = useState<ScrollHeart[]>([]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lastPosition = window.scrollY;
    let lastBurst = -Infinity;
    let sequence = 0;
    const onScroll = () => {
      if (preference.matches) return;
      const position = window.scrollY;
      if (Math.abs(position - lastPosition) < 64) return;
      lastPosition = position;

      const now = performance.now();
      if (
        now - lastBurst < 450 ||
        document.hidden ||
        document.querySelector(".envelope-overlay, .lightbox") ||
        document.activeElement?.matches(
          "input, textarea, select, [contenteditable='true']",
        )
      )
        return;

      lastBurst = now;
      const pair: ScrollHeart[] = (["left", "right"] as const).map((side) => ({
        id: sequence++,
        side,
        size: 12 + (sequence % 3) * 2,
        start: 12 + (sequence % 4) * 3,
      }));
      setHearts((current) => [...current.slice(-6), ...pair]);
    };
    const onVisibilityChange = () => {
      if (document.hidden) setHearts([]);
      lastPosition = window.scrollY;
    };
    const onPreferenceChange = () => {
      setHearts([]);
      lastPosition = window.scrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    preference.addEventListener("change", onPreferenceChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      preference.removeEventListener("change", onPreferenceChange);
    };
  }, []);

  return (
    <div className="scroll-hearts" aria-hidden="true">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="scroll-heart"
          data-side={heart.side}
          style={
            {
              "--heart-size": `${heart.size}px`,
              "--heart-start": `${heart.start}svh`,
              "--heart-drift": heart.side === "left" ? "-4px" : "4px",
              "--heart-tilt": heart.side === "left" ? "-16deg" : "16deg",
            } as CSSProperties
          }
          onAnimationEnd={() => {
            setHearts((current) =>
              current.filter((item) => item.id !== heart.id),
            );
          }}
        >
          <Heart size={heart.size} strokeWidth={1.2} fill="currentColor" />
        </span>
      ))}
    </div>
  );
}
