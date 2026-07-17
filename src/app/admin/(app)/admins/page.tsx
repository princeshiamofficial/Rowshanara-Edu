"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

interface Admin {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  roles: string[];
  roleNames: string[];
}

interface Role {
  id: number;
  name: string;
  slug: string;
}

function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 40, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>
      <div style={{ background: "#fff", borderRadius: "16px", width: "100%", maxWidth: "480px", margin: "1rem", boxShadow: "0 20px 60px rgba(0,0,0,0.15)", animation: "modalIn 0.2s ease" }}>
        <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#111113", margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "#f8fafc", border: "1px solid #f1f5f9", borderRadius: "8px", cursor: "pointer", color: "#64748b", padding: "6px" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
        <div style={{ padding: "1.5rem" }}>{children}</div>
      </div>
    </div>
  );
}

function AdminForm({ admin, roles, onSubmit, onCancel }: {
  admin: Partial<Admin> | null;
  roles: Role[];
  onSubmit: () => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(admin?.name || "");
  const [email, setEmail] = useState(admin?.email || "");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState<number | null>(admin?.roles?.[0] ? Number(roles.find(r => r.slug === admin.roles![0])?.id || null) : null);
  const [isActive, setIsActive] = useState(admin?.isActive ?? true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setName(admin?.name || "");
    setEmail(admin?.email || "");
    setPassword("");
    setError("");
    setSubmitting(false);
    setOpen(false);
  }, [admin]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedRole = roles.find(r => r.id === roleId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const body: any = { name, email, roleIds: roleId ? [roleId] : [], isActive };
      if (password) body.password = password;

      const url = admin?.id ? `/api/admin/admins/${admin.id}` : "/api/admin/admins";
      const method = admin?.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
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
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, color: "#64748b", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: "100%", padding: "0.6rem 0.85rem", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "0.85rem", outline: "none" }} />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, color: "#64748b", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: "100%", padding: "0.6rem 0.85rem", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "0.85rem", outline: "none" }} />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, color: "#64748b", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Password {admin?.id ? "(leave blank to keep)" : ""}</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required={!admin?.id} style={{ width: "100%", padding: "0.6rem 0.85rem", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "0.85rem", outline: "none" }} />
      </div>
      <div style={{ marginBottom: "1.25rem" }}>
        <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, color: "#64748b", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Role</label>
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            style={{
              width: "100%",
              padding: "0.6rem 0.85rem",
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
              fontSize: "0.85rem",
              background: "#fff",
              color: "#111113",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <span>{selectedRole?.name || "Select a role"}</span>
            <ChevronDown size={16} style={{ color: "#64748b", transition: "transform 0.2s ease", transform: open ? "rotate(180deg)" : "none" }} />
          </button>
          {open && (
            <div style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              marginTop: "4px",
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
              zIndex: 50,
              overflow: "hidden",
              animation: "dropdownIn 0.15s ease",
            }}>
              {roles.map((r) => (
                <div
                  key={r.id}
                  onClick={() => { setRoleId(r.id); setOpen(false); }}
                  style={{
                    padding: "0.6rem 0.85rem",
                    cursor: "pointer",
                    background: roleId === r.id ? "#f8fafc" : "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "0.85rem",
                    color: "#111113",
                    transition: "background 0.15s ease",
                  }}
                  onMouseEnter={(e) => { if (roleId !== r.id) e.currentTarget.style.background = "#fafafa"; }}
                  onMouseLeave={(e) => { if (roleId !== r.id) e.currentTarget.style.background = "#fff"; }}
                >
                  <span>{r.name}</span>
                  {roleId === r.id && <Check size={16} style={{ color: "#E09100" }} />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "8px" }}>
        <input type="checkbox" id="isActive" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} style={{ accentColor: "#E09100" }} />
        <label htmlFor="isActive" style={{ fontSize: "0.82rem", color: "#111113", cursor: "pointer" }}>Active</label>
      </div>
      <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
        <button type="button" onClick={onCancel} style={{ padding: "8px 16px", borderRadius: "10px", border: "1px solid #e2e8f0", background: "#fff", color: "#64748b", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer" }}>Cancel</button>
        <button type="submit" disabled={submitting} style={{ padding: "8px 16px", borderRadius: "10px", border: "none", background: "#E09100", color: "#fff", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", opacity: submitting ? 0.6 : 1 }}>{submitting ? "Saving..." : "Save"}</button>
      </div>
    </form>
  );
}

export default function AdminsPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Admin | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/admins");
      const data = await res.json();
      if (data.status === "success") {
        setAdmins(data.data);
        setRoles(data.roles || []);
      }
    } catch { /* ignore */ }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    await fetch(`/api/admin/admins/${deleteConfirm.id}`, { method: "DELETE" });
    setDeleteConfirm(null);
    load();
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
      <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
        <div>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#111113", margin: 0 }}>Admin Users</h1>
          <p style={{ fontSize: "0.82rem", color: "#64748b", marginTop: "4px" }}>Manage admin accounts and roles</p>
        </div>
        <button
          onClick={() => { setEditingAdmin(null); setShowModal(true); }}
          style={{ padding: "8px 18px", borderRadius: "10px", border: "none", background: "#E09100", color: "#fff", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Add Admin
        </button>
      </div>

      <div style={{
        background: "#fff", borderRadius: "16px",
        border: "1px solid #f1f5f9", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)",
        overflow: "hidden",
      }}>
        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "#94a3b8" }}>Loading...</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["Name", "Email", "Roles", "Status", "Created", ""].map((h) => (
                  <th key={h} style={{ padding: "0.7rem 1rem", fontSize: "0.72rem", fontWeight: 600, color: "#94a3b8", textAlign: "left", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {admins.map((a, i) => (
                <tr key={a.id} style={{ borderTop: i > 0 ? "1px solid #f8fafc" : "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}>
                  <td style={{ padding: "0.85rem 1rem" }}>
                    <div style={{ fontSize: "0.83rem", fontWeight: 600, color: "#111113" }}>{a.name}</div>
                  </td>
                  <td style={{ padding: "0.85rem 1rem", fontSize: "0.82rem", color: "#475569" }}>{a.email}</td>
                  <td style={{ padding: "0.85rem 1rem" }}>
                    <span style={{ background: "#eef2ff", color: "#6366f1", padding: "2px 10px", borderRadius: "999px", fontSize: "0.68rem", fontWeight: 600 }}>
                      {a.roleNames[0] || "No Role"}
                    </span>
                  </td>
                  <td style={{ padding: "0.85rem 1rem" }}>
                    <span style={{
                      display: "inline-block", padding: "3px 12px", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 600,
                      background: a.isActive ? "#f0fdf4" : "#fef2f2", color: a.isActive ? "#16a34a" : "#dc2626",
                    }}>
                      {a.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td style={{ padding: "0.85rem 1rem", fontSize: "0.78rem", color: "#94a3b8", whiteSpace: "nowrap" }}>
                    {new Date(a.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                  </td>
                  <td style={{ padding: "0.85rem 1rem", whiteSpace: "nowrap" }}>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button onClick={() => { setEditingAdmin(a); setShowModal(true); }} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "5px 10px", cursor: "pointer", color: "#475569", fontSize: "0.72rem", fontWeight: 600 }}>
                        Edit
                      </button>
                      <button onClick={() => setDeleteConfirm(a)} style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "5px 10px", cursor: "pointer", color: "#dc2626", fontSize: "0.72rem", fontWeight: 600 }}>
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

      <Modal open={showModal} onClose={() => { setShowModal(false); setEditingAdmin(null); }} title={editingAdmin ? "Edit Admin" : "Add Admin"}>
        <AdminForm
          admin={editingAdmin}
          roles={roles}
          onSubmit={() => { setShowModal(false); setEditingAdmin(null); load(); }}
          onCancel={() => { setShowModal(false); setEditingAdmin(null); }}
        />
      </Modal>

      <Modal open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Admin">
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
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
