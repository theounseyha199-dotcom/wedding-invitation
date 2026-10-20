import Image from "next/image";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { FlyingButterflies } from "./FlyingButterflies";
import type { WeddingConfig } from "@/types/wedding";

export function CoupleStory({ config }: { config: WeddingConfig }) {
  return (
    <section id="story" className="section story-section">
      <FlyingButterflies scene="story" />
      <SectionReveal className="section-heading">
        <p className="eyebrow">OUR STORY</p>
        <h2 className="section-title">{config.story.title}</h2>
      </SectionReveal>
      <div className="story-grid">
        <SectionReveal
          className="story-image"
          delay={0.1}
          distance={8}
          variant="photo"
        >
          <Image
            src={config.images.story.src}
            alt={config.images.story.alt}
            fill
            sizes="(max-width: 800px) 90vw, 42vw"
          />
          <span className="image-label">{config.images.story.caption}</span>
        </SectionReveal>
        <SectionReveal className="story-copy" delay={0.18} distance={10}>
          <p className="story-kicker">{config.story.eyebrow}</p>
          <p className="story-lead">{config.story.intro}</p>
          <p>{config.story.message}</p>
          <div className="story-moments">
            {config.story.moments.map((moment, index) => (
              <SectionReveal
                className="story-moment"
                key={moment.year}
                delay={Math.min(index * 0.11, 0.33)}
                distance={10}
              >
                <span>{moment.year}</span>
                <div>
                  <h3>{moment.title}</h3>
                  <p>{moment.description}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
