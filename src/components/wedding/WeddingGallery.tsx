"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import type { WeddingConfig } from "@/types/wedding";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { FlyingButterflies } from "./FlyingButterflies";
import { AnimatedDivider } from "./AnimatedDivider";

const numberLabel = (index: number) => String(index + 1).padStart(2, "0");

export function WeddingGallery({ config }: { config: WeddingConfig }) {
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  // Match each portrait to a panel whose diagonal clears the couple's faces.
  const photos =
    config.images.gallery.length === 7
      ? [0, 2, 6, 3, 4, 5, 1].map((index) => config.images.gallery[index])
      : config.images.gallery;
  const total = photos.length;
  const lightboxOpen = active !== null;

  useEffect(() => {
    if (!lightboxOpen) return;
    closeRef.current?.focus();
    const background = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main, footer, .floating-controls",
      ),
    );
    const previousInert = background.map((element) => element.inert);
    background.forEach((element) => {
      element.inert = true;
    });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActive((v) => (v === null ? null : (v + 1) % total));
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActive((v) => (v === null ? null : (v - 1 + total) % total));
      }
      if (event.key === "Tab") {
        const buttons =
          dialogRef.current?.querySelectorAll<HTMLButtonElement>("button");
        if (!buttons?.length) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = old;
      background.forEach((element, index) => {
        element.inert = previousInert[index];
      });
      triggerRef.current?.focus();
    };
  }, [lightboxOpen, total]);
  return (
    <section
      id="gallery"
      className="section gallery-section"
      aria-labelledby="gallery-title"
    >
      <FlyingButterflies scene="gallery" />
      <div className="gallery-heading">
        <SectionReveal distance={8} delay={0.02}>
          <p className="eyebrow">MOMENTS TO TREASURE</p>
        </SectionReveal>
        <SectionReveal distance={10} delay={0.1}>
          <h2 id="gallery-title" className="section-title">
            កម្រងរូបភាព
          </h2>
        </SectionReveal>
        <AnimatedDivider />
        <SectionReveal distance={8} delay={0.22}>
          <p className="gallery-subtitle">
            ស្នាមញញឹម និងអនុស្សាវរីយ៍ដ៏មានតម្លៃ
          </p>
        </SectionReveal>
      </div>
      <SectionReveal className="gallery-grid" distance={8} variant="photo">
        {photos.map((photo, index) => (
          <button
            type="button"
            className={`gallery-tile gallery-panel-${index + 1} gallery-reveal-${index + 1}`}
            key={photo.src}
            onClick={(event) => {
              triggerRef.current = event.currentTarget;
              setActive(index);
            }}
            aria-label={`បើករូបភាពទី ${index + 1}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={
                index === 0 || index === 5
                  ? "(max-width: 1090px) 95vw, 1040px"
                  : "(max-width: 1090px) 48vw, 520px"
              }
            />
            {index === 6 && (
              <span className="gallery-expand" aria-hidden="true">
                <Expand size={16} strokeWidth={1.5} />
              </span>
            )}
          </button>
        ))}
        <svg
          className="gallery-seams"
          viewBox="0 0 1200 1800"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M0 162 600 600 1200 162M600 600V1200M0 900H1200M0 1638 600 1200 1200 1638"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </SectionReveal>
      {active !== null &&
        createPortal(
          <div
            ref={dialogRef}
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="កម្រងរូបភាព"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setActive(null);
            }}
          >
            <button
              type="button"
              className="lightbox-close"
              ref={closeRef}
              onClick={() => setActive(null)}
              aria-label="បិទរូបភាព"
            >
              <X />
            </button>
            <button
              type="button"
              disabled={total < 2}
              className="lightbox-arrow"
              onClick={() => setActive((active - 1 + total) % total)}
              aria-label="រូបភាពមុន"
            >
              <ChevronLeft />
            </button>
            <div className="lightbox-content">
              <div className="lightbox-image">
                <Image
                  src={photos[active].src}
                  alt={photos[active].alt}
                  fill
                  sizes="90vw"
                />
              </div>
              <div className="lightbox-meta">
                <span
                  aria-live="polite"
                  aria-label={`រូបភាពទី ${active + 1} ក្នុងចំណោម ${total}`}
                >
                  {numberLabel(active)} / {String(total).padStart(2, "0")}
                </span>
              </div>
            </div>
            <button
              type="button"
              disabled={total < 2}
              className="lightbox-arrow"
              onClick={() => setActive((active + 1) % total)}
              aria-label="រូបភាពបន្ទាប់"
            >
              <ChevronRight />
            </button>
          </div>,
          document.body,
        )}
    </section>
  );
}
