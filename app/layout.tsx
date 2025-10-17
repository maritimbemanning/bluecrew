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
  title: {
    default: "Bluecrew AS – Maritim bemanning for havbruk, fiskeri og servicefartøy",
    template: "%s | Bluecrew AS",
  },
  description:
    "Bluecrew AS leverer erfarent maritimt personell til havbruk, fiskeri og servicefartøy. Rask mobilisering, tydelig oppfølging og sertifiserte kandidater.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Bluecrew AS – Maritim bemanning",
    description:
      "Maritim bemanning levert av sjøfolk. Bluecrew AS mobiliserer kvalifiserte kandidater til havbruk, fiskeri og servicefartøy.",
    url: "https://bluecrew.no",
    siteName: "Bluecrew AS",
    locale: "no_NO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bluecrew AS – Maritim bemanning",
    description:
      "Vi leverer sertifisert maritim bemanning til havbruk, fiskeri og servicefartøy. Rask respons og tett oppfølging.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
