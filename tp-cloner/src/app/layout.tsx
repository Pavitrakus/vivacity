import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Vivacity — Video infrastructure for LLMs",
  description:
    "Near-real-time video infrastructure for LLMs. Turn prompts, documents, and AI answers into mathematically exact explainer videos.",
  openGraph: {
    title: "Vivacity — Video infrastructure for LLMs",
    description:
      "Prompts, documents, and AI answers become mathematically exact explainer videos. Near real-time. API-first. Low cost.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
