"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SiteLayout from "@/app/components/SiteLayout";
import {
  ArrowLeft,
  Loader2,
  Calendar,
  MapPin,
  Clock,
  Ship,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  CheckCircle,
  AlertCircle,
  User,
  Phone,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";

type AssignmentStatus = "upcoming" | "active" | "completed" | "cancelled";

type Assignment = {
  id: string;
  title: string;
  vessel_name: string;
  company: string;
  location: string;
  start_date: string;
  end_date: string;
  status: AssignmentStatus;
  role: string;
  contact_name?: string;
  contact_phone?: string;
  notes?: string;
};

const STATUS_CONFIG: Record<AssignmentStatus, { label: string; color: string; bg: string }> = {
  upcoming: { label: "Kommende", color: "#0369a1", bg: "#e0f2fe" },
  active: { label: "Aktiv", color: "#16a34a", bg: "#dcfce7" },
  completed: { label: "Fullført", color: "#64748b", bg: "#f1f5f9" },
  cancelled: { label: "Kansellert", color: "#dc2626", bg: "#fef2f2" },
};

const MONTHS_NO = [
  "Januar", "Februar", "Mars", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Desember"
];

const DAYS_NO = ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"];

function formatDateRange(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const sDay = s.getDate();
  const eDay = e.getDate();
  const sMonth = MONTHS_NO[s.getMonth()];
  const eMonth = MONTHS_NO[e.getMonth()];

  if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
    return `${sDay}. - ${eDay}. ${sMonth}`;
  }
  return `${sDay}. ${sMonth} - ${eDay}. ${eMonth}`;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Convert to Monday = 0
}

function isDateInRange(date: Date, start: string, end: string): boolean {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const s = new Date(start);
  const e = new Date(end);
  s.setHours(0, 0, 0, 0);
  e.setHours(23, 59, 59, 999);
  return d >= s && d <= e;
}

