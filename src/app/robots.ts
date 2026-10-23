import type { MetadataRoute } from "next";
import { weddingSiteUrl } from "@/config/wedding";

export default function robots(): MetadataRoute.Robots {
  return {
    // Guest pages must be crawlable so their noindex metadata can be read.
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", weddingSiteUrl).href,
  };
}
