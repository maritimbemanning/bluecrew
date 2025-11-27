/**
 * PUBLIC JOB LISTINGS PAGE
 * Route: bluecrew.no/stillinger
 *
 * Modern, premium design using inline styles (consistent with rest of site)
 */

"use client";

import React, { useState, useEffect, useMemo, CSSProperties } from "react";
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

// Inline styles following the sx pattern from app/lib/styles.ts
const styles: Record<string, CSSProperties> = {
  hero: {
    background: "linear-gradient(135deg, #0a1628 0%, #1e3a5f 50%, #0d2847 100%)",
    position: "relative",
    overflow: "hidden",
    padding: "clamp(60px, 10vw, 100px) 0",
  },
  heroInner: {
    position: "relative",
    zIndex: 1,
    maxWidth: 900,
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    padding: "0 clamp(18px, 6vw, 26px)",
  },
  heroLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 16px",
    background: "rgba(30, 58, 95, 0.8)",
    borderRadius: 999,
    fontSize: 14,
    fontWeight: 600,
    color: "#93c5fd",
    marginBottom: 24,
    border: "1px solid rgba(147, 197, 253, 0.2)",
  },
  heroTitle: {
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    fontWeight: 800,
    color: "#ffffff",
    marginBottom: 16,
    lineHeight: 1.1,
    letterSpacing: "-0.03em",
  },
  heroSubtitle: {
    fontSize: "clamp(1rem, 2vw, 1.25rem)",
    color: "rgba(226, 232, 240, 0.85)",
    maxWidth: 600,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 32,
    lineHeight: 1.6,
  },
  heroSearchBox: {
    display: "flex",
    maxWidth: 640,
    marginLeft: "auto",
    marginRight: "auto",
    background: "rgba(255,255,255,0.95)",
    borderRadius: 16,
    boxShadow: "0 20px 60px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.2)",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.2)",
  },
  heroSearchInput: {
    flex: 1,
    padding: "18px 24px",
    border: "none",
    fontSize: 16,
    color: "#0f172a",
    background: "transparent",
    outline: "none",
  },
  heroSearchButton: {
    padding: "18px 32px",
    background: "#0369a1",
    color: "#fff",
    border: "none",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  statsBar: {
    display: "flex",
    justifyContent: "center",
    gap: "clamp(24px, 5vw, 60px)",
    marginTop: 32,
    paddingTop: 24,
    borderTop: "1px solid rgba(255,255,255,0.1)",
  },
  statItem: {
    textAlign: "center",
  },
  statValue: {
    fontSize: "clamp(1.5rem, 3vw, 2rem)",
    fontWeight: 800,
    color: "#fff",
    lineHeight: 1.2,
  },
  statLabel: {
    fontSize: 13,
    color: "rgba(226, 232, 240, 0.7)",
    marginTop: 4,
  },
  section: {
    padding: "32px 0",
    background: "#f8fafc",
    minHeight: "60vh",
  },
  container: {
    maxWidth: 1100,
    marginLeft: "auto",
    marginRight: "auto",
    padding: "0 clamp(18px, 6vw, 26px)",
  },
  filterSection: {
    background: "#fff",
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    border: "1px solid #e2e8f0",
  },
  filterHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    flexWrap: "wrap",
    gap: 12,
  },
  filterTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: "#0f172a",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  clearFilters: {
    fontSize: 14,
    color: "#0369a1",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontWeight: 500,
    padding: "4px 8px",
    borderRadius: 8,
  },
  filterBar: {
    display: "flex",
    flexWrap: "wrap",
    gap: 16,
    alignItems: "flex-start",
  },
  filterGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    minWidth: 160,
    flex: "1 1 160px",
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  filterSelect: {
    padding: "10px 36px 10px 14px",
    borderRadius: 8,
    border: "1px solid #e2e8f0",
    background: "#fff",
    fontSize: 15,
    color: "#0f172a",
    cursor: "pointer",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
  },
  resultsHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
    flexWrap: "wrap",
    gap: 12,
  },
  resultsCount: {
    fontSize: 15,
    color: "#64748b",
  },
  resultsCountNumber: {
    fontWeight: 700,
    color: "#0f172a",
  },
  jobsGrid: {
    display: "grid",
    gap: 24,
    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
  },
  jobCard: {
    background: "#ffffff",
    borderRadius: 16,
    border: "1px solid #e2e8f0",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    cursor: "pointer",
    textDecoration: "none",
    color: "inherit",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    transition: "transform 200ms ease, box-shadow 200ms ease",
  },
  jobCardContent: {
    padding: 24,
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  jobCardHeader: {
    display: "flex",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 16,
  },
  jobCardLogo: {
    width: 56,
    height: 56,
    borderRadius: 12,
    background: "linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxShadow: "0 2px 8px rgba(3, 105, 161, 0.2)",
  },
  jobCardLogoText: {
    fontSize: 20,
    fontWeight: 700,
    color: "#fff",
  },
  jobCardHeaderText: {
    flex: 1,
    minWidth: 0,
  },
  jobCardTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: 4,
    lineHeight: 1.3,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  jobCardCompany: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: 500,
  },
  jobCardDescription: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 1.6,
    marginBottom: 16,
    flex: 1,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  jobCardTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  jobBadge: {
    padding: "5px 12px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
    whiteSpace: "nowrap",
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
  },
  jobBadgeVikariat: {
    background: "#fef3c7",
    color: "#92400e",
  },
  jobBadgeFast: {
    background: "#dcfce7",
    color: "#166534",
  },
  jobBadgeCategory: {
    background: "#f0f9ff",
    color: "#0369a1",
  },
  jobBadgeUrgent: {
    background: "#fef2f2",
    color: "#dc2626",
    fontWeight: 700,
  },
  jobCardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    paddingTop: 16,
    borderTop: "1px solid #f1f5f9",
  },
  jobCardMeta: {
    display: "flex",
    flexWrap: "wrap",
    gap: 16,
  },
  jobMetaItem: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 13,
    color: "#64748b",
  },
  jobMetaIcon: {
    width: 14,
    height: 14,
    color: "#94a3b8",
  },
  jobCardArrow: {
    width: 32,
    height: 32,
    borderRadius: 8,
    background: "#f8fafc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#64748b",
    flexShrink: 0,
  },
  emptyState: {
    textAlign: "center",
    padding: "clamp(40px, 8vw, 80px)",
    background: "#fff",
    borderRadius: 16,
    border: "1px solid #e2e8f0",
  },
  emptyStateIcon: {
    width: 80,
    height: 80,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 24,
    color: "#cbd5e1",
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: 12,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#64748b",
    maxWidth: 400,
    marginLeft: "auto",
    marginRight: "auto",
  },
  emptyStateCta: {
    marginTop: 24,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 24px",
    background: "#0369a1",
    color: "#fff",
    borderRadius: 10,
    fontWeight: 600,
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
  },
  loadingState: {
    textAlign: "center",
    padding: "clamp(60px, 10vw, 100px)",
  },
  loadingSpinner: {
    width: 48,
    height: 48,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 16,
    animation: "spin 1s linear infinite",
    color: "#0369a1",
  },
  loadingText: {
    color: "#64748b",
    fontSize: 15,
  },
};

