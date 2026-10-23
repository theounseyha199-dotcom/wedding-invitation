import type { Metadata } from "next";
import { WeddingExperience } from "@/components/wedding/WeddingExperience";
import { resolveWeddingGuest } from "@/lib/wedding-guests";
import { weddingGuests } from "@/config/guests";
import {
  weddingConfig,
  weddingShareImage,
  weddingSiteUrl,
} from "@/config/wedding";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const url = new URL(`/invite/${encodeURIComponent(slug)}`, weddingSiteUrl)
    .href;
  const title = "លិខិតអញ្ជើញអាពាហ៍ពិពាហ៍";
  const description = "សូមគោរពអញ្ជើញចូលរួមអាពាហ៍ពិពាហ៍";
  return {
    robots: { index: false, follow: false },
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "km_KH",
      url,
      siteName: weddingConfig.title,
      title,
      description,
      images: [weddingShareImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [weddingShareImage],
    },
  };
}

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
