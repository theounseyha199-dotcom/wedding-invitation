import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import {
  Cormorant_Garamond,
  Noto_Sans_Khmer,
  Noto_Serif_Khmer,
} from "next/font/google";
import {
  weddingConfig,
  weddingSeo,
  weddingShareImage,
  weddingSiteUrl,
} from "@/config/wedding";
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

export const metadata: Metadata = {
  metadataBase: new URL(weddingSiteUrl),
  title: weddingSeo.title,
  description: weddingSeo.description,
  applicationName: weddingConfig.title,
  alternates: { canonical: weddingSiteUrl },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: weddingConfig.title,
  },
  openGraph: {
    type: "website",
    locale: "km_KH",
    url: weddingSiteUrl,
    siteName: weddingConfig.title,
    title: weddingSeo.title,
    description: weddingSeo.description,
    images: [weddingShareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: weddingSeo.title,
    description: weddingSeo.description,
    images: [weddingShareImage],
  },
  robots: {
    index: weddingSeo.indexHomepage,
    follow: true,
    googleBot: {
      index: weddingSeo.indexHomepage,
      follow: true,
      "max-image-preview": "large",
    },
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
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
