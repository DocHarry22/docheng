import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://docheng.com";

export const metadata: Metadata = {
  title: {
    default: "DoCHEng — Driven by Curiosity",
    template: "%s | DoCHEng",
  },
  description:
    "The intelligence ecosystem for learning, work, and technical growth. AI-powered tools engineered for the next generation of thinkers and builders.",
  keywords: [
    "DoCHEng",
    "AI tools",
    "engineering",
    "education technology",
    "productivity",
    "document intelligence",
    "career tools",
    "student tools",
    "knowledge management",
    "AI workspace",
  ],
  authors: [{ name: "DoCHEng" }],
  creator: "DoCHEng",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "DoCHEng",
    title: "DoCHEng — Driven by Curiosity",
    description:
      "The intelligence ecosystem for learning, work, and technical growth. AI-powered tools engineered for the next generation.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DoCHEng — Driven by Curiosity",
    description:
      "The intelligence ecosystem for learning, work, and technical growth.",
    creator: "@docheng",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DoCHEng",
    url: siteUrl,
    logo: `${siteUrl}/icon`,
    description:
      "The intelligence ecosystem for learning, work, and technical growth.",
    sameAs: [] as string[],
    foundingDate: "2024",
    knowsAbout: [
      "Artificial Intelligence",
      "Education Technology",
      "Document Intelligence",
      "Career Tools",
      "Engineering Software",
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
