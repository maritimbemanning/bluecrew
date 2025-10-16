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
  metadataBase: new URL("https://bluecrew.no"),
  title: {
    default: "Bluecrew AS – Maritim bemanning og rekruttering",
    template: "%s | Bluecrew AS",
  },
  description:
    "Bluecrew AS leverer maritim bemanning til havbruk, fiskeri og servicefartøy – bemannet av sjøfolk, levert når du trenger det.",
  keywords: [
    "bemanning",
    "maritim",
    "havbruk",
    "fiskeri",
    "servicefartøy",
    "rekruttering",
  ],
  openGraph: {
    title: "Bluecrew AS – Maritim bemanning og rekruttering",
    description:
      "Maritim bemanning til havbruk, fiskeri og servicefartøy. Bluecrew AS leverer sertifisert personell når du trenger det.",
    url: "https://bluecrew.no",
    siteName: "Bluecrew AS",
    locale: "nb_NO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bluecrew AS – Maritim bemanning",
    description:
      "Fleksibel bemanning til havbruk, fiskeri og servicefartøy levert av Bluecrew AS.",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