function CalendarView({
  assignments,
  onSelectDate
}: {
  assignments: Assignment[];
  onSelectDate: (date: Date) => void;
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = new Date();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getAssignmentsForDate = (day: number) => {
    const date = new Date(year, month, day);
    return assignments.filter(a =>
      (a.status === "upcoming" || a.status === "active") &&
      isDateInRange(date, a.start_date, a.end_date)
    );
  };

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div style={styles.calendar}>
      <div style={styles.calendarHeader}>
        <button onClick={prevMonth} style={styles.calendarNav}>
          <ChevronLeft size={20} />
        </button>
        <span style={styles.calendarTitle}>
          {MONTHS_NO[month]} {year}
        </span>
        <button onClick={nextMonth} style={styles.calendarNav}>
          <ChevronRight size={20} />
        </button>
      </div>

      <div style={styles.calendarGrid}>
        {DAYS_NO.map(day => (
          <div key={day} style={styles.calendarDayHeader}>{day}</div>
        ))}

        {days.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} style={styles.calendarDayEmpty} />;
          }

          const dayAssignments = getAssignmentsForDate(day);
          const isToday =
            today.getDate() === day &&
            today.getMonth() === month &&
            today.getFullYear() === year;

          return (
            <button
              key={day}
              onClick={() => onSelectDate(new Date(year, month, day))}
              style={{
                ...styles.calendarDay,
                ...(isToday ? styles.calendarDayToday : {}),
                ...(dayAssignments.length > 0 ? styles.calendarDayHasEvent : {}),
              }}
            >
              <span>{day}</span>
              {dayAssignments.length > 0 && (
                <div style={styles.calendarDayDots}>
                  {dayAssignments.slice(0, 3).map((a, i) => (
                    <div
                      key={i}
                      style={{
                        ...styles.calendarDot,
                        background: STATUS_CONFIG[a.status].color,
                      }}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AssignmentCard({ assignment }: { assignment: Assignment }) {
  const [expanded, setExpanded] = useState(false);
  const status = STATUS_CONFIG[assignment.status];

  return (
    <div style={styles.assignmentCard}>
      <div style={styles.assignmentHeader} onClick={() => setExpanded(!expanded)}>
        <div style={styles.assignmentMain}>
          <div style={{ ...styles.statusBadge, color: status.color, background: status.bg }}>
            {assignment.status === "active" && <CheckCircle size={12} />}
            {assignment.status === "cancelled" && <AlertCircle size={12} />}
            {status.label}
          </div>
          <h3 style={styles.assignmentTitle}>{assignment.title}</h3>
          <div style={styles.assignmentMeta}>
            <span style={styles.metaItem}>
              <Ship size={14} />
              {assignment.vessel_name}
            </span>
            <span style={styles.metaItem}>
              <MapPin size={14} />
              {assignment.location}
            </span>
          </div>
        </div>
        <div style={styles.assignmentDates}>
          <Calendar size={16} color="#64748b" />
          <span>{formatDateRange(assignment.start_date, assignment.end_date)}</span>
        </div>
      </div>

      {expanded && (
        <div style={styles.assignmentDetails}>
          <div style={styles.detailRow}>
            <Briefcase size={16} color="#64748b" />
            <span><strong>Rolle:</strong> {assignment.role}</span>
          </div>
          <div style={styles.detailRow}>
            <Ship size={16} color="#64748b" />
            <span><strong>Rederi:</strong> {assignment.company}</span>
          </div>
          {assignment.contact_name && (
            <div style={styles.detailRow}>
              <User size={16} color="#64748b" />
              <span><strong>Kontakt:</strong> {assignment.contact_name}</span>
            </div>
          )}
          {assignment.contact_phone && (
            <div style={styles.detailRow}>
              <Phone size={16} color="#64748b" />
              <a href={`tel:${assignment.contact_phone}`} style={styles.phoneLink}>
                {assignment.contact_phone}
              </a>
            </div>
          )}
          {assignment.notes && (
            <div style={styles.notes}>
              <strong>Notater:</strong>
              <p>{assignment.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function OppdragPage() {
  const { user, isLoaded } = useUser();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "calendar">("list");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    if (user?.id) {
      loadAssignments();
    }
  }, [user?.id]);

  async function loadAssignments() {
    try {
      const res = await fetch("/api/user/assignments");
      if (res.ok) {
        const data = await res.json();
        setAssignments(data.assignments || []);
      }
    } catch (err) {
      console.error("Failed to load assignments:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setView("list");
  };

  // Filter assignments
  const upcomingAssignments = assignments.filter(a => a.status === "upcoming" || a.status === "active");
  const pastAssignments = assignments.filter(a => a.status === "completed" || a.status === "cancelled");

  // Filter by selected date if any
  const filteredAssignments = selectedDate
    ? assignments.filter(a => isDateInRange(selectedDate, a.start_date, a.end_date))
    : null;

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
          <p>Du må være innlogget for å se dine oppdrag.</p>
          <Link href="/logg-inn?redirect_url=/min-side/oppdrag" style={styles.link}>
            Logg inn
          </Link>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout active="">
      <section style={styles.container}>
        {/* Header */}
        <Link href="/min-side" style={styles.backLink}>
          <ArrowLeft size={18} />
          Tilbake til Min side
        </Link>

        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <Calendar size={28} color="#0369a1" />
            <div>
              <h1 style={styles.title}>Mine oppdrag</h1>
              <p style={styles.subtitle}>
                {upcomingAssignments.length} aktive/kommende oppdrag
              </p>
            </div>
          </div>

          <div style={styles.viewToggle}>
            <button
              onClick={() => { setView("list"); setSelectedDate(null); }}
              style={{
                ...styles.viewBtn,
                ...(view === "list" ? styles.viewBtnActive : {}),
              }}
            >
              Liste
            </button>
            <button
              onClick={() => setView("calendar")}
              style={{
                ...styles.viewBtn,
                ...(view === "calendar" ? styles.viewBtnActive : {}),
              }}
            >
              Kalender
            </button>
          </div>
        </div>

        {/* Selected date filter */}
        {selectedDate && (
          <div style={styles.dateFilter}>
            <span>
              Viser oppdrag for {selectedDate.getDate()}. {MONTHS_NO[selectedDate.getMonth()]}
            </span>
            <button onClick={() => setSelectedDate(null)} style={styles.clearFilter}>
              Vis alle
            </button>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div style={styles.loading}>
            <Loader2 size={24} style={{ animation: "spin 1s linear infinite" }} />
            <p style={{ margin: "12px 0 0", color: "#64748b" }}>Laster oppdrag...</p>
          </div>
        ) : view === "calendar" ? (
          <CalendarView assignments={assignments} onSelectDate={handleSelectDate} />
        ) : assignments.length === 0 ? (
          <div style={styles.empty}>
            <Ship size={48} color="#cbd5e1" />
            <h3 style={styles.emptyTitle}>Ingen oppdrag ennå</h3>
            <p style={styles.emptyText}>
              Når du blir tildelt oppdrag vil de vises her med all relevant informasjon.
            </p>
          </div>
        ) : filteredAssignments ? (
          filteredAssignments.length === 0 ? (
            <div style={styles.empty}>
              <Calendar size={48} color="#cbd5e1" />
              <h3 style={styles.emptyTitle}>Ingen oppdrag denne dagen</h3>
              <button onClick={() => setSelectedDate(null)} style={styles.clearFilterBtn}>
                Vis alle oppdrag
              </button>
            </div>
          ) : (
            <div style={styles.list}>
              {filteredAssignments.map((a) => (
                <AssignmentCard key={a.id} assignment={a} />
              ))}
            </div>
          )
        ) : (
          <>
            {/* Upcoming/Active */}
            {upcomingAssignments.length > 0 && (
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>
                  <Clock size={18} />
                  Aktive og kommende
                </h2>
                <div style={styles.list}>
                  {upcomingAssignments.map((a) => (
                    <AssignmentCard key={a.id} assignment={a} />
                  ))}
                </div>
              </div>
            )}

            {/* Past */}
            {pastAssignments.length > 0 && (
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>
                  <CheckCircle size={18} />
                  Tidligere oppdrag
                </h2>
                <div style={styles.list}>
                  {pastAssignments.map((a) => (
                    <AssignmentCard key={a.id} assignment={a} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Info box */}
        <div style={styles.infoBox}>
          <h3 style={styles.infoTitle}>Om oppdrag</h3>
          <ul style={styles.infoList}>
            <li>Oppdrag tildeles av Bluecrew basert på din profil og tilgjengelighet</li>
            <li>Du får varsel når nye oppdrag er tilgjengelige</li>
            <li>Kontakt oss hvis du har spørsmål om et oppdrag</li>
          </ul>
        </div>
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
    maxWidth: 800,
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
    flexWrap: "wrap",
    gap: 16,
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
  viewToggle: {
    display: "flex",
    background: "#f1f5f9",
    borderRadius: 10,
    padding: 4,
  },
  viewBtn: {
    padding: "8px 16px",
    background: "transparent",
    border: "none",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    color: "#64748b",
    cursor: "pointer",
  },
  viewBtnActive: {
    background: "#fff",
    color: "#0f172a",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  dateFilter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    background: "#e0f2fe",
    borderRadius: 10,
    marginBottom: 24,
    fontSize: 14,
    color: "#0369a1",
  },
  clearFilter: {
    background: "#0369a1",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
  },
  clearFilterBtn: {
    background: "#0369a1",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    marginTop: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 16,
    fontWeight: 600,
    color: "#334155",
    marginBottom: 16,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  assignmentCard: {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    overflow: "hidden",
  },
  assignmentHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 16,
    cursor: "pointer",
    gap: 16,
  },
  assignmentMain: {
    flex: 1,
  },
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    padding: "4px 10px",
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 8,
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: 600,
    margin: "0 0 8px",
    color: "#0f172a",
  },
  assignmentMeta: {
    display: "flex",
    flexWrap: "wrap",
    gap: 16,
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 14,
    color: "#64748b",
  },
  assignmentDates: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
    color: "#64748b",
    whiteSpace: "nowrap",
  },
  assignmentDetails: {
    padding: "16px",
    borderTop: "1px solid #e2e8f0",
    background: "#f8fafc",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  detailRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 14,
    color: "#475569",
  },
  phoneLink: {
    color: "#0369a1",
    textDecoration: "none",
  },
  notes: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 1.6,
  },
  empty: {
    textAlign: "center",
    padding: "60px 20px",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 600,
    margin: "16px 0 8px",
    color: "#334155",
  },
  emptyText: {
    color: "#64748b",
    maxWidth: 300,
    margin: "0 auto",
  },
  infoBox: {
    background: "#f8fafc",
    borderRadius: 12,
    padding: 20,
    marginTop: 32,
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
  // Calendar styles
  calendar: {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    overflow: "hidden",
  },
  calendarHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
    borderBottom: "1px solid #e2e8f0",
  },
  calendarNav: {
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f1f5f9",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    color: "#475569",
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: "#0f172a",
  },
  calendarGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    padding: 12,
    gap: 4,
  },
  calendarDayHeader: {
    padding: "8px 0",
    textAlign: "center",
    fontSize: 12,
    fontWeight: 600,
    color: "#64748b",
  },
  calendarDayEmpty: {
    padding: 8,
  },
  calendarDay: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 4px",
    minHeight: 50,
    background: "transparent",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 14,
    color: "#475569",
  },
  calendarDayToday: {
    background: "#e0f2fe",
    fontWeight: 600,
    color: "#0369a1",
  },
  calendarDayHasEvent: {
    background: "#f0fdf4",
  },
  calendarDayDots: {
    display: "flex",
    gap: 3,
    marginTop: 4,
  },
  calendarDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
  },
};
