export type WeddingImage = { src: string; alt: string; caption: string };
export type Venue = {
  name: string;
  address: string;
  time: string;
  coordinates?: { lat: number; lng: number };
};
export type Ceremony = {
  title: string;
  time: string;
  description: string;
  venue?: string;
};
export type WeddingConfig = {
  sample: boolean;
  language: "km";
  timezone: "Asia/Phnom_Penh";
  title: string;
  dateISO: string;
  dateLabel: string;
  couple: {
    groom: {
      nameKh: string;
      nameEn: string;
      fullNameKh: string;
      parents: string[];
    };
    bride: {
      nameKh: string;
      nameEn: string;
      fullNameKh: string;
      parents: string[];
    };
    initials: string;
  };
  wording: {
    invitation: string;
    salutation: string;
    gratitude: string;
    blessing: string;
  };
  story: {
    eyebrow: string;
    title: string;
    intro: string;
    message: string;
    moments: { year: string; title: string; description: string }[];
  };
  ceremonies: Ceremony[];
  venues: { ceremony: Venue; reception?: Venue };
  images: { hero: WeddingImage; story: WeddingImage; gallery: WeddingImage[] };
  audio?: { src: string; label: string; volume?: number };
  rsvp: { maxGuests: number; enabled: boolean };
  features: {
    story: boolean;
    schedule: boolean;
    countdown: boolean;
    gallery: boolean;
    location: boolean;
    rsvp: boolean;
    music: boolean;
  };
};
