import { Suspense } from "react";
import type { Metadata } from "next";
import SiteLayout from "../../components/SiteLayout";
import { sx } from "../../lib/styles";
import { VippsLoginPage } from "../VippsLogin";

export const dynamic = "force-dynamic"; // Disable all caching

export const metadata: Metadata = {
  title: "Registrer deg som jobbsøker - Bluecrew AS",
  description: "Registrer deg som jobbsøker hos Bluecrew. Få tilgang til maritime jobber i Norge.",
  alternates: {
    canonical: "/jobbsoker/registrer",
  },
};

export default function Page() {
  return (
    <SiteLayout active="jobbsoker">
      <section style={{ ...sx.sectionAlt, paddingTop: 48, paddingBottom: 64 }}>
        <div style={sx.wrapNarrow}>
          <h1 style={{ ...sx.h2, marginBottom: 32, textAlign: "center" }}>
            Registrer deg som jobbsøker
          </h1>
          <Suspense fallback={<div style={sx.formLoading} role="status">Laster inn …</div>}>
            <VippsLoginPage />
          </Suspense>
        </div>
      </section>
    </SiteLayout>
  );
}

