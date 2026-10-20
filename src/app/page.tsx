import { weddingConfig as config } from "@/config/wedding";
import { WeddingEnvelope } from "@/components/wedding/WeddingEnvelope";
import { WeddingHero } from "@/components/wedding/WeddingHero";
import { InvitationLetter } from "@/components/wedding/InvitationLetter";
import { CoupleStory } from "@/components/wedding/CoupleStory";
import { CeremonyTimeline } from "@/components/wedding/CeremonyTimeline";
import { WeddingCountdown } from "@/components/wedding/WeddingCountdown";
import { WeddingGallery } from "@/components/wedding/WeddingGallery";
import { WeddingLocation } from "@/components/wedding/WeddingLocation";
import { WeddingRSVP } from "@/components/wedding/WeddingRSVP";
import { WeddingBlessing } from "@/components/wedding/WeddingBlessing";
import { WeddingControls } from "@/components/wedding/WeddingControls";

export default function Home() {
  return (
    <>
      <WeddingEnvelope config={config} />
      <noscript>
        <style>{`.envelope-overlay { display: none !important; }`}</style>
      </noscript>
      <main>
        <WeddingHero config={config} />
        <InvitationLetter config={config} />
        {config.features.story && <CoupleStory config={config} />}
        {config.features.schedule && <CeremonyTimeline config={config} />}
        {config.features.countdown && <WeddingCountdown config={config} />}
        {config.features.gallery && <WeddingGallery config={config} />}
        {config.features.location && <WeddingLocation config={config} />}
        {config.features.rsvp && config.rsvp.enabled && (
          <WeddingRSVP config={config} />
        )}
      </main>
      <WeddingBlessing config={config} />
      <WeddingControls config={config} />
    </>
  );
}
