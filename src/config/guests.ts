/** Fictional public demo guests only. Do not put a real guest list in this module. */
export type WeddingGuest = {
  slug: string;
  displayNameKh: string;
  displayNameEn?: string;
  honorific?: string;
  invitationType?: "individual" | "family";
  householdLabelKh?: string;
};

export const weddingGuests: readonly WeddingGuest[] = [
  {
    slug: "sample-dara",
    displayNameKh: "សុខ ដារ៉ា",
    honorific: "លោក",
    invitationType: "individual",
  },
  {
    slug: "sample-family",
    displayNameKh: "គ្រួសារសំណាង",
    invitationType: "family",
  },
];
