import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a demo",
  robots: { index: false, follow: true },
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
