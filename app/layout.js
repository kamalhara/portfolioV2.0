import "./globals.css";

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
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <a
          href="#main"
          className="fixed top-3 left-3 z-100 -translate-y-24 bg-ink px-4 py-3 text-sm font-semibold text-white focus:translate-y-0"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
