import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nikitapolyanskii.com"),
  title: {
    default: "Nikita Polyanskii",
    template: "%s | Nikita Polyanskii",
  },
  description: "Research Scientist and Engineer working on blockchain consensus, coding theory, and combinatorics.",
  keywords: ["Nikita Polyanskii", "research", "blockchain", "consensus", "coding theory", "combinatorics", "IOTA"],
  authors: [{ name: "Nikita Polyanskii" }],
  creator: "Nikita Polyanskii",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nikitapolyanskii.com",
    siteName: "Nikita Polyanskii",
    title: "Nikita Polyanskii",
    description: "Research Scientist and Engineer working on blockchain consensus, coding theory, and combinatorics.",
    images: [
      {
        url: "/photos/NPolianskii_small.jpg",
        width: 224,
        height: 224,
        alt: "Nikita Polyanskii",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Nikita Polyanskii",
    description: "Research Scientist and Engineer working on blockchain consensus, coding theory, and combinatorics.",
    images: ["/photos/NPolianskii_small.jpg"],
  },
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <Header />
          <main className="flex-grow pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
