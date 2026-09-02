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
  metadataBase: new URL("https://sanmigueldaily.com"),
  title: "San Miguel DAILY | El periódico local de estándar internacional",
  description: "Noticias locales, política, economía, cultura y turismo de San Miguel de Allende.",
  verification: {
    google: "b8a27710ae7063f3",
  },
  openGraph: {
    title: "San Miguel DAILY | El periódico local de estándar internacional",
    description: "Noticias locales, política, economía, cultura y turismo de San Miguel de Allende.",
    url: "https://sanmigueldaily.com",
    siteName: "San Miguel DAILY",
    images: [
      {
        url: "https://sanmigueldaily.com/images/news_patrimony_law.jpg",
        width: 1200,
        height: 630,
        alt: "San Miguel DAILY",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "San Miguel DAILY",
    description: "Noticias locales, política, economía, cultura y turismo de San Miguel de Allende.",
    images: ["https://sanmigueldaily.com/images/news_patrimony_law.jpg"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  alternates: {
    canonical: "https://sanmigueldaily.com",
    languages: {
      "es": "https://sanmigueldaily.com",
      "en": "https://sanmigueldaily.com?lang=en",
      "es-MX": "https://sanmigueldaily.com",
      "en-US": "https://sanmigueldaily.com?lang=en",
      "x-default": "https://sanmigueldaily.com",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
