import type { Metadata } from "next";
import { WeddingExperience } from "@/components/wedding/WeddingExperience";
import { resolveWeddingGuest } from "@/lib/wedding-guests";
import { weddingGuests } from "@/config/guests";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  openGraph: {
    title: "លិខិតអញ្ជើញអាពាហ៍ពិពាហ៍",
    description: "សូមគោរពអញ្ជើញចូលរួមអាពាហ៍ពិពាហ៍",
  },
};

// Guest resolution waits for the route parameter; the generated demo paths still prerender.
export const instant = false;

export function generateStaticParams() {
  return weddingGuests.map(({ slug }) => ({ slug }));
}

export default async function PersonalizedInvitation({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Unknown identifiers intentionally show the generic invitation, never URL text.
  return <WeddingExperience guest={resolveWeddingGuest(slug)} />;
}
