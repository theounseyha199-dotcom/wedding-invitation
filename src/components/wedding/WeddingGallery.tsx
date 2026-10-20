"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import type { WeddingConfig } from "@/types/wedding";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { FlyingButterflies } from "./FlyingButterflies";

export function WeddingGallery({ config }: { config: WeddingConfig }) {
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const autoPauseUntil = useRef(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery || reducedMotion || active !== null) return;

    let timer: ReturnType<typeof setInterval> | undefined;
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = undefined;
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        stop();
        if (!entry.isIntersecting) return;
        timer = setInterval(() => {
          if (
            document.hidden ||
            Date.now() < autoPauseUntil.current ||
            gallery.contains(document.activeElement)
          )
            return;

          const first = gallery.querySelector<HTMLElement>(".gallery-reveal");
          if (!first) return;
          const gap = Number.parseFloat(getComputedStyle(gallery).gap) || 0;
          const atEnd =
            gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth - 4;
          gallery.scrollTo({
            left: atEnd ? 0 : gallery.scrollLeft + first.offsetWidth + gap,
            behavior: "smooth",
          });
        }, 6500);
      },
      { threshold: 0.35 },
    );
    observer.observe(gallery);
    return () => {
      stop();
      observer.disconnect();
    };
  }, [active, reducedMotion]);

  const pauseAutoScroll = () => {
    autoPauseUntil.current = Date.now() + 8000;
  };

  useEffect(() => {
    if (active === null) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight")
        setActive((v) =>
          v === null ? null : (v + 1) % config.images.gallery.length,
        );
      if (event.key === "ArrowLeft")
        setActive((v) =>
          v === null
            ? null
            : (v - 1 + config.images.gallery.length) %
              config.images.gallery.length,
        );
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
      triggerRef.current?.focus();
    };
  }, [active, config.images.gallery.length]);
  return (
    <section id="gallery" className="section gallery-section">
      <FlyingButterflies scene="gallery" />
      <SectionReveal className="gallery-heading">
        <div>
          <p className="eyebrow">MOMENTS TO TREASURE</p>
          <h2 className="section-title">កម្រងរូបភាព</h2>
        </div>
        {!config.sample && (
          <p>ទំព័រនៃអនុស្សាវរីយ៍ ដែលយើងចង់ចែករំលែកជាមួយអ្នក។</p>
        )}
      </SectionReveal>
      <div
        className="gallery-grid"
        ref={galleryRef}
        role="region"
        aria-label="កម្រងរូបភាពអាពាហ៍ពិពាហ៍ អូសទៅម្ខាងដើម្បីមើលរូបបន្ទាប់"
        tabIndex={0}
        onPointerDown={pauseAutoScroll}
        onWheel={pauseAutoScroll}
        onKeyDown={pauseAutoScroll}
      >
        {config.images.gallery.map((photo, index) => (
          <SectionReveal
            className={`gallery-reveal gallery-reveal-${index + 1}`}
            key={photo.src}
            delay={Math.min(index * 0.1, 0.3)}
            distance={8}
            variant="photo"
          >
            <button
              className={`gallery-tile gallery-tile-${index + 1}`}
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setActive(index);
              }}
              aria-label={`មើល ${photo.caption}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 700px) 90vw, 45vw"
              />
              <span className="gallery-caption">
                <span>0{index + 1}</span>
                {photo.caption}
                <span aria-hidden="true">↗</span>
              </span>
            </button>
          </SectionReveal>
        ))}
      </div>
      {config.sample && (
        <p className="gallery-note">
          រូបថតគំរូបង្ហាញគូផ្សេងៗគ្នា —
          សូមដាក់រូបភាពគូស្វាមីភរិយាពិតមុនចែករំលែកធៀប។
        </p>
      )}
      {active !== null && (
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
            className="lightbox-close"
            ref={closeRef}
            onClick={() => setActive(null)}
            aria-label="បិទរូបភាព"
          >
            <X />
          </button>
          <button
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
            <p>
              {config.images.gallery[active].caption} · {active + 1} /{" "}
              {config.images.gallery.length}
            </p>
          </div>
          <button
            className="lightbox-arrow"
            onClick={() =>
              setActive((active + 1) % config.images.gallery.length)
            }
            aria-label="រូបភាពបន្ទាប់"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </section>
  );
}
