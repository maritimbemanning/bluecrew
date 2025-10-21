import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "./components/CookieBanner";
import PlausibleLoader from "./components/PlausibleLoader";

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
    "fiskeri",
    "servicefartøy",
    "vikarbyrå",
    "rekruttering",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://bluecrew.no"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no">
      <body>
        {children}
        <CookieBanner />
        <PlausibleLoader />
      </body>
    </html>
  );
}
