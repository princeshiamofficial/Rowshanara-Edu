"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, Edit2, Mail, MapPin, MessageCircle, Phone, Save, X } from "lucide-react";
import { toast, Toaster } from "sonner";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface ContactItem {
  id: number;
  section: string;
  itemKey: string;
  title: string;
  body: string;
  value: string;
  linkUrl: string;
  metadata: Record<string, unknown>;
  sortOrder: number;
  isActive: boolean;
}

interface ContactForm {
  title: string;
  body: string;
  value: string;
  linkUrl: string;
  icon: string;
}

const iconOptions = [
  { value: "location", label: "Location", icon: <MapPin size={16} /> },
  { value: "phone", label: "Phone", icon: <Phone size={16} /> },
  { value: "email", label: "Email", icon: <Mail size={16} /> },
  { value: "clock", label: "Clock", icon: <Clock size={16} /> },
  { value: "whatsapp", label: "WhatsApp", icon: <MessageCircle size={16} /> },
];

const iconMap: Record<string, React.ReactNode> = {
  location: <MapPin size={18} />,
  phone: <Phone size={18} />,
  email: <Mail size={18} />,
  clock: <Clock size={18} />,
  whatsapp: <MessageCircle size={18} />,
};

function getIconName(item: ContactItem) {
  return typeof item.metadata?.icon === "string" ? item.metadata.icon : "location";
}

