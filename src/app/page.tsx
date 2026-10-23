import { WeddingExperience } from "@/components/wedding/WeddingExperience";
import {
  weddingConfig,
  weddingSeo,
  weddingShareImage,
  weddingSiteUrl,
} from "@/config/wedding";

const websiteId = `${weddingSiteUrl}/#website`;
const webpageId = `${weddingSiteUrl}/#webpage`;
const imageId = `${weddingSiteUrl}/#primaryimage`;
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: weddingSiteUrl,
      name: weddingConfig.title,
      alternateName: `${weddingConfig.couple.groom.nameEn} & ${weddingConfig.couple.bride.nameEn} Wedding Invitation`,
      description: weddingSeo.description,
      inLanguage: weddingSeo.language,
    },
    {
      "@type": "WebPage",
      "@id": webpageId,
      url: weddingSiteUrl,
      name: weddingSeo.title,
      description: weddingSeo.description,
      inLanguage: weddingSeo.language,
      isPartOf: { "@id": websiteId },
      primaryImageOfPage: { "@id": imageId },
    },
    {
      "@type": "ImageObject",
      "@id": imageId,
      contentUrl: weddingShareImage.url,
      url: weddingShareImage.url,
      width: weddingShareImage.width,
      height: weddingShareImage.height,
      caption: weddingShareImage.alt,
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        id="wedding-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <WeddingExperience />
    </>
  );
}
