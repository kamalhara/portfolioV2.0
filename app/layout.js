import { Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import GridBackground from "./components/GridBackground";

/* Space Grotesk was previously pulled in with a render-blocking
   @import inside an inline <style> in <head>, which defeated the
   whole point of the next/font setup sitting next to it. It also
   made the font swap late — and a swap mid-flight would reflow
   the hero name during the intro morph.

   Geist Sans was being downloaded and never used: body
   font-family was overridden to Space Grotesk. Dropped. */
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata = {
  title: "Kamalveer Singh — Full-stack & mobile developer",
  description:
    "Kamalveer Singh is a full-stack and mobile developer building web and mobile software with React, Next.js, React Native and Node.js. Selected work, experience and skills.",
};

/* Note: data-scroll-behavior is deliberately omitted. Next 16 no
   longer forces scroll-behavior:auto during route transitions, so
   without this attribute navigations jump instead of gliding —
   which is what we want. In-page anchor scrolling is handled
   explicitly in Navbar. */
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable} h-full`}>
      <body className="bg-ink text-fg flex min-h-full flex-col antialiased">
        <a
          href="#main"
          className="bg-accent text-ink focus:ring-accent sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <GridBackground />
        {children}
      </body>
    </html>
  );
}
