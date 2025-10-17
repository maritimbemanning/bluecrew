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
    default: "Bluecrew AS – Maritim bemanning fra sjøfolk",
    template: "%s | Bluecrew AS",
  },
  description:
    "Bluecrew AS bemanner havbruk, fiskeri og servicefartøy med sertifiserte sjøfolk, klare for oppdrag langs norskekysten.",
  applicationName: "Bluecrew AS",
  keywords: ["maritim bemanning", "havbruk", "fiskeri", "servicefartøy", "Bluecrew"],
  openGraph: {
    title: "Bluecrew AS – Maritim bemanning fra sjøfolk",
    description:
      "Bluecrew AS bemanner havbruk, fiskeri og servicefartøy med sertifiserte sjøfolk, klare for oppdrag langs norskekysten.",
    url: "https://bluecrew.no",
    siteName: "Bluecrew AS",
    locale: "nb_NO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bluecrew AS – Maritim bemanning fra sjøfolk",
    description:
      "Bemanning og rekruttering av sertifiserte sjøfolk til havbruk, fiskeri og servicefartøy.",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: ["/icon.svg"],
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
