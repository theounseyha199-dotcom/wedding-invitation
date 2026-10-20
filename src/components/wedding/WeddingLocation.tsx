import { MapPin, ArrowUpRight } from "lucide-react";
import { directionsUrl } from "@/lib/utils";
import { SectionReveal } from "@/components/ui/SectionReveal";
import type { WeddingConfig } from "@/types/wedding";

export function WeddingLocation({ config }: { config: WeddingConfig }) {
  const venues = [
    { ...config.venues.ceremony, label: "ទីតាំងពិធី", index: "01" },
    ...(config.venues.reception
      ? [
          {
            ...config.venues.reception,
            label: "ទីតាំងពិសាភោជនាហារ",
            index: "02",
          },
        ]
      : []),
  ];
  return (
    <section id="location" className="section location-section">
      <SectionReveal className="section-heading">
        <p className="eyebrow">FIND YOUR WAY TO US</p>
        <h2 className="section-title">ទីតាំងពិធីមង្គល</h2>
        <p className="section-intro">
          យើងខ្ញុំរង់ចាំទទួលស្វាគមន៍លោកអ្នកដោយក្តីរីករាយ។
        </p>
      </SectionReveal>
      <div className="venue-grid">
        {venues.map((venue, index) => (
          <SectionReveal
            className="venue-card"
            key={venue.index}
            delay={index * 0.12}
            distance={10}
          >
            <div className="venue-head">
              <MapPin size={21} strokeWidth={1.4} />
              <span>
                {venue.index} / {venue.label}
              </span>
            </div>
            <h3>{venue.name}</h3>
            <p>{venue.address}</p>
            <p>
              {config.dateLabel} · {venue.time}
            </p>
            <a
              className="button button-outline"
              href={directionsUrl(venue)}
              target="_blank"
              rel="noopener noreferrer"
            >
              មើលផ្លូវទៅកាន់ទីតាំង <ArrowUpRight size={18} />
            </a>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