export default function AdminContactDetailsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Contact Details");
  const [items, setItems] = useState<ContactItem[]>([]);
  const [editingItem, setEditingItem] = useState<ContactItem | null>(null);
  const [form, setForm] = useState<ContactForm>({
    title: "",
    body: "",
    value: "",
    linkUrl: "",
    icon: "location",
  });

  const fetchItems = () => {
    fetch("/api/content?section=contact_information&includeInactive=true")
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          const sorted = (res.data || []).sort(
            (a: ContactItem, b: ContactItem) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0)
          );
          setItems(sorted);
        } else {
          toast.error(res.message || "Failed to load contact details.");
        }
      })
      .catch(() => toast.error("Failed to load contact details."));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openEdit = (item: ContactItem) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      body: item.body || "",
      value: item.value || "",
      linkUrl: item.linkUrl || "",
      icon: getIconName(item),
    });
  };

  const closeEdit = () => {
    setEditingItem(null);
    setForm({ title: "", body: "", value: "", linkUrl: "", icon: "location" });
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editingItem) return;

    const payload = {
      ...editingItem,
      title: form.title,
      body: form.body,
      value: form.value,
      linkUrl: form.linkUrl,
      metadata: {
        ...editingItem.metadata,
        icon: form.icon,
      },
    };

    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.status === "success") {
        toast.success("Contact details updated.");
        closeEdit();
        fetchItems();
      } else {
        toast.error(data.message || "Failed to save contact details.");
      }
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || "Failed to save contact details.");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", width: "100vw", backgroundColor: "#f8fafc", color: "#0f172a", fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
      <Toaster position="top-right" />
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => router.push("/admin")} />

      <main style={{ flexGrow: 1, padding: "2.5rem 3rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
        <header>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, margin: 0 }}>Contact Details</h1>
          <p style={{ fontSize: "0.875rem", color: "#64748b", margin: "0.2rem 0 0 0" }}>
            Update the contact information shown on the public Contact page.
          </p>
        </header>

        <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "1.5rem", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.01)" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f1f5f9", color: "#64748b", fontWeight: 700 }}>
                  <th style={{ padding: "1rem 0.5rem", width: "70px" }}>Icon</th>
                  <th style={{ padding: "1rem 0.5rem", width: "220px" }}>Title</th>
                  <th style={{ padding: "1rem 0.5rem" }}>Details</th>
                  <th style={{ padding: "1rem 0.5rem", width: "180px" }}>Value</th>
                  <th style={{ padding: "1rem 0.5rem", textAlign: "center", width: "100px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const iconName = getIconName(item);
                  return (
                    <tr key={item.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "1rem 0.5rem" }}>
                        <div style={{ width: "42px", height: "42px", borderRadius: "12px", backgroundColor: "rgba(224,145,0,0.1)", color: "#E09100", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {iconMap[iconName] || iconMap.location}
                        </div>
                      </td>
                      <td style={{ padding: "1rem 0.5rem", fontWeight: 700 }}>{item.title}</td>
                      <td style={{ padding: "1rem 0.5rem", color: "#475569", whiteSpace: "pre-line", lineHeight: 1.6 }}>{item.body}</td>
                      <td style={{ padding: "1rem 0.5rem", color: "#64748b" }}>{item.value || item.linkUrl || "-"}</td>
                      <td style={{ padding: "1rem 0.5rem", textAlign: "center" }}>
                        <button
                          onClick={() => openEdit(item)}
                          style={{ background: "transparent", border: "none", color: "#3b82f6", cursor: "pointer", padding: "0.35rem", borderRadius: "6px" }}
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {editingItem && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15,23,42,0.4)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", width: "100%", maxWidth: "560px", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.5rem", borderBottom: "1px solid #f1f5f9" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0 }}>Edit Contact Detail</h3>
              <button onClick={closeEdit} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#64748b" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.775rem", fontWeight: 700, color: "#475569", marginBottom: "0.4rem" }}>Title</label>
                <input
                  required
                  value={form.title}
                  onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                  style={{ width: "100%", padding: "0.6rem 0.8rem", border: "1px solid #cbd5e1", borderRadius: "8px", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.775rem", fontWeight: 700, color: "#475569", marginBottom: "0.4rem" }}>Details</label>
                <textarea
                  value={form.body}
                  onChange={(event) => setForm((current) => ({ ...current, body: event.target.value }))}
                  rows={5}
                  style={{ width: "100%", padding: "0.6rem 0.8rem", border: "1px solid #cbd5e1", borderRadius: "8px", outline: "none", resize: "vertical", fontFamily: "var(--font-sans), sans-serif", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.775rem", fontWeight: 700, color: "#475569", marginBottom: "0.4rem" }}>Value</label>
                  <input
                    value={form.value}
                    onChange={(event) => setForm((current) => ({ ...current, value: event.target.value }))}
                    placeholder="e.g. +8801511710730"
                    style={{ width: "100%", padding: "0.6rem 0.8rem", border: "1px solid #cbd5e1", borderRadius: "8px", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.775rem", fontWeight: 700, color: "#475569", marginBottom: "0.4rem" }}>Link URL</label>
                  <input
                    value={form.linkUrl}
                    onChange={(event) => setForm((current) => ({ ...current, linkUrl: event.target.value }))}
                    placeholder="https://wa.me/..."
                    style={{ width: "100%", padding: "0.6rem 0.8rem", border: "1px solid #cbd5e1", borderRadius: "8px", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.775rem", fontWeight: 700, color: "#475569", marginBottom: "0.4rem" }}>Icon</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {iconOptions.map((option) => {
                    const isSelected = form.icon === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setForm((current) => ({ ...current, icon: option.value }))}
                        style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 0.75rem", borderRadius: "8px", border: `1px solid ${isSelected ? "#E09100" : "#e2e8f0"}`, backgroundColor: isSelected ? "#fff7ed" : "#ffffff", color: isSelected ? "#E09100" : "#475569", cursor: "pointer", fontWeight: 700, fontSize: "0.8rem" }}
                      >
                        {option.icon}
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "0.25rem" }}>
                <button type="button" onClick={closeEdit} style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff", color: "#475569", fontSize: "0.875rem", fontWeight: 700, cursor: "pointer" }}>
                  Cancel
                </button>
                <button type="submit" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.6rem 1.2rem", borderRadius: "8px", border: "none", backgroundColor: "#E09100", color: "#ffffff", fontSize: "0.875rem", fontWeight: 800, cursor: "pointer" }}>
                  <Save size={15} />
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
