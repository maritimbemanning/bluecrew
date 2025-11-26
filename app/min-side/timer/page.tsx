"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SiteLayout from "@/app/components/SiteLayout";
import {
  ArrowLeft,
  Loader2,
  Clock,
  Plus,
  Calendar,
  Ship,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Send,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";

type TimeEntry = {
  id: string;
  date: string;
  assignment_id: string | null;
  assignment_title: string | null;
  vessel_name: string | null;
  hours: number;
  description: string;
  status: "draft" | "submitted" | "approved" | "rejected";
  created_at: string;
};

type WeekSummary = {
  weekNumber: number;
  year: number;
  startDate: string;
  endDate: string;
  totalHours: number;
  entries: TimeEntry[];
  status: "draft" | "submitted" | "approved" | "rejected" | "mixed";
};

const STATUS_CONFIG = {
  draft: { label: "Kladd", color: "#64748b", bg: "#f1f5f9" },
  submitted: { label: "Sendt", color: "#0369a1", bg: "#e0f2fe" },
  approved: { label: "Godkjent", color: "#16a34a", bg: "#dcfce7" },
  rejected: { label: "Avvist", color: "#dc2626", bg: "#fef2f2" },
  mixed: { label: "Blandet", color: "#d97706", bg: "#fef3c7" },
};

const DAYS_NO = ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"];

function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

function getWeekDates(date: Date): Date[] {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(date);
  monday.setDate(diff);

  const dates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(d);
  }
  return dates;
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export default function TimerPage() {
  const { user, isLoaded } = useUser();
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // New entry form state
  const [newEntry, setNewEntry] = useState({
    hours: "",
    description: "",
  });

  const weekDates = getWeekDates(currentWeek);
  const weekNumber = getWeekNumber(currentWeek);

  useEffect(() => {
    if (user?.id) {
      loadEntries();
    }
  }, [user?.id, currentWeek]);

  async function loadEntries() {
    try {
      const startDate = formatDate(weekDates[0]);
      const endDate = formatDate(weekDates[6]);

      const res = await fetch(`/api/user/time-entries?start=${startDate}&end=${endDate}`);
      if (res.ok) {
        const data = await res.json();
        setEntries(data.entries || []);
      }
    } catch (err) {
      console.error("Failed to load time entries:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddEntry() {
    if (!selectedDate || !newEntry.hours) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/user/time-entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedDate,
          hours: parseFloat(newEntry.hours),
          description: newEntry.description,
        }),
      });

      if (res.ok) {
        await loadEntries();
        setShowAddModal(false);
        setNewEntry({ hours: "", description: "" });
        setSelectedDate(null);
      }
    } catch (err) {
      console.error("Failed to add entry:", err);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSubmitWeek() {
    const draftEntries = entries.filter(e => e.status === "draft");
    if (draftEntries.length === 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/user/time-entries/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entryIds: draftEntries.map(e => e.id),
        }),
      });

      if (res.ok) {
        await loadEntries();
      }
    } catch (err) {
      console.error("Failed to submit entries:", err);
    } finally {
      setSubmitting(false);
    }
  }

  function prevWeek() {
    const prev = new Date(currentWeek);
    prev.setDate(prev.getDate() - 7);
    setCurrentWeek(prev);
  }

  function nextWeek() {
    const next = new Date(currentWeek);
    next.setDate(next.getDate() + 7);
    setCurrentWeek(next);
  }

  function getEntryForDate(date: string): TimeEntry | undefined {
    return entries.find(e => e.date === date);
  }

  const totalHours = entries.reduce((sum, e) => sum + e.hours, 0);
  const hasDrafts = entries.some(e => e.status === "draft");

  if (!isLoaded) {
    return (
      <SiteLayout active="">
        <div style={styles.loading}>
          <Loader2 size={32} style={{ animation: "spin 1s linear infinite" }} />
        </div>
      </SiteLayout>
    );
  }

  if (!user) {
    return (
      <SiteLayout active="">
        <section style={styles.container}>
          <p>Du må være innlogget for å registrere timer.</p>
          <Link href="/logg-inn?redirect_url=/min-side/timer" style={styles.link}>
            Logg inn
          </Link>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout active="">
      <section style={styles.container}>
        <Link href="/min-side" style={styles.backLink}>
          <ArrowLeft size={18} />
          Tilbake til Min side
        </Link>

        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <Clock size={28} color="#0369a1" />
            <div>
              <h1 style={styles.title}>Timeregistrering</h1>
              <p style={styles.subtitle}>Uke {weekNumber}</p>
            </div>
          </div>
        </div>

        {/* Week navigation */}
        <div style={styles.weekNav}>
          <button onClick={prevWeek} style={styles.weekNavBtn}>
            <ChevronLeft size={20} />
          </button>
          <span style={styles.weekRange}>
            {weekDates[0].toLocaleDateString("nb-NO", { day: "numeric", month: "short" })} - {weekDates[6].toLocaleDateString("nb-NO", { day: "numeric", month: "short", year: "numeric" })}
          </span>
          <button onClick={nextWeek} style={styles.weekNavBtn}>
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Week grid */}
        {loading ? (
          <div style={styles.loading}>
            <Loader2 size={24} style={{ animation: "spin 1s linear infinite" }} />
          </div>
        ) : (
          <div style={styles.weekGrid}>
            {weekDates.map((date, idx) => {
              const dateStr = formatDate(date);
              const entry = getEntryForDate(dateStr);
              const isToday = formatDate(new Date()) === dateStr;
              const isWeekend = idx >= 5;

              return (
                <div
                  key={dateStr}
                  style={{
                    ...styles.dayCard,
                    ...(isToday ? styles.dayCardToday : {}),
                    ...(isWeekend ? styles.dayCardWeekend : {}),
                  }}
                >
                  <div style={styles.dayHeader}>
                    <span style={styles.dayName}>{DAYS_NO[idx]}</span>
                    <span style={styles.dayDate}>{date.getDate()}.</span>
                  </div>

                  {entry ? (
                    <div style={styles.entryDisplay}>
                      <div style={styles.entryHours}>{entry.hours}t</div>
                      {entry.description && (
                        <div style={styles.entryDesc}>{entry.description}</div>
                      )}
                      <div style={{
                        ...styles.entryStatus,
                        color: STATUS_CONFIG[entry.status].color,
                        background: STATUS_CONFIG[entry.status].bg,
                      }}>
                        {STATUS_CONFIG[entry.status].label}
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedDate(dateStr);
                        setShowAddModal(true);
                      }}
                      style={styles.addBtn}
                    >
                      <Plus size={20} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Summary */}
        <div style={styles.summary}>
          <div style={styles.summaryItem}>
            <span style={styles.summaryLabel}>Totalt denne uken</span>
            <span style={styles.summaryValue}>{totalHours} timer</span>
          </div>
          {hasDrafts && (
            <button
              onClick={handleSubmitWeek}
              disabled={submitting}
              style={styles.submitBtn}
            >
              {submitting ? (
                <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
              ) : (
                <Send size={18} />
              )}
              Send inn timer
            </button>
          )}
        </div>

        {/* Info */}
        <div style={styles.infoBox}>
          <h3 style={styles.infoTitle}>Om timeregistrering</h3>
          <ul style={styles.infoList}>
            <li>Registrer timer daglig for nøyaktig oversikt</li>
            <li>Send inn uken for godkjenning av Bluecrew</li>
            <li>Godkjente timer danner grunnlag for lønn</li>
          </ul>
        </div>

        {/* Add modal */}
        {showAddModal && (
          <div style={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>Registrer timer</h2>
                <button onClick={() => setShowAddModal(false)} style={styles.modalClose}>
                  <X size={20} />
                </button>
              </div>
              <div style={styles.modalContent}>
                <div style={styles.modalDate}>
                  <Calendar size={16} />
                  {selectedDate && new Date(selectedDate).toLocaleDateString("nb-NO", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Antall timer</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="24"
                    value={newEntry.hours}
                    onChange={e => setNewEntry({ ...newEntry, hours: e.target.value })}
                    placeholder="F.eks. 7.5"
                    style={styles.input}
                  />
                </div>

                <div style={styles.field}>
                  <label style={styles.label}>Beskrivelse (valgfritt)</label>
                  <textarea
                    value={newEntry.description}
                    onChange={e => setNewEntry({ ...newEntry, description: e.target.value })}
                    placeholder="Hva jobbet du med?"
                    style={styles.textarea}
                    rows={3}
                  />
                </div>

                <button
                  onClick={handleAddEntry}
                  disabled={submitting || !newEntry.hours}
                  style={{
                    ...styles.saveBtn,
                    opacity: submitting || !newEntry.hours ? 0.5 : 1,
                  }}
                >
                  {submitting ? (
                    <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
                  ) : (
                    <Check size={18} />
                  )}
                  Lagre
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </SiteLayout>
  );
}

const styles: Record<string, React.CSSProperties> = {
  loading: {
    minHeight: "40vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    padding: "40px 20px 60px",
    maxWidth: 700,
    margin: "0 auto",
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    color: "#64748b",
    fontSize: 14,
    textDecoration: "none",
    marginBottom: 24,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: 700,
    margin: 0,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    margin: "4px 0 0",
  },
  weekNav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    marginBottom: 24,
  },
  weekNavBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    border: "1px solid #e2e8f0",
    background: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#64748b",
  },
  weekRange: {
    fontSize: 15,
    fontWeight: 600,
    color: "#334155",
  },
  weekGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 8,
    marginBottom: 24,
  },
  dayCard: {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: 12,
    minHeight: 100,
    display: "flex",
    flexDirection: "column",
  },
  dayCardToday: {
    borderColor: "#0369a1",
    borderWidth: 2,
  },
  dayCardWeekend: {
    background: "#f8fafc",
  },
  dayHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  dayName: {
    fontSize: 12,
    fontWeight: 600,
    color: "#64748b",
  },
  dayDate: {
    fontSize: 14,
    fontWeight: 700,
    color: "#0f172a",
  },
  entryDisplay: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  entryHours: {
    fontSize: 20,
    fontWeight: 700,
    color: "#0369a1",
  },
  entryDesc: {
    fontSize: 11,
    color: "#64748b",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  entryStatus: {
    fontSize: 10,
    fontWeight: 600,
    padding: "2px 6px",
    borderRadius: 4,
    marginTop: "auto",
    textAlign: "center",
  },
  addBtn: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f8fafc",
    border: "2px dashed #e2e8f0",
    borderRadius: 8,
    cursor: "pointer",
    color: "#94a3b8",
  },
  summary: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    background: "#f0f9ff",
    borderRadius: 14,
    marginBottom: 24,
  },
  summaryItem: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  summaryLabel: {
    fontSize: 13,
    color: "#64748b",
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 700,
    color: "#0369a1",
  },
  submitBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 20px",
    background: "#0369a1",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
  infoBox: {
    background: "#f8fafc",
    borderRadius: 12,
    padding: 20,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: 600,
    margin: "0 0 12px",
    color: "#334155",
  },
  infoList: {
    margin: 0,
    paddingLeft: 20,
    fontSize: 14,
    lineHeight: 1.8,
    color: "#64748b",
  },
  link: {
    color: "#0369a1",
    textDecoration: "underline",
  },
  // Modal
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    borderRadius: 20,
    width: "100%",
    maxWidth: 400,
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
    borderBottom: "1px solid #e2e8f0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 700,
    margin: 0,
  },
  modalClose: {
    width: 36,
    height: 36,
    borderRadius: 8,
    border: "none",
    background: "#f1f5f9",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    padding: 24,
  },
  modalDate: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 16px",
    background: "#f0f9ff",
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 14,
    fontWeight: 500,
    color: "#0369a1",
    textTransform: "capitalize",
  },
  field: {
    marginBottom: 16,
  },
  label: {
    display: "block",
    fontSize: 14,
    fontWeight: 600,
    color: "#334155",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid #e2e8f0",
    borderRadius: 10,
    fontSize: 16,
    outline: "none",
  },
  textarea: {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid #e2e8f0",
    borderRadius: 10,
    fontSize: 15,
    outline: "none",
    resize: "none",
    fontFamily: "inherit",
  },
  saveBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "100%",
    padding: "14px 20px",
    background: "#0369a1",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    marginTop: 8,
  },
};
