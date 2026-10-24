"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { KhmerOrnament } from "@/components/ui/KhmerOrnament";
import { RoyalOrnamentalFrame } from "./RoyalOrnamentalFrame";
import { MailOpen } from "lucide-react";
import type { WeddingConfig } from "@/types/wedding";

export function WeddingEnvelope({ config }: { config: WeddingConfig }) {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const reduced = useReducedMotion();
  const cover = useRef<HTMLDivElement>(null);
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
    cover.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = previous;
      surfaces.forEach((surface) => {
        surface.inert = false;
      });
    };
  }, [opened]);
  useEffect(() => {
    if (!opening) return;
    const timer = window.setTimeout(() => setOpened(true), reduced ? 0 : 1250);
    return () => window.clearTimeout(timer);
  }, [opening, reduced]);
  function open() {
    if (opening) return;
    setOpening(true);
    window.dispatchEvent(new Event("wedding-opened"));
  }
  return (
    <AnimatePresence
      onExitComplete={() => {
        const heading = document.querySelector<HTMLElement>(".hero h1");
        heading?.setAttribute("tabindex", "-1");
        heading?.focus({ preventScroll: true });
      }}
    >
      {!opened && (
        <motion.div
          ref={cover}
          tabIndex={-1}
          className="envelope-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reduced ? 0 : 0.5,
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="envelope-title"
        >
          <motion.div
            className={`envelope${opening ? " is-opening" : ""}`}
            exit={reduced ? undefined : { scale: 1.04, y: -20, opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <RoyalOrnamentalFrame
              animated={false}
              className="envelope-inner ornamental-frame"
            >
              <p className="eyebrow">THE WEDDING INVITATION</p>
              <h2 id="envelope-title" className="khmer-title">
                {config.title}
              </h2>
              <div className="envelope-crest" aria-hidden="true">
                <svg viewBox="0 0 180 220" fill="none">
                  <path
                    d="M90 7C85 39 62 43 66 69C38 77 25 107 32 137C8 158 26 202 90 210C154 202 172 158 148 137C155 107 142 77 114 69C118 43 95 39 90 7Z"
                    stroke="currentColor"
                    pathLength={1}
                    className="crest-trace"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M90 24C80 48 72 52 76 76C48 84 36 109 42 141C22 163 39 192 90 201C141 192 158 163 138 141C144 109 132 84 104 76C108 52 100 48 90 24Z"
                    pathLength={1}
                    className="crest-trace crest-trace-inner"
                    stroke="currentColor"
                  />
                  <path
                    d="M90 34C74 56 79 69 90 77C101 69 106 56 90 34ZM90 43V70M90 80C67 64 53 76 57 93C69 88 80 87 90 97C100 87 111 88 123 93C127 76 113 64 90 80Z"
                    stroke="currentColor"
                  />
                  {[0, 1, 2, 3, 4].map((i) => (
                    <g key={i} transform={`translate(0 ${i * 19})`}>
                      <path
                        d="M44 103C23 89 36 79 44 90C50 98 41 105 39 111M136 103C157 89 144 79 136 90C130 98 139 105 141 111"
                        stroke="currentColor"
                      />
                    </g>
                  ))}
                  <path
                    d="M50 184Q90 163 130 184M58 192Q90 178 122 192M90 182V201M74 185L90 199L106 185"
                    stroke="currentColor"
                  />
                  <path
                    d="M24 151Q90 132 156 151L151 175Q90 155 29 175Z"
                    fill="var(--cover-green)"
                    stroke="currentColor"
                  />
                </svg>
                <span className="crest-initials">
                  {config.monogram?.initials ?? config.couple.initials}
                </span>
                <span className="crest-caption">សិរីមង្គល</span>
              </div>
              <p className="envelope-greeting">ដោយក្តីស្រឡាញ់ និងកិត្តិយស</p>
              <p className="envelope-khmer-names">
                {config.couple.groom.fullNameKh}
                <span> និង </span>
                {config.couple.bride.fullNameKh}
              </p>
              <p className="envelope-names latin-display">
                {config.couple.groom.nameEn}
                <span> & </span>
                {config.couple.bride.nameEn}
              </p>
              <p className="envelope-date">{config.dateLabel}</p>
              <button
                className="envelope-open"
                onClick={open}
                aria-disabled={opening}
                aria-label="បើកធៀបអាពាហ៍ពិពាហ៍"
                onKeyDown={(event) => {
                  if (event.key === "Tab") event.preventDefault();
                }}
              >
                <span className="envelope-open-label">
                  <MailOpen size={17} strokeWidth={1.4} aria-hidden="true" />{" "}
                  បើកធៀបអាពាហ៍ពិពាហ៍
                </span>
              </button>
              <KhmerOrnament className="envelope-ornament" />
            </RoyalOrnamentalFrame>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
