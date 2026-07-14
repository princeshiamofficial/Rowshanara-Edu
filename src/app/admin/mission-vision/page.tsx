"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Edit2, Image as ImageIcon, Save, Target, Trash2, X } from "lucide-react";
import { toast, Toaster } from "sonner";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface MvvItem {
  id: number;
  section: string;
  itemKey: string;
  title: string;
  body: string;
  imageUrl: string;
  metadata: Record<string, unknown>;
  sortOrder: number;
  isActive: boolean;
}

interface MvvForm {
  title: string;
  body: string;
  imageUrl: string;
}

const emptyForm: MvvForm = {
  title: "",
  body: "",
  imageUrl: "",
};

export default function AdminMissionVisionPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Mission & Vision");
  const [items, setItems] = useState<MvvItem[]>([]);
  const [editingItem, setEditingItem] = useState<MvvItem | null>(null);
  const [form, setForm] = useState<MvvForm>(emptyForm);
  const [isUploading, setIsUploading] = useState(false);

  const fetchItems = () => {
    fetch("/api/content?section=mission_vision_values&includeInactive=true")
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          const sorted = (res.data || []).sort(
            (a: MvvItem, b: MvvItem) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0)
          );
          setItems(sorted);
        } else {
          toast.error(res.message || "Failed to load mission and vision content.");
        }
      })
      .catch(() => toast.error("Failed to load mission and vision content."));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openEdit = (item: MvvItem) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      body: item.body || "",
      imageUrl: item.imageUrl || "",
    });
  };

  const closeEdit = () => {
    setEditingItem(null);
    setForm(emptyForm);
    setIsUploading(false);
  };

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const result = await res.json();

      if (result.status === "success") {
        setForm((current) => ({ ...current, imageUrl: result.data.url }));
        toast.success("Image uploaded.");
      } else {
        toast.error(result.message || "Image upload failed.");
      }
    } catch {
      toast.error("Image upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editingItem) return;

    const payload = {
      ...editingItem,
      title: form.title,
      body: form.body,
      imageUrl: form.imageUrl,
    };

    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.status === "success") {
        toast.success("Mission & Vision content updated.");
        closeEdit();
        fetchItems();
      } else {
        toast.error(data.message || "Failed to save content.");
      }
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || "Failed to save content.");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", width: "100vw", backgroundColor: "#f8fafc", color: "#0f172a", fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
      <Toaster position="top-right" />
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => router.push("/admin")} />

      <main style={{ flexGrow: 1, padding: "2.5rem 3rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
        <header>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, margin: 0 }}>Mission & Vision</h1>
          <p style={{ fontSize: "0.875rem", color: "#64748b", margin: "0.2rem 0 0 0" }}>
            Update the Mission, Vision, and Values cards shown on the About page.
          </p>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
          {items.map((item) => (
            <div key={item.id} style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "1.25rem", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.01)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginBottom: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ position: "relative", width: "54px", height: "54px", borderRadius: "999px", overflow: "hidden", border: "1px solid #fed7aa", backgroundColor: "#fff7ed", flexShrink: 0 }}>
                    {item.imageUrl ? (
                      <Image src={item.imageUrl} alt={item.title} fill style={{ objectFit: "cover" }} unoptimized />
                    ) : (
                      <Target size={22} style={{ color: "#E09100", margin: "15px auto", display: "block" }} />
                    )}
                  </div>
                  <div>
                    <h2 style={{ fontSize: "1.05rem", fontWeight: 800, margin: 0 }}>{item.title}</h2>
                    <p style={{ color: "#94a3b8", fontSize: "0.75rem", fontWeight: 700, margin: "0.15rem 0 0 0", textTransform: "uppercase" }}>{item.itemKey}</p>
                  </div>
                </div>
                <button
                  onClick={() => openEdit(item)}
                  style={{ background: "transparent", border: "none", color: "#3b82f6", cursor: "pointer", padding: "0.35rem", borderRadius: "6px" }}
                  title="Edit"
                >
                  <Edit2 size={16} />
                </button>
              </div>
              <p style={{ color: "#475569", lineHeight: 1.6, margin: 0, fontSize: "0.9rem" }}>{item.body}</p>
            </div>
          ))}
        </div>
      </main>

      {editingItem && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15,23,42,0.4)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", width: "100%", maxWidth: "560px", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.5rem", borderBottom: "1px solid #f1f5f9" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0 }}>Edit {editingItem.title}</h3>
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
                <label style={{ display: "block", fontSize: "0.775rem", fontWeight: 700, color: "#475569", marginBottom: "0.4rem" }}>Description</label>
                <textarea
                  required
                  value={form.body}
                  onChange={(event) => setForm((current) => ({ ...current, body: event.target.value }))}
                  rows={5}
                  style={{ width: "100%", padding: "0.6rem 0.8rem", border: "1px solid #cbd5e1", borderRadius: "8px", outline: "none", resize: "vertical", fontFamily: "var(--font-sans), sans-serif", boxSizing: "border-box" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.775rem", fontWeight: 700, color: "#475569", marginBottom: "0.4rem" }}>Badge Image</label>
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div style={{ position: "relative", width: "76px", height: "76px", borderRadius: "999px", overflow: "hidden", border: "1px solid #fed7aa", backgroundColor: "#fff7ed", flexShrink: 0 }}>
                    {form.imageUrl ? (
                      <Image src={form.imageUrl} alt="Preview" fill style={{ objectFit: "cover" }} unoptimized />
                    ) : (
                      <ImageIcon size={26} style={{ color: "#E09100", margin: "24px auto", display: "block" }} />
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                    <label style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "#E09100", fontWeight: 800, fontSize: "0.8rem", cursor: "pointer" }}>
                      <ImageIcon size={14} />
                      <span>{isUploading ? "Uploading..." : "Upload image"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={isUploading}
                        style={{ display: "none" }}
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (file) uploadImage(file);
                        }}
                      />
                    </label>
                    {form.imageUrl && (
                      <button
                        type="button"
                        onClick={() => setForm((current) => ({ ...current, imageUrl: "" }))}
                        style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "#ef4444", background: "transparent", border: "none", fontWeight: 700, fontSize: "0.75rem", padding: 0, cursor: "pointer" }}
                      >
                        <Trash2 size={13} />
                        Remove image
                      </button>
                    )}
                  </div>
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
