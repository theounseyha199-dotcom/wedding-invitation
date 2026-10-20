import { SectionReveal } from "@/components/ui/SectionReveal";
import { AnimatedTimelineLine } from "./AnimatedTimelineLine";
import { AnimatedDivider } from "./AnimatedDivider";
import type { WeddingConfig } from "@/types/wedding";

export function CeremonyTimeline({ config }: { config: WeddingConfig }) {
  return (
    <section id="schedule" className="section schedule-section">
      <div className="section-heading">
        <SectionReveal distance={8}>
          <p className="eyebrow">THE CELEBRATION</p>
          <h2 className="section-title">កម្មវិធីមង្គលការ</h2>
        </SectionReveal>
        <AnimatedDivider />
        <SectionReveal delay={0.1} distance={8}>
          <p className="section-intro">
            រាល់ពេលវេលាពិសេស មានន័យកាន់តែជ្រាលជ្រៅ ពេលមានលោកអ្នកចូលរួម។
          </p>
        </SectionReveal>
      </div>
      <div className="ceremony-list">
        <AnimatedTimelineLine />
        {config.ceremonies.map((item, i) => (
          <SectionReveal
            className="ceremony-item"
            key={`${item.time}-${item.title}`}
            delay={Math.min(i * 0.07, 0.21)}
            distance={10}
          >
            <div className="ceremony-count">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="ceremony-time">{item.time}</div>
            <div className="ceremony-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.venue && <span>{item.venue}</span>}
            </div>
            <div className="ceremony-flower" aria-hidden="true">
              ✺
            </div>
          </SectionReveal>
        ))}
      </div>
      <p className="schedule-footnote">
        កម្មវិធីនេះជាឧទាហរណ៍។ លំដាប់
        និងពេលវេលាអាចកែតម្រូវតាមប្រពៃណីរបស់គ្រួសារនីមួយៗ។
      </p>
    </section>
  );
}
