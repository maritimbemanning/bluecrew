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
    default: "Bluecrew AS – Bemanning til sjøs",
    template: "%s | Bluecrew AS",
  },
  description:
    "Bluecrew AS leverer fleksibel bemanning til havbruk, fiskeri og servicefartøy med fokus på kvalitet, sertifiseringer og rask respons.",
  keywords: [
    "Bluecrew",
    "bemanning",
    "maritim bemanning",
    "havbruk",
    "fiskeri",
    "servicefartøy",
    "rekruttering",
    "Harstad",
  ],
  openGraph: {
    title: "Bluecrew AS – Bemanning til sjøs",
    description:
      "Rett mannskap til havbruk, fiskeri og servicefartøy. Bluecrew AS leverer sertifisert bemanning når du trenger den.",
    url: "https://bluecrew.no",
    siteName: "Bluecrew AS",
    locale: "nb_NO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bluecrew AS – Bemanning til sjøs",
    description:
      "Maritim bemanning levert av Bluecrew AS. Sertifisert kompetanse og rask respons fra Harstad.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
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
