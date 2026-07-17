"use client";

import React, { useEffect, useState, useCallback } from "react";

// ── Types ──────────────────────────────────────────────
interface Consultation {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  nationality: string;
  targetCountry: string;
  targetLevel: string;
  consultant: string;
  mode: string;
  date: string;
  time: string;
  duration: string;
  status: string;
  topic: string;
  notes: string;
  followUp: boolean;
}

type Status = "All" | "Pending" | "Scheduled" | "Completed" | "Cancelled";

const STATUS_OPTIONS: Status[] = ["All", "Pending", "Scheduled", "Completed", "Cancelled"];

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  Pending:   { bg: "#fff7ed", color: "#ea580c" },
  Scheduled: { bg: "#eff6ff", color: "#2563eb" },
  Completed: { bg: "#f0fdf4", color: "#16a34a" },
  Cancelled: { bg: "#fef2f2", color: "#dc2626" },
};

// ── Badge ───────────────────────────────────────────────
function Badge({ status }: { status: string }) {
  const s = STATUS_STYLE[status] ?? { bg: "#f1f5f9", color: "#475569" };
  return (
    <span style={{
      display: "inline-block", padding: "3px 12px", borderRadius: "999px",
      fontSize: "0.72rem", fontWeight: 600, background: s.bg, color: s.color,
    }}>
      {status}
    </span>
  );
}

