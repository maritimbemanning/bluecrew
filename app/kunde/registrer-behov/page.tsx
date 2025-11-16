// app/kunde/registrer-behov/page.tsx
import { Suspense } from "react";
import type { Metadata } from "next";
import SiteLayout from "../../components/SiteLayout";
import ClientContent from "../ClientContent";
import { sx } from "../../lib/styles";

export const metadata: Metadata = {
  title: "Registrer bemanningsbehov - Bluecrew AS",
  description: "Registrer ditt bemanningsbehov hos Bluecrew. Vi finner kvalifisert maritimt mannskap til din bedrift.",
  alternates: {
    canonical: "/kunde/registrer-behov",
  },
};

export default function Page() {
  return (
    <SiteLayout>
      <section>
        <div className="container">
          <Suspense fallback={<div style={sx.formLoading} role="status">Laster inn skjema …</div>}>
            <ClientContent />
          </Suspense>
        </div>
      </section>
    </SiteLayout>
  );
}


