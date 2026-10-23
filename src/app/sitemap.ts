import type { MetadataRoute } from "next";
import {
  weddingSeo,
  weddingShareImage,
  weddingSiteUrl,
} from "@/config/wedding";

export default function sitemap(): MetadataRoute.Sitemap {
  // Never enumerate guest identifiers or publish placeholder event dates.
  return weddingSeo.indexHomepage
    ? [{ url: weddingSiteUrl, images: [weddingShareImage.url] }]
    : [];
}
