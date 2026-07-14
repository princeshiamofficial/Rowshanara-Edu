"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, GripVertical, Milestone, Pencil, Plus, Trash2, X } from "lucide-react";
import { toast, Toaster } from "sonner";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface JourneyItem {
  id?: number;
  section: string;
  itemKey: string;
  title: string;
  body: string;
  value: string;
  sortOrder: number;
  isActive: boolean;
}

interface JourneyForm {
  value: string;
  title: string;
  body: string;
}

const emptyForm: JourneyForm = {
  value: "",
  title: "",
  body: "",
};

function makeItemKey(title: string, year: string) {
  const base = `${year}_${title}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  return `journey_${base || "item"}_${Date.now()}`;
}

export default function AdminJourneyPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Our Journey");
  const [items, setItems] = useState<JourneyItem[]>([]);
  const [form, setForm] = useState<JourneyForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const fetchItems = () => {
    fetch("/api/content?section=journey")
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success" && Array.isArray(res.data)) {
          const sorted = [...res.data].sort(
            (a: JourneyItem, b: JourneyItem) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0)
          );
          setItems(sorted);
        } else {
          toast.error(res.message || "Failed to load journey items.");
        }
      })
      .catch(() => toast.error("Failed to load journey items."));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleEdit = (item: JourneyItem) => {
    setEditingId(item.id || null);
    setForm({
      value: item.value,
      title: item.title,
      body: item.body,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const existingItem = editingId ? items.find((item) => item.id === editingId) : undefined;
    const nextSortOrder = existingItem?.sortOrder ?? Math.max(...items.map((item) => item.sortOrder), 0) + 1;

    const payload: JourneyItem = {
      id: editingId || undefined,
      section: "journey",
      itemKey: existingItem?.itemKey || makeItemKey(form.title, form.value),
      title: form.title.trim(),
      body: form.body.trim(),
      value: form.value.trim(),
      sortOrder: nextSortOrder,
      isActive: true,
    };

    try {
      const res = await fetch("/api/content", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.status === "success") {
        toast.success(editingId ? "Journey item updated." : "Journey item added.");
        closeModal();
        fetchItems();
      } else {
        toast.error(data.message || "Failed to save journey item.");
      }
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || "Failed to save journey item.");
    }
  };

  const handleDelete = async (itemToDelete: JourneyItem) => {
    if (!confirm("Delete this journey item?")) return;
    if (!itemToDelete.id) return;

    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...itemToDelete,
          isActive: false,
        }),
      });
      const data = await res.json();

      if (data.status === "success") {
        toast.success("Journey item deleted.");
        fetchItems();
      } else {
        toast.error(data.message || "Failed to delete journey item.");
      }
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || "Failed to delete journey item.");
    }
  };

  const handleDragStart = (event: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDropRow = async (event: React.DragEvent, targetIndex: number) => {
    event.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const reordered = [...items];
    const [draggedItem] = reordered.splice(draggedIndex, 1);
    reordered.splice(targetIndex, 0, draggedItem);

    const orderedItems = reordered.map((item, index) => ({
      ...item,
      sortOrder: index + 1,
    }));

    setItems(orderedItems);
    setDraggedIndex(null);

    const loadingToast = toast.loading("Saving order...");
    try {
      await Promise.all(
        orderedItems.map((item) =>
          fetch("/api/content", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
          })
        )
      );
      toast.dismiss(loadingToast);
      toast.success("Journey order updated.");
      fetchItems();
    } catch {
      toast.dismiss(loadingToast);
      toast.error("Failed to save journey order.");
      fetchItems();
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.6rem 0.8rem",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    outline: "none",
    fontSize: "0.875rem",
    boxSizing: "border-box",
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", width: "100vw", backgroundColor: "#f8fafc", color: "#0f172a", fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
      <Toaster position="top-right" />
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => router.push("/admin")} />

      <main style={{ flexGrow: 1, padding: "2.5rem 3rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 800, margin: 0 }}>Our Journey</h1>
            <p style={{ fontSize: "0.875rem", color: "#64748b", margin: "0.2rem 0 0 0" }}>
              Manage the milestones shown on the public About page.
            </p>
          </div>

          <button
            onClick={openAddModal}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#E09100", color: "#ffffff", padding: "0.6rem 1.2rem", borderRadius: "10px", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", border: "none", boxShadow: "0 2px 8px rgba(224, 145, 0, 0.25)" }}
          >
            <Plus size={16} />
            <span>Add Journey</span>
          </button>
        </header>

        <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "1.5rem", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.01)" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f1f5f9", color: "#64748b", fontWeight: 700 }}>
                  <th style={{ padding: "1rem 0.5rem", width: "40px" }}></th>
                  <th style={{ padding: "1rem 0.5rem", width: "100px" }}>Year</th>
                  <th style={{ padding: "1rem 0.5rem" }}>Milestone</th>
                  <th style={{ padding: "1rem 0.5rem" }}>Description</th>
                  <th style={{ padding: "1rem 0.5rem", textAlign: "center", width: "120px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", padding: "3rem 1rem", color: "#94a3b8" }}>
                      <Milestone size={40} style={{ margin: "0 auto 1rem auto", opacity: 0.5 }} />
                      <div>No journey items found.</div>
                    </td>
                  </tr>
                ) : (
                  items.map((item, index) => (
                    <tr
                      key={item.id || item.itemKey}
                      draggable
                      onDragStart={(event) => handleDragStart(event, index)}
                      onDragOver={handleDragOver}
                      onDrop={(event) => handleDropRow(event, index)}
                      style={{ borderBottom: "1px solid #f1f5f9", backgroundColor: draggedIndex === index ? "#f8fafc" : "#ffffff", transition: "background-color 0.2s", cursor: "grab" }}
                    >
                      <td style={{ padding: "1rem 0.5rem", color: "#94a3b8", verticalAlign: "middle" }}>
                        <GripVertical size={16} />
                      </td>
                      <td style={{ padding: "1rem 0.5rem", fontWeight: 800, color: "#E09100" }}>{item.value}</td>
                      <td style={{ padding: "1rem 0.5rem", fontWeight: 700 }}>{item.title}</td>
                      <td style={{ padding: "1rem 0.5rem", color: "#475569" }}>{item.body}</td>
                      <td style={{ padding: "1rem 0.5rem", textAlign: "center" }}>
                        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}>
                          <button onClick={() => handleEdit(item)} style={{ padding: "0.4rem", border: "1px solid #e2e8f0", borderRadius: "6px", background: "transparent", cursor: "pointer", color: "#475569" }} title="Edit">
                            <Pencil size={14} />
                          </button>
                          <button onClick={() => handleDelete(item)} style={{ padding: "0.4rem", border: "1px solid #fee2e2", borderRadius: "6px", background: "transparent", cursor: "pointer", color: "#ef4444" }} title="Delete">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15,23,42,0.4)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", width: "100%", maxWidth: "520px", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.5rem", borderBottom: "1px solid #f1f5f9" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Calendar size={18} color="#E09100" />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0 }}>
                  {editingId ? "Edit Journey Item" : "Add Journey Item"}
                </h3>
              </div>
              <button onClick={closeModal} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#64748b" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.775rem", fontWeight: 600, color: "#475569", marginBottom: "0.4rem" }}>Year</label>
                <input required type="text" placeholder="e.g. 2024" value={form.value} onChange={(event) => setForm((current) => ({ ...current, value: event.target.value }))} style={inputStyle} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.775rem", fontWeight: 600, color: "#475569", marginBottom: "0.4rem" }}>Milestone Title</label>
                <input required type="text" placeholder="e.g. Industry Leader" value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} style={inputStyle} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.775rem", fontWeight: 600, color: "#475569", marginBottom: "0.4rem" }}>Description</label>
                <textarea required placeholder="Describe this milestone..." value={form.body} onChange={(event) => setForm((current) => ({ ...current, body: event.target.value }))} rows={4} style={{ ...inputStyle, resize: "vertical", fontFamily: "var(--font-sans), sans-serif" }} />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "0.25rem" }}>
                <button type="button" onClick={closeModal} style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff", color: "#475569", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer" }}>
                  Cancel
                </button>
                <button type="submit" style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", border: "none", backgroundColor: "#E09100", color: "#ffffff", fontSize: "0.875rem", fontWeight: 700, cursor: "pointer" }}>
                  {editingId ? "Save Changes" : "Add Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
