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

const siteUrl = "https://tryvivacity.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Vivacity — Video infrastructure for LLMs",
  description:
    "Near-real-time video infrastructure for LLMs. Turn prompts, documents, and AI answers into mathematically exact explainer videos.",
  applicationName: "Vivacity",
  keywords: [
    "Vivacity",
    "AI video",
    "LLM",
    "explainer video",
    "Manim",
    "EdTech",
  ],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Vivacity",
    title: "Vivacity — LLMs answer in text. We make it move.",
    description:
      "Near-real-time video infrastructure for LLMs. Mathematically exact explainer videos. API-first.",
    images: [
      {
        url: "/images/og-image.jpg?v=2",
        width: 1200,
        height: 630,
        alt: "vivacity — LLMs answer in text. We make it move. tryvivacity.com",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivacity — LLMs answer in text. We make it move.",
    description:
      "Near-real-time video infrastructure for LLMs. Mathematically exact explainer videos.",
    images: ["/images/og-image.jpg?v=2"],
  },
  alternates: {
    canonical: siteUrl,
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
