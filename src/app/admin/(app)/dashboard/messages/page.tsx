"use client";

import React, { useEffect, useState, useCallback } from "react";

interface Message {
  id: number;
  name: string;
  email: string;
  phone: string;
  country: string;
  services: string[];
  message: string;
  status: string;
  createdAt: string;
}

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  New:      { bg: "#faf5ff", color: "#7c3aed" },
  Read:     { bg: "#f8fafc", color: "#475569" },
  Resolved: { bg: "#f0fdf4", color: "#16a34a" },
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_STYLE[status] ?? { bg: "#f1f5f9", color: "#475569" };
  return (
    <span style={{
      display: "inline-block",
      padding: "3px 12px",
      borderRadius: "999px",
      fontSize: "0.72rem",
      fontWeight: 600,
      background: s.bg,
      color: s.color,
    }}>
      {status}
    </span>
  );
}

export default function MessagesPage() {
  const [all, setAll] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact-messages");
      const data = await res.json();
      if (data.status === "success") setAll(data.data);
      else setError(data.message || "Failed to load");
    } catch { setError("Network error"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleStatusChange = async (id: number, status: string) => {
    await fetch("/api/contact-messages", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    setAll((prev) => prev.map((m) => m.id === id ? { ...m, status } : m));
  };

  const filtered = all.filter((m) => {
    const matchStatus = filter === "All" || m.status === filter;
    const q = search.toLowerCase();
    return matchStatus && (!q || m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.country?.toLowerCase().includes(q));
  });

  const statuses = ["All", "New", "Read", "Resolved"];
  const counts = statuses.reduce((a, s) => { a[s] = s === "All" ? all.length : all.filter((m) => m.status === s).length; return a; }, {} as Record<string, number>);

  const unreadCount = all.filter(m => m.status === "New").length;

  return (
    <div style={{ padding: "2rem", fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: "1.75rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "4px" }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111113", margin: 0 }}>Messages</h1>
            {unreadCount > 0 && (
              <span style={{
                background: "linear-gradient(135deg, #fef3c7, #fde68a)",
                color: "#92400e", fontSize: "0.7rem", fontWeight: 700,
                padding: "3px 10px", borderRadius: "999px",
                border: "1px solid #fcd34d",
              }}>
                {unreadCount} unread
              </span>
            )}
          </div>
          <p style={{ fontSize: "0.82rem", color: "#64748b", marginTop: "4px" }}>{all.length} total message{all.length !== 1 ? "s" : ""}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%", maxWidth: "380px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "0 0.85rem", height: "42px", flex: 1, transition: "all 0.2s ease" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input type="text" placeholder="Search name, email, country…" value={search} onChange={(e) => setSearch(e.target.value)} style={{ border: "none", outline: "none", fontSize: "0.82rem", color: "#1e293b", background: "transparent", width: "100%" }} />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "0.35rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
        {statuses.map((s) => {
          const isActive = filter === s;
          const colors: Record<string, { border: string; bg: string; text: string }> = {
            All: { border: "#6366f1", bg: "#eef2ff", text: "#6366f1" },
            New: { border: "#7c3aed", bg: "#faf5ff", text: "#7c3aed" },
            Read: { border: "#475569", bg: "#f8fafc", text: "#475569" },
            Resolved: { border: "#16a34a", bg: "#f0fdf4", text: "#16a34a" },
          };
          const c = colors[s] || colors.All;
          return (
            <button key={s} onClick={() => setFilter(s)} style={{
              padding: "7px 16px", borderRadius: "10px", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer",
              border: isActive ? `2px solid ${c.border}` : "2px solid #e2e8f0",
              background: isActive ? c.bg : "#fff",
              color: isActive ? c.text : "#64748b",
              transition: "all 0.2s ease",
              boxShadow: isActive ? `0 2px 8px ${c.border}20` : "none",
            }}>
              {s} <span style={{ opacity: 0.7, fontWeight: 400 }}>({counts[s]})</span>
            </button>
          );
        })}
      </div>

      {/* Messages Table */}
      <div style={{
        background: "#fff", borderRadius: "16px",
        border: "1px solid #f1f5f9", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)",
        overflow: "hidden",
      }}>
        {loading ? (
          <div style={{ padding: "4rem", textAlign: "center" }}>
            <div style={{
              width: "36px", height: "36px", border: "3px solid #f1f5f9",
              borderTopColor: "#E09100", borderRadius: "50%",
              margin: "0 auto 1rem", animation: "spin 0.8s linear infinite",
            }} />
            <div style={{ fontSize: "0.85rem", color: "#64748b" }}>Loading messages…</div>
          </div>
        ) : error ? (
          <div style={{ padding: "2rem", color: "#dc2626", fontSize: "0.85rem" }}>Error: {error}</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "4rem 2rem", textAlign: "center", color: "#94a3b8" }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "1rem" }}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 1 1 0 4H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#64748b", marginBottom: "4px" }}>No messages found</div>
            <div style={{ fontSize: "0.8rem" }}>Messages will appear here when received</div>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["Name", "Country", "Services", "Status", "Date"].map((h) => (
                  <th key={h} style={{
                    padding: "0.7rem 1rem", fontSize: "0.72rem", fontWeight: 600,
                    color: "#94a3b8", textAlign: "left", textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, i) => (
                <tr
                  key={m.id}
                  style={{
                    borderTop: i > 0 ? "1px solid #f8fafc" : "none",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
                >
                  <td style={{ padding: "0.85rem 1rem" }}>
                    <div style={{ fontSize: "0.83rem", fontWeight: 600, color: "#111113" }}>{m.name}</div>
                    <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: "1px" }}>{m.email}</div>
                  </td>
                  <td style={{ padding: "0.85rem 1rem", fontSize: "0.82rem", color: "#475569" }}>{m.country || "—"}</td>
                  <td style={{ padding: "0.85rem 1rem", fontSize: "0.75rem", color: "#64748b" }}>{m.services?.slice(0, 2).join(", ") || "—"}{m.services?.length > 2 ? " …" : ""}</td>
                  <td style={{ padding: "0.85rem 1rem" }}>
                    <StatusBadge status={m.status} />
                  </td>
                  <td style={{ padding: "0.85rem 1rem", fontSize: "0.78rem", color: "#94a3b8", whiteSpace: "nowrap" }}>
                    {new Date(m.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
