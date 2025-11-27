/**
 * NOT FOUND PAGE for job details
 */

import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import SiteLayout from "@/app/components/SiteLayout";
import * as styles from "./StillingDetail.css";

export default function NotFound() {
  return (
    <SiteLayout active="stillinger">
      <div className={styles.errorState}>
        <AlertCircle className={styles.errorIcon} />
        <h1 className={styles.errorTitle}>Stilling ikke funnet</h1>
        <p className={styles.errorText}>
          Denne stillingen eksisterer ikke eller er ikke lenger aktiv.
        </p>
        <Link href="/stillinger" className={styles.primaryButton}>
          <ArrowLeft size={18} />
          Tilbake til stillinger
        </Link>
      </div>
    </SiteLayout>
  );
}
