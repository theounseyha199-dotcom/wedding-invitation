import { SectionReveal } from "@/components/ui/SectionReveal";
import { FlyingButterflies } from "./FlyingButterflies";
import { AnimatedDivider } from "./AnimatedDivider";
import { WeddingMonogram } from "./WeddingMonogram";
import { RomanticFloralDecoration } from "./RomanticFloralDecoration";
import { RoyalOrnamentalFrame } from "./RoyalOrnamentalFrame";
import Image from "next/image";
import type { WeddingConfig } from "@/types/wedding";
export function WeddingBlessing({ config }: { config: WeddingConfig }) {
  return (
    <footer id="closing" className="blessing-section">
      <FlyingButterflies scene="blessing" />
      <RoyalOrnamentalFrame variant="minimal" className="blessing-inner">
        <RomanticFloralDecoration position="top-right" variant="romantic" />
        <div className="closing-composition">
          <SectionReveal
            className="closing-photo"
            variant="photo"
            distance={8}
            delay={0.04}
            style={{
              aspectRatio: `${config.images.hero.width ?? 683} / ${config.images.hero.height ?? 1024}`,
            }}
          >
            <Image
              src={config.images.hero.src}
              alt={config.images.hero.alt}
              fill
              sizes="(max-width: 700px) 84vw, 38vw"
            />
            {config.sample && (
              <span className="closing-photo-caption">
                {config.images.hero.caption}
              </span>
            )}
          </SectionReveal>
          <div className="closing-copy">
            <SectionReveal distance={8}>
              <p className="eyebrow">WITH ALL OUR HEARTS</p>
            </SectionReveal>
            <AnimatedDivider />
            <SectionReveal delay={0.06} distance={8}>
              <h2>សូមថ្លែងអំណរគុណ</h2>
            </SectionReveal>
            <SectionReveal
              className="blessing-gratitude"
              delay={0.2}
              distance={8}
            >
              <p>{config.wording.gratitude}</p>
            </SectionReveal>
            {config.monogram?.showOnClosing !== false && (
              <SectionReveal distance={6} delay={0.27}>
                <WeddingMonogram
                  config={config}
                  size="lg"
                  variant="outline"
                  className="closing-monogram"
                />
              </SectionReveal>
            )}
            <p className="closing-names">
              {config.couple.groom.nameKh} <span aria-hidden="true">&</span>{" "}
              {config.couple.bride.nameKh}
            </p>
            <span className="footer-date">{config.dateLabel}</span>
          </div>
        </div>
        <SectionReveal className="closing-blessing" delay={0.32} distance={8}>
          <blockquote>“{config.wording.blessing}”</blockquote>
        </SectionReveal>
      </RoyalOrnamentalFrame>
      <div className="footer-bar">
        <span>
          {config.couple.groom.nameEn} & {config.couple.bride.nameEn}
        </span>
        <span>
          {config.sample
            ? "SAMPLE INVITATION · NOT A REAL EVENT"
            : "MADE WITH LOVE IN CAMBODIA"}
        </span>
      </div>
    </footer>
  );
}
