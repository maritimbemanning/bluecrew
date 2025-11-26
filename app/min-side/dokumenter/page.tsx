"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import SiteLayout from "@/app/components/SiteLayout";
import {
  ArrowLeft,
  Loader2,
  FileText,
  Upload,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Trash2,
  Calendar,
  Shield,
  Award,
  Heart,
  File,
  Plus,
  X,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";

type DocumentType = "cv" | "certificate" | "health" | "other";

type Document = {
  id: string;
  type: DocumentType;
  name: string;
  filename: string;
  uploaded_at: string;
  expires_at: string | null;
  url?: string;
  status: "valid" | "expiring_soon" | "expired";
};

const DOC_CONFIG: Record<DocumentType, { label: string; Icon: typeof FileText; color: string }> = {
  cv: { label: "CV", Icon: FileText, color: "#0369a1" },
  certificate: { label: "Sertifikat", Icon: Award, color: "#7c3aed" },
  health: { label: "Helseattest", Icon: Heart, color: "#dc2626" },
  other: { label: "Annet", Icon: File, color: "#64748b" },
};

function getDocumentStatus(expiresAt: string | null): "valid" | "expiring_soon" | "expired" {
  if (!expiresAt) return "valid";

  const now = new Date();
  const expiry = new Date(expiresAt);
  const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (daysUntilExpiry < 0) return "expired";
  if (daysUntilExpiry <= 30) return "expiring_soon";
  return "valid";
}

function getDaysUntilExpiry(expiresAt: string): number {
  const now = new Date();
  const expiry = new Date(expiresAt);
  return Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function DocumentCard({ doc, onDelete }: { doc: Document; onDelete: (id: string) => void }) {
  const config = DOC_CONFIG[doc.type];
  const daysLeft = doc.expires_at ? getDaysUntilExpiry(doc.expires_at) : null;
  const IconComponent = config.Icon;

  return (
    <div style={{
      ...styles.docCard,
      borderColor: doc.status === "expired" ? "#fecaca" : doc.status === "expiring_soon" ? "#fed7aa" : "#e2e8f0",
    }}>
      <div style={styles.docHeader}>
        <div style={{ ...styles.docIcon, background: `${config.color}15` }}>
          <IconComponent size={20} color={config.color} />
        </div>
        <div style={styles.docInfo}>
          <div style={styles.docName}>{doc.name}</div>
          <div style={styles.docMeta}>
            <span style={styles.docType}>{config.label}</span>
            <span style={styles.docDate}>
              Lastet opp {new Date(doc.uploaded_at).toLocaleDateString("nb-NO")}
            </span>
          </div>
        </div>
        <div style={styles.docActions}>
          {doc.url && (
            <a href={doc.url} target="_blank" rel="noopener noreferrer" style={styles.docActionBtn}>
              <Download size={16} />
            </a>
          )}
          <button onClick={() => onDelete(doc.id)} style={{ ...styles.docActionBtn, color: "#ef4444" }}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {doc.expires_at && (
        <div style={{
          ...styles.expiryBadge,
          background: doc.status === "expired" ? "#fef2f2" : doc.status === "expiring_soon" ? "#fffbeb" : "#f0fdf4",
          color: doc.status === "expired" ? "#dc2626" : doc.status === "expiring_soon" ? "#d97706" : "#16a34a",
          borderColor: doc.status === "expired" ? "#fecaca" : doc.status === "expiring_soon" ? "#fed7aa" : "#bbf7d0",
        }}>
          {doc.status === "expired" ? (
            <>
              <AlertTriangle size={14} />
              Utløpt {Math.abs(daysLeft!)} dager siden
            </>
          ) : doc.status === "expiring_soon" ? (
            <>
              <Clock size={14} />
              Utløper om {daysLeft} dager
            </>
          ) : (
            <>
              <CheckCircle size={14} />
              Gyldig til {new Date(doc.expires_at).toLocaleDateString("nb-NO")}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function UploadModal({
  isOpen,
  onClose,
  onUpload
}: {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (data: { type: DocumentType; name: string; file: File; expiresAt: string | null }) => void;
}) {
  const [type, setType] = useState<DocumentType>("certificate");
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [hasExpiry, setHasExpiry] = useState(true);
  const [expiresAt, setExpiresAt] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name) return;

    setUploading(true);
    try {
      await onUpload({
        type,
        name,
        file,
        expiresAt: hasExpiry && expiresAt ? expiresAt : null,
      });
      onClose();
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>Last opp dokument</h2>
          <button onClick={onClose} style={styles.modalClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Type */}
          <div style={styles.field}>
            <label style={styles.label}>Type dokument</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as DocumentType)}
              style={styles.select}
            >
              <option value="cv">CV</option>
              <option value="certificate">Sertifikat (STCW, etc.)</option>
              <option value="health">Helseattest</option>
              <option value="other">Annet</option>
            </select>
          </div>

          {/* Name */}
          <div style={styles.field}>
            <label style={styles.label}>Navn/beskrivelse</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="F.eks. 'STCW Grunnkurs' eller 'Sjømannshelseattest'"
              style={styles.input}
              required
            />
          </div>

          {/* File */}
          <div style={styles.field}>
            <label style={styles.label}>Fil (PDF, maks 10 MB)</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              style={styles.fileInput}
              required
            />
          </div>

          {/* Expiry */}
          <div style={styles.field}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={hasExpiry}
                onChange={(e) => setHasExpiry(e.target.checked)}
              />
              <span>Dokumentet har utløpsdato</span>
            </label>
            {hasExpiry && (
              <input
                type="date"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                style={{ ...styles.input, marginTop: 8 }}
                required={hasExpiry}
              />
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={uploading || !file || !name}
            style={{
              ...styles.submitBtn,
              opacity: uploading || !file || !name ? 0.6 : 1,
            }}
          >
            {uploading ? (
              <>
                <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
                Laster opp...
              </>
            ) : (
              <>
                <Upload size={18} />
                Last opp
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function DokumenterPage() {
  const { user, isLoaded } = useUser();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);

  // Load documents
  useEffect(() => {
    if (user?.id) {
      loadDocuments();
    }
  }, [user?.id]);

  async function loadDocuments() {
    try {
      const res = await fetch("/api/user/documents");
      if (res.ok) {
        const data = await res.json();
        const docs = (data.documents || []).map((doc: Document) => ({
          ...doc,
          status: getDocumentStatus(doc.expires_at),
        }));
        setDocuments(docs);
      }
    } catch (err) {
      console.error("Failed to load documents:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleUpload = useCallback(async (data: {
    type: DocumentType;
    name: string;
    file: File;
    expiresAt: string | null;
  }) => {
    const formData = new FormData();
    formData.append("type", data.type);
    formData.append("name", data.name);
    formData.append("file", data.file);
    if (data.expiresAt) {
      formData.append("expires_at", data.expiresAt);
    }

    const res = await fetch("/api/user/documents", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Upload failed");
    }

    await loadDocuments();
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm("Er du sikker på at du vil slette dette dokumentet?")) return;

    try {
      const res = await fetch(`/api/user/documents?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setDocuments((prev) => prev.filter((d) => d.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete document:", err);
    }
  }, []);

  // Count by status
  const expiredCount = documents.filter((d) => d.status === "expired").length;
  const expiringSoonCount = documents.filter((d) => d.status === "expiring_soon").length;

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
          <p>Du må være innlogget for å se dine dokumenter.</p>
          <Link href="/logg-inn?redirect_url=/min-side/dokumenter" style={styles.link}>
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
            <Shield size={28} color="#0369a1" />
            <div>
              <h1 style={styles.title}>Mine dokumenter</h1>
              <p style={styles.subtitle}>
                {documents.length} dokument{documents.length !== 1 ? "er" : ""}
              </p>
            </div>
          </div>
          <button onClick={() => setShowUpload(true)} style={styles.uploadBtn}>
            <Plus size={18} />
            Last opp
          </button>
        </div>

        {/* Warnings */}
        {(expiredCount > 0 || expiringSoonCount > 0) && (
          <div style={styles.warnings}>
            {expiredCount > 0 && (
              <div style={{ ...styles.warningBox, background: "#fef2f2", borderColor: "#fecaca" }}>
                <AlertTriangle size={18} color="#dc2626" />
                <span style={{ color: "#dc2626" }}>
                  {expiredCount} dokument{expiredCount !== 1 ? "er" : ""} har utløpt!
                </span>
              </div>
            )}
            {expiringSoonCount > 0 && (
              <div style={{ ...styles.warningBox, background: "#fffbeb", borderColor: "#fed7aa" }}>
                <Clock size={18} color="#d97706" />
                <span style={{ color: "#d97706" }}>
                  {expiringSoonCount} dokument{expiringSoonCount !== 1 ? "er" : ""} utløper snart
                </span>
              </div>
            )}
          </div>
        )}

        {/* Document list */}
        {loading ? (
          <div style={styles.loading}>
            <Loader2 size={24} style={{ animation: "spin 1s linear infinite" }} />
            <p style={{ margin: "12px 0 0", color: "#64748b" }}>Laster dokumenter...</p>
          </div>
        ) : documents.length === 0 ? (
          <div style={styles.empty}>
            <FileText size={48} color="#cbd5e1" />
            <h3 style={styles.emptyTitle}>Ingen dokumenter</h3>
            <p style={styles.emptyText}>
              Last opp CV, sertifikater og helseattest for å holde alt på ett sted.
            </p>
            <button onClick={() => setShowUpload(true)} style={styles.uploadBtnLarge}>
              <Upload size={20} />
              Last opp ditt første dokument
            </button>
          </div>
        ) : (
          <div style={styles.list}>
            {documents.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} onDelete={handleDelete} />
            ))}
          </div>
        )}

        {/* Info box */}
        <div style={styles.infoBox}>
          <h3 style={styles.infoTitle}>Tips for dokumenter</h3>
          <ul style={styles.infoList}>
            <li>Last opp STCW-sertifikater med utløpsdato for påminnelser</li>
            <li>Helseattest må fornyes årlig for sjøfolk</li>
            <li>Hold CV oppdatert for raskere matching</li>
          </ul>
        </div>

        {/* Upload modal */}
        <UploadModal
          isOpen={showUpload}
          onClose={() => setShowUpload(false)}
          onUpload={handleUpload}
        />
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
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 18px",
    background: "#0369a1",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
  },
  warnings: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginBottom: 24,
  },
  warningBox: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 16px",
    borderRadius: 10,
    border: "1px solid",
    fontSize: 14,
    fontWeight: 500,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  docCard: {
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    padding: 16,
  },
  docHeader: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
  },
  docIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  docInfo: {
    flex: 1,
    minWidth: 0,
  },
  docName: {
    fontWeight: 600,
    fontSize: 15,
    color: "#0f172a",
  },
  docMeta: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 4,
  },
  docType: {
    fontSize: 13,
    color: "#64748b",
    background: "#f1f5f9",
    padding: "2px 8px",
    borderRadius: 4,
  },
  docDate: {
    fontSize: 13,
    color: "#94a3b8",
  },
  docActions: {
    display: "flex",
    gap: 4,
  },
  docActionBtn: {
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f8fafc",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    color: "#64748b",
  },
  expiryBadge: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
    padding: "8px 12px",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 500,
    border: "1px solid",
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
    marginBottom: 24,
  },
  uploadBtnLarge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "14px 24px",
    background: "#0369a1",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
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
  // Modal styles
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
    maxWidth: 480,
    maxHeight: "90vh",
    overflow: "auto",
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
  form: {
    padding: 24,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: 600,
    color: "#334155",
  },
  input: {
    padding: "12px 14px",
    border: "1px solid #cbd5e1",
    borderRadius: 10,
    fontSize: 15,
    outline: "none",
  },
  select: {
    padding: "12px 14px",
    border: "1px solid #cbd5e1",
    borderRadius: 10,
    fontSize: 15,
    background: "#fff",
    cursor: "pointer",
  },
  fileInput: {
    padding: "12px 14px",
    border: "2px dashed #cbd5e1",
    borderRadius: 10,
    fontSize: 14,
    background: "#f8fafc",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
    color: "#475569",
    cursor: "pointer",
  },
  submitBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "14px 24px",
    background: "#0369a1",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
    marginTop: 8,
  },
};
