import "./globals.css";
import WelcomeLoader from "./components/WelcomeLoader";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";

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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://kamalveer-portfolio.aurora-lamp-4868.chatgpt.site";

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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kamalveer Singh",
    url: siteUrl,
    jobTitle: "Software Engineer",
    sameAs: [
      "https://github.com/kamalhara",
      "https://www.linkedin.com/in/kamalveer-singh-bb7250335/",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "React Native",
      "Node.js",
      "Mobile application development",
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <body suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{const r=document.documentElement;const t=localStorage.getItem("kamalveer-portfolio-theme-v2")||"light";r.dataset.theme=t;r.classList.toggle("dark",t==="dark");if(sessionStorage.getItem("kamalveer-portfolio-welcome-session-v1")==="seen")r.dataset.welcomeSeen="true"}catch(e){}',
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <a
          href="#main"
          className="fixed top-3 left-3 z-100 -translate-y-24 bg-ink-text px-4 py-3 text-sm font-semibold text-white focus:translate-y-0"
        >
          Skip to content
        </a>
        <WelcomeLoader />
        {children}
      </body>
    </html>
  );
}
