"use client";

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// ── Types ──────────────────────────────────────────────
interface Stats {
  totalConsultations: number;
  pendingConsultations: number;
  completedConsultations: number;
  totalMessages: number;
  newMessages: number;
}

interface RecentConsultation {
  id: string;
  studentName: string;
  targetCountry: string;
  status: string;
  date: string;
}

interface RecentMessage {
  id: number;
  name: string;
  country: string;
  status: string;
  createdAt: string;
}

interface TrendData {
  date: string;
  count: number;
}

// ── Status Badge ────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    Pending:   { bg: "#fff7ed", color: "#ea580c" },
    Scheduled: { bg: "#eff6ff", color: "#2563eb" },
    Completed: { bg: "#f0fdf4", color: "#16a34a" },
    Cancelled: { bg: "#fef2f2", color: "#dc2626" },
    New:       { bg: "#faf5ff", color: "#7c3aed" },
    Read:      { bg: "#f8fafc", color: "#64748b" },
    Resolved:  { bg: "#f0fdf4", color: "#16a34a" },
  };
  const style = map[status] ?? { bg: "#f1f5f9", color: "#475569" };
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 10px",
      borderRadius: "999px",
      fontSize: "0.72rem",
      fontWeight: 600,
      background: style.bg,
      color: style.color,
      letterSpacing: "0.02em",
    }}>
      {status}
    </span>
  );
}

// ── Stat Card ───────────────────────────────────────────
function StatCard({
  label, value, icon, accent, sub,
}: {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  accent: string;
  sub?: string;
}) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: "16px",
      padding: "1.25rem 1.5rem",
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      border: "1px solid #f1f5f9",
      flex: "1 1 180px",
      minWidth: 0,
    }}>
      <div style={{
        width: "44px", height: "44px",
        borderRadius: "12px",
        background: accent + "18",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
        color: accent,
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#111113", lineHeight: 1.1 }}>{value}</div>
        <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "2px", fontWeight: 500 }}>{label}</div>
        {sub && <div style={{ fontSize: "0.72rem", color: accent, marginTop: "2px", fontWeight: 600 }}>{sub}</div>}
      </div>
    </div>
  );
}

