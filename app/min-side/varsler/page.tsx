"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SiteLayout from "@/app/components/SiteLayout";
import {
  ArrowLeft,
  Loader2,
  Bell,
  BellOff,
  Mail,
  Briefcase,
  Shield,
  Calendar,
  MessageSquare,
  Check,
  X,
  Smartphone,
  AlertTriangle,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";

type NotificationPreferences = {
  push_enabled: boolean;
  email_enabled: boolean;
  new_jobs: boolean;
  application_updates: boolean;
  messages: boolean;
  document_expiry: boolean;
  assignment_reminders: boolean;
};

const DEFAULT_PREFS: NotificationPreferences = {
  push_enabled: false,
  email_enabled: true,
  new_jobs: true,
  application_updates: true,
  messages: true,
  document_expiry: true,
  assignment_reminders: true,
};

type NotificationCategory = {
  key: keyof NotificationPreferences;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
};

const CATEGORIES: NotificationCategory[] = [
  {
    key: "new_jobs",
    title: "Nye stillinger",
    description: "Varsle når nye stillinger matcher profilen din",
    icon: <Briefcase size={20} />,
    color: "#0369a1",
  },
  {
    key: "application_updates",
    title: "Søknadsoppdateringer",
    description: "Statusendringer på dine søknader",
    icon: <Check size={20} />,
    color: "#16a34a",
  },
  {
    key: "messages",
    title: "Nye meldinger",
    description: "Meldinger fra Bluecrew-teamet",
    icon: <MessageSquare size={20} />,
    color: "#7c3aed",
  },
  {
    key: "document_expiry",
    title: "Dokumentpåminnelser",
    description: "Varsle før sertifikater utløper",
    icon: <Shield size={20} />,
    color: "#dc2626",
  },
  {
    key: "assignment_reminders",
    title: "Oppdragspåminnelser",
    description: "Påminnelser om kommende oppdrag",
    icon: <Calendar size={20} />,
    color: "#d97706",
  },
];

export default function VarslerPage() {
  const { user, isLoaded } = useUser();
  const [prefs, setPrefs] = useState<NotificationPreferences>(DEFAULT_PREFS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pushSupported, setPushSupported] = useState(false);
  const [pushPermission, setPushPermission] = useState<NotificationPermission>("default");

  useEffect(() => {
    // Check if push notifications are supported
    if (typeof window !== "undefined" && "Notification" in window && "serviceWorker" in navigator) {
      setPushSupported(true);
      setPushPermission(Notification.permission);
    }

    if (user?.id) {
      loadPreferences();
    }
  }, [user?.id]);

  async function loadPreferences() {
    try {
      const res = await fetch("/api/user/notification-preferences");
      if (res.ok) {
        const data = await res.json();
        if (data.preferences) {
          setPrefs({ ...DEFAULT_PREFS, ...data.preferences });
        }
      }
    } catch (err) {
      console.error("Failed to load preferences:", err);
    } finally {
      setLoading(false);
    }
  }

  async function savePreferences(newPrefs: NotificationPreferences) {
    setSaving(true);
    try {
      await fetch("/api/user/notification-preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preferences: newPrefs }),
      });
    } catch (err) {
      console.error("Failed to save preferences:", err);
    } finally {
      setSaving(false);
    }
  }

  async function requestPushPermission() {
    if (!pushSupported) return;

    try {
      const permission = await Notification.requestPermission();
      setPushPermission(permission);

      if (permission === "granted") {
        // Register service worker and subscribe to push
        const registration = await navigator.serviceWorker.register("/sw.js");
        await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
        });

        const newPrefs = { ...prefs, push_enabled: true };
        setPrefs(newPrefs);
        await savePreferences(newPrefs);
      }
    } catch (err) {
      console.error("Failed to enable push notifications:", err);
    }
  }

  function toggleCategory(key: keyof NotificationPreferences) {
    const newPrefs = { ...prefs, [key]: !prefs[key] };
    setPrefs(newPrefs);
    savePreferences(newPrefs);
  }

  function toggleEmail() {
    const newPrefs = { ...prefs, email_enabled: !prefs.email_enabled };
    setPrefs(newPrefs);
    savePreferences(newPrefs);
  }

  async function disablePush() {
    const newPrefs = { ...prefs, push_enabled: false };
    setPrefs(newPrefs);
    await savePreferences(newPrefs);
  }

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
          <p>Du må være innlogget for å endre varslingsinnstillinger.</p>
          <Link href="/logg-inn?redirect_url=/min-side/varsler" style={styles.link}>
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
          <Bell size={28} color="#0369a1" />
          <div>
            <h1 style={styles.title}>Varslingsinnstillinger</h1>
            <p style={styles.subtitle}>Velg hvordan du vil bli varslet</p>
          </div>
        </div>

        {loading ? (
          <div style={styles.loading}>
            <Loader2 size={24} style={{ animation: "spin 1s linear infinite" }} />
            <p style={{ margin: "12px 0 0", color: "#64748b" }}>Laster innstillinger...</p>
          </div>
        ) : (
          <>
            {/* Notification channels */}
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Varslingskanaler</h2>

              {/* Push notifications */}
              <div style={styles.channelCard}>
                <div style={styles.channelHeader}>
                  <div style={{ ...styles.channelIcon, background: "#dbeafe" }}>
                    <Smartphone size={20} color="#0369a1" />
                  </div>
                  <div style={styles.channelInfo}>
                    <div style={styles.channelTitle}>Push-varsler</div>
                    <div style={styles.channelDesc}>
                      {pushSupported
                        ? "Motta varsler direkte i nettleseren"
                        : "Ikke støttet i denne nettleseren"}
                    </div>
                  </div>
                </div>

                {pushSupported ? (
                  pushPermission === "denied" ? (
                    <div style={styles.permissionWarning}>
                      <AlertTriangle size={16} />
                      <span>Push-varsler er blokkert. Endre i nettleserinnstillinger.</span>
                    </div>
                  ) : prefs.push_enabled ? (
                    <button onClick={disablePush} style={styles.disableBtn}>
                      <BellOff size={16} />
                      Deaktiver
                    </button>
                  ) : (
                    <button onClick={requestPushPermission} style={styles.enableBtn}>
                      <Bell size={16} />
                      Aktiver push-varsler
                    </button>
                  )
                ) : (
                  <div style={styles.notSupported}>
                    <X size={16} />
                    Ikke støttet
                  </div>
                )}
              </div>

              {/* Email notifications */}
              <div style={styles.channelCard}>
                <div style={styles.channelHeader}>
                  <div style={{ ...styles.channelIcon, background: "#dcfce7" }}>
                    <Mail size={20} color="#16a34a" />
                  </div>
                  <div style={styles.channelInfo}>
                    <div style={styles.channelTitle}>E-postvarsler</div>
                    <div style={styles.channelDesc}>
                      Motta varsler på {user.emailAddresses[0]?.emailAddress}
                    </div>
                  </div>
                </div>
                <button
                  onClick={toggleEmail}
                  style={prefs.email_enabled ? styles.toggleOn : styles.toggleOff}
                >
                  <div style={styles.toggleKnob} />
                </button>
              </div>
            </div>

            {/* Notification categories */}
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Hva vil du bli varslet om?</h2>

              <div style={styles.categoryList}>
                {CATEGORIES.map((cat) => (
                  <div key={cat.key} style={styles.categoryCard}>
                    <div style={styles.categoryHeader}>
                      <div style={{ ...styles.categoryIcon, background: `${cat.color}15` }}>
                        {React.cloneElement(cat.icon as React.ReactElement<{ color?: string }>, { color: cat.color })}
                      </div>
                      <div style={styles.categoryInfo}>
                        <div style={styles.categoryTitle}>{cat.title}</div>
                        <div style={styles.categoryDesc}>{cat.description}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleCategory(cat.key)}
                      style={prefs[cat.key] ? styles.toggleOn : styles.toggleOff}
                      disabled={!prefs.push_enabled && !prefs.email_enabled}
                    >
                      <div style={styles.toggleKnob} />
                    </button>
                  </div>
                ))}
              </div>

              {!prefs.push_enabled && !prefs.email_enabled && (
                <div style={styles.warningBox}>
                  <AlertTriangle size={18} color="#d97706" />
                  <span>Du har deaktivert alle varslingskanaler. Aktiver minst én for å motta varsler.</span>
                </div>
              )}
            </div>

            {/* Save indicator */}
            {saving && (
              <div style={styles.savingIndicator}>
                <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                Lagrer...
              </div>
            )}
          </>
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
    maxWidth: 600,
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
    alignItems: "center",
    gap: 16,
    marginBottom: 32,
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: "#334155",
    marginBottom: 16,
  },
  channelCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    marginBottom: 12,
  },
  channelHeader: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  channelIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  channelInfo: {
    flex: 1,
  },
  channelTitle: {
    fontWeight: 600,
    fontSize: 15,
    color: "#0f172a",
  },
  channelDesc: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 2,
  },
  enableBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 16px",
    background: "#0369a1",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
  disableBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 16px",
    background: "#f1f5f9",
    color: "#64748b",
    border: "none",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
  },
  notSupported: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    color: "#94a3b8",
    fontSize: 13,
  },
  permissionWarning: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 12px",
    background: "#fef3c7",
    color: "#92400e",
    borderRadius: 8,
    fontSize: 13,
  },
  toggleOn: {
    width: 52,
    height: 28,
    borderRadius: 14,
    background: "#0369a1",
    border: "none",
    padding: 2,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  toggleOff: {
    width: 52,
    height: 28,
    borderRadius: 14,
    background: "#e2e8f0",
    border: "none",
    padding: 2,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  toggleKnob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    background: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
  },
  categoryList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  categoryCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
  },
  categoryHeader: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  categoryInfo: {
    flex: 1,
    minWidth: 0,
  },
  categoryTitle: {
    fontWeight: 600,
    fontSize: 14,
    color: "#0f172a",
  },
  categoryDesc: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  warningBox: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "14px 16px",
    background: "#fffbeb",
    border: "1px solid #fde68a",
    borderRadius: 10,
    marginTop: 16,
    fontSize: 14,
    color: "#92400e",
  },
  savingIndicator: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "12px",
    background: "#f0f9ff",
    borderRadius: 8,
    fontSize: 14,
    color: "#0369a1",
  },
  link: {
    color: "#0369a1",
    textDecoration: "underline",
  },
};
