"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import SiteLayout from "@/app/components/SiteLayout";
import {
  ArrowLeft,
  Loader2,
  MessageCircle,
  Send,
  Paperclip,
  CheckCheck,
  Clock,
  User,
  X,
  Image as ImageIcon,
  File,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";

type Message = {
  id: string;
  from_user: boolean;
  content: string;
  created_at: string;
  read: boolean;
  attachment?: {
    name: string;
    type: string;
    url: string;
  };
};

type Conversation = {
  id: string;
  subject: string;
  last_message: string;
  last_message_at: string;
  unread_count: number;
  messages: Message[];
};

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.from_user;

  return (
    <div style={{
      ...styles.messageBubble,
      alignSelf: isUser ? "flex-end" : "flex-start",
      background: isUser ? "#0369a1" : "#f1f5f9",
      color: isUser ? "#fff" : "#0f172a",
      borderBottomRightRadius: isUser ? 4 : 16,
      borderBottomLeftRadius: isUser ? 16 : 4,
    }}>
      {message.attachment && (
        <a
          href={message.attachment.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...styles.attachment,
            background: isUser ? "rgba(255,255,255,0.15)" : "#e2e8f0",
            color: isUser ? "#fff" : "#0369a1",
          }}
        >
          {message.attachment.type.startsWith("image/") ? (
            <ImageIcon size={16} />
          ) : (
            <File size={16} />
          )}
          {message.attachment.name}
        </a>
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

function ConversationList({
  conversations,
  selectedId,
  onSelect,
}: {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  if (conversations.length === 0) {
    return (
      <div style={styles.emptyConversations}>
        <MessageCircle size={32} color="#cbd5e1" />
        <p>Ingen meldinger ennå</p>
      </div>
    );
  }

  return (
    <div style={styles.conversationList}>
      {conversations.map((conv) => (
        <button
          key={conv.id}
          onClick={() => onSelect(conv.id)}
          style={{
            ...styles.conversationItem,
            background: selectedId === conv.id ? "#f0f9ff" : "#fff",
            borderColor: selectedId === conv.id ? "#0369a1" : "#e2e8f0",
          }}
        >
          <div style={styles.conversationIcon}>
            <User size={20} color="#64748b" />
          </div>
          <div style={styles.conversationContent}>
            <div style={styles.conversationHeader}>
              <span style={styles.conversationSubject}>{conv.subject}</span>
              <span style={styles.conversationTime}>
                {new Date(conv.last_message_at).toLocaleDateString("nb-NO", {
                  day: "numeric",
                  month: "short",
                })}
              </span>
            </div>
            <p style={styles.conversationPreview}>{conv.last_message}</p>
          </div>
          {conv.unread_count > 0 && (
            <span style={styles.unreadBadge}>{conv.unread_count}</span>
          )}
        </button>
      ))}
    </div>
  );
}

function ChatView({
  conversation,
  onSend,
  onClose,
}: {
  conversation: Conversation;
  onSend: (message: string, attachment?: File) => void;
  onClose: () => void;
}) {
  const [newMessage, setNewMessage] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation.messages]);

  const handleSend = async () => {
    if (!newMessage.trim() && !attachment) return;

    setSending(true);
    try {
      await onSend(newMessage, attachment || undefined);
      setNewMessage("");
      setAttachment(null);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={styles.chatView}>
      {/* Header */}
      <div style={styles.chatHeader}>
        <button onClick={onClose} style={styles.chatBackBtn}>
          <ArrowLeft size={20} />
        </button>
        <div style={styles.chatHeaderInfo}>
          <h3 style={styles.chatSubject}>{conversation.subject}</h3>
          <span style={styles.chatStatus}>Bluecrew Support</span>
        </div>
      </div>

      {/* Messages */}
      <div style={styles.messagesContainer}>
        {conversation.messages.length === 0 ? (
          <div style={styles.emptyChat}>
            <MessageCircle size={40} color="#cbd5e1" />
            <p>Start en samtale med Bluecrew</p>
          </div>
        ) : (
          conversation.messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Attachment preview */}
      {attachment && (
        <div style={styles.attachmentPreview}>
          <File size={16} />
          <span>{attachment.name}</span>
          <button onClick={() => setAttachment(null)} style={styles.removeAttachment}>
            <X size={14} />
          </button>
        </div>
      )}

      {/* Input */}
      <div style={styles.chatInputContainer}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => setAttachment(e.target.files?.[0] || null)}
          style={{ display: "none" }}
          accept=".pdf,.jpg,.jpeg,.png"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          style={styles.attachButton}
        >
          <Paperclip size={20} />
        </button>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Skriv en melding..."
          style={styles.chatInput}
          rows={1}
        />
        <button
          onClick={handleSend}
          disabled={sending || (!newMessage.trim() && !attachment)}
          style={{
            ...styles.sendButton,
            opacity: sending || (!newMessage.trim() && !attachment) ? 0.5 : 1,
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
  );
}

export default function MeldingerPage() {
  const { user, isLoaded } = useUser();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [newSubject, setNewSubject] = useState("");

  useEffect(() => {
    if (user?.id) {
      loadConversations();
    }
  }, [user?.id]);

  async function loadConversations() {
    try {
      const res = await fetch("/api/user/messages");
      if (res.ok) {
        const data = await res.json();
        setConversations(data.conversations || []);
      }
    } catch (err) {
      console.error("Failed to load conversations:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleSendMessage = useCallback(async (message: string, attachment?: File) => {
    if (!selectedConversation) return;

    const formData = new FormData();
    formData.append("conversation_id", selectedConversation);
    formData.append("content", message);
    if (attachment) {
      formData.append("attachment", attachment);
    }

    const res = await fetch("/api/user/messages", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      await loadConversations();
    }
  }, [selectedConversation]);

  const handleStartNewConversation = async () => {
    if (!newSubject.trim()) return;

    const res = await fetch("/api/user/messages/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject: newSubject }),
    });

    if (res.ok) {
      const data = await res.json();
      setShowNewMessage(false);
      setNewSubject("");
      await loadConversations();
      setSelectedConversation(data.conversation_id);
    }
  };

  const currentConversation = conversations.find((c) => c.id === selectedConversation);
  const totalUnread = conversations.reduce((sum, c) => sum + c.unread_count, 0);

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
        {/* Header (only show when no conversation selected) */}
        {!selectedConversation && (
          <>
            <Link href="/min-side" style={styles.backLink}>
              <ArrowLeft size={18} />
              Tilbake til Min side
            </Link>

            <div style={styles.header}>
              <div style={styles.headerLeft}>
                <MessageCircle size={28} color="#0369a1" />
                <div>
                  <h1 style={styles.title}>Meldinger</h1>
                  <p style={styles.subtitle}>
                    {totalUnread > 0 ? `${totalUnread} ulest${totalUnread !== 1 ? "e" : ""}` : "Ingen uleste"}
                  </p>
                </div>
              </div>
              <button onClick={() => setShowNewMessage(true)} style={styles.newMsgBtn}>
                Ny melding
              </button>
            </div>
          </>
        )}

        {/* Content */}
        {loading ? (
          <div style={styles.loading}>
            <Loader2 size={24} style={{ animation: "spin 1s linear infinite" }} />
            <p style={{ margin: "12px 0 0", color: "#64748b" }}>Laster meldinger...</p>
          </div>
        ) : selectedConversation && currentConversation ? (
          <ChatView
            conversation={currentConversation}
            onSend={handleSendMessage}
            onClose={() => setSelectedConversation(null)}
          />
        ) : (
          <>
            <ConversationList
              conversations={conversations}
              selectedId={selectedConversation}
              onSelect={setSelectedConversation}
            />

            {conversations.length === 0 && (
              <div style={styles.startConversation}>
                <p>Har du spørsmål? Start en samtale med oss!</p>
                <button onClick={() => setShowNewMessage(true)} style={styles.startBtn}>
                  <MessageCircle size={18} />
                  Start samtale
                </button>
              </div>
            )}
          </>
        )}

        {/* New message modal */}
        {showNewMessage && (
          <div style={styles.modalOverlay} onClick={() => setShowNewMessage(false)}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>Ny melding</h2>
                <button onClick={() => setShowNewMessage(false)} style={styles.modalClose}>
                  <X size={20} />
                </button>
              </div>
              <div style={styles.modalContent}>
                <div style={styles.field}>
                  <label style={styles.label}>Emne</label>
                  <input
                    type="text"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    placeholder="Hva gjelder henvendelsen?"
                    style={styles.input}
                  />
                </div>
                <button
                  onClick={handleStartNewConversation}
                  disabled={!newSubject.trim()}
                  style={{
                    ...styles.startBtn,
                    opacity: !newSubject.trim() ? 0.5 : 1,
                    width: "100%",
                  }}
                >
                  Start samtale
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
  newMsgBtn: {
    padding: "10px 18px",
    background: "#0369a1",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
  },
  conversationList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  conversationItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: 16,
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    cursor: "pointer",
    textAlign: "left",
    width: "100%",
  },
  conversationIcon: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "#f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  conversationContent: {
    flex: 1,
    minWidth: 0,
  },
  conversationHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  conversationSubject: {
    fontWeight: 600,
    fontSize: 15,
    color: "#0f172a",
  },
  conversationTime: {
    fontSize: 12,
    color: "#94a3b8",
  },
  conversationPreview: {
    margin: "4px 0 0",
    fontSize: 14,
    color: "#64748b",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  unreadBadge: {
    minWidth: 22,
    height: 22,
    borderRadius: "50%",
    background: "#0369a1",
    color: "#fff",
    fontSize: 12,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyConversations: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#64748b",
  },
  startConversation: {
    textAlign: "center",
    padding: "40px 20px",
    background: "#f8fafc",
    borderRadius: 16,
    marginTop: 24,
  },
  startBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 20px",
    background: "#0369a1",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    marginTop: 12,
  },
  // Chat view styles
  chatView: {
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 200px)",
    minHeight: 400,
    background: "#fff",
    borderRadius: 16,
    border: "1px solid #e2e8f0",
    overflow: "hidden",
  },
  chatHeader: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "16px 20px",
    background: "#f8fafc",
    borderBottom: "1px solid #e2e8f0",
  },
  chatBackBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    border: "none",
    background: "#e2e8f0",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  chatHeaderInfo: {
    flex: 1,
  },
  chatSubject: {
    margin: 0,
    fontSize: 16,
    fontWeight: 600,
  },
  chatStatus: {
    fontSize: 13,
    color: "#64748b",
  },
  messagesContainer: {
    flex: 1,
    padding: 20,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  emptyChat: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#94a3b8",
    gap: 8,
  },
  messageBubble: {
    maxWidth: "75%",
    padding: "12px 16px",
    borderRadius: 16,
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
  attachment: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 12px",
    borderRadius: 8,
    fontSize: 13,
    marginBottom: 8,
    textDecoration: "none",
  },
  attachmentPreview: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 16px",
    background: "#f1f5f9",
    borderTop: "1px solid #e2e8f0",
    fontSize: 13,
    color: "#475569",
  },
  removeAttachment: {
    marginLeft: "auto",
    width: 24,
    height: 24,
    borderRadius: 4,
    border: "none",
    background: "#e2e8f0",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  chatInputContainer: {
    display: "flex",
    alignItems: "flex-end",
    gap: 8,
    padding: 16,
    borderTop: "1px solid #e2e8f0",
  },
  attachButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    border: "none",
    background: "#f1f5f9",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#64748b",
  },
  chatInput: {
    flex: 1,
    padding: "10px 14px",
    border: "1px solid #e2e8f0",
    borderRadius: 10,
    fontSize: 15,
    resize: "none",
    outline: "none",
    fontFamily: "inherit",
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    border: "none",
    background: "#0369a1",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
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
  field: {
    marginBottom: 20,
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
    border: "1px solid #cbd5e1",
    borderRadius: 10,
    fontSize: 15,
    outline: "none",
  },
};
