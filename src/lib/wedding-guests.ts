import { weddingGuests } from "@/config/guests";
import type { WeddingGuest } from "@/config/guests";

/** This lookup is the replaceable boundary for future server-side guest storage. */
export function resolveWeddingGuest(slug: string) {
  return weddingGuests.find((guest) => guest.slug === slug);
}

export function formatGuestName(guest: WeddingGuest) {
  const name = guest.displayNameKh.trim();
  const honorific = guest.honorific?.trim();
  return honorific && !name.startsWith(honorific)
    ? `${honorific} ${name}`
    : name;
}
