import type { Metadata } from "next";
import "./globals.css";
import { UiProvider } from "@/components/UiProvider";

export const metadata: Metadata = {
  title: "San Miguel Daily",
  description: "Periodismo local, estándar internacional. San Miguel de Allende.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&display=swap"
        />
      </head>
      <body className="bg-paper text-ink font-serif antialiased">
        <UiProvider>{children}</UiProvider>
      </body>
    </html>
  );
}
