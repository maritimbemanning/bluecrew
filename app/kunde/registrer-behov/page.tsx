// app/kunde/registrer-behov/page.tsx
import { Suspense } from "react";            // 👈 MÅ være med
import SiteLayout from "../../components/SiteLayout";
import ClientContent from "../ClientContent"; // sti kan være annerledes hos deg
import { sx } from "../../lib/styles";        // eller riktig relativ sti

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


