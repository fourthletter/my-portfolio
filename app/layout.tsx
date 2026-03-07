import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteHeader from "./components/site-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
  title: "Diluong | Portfolio",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteHeader />
        {children}
        <footer className="mx-auto w-full max-w-6xl border-t border-stone-200 px-6 py-8 text-sm text-stone-500 sm:px-10">
          <p>© {new Date().getFullYear()} Diluong. Crafted with Next.js.</p>
        </footer>
      </body>
    </html>
  );
}
