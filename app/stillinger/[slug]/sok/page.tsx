/**
 * JOB APPLICATION FORM
 * Route: bluecrew.no/stillinger/[slug]/sok
 *
 * Clean, focused application with Vipps/BankID verification
 * Design: Bluecrew brand - professional, maritime, trustworthy
 */

"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Upload,
  CheckCircle,
  ArrowLeft,
  Loader2,
  MapPin,
  Building,
  Shield,
  Clock,
  FileText,
  Mail,
} from "lucide-react";
import Link from "next/link";
import SiteLayout from "@/app/components/SiteLayout";
import * as styles from "./page.css";

// Types
type VippsSession = {
  verified: boolean;
  name: string;
  givenName: string;
  familyName: string;
  phone: string;
  email: string;
  birthDate: string;
  verifiedAt: string;
  sub: string;
};

type JobPosting = {
  id: string;
  title: string;
  company_name: string | null;
  location: string;
  fylke: string;
  job_type: string;
  slug: string;
};

export default function JobApplicationPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  // Vipps session
  const [vippsSession, setVippsSession] = useState<VippsSession | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  // Job info
  const [job, setJob] = useState<JobPosting | null>(null);
  const [loadingJob, setLoadingJob] = useState(true);

  // Form state
  const [coverLetter, setCoverLetter] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load job info
  const loadJob = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ADMIN_URL || "https://admincrew.no"}/api/job-postings?status=active`,
        { cache: "no-store" }
      );

      if (!response.ok) throw new Error("Failed to load job");

      const jobs = await response.json();
      const foundJob = jobs.find((j: JobPosting) => j.slug === slug);

      if (!foundJob) {
        router.push("/stillinger");
        return;
      }

      setJob(foundJob);
    } catch (err) {
      console.error("Error loading job:", err);
      router.push("/stillinger");
    } finally {
      setLoadingJob(false);
    }
  };

  // Check existing Vipps session
  const checkVippsSession = async () => {
    try {
      const response = await fetch("/api/vipps/session");
      const data = await response.json();

      if (data.verified && data.session) {
        setVippsSession(data.session);
      }
    } catch (err) {
      console.error("Failed to check Vipps session:", err);
    } finally {
      setCheckingSession(false);
    }
  };

  // Upload file to Supabase Storage
  const uploadFile = async (file: File, type: "cv" | "certificates") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ADMIN_URL || "https://admincrew.no"}/api/candidates/cv`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to upload ${type}`);
    }

    const data = await response.json();
    return data.key; // Returns storage path
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (!vippsSession || !job) {
        throw new Error("Missing required data");
      }

      // Upload CV
      let cvKey = null;
      if (cvFile) {
        cvKey = await uploadFile(cvFile, "cv");
      }

      // Submit application
      const applicationData = {
        job_posting_id: job.id,
        name: vippsSession.name,
        email: vippsSession.email || "",
        phone: vippsSession.phone,
        cover_letter: coverLetter,
        cv_key: cvKey,
        vipps_verified: true,
        vipps_sub: vippsSession.sub,
        vipps_phone: vippsSession.phone,
        vipps_name: vippsSession.name,
        vipps_verified_at: vippsSession.verifiedAt,
        source: "web",
        ip_address: null, // Could add client IP if needed
        user_agent: navigator.userAgent,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ADMIN_URL || "https://admincrew.no"}/api/job-applications`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(applicationData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application");
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting application:", err);
      setError(
        err instanceof Error ? err.message : "Noe gikk galt. Prøv igjen senere."
      );
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    loadJob();
    checkVippsSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // Success screen
  if (submitted) {
    return (
      <SiteLayout active="stillinger">
        <div className={styles.container}>
          <div className={styles.formSection} style={{ marginTop: "120px" }}>
            <div className={styles.successCard}>
              <div className={styles.successIcon}>
                <CheckCircle size={40} />
              </div>
              <h2 className={styles.successTitle}>Søknaden er sendt!</h2>
              <p className={styles.successText}>
                Takk for din søknad til stillingen som {job?.title}.
                Vi gjennomgår søknaden din og tar kontakt innen 2-3 virkedager.
              </p>
              <div className={styles.successActions}>
                <Link href="/stillinger" className={styles.successButtonPrimary}>
                  Se flere stillinger
                </Link>
                <Link href="/" className={styles.successButtonSecondary}>
                  Til forsiden
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SiteLayout>
    );
  }

  // Loading screen
  if (loadingJob || checkingSession) {
    return (
      <SiteLayout active="stillinger">
        <div className={styles.container}>
          <div className={styles.formSection} style={{ marginTop: "120px" }}>
            <div className={styles.formCard}>
              <div className={styles.loadingState}>
                <div className={styles.spinner} />
                <p className={styles.loadingText}>Laster søknadsskjema...</p>
              </div>
            </div>
          </div>
        </div>
      </SiteLayout>
    );
  }

  // Vipps verification step
  if (!vippsSession) {
    return (
      <SiteLayout active="stillinger">
        <div className={styles.container}>
          <section className={styles.heroSection}>
            <div className={styles.heroInner}>
              <Link href={`/stillinger/${slug}`} className={styles.backLink}>
                <ArrowLeft size={18} />
                Tilbake til stillingen
              </Link>
              {job && (
                <>
                  <div className={styles.jobBadge}>
                    <Building size={16} />
                    {job.company_name || "Bluecrew AS"}
                  </div>
                  <h1 className={styles.heroTitle}>Søk på: {job.title}</h1>
                  <div className={styles.heroMeta}>
                    <span className={styles.metaItem}>
                      <MapPin size={18} />
                      {job.location || job.fylke}
                    </span>
                  </div>
                </>
              )}
            </div>
          </section>

          <div className={styles.formSection}>
            <div className={styles.notVerifiedCard}>
              <Shield size={64} style={{ color: "#0ea5e9", marginBottom: "24px" }} />
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0f172a", marginBottom: "12px" }}>
                Verifiser identiteten din
              </h2>
              <p style={{ color: "#64748b", maxWidth: "400px", margin: "0 auto", lineHeight: 1.6 }}>
                For å sikre en trygg søknadsprosess bruker vi Vipps/BankID for identitetsverifisering.
                Dette tar kun 30 sekunder.
              </p>
              <Link
                href={`/api/vipps/start?return=/stillinger/${slug}/sok`}
                className={styles.vippsButton}
              >
                <img src="/icons/vipps-logo.jpeg" alt="Vipps" className={styles.vippsLogo} />
                Verifiser med Vipps
              </Link>
              <div className={styles.trustFooter}>
                <span className={styles.trustItem}>
                  <Shield size={16} className={styles.trustIcon} />
                  BankID-sikkerhet
                </span>
                <span className={styles.trustItem}>
                  <Clock size={16} className={styles.trustIcon} />
                  30 sekunder
                </span>
                <span className={styles.trustItem}>
                  <CheckCircle size={16} className={styles.trustIcon} />
                  Trygg prosess
                </span>
              </div>
            </div>
          </div>
        </div>
      </SiteLayout>
    );
  }

  // Main application form (verified with Vipps)
  return (
    <SiteLayout active="stillinger">
      <div className={styles.container}>
        <section className={styles.heroSection}>
          <div className={styles.heroInner}>
            <Link href={`/stillinger/${slug}`} className={styles.backLink}>
              <ArrowLeft size={18} />
              Tilbake til stillingen
            </Link>
            {job && (
              <>
                <div className={styles.jobBadge}>
                  <Building size={16} />
                  {job.company_name || "Bluecrew AS"}
                </div>
                <h1 className={styles.heroTitle}>Søk på: {job.title}</h1>
                <div className={styles.heroMeta}>
                  <span className={styles.metaItem}>
                    <MapPin size={18} />
                    {job.location || job.fylke}
                  </span>
                </div>
              </>
            )}
          </div>
        </section>

        <div className={styles.formSection}>
          <div className={styles.formCard}>
            {/* Verified banner */}
            <div className={styles.verifiedBanner}>
              <div className={styles.verifiedIcon}>
                <CheckCircle size={24} />
              </div>
              <div className={styles.verifiedContent}>
                <p className={styles.verifiedTitle}>
                  <Shield size={16} />
                  Verifisert med Vipps
                </p>
                <p className={styles.verifiedDetails}>
                  {vippsSession.name} • {vippsSession.phone}
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className={styles.formBody}>
              <h2 className={styles.formTitle}>Fullfør søknaden</h2>
              <p className={styles.formSubtitle}>
                Navn og telefon er hentet fra Vipps. Legg til CV og send inn.
              </p>

              {error && <div className={styles.errorMessage}>{error}</div>}

              <div className={styles.formGrid}>
                {/* CV Upload */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    <FileText size={18} className={styles.labelIcon} />
                    CV (PDF)
                    <span className={styles.required}>*</span>
                  </label>
                  <div className={`${styles.fileUpload} ${cvFile ? styles.fileUploadActive : ""}`}>
                    <Upload size={32} className={styles.fileUploadIcon} />
                    <p className={styles.fileUploadText}>
                      {cvFile ? "Bytt fil" : "Klikk for å velge fil"}
                    </p>
                    <p className={styles.fileUploadHint}>PDF, maks 10 MB</p>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                      className={styles.fileUploadInput}
                    />
                    {cvFile && (
                      <div className={styles.fileName}>
                        <CheckCircle size={18} />
                        {cvFile.name}
                      </div>
                    )}
                  </div>
                </div>

                {/* Email - added since Vipps might not provide it */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    <Mail size={18} className={styles.labelIcon} />
                    E-post
                    <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    value={vippsSession.email || ""}
                    onChange={() => {}}
                    placeholder="din@epost.no"
                    className={styles.input}
                    required
                  />
                </div>

                {/* Cover Letter */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Kort om deg (valgfritt)
                  </label>
                  <textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Skriv gjerne litt om din erfaring og hvorfor du er interessert i stillingen..."
                    className={styles.textarea}
                    rows={4}
                  />
                </div>

                {/* Consent */}
                <div className={styles.consentBox}>
                  <label className={styles.consentLabel}>
                    <input
                      type="checkbox"
                      required
                      className={styles.checkbox}
                    />
                    <span>
                      Jeg samtykker til at Bluecrew AS lagrer og behandler mine
                      personopplysninger for denne søknaden.{" "}
                      <Link href="/personvern" style={{ color: "#0ea5e9" }}>
                        Les personvernerklæringen
                      </Link>
                    </span>
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className={`${styles.submitButton} ${submitting ? styles.submitButtonLoading : ""}`}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} />
                      Sender søknad...
                    </>
                  ) : (
                    "Send søknad"
                  )}
                </button>
              </div>

              {/* Trust indicators */}
              <div className={styles.trustFooter}>
                <span className={styles.trustItem}>
                  <Shield size={16} className={styles.trustIcon} />
                  GDPR-sikret
                </span>
                <span className={styles.trustItem}>
                  <CheckCircle size={16} className={styles.trustIcon} />
                  BankID-verifisert
                </span>
                <span className={styles.trustItem}>
                  <Clock size={16} className={styles.trustIcon} />
                  Svar innen 2-3 dager
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
