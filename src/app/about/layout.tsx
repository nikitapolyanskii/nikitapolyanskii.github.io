import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bio",
  description: "Academic background and career journey of Nikita Polyanskii.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Bio | Nikita Polyanskii",
    description: "Academic background and career journey of Nikita Polyanskii.",
    url: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
