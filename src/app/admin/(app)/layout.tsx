"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ── Admin Avatar (reads localStorage) ──────────────────
function AdminAvatar() {
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  useEffect(() => {
    try {
      const stored = localStorage.getItem("admin_user");
      if (stored) setUser(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  const initial = user?.name?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? "A";
  const displayName = user?.name ?? user?.email ?? "Admin";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
      <div style={{
        width: "32px", height: "32px", borderRadius: "50%",
        background: "linear-gradient(135deg, #E09100, #ffb84d)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "0.8rem", fontWeight: 700, color: "#fff", flexShrink: 0,
      }}>
        {initial}
      </div>
      <div style={{ lineHeight: 1.2 }}>
        <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "#111113", maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {displayName}
        </div>
        <div style={{ fontSize: "0.68rem", color: "#94a3b8" }}>Admin</div>
      </div>
    </div>
  );
}

const menuItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="7" height="9" x="3" y="3" rx="1" />
        <rect width="7" height="5" x="14" y="3" rx="1" />
        <rect width="7" height="9" x="14" y="12" rx="1" />
        <rect width="7" height="5" x="3" y="16" rx="1" />
      </svg>
    ),
  },
  {
    label: "Consultations",
    href: "/admin/dashboard/consultations",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "Messages",
    href: "/admin/dashboard/messages",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    label: "Universities",
    href: "/admin/dashboard/universities",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    label: "Testimonials",
    href: "/admin/dashboard/testimonials",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    label: "Destinations",
    href: "/admin/dashboard/destinations",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="10" r="3" />
        <path d="M12 2a8 8 0 0 0-8 8c0 5.4 7 12 8 12s8-6.6 8-12a8 8 0 0 0-8-8z" />
      </svg>
    ),
  },
  {
    label: "Admins",
    href: "/admin/admins",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [notifications, setNotifications] = useState<{ id: number; type: string; title: string; message: string; link: string | null; isRead: boolean; createdAt: Date }[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const loadNotifications = async () => {
    try {
      const res = await fetch("/api/admin/notifications");
      const data = await res.json();
      if (data.status === "success") {
        setNotifications(data.data);
        setUnreadCount(data.unreadCount);
      }
    } catch { /* ignore */ }
  };

  useEffect(() => { loadNotifications(); }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAsRead = async (id: number) => {
    await fetch("/api/admin/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isRead: true }),
    });
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, isRead: true } : n));
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const markAllAsRead = async () => {
    await fetch("/api/admin/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isRead: true }),
    });
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f6fa" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: collapsed ? "64px" : "220px",
          minHeight: "100vh",
          background: "#111113",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.25s ease",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: collapsed ? "1.25rem 0" : "1.5rem 1.25rem 1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              background: "linear-gradient(135deg, #E09100, #ffb84d)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {!collapsed && (
            <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem", whiteSpace: "nowrap", letterSpacing: "-0.2px" }}>
              Rowshanara
            </span>
          )}
        </div>

        {/* Nav Items */}
        <nav style={{ flex: 1, padding: "0.75rem 0" }}>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: collapsed ? "0.7rem 0" : "0.7rem 1.25rem",
                  justifyContent: collapsed ? "center" : "flex-start",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
                  background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                  borderLeft: isActive ? "3px solid #E09100" : "3px solid transparent",
                  textDecoration: "none",
                  fontSize: "0.82rem",
                  fontWeight: isActive ? 600 : 400,
                  transition: "all 0.15s ease",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                <span style={{ flexShrink: 0 }}>{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            margin: "0.75rem auto",
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)",
            color: "rgba(255,255,255,0.5)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.15s ease",
          }}
          title={collapsed ? "Expand" : "Collapse"}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transform: collapsed ? "rotate(180deg)" : "none", transition: "transform 0.25s ease" }}
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Logout */}
        <div style={{ padding: collapsed ? "1rem 0" : "1rem 1.25rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <Link
            href="/admin/login"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              justifyContent: collapsed ? "center" : "flex-start",
              color: "rgba(255,255,255,0.35)",
              textDecoration: "none",
              fontSize: "0.82rem",
              transition: "color 0.15s ease",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            {!collapsed && <span>Logout</span>}
          </Link>
        </div>
      </aside>

      {/* Main Column */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>

        {/* Top Navbar */}
        <header style={{
          height: "56px",
          background: "#fff",
          borderBottom: "1px solid #f1f5f9",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.5rem",
          position: "sticky",
          top: 0,
          zIndex: 30,
          flexShrink: 0,
        }}>
          {/* Page Title */}
          <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "#111113" }}>
            {menuItems.find((m) => pathname === m.href || pathname.startsWith(m.href + "/"))?.label ?? "Admin Panel"}
          </div>

           {/* Right Side */}
           <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>

              {/* Notification Bell */}
              <div ref={dropdownRef} style={{ position: "relative" }}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={{
                    width: "38px", height: "38px", borderRadius: "10px",
                    background: showDropdown ? "#f1f5f9" : "#f8fafc",
                    border: showDropdown ? "1px solid #e2e8f0" : "1px solid #f1f5f9",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", color: "#475569", position: "relative",
                    transition: "all 0.2s ease",
                  }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                  {unreadCount > 0 && (
                    <span style={{
                      position: "absolute", top: "-5px", right: "-5px",
                      background: "linear-gradient(135deg, #dc2626, #ef4444)",
                      color: "#fff", fontSize: "0.6rem",
                      fontWeight: 700, minWidth: "18px", height: "18px", padding: "0 4px", borderRadius: "999px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: "0 2px 6px rgba(220,38,38,0.35)",
                      border: "2px solid #fff",
                    }}>
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button>

                {showDropdown && (
                  <div style={{
                    position: "absolute", top: "48px", right: 0,
                    width: "360px", maxHeight: "440px", overflowY: "auto",
                    background: "#fff", borderRadius: "14px",
                    border: "1px solid #eef1f6", boxShadow: "0 20px 60px rgba(15,23,42,0.12), 0 1px 3px rgba(15,23,42,0.08)",
                    zIndex: 50,
                    animation: "notificationSlideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}>
                    <div style={{ padding: "0.9rem 1rem", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between", background: "linear-gradient(180deg, #fff 0%, #fafbfc 100%)" }}>
                      <div>
                        <span style={{ fontWeight: 700, fontSize: "0.88rem", color: "#111113" }}>Notifications</span>
                        {unreadCount > 0 && (
                          <span style={{ marginLeft: "8px", background: "#fef2f2", color: "#dc2626", fontSize: "0.65rem", fontWeight: 700, padding: "2px 8px", borderRadius: "999px" }}>
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      {unreadCount > 0 && (
                        <button onClick={markAllAsRead} style={{ background: "none", border: "none", color: "#6366f1", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer", padding: "4px 8px", borderRadius: "6px", transition: "background 0.15s ease" }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "#eef2ff")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                    {notifications.length === 0 ? (
                      <div style={{ padding: "2.5rem 1rem", textAlign: "center", color: "#94a3b8" }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "0.75rem" }}>
                          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                        <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#64748b", marginBottom: "2px" }}>All caught up</div>
                        <div style={{ fontSize: "0.75rem" }}>No notifications yet</div>
                      </div>
                    ) : (
                      notifications.map((n, idx) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            if (!n.isRead) markAsRead(n.id);
                            setShowDropdown(false);
                            if (n.link) window.location.href = n.link;
                          }}
                          style={{
                            padding: "0.85rem 1rem", borderBottom: idx < notifications.length - 1 ? "1px solid #f8fafc" : "none",
                            cursor: "pointer", background: n.isRead ? "#fff" : "linear-gradient(90deg, #fffbeb 0%, #fff 60%)",
                            transition: "all 0.15s ease",
                            display: "flex", gap: "0.75rem", alignItems: "flex-start",
                            borderLeft: n.isRead ? "3px solid transparent" : "3px solid #f59e0b",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = n.isRead ? "#fafafa" : "#fffbeb")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = n.isRead ? "#fff" : "linear-gradient(90deg, #fffbeb 0%, #fff 60%)")}
                        >
                          <div style={{
                            width: "32px", height: "32px", borderRadius: "9px",
                            background: n.isRead ? "#f1f5f9" : "linear-gradient(135deg, #fef3c7, #fde68a)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            flexShrink: 0, marginTop: "2px",
                            color: n.isRead ? "#64748b" : "#d97706",
                          }}>
                            {n.type === "message" ? (
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 1 1 0 4H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                              </svg>
                            ) : (
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                              </svg>
                            )}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#111113", marginBottom: "2px" }}>{n.title}</div>
                            <div style={{ fontSize: "0.72rem", color: "#475569", lineHeight: 1.45, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{n.message}</div>
                            <div style={{ fontSize: "0.65rem", color: "#94a3b8", marginTop: "6px", fontWeight: 500 }}>
                              {new Date(n.createdAt).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                            </div>
                          </div>
                          {!n.isRead && (
                            <div style={{
                              width: "7px", height: "7px", borderRadius: "50%",
                              background: "#6366f1", flexShrink: 0, marginTop: "6px",
                              boxShadow: "0 0 0 2px #eef2ff",
                            }} />
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

             {/* Admin Avatar */}
             <AdminAvatar />
           </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, overflow: "auto", background: "#f5f6fa" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
