import { SectionReveal } from "@/components/ui/SectionReveal";
import type { WeddingGuest } from "@/config/guests";
import { formatGuestName } from "@/lib/wedding-guests";

export function PersonalizedGreeting({
  guest,
  salutation,
}: {
  guest: WeddingGuest;
  salutation: string;
}) {
  return (
    <SectionReveal className="personalized-greeting" delay={0.08} distance={8}>
      <p>{salutation}</p>
      <p className="guest-name">{formatGuestName(guest)}</p>
      {guest.invitationType === "family" && guest.householdLabelKh && (
        <p className="guest-household">{guest.householdLabelKh}</p>
      )}
      <p className="guest-invitation-note">
        សូមអញ្ជើញចូលរួមជាភ្ញៀវកិត្តិយសក្នុងពិធីមង្គលការរបស់យើងខ្ញុំ។
      </p>
    </SectionReveal>
  );
}
