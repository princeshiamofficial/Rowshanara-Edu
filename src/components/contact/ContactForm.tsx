"use client";

import React, { useState } from "react";
import Image from "next/image";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.status !== "success") {
        throw new Error(data.message || "Failed to send message");
      }

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
    } catch (error: unknown) {
      const err = error as Error;
      alert(err.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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

  const countriesList = [
    { name: "United Kingdom", code: "gb" },
    { name: "United States", code: "us" },
    { name: "Canada", code: "ca" },
    { name: "Australia", code: "au" },
    { name: "Germany", code: "de" },
    { name: "Malaysia", code: "my" }
  ];

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.9rem 1.25rem",
    borderRadius: "14px",
    border: "1px solid rgba(10, 28, 58, 0.12)",
    background: "#fdfcf9",
    fontSize: "0.95rem",
    color: "var(--text)",
    outline: "none",
    transition: "all 0.3s ease",
    fontFamily: "inherit"
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "var(--primary)";
    e.currentTarget.style.background = "white";
    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(224, 145, 0, 0.12)";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "rgba(10, 28, 58, 0.12)";
    e.currentTarget.style.background = "#fdfcf9";
    e.currentTarget.style.boxShadow = "none";
  };

  const selectedCountry = countriesList.find(c => c.name === formData.country);

  return (
    <div className="contact-card" style={{
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
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
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
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
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
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", position: "relative" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text)" }}>Destination Country</label>
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{
                  ...inputStyle,
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderColor: isDropdownOpen ? "var(--primary)" : "rgba(10, 28, 58, 0.12)",
                  background: isDropdownOpen ? "white" : "#fdfcf9",
                  boxShadow: isDropdownOpen ? "0 0 0 4px rgba(224, 145, 0, 0.12)" : "none"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  {selectedCountry && (
                    <Image
                      src={`https://flagcdn.com/w40/${selectedCountry.code}.png`} 
                      alt="" 
                      width={24}
                      height={16}
                      style={{ height: "16px", width: "auto", borderRadius: "3px", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }}
                      unoptimized
                    />
                  )}
                  <span style={{ color: formData.country ? "var(--text)" : "#9ca3af" }}>
                    {formData.country || "Select a country"}
                  </span>
                </div>
                <i className="bi bi-chevron-down" style={{
                  fontSize: "0.85rem",
                  transition: "transform 0.3s ease",
                  transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  color: "var(--text)",
                  opacity: 0.6
                }}></i>
              </div>

              {isDropdownOpen && (
                <>
                  <div 
                    onClick={() => setIsDropdownOpen(false)}
                    style={{
                      position: "fixed",
                      inset: 0,
                      zIndex: 999
                    }}
                  />
                  <div style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    marginTop: "0.5rem",
                    background: "white",
                    borderRadius: "14px",
                    border: "1px solid rgba(10, 28, 58, 0.08)",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                    zIndex: 1000,
                    overflow: "hidden",
                    padding: "0.4rem 0"
                  }}>
                    <div
                      onClick={() => {
                        setFormData({ ...formData, country: "" });
                        setIsDropdownOpen(false);
                      }}
                      style={{
                        padding: "0.75rem 1.25rem",
                        fontSize: "0.95rem",
                        cursor: "pointer",
                        color: "#9ca3af",
                        transition: "all 0.2s"
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "#fdfcf9"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      Select a country
                    </div>
                    {countriesList.map((country, cIdx) => {
                      const isSelected = formData.country === country.name;
                      return (
                        <div
                          key={cIdx}
                          onClick={() => {
                            setFormData({ ...formData, country: country.name });
                            setIsDropdownOpen(false);
                          }}
                          style={{
                            padding: "0.75rem 1.25rem",
                            fontSize: "0.95rem",
                            cursor: "pointer",
                            fontWeight: isSelected ? 700 : 500,
                            color: isSelected ? "var(--primary)" : "var(--text)",
                            background: isSelected ? "rgba(224, 145, 0, 0.06)" : "transparent",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            transition: "all 0.2s"
                          }}
                          onMouseEnter={e => {
                            if (!isSelected) e.currentTarget.style.background = "#fdfcf9";
                          }}
                          onMouseLeave={e => {
                            if (!isSelected) e.currentTarget.style.background = "transparent";
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                            <Image
                              src={`https://flagcdn.com/w40/${country.code}.png`} 
                              alt="" 
                              width={24}
                              height={16}
                              style={{ height: "16px", width: "auto", borderRadius: "3px", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }}
                              unoptimized
                            />
                            <span>{country.name}</span>
                          </div>
                          {isSelected && <FaCheck style={{ fontSize: "0.8rem", color: "var(--primary)" }} />}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Services Pill Tags */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text)" }}>Services Interested In</span>
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.6rem"
            }}>
              {servicesList.map((service, idx) => {
                const isChecked = formData.services.includes(service);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleServiceChange(service)}
                    style={{
                      padding: "0.55rem 1.1rem",
                      borderRadius: "100px",
                      border: isChecked ? "1.5px solid var(--primary)" : "1.5px solid rgba(10, 28, 58, 0.1)",
                      backgroundColor: isChecked ? "rgba(224, 145, 0, 0.08)" : "#fdfcf9",
                      color: isChecked ? "var(--primary)" : "var(--text)",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      fontFamily: "inherit",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem"
                    }}
                    onMouseEnter={e => {
                      if (!isChecked) {
                        e.currentTarget.style.borderColor = "var(--primary)";
                        e.currentTarget.style.background = "rgba(224, 145, 0, 0.03)";
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isChecked) {
                        e.currentTarget.style.borderColor = "rgba(10, 28, 58, 0.1)";
                        e.currentTarget.style.background = "#fdfcf9";
                      }
                    }}
                  >
                    {isChecked && <FaCheck style={{ fontSize: "0.75rem" }} />}
                    {service}
                  </button>
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
                ...inputStyle,
                resize: "none"
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={isSubmitting} style={{
            background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)",
            color: "white",
            padding: "0.95rem",
            borderRadius: "14px",
            border: "none",
            fontWeight: 700,
            fontSize: "1rem",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            opacity: isSubmitting ? 0.75 : 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.6rem",
            boxShadow: "0 8px 20px rgba(224, 145, 0, 0.18)",
            transition: "all 0.3s ease",
            fontFamily: "inherit"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 12px 25px rgba(224, 145, 0, 0.28)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(224, 145, 0, 0.18)";
          }}>
            <FaPaperPlane /> {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
}