export default function StillingerPage() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [fylkeFilter, setFylkeFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
      {/* Keyframe animation for spinner */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <div style={styles.heroLabel}>
            <Anchor size={16} />
            Maritime stillinger i Norge
          </div>

          <h1 style={styles.heroTitle}>
            Finn din neste jobb til sjøs
          </h1>

          <p style={styles.heroSubtitle}>
            Utforsk ledige stillinger innen havbruk, offshore og skipsfart.
            Vi kobler deg med de beste arbeidsgiverne i den maritime næringen.
          </p>

          {/* Search Box */}
          <div style={styles.heroSearchBox}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Søk etter stilling, bedrift eller sted..."
              style={styles.heroSearchInput}
            />
            <button style={styles.heroSearchButton}>
              <Search size={18} />
              <span>Søk</span>
            </button>
          </div>

          {/* Stats */}
          <div style={styles.statsBar}>
            <div style={styles.statItem}>
              <div style={styles.statValue}>{jobs.length}</div>
              <div style={styles.statLabel}>Ledige stillinger</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statValue}>{categories.length}+</div>
              <div style={styles.statLabel}>Kategorier</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statValue}>{fylker.length}</div>
              <div style={styles.statLabel}>Fylker</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section style={styles.section}>
        <div style={styles.container}>
          {/* Filter Section */}
          <div style={styles.filterSection}>
            <div style={styles.filterHeader}>
              <div style={styles.filterTitle}>
                <Filter size={18} />
                Filtrer stillinger
              </div>
              {hasActiveFilters && (
                <button onClick={clearAllFilters} style={styles.clearFilters}>
                  Nullstill filtre
                </button>
              )}
            </div>

            <div style={styles.filterBar}>
              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Kategori</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  style={styles.filterSelect}
                >
                  <option value="all">Alle kategorier</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Fylke</label>
                <select
                  value={fylkeFilter}
                  onChange={(e) => setFylkeFilter(e.target.value)}
                  style={styles.filterSelect}
                >
                  <option value="all">Alle fylker</option>
                  {fylker.map((fylke) => (
                    <option key={fylke} value={fylke}>
                      {fylke}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.filterGroup}>
                <label style={styles.filterLabel}>Stillingstype</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  style={styles.filterSelect}
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
            <div style={styles.resultsHeader}>
              <p style={styles.resultsCount}>
                Viser{" "}
                <span style={styles.resultsCountNumber}>{filteredJobs.length}</span>{" "}
                {filteredJobs.length === 1 ? "stilling" : "stillinger"}
                {hasActiveFilters && " (filtrert)"}
              </p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div style={styles.loadingState}>
              <Loader2 style={styles.loadingSpinner} />
              <p style={styles.loadingText}>Laster stillinger...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredJobs.length === 0 && (
            <div style={styles.emptyState}>
              <Ship style={styles.emptyStateIcon} />
              <h3 style={styles.emptyStateTitle}>Ingen stillinger funnet</h3>
              <p style={styles.emptyStateText}>
                {searchQuery || hasActiveFilters
                  ? "Prøv å justere søket eller filtrene dine for å se flere resultater."
                  : "Det er ingen aktive stillinger for øyeblikket. Sjekk tilbake senere!"}
              </p>
              {hasActiveFilters && (
                <button onClick={clearAllFilters} style={styles.emptyStateCta}>
                  Nullstill filtre
                </button>
              )}
              {!hasActiveFilters && (
                <Link href="/jobbsoker/registrer" style={styles.emptyStateCta}>
                  Registrer deg som kandidat
                  <ArrowRight size={16} />
                </Link>
              )}
            </div>
          )}

          {/* Jobs Grid */}
          {!loading && filteredJobs.length > 0 && (
            <div style={styles.jobsGrid}>
              {filteredJobs.map((job) => {
                const deadline = formatDeadline(job.application_deadline);
                const isHovered = hoveredCard === job.id;
                return (
                  <Link
                    key={job.id}
                    href={`/stillinger/${job.slug}`}
                    style={{
                      ...styles.jobCard,
                      transform: isHovered ? "translateY(-2px)" : undefined,
                      boxShadow: isHovered ? "0 12px 24px rgba(0,0,0,0.08)" : undefined,
                    }}
                    onMouseEnter={() => setHoveredCard(job.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div style={styles.jobCardContent}>
                      {/* Header with Logo */}
                      <div style={styles.jobCardHeader}>
                        <div style={styles.jobCardLogo}>
                          <span style={styles.jobCardLogoText}>
                            {getCompanyInitials(job.company_name)}
                          </span>
                        </div>
                        <div style={styles.jobCardHeaderText}>
                          <h3 style={styles.jobCardTitle}>{job.title}</h3>
                          <p style={styles.jobCardCompany}>
                            {job.company_name || "Bluecrew AS"}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      {job.short_description && (
                        <p style={styles.jobCardDescription}>
                          {job.short_description}
                        </p>
                      )}

                      {/* Tags */}
                      <div style={styles.jobCardTags}>
                        <span
                          style={{
                            ...styles.jobBadge,
                            ...(job.job_type === "Fast"
                              ? styles.jobBadgeFast
                              : styles.jobBadgeVikariat),
                          }}
                        >
                          {job.job_type}
                        </span>
                        <span style={{ ...styles.jobBadge, ...styles.jobBadgeCategory }}>
                          {job.category}
                        </span>
                        {deadline?.isUrgent && (
                          <span style={{ ...styles.jobBadge, ...styles.jobBadgeUrgent }}>
                            <Clock size={12} />
                            {deadline.text}
                          </span>
                        )}
                      </div>

                      {/* Footer */}
                      <div style={styles.jobCardFooter}>
                        <div style={styles.jobCardMeta}>
                          <div style={styles.jobMetaItem}>
                            <MapPin style={styles.jobMetaIcon} />
                            {job.kommune}, {job.fylke}
                          </div>
                          {job.application_count > 0 && (
                            <div style={styles.jobMetaItem}>
                              <Users style={styles.jobMetaIcon} />
                              {job.application_count} søkere
                            </div>
                          )}
                        </div>
                        <div
                          style={{
                            ...styles.jobCardArrow,
                            background: isHovered ? "#0369a1" : "#f8fafc",
                            color: isHovered ? "#fff" : "#64748b",
                          }}
                        >
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
