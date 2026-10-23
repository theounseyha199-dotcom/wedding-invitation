import { weddingConfig as config } from "@/config/wedding";
import type { WeddingGuest } from "@/config/guests";
import { formatGuestName } from "@/lib/wedding-guests";
import { WeddingEnvelope } from "./WeddingEnvelope";
import { WeddingHero } from "./WeddingHero";
import { InvitationLetter } from "./InvitationLetter";
import { CoupleStory } from "./CoupleStory";
import { CeremonyTimeline } from "./CeremonyTimeline";
import { WeddingCountdown } from "./WeddingCountdown";
import { WeddingGallery } from "./WeddingGallery";
import { WeddingLocation } from "./WeddingLocation";
import { WeddingRSVP } from "./WeddingRSVP";
import { WeddingBlessing } from "./WeddingBlessing";
import { WeddingControls } from "./WeddingControls";

export function WeddingExperience({ guest }: { guest?: WeddingGuest }) {
  return (
    <>
      <WeddingEnvelope config={config} />
      <noscript>
        <style>{`.envelope-overlay { display: none !important; }`}</style>
      </noscript>
      <main>
        <WeddingHero config={config} />
        <InvitationLetter config={config} guest={guest} />
        {config.features.story && <CoupleStory config={config} />}
        {config.features.schedule && <CeremonyTimeline config={config} />}
        {config.features.countdown && <WeddingCountdown config={config} />}
        {config.features.gallery && <WeddingGallery config={config} />}
        {config.features.location && <WeddingLocation config={config} />}
        {config.features.rsvp && config.rsvp.enabled && (
          <WeddingRSVP
            config={config}
            initialName={guest ? formatGuestName(guest) : ""}
          />
        )}
      </main>
      <WeddingBlessing config={config} />
      <WeddingControls config={config} />
    </>
  );
}
