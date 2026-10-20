import { SectionReveal } from "@/components/ui/SectionReveal";
import { FlyingButterflies } from "./FlyingButterflies";
import { AnimatedDivider } from "./AnimatedDivider";
import type { WeddingConfig } from "@/types/wedding";
export function WeddingBlessing({ config }: { config: WeddingConfig }) {
  return (
    <footer className="blessing-section">
      <FlyingButterflies scene="blessing" />
      <div className="blessing-inner ornamental-frame">
        <SectionReveal distance={8}>
          <p className="eyebrow">WITH ALL OUR HEARTS</p>
        </SectionReveal>
        <AnimatedDivider />
        <SectionReveal delay={0.06} distance={8}>
          <h2>សូមអរគុណពីបេះដូង</h2>
        </SectionReveal>
        <SectionReveal delay={0.13} distance={10}>
          <blockquote style={{ maxWidth: "none" }}>
            “{config.wording.blessing}”
          </blockquote>
        </SectionReveal>
        <SectionReveal className="blessing-gratitude" delay={0.2} distance={8}>
          <p>{config.wording.gratitude}</p>
        </SectionReveal>
        <div className="footer-initials latin-display">
          {config.couple.initials}
        </div>
        <span className="footer-date">{config.dateLabel}</span>
      </div>
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
