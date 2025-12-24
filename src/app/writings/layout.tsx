import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writings",
  description: "Research papers, preprints, and patents by Nikita Polyanskii on blockchain, coding theory, and combinatorics.",
  alternates: {
    canonical: "/writings",
  },
  openGraph: {
    title: "Writings | Nikita Polyanskii",
    description: "Research papers, preprints, and patents by Nikita Polyanskii on blockchain, coding theory, and combinatorics.",
    url: "/writings",
  },
};

export default function PublicationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
