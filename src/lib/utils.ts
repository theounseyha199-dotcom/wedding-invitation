import type { Venue } from "@/types/wedding";

export function directionsUrl(venue: Venue) {
  const destination = venue.coordinates
    ? `${venue.coordinates.lat},${venue.coordinates.lng}`
    : venue.address;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}