// ── Detail Drawer ───────────────────────────────────────
function DetailDrawer({
  item, onClose, onStatusChange,
}: {
  item: Consultation;
  onClose: () => void;
  onStatusChange: (id: string, status: string) => Promise<void>;
}) {
  const [updating, setUpdating] = useState(false);

  async function handleStatus(newStatus: string) {
    setUpdating(true);
    await onStatusChange(item.id, newStatus);
    setUpdating(false);
  }

  const field = (label: string, value: string | boolean) => (
    <div style={{ marginBottom: "0.85rem" }}>
      <div style={{ fontSize: "0.7rem", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "2px" }}>{label}</div>
      <div style={{ fontSize: "0.85rem", color: "#1e293b", fontWeight: 500 }}>{String(value)}</div>
    </div>
  );

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 40 }} />
      {/* Drawer */}
      <div style={{
        position: "fixed", top: 0, right: 0, height: "100vh", width: "380px",
        background: "#fff", zIndex: 50, boxShadow: "-4px 0 24px rgba(0,0,0,0.1)",
        display: "flex", flexDirection: "column", fontFamily: "var(--font-sans), system-ui, sans-serif",
      }}>
        {/* Header */}
        <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#111113" }}>{item.studentName}</div>
            <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "2px" }}>Session {item.id}</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: "4px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
            {field("Email", item.email)}
            {field("Phone", item.phone)}
            {field("Nationality", item.nationality)}
            {field("Target Country", item.targetCountry)}
            {field("Target Level", item.targetLevel)}
            {field("Consultant", item.consultant)}
            {field("Mode", item.mode)}
            {field("Date", item.date)}
            {field("Time", item.time)}
            {field("Duration", item.duration)}
            {field("Follow Up", item.followUp ? "Yes" : "No")}
          </div>
          {field("Topic", item.topic)}
          {item.notes && field("Notes", item.notes)}

          {/* Status Update */}
          <div style={{ marginTop: "1rem" }}>
            <div style={{ fontSize: "0.7rem", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>Update Status</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {["Pending", "Scheduled", "Completed", "Cancelled"].map((s) => {
                const st = STATUS_STYLE[s];
                const isActive = item.status === s;
                return (
                  <button
                    key={s}
                    disabled={updating || isActive}
                    onClick={() => handleStatus(s)}
                    style={{
                      padding: "5px 14px", borderRadius: "8px", fontSize: "0.78rem", fontWeight: 600,
                      border: isActive ? `2px solid ${st.color}` : "2px solid #e2e8f0",
                      background: isActive ? st.bg : "#fff",
                      color: isActive ? st.color : "#64748b",
                      cursor: isActive || updating ? "not-allowed" : "pointer",
                      opacity: updating ? 0.6 : 1,
                      transition: "all 0.15s ease",
                    }}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Main Page ───────────────────────────────────────────
export default function ConsultationsPage() {
  const [all, setAll] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<Status>("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Consultation | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/consultations");
      const data = await res.json();
      if (data.status === "success") setAll(data.data);
      else setError(data.message || "Failed to load");
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleStatusChange = async (id: string, status: string) => {
    await fetch("/api/consultations", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setAll((prev) => prev.map((c) => c.id === id ? { ...c, status } : c));
    setSelected((prev) => prev && prev.id === id ? { ...prev, status } : prev);
  };

  const filtered = all.filter((c) => {
    const matchStatus = filter === "All" || c.status === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || c.studentName.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.targetCountry.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  // Count per status
  const counts = STATUS_OPTIONS.reduce((acc, s) => {
    acc[s] = s === "All" ? all.length : all.filter((c) => c.status === s).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div style={{ padding: "2rem", fontFamily: "var(--font-sans), system-ui, sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#111113", margin: 0 }}>Consultations</h1>
          <p style={{ fontSize: "0.82rem", color: "#64748b", marginTop: "4px" }}>{all.length} total session{all.length !== 1 ? "s" : ""}</p>
        </div>
        {/* Search */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "0 0.75rem", height: "38px", minWidth: "220px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input
            type="text"
            placeholder="Search student, email, country…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: "none", outline: "none", fontSize: "0.82rem", color: "#1e293b", background: "transparent", width: "100%" }}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
        {STATUS_OPTIONS.map((s) => {
          const isActive = filter === s;
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                padding: "6px 14px", borderRadius: "8px", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer",
                border: isActive ? "2px solid #6366f1" : "2px solid #e2e8f0",
                background: isActive ? "#eef2ff" : "#fff",
                color: isActive ? "#6366f1" : "#64748b",
                transition: "all 0.15s ease",
              }}
            >
              {s} <span style={{ opacity: 0.7, fontWeight: 400 }}>({counts[s]})</span>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #f1f5f9", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "#94a3b8", fontSize: "0.85rem" }}>Loading…</div>
        ) : error ? (
          <div style={{ padding: "2rem", color: "#dc2626", fontSize: "0.85rem" }}>Error: {error}</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "#94a3b8", fontSize: "0.85rem" }}>No consultations found</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["Student", "Target Country", "Level", "Consultant", "Mode", "Date", "Status", ""].map((h) => (
                  <th key={h} style={{
                    padding: "0.7rem 1rem", fontSize: "0.72rem", fontWeight: 600,
                    color: "#94a3b8", textAlign: "left", textTransform: "uppercase",
                    letterSpacing: "0.05em", whiteSpace: "nowrap",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr
                  key={c.id}
                  style={{ borderTop: i > 0 ? "1px solid #f8fafc" : "none", transition: "background 0.1s ease", cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "")}
                  onClick={() => setSelected(c)}
                >
                  <td style={{ padding: "0.85rem 1rem" }}>
                    <div style={{ fontSize: "0.83rem", fontWeight: 600, color: "#111113" }}>{c.studentName}</div>
                    <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: "1px" }}>{c.email}</div>
                  </td>
                  <td style={{ padding: "0.85rem 1rem", fontSize: "0.82rem", color: "#475569" }}>{c.targetCountry}</td>
                  <td style={{ padding: "0.85rem 1rem", fontSize: "0.82rem", color: "#475569" }}>{c.targetLevel}</td>
                  <td style={{ padding: "0.85rem 1rem", fontSize: "0.82rem", color: "#475569" }}>{c.consultant}</td>
                  <td style={{ padding: "0.85rem 1rem" }}>
                    <span style={{ fontSize: "0.75rem", color: "#64748b", background: "#f1f5f9", padding: "2px 8px", borderRadius: "6px", fontWeight: 500 }}>
                      {c.mode}
                    </span>
                  </td>
                  <td style={{ padding: "0.85rem 1rem", fontSize: "0.78rem", color: "#94a3b8", whiteSpace: "nowrap" }}>{c.date}</td>
                  <td style={{ padding: "0.85rem 1rem" }}><Badge status={c.status} /></td>
                  <td style={{ padding: "0.85rem 1rem" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Detail Drawer */}
      {selected && (
        <DetailDrawer
          item={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
