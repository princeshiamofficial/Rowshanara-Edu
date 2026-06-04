"use client";

import React from "react";
import { FaLocationDot, FaPhone, FaEnvelope, FaClock, FaWhatsapp } from "react-icons/fa6";

export default function OfficeDetails() {
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
          {/* Item 1: Address */}
          <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
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
              <FaLocationDot />
            </div>
            <div>
              <h4 style={{ margin: "0 0 0.4rem 0", fontSize: "1.1rem", fontWeight: 800, color: "var(--text)", fontFamily: "'Baloo 2', cursive" }}>Office Address</h4>
              <div style={{ fontSize: "0.95rem", color: "var(--text)", opacity: 0.8, lineHeight: 1.6, fontFamily: "'Comic Neue', cursive" }}>
                <strong>Dhaka Office:</strong><br />
                House 45, Road 12, Gulshan-2<br />
                Dhaka 1212, Bangladesh
              </div>
            </div>
          </div>

          {/* Item 2: Phone */}
          <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
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
              <FaPhone />
            </div>
            <div>
              <h4 style={{ margin: "0 0 0.4rem 0", fontSize: "1.1rem", fontWeight: 800, color: "var(--text)", fontFamily: "'Baloo 2', cursive" }}>Phone Numbers</h4>
              <div style={{ fontSize: "0.95rem", color: "var(--text)", opacity: 0.8, lineHeight: 1.6, fontFamily: "'Comic Neue', cursive" }}>
                Bangladesh: +880 2 9884-5678<br />
                UK: +44 20 7946-0958<br />
                Canada: +1 647-361-8880
              </div>
            </div>
          </div>

          {/* Item 3: Email */}
          <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
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
              <FaEnvelope />
            </div>
            <div>
              <h4 style={{ margin: "0 0 0.4rem 0", fontSize: "1.1rem", fontWeight: 800, color: "var(--text)", fontFamily: "'Baloo 2', cursive" }}>Email Address</h4>
              <div style={{ fontSize: "0.95rem", color: "var(--text)", opacity: 0.8, lineHeight: 1.6, fontFamily: "'Comic Neue', cursive" }}>
                info@rowshanaraedu.com<br />
                support@rowshanaraedu.com<br />
                admissions@rowshanaraedu.com
              </div>
            </div>
          </div>

          {/* Item 4: Hours */}
          <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
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
              <FaClock />
            </div>
            <div>
              <h4 style={{ margin: "0 0 0.4rem 0", fontSize: "1.1rem", fontWeight: 800, color: "var(--text)", fontFamily: "'Baloo 2', cursive" }}>Office Hours</h4>
              <div style={{ fontSize: "0.95rem", color: "var(--text)", opacity: 0.8, lineHeight: 1.6, fontFamily: "'Comic Neue', cursive" }}>
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday: 10:00 AM - 4:00 PM<br />
                Sunday: Closed
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Item 5: WhatsApp Button */}
      <div style={{ marginTop: "2rem" }}>
        <a
          href="https://wa.me/8801511710730"
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
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}
