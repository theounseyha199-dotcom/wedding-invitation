"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
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
  const total = config.images.gallery.length;
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
        setActive((v) =>
          v === null ? null : (v + 1) % config.images.gallery.length,
        );
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActive((v) =>
          v === null
            ? null
            : (v - 1 + config.images.gallery.length) %
              config.images.gallery.length,
        );
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
  }, [lightboxOpen, config.images.gallery.length]);
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
      <div className="gallery-grid">
        {config.images.gallery.map((photo, index) => (
          <SectionReveal
            className={`gallery-reveal gallery-reveal-${index + 1}`}
            key={photo.src}
            delay={Math.min(index * 0.1, 0.3)}
            distance={8}
            variant="photo"
          >
            <figure className="gallery-figure">
              <button
                type="button"
                className={`gallery-tile gallery-tile-${index + 1}`}
                style={{
                  aspectRatio:
                    photo.width && photo.height
                      ? `${photo.width} / ${photo.height}`
                      : undefined,
                }}
                onClick={(event) => {
                  triggerRef.current = event.currentTarget;
                  setActive(index);
                }}
                aria-label={`បើករូបភាពទី ${index + 1}: ${photo.caption}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 599px) calc(100vw - 44px), (max-width: 999px) 45vw, 33vw"
                />
              </button>
              <figcaption className="gallery-caption">
                <span className="gallery-caption-number">
                  {numberLabel(index)}
                </span>
                <span className="gallery-caption-text">{photo.caption}</span>
              </figcaption>
            </figure>
          </SectionReveal>
        ))}
      </div>
      {config.sample && (
        <p className="gallery-note">
          រូបថតគំរូបង្ហាញគូផ្សេងៗគ្នា —
          សូមដាក់រូបភាពគូស្វាមីភរិយាពិតមុនចែករំលែកធៀប។
        </p>
      )}
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
              onClick={() =>
                setActive(
                  (active - 1 + config.images.gallery.length) %
                    config.images.gallery.length,
                )
              }
              aria-label="រូបភាពមុន"
            >
              <ChevronLeft />
            </button>
            <div className="lightbox-content">
              <div className="lightbox-image">
                <Image
                  src={config.images.gallery[active].src}
                  alt={config.images.gallery[active].alt}
                  fill
                  sizes="90vw"
                />
              </div>
              <div className="lightbox-meta">
                <p>{config.images.gallery[active].caption}</p>
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
              onClick={() =>
                setActive((active + 1) % config.images.gallery.length)
              }
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
