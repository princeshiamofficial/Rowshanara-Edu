"use client";
import React, { useEffect, useCallback, useState } from "react";

interface Destination {
  id: number;
  name: string;
  code: string;
  region: string;
  cost: string;
  work: string;
  pr: string;
  isPopular: boolean;
  cities: string;
  visaInfo: string;
  color: string;
  image: string;
  gradient: string;
  bullets: string[];
}

function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 40, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>
      <div style={{ background: "#fff", borderRadius: "16px", width: "100%", maxWidth: "640px", margin: "1rem", boxShadow: "0 20px 60px rgba(0,0,0,0.15)", animation: "modalIn 0.2s ease", maxHeight: "90vh", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#111113", margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "#f8fafc", border: "1px solid #f1f5f9", borderRadius: "8px", cursor: "pointer", color: "#64748b", padding: "6px" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
        <div style={{ padding: "1.5rem", overflowY: "auto" }}>{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children, required, style }: { label: string; children: React.ReactNode; required?: boolean; style?: React.CSSProperties }) {
  return (
    <div style={{ marginBottom: "1rem", ...(style as React.CSSProperties) }}>
      <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, color: "#64748b", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {label} {required && <span style={{ color: "#dc2626" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.6rem 0.85rem",
  border: "1px solid #e2e8f0",
  borderRadius: "10px",
  fontSize: "0.85rem",
  outline: "none",
  background: "#fff",
  color: "#111113",
};

function DestinationForm({ destination, onSubmit, onCancel }: {
  destination: Partial<Destination> | null;
  onSubmit: () => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    name: destination?.name || "",
    code: destination?.code || "",
    region: destination?.region || "",
    cost: destination?.cost || "",
    work: destination?.work || "",
    pr: destination?.pr || "",
    isPopular: destination?.isPopular ?? true,
    cities: destination?.cities || "",
    visaInfo: destination?.visaInfo || "",
    color: destination?.color || "#3b82f6",
    image: destination?.image || "",
    gradient: destination?.gradient || "",
    bullets: destination?.bullets?.join(", ") || "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    setForm((prev) => ({ ...prev, [key]: target.type === "checkbox" ? (target as HTMLInputElement).checked : target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const body = {
        ...form,
        bullets: form.bullets.split(",").map((s) => s.trim()).filter(Boolean),
      };

      const url = "/api/destinations";
      const method = destination?.id ? "PUT" : "POST";
      const payload = destination?.id ? { ...body, id: destination.id } : body;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || data.status === "error") {
        setError(data.message || "Something went wrong");
        setSubmitting(false);
        return;
      }

      onSubmit();
    } catch {
      setError("Network error");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div style={{ padding: "0.75rem", background: "#fef2f2", color: "#dc2626", borderRadius: "8px", fontSize: "0.82rem", marginBottom: "1rem" }}>
          {error}
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <Field label="Country Name" required><input type="text" value={form.name} onChange={set("name")} required style={inputStyle} /></Field>
        <Field label="Code" required><input type="text" value={form.code} onChange={set("code")} required placeholder="e.g. GB, US, CA" style={inputStyle} /></Field>
        <Field label="Region"><input type="text" value={form.region} onChange={set("region")} placeholder="Europe, North America..." style={inputStyle} /></Field>
        <Field label="Annual Cost"><input type="text" value={form.cost} onChange={set("cost")} placeholder="$15,000 - $35,000/year" style={inputStyle} /></Field>
        <Field label="Work/Week"><input type="text" value={form.work} onChange={set("work")} placeholder="20 hours/week" style={inputStyle} /></Field>
        <Field label="PR Path"><input type="text" value={form.pr} onChange={set("pr")} placeholder="Yes / No / Via OPT" style={inputStyle} /></Field>
        <Field label="Color"><input type="color" value={form.color} onChange={set("color")} style={{ width: "100%", height: "38px", padding: "2px", borderRadius: "10px", border: "1px solid #e2e8f0", cursor: "pointer" }} /></Field>
        <Field label="Image URL"><input type="text" value={form.image} onChange={set("image")} placeholder="/uk_hero.png" style={inputStyle} /></Field>
        <Field label="Gradient"><input type="text" value={form.gradient} onChange={set("gradient")} placeholder="linear-gradient(135deg, #3b82f6, #1d4ed8)" style={{ gridColumn: "1 / -1" }} /></Field>
        <Field label="Cities" style={{ gridColumn: "1 / -1" }}><input type="text" value={form.cities} onChange={set("cities")} placeholder="London, Oxford, Cambridge" style={inputStyle} /></Field>
        <Field label="Visa Info" style={{ gridColumn: "1 / -1" }}><textarea value={form.visaInfo} onChange={set("visaInfo")} placeholder="Student visa required, processing 3-4 weeks" rows={2} style={{ ...inputStyle, minHeight: "60px", resize: "vertical" }} /></Field>
        <Field label="Bullets (comma separated)" style={{ gridColumn: "1 / -1" }}><textarea value={form.bullets} onChange={set("bullets")} placeholder="World-class education, Strong post-study visa..." rows={2} style={{ ...inputStyle, minHeight: "60px", resize: "vertical" }} /></Field>
      </div>
      <div style={{ marginBottom: "1.25rem", marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "8px" }}>
        <input type="checkbox" id="isPopular" checked={form.isPopular} onChange={set("isPopular")} style={{ accentColor: "#E09100" }} />
        <label htmlFor="isPopular" style={{ fontSize: "0.82rem", color: "#111113", cursor: "pointer" }}>Popular Destination</label>
      </div>
      <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
        <button type="button" onClick={onCancel} style={{ padding: "8px 16px", borderRadius: "10px", border: "1px solid #e2e8f0", background: "#fff", color: "#64748b", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer" }}>Cancel</button>
        <button type="submit" disabled={submitting} style={{ padding: "8px 16px", borderRadius: "10px", border: "none", background: "#E09100", color: "#fff", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", opacity: submitting ? 0.6 : 1 }}>{submitting ? "Saving..." : "Save"}</button>
      </div>
    </form>
  );
}

export default function DestinationsPage() {
  const [all, setAll] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterRegion, setFilterRegion] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Destination | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Destination | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/destinations");
      const data = await res.json();
      if (data.status === "success") setAll(data.data);
      else setError(data.message || "Failed to load");
    } catch { setError("Network error"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const regions = ["All", ...Array.from(new Set(all.map((d) => d.region).filter(Boolean))).sort()];

  const filtered = all.filter((d) => {
    const matchRegion = filterRegion === "All" || d.region === filterRegion;
    const q = search.toLowerCase();
    return matchRegion && (!q || d.name.toLowerCase().includes(q) || d.region?.toLowerCase().includes(q) || d.cities?.toLowerCase().includes(q));
  });

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    await fetch(`/api/destinations?id=${deleteConfirm.id}`, { method: "DELETE" });
    setDeleteConfirm(null);
    load();
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
      <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#111113", margin: 0 }}>Destinations</h1>
          <p style={{ fontSize: "0.82rem", color: "#64748b", marginTop: "4px" }}>{all.length} destination{all.length !== 1 ? "s" : ""}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "0 0.75rem", height: "38px", minWidth: "200px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input type="text" placeholder="Search country, city…" value={search} onChange={(e) => setSearch(e.target.value)} style={{ border: "none", outline: "none", fontSize: "0.82rem", color: "#1e293b", background: "transparent", width: "100%" }} />
        </div>
        <button
          onClick={() => { setEditing(null); setShowModal(true); }}
          style={{ padding: "8px 18px", borderRadius: "10px", border: "none", background: "#E09100", color: "#fff", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Add Destination
        </button>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
        {regions.map((r) => (
          <button key={r} onClick={() => setFilterRegion(r)}
            style={{ padding: "6px 14px", borderRadius: "8px", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", border: filterRegion === r ? "2px solid #6366f1" : "2px solid #e2e8f0", background: filterRegion === r ? "#eef2ff" : "#fff", color: filterRegion === r ? "#6366f1" : "#64748b", transition: "all 0.15s ease" }}>
            {r}
          </button>
        ))}
      </div>

      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #f1f5f9", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", overflow: "hidden" }}>
        {loading ? <div style={{ padding: "3rem", textAlign: "center", color: "#94a3b8" }}>Loading…</div>
          : error ? <div style={{ padding: "2rem", color: "#dc2626" }}>Error: {error}</div>
          : filtered.length === 0 ? <div style={{ padding: "3rem", textAlign: "center", color: "#94a3b8" }}>No destinations found</div>
          : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {["Country", "Region", "Annual Cost", "Work/Week", "PR Path", "Cities", "Popular", ""].map((h) => (
                    <th key={h} style={{ padding: "0.7rem 1rem", fontSize: "0.72rem", fontWeight: 600, color: "#94a3b8", textAlign: "left", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((d, i) => (
                  <tr key={d.id} style={{ borderTop: i > 0 ? "1px solid #f8fafc" : "none" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "")}>
                    <td style={{ padding: "0.85rem 1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "28px", height: "20px", borderRadius: "4px", background: d.color || "#6366f1", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: "0.65rem", color: "#fff", fontWeight: 700 }}>{d.code}</span>
                        </div>
                        <span style={{ fontSize: "0.83rem", fontWeight: 600, color: "#111113" }}>{d.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "0.85rem 1rem", fontSize: "0.82rem", color: "#475569" }}>{d.region || "—"}</td>
                    <td style={{ padding: "0.85rem 1rem", fontSize: "0.78rem", color: "#475569", whiteSpace: "nowrap" }}>{d.cost || "—"}</td>
                    <td style={{ padding: "0.85rem 1rem", fontSize: "0.78rem", color: "#475569" }}>{d.work || "—"}</td>
                    <td style={{ padding: "0.85rem 1rem" }}>
                      {d.pr === "Yes"
                        ? <span style={{ background: "#f0fdf4", color: "#16a34a", padding: "2px 10px", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 600 }}>Yes</span>
                        : <span style={{ color: "#94a3b8", fontSize: "0.75rem" }}>No</span>}
                    </td>
                    <td style={{ padding: "0.85rem 1rem", fontSize: "0.75rem", color: "#64748b" }}>
                      <div style={{ maxWidth: "180px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.cities || "—"}</div>
                    </td>
                    <td style={{ padding: "0.85rem 1rem" }}>
                      {d.isPopular
                        ? <span style={{ background: "#fff7ed", color: "#ea580c", padding: "2px 10px", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 600 }}>🔥 Popular</span>
                        : <span style={{ color: "#94a3b8", fontSize: "0.75rem" }}>—</span>}
                    </td>
                    <td style={{ padding: "0.85rem 1rem", whiteSpace: "nowrap" }}>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button onClick={() => { setEditing(d); setShowModal(true); }} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "5px 10px", cursor: "pointer", color: "#475569", fontSize: "0.72rem", fontWeight: 600 }}>
                          Edit
                        </button>
                        <button onClick={() => setDeleteConfirm(d)} style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "5px 10px", cursor: "pointer", color: "#dc2626", fontSize: "0.72rem", fontWeight: 600 }}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>

      <Modal open={showModal} onClose={() => { setShowModal(false); setEditing(null); }} title={editing ? "Edit Destination" : "Add Destination"}>
        <DestinationForm
          destination={editing}
          onSubmit={() => { setShowModal(false); setEditing(null); load(); }}
          onCancel={() => { setShowModal(false); setEditing(null); }}
        />
      </Modal>

      <Modal open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Destination">
        <div style={{ textAlign: "center", padding: "0.5rem 0" }}>
          <div style={{ fontSize: "0.9rem", color: "#111113", marginBottom: "0.5rem" }}>Are you sure you want to delete <strong>{deleteConfirm?.name}</strong>?</div>
          <div style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: "1.5rem" }}>This action cannot be undone.</div>
          <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
            <button onClick={() => setDeleteConfirm(null)} style={{ padding: "8px 18px", borderRadius: "10px", border: "1px solid #e2e8f0", background: "#fff", color: "#64748b", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer" }}>Cancel</button>
            <button onClick={handleDelete} style={{ padding: "8px 18px", borderRadius: "10px", border: "none", background: "#dc2626", color: "#fff", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer" }}>Delete</button>
          </div>
        </div>
      </Modal>

      <style jsx>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
