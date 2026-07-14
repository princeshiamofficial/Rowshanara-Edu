"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Phone, Search, Trash2, UserRound } from "lucide-react";
import { toast, Toaster } from "sonner";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface ContactMessage {
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

const statuses = ["New", "Contacted", "Closed"];

const statusStyles: Record<string, { bg: string; text: string; border: string }> = {
  New: { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
  Contacted: { bg: "#fff7ed", text: "#c2410c", border: "#fed7aa" },
  Closed: { bg: "#ecfdf5", text: "#047857", border: "#bbf7d0" },
};

export default function AdminContactMessagesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Contact Messages");
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const fetchMessages = () => {
    fetch("/api/contact-messages")
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          setMessages(res.data);
        } else {
          toast.error(res.message || "Failed to load contact messages.");
        }
      })
      .catch(() => toast.error("Failed to load contact messages."));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const filteredMessages = useMemo(() => {
    const query = search.trim().toLowerCase();
    return messages.filter((item) => {
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.phone.toLowerCase().includes(query) ||
        item.country.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [messages, search, statusFilter]);

  const updateStatus = async (message: ContactMessage, status: string) => {
    try {
      const res = await fetch("/api/contact-messages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: message.id, status }),
      });
      const data = await res.json();

      if (data.status === "success") {
        toast.success("Message status updated.");
        fetchMessages();
        setSelectedMessage((current) => current && current.id === message.id ? { ...current, status } : current);
      } else {
        toast.error(data.message || "Failed to update message.");
      }
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || "Failed to update message.");
    }
  };

  const deleteMessage = async (id: number) => {
    if (!confirm("Delete this contact message?")) return;

    try {
      const res = await fetch(`/api/contact-messages?id=${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.status === "success") {
        toast.success("Contact message deleted.");
        setSelectedMessage(null);
        fetchMessages();
      } else {
        toast.error(data.message || "Failed to delete message.");
      }
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || "Failed to delete message.");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", width: "100vw", backgroundColor: "#f8fafc", color: "#0f172a", fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
      <Toaster position="top-right" />
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => router.push("/admin")} />

      <main style={{ flexGrow: 1, padding: "2.5rem 3rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 800, margin: 0 }}>Contact Messages</h1>
            <p style={{ fontSize: "0.875rem", color: "#64748b", margin: "0.2rem 0 0 0" }}>
              View enquiries submitted from the public Contact page.
            </p>
          </div>
          <div style={{ color: "#64748b", fontSize: "0.875rem", fontWeight: 700 }}>
            {filteredMessages.length} of {messages.length} messages
          </div>
        </header>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "0.55rem 0.75rem", minWidth: "280px" }}>
            <Search size={16} color="#94a3b8" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, email, phone..."
              style={{ border: "none", outline: "none", width: "100%", fontSize: "0.875rem", color: "#0f172a" }}
            />
          </div>
          {["All", ...statuses].map((status) => {
            const active = statusFilter === status;
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                style={{ border: "1px solid #e2e8f0", backgroundColor: active ? "#E09100" : "#ffffff", color: active ? "#ffffff" : "#475569", borderRadius: "999px", padding: "0.5rem 0.9rem", fontWeight: 800, fontSize: "0.8rem", cursor: "pointer" }}
              >
                {status}
              </button>
            );
          })}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: selectedMessage ? "minmax(0, 1fr) 420px" : "1fr", gap: "1.25rem", alignItems: "start" }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "1.25rem", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.01)" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.875rem" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #f1f5f9", color: "#64748b", fontWeight: 800 }}>
                    <th style={{ padding: "1rem 0.5rem" }}>Student</th>
                    <th style={{ padding: "1rem 0.5rem" }}>Contact</th>
                    <th style={{ padding: "1rem 0.5rem" }}>Destination</th>
                    <th style={{ padding: "1rem 0.5rem" }}>Services</th>
                    <th style={{ padding: "1rem 0.5rem" }}>Status</th>
                    <th style={{ padding: "1rem 0.5rem" }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMessages.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: "center", padding: "3rem 1rem", color: "#94a3b8" }}>
                        No contact messages found.
                      </td>
                    </tr>
                  ) : filteredMessages.map((item) => {
                    const statusStyle = statusStyles[item.status] || statusStyles.New;
                    return (
                      <tr
                        key={item.id}
                        onClick={() => setSelectedMessage(item)}
                        style={{ borderBottom: "1px solid #f1f5f9", cursor: "pointer", backgroundColor: selectedMessage?.id === item.id ? "#fffbeb" : "#ffffff" }}
                      >
                        <td style={{ padding: "1rem 0.5rem" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                            <div style={{ width: "34px", height: "34px", borderRadius: "999px", backgroundColor: "#fff7ed", color: "#E09100", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <UserRound size={16} />
                            </div>
                            <strong>{item.name}</strong>
                          </div>
                        </td>
                        <td style={{ padding: "1rem 0.5rem", color: "#475569" }}>
                          <div>{item.email}</div>
                          <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "0.15rem" }}>{item.phone}</div>
                        </td>
                        <td style={{ padding: "1rem 0.5rem", color: "#475569" }}>{item.country || "-"}</td>
                        <td style={{ padding: "1rem 0.5rem", color: "#475569" }}>{item.services.length ? item.services.slice(0, 2).join(", ") : "-"}</td>
                        <td style={{ padding: "1rem 0.5rem" }}>
                          <span style={{ display: "inline-block", backgroundColor: statusStyle.bg, color: statusStyle.text, border: `1px solid ${statusStyle.border}`, borderRadius: "999px", padding: "0.25rem 0.6rem", fontWeight: 800, fontSize: "0.75rem" }}>
                            {item.status}
                          </span>
                        </td>
                        <td style={{ padding: "1rem 0.5rem", color: "#64748b", whiteSpace: "nowrap" }}>{new Date(item.createdAt).toLocaleDateString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {selectedMessage && (
            <aside style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "1.25rem", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.01)", position: "sticky", top: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 800 }}>{selectedMessage.name}</h2>
                  <p style={{ margin: "0.25rem 0 0 0", color: "#64748b", fontSize: "0.8rem" }}>{new Date(selectedMessage.createdAt).toLocaleString()}</p>
                </div>
                <button onClick={() => deleteMessage(selectedMessage.id)} style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", padding: "0.25rem" }} title="Delete">
                  <Trash2 size={17} />
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1rem" }}>
                <a href={`mailto:${selectedMessage.email}`} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#0f172a", textDecoration: "none", fontWeight: 700 }}>
                  <Mail size={15} color="#E09100" /> {selectedMessage.email}
                </a>
                <a href={`tel:${selectedMessage.phone}`} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#0f172a", textDecoration: "none", fontWeight: 700 }}>
                  <Phone size={15} color="#E09100" /> {selectedMessage.phone}
                </a>
              </div>

              <label style={{ display: "block", fontSize: "0.775rem", fontWeight: 800, color: "#475569", marginBottom: "0.4rem" }}>Status</label>
              <select
                value={selectedMessage.status}
                onChange={(event) => updateStatus(selectedMessage, event.target.value)}
                style={{ width: "100%", padding: "0.6rem 0.75rem", border: "1px solid #cbd5e1", borderRadius: "8px", outline: "none", marginBottom: "1rem" }}
              >
                {statuses.map((status) => <option key={status}>{status}</option>)}
              </select>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <DetailBlock label="Destination Country" value={selectedMessage.country || "-"} />
                <DetailBlock label="Services Interested In" value={selectedMessage.services.length ? selectedMessage.services.join(", ") : "-"} />
                <DetailBlock label="Message" value={selectedMessage.message} multiline />
              </div>
            </aside>
          )}
        </div>
      </main>
    </div>
  );
}

function DetailBlock({ label, value, multiline = false }: { label: string; value: string; multiline?: boolean }) {
  return (
    <div>
      <div style={{ fontSize: "0.775rem", fontWeight: 800, color: "#64748b", marginBottom: "0.35rem" }}>{label}</div>
      <div style={{ color: "#0f172a", lineHeight: 1.6, whiteSpace: multiline ? "pre-line" : "normal", backgroundColor: "#f8fafc", borderRadius: "10px", padding: "0.75rem", border: "1px solid #f1f5f9" }}>
        {value}
      </div>
    </div>
  );
}