// ── Main Page ───────────────────────────────────────────
export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [consultations, setConsultations] = useState<RecentConsultation[]>([]);
  const [messages, setMessages] = useState<RecentMessage[]>([]);
  const [consultationTrends, setConsultationTrends] = useState<TrendData[]>([]);
  const [messageTrends, setMessageTrends] = useState<TrendData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((r) => r.json())
      .then((res) => {
        if (res.status === "success") {
          setStats(res.data.stats);
          setConsultations(res.data.recentConsultations);
          setMessages(res.data.recentMessages);
          setConsultationTrends(res.data.consultationTrends || []);
          setMessageTrends(res.data.messageTrends || []);
        } else {
          setError(res.message || "Failed to load data");
        }
      })
      .catch(() => setError("Network error"))
      .finally(() => setLoading(false));
  }, []);

  const adminUser = (() => {
    if (typeof window === "undefined") return null;
    try { return JSON.parse(localStorage.getItem("admin_user") || "null"); } catch { return null; }
  })();

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", minHeight: "60vh", color: "#64748b", fontSize: "0.9rem" }}>
      Loading dashboard…
    </div>
  );

  if (error) return (
    <div style={{ padding: "2rem", color: "#dc2626", fontSize: "0.9rem" }}>
      Error: {error}
    </div>
  );

  return (
    <div style={{ padding: "2rem", fontFamily: "var(--font-sans), system-ui, sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#111113", margin: 0 }}>
          Dashboard
        </h1>
        <p style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "4px" }}>
          Welcome back{adminUser?.name ? `, ${adminUser.name}` : ""}! Here&apos;s your overview.
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
        <StatCard
          label="Total Consultations"
          value={stats!.totalConsultations}
          accent="#6366f1"
          sub={`${stats!.pendingConsultations} pending`}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
        />
        <StatCard
          label="Completed Sessions"
          value={stats!.completedConsultations}
          accent="#16a34a"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          }
        />
        <StatCard
          label="Contact Messages"
          value={stats!.totalMessages}
          accent="#E09100"
          sub={`${stats!.newMessages} new`}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          }
        />
        <StatCard
          label="Pending Reviews"
          value={stats!.pendingConsultations}
          accent="#dc2626"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          }
        />
      </div>

      {/* Charts Section */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "2rem" }}>

        {/* Consultation Trends */}
        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #f1f5f9", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", padding: "1.25rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <span style={{ fontWeight: 700, fontSize: "0.88rem", color: "#111113" }}>Consultation Trends</span>
            <p style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: "2px" }}>Last 7 days</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={consultationTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "1px solid #f1f5f9", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                labelStyle={{ fontSize: "0.75rem", color: "#64748b" }}
              />
              <Line type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4, fill: "#6366f1", strokeWidth: 0 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Message Trends */}
        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #f1f5f9", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", padding: "1.25rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <span style={{ fontWeight: 700, fontSize: "0.88rem", color: "#111113" }}>Message Trends</span>
            <p style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: "2px" }}>Last 7 days</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={messageTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "1px solid #f1f5f9", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                labelStyle={{ fontSize: "0.75rem", color: "#64748b" }}
              />
              <Bar dataKey="count" fill="#E09100" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Tables Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>

        {/* Recent Consultations */}
        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #f1f5f9", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", overflow: "hidden" }}>
          <div style={{ padding: "1.1rem 1.4rem", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontWeight: 700, fontSize: "0.88rem", color: "#111113" }}>Recent Consultations</span>
            <span style={{ fontSize: "0.75rem", color: "#6366f1", fontWeight: 600, cursor: "pointer" }}>View all →</span>
          </div>
          {consultations.length === 0 ? (
            <div style={{ padding: "2rem", textAlign: "center", color: "#94a3b8", fontSize: "0.82rem" }}>No consultations yet</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {["Student", "Country", "Status", "Date"].map((h) => (
                    <th key={h} style={{ padding: "0.6rem 1rem", fontSize: "0.72rem", fontWeight: 600, color: "#94a3b8", textAlign: "left", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {consultations.map((c, i) => (
                  <tr key={c.id} style={{ borderTop: i > 0 ? "1px solid #f8fafc" : "none" }}>
                    <td style={{ padding: "0.75rem 1rem", fontSize: "0.82rem", color: "#111113", fontWeight: 500 }}>{c.studentName}</td>
                    <td style={{ padding: "0.75rem 1rem", fontSize: "0.82rem", color: "#475569" }}>{c.targetCountry}</td>
                    <td style={{ padding: "0.75rem 1rem" }}><StatusBadge status={c.status} /></td>
                    <td style={{ padding: "0.75rem 1rem", fontSize: "0.78rem", color: "#94a3b8" }}>{c.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Recent Messages */}
        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #f1f5f9", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", overflow: "hidden" }}>
          <div style={{ padding: "1.1rem 1.4rem", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontWeight: 700, fontSize: "0.88rem", color: "#111113" }}>Recent Messages</span>
            <span style={{ fontSize: "0.75rem", color: "#E09100", fontWeight: 600, cursor: "pointer" }}>View all →</span>
          </div>
          {messages.length === 0 ? (
            <div style={{ padding: "2rem", textAlign: "center", color: "#94a3b8", fontSize: "0.82rem" }}>No messages yet</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {["Name", "Country", "Status", "Date"].map((h) => (
                    <th key={h} style={{ padding: "0.6rem 1rem", fontSize: "0.72rem", fontWeight: 600, color: "#94a3b8", textAlign: "left", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {messages.map((m, i) => (
                  <tr key={m.id} style={{ borderTop: i > 0 ? "1px solid #f8fafc" : "none" }}>
                    <td style={{ padding: "0.75rem 1rem", fontSize: "0.82rem", color: "#111113", fontWeight: 500 }}>{m.name}</td>
                    <td style={{ padding: "0.75rem 1rem", fontSize: "0.82rem", color: "#475569" }}>{m.country || "—"}</td>
                    <td style={{ padding: "0.75rem 1rem" }}><StatusBadge status={m.status} /></td>
                    <td style={{ padding: "0.75rem 1rem", fontSize: "0.78rem", color: "#94a3b8" }}>
                      {new Date(m.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}
