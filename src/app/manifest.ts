import type { MetadataRoute } from "next";
import { weddingConfig } from "@/config/wedding";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: weddingConfig.title,
    short_name: "ធៀបអាពាហ៍ពិពាហ៍",
    description: `${weddingConfig.couple.groom.nameKh} និង ${weddingConfig.couple.bride.nameKh}`,
    lang: "km",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#FFF7F2",
    theme_color: "#BE8F83",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
