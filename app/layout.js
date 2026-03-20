import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: " Kamalveer Singh Portfolio",
  description:
    "Welcome to my portfolio! I'm Kamalveer Singh, a passionate software engineer specializing in web development. Explore my projects, experience, and skills as I strive to create innovative solutions and contribute to the tech community.",
};
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap');
        </style>
      </head>
      <body
        className="min-h-full flex flex-col space-grotesk bg-[#0C1117] text-gray-300"
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
