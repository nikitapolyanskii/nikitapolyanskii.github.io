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
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={csp} />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
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
