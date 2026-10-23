import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import {
  Cormorant_Garamond,
  Noto_Sans_Khmer,
  Noto_Serif_Khmer,
} from "next/font/google";
import { weddingConfig } from "@/config/wedding";
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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: `${weddingConfig.couple.groom.nameKh} & ${weddingConfig.couple.bride.nameKh} | ធៀបអញ្ជើញមង្គលការ${weddingConfig.sample ? " (គំរូ)" : ""}`,
  description: `${weddingConfig.title} — ${weddingConfig.dateLabel}។ ${weddingConfig.sample ? "នេះជាធៀបអញ្ជើញគំរូ មិនមែនជាកម្មវិធីពិតទេ។" : weddingConfig.wording.salutation}`,
  applicationName: weddingConfig.title,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: weddingConfig.title,
  },
  openGraph: {
    type: "website",
    locale: "km_KH",
    title: `${weddingConfig.couple.groom.nameKh} & ${weddingConfig.couple.bride.nameKh} · ${weddingConfig.title}`,
    description: weddingConfig.sample
      ? "ធៀបអញ្ជើញអាពាហ៍ពិពាហ៍គំរូ"
      : weddingConfig.wording.salutation,
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
