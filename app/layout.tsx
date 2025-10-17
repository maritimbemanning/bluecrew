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

const title = "Bluecrew AS – Maritim bemanning";
const description =
  "Bluecrew AS leverer erfarne sjøfolk og komplette bemanningsløsninger til havbruk, fiskeri og servicefartøy.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s | Bluecrew AS",
  },
  description,
  keywords: [
    "bemanning",
    "maritim bemanning",
    "havbruk",
    "servicefartøy",
    "fiskeri",
    "Bluecrew",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Bluecrew AS",
    locale: "nb_NO",
    url: "https://bluecrew.no",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
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
