"use client";

import React from "react";
import { FaLocationDot, FaPhone, FaEnvelope, FaClock, FaWhatsapp } from "react-icons/fa6";
import { useContentSection } from "@/lib/useContentSection";

const fallbackItems = [
  { itemKey: "address", title: "Office Address", body: "Dhaka Office:\nMNSN Tower, 60 Dilkusha\nDhaka 1000, Bangladesh", metadata: { icon: "location" } },
  { itemKey: "phones", title: "Phone Numbers", body: "Bangladesh: +880 1511-710730", metadata: { icon: "phone" } },
  { itemKey: "email", title: "Email Address", body: "info@rowshanaraedu.com", metadata: { icon: "email" } },
  { itemKey: "hours", title: "Office Hours", body: "Saturday - Wednesday: 10:00 AM - 7:00 PM\nThursday: 10:00 AM - 6:00 PM\nFriday: Closed\nSunday: 10:00 AM - 7:00 PM", metadata: { icon: "clock" } },
  { itemKey: "whatsapp", title: "Chat on WhatsApp", value: "+8801511710730", linkUrl: "https://wa.me/8801511710730", metadata: { icon: "whatsapp" } },
];

const icons: Record<string, React.ReactNode> = {
  location: <FaLocationDot />,
  phone: <FaPhone />,
  email: <FaEnvelope />,
  clock: <FaClock />,
};

export default function OfficeDetails() {
  const items = useContentSection("contact_information", fallbackItems as any);
  const whatsapp = items.find((item) => item.itemKey === "whatsapp");
  const detailItems = items.filter((item) => item.itemKey !== "whatsapp");

  return (
    <div className="contact-card" style={{
      background: "white",
      borderRadius: "24px",
      padding: "2.5rem",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)",
      border: "1px solid rgba(10, 28, 58, 0.06)",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }}>
      <div>
        <h2 style={{
          fontSize: "1.6rem",
          fontWeight: 800,
          color: "var(--text)",
          marginBottom: "2rem",
          fontFamily: "'Baloo 2', cursive"
        }}>
          Contact Information
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {detailItems.map((item) => {
            const iconName = typeof item.metadata?.icon === "string" ? item.metadata.icon : "location";
            return (
          <div key={item.itemKey} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
            <div style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "rgba(224, 145, 0, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--primary)",
              fontSize: "1.2rem",
              flexShrink: 0
            }}>
              {icons[iconName] || icons.location}
            </div>
            <div>
              <h4 style={{ margin: "0 0 0.4rem 0", fontSize: "1.1rem", fontWeight: 800, color: "var(--text)", fontFamily: "'Baloo 2', cursive" }}>{item.title}</h4>
              <div style={{ fontSize: "0.95rem", color: "var(--text)", opacity: 0.8, lineHeight: 1.6, fontFamily: "'Comic Neue', cursive" }}>
                {item.body.split("\n").map((line, index) => <React.Fragment key={index}>{index === 0 && item.itemKey === "address" ? <strong>{line}</strong> : line}<br /></React.Fragment>)}
              </div>
            </div>
          </div>
          )})}
        </div>
      </div>

      {/* Item 5: WhatsApp Button */}
      <div style={{ marginTop: "2rem" }}>
        <a
          href={whatsapp?.linkUrl || "https://wa.me/8801511710730"}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "#25D366",
            color: "white",
            padding: "0.9rem 1.5rem",
            borderRadius: "14px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.6rem",
            fontWeight: 700,
            fontSize: "1rem",
            textDecoration: "none",
            boxShadow: "0 8px 20px rgba(37, 211, 102, 0.2)",
            transition: "all 0.3s ease",
            width: "100%"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "0 12px 25px rgba(37, 211, 102, 0.3)";
            e.currentTarget.style.background = "#22c35e";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(37, 211, 102, 0.2)";
            e.currentTarget.style.background = "#25D366";
          }}
        >
          <FaWhatsapp style={{ fontSize: "1.3rem" }} />
          {whatsapp?.title || "Chat on WhatsApp"}
        </a>
      </div>
    </div>
  );
}
