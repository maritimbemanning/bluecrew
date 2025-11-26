"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SiteLayout from "@/app/components/SiteLayout";
import {
  ArrowLeft,
  Loader2,
  MessageCircle,
  Send,
  CheckCheck,
  Clock,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";

type Message = {
  id: string;
  sender: "user" | "bluecrew";
  sender_name?: string;
  content: string;
  created_at: string;
  read: boolean;
};

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.sender === "user";

  return (
    <div style={{
      ...styles.messageBubble,
      alignSelf: isUser ? "flex-end" : "flex-start",
      background: isUser ? "#0369a1" : "#f1f5f9",
      color: isUser ? "#fff" : "#0f172a",
      borderBottomRightRadius: isUser ? 4 : 16,
      borderBottomLeftRadius: isUser ? 16 : 4,
    }}>
      {!isUser && message.sender_name && (
        <div style={styles.senderName}>{message.sender_name}</div>
      )}
      <p style={styles.messageContent}>{message.content}</p>
      <div style={{
        ...styles.messageTime,
        color: isUser ? "rgba(255,255,255,0.7)" : "#94a3b8",
      }}>
        {new Date(message.created_at).toLocaleTimeString("nb-NO", {
          hour: "2-digit",
          minute: "2-digit",
        })}
        {isUser && (
          message.read
            ? <CheckCheck size={14} style={{ marginLeft: 4 }} />
            : <Clock size={12} style={{ marginLeft: 4 }} />
        )}
      </div>
    </div>
  );
}

export default function MeldingerPage() {
  const { user, isLoaded } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user?.id) {
      loadMessages();
    }
  }, [user?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function loadMessages() {
    try {
      const res = await fetch("/api/user/messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);

        // Mark messages as read
        if (data.unreadCount > 0) {
          fetch("/api/user/messages", { method: "PATCH" });
        }
      }
    } catch (err) {
      console.error("Failed to load messages:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSend() {
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      const res = await fetch("/api/user/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newMessage }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.message) {
          setMessages((prev) => [...prev, data.message]);
        }
        setNewMessage("");
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setSending(false);
    }
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const unreadCount = messages.filter(m => m.sender === "bluecrew" && !m.read).length;

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
          <p>Du må være innlogget for å se meldinger.</p>
          <Link href="/logg-inn?redirect_url=/min-side/meldinger" style={styles.link}>
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

        <div style={styles.chatContainer}>
          {/* Header */}
          <div style={styles.chatHeader}>
            <div style={styles.headerIcon}>
              <MessageCircle size={24} color="#0369a1" />
            </div>
            <div>
              <h1 style={styles.headerTitle}>Chat med Bluecrew</h1>
              <p style={styles.headerSubtitle}>
                {unreadCount > 0 ? `${unreadCount} ulest${unreadCount !== 1 ? "e" : ""}` : "Vi svarer vanligvis innen 24 timer"}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div style={styles.messagesContainer}>
            {loading ? (
              <div style={styles.loadingMessages}>
                <Loader2 size={24} style={{ animation: "spin 1s linear infinite" }} />
                <p>Laster meldinger...</p>
              </div>
            ) : messages.length === 0 ? (
              <div style={styles.emptyChat}>
                <MessageCircle size={48} color="#cbd5e1" />
                <h3 style={styles.emptyTitle}>Ingen meldinger ennå</h3>
                <p style={styles.emptyText}>
                  Send oss en melding hvis du har spørsmål om stillinger, søknader eller noe annet!
                </p>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          <div style={styles.inputContainer}>
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Skriv en melding..."
              style={styles.input}
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={sending || !newMessage.trim()}
              style={{
                ...styles.sendButton,
                opacity: sending || !newMessage.trim() ? 0.5 : 1,
              }}
            >
              {sending ? (
                <Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} />
              ) : (
                <Send size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Info */}
        <div style={styles.infoBox}>
          <h3 style={styles.infoTitle}>Tips</h3>
          <ul style={styles.infoList}>
            <li>Beskriv din henvendelse så detaljert som mulig</li>
            <li>Inkluder referansenummer hvis du spør om en spesifikk stilling</li>
            <li>Vi svarer vanligvis innen 1-2 virkedager</li>
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
  chatContainer: {
    background: "#fff",
    borderRadius: 20,
    border: "1px solid #e2e8f0",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    minHeight: 500,
  },
  chatHeader: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "20px 24px",
    background: "#f8fafc",
    borderBottom: "1px solid #e2e8f0",
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    background: "#e0f2fe",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
  },
  headerSubtitle: {
    margin: "2px 0 0",
    fontSize: 14,
    color: "#64748b",
  },
  messagesContainer: {
    flex: 1,
    padding: 20,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    minHeight: 300,
  },
  loadingMessages: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#64748b",
    gap: 12,
  },
  emptyChat: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 600,
    margin: "16px 0 8px",
    color: "#334155",
  },
  emptyText: {
    color: "#64748b",
    margin: 0,
    maxWidth: 280,
    lineHeight: 1.5,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: "12px 16px",
    borderRadius: 16,
  },
  senderName: {
    fontSize: 12,
    fontWeight: 600,
    color: "#0369a1",
    marginBottom: 4,
  },
  messageContent: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.5,
    whiteSpace: "pre-wrap",
  },
  messageTime: {
    fontSize: 11,
    marginTop: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  inputContainer: {
    display: "flex",
    alignItems: "flex-end",
    gap: 10,
    padding: 16,
    borderTop: "1px solid #e2e8f0",
    background: "#f8fafc",
  },
  input: {
    flex: 1,
    padding: "12px 16px",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    fontSize: 15,
    resize: "none",
    outline: "none",
    fontFamily: "inherit",
    background: "#fff",
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    border: "none",
    background: "#0369a1",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    flexShrink: 0,
  },
  infoBox: {
    background: "#f8fafc",
    borderRadius: 12,
    padding: 20,
    marginTop: 24,
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
};
