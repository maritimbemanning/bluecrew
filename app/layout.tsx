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
  metadataBase: new URL("https://www.bluecrew.no"),
  title: {
    default: "Bluecrew AS | Maritim bemanning til sjøs",
    template: "%s | Bluecrew AS",
  },
  description:
    "Bluecrew AS leverer erfarne maritime ressurser til havbruk, fiskeri og servicefartøy over hele kysten.",
  icons: {
    icon: "/bluecrew-favicon.svg",
    shortcut: "/bluecrew-favicon.svg",
  },
  openGraph: {
    title: "Bluecrew AS | Maritim bemanning til sjøs",
    description:
      "Rekruttering og bemanning av sertifiserte sjøfolk til havbruk, fiskeri og servicefartøy.",
    url: "https://www.bluecrew.no",
    siteName: "Bluecrew AS",
    locale: "nb_NO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
