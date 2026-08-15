import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Vivacity early beta access. Email the team for an invite, or enter your beta code to unlock Google and email sign in for the workspace.",
  alternates: { canonical: "https://tryvivacity.com/signin" },
  robots: { index: true, follow: true },
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
