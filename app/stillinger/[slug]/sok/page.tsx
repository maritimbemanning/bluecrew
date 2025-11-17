/**
 * JOB APPLICATION FORM
 * Route: bluecrew.no/stillinger/[slug]/sok
 *
 * Step 1: Vipps verification (using existing VippsLogin component)
 * Step 2: Application form with CV upload
 * Step 3: Submit application
 */

"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Briefcase,
  Upload,
  FileText,
  CheckCircle,
  ArrowLeft,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import VippsLogin from "@/app/jobbsoker/VippsLogin";

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
  const [certsFile, setCertsFile] = useState<File | null>(null);
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

      // Upload files
      let cvKey = null;
      let certsKey = null;

      if (cvFile) {
        cvKey = await uploadFile(cvFile, "cv");
      }

      if (certsFile) {
        certsKey = await uploadFile(certsFile, "certificates");
      }

      // Submit application
      const applicationData = {
        job_posting_id: job.id,
        name: vippsSession.name,
        email: vippsSession.email || "", // TODO: Get from Vipps if available
        phone: vippsSession.phone,
        cover_letter: coverLetter,
        cv_key: cvKey,
        certificates_key: certsKey,
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
        err instanceof Error
          ? err.message
          : "Noe gikk galt. Prøv igjen senere."
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-12 max-w-2xl w-full text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
            <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>

          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Søknad sendt!
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 mb-2">
            Takk for din søknad på stillingen:
          </p>
          <p className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-6">
            {job?.title}
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-8">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Vi har mottatt søknaden din og vil gjennomgå den så snart som
              mulig. Du vil motta en e-post når vi har tatt en avgjørelse.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/stillinger"
              className="px-6 py-3 border border-slate-300 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium"
            >
              Se flere stillinger
            </Link>
            <Link
              href="/"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              Tilbake til forsiden
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Loading screen
  if (loadingJob || checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="inline-block w-12 h-12 animate-spin text-blue-600 mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Laster...</p>
        </div>
      </div>
    );
  }

  // Vipps verification step
  if (!vippsSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <Link
            href={`/stillinger/${slug}`}
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Tilbake til stillingen
          </Link>

          {job && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Briefcase className="h-8 w-8 text-blue-600" />
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {job.title}
                  </h2>
                  {job.company_name && (
                    <p className="text-slate-600 dark:text-slate-400">
                      {job.company_name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <VippsLogin onVerified={(session) => setVippsSession(session)} />
        </div>
      </div>
    );
  }

  // Application form
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href={`/stillinger/${slug}`}
          className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Tilbake til stillingen
        </Link>

        {/* Job Info */}
        {job && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Søk på stilling
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  {job.title} hos {job.company_name || "Bluecrew"}
                </p>
              </div>
            </div>

            {/* Verified Badge */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-900 dark:text-green-100">
                    Identitet verifisert med Vipps
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {vippsSession.name} • {vippsSession.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Application Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8 space-y-6">
            {/* Cover Letter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Søknadstekst (valgfritt)
              </label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows={8}
                placeholder="Fortell oss hvorfor du er den rette kandidaten for denne stillingen..."
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* CV Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Last opp CV *
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                  required
                  className="w-full px-4 py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer hover:file:bg-blue-700 cursor-pointer"
                />
                {cvFile && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    <span>{cvFile.name}</span>
                  </div>
                )}
              </div>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                PDF, DOC eller DOCX (maks 10MB)
              </p>
            </div>

            {/* Certificates Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Last opp sertifikater (valgfritt)
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.zip"
                  onChange={(e) => setCertsFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer hover:file:bg-blue-700 cursor-pointer"
                />
                {certsFile && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    <span>{certsFile.name}</span>
                  </div>
                )}
              </div>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                PDF eller ZIP-fil med alle relevante sertifikater
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700 dark:text-red-300">
                    {error}
                  </p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4">
              <Link
                href={`/stillinger/${slug}`}
                className="flex-1 px-6 py-4 border border-slate-300 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium text-center"
              >
                Avbryt
              </Link>
              <button
                type="submit"
                disabled={submitting || !cvFile}
                className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sender søknad...
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5" />
                    Send søknad
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
