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
  title: "San Miguel DAILY | El periódico local de estándar internacional",
  description: "Noticias locales, política, economía, cultura y turismo de San Miguel de Allende.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
