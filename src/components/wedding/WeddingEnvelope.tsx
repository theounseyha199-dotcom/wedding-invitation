"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { KhmerOrnament } from "@/components/ui/KhmerOrnament";
import { WeddingMonogram } from "./WeddingMonogram";
import { RoyalOrnamentalFrame } from "./RoyalOrnamentalFrame";
import { RomanticFloralDecoration } from "./RomanticFloralDecoration";
import type { WeddingConfig } from "@/types/wedding";

export function WeddingEnvelope({ config }: { config: WeddingConfig }) {
  const [opened, setOpened] = useState(false);
  const reduced = useReducedMotion();
  const openButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (opened) return;
    const previous = document.body.style.overflow;
    const surfaces = document.querySelectorAll<HTMLElement>(
      "main, footer, .floating-controls",
    );
    document.body.style.overflow = "hidden";
    surfaces.forEach((surface) => {
      surface.inert = true;
    });
    openButton.current?.focus();
    return () => {
      document.body.style.overflow = previous;
      surfaces.forEach((surface) => {
        surface.inert = false;
      });
    };
  }, [opened]);
  function open() {
    setOpened(true);
    window.dispatchEvent(new Event("wedding-opened"));
  }
  return (
    <AnimatePresence>
      {!opened && (
        <motion.div
          className="envelope-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reduced ? 0 : 0.65,
            delay: reduced ? 0 : 0.45,
          }}
          aria-label="សំបុត្រអញ្ជើញអាពាហ៍ពិពាហ៍"
        >
          <motion.div
            className="envelope"
            exit={reduced ? undefined : { scale: 1.06, y: -35, opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="envelope-flap"
              aria-hidden="true"
              exit={reduced ? undefined : { rotateX: -165 }}
              transition={{ duration: 0.7 }}
            />
            <RoyalOrnamentalFrame
              animated={false}
              className="envelope-inner ornamental-frame"
            >
              <RomanticFloralDecoration
                position="bottom-left"
                animated={false}
              />
              <KhmerOrnament className="envelope-ornament" />
              <p className="eyebrow">THE WEDDING INVITATION</p>
              <h2 className="khmer-title">{config.title}</h2>
              {config.monogram?.showOnEnvelope !== false && (
                <WeddingMonogram
                  config={config}
                  size="md"
                  variant="seal"
                  className="envelope-monogram"
                />
              )}
              <p className="envelope-names latin-display">
                {config.couple.groom.nameEn} <span>&</span>{" "}
                {config.couple.bride.nameEn}
              </p>
              <p className="envelope-date">{config.dateLabel}</p>
              <button
                ref={openButton}
                className="button button-gold"
                onClick={open}
              >
                បើកធៀបអាពាហ៍ពិពាហ៍ <span aria-hidden="true">↗</span>
              </button>
              {config.sample && (
                <p className="sample-note">
                  ធៀបគំរូ • ព័ត៌មាន និងរូបភាពជាឧទាហរណ៍
                </p>
              )}
            </RoyalOrnamentalFrame>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
