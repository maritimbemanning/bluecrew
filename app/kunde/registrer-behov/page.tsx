import { Suspense } from "react";
import SiteLayout from "../../components/SiteLayout";
import base from "../../styles/base.module.css";
import formStyles from "../../styles/forms.module.css";
import ClientContent from "../ClientContent";

export default function Page() {
  return (
    <SiteLayout active="kunde">
      <section className={base.sectionAlt}>
        <div className={base.wrapNarrow}>
          <Suspense fallback={<div className={formStyles.formLoading} role="status">Laster inn skjema …</div>}>
            <ClientContent />
          </Suspense>
        </div>
      </section>
    </SiteLayout>
  );
}

