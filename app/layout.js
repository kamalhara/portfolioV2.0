import "./globals.css";
import {
  Geist,
  Geist_Mono,
  Instrument_Serif,
  Inter,
  JetBrains_Mono,
} from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: "400",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kamalhara.me";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kamalveer Singh — Software Engineer",
    template: "%s — Kamalveer Singh",
  },
  description:
    "Full-stack and mobile software engineer building focused products with React, Next.js, React Native, and Node.js.",
  authors: [{ name: "Kamalveer Singh" }],
  creator: "Kamalveer Singh",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "Kamalveer Singh — Software Engineer",
    description:
      "Selected web and mobile work by full-stack engineer Kamalveer Singh.",
    url: "/",
    siteName: "Kamalveer Singh",
  },
  twitter: {
    card: "summary",
    title: "Kamalveer Singh — Software Engineer",
    description:
      "Selected web and mobile work by full-stack engineer Kamalveer Singh.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`dark ${inter.variable} ${instrument.variable} ${jetbrains.variable} ${geist.variable} ${geistMono.variable} overflow-hidden`}
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
