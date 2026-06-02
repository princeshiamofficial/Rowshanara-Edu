"use client";

import React from "react";
import { FaLocationDot, FaPhone, FaEnvelope, FaClock, FaWhatsapp } from "react-icons/fa6";

export default function OfficeDetails() {
  return (
    <div style={{
      position: "relative",
      paddingLeft: "3.5rem"
    }}>
      {/* Timeline connection trace line */}
      <div style={{
        position: "absolute",
        left: "1.25rem",
        top: "20px",
        bottom: "40px",
        width: "2px",
        background: "#e9ecef"
      }}></div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        {/* Item 1: Address */}
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute",
            left: "-3.5rem",
            top: "0",
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: "#e8f4fd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#1c7ed6",
            fontSize: "1.1rem"
          }}>
            <FaLocationDot />
          </div>
          <div>
            <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", fontWeight: 800, color: "var(--text)", fontFamily: "'Baloo 2', cursive" }}>Office Address</h4>
            <div style={{ fontSize: "0.95rem", color: "var(--text)", opacity: 0.7, lineHeight: 1.6, fontFamily: "'Comic Neue', cursive" }}>
              <strong>Dhaka Office:</strong><br />
              House 45, Road 12, Gulshan-2<br />
              Dhaka 1212, Bangladesh
            </div>
          </div>
        </div>

        {/* Item 2: Phone */}
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute",
            left: "-3.5rem",
            top: "0",
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: "#e8f4fd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#1c7ed6",
            fontSize: "1.1rem"
          }}>
            <FaPhone />
          </div>
          <div>
            <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", fontWeight: 800, color: "var(--text)", fontFamily: "'Baloo 2', cursive" }}>Phone Numbers</h4>
            <div style={{ fontSize: "0.95rem", color: "var(--text)", opacity: 0.7, lineHeight: 1.6, fontFamily: "'Comic Neue', cursive" }}>
              Bangladesh: +880 2 9884-5678<br />
              UK: +44 20 7946-0958<br />
              Canada: +1 647-361-8880
            </div>
          </div>
        </div>

        {/* Item 3: Email */}
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute",
            left: "-3.5rem",
            top: "0",
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: "#e8f4fd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#1c7ed6",
            fontSize: "1.1rem"
          }}>
            <FaEnvelope />
          </div>
          <div>
            <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", fontWeight: 800, color: "var(--text)", fontFamily: "'Baloo 2', cursive" }}>Email Address</h4>
            <div style={{ fontSize: "0.95rem", color: "var(--text)", opacity: 0.7, lineHeight: 1.6, fontFamily: "'Comic Neue', cursive" }}>
              info@rowshanaraedu.com<br />
              support@rowshanaraedu.com<br />
              admissions@rowshanaraedu.com
            </div>
          </div>
        </div>

        {/* Item 4: Hours */}
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute",
            left: "-3.5rem",
            top: "0",
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: "#e8f4fd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#1c7ed6",
            fontSize: "1.1rem"
          }}>
            <FaClock />
          </div>
          <div>
            <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", fontWeight: 800, color: "var(--text)", fontFamily: "'Baloo 2', cursive" }}>Office Hours</h4>
            <div style={{ fontSize: "0.95rem", color: "var(--text)", opacity: 0.7, lineHeight: 1.6, fontFamily: "'Comic Neue', cursive" }}>
              Monday - Friday: 9:00 AM - 6:00 PM<br />
              Saturday: 10:00 AM - 4:00 PM<br />
              Sunday: Closed
            </div>
          </div>
        </div>

        {/* Item 5: WhatsApp Button */}
        <div style={{ position: "relative", marginTop: "0.5rem" }}>
          <a
            href="https://wa.me/8801511710730"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#00c853",
              color: "white",
              padding: "0.85rem 1.5rem",
              borderRadius: "14px",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontWeight: 700,
              fontSize: "0.95rem",
              textDecoration: "none",
              boxShadow: "0 8px 20px rgba(0, 200, 83, 0.2)",
              transition: "all 0.2s"
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 25px rgba(0, 200, 83, 0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 200, 83, 0.2)"; }}
          >
            <FaWhatsapp style={{ fontSize: "1.2rem" }} />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
