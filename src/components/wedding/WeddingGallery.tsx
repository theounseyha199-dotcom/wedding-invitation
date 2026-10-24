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
  const [selected, setSelected] = useState(0);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const photos = config.images.gallery;
  const total = photos.length;
  const lightboxOpen = active !== null;

  useEffect(() => {
    const strip = thumbnailsRef.current;
    const thumbnail = strip?.children[selected] as HTMLElement | undefined;
    if (strip && thumbnail) {
      strip.scrollTo({
        left:
          thumbnail.offsetLeft -
          strip.clientWidth / 2 +
          thumbnail.clientWidth / 2,
        behavior: "instant",
      });
    }
  }, [selected]);

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
  if (!total) return null;
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
      <div className="album" role="group" aria-label="អាល់ប៊ុមរូបភាព">
        <div className="album-stage">
          <span
            className="album-flourish album-flourish-left"
            aria-hidden="true"
          />
          <span
            className="album-flourish album-flourish-right"
            aria-hidden="true"
          />
          <button
            type="button"
            className="album-portrait"
            aria-label={`បើករូបភាពទី ${selected + 1} ពេញអេក្រង់`}
            onClick={(event) => {
              if (swiped.current) {
                swiped.current = false;
                return;
              }
              triggerRef.current = event.currentTarget;
              setActive(selected);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                event.preventDefault();
                setSelected(
                  (value) =>
                    (value + (event.key === "ArrowRight" ? 1 : -1) + total) %
                    total,
                );
              }
            }}
            onTouchStart={(event) => {
              swiped.current = false;
              touchStart.current = {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY,
              };
            }}
            onTouchCancel={() => {
              touchStart.current = null;
            }}
            onTouchEnd={(event) => {
              if (!touchStart.current) return;
              const dx = event.changedTouches[0].clientX - touchStart.current.x;
              const dy = event.changedTouches[0].clientY - touchStart.current.y;
              touchStart.current = null;
              if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) {
                swiped.current = true;
                setSelected(
                  (value) => (value + (dx < 0 ? 1 : -1) + total) % total,
                );
              }
            }}
          >
            <span className="album-photo-stack">
              {photos.map((photo, index) => (
                <Image
                  key={photo.src}
                  src={photo.src}
                  alt={index === selected ? photo.alt : ""}
                  aria-hidden={index !== selected}
                  fill
                  className={`album-photo${index === selected ? " is-selected" : ""}`}
                  sizes="(max-width: 600px) 85vw, 460px"
                  draggable={false}
                />
              ))}
            </span>
            <span className="album-expand">
              <Expand size={16} aria-hidden="true" /> មើលពេញអេក្រង់
            </span>
          </button>
        </div>
        <div className="album-navigation">
          <button
            type="button"
            className="album-arrow"
            disabled={total < 2}
            onClick={() => setSelected((selected - 1 + total) % total)}
            aria-label="រូបភាពមុន"
          >
            <ChevronLeft size={21} />
          </button>
          <span
            className="album-count"
            aria-live="polite"
            aria-atomic="true"
            aria-label={`រូបភាពទី ${selected + 1} ក្នុងចំណោម ${total}`}
          >
            <strong>{numberLabel(selected)}</strong>
            <span aria-hidden="true" />
            {String(total).padStart(2, "0")}
          </span>
          <button
            type="button"
            className="album-arrow"
            disabled={total < 2}
            onClick={() => setSelected((selected + 1) % total)}
            aria-label="រូបភាពបន្ទាប់"
          >
            <ChevronRight size={21} />
          </button>
        </div>
        <div
          className="album-thumbnails"
          ref={thumbnailsRef}
          role="group"
          aria-label="ជ្រើសរើសរូបភាព"
        >
          {photos.map((photo, index) => (
            <button
              type="button"
              key={photo.src}
              className="album-thumbnail"
              aria-pressed={selected === index}
              aria-label={`មើលរូបភាពទី ${index + 1}`}
              onClick={() => setSelected(index)}
            >
              <Image
                src={photo.src}
                alt=""
                fill
                sizes="80px"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </div>
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
