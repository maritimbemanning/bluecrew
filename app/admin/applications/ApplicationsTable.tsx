"use client";

import { useState, useMemo } from "react";
import { Download, Search, Filter, Calendar, User, Mail, Phone, FileText } from "lucide-react";

type Application = {
  id: string;
  created_at: string;
  job_posting_id: string;
  name: string;
  email: string;
  phone: string;
  job_title: string;
  job_company: string | null;
  job_location: string;
  cover_letter: string | null;
  cv_path: string | null;
  cvUrl?: string | null;
  vipps_verified: boolean;
  vipps_sub: string | null;
};

export default function ApplicationsTable({ applications }: { applications: Application[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterJob, setFilterJob] = useState<string>("all");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // Get unique job titles for filter
  const jobTitles = useMemo(() => {
    const titles = new Set(applications.map((app) => app.job_title));
    return Array.from(titles).sort();
  }, [applications]);

  // Filter applications
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.job_title.toLowerCase().includes(searchQuery.toLowerCase());

      // Job filter
      const matchesJob = filterJob === "all" || app.job_title === filterJob;

      return matchesSearch && matchesJob;
    });
  }, [applications, searchQuery, filterJob]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("no-NO", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div>
      {/* Filters */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "1.5rem",
          marginBottom: "1.5rem",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          {/* Search */}
          <div style={{ position: "relative" }}>
            <Search
              size={20}
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#64748b",
              }}
            />
            <input
              type="text"
              placeholder="Søk etter navn, e-post eller stilling..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem 1rem 0.75rem 2.75rem",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                fontSize: "0.875rem",
                outline: "none",
              }}
            />
          </div>

          {/* Job Filter */}
          <div style={{ position: "relative", minWidth: "200px" }}>
            <Filter
              size={16}
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#64748b",
              }}
            />
            <select
              value={filterJob}
              onChange={(e) => setFilterJob(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem 1rem 0.75rem 2.5rem",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                fontSize: "0.875rem",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="all">Alle stillinger ({applications.length})</option>
              {jobTitles.map((title) => (
                <option key={title} value={title}>
                  {title} ({applications.filter((app) => app.job_title === title).length})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Result count */}
        <div style={{ marginTop: "1rem", color: "#64748b", fontSize: "0.875rem" }}>
          Viser {filteredApplications.length} av {applications.length} søknader
        </div>
      </div>

      {/* Applications List */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        {filteredApplications.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "#64748b" }}>
            <p style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>Ingen søknader funnet</p>
            <p style={{ fontSize: "0.875rem" }}>Prøv å justere søket eller filteret</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ backgroundColor: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                <tr>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600", fontSize: "0.875rem", color: "#475569" }}>
                    <Calendar size={16} style={{ display: "inline", marginRight: "0.5rem", verticalAlign: "middle" }} />
                    Dato
                  </th>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600", fontSize: "0.875rem", color: "#475569" }}>
                    <User size={16} style={{ display: "inline", marginRight: "0.5rem", verticalAlign: "middle" }} />
                    Søker
                  </th>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600", fontSize: "0.875rem", color: "#475569" }}>
                    <FileText size={16} style={{ display: "inline", marginRight: "0.5rem", verticalAlign: "middle" }} />
                    Stilling
                  </th>
                  <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600", fontSize: "0.875rem", color: "#475569" }}>
                    <Mail size={16} style={{ display: "inline", marginRight: "0.5rem", verticalAlign: "middle" }} />
                    Kontakt
                  </th>
                  <th style={{ padding: "1rem", textAlign: "center", fontWeight: "600", fontSize: "0.875rem", color: "#475569" }}>
                    CV
                  </th>
                  <th style={{ padding: "1rem", textAlign: "center", fontWeight: "600", fontSize: "0.875rem", color: "#475569" }}>
                    Detaljer
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app, index) => (
                  <>
                    <tr
                      key={app.id}
                      style={{
                        borderBottom: "1px solid #e2e8f0",
                        backgroundColor: index % 2 === 0 ? "white" : "#f8fafc",
                      }}
                    >
                      {/* Date */}
                      <td style={{ padding: "1rem", fontSize: "0.875rem", color: "#475569", whiteSpace: "nowrap" }}>
                        {formatDate(app.created_at)}
                      </td>

                      {/* Applicant */}
                      <td style={{ padding: "1rem" }}>
                        <div style={{ fontWeight: "600", color: "#0f172a", marginBottom: "0.25rem" }}>{app.name}</div>
                        {app.vipps_verified && (
                          <span
                            style={{
                              display: "inline-block",
                              padding: "0.125rem 0.5rem",
                              backgroundColor: "#dcfce7",
                              color: "#166534",
                              fontSize: "0.75rem",
                              borderRadius: "4px",
                              fontWeight: "500",
                            }}
                          >
                            ✓ Vipps-verifisert
                          </span>
                        )}
                      </td>

                      {/* Job */}
                      <td style={{ padding: "1rem" }}>
                        <div style={{ fontWeight: "600", color: "#0f172a", marginBottom: "0.25rem" }}>{app.job_title}</div>
                        <div style={{ fontSize: "0.875rem", color: "#64748b" }}>
                          {app.job_company || "Bluecrew AS"} • {app.job_location}
                        </div>
                      </td>

                      {/* Contact */}
                      <td style={{ padding: "1rem", fontSize: "0.875rem", color: "#475569" }}>
                        <div style={{ marginBottom: "0.25rem" }}>
                          <Mail size={14} style={{ display: "inline", marginRight: "0.25rem", verticalAlign: "middle" }} />
                          <a href={`mailto:${app.email}`} style={{ color: "#0ea5e9", textDecoration: "none" }}>
                            {app.email}
                          </a>
                        </div>
                        <div>
                          <Phone size={14} style={{ display: "inline", marginRight: "0.25rem", verticalAlign: "middle" }} />
                          <a href={`tel:${app.phone}`} style={{ color: "#0ea5e9", textDecoration: "none" }}>
                            {app.phone}
                          </a>
                        </div>
                      </td>

                      {/* CV Download */}
                      <td style={{ padding: "1rem", textAlign: "center" }}>
                        {app.cvUrl ? (
                          <a
                            href={app.cvUrl}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              padding: "0.5rem 1rem",
                              backgroundColor: "#0ea5e9",
                              color: "white",
                              borderRadius: "6px",
                              textDecoration: "none",
                              fontSize: "0.875rem",
                              fontWeight: "500",
                            }}
                          >
                            <Download size={16} />
                            Last ned
                          </a>
                        ) : (
                          <span style={{ color: "#94a3b8", fontSize: "0.875rem" }}>Ingen CV</span>
                        )}
                      </td>

                      {/* Expand Details */}
                      <td style={{ padding: "1rem", textAlign: "center" }}>
                        <button
                          onClick={() => setExpandedRow(expandedRow === app.id ? null : app.id)}
                          style={{
                            padding: "0.5rem 1rem",
                            backgroundColor: expandedRow === app.id ? "#f1f5f9" : "transparent",
                            border: "1px solid #e2e8f0",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "0.875rem",
                            fontWeight: "500",
                            color: "#475569",
                          }}
                        >
                          {expandedRow === app.id ? "Skjul" : "Vis mer"}
                        </button>
                      </td>
                    </tr>

                    {/* Expanded Row */}
                    {expandedRow === app.id && (
                      <tr key={`${app.id}-expanded`}>
                        <td colSpan={6} style={{ padding: "1.5rem", backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                          <div style={{ maxWidth: "800px" }}>
                            <h3 style={{ fontSize: "1rem", fontWeight: "600", color: "#0f172a", marginBottom: "1rem" }}>
                              Søknadstekst
                            </h3>
                            {app.cover_letter ? (
                              <p
                                style={{
                                  color: "#475569",
                                  lineHeight: "1.6",
                                  whiteSpace: "pre-wrap",
                                  backgroundColor: "white",
                                  padding: "1rem",
                                  borderRadius: "6px",
                                  border: "1px solid #e2e8f0",
                                }}
                              >
                                {app.cover_letter}
                              </p>
                            ) : (
                              <p style={{ color: "#94a3b8", fontStyle: "italic" }}>Ingen søknadstekst lagt ved</p>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
