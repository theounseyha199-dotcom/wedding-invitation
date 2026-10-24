"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUp, Copy, Pause, Play, Share2 } from "lucide-react";
import type { WeddingConfig } from "@/types/wedding";

const FADE_IN_SECONDS = 1.8;

export function WeddingControls({ config }: { config: WeddingConfig }) {
  const [playing, setPlaying] = useState(false);
  const [musicUnavailable, setMusicUnavailable] = useState(false);
  const [notice, setNotice] = useState("");
  const [pastHero, setPastHero] = useState(false);
  const [rsvpVisible, setRsvpVisible] = useState(false);
  const [quietSectionVisible, setQuietSectionVisible] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);
  const context = useRef<AudioContext | null>(null);
  const gain = useRef<GainNode | null>(null);
  const fadeFrame = useRef<number | null>(null);
  const starting = useRef(false);
  const hasMusic = config.features.music && Boolean(config.audio);
  const targetVolume = Math.min(1, Math.max(0, config.audio?.volume ?? 0.35));

  const silence = useCallback(() => {
    if (fadeFrame.current !== null) {
      cancelAnimationFrame(fadeFrame.current);
      fadeFrame.current = null;
    }
    if (context.current && gain.current) {
      const now = context.current.currentTime;
      gain.current.gain.cancelScheduledValues(now);
      gain.current.gain.setValueAtTime(0, now);
    }
  }, []);

  const fadeElementVolume = useCallback(
    (element: HTMLAudioElement) => {
      const startedAt = performance.now();
      const step = (now: number) => {
        if (element.paused) {
          fadeFrame.current = null;
          return;
        }
        const progress = Math.min(
          (now - startedAt) / (FADE_IN_SECONDS * 1000),
          1,
        );
        element.volume = targetVolume * progress;
        fadeFrame.current = progress < 1 ? requestAnimationFrame(step) : null;
      };
      fadeFrame.current = requestAnimationFrame(step);
    },
    [targetVolume],
  );

  const startMusic = useCallback(() => {
    const element = audio.current;
    if (
      !element ||
      !hasMusic ||
      musicUnavailable ||
      starting.current ||
      !element.paused
    )
      return;

    starting.current = true;
    silence();
    element.volume = targetVolume;
    let resume: Promise<void> | undefined;
    let usingGain = false;

    try {
      const AudioContextClass =
        window.AudioContext ??
        (window as Window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!context.current && AudioContextClass) {
        const nextContext = new AudioContextClass();
        const source = nextContext.createMediaElementSource(element);
        const nextGain = nextContext.createGain();
        source.connect(nextGain);
        nextGain.connect(nextContext.destination);
        context.current = nextContext;
        gain.current = nextGain;
      }
      if (context.current && gain.current) {
        const now = context.current.currentTime;
        const effectiveGain = Math.min(
          1,
          targetVolume / Math.max(element.volume, 0.01),
        );
        gain.current.gain.cancelScheduledValues(now);
        gain.current.gain.setValueAtTime(0, now);
        gain.current.gain.linearRampToValueAtTime(
          effectiveGain,
          now + FADE_IN_SECONDS,
        );
        resume = context.current.resume();
        usingGain = true;
      } else {
        element.volume = 0;
      }
    } catch {
      // Older browsers can still play through the audio element.
      element.volume = 0;
    }

    // play() and resume() are invoked synchronously in the opening click's gesture.
    let play: Promise<void>;
    try {
      play = element.play();
    } catch (error) {
      starting.current = false;
      if (error instanceof DOMException && error.name === "NotSupportedError")
        setMusicUnavailable(true);
      setNotice("មិនអាចចាប់ផ្ដើមតន្ត្រីបាន។ សូមចុចប៊ូតុងតន្ត្រីម្ដងទៀត។");
      return;
    }
    void Promise.all([play, resume]).then(
      () => {
        starting.current = false;
        if (!element.paused && !usingGain) fadeElementVolume(element);
      },
      (error: unknown) => {
        starting.current = false;
        element.pause();
        silence();
        if (error instanceof DOMException && error.name === "NotSupportedError")
          setMusicUnavailable(true);
        setNotice("មិនអាចចាប់ផ្ដើមតន្ត្រីបាន។ សូមចុចប៊ូតុងតន្ត្រីម្ដងទៀត។");
      },
    );
  }, [fadeElementVolume, hasMusic, musicUnavailable, silence, targetVolume]);

  useEffect(() => {
    if (!hasMusic || !audio.current) return;
    audio.current.volume = targetVolume;
    const onOpen = () => startMusic();
    window.addEventListener("wedding-opened", onOpen);
    return () => window.removeEventListener("wedding-opened", onOpen);
  }, [hasMusic, startMusic, targetVolume]);

  useEffect(
    () => () => {
      silence();
      audio.current?.pause();
      if (context.current) void context.current.close();
    },
    [silence],
  );

  useEffect(() => {
    if (!notice) return;
    const id = setTimeout(() => setNotice(""), 3500);
    return () => clearTimeout(id);
  }, [notice]);

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("top");
      setPastHero(!hero || hero.getBoundingClientRect().bottom <= 0);
      const rsvp = document.getElementById("rsvp");
      const bounds = rsvp?.getBoundingClientRect();
      setRsvpVisible(
        Boolean(
          bounds && bounds.top < window.innerHeight - 48 && bounds.bottom > 48,
        ),
      );
      setQuietSectionVisible(
        ["invitation", "gallery", "gift", "closing"].some((id) => {
          const page = document.getElementById(id);
          if (!page) return false;
          const rect = page.getBoundingClientRect();
          return rect.top < window.innerHeight - 48 && rect.bottom > 48;
        }),
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(location.href);
      setNotice("បានចម្លងតំណធៀបអញ្ជើញ");
    } catch {
      setNotice("មិនអាចចម្លងបាន សូមចម្លងពីរបារអាសយដ្ឋាន។");
    }
  }

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ title: config.title, url: location.href });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
        await copy();
      }
    } else await copy();
  }

  function toggleMusic() {
    if (!audio.current || musicUnavailable) return;
    if (!audio.current.paused) {
      audio.current.pause();
      silence();
    } else startMusic();
  }

  return (
    <>
      {hasMusic && config.audio && (
        <audio
          ref={audio}
          src={config.audio.src}
          loop
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => {
            setPlaying(false);
            silence();
          }}
          onEnded={() => setPlaying(false)}
          onError={() => {
            setMusicUnavailable(true);
            setPlaying(false);
            silence();
            setNotice("មិនអាចបើកឯកសារតន្ត្រីបាននៅលើឧបករណ៍នេះ។");
          }}
        />
      )}
      {pastHero && !rsvpVisible && !quietSectionVisible && (
        <div className="floating-controls" aria-label="ឧបករណ៍ធៀបអញ្ជើញ">
          <button
            onClick={toggleMusic}
            disabled={!hasMusic || musicUnavailable}
            aria-pressed={playing}
            aria-label={
              musicUnavailable
                ? "តន្ត្រីមិនអាចប្រើបាន"
                : hasMusic
                  ? playing
                    ? "បិទតន្ត្រី"
                    : "បើកតន្ត្រី"
                  : "មិនទាន់មានតន្ត្រី"
            }
            title={
              musicUnavailable
                ? "តន្ត្រីមិនអាចប្រើបាន"
                : hasMusic
                  ? playing
                    ? "បិទតន្ត្រី"
                    : "បើកតន្ត្រី"
                  : "មិនទាន់មានតន្ត្រី"
            }
          >
            {playing ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button
            onClick={share}
            aria-label="ចែករំលែកធៀបអញ្ជើញ"
            title="ចែករំលែក"
          >
            <Share2 size={18} />
          </button>
          <button
            onClick={copy}
            aria-label="ចម្លងតំណធៀបអញ្ជើញ"
            title="ចម្លងតំណ"
          >
            <Copy size={18} />
          </button>
          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "instant"
                  : "smooth",
              })
            }
            aria-label="ត្រឡប់ទៅកំពូល"
            title="ទៅកំពូល"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      )}
      <div className="control-notice" role="status" aria-live="polite">
        {notice}
      </div>
    </>
  );
}
