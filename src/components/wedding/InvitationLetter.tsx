import { SectionReveal } from "@/components/ui/SectionReveal";
import { AnimatedDivider } from "./AnimatedDivider";
import type { WeddingConfig } from "@/types/wedding";

export function InvitationLetter({ config }: { config: WeddingConfig }) {
  return (
    <section id="invitation" className="section invitation-section">
      <div className="invitation-paper ornamental-frame">
        <SectionReveal distance={8}>
          <p className="eyebrow">A HEARTFELT INVITATION</p>
        </SectionReveal>
        <AnimatedDivider />
        <SectionReveal delay={0.06} distance={10}>
          <h2 className="section-title">លិខិតអញ្ជើញ</h2>
        </SectionReveal>
        <SectionReveal className="parent-grid" delay={0.1} distance={8}>
          <div>
            <p className="small-label">មាតាបិតាខាងកូនប្រុស</p>
            {config.couple.groom.parents.map((n) => (
              <p key={n}>{n}</p>
            ))}
          </div>
          <div>
            <p className="small-label">មាតាបិតាខាងកូនស្រី</p>
            {config.couple.bride.parents.map((n) => (
              <p key={n}>{n}</p>
            ))}
          </div>
        </SectionReveal>
        <SectionReveal delay={0.14} distance={8}>
          <p className="invitation-body">{config.wording.invitation}</p>
        </SectionReveal>
        <SectionReveal className="letter-couple" delay={0.18} distance={8}>
          <span>{config.couple.groom.fullNameKh}</span>
          <span className="amp">&</span>
          <span>{config.couple.bride.fullNameKh}</span>
        </SectionReveal>
        <AnimatedDivider />
        <SectionReveal delay={0.1} distance={8}>
          <p className="letter-date">
            {config.dateLabel} ·{" "}
            {config.venues.reception?.time ?? config.venues.ceremony.time}
          </p>
          <p className="letter-venue">
            {config.venues.reception?.name ?? config.venues.ceremony.name}
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
