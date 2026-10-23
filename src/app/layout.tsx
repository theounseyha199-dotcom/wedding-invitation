import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import {
  Cormorant_Garamond,
  Noto_Sans_Khmer,
  Noto_Serif_Khmer,
} from "next/font/google";
import { weddingConfig, weddingShareImage } from "@/config/wedding";
import "./globals.css";

const khmerDisplay = localFont({
  src: "../../public/fonts/KhmerOS_muollight.ttf",
  variable: "--font-khmer-display",
  weight: "400",
  style: "normal",
  display: "swap",
  fallback: ["Noto Serif Khmer", "serif"],
});

const khmerSans = Noto_Sans_Khmer({
  subsets: ["khmer", "latin"],
  variable: "--font-khmer-sans",
  display: "swap",
});
const khmerSerif = Noto_Serif_Khmer({
  subsets: ["khmer", "latin"],
  variable: "--font-khmer-serif",
  display: "swap",
});
const latinSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-latin-serif",
  display: "swap",
});

const deploymentHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const deploymentUrl = deploymentHost
  ? `https://${deploymentHost}`
  : process.env.NODE_ENV === "production"
    ? "https://wedding-invitation-three-jade.vercel.app"
    : "http://localhost:3000";
const configuredUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || deploymentUrl,
);
// A copied local environment setting must never publish an unreachable image URL.
const metadataBase =
  process.env.NODE_ENV === "production" &&
  ["localhost", "127.0.0.1", "[::1]"].includes(configuredUrl.hostname)
    ? new URL(deploymentUrl)
    : configuredUrl;
const shareTitle = `${weddingConfig.couple.groom.nameKh} & ${weddingConfig.couple.bride.nameKh} · ${weddingConfig.title}`;
const shareDescription = weddingConfig.sample
  ? "ធៀបអញ្ជើញអាពាហ៍ពិពាហ៍គំរូ"
  : weddingConfig.wording.salutation;

export const metadata: Metadata = {
  metadataBase,
  title: `${weddingConfig.couple.groom.nameKh} & ${weddingConfig.couple.bride.nameKh} | ធៀបអញ្ជើញមង្គលការ${weddingConfig.sample ? " (គំរូ)" : ""}`,
  description: `${weddingConfig.title} — ${weddingConfig.dateLabel}។ ${weddingConfig.sample ? "នេះជាធៀបអញ្ជើញគំរូ មិនមែនជាកម្មវិធីពិតទេ។" : weddingConfig.wording.salutation}`,
  applicationName: weddingConfig.title,
  alternates: { canonical: "/" },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: weddingConfig.title,
  },
  openGraph: {
    type: "website",
    locale: "km_KH",
    url: "/",
    siteName: weddingConfig.title,
    title: shareTitle,
    description: shareDescription,
    images: [weddingShareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description: shareDescription,
    images: [weddingShareImage],
  },
  robots: weddingConfig.sample ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#BE8F83",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="km"
      className={`${khmerDisplay.variable} ${khmerSans.variable} ${khmerSerif.variable} ${latinSerif.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
