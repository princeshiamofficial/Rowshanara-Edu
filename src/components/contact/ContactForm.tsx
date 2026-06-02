"use client";

import React, { useState } from "react";
import { FaPaperPlane, FaCheck } from "react-icons/fa6";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    services: [] as string[],
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        country: "",
        services: [],
        message: ""
      });
    }, 4000);
  };

  const handleServiceChange = (service: string) => {
    if (formData.services.includes(service)) {
      setFormData({
        ...formData,
        services: formData.services.filter((s) => s !== service)
      });
    } else {
      setFormData({
        ...formData,
        services: [...formData.services, service]
      });
    }
  };

  const servicesList = [
    "Admission Counselling",
    "Visa Assistance",
    "Scholarship Guidance",
    "Test Preparation",
    "Pre-Departure Briefing",
    "Post-Arrival Support"
  ];

  return (
    <div style={{
      background: "white",
      borderRadius: "24px",
      padding: "2.5rem",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)",
      border: "1px solid rgba(10, 28, 58, 0.06)"
    }}>
      <h2 style={{
        fontSize: "1.6rem",
        fontWeight: 800,
        color: "var(--text)",
        marginBottom: "2rem",
        fontFamily: "'Baloo 2', cursive"
      }}>
        Send us a Message
      </h2>

      {submitted ? (
        <div style={{
          padding: "3rem 2rem",
          textAlign: "center",
          background: "rgba(34, 197, 94, 0.08)",
          borderRadius: "20px",
          border: "1px dashed var(--cta)"
        }}>
          <i className="bi bi-check-circle-fill" style={{ color: "var(--cta)", fontSize: "3rem", display: "block", marginBottom: "1.5rem" }}></i>
          <h3 style={{ fontSize: "1.5rem", color: "var(--text)", marginBottom: "0.5rem" }}>Message Sent!</h3>
          <p style={{ color: "var(--text)", opacity: 0.7, fontSize: "0.95rem", margin: 0 }}>
            Thank you, <strong>{formData.name}</strong>. Your message has been sent successfully. An advisor will contact you within 24 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          {/* Name / Email Row */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem"
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text)" }}>Full Name *</label>
              <input
                type="text"
                required
                placeholder="Your name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                style={{
                  padding: "0.85rem 1.1rem",
                  borderRadius: "10px",
                  border: "1px solid rgba(10, 28, 58, 0.15)",
                  fontSize: "0.95rem",
                  outline: "none",
                  transition: "all 0.3s"
                }}
                onFocus={e => e.currentTarget.style.borderColor = "var(--primary)"}
                onBlur={e => e.currentTarget.style.borderColor = "rgba(10, 28, 58, 0.15)"}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text)" }}>Email *</label>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                style={{
                  padding: "0.85rem 1.1rem",
                  borderRadius: "10px",
                  border: "1px solid rgba(10, 28, 58, 0.15)",
                  fontSize: "0.95rem",
                  outline: "none",
                  transition: "all 0.3s"
                }}
                onFocus={e => e.currentTarget.style.borderColor = "var(--primary)"}
                onBlur={e => e.currentTarget.style.borderColor = "rgba(10, 28, 58, 0.15)"}
              />
            </div>
          </div>

          {/* Phone / Country Row */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem"
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text)" }}>Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="+880 1XXX XXXXXX"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                style={{
                  padding: "0.85rem 1.1rem",
                  borderRadius: "10px",
                  border: "1px solid rgba(10, 28, 58, 0.15)",
                  fontSize: "0.95rem",
                  outline: "none",
                  transition: "all 0.3s"
                }}
                onFocus={e => e.currentTarget.style.borderColor = "var(--primary)"}
                onBlur={e => e.currentTarget.style.borderColor = "rgba(10, 28, 58, 0.15)"}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text)" }}>Destination Country</label>
              <select
                value={formData.country}
                onChange={e => setFormData({ ...formData, country: e.target.value })}
                style={{
                  padding: "0.85rem 1.1rem",
                  borderRadius: "10px",
                  border: "1px solid rgba(10, 28, 58, 0.15)",
                  fontSize: "0.95rem",
                  outline: "none",
                  background: "white",
                  cursor: "pointer"
                }}
              >
                <option value="">Select a country</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="Malaysia">Malaysia</option>
              </select>
            </div>
          </div>

          {/* Services Checkboxes */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text)" }}>Services Interested In</span>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.75rem"
            }}>
              {servicesList.map((service, idx) => {
                const isChecked = formData.services.includes(service);
                return (
                  <label key={idx} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.9rem",
                    color: "var(--text)",
                    cursor: "pointer"
                  }}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleServiceChange(service)}
                      style={{
                        position: "absolute",
                        opacity: 0,
                        width: 0,
                        height: 0
                      }}
                    />
                    <div style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "4px",
                      border: isChecked ? "1px solid var(--primary)" : "2px solid #cbd5e1",
                      backgroundColor: isChecked ? "var(--primary)" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "all 0.2s"
                    }}>
                      {isChecked && <FaCheck style={{ fontSize: "0.6rem", color: "white" }} />}
                    </div>
                    {service}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Message */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text)" }}>Message *</label>
            <textarea
              required
              rows={4}
              placeholder="Tell us about your study plans..."
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              style={{
                padding: "0.85rem 1.1rem",
                borderRadius: "10px",
                border: "1px solid rgba(10, 28, 58, 0.15)",
                fontSize: "0.95rem",
                outline: "none",
                resize: "none",
                fontFamily: "inherit",
                transition: "all 0.3s"
              }}
              onFocus={e => e.currentTarget.style.borderColor = "var(--primary)"}
              onBlur={e => e.currentTarget.style.borderColor = "rgba(10, 28, 58, 0.15)"}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" style={{
            background: "#1c7ed6",
            color: "white",
            padding: "0.9rem",
            borderRadius: "12px",
            border: "none",
            fontWeight: 700,
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            transition: "all 0.2s"
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#1971c2"}
          onMouseLeave={e => e.currentTarget.style.background = "#1c7ed6"}>
            <FaPaperPlane /> Send Message
          </button>
        </form>
      )}
    </div>
  );
}
