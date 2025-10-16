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
    default: "Bluecrew – Bemanning til sjøs",
    template: "%s | Bluecrew",
  },
  description:
    "Bluecrew leverer maritim bemanning til havbruk, fiskeri og servicefartøy. Rett kompetanse, på rett sted, til rett tid.",
  keywords: [
    "Bluecrew",
    "bemanning",
    "maritim bemanning",
    "havbruk",
    "fiskeri",
    "servicefartøy",
    "rekruttering",
  ],
  openGraph: {
    title: "Bluecrew – Bemanning til sjøs",
    description:
      "Bluecrew bemanner havbruk, fiskeri og servicefartøy med sjøfolk som kjenner skiftene og kravene.",
    url: "https://bluecrew.no",
    siteName: "Bluecrew",
    locale: "nb_NO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bluecrew – Bemanning til sjøs",
    description:
      "Maritim bemanning levert av Bluecrew. Sertifisert kompetanse med praktisk erfaring fra sjøen.",
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
