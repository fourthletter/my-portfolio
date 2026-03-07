import type { Metadata } from "next";
import { Barlow_Condensed, Geist_Mono, Source_Sans_3 } from "next/font/google";
import SiteHeader from "./components/site-header";
import "./globals.css";

const bodySans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

const displaySans = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.SITE_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  "http://localhost:3000";

export const metadata: Metadata = {
  title: "Di Luong | Portfolio",
  description:
    "Portfolio of a Senior Program Leader working on AI, digital rights, and global social impact initiatives.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bodySans.variable} ${displaySans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteHeader />
        {children}
        <footer className="mx-auto w-full max-w-6xl border-t border-[#b9c4cc] px-6 py-8 text-sm text-[#4c5a67] sm:px-10">
          <p>© {new Date().getFullYear()} Di Luong. Crafted with Next.js.</p>
        </footer>
      </body>
    </html>
  );
}
