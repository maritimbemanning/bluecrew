/**
 * PUBLIC JOB LISTINGS PAGE
 * Route: bluecrew.no/stillinger
 */

"use client";

import React, { useState, useEffect } from "react";
import { Briefcase, MapPin, Clock, Search, Loader2 } from "lucide-react";
import Link from "next/link";
import SiteLayout from "../components/SiteLayout";
import * as styles from "./Stillinger.css";
import * as util from "../../styles/utils.css";

type JobPosting = {
  id: string;
  title: string;
  company_name: string | null;
  vessel_name: string | null;
  short_description: string | null;
  job_type: string;
  category: string;
  location: string;
  fylke: string;
  kommune: string;
  salary_text: string | null;
  application_deadline: string | null;
  slug: string;
  application_count: number;
};

export default function StillingerPage() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [fylkeFilter, setFylkeFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const loadJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ADMIN_URL || "https://admincrew.no"}/api/job-postings?status=active`,
        { cache: "no-store" }
      );

      if (!response.ok) throw new Error("Failed to fetch jobs");
      const data = await response.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading jobs:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    if (categoryFilter !== "all" && job.category !== categoryFilter)
      return false;
    if (fylkeFilter !== "all" && job.fylke !== fylkeFilter) return false;
    if (typeFilter !== "all" && job.job_type !== typeFilter) return false;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        job.title.toLowerCase().includes(query) ||
        job.company_name?.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Get unique filter values
  const categories = Array.from(new Set(jobs.map((j) => j.category)));
  const fylker = Array.from(new Set(jobs.map((j) => j.fylke)));
  const types = Array.from(new Set(jobs.map((j) => j.job_type)));

  const formatDeadline = (deadline: string | null) => {
    if (!deadline) return null;
    const days = Math.ceil(
      (new Date(deadline).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    );
    if (days < 0) return "Utgått";
    if (days === 0) return "I dag";
    if (days === 1) return "1 dag igjen";
    return `${days} dager igjen`;
  };

  return (
    <SiteLayout active="stillinger">
      <section className={styles.section}>
        <div className={util.container}>
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>Ledige jobber</h1>
            <p className={styles.subtitle}>
              Finn din neste jobb innen havbruk, offshore og skipsfart
            </p>
          </div>

          {/* Filters */}
          <div className={styles.filterBar}>
            <div className={styles.searchBox}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Søk etter stilling, bedrift eller sted..."
                className={styles.searchInput}
              />
            </div>

            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Kategori:</span>
              <button
                onClick={() => setCategoryFilter("all")}
                className={`${styles.filterButton} ${categoryFilter === "all" ? styles.filterButtonActive : ""}`}
              >
                Alle
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`${styles.filterButton} ${categoryFilter === cat ? styles.filterButtonActive : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Fylke:</span>
              <button
                onClick={() => setFylkeFilter("all")}
                className={`${styles.filterButton} ${fylkeFilter === "all" ? styles.filterButtonActive : ""}`}
              >
                Alle
              </button>
              {fylker.map((fylke) => (
                <button
                  key={fylke}
                  onClick={() => setFylkeFilter(fylke)}
                  className={`${styles.filterButton} ${fylkeFilter === fylke ? styles.filterButtonActive : ""}`}
                >
                  {fylke}
                </button>
              ))}
            </div>

            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Type:</span>
              <button
                onClick={() => setTypeFilter("all")}
                className={`${styles.filterButton} ${typeFilter === "all" ? styles.filterButtonActive : ""}`}
              >
                Alle
              </button>
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`${styles.filterButton} ${typeFilter === type ? styles.filterButtonActive : ""}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className={styles.loadingState}>
              <Loader2 className={styles.loadingSpinner} />
              <p>Laster stillinger...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredJobs.length === 0 && (
            <div className={styles.emptyState}>
              <Briefcase className={styles.emptyStateIcon} />
              <h3 className={styles.emptyStateTitle}>
                Ingen stillinger funnet
              </h3>
              <p className={styles.emptyStateText}>
                {searchQuery ||
                categoryFilter !== "all" ||
                fylkeFilter !== "all"
                  ? "Prøv å justere søket eller filtrene dine"
                  : "Det er ingen aktive stillinger for øyeblikket. Sjekk tilbake senere!"}
              </p>
            </div>
          )}

          {/* Jobs Grid */}
          {!loading && filteredJobs.length > 0 && (
            <div className={styles.jobsGrid}>
              {filteredJobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/stillinger/${job.slug}`}
                  className={styles.jobCard}
                >
                  <div className={styles.jobCardHeader}>
                    <div>
                      <h3 className={styles.jobCardTitle}>{job.title}</h3>
                      <p className={styles.jobCardCompany}>
                        {job.company_name || "Bluecrew AS"}
                      </p>
                    </div>
                    <div
                      className={`${styles.jobBadge} ${
                        job.job_type === "Fast"
                          ? styles.jobBadgeFast
                          : styles.jobBadgeVikariat
                      }`}
                    >
                      {job.job_type}
                    </div>
                  </div>

                  {job.short_description && (
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "#64748b",
                        marginTop: "0.5rem",
                      }}
                    >
                      {job.short_description}
                    </p>
                  )}

                  <div className={styles.jobCardMeta}>
                    <div className={styles.jobMetaItem}>
                      <MapPin className={styles.jobMetaIcon} />
                      {job.kommune}, {job.fylke}
                    </div>
                    {job.salary_text && (
                      <div className={styles.jobMetaItem}>
                        <Briefcase className={styles.jobMetaIcon} />
                        {job.salary_text}
                      </div>
                    )}
                    {job.application_deadline && (
                      <div className={styles.jobMetaItem}>
                        <Clock className={styles.jobMetaIcon} />
                        {formatDeadline(job.application_deadline)}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
