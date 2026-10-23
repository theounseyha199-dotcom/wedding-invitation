import Image from "next/image";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { FlyingButterflies } from "./FlyingButterflies";
import { RomanticFloralDecoration } from "./RomanticFloralDecoration";
import { AnimatedDivider } from "./AnimatedDivider";
import type { WeddingConfig } from "@/types/wedding";

export function CoupleStory({ config }: { config: WeddingConfig }) {
  return (
    <section
      id="story"
      className="section story-section"
      aria-labelledby="story-title"
    >
      <FlyingButterflies scene="story" />
      <RomanticFloralDecoration position="bottom-left" variant="romantic" />
      <SectionReveal className="section-heading story-heading">
        <p className="eyebrow">OUR STORY</p>
        <h2 id="story-title" className="section-title">
          {config.story.title}
        </h2>
        <AnimatedDivider />
      </SectionReveal>
      <div className="story-grid">
        <SectionReveal className="story-copy" delay={0.1} distance={8}>
          <p className="story-kicker">{config.story.eyebrow}</p>
          <p className="story-lead">{config.story.intro}</p>
        </SectionReveal>
        <SectionReveal
          className="story-portrait"
          delay={0.06}
          distance={8}
          variant="photo"
        >
          <div
            className="story-image"
            style={{
              aspectRatio:
                config.images.story.width && config.images.story.height
                  ? `${config.images.story.width} / ${config.images.story.height}`
                  : undefined,
            }}
          >
            <Image
              src={config.images.story.src}
              alt={config.images.story.alt}
              fill
              sizes="(max-width: 700px) 74vw, 320px"
            />
          </div>
        </SectionReveal>
        <SectionReveal className="story-message" delay={0.18} distance={8}>
          <p>{config.story.message}</p>
        </SectionReveal>
      </div>
      <ol className="story-moments">
        {config.story.moments.map((moment, index) => (
          <li key={moment.year}>
            <SectionReveal
              className="story-moment"
              delay={Math.min(index * 0.11, 0.33)}
              distance={8}
            >
              <span className="story-year">{moment.year}</span>
              <span className="story-moment-marker" aria-hidden="true" />
              <h3>{moment.title}</h3>
              <p>{moment.description}</p>
            </SectionReveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
