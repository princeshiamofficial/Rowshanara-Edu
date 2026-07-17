"use client";
import React, { useEffect, useState, useCallback } from "react";

interface Testimonial {
  id: number;
  studentName: string;
  photoUrl: string;
  rating: number;
  comment: string;
  isFeatured: boolean;
  createdAt: string;
}

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ color: "#f59e0b", fontSize: "0.85rem", letterSpacing: "1px" }}>
      {"★".repeat(rating)}{"☆".repeat(5 - rating)}
    </span>
  );
}

export default function TestimonialsPage() {
  const [all, setAll] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      if (data.status === "success") setAll(data.data);
      else setError(data.message || "Failed to load");
    } catch { setError("Network error"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function toggleFeatured(id: number, current: boolean) {
    await fetch("/api/testimonials", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, isFeatured: !current }) });
    setAll((prev) => prev.map((t) => t.id === id ? { ...t, isFeatured: !current } : t));
  }

  async function deleteTestimonial(id: number) {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`/api/testimonials?id=${id}`, { method: "DELETE" });
    setAll((prev) => prev.filter((t) => t.id !== id));
  }

  const filtered = all.filter((t) => {
    const matchFilter = filter === "All" || (filter === "Featured" && t.isFeatured) || (filter === "Regular" && !t.isFeatured);
    const q = search.toLowerCase();
    return matchFilter && (!q || t.studentName.toLowerCase().includes(q) || t.comment.toLowerCase().includes(q));
  });

  const counts = { All: all.length, Featured: all.filter((t) => t.isFeatured).length, Regular: all.filter((t) => !t.isFeatured).length };

  return (
    <div style={{ padding: "2rem", fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
      <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#111113", margin: 0 }}>Testimonials</h1>
          <p style={{ fontSize: "0.82rem", color: "#64748b", marginTop: "4px" }}>{all.length} total review{all.length !== 1 ? "s" : ""}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "0 0.75rem", height: "38px", minWidth: "200px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input type="text" placeholder="Search student, review…" value={search} onChange={(e) => setSearch(e.target.value)} style={{ border: "none", outline: "none", fontSize: "0.82rem", color: "#1e293b", background: "transparent", width: "100%" }} />
        </div>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem" }}>
        {(["All", "Featured", "Regular"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: "6px 14px", borderRadius: "8px", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", border: filter === f ? "2px solid #f59e0b" : "2px solid #e2e8f0", background: filter === f ? "#fffbeb" : "#fff", color: filter === f ? "#d97706" : "#64748b", transition: "all 0.15s ease" }}>
            {f} <span style={{ opacity: 0.7, fontWeight: 400 }}>({counts[f]})</span>
          </button>
        ))}
      </div>

      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #f1f5f9", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", overflow: "hidden" }}>
        {loading ? <div style={{ padding: "3rem", textAlign: "center", color: "#94a3b8" }}>Loading…</div>
          : error ? <div style={{ padding: "2rem", color: "#dc2626" }}>Error: {error}</div>
          : filtered.length === 0 ? <div style={{ padding: "3rem", textAlign: "center", color: "#94a3b8" }}>No testimonials found</div>
          : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {["Student", "Rating", "Review", "Featured", "Date", "Actions"].map((h) => (
                    <th key={h} style={{ padding: "0.7rem 1rem", fontSize: "0.72rem", fontWeight: 600, color: "#94a3b8", textAlign: "left", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((t, i) => (
                  <tr key={t.id} style={{ borderTop: i > 0 ? "1px solid #f8fafc" : "none" }}>
                    <td style={{ padding: "0.85rem 1rem" }}>
                      <div style={{ fontSize: "0.83rem", fontWeight: 600, color: "#111113" }}>{t.studentName}</div>
                    </td>
                    <td style={{ padding: "0.85rem 1rem" }}><Stars rating={t.rating} /></td>
                    <td style={{ padding: "0.85rem 1rem", fontSize: "0.8rem", color: "#475569", maxWidth: "300px" }}>
                      <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.comment}</div>
                    </td>
                    <td style={{ padding: "0.85rem 1rem" }}>
                      <button onClick={() => toggleFeatured(t.id, t.isFeatured)}
                        style={{ padding: "3px 12px", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 600, border: "none", cursor: "pointer", background: t.isFeatured ? "#fffbeb" : "#f8fafc", color: t.isFeatured ? "#d97706" : "#94a3b8", transition: "all 0.15s ease" }}>
                        {t.isFeatured ? "⭐ Featured" : "Regular"}
                      </button>
                    </td>
                    <td style={{ padding: "0.85rem 1rem", fontSize: "0.78rem", color: "#94a3b8", whiteSpace: "nowrap" }}>
                      {new Date(t.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" })}
                    </td>
                    <td style={{ padding: "0.85rem 1rem" }}>
                      <button onClick={() => deleteTestimonial(t.id)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", padding: "4px" }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" /></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
    </div>
  );
}
