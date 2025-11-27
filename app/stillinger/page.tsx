/**
 * PUBLIC JOB LISTINGS PAGE
 * Route: bluecrew.no/stillinger
 *
 * Modern, premium design with:
 * - Hero section with integrated search
 * - Advanced filtering with dropdowns
 * - Premium job cards with company logos
 * - Smooth animations and transitions
 */

"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  Search,
  Loader2,
  Filter,
  ArrowRight,
  Anchor,
  Ship,
  Users,
} from "lucide-react";
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
      const json = await response.json();
      const jobsData = json.data || json;
      setJobs(Array.isArray(jobsData) ? jobsData : []);
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

  // Get unique filter values
  const categories = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.category).filter(Boolean))),
    [jobs]
  );
  const fylker = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.fylke).filter(Boolean))),
    [jobs]
  );
  const types = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.job_type).filter(Boolean))),
    [jobs]
  );

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (categoryFilter !== "all" && job.category !== categoryFilter) return false;
      if (fylkeFilter !== "all" && job.fylke !== fylkeFilter) return false;
      if (typeFilter !== "all" && job.job_type !== typeFilter) return false;

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          job.title.toLowerCase().includes(query) ||
          job.company_name?.toLowerCase().includes(query) ||
          job.location?.toLowerCase().includes(query) ||
          job.category?.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [jobs, categoryFilter, fylkeFilter, typeFilter, searchQuery]);

  const hasActiveFilters =
    categoryFilter !== "all" || fylkeFilter !== "all" || typeFilter !== "all";

  const clearAllFilters = () => {
    setCategoryFilter("all");
    setFylkeFilter("all");
    setTypeFilter("all");
  };

  const formatDeadline = (deadline: string | null) => {
    if (!deadline) return null;
    const days = Math.ceil(
      (new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    if (days < 0) return { text: "Utgått", isUrgent: false };
    if (days === 0) return { text: "I dag!", isUrgent: true };
    if (days === 1) return { text: "1 dag igjen", isUrgent: true };
    if (days <= 7) return { text: `${days} dager igjen`, isUrgent: true };
    return { text: `${days} dager igjen`, isUrgent: false };
  };

  const getCompanyInitials = (name: string | null) => {
    if (!name) return "BC";
    const words = name.split(" ");
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <SiteLayout active="stillinger">
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroLabel}>
            <Anchor size={16} />
            Maritime stillinger i Norge
          </div>

          <h1 className={styles.heroTitle}>
            Finn din neste jobb til sjøs
          </h1>

          <p className={styles.heroSubtitle}>
            Utforsk ledige stillinger innen havbruk, offshore og skipsfart.
            Vi kobler deg med de beste arbeidsgiverne i den maritime næringen.
          </p>

          {/* Search Box */}
          <div className={styles.heroSearchBox}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Søk etter stilling, bedrift eller sted..."
              className={styles.heroSearchInput}
            />
            <button className={styles.heroSearchButton}>
              <Search size={18} />
              <span>Søk</span>
            </button>
          </div>

          {/* Stats */}
          <div className={styles.statsBar}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>{jobs.length}</div>
              <div className={styles.statLabel}>Ledige stillinger</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>{categories.length}+</div>
              <div className={styles.statLabel}>Kategorier</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>{fylker.length}</div>
              <div className={styles.statLabel}>Fylker</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.section}>
        <div className={util.container}>
          {/* Filter Section */}
          <div className={styles.filterSection}>
            <div className={styles.filterHeader}>
              <div className={styles.filterTitle}>
                <Filter size={18} />
                Filtrer stillinger
              </div>
              {hasActiveFilters && (
                <button onClick={clearAllFilters} className={styles.clearFilters}>
                  Nullstill filtre
                </button>
              )}
            </div>

            <div className={styles.filterBar}>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Kategori</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="all">Alle kategorier</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Fylke</label>
                <select
                  value={fylkeFilter}
                  onChange={(e) => setFylkeFilter(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="all">Alle fylker</option>
                  {fylker.map((fylke) => (
                    <option key={fylke} value={fylke}>
                      {fylke}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Stillingstype</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="all">Alle typer</option>
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Header */}
          {!loading && (
            <div className={styles.resultsHeader}>
              <p className={styles.resultsCount}>
                Viser{" "}
                <span className={styles.resultsCountNumber}>{filteredJobs.length}</span>{" "}
                {filteredJobs.length === 1 ? "stilling" : "stillinger"}
                {hasActiveFilters && " (filtrert)"}
              </p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className={styles.loadingState}>
              <Loader2 className={styles.loadingSpinner} />
              <p className={styles.loadingText}>Laster stillinger...</p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredJobs.length === 0 && (
            <div className={styles.emptyState}>
              <Ship className={styles.emptyStateIcon} />
              <h3 className={styles.emptyStateTitle}>Ingen stillinger funnet</h3>
              <p className={styles.emptyStateText}>
                {searchQuery || hasActiveFilters
                  ? "Prøv å justere søket eller filtrene dine for å se flere resultater."
                  : "Det er ingen aktive stillinger for øyeblikket. Sjekk tilbake senere!"}
              </p>
              {hasActiveFilters && (
                <button onClick={clearAllFilters} className={styles.emptyStateCta}>
                  Nullstill filtre
                </button>
              )}
              {!hasActiveFilters && (
                <Link href="/jobbsoker/registrer" className={styles.emptyStateCta}>
                  Registrer deg som kandidat
                  <ArrowRight size={16} />
                </Link>
              )}
            </div>
          )}

          {/* Jobs Grid */}
          {!loading && filteredJobs.length > 0 && (
            <div className={styles.jobsGrid}>
              {filteredJobs.map((job) => {
                const deadline = formatDeadline(job.application_deadline);
                return (
                  <Link
                    key={job.id}
                    href={`/stillinger/${job.slug}`}
                    className={styles.jobCard}
                  >
                    <div className={styles.jobCardContent}>
                      {/* Header with Logo */}
                      <div className={styles.jobCardHeader}>
                        <div className={styles.jobCardLogo}>
                          <span className={styles.jobCardLogoText}>
                            {getCompanyInitials(job.company_name)}
                          </span>
                        </div>
                        <div className={styles.jobCardHeaderText}>
                          <h3 className={styles.jobCardTitle}>{job.title}</h3>
                          <p className={styles.jobCardCompany}>
                            {job.company_name || "Bluecrew AS"}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      {job.short_description && (
                        <p className={styles.jobCardDescription}>
                          {job.short_description}
                        </p>
                      )}

                      {/* Tags */}
                      <div className={styles.jobCardTags}>
                        <span
                          className={`${styles.jobBadge} ${
                            job.job_type === "Fast"
                              ? styles.jobBadgeFast
                              : styles.jobBadgeVikariat
                          }`}
                        >
                          {job.job_type}
                        </span>
                        <span className={`${styles.jobBadge} ${styles.jobBadgeCategory}`}>
                          {job.category}
                        </span>
                        {deadline?.isUrgent && (
                          <span className={`${styles.jobBadge} ${styles.jobBadgeUrgent}`}>
                            <Clock size={12} />
                            {deadline.text}
                          </span>
                        )}
                      </div>

                      {/* Footer */}
                      <div className={styles.jobCardFooter}>
                        <div className={styles.jobCardMeta}>
                          <div className={styles.jobMetaItem}>
                            <MapPin className={styles.jobMetaIcon} />
                            {job.kommune}, {job.fylke}
                          </div>
                          {job.application_count > 0 && (
                            <div className={styles.jobMetaItem}>
                              <Users className={styles.jobMetaIcon} />
                              {job.application_count} søkere
                            </div>
                          )}
                        </div>
                        <div className={styles.jobCardArrow}>
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
