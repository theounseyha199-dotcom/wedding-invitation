import Image from "next/image";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { FlyingButterflies } from "./FlyingButterflies";
import { ParallaxOrnament } from "./ParallaxOrnament";
import type { WeddingConfig } from "@/types/wedding";

export function WeddingHero({ config }: { config: WeddingConfig }) {
  return (
    <header className="hero" id="top">
      <FlyingButterflies scene="hero" />
      <div className="hero-topline">
        <span>THE WEDDING OF</span>
        <span>
          {new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            timeZone: config.timezone,
          }).format(new Date(config.dateISO))}
        </span>
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">ដោយក្តីស្រឡាញ់ និងកិត្តិយស</p>
          <ParallaxOrnament className="hero-ornament" />
          <SectionReveal delay={0.08} distance={14}>
            <h1 className="hero-khmer">{config.title}</h1>
          </SectionReveal>
          <SectionReveal delay={0.16} distance={10}>
            <p className="hero-invite">{config.wording.salutation}</p>
          </SectionReveal>
          <div className="hero-names">
            <SectionReveal delay={0.24} distance={12}>
              <span>{config.couple.groom.fullNameKh}</span>
            </SectionReveal>
            <SectionReveal delay={0.34} distance={8}>
              <em>និង</em>
            </SectionReveal>
            <SectionReveal delay={0.44} distance={12}>
              <span>{config.couple.bride.fullNameKh}</span>
            </SectionReveal>
          </div>
          <p className="latin-display hero-en">
            {config.couple.groom.nameEn} <i>&</i> {config.couple.bride.nameEn}
          </p>
          <div className="hero-rule" />
          <p className="hero-date">{config.dateLabel}</p>
          <p className="hero-place">
            {config.venues.reception?.address ?? config.venues.ceremony.address}
          </p>
          <a href="#invitation" className="text-link">
            សូមអានធៀបអញ្ជើញ <span aria-hidden="true">↓</span>
          </a>
        </div>
        <SectionReveal
          className="hero-art"
          delay={0.28}
          distance={8}
          variant="photo"
        >
          <div className="hero-art-frame">
            <Image
              src={config.images.hero.src}
              alt={config.images.hero.alt}
              fill
              priority
              sizes="(max-width: 800px) 86vw, 43vw"
            />
          </div>
          <div className="hero-art-caption">
            <span>01 / AN INVITATION TO CELEBRATE</span>
            <span>{config.images.hero.caption}</span>
          </div>
        </SectionReveal>
      </div>
      <div className="hero-bottomline">
        <span>សូមអញ្ជើញចូលរួមជាមួយយើង</span>
        <span>SCROLL TO EXPLORE ↓</span>
      </div>
    </header>
  );
}
