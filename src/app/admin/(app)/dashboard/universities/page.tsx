"use client";
import React, { useEffect, useCallback, useState } from "react";

interface University {
  id: number;
  name: string;
  country: string;
  location: string;
  courses: number;
  tuitionMin: number;
  tuitionMax: number;
  acceptanceRate: string;
  rank: number;
  subjectAreas: string[];
  isOfficialPartner: boolean;
  image: string;
  description: string;
  established: number;
  popularPrograms: string[];
  requirements: string[];
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

function UniversityForm({ university, onSubmit, onCancel }: {
  university: Partial<University> | null;
  onSubmit: () => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    name: university?.name || "",
    country: university?.country || "",
    location: university?.location || "",
    courses: String(university?.courses ?? 0),
    tuitionMin: String(university?.tuitionMin ?? 0),
    tuitionMax: String(university?.tuitionMax ?? 0),
    acceptanceRate: university?.acceptanceRate || "",
    rank: String(university?.rank ?? 0),
    established: String(university?.established ?? 0),
    image: university?.image || "",
    description: university?.description || "",
    subjectAreas: university?.subjectAreas?.join(", ") || "",
    popularPrograms: university?.popularPrograms?.join(", ") || "",
    requirements: university?.requirements?.join(", ") || "",
    isOfficialPartner: university?.isOfficialPartner ?? false,
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
        courses: Number(form.courses),
        tuitionMin: Number(form.tuitionMin),
        tuitionMax: Number(form.tuitionMax),
        rank: Number(form.rank),
        established: Number(form.established),
        subjectAreas: form.subjectAreas.split(",").map((s) => s.trim()).filter(Boolean),
        popularPrograms: form.popularPrograms.split(",").map((s) => s.trim()).filter(Boolean),
        requirements: form.requirements.split(",").map((s) => s.trim()).filter(Boolean),
      };

      const url = university?.id ? `/api/universities` : "/api/universities";
      const method = university?.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(university?.id ? { ...body, id: university.id } : body),
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
        <Field label="Name" required><input type="text" value={form.name} onChange={set("name")} required style={inputStyle} /></Field>
        <Field label="Country" required><input type="text" value={form.country} onChange={set("country")} required style={inputStyle} /></Field>
        <Field label="Location" required><input type="text" value={form.location} onChange={set("location")} required style={inputStyle} /></Field>
        <Field label="Rank"><input type="number" value={form.rank} onChange={set("rank")} style={inputStyle} /></Field>
        <Field label="Courses"><input type="number" value={form.courses} onChange={set("courses")} style={inputStyle} /></Field>
        <Field label="Established"><input type="number" value={form.established} onChange={set("established")} style={inputStyle} /></Field>
        <Field label="Tuition Min (USD)"><input type="number" value={form.tuitionMin} onChange={set("tuitionMin")} style={inputStyle} /></Field>
        <Field label="Tuition Max (USD)"><input type="number" value={form.tuitionMax} onChange={set("tuitionMax")} style={inputStyle} /></Field>
        <Field label="Acceptance Rate"><input type="text" value={form.acceptanceRate} onChange={set("acceptanceRate")} placeholder="e.g. ~15%" style={inputStyle} /></Field>
        <Field label="Image URL"><input type="text" value={form.image} onChange={set("image")} placeholder="https://..." style={inputStyle} /></Field>
        <Field label="Subject Areas" style={{ gridColumn: "1 / -1" }}><textarea value={form.subjectAreas} onChange={set("subjectAreas")} placeholder="Arts, Science, Business" rows={2} style={{ ...inputStyle, minHeight: "60px", resize: "vertical" }} /></Field>
        <Field label="Popular Programs" style={{ gridColumn: "1 / -1" }}><textarea value={form.popularPrograms} onChange={set("popularPrograms")} placeholder="Computer Science, Engineering" rows={2} style={{ ...inputStyle, minHeight: "60px", resize: "vertical" }} /></Field>
        <Field label="Requirements" style={{ gridColumn: "1 / -1" }}><textarea value={form.requirements} onChange={set("requirements")} placeholder="IELTS 6.5+, GPA 3.0+" rows={2} style={{ ...inputStyle, minHeight: "60px", resize: "vertical" }} /></Field>
        <Field label="Description" style={{ gridColumn: "1 / -1" }}><textarea value={form.description} onChange={set("description")} placeholder="Short description..." rows={3} style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} /></Field>
      </div>
      <div style={{ marginBottom: "1.25rem", marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "8px" }}>
        <input type="checkbox" id="isOfficialPartner" checked={form.isOfficialPartner} onChange={set("isOfficialPartner")} style={{ accentColor: "#E09100" }} />
        <label htmlFor="isOfficialPartner" style={{ fontSize: "0.82rem", color: "#111113", cursor: "pointer" }}>Official Partner</label>
      </div>
      <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
        <button type="button" onClick={onCancel} style={{ padding: "8px 16px", borderRadius: "10px", border: "1px solid #e2e8f0", background: "#fff", color: "#64748b", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer" }}>Cancel</button>
        <button type="submit" disabled={submitting} style={{ padding: "8px 16px", borderRadius: "10px", border: "none", background: "#E09100", color: "#fff", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", opacity: submitting ? 0.6 : 1 }}>{submitting ? "Saving..." : "Save"}</button>
      </div>
    </form>
  );
}

export default function UniversitiesPage() {
  const [all, setAll] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterCountry, setFilterCountry] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<University | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<University | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/universities");
      const data = await res.json();
      if (data.status === "success") setAll(data.data);
      else setError(data.message || "Failed to load");
    } catch { setError("Network error"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const countries = ["All", ...Array.from(new Set(all.map((u) => u.country))).sort()];

  const filtered = all.filter((u) => {
    const matchCountry = filterCountry === "All" || u.country === filterCountry;
    const q = search.toLowerCase();
    return matchCountry && (!q || u.name.toLowerCase().includes(q) || u.country.toLowerCase().includes(q) || u.location.toLowerCase().includes(q));
  });

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    await fetch(`/api/universities?id=${deleteConfirm.id}`, { method: "DELETE" });
    setDeleteConfirm(null);
    load();
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
      <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#111113", margin: 0 }}>Universities</h1>
          <p style={{ fontSize: "0.82rem", color: "#64748b", marginTop: "4px" }}>{all.length} total universit{all.length !== 1 ? "ies" : "y"}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "0 0.75rem", height: "38px", minWidth: "220px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input type="text" placeholder="Search university, country…" value={search} onChange={(e) => setSearch(e.target.value)} style={{ border: "none", outline: "none", fontSize: "0.82rem", color: "#1e293b", background: "transparent", width: "100%" }} />
        </div>
        <button
          onClick={() => { setEditing(null); setShowModal(true); }}
          style={{ padding: "8px 18px", borderRadius: "10px", border: "none", background: "#E09100", color: "#fff", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Add University
        </button>
      </div>

      {/* Country Filter */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
        {countries.map((c) => (
          <button key={c} onClick={() => setFilterCountry(c)}
            style={{ padding: "6px 14px", borderRadius: "8px", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", border: filterCountry === c ? "2px solid #6366f1" : "2px solid #e2e8f0", background: filterCountry === c ? "#eef2ff" : "#fff", color: filterCountry === c ? "#6366f1" : "#64748b", transition: "all 0.15s ease" }}>
            {c}
          </button>
        ))}
      </div>

      <div style={{
        background: "#fff", borderRadius: "16px",
        border: "1px solid #f1f5f9", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", overflow: "hidden",
      }}>
        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "#94a3b8" }}>Loading…</div>
        ) : error ? (
          <div style={{ padding: "2rem", color: "#dc2626" }}>Error: {error}</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "#94a3b8" }}>No universities found</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem", padding: "1rem" }}>
            {filtered.map((u) => (
              <div key={u.id} style={{ border: "1px solid #f1f5f9", borderRadius: "14px", overflow: "hidden", background: "transparent", transition: "box-shadow 0.2s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}>
                <div style={{ position: "relative", height: "160px" }}>
                  <img src={u.image} alt={u.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  {u.isOfficialPartner && (
                    <span style={{ position: "absolute", top: "10px", left: "10px", background: "rgba(255,255,255,0.95)", color: "#16a34a", padding: "4px 10px", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 700 }}>Official Partner</span>
                  )}
                </div>
                <div style={{ padding: "1rem" }}>
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#111113", marginBottom: "2px" }}>{u.name}</div>
                  <div style={{ fontSize: "0.72rem", color: "#64748b", marginBottom: "6px" }}>{u.location}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "8px" }}>
                    <span style={{ background: "#f8fafc", color: "#475569", padding: "2px 8px", borderRadius: "6px", fontSize: "0.68rem", fontWeight: 600 }}>Rank #{u.rank}</span>
                    <span style={{ background: "#f8fafc", color: "#475569", padding: "2px 8px", borderRadius: "6px", fontSize: "0.68rem", fontWeight: 600 }}>{u.courses} courses</span>
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginBottom: "10px" }}>
                    ${u.tuitionMin?.toLocaleString()} – ${u.tuitionMax?.toLocaleString()} /yr
                  </div>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button onClick={() => { setEditing(u); setShowModal(true); }} style={{ flex: 1, padding: "6px 10px", borderRadius: "8px", border: "1px solid #e2e8f0", background: "#fff", color: "#475569", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer" }}>Edit</button>
                    <button onClick={() => setDeleteConfirm(u)} style={{ flex: 1, padding: "6px 10px", borderRadius: "8px", border: "1px solid #fecaca", background: "#fff", color: "#dc2626", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer" }}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal open={showModal} onClose={() => { setShowModal(false); setEditing(null); }} title={editing ? "Edit University" : "Add University"}>
        <UniversityForm
          university={editing}
          onSubmit={() => { setShowModal(false); setEditing(null); load(); }}
          onCancel={() => { setShowModal(false); setEditing(null); }}
        />
      </Modal>

      <Modal open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete University">
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
