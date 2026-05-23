"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", country: "United Kingdom", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", country: "United Kingdom", message: "" });
    }, 4000);
  };

  return (
    <div className="hero-gradient" style={{ minHeight: "100vh", paddingTop: "8rem", paddingBottom: "6rem" }}>
      {/* Banner */}
      <section className="container" style={{ textAlign: "center", marginBottom: "5rem" }}>
        <span style={{ 
          color: "var(--primary)", 
          fontWeight: 800, 
          letterSpacing: "0.2em", 
          fontSize: "0.875rem", 
          marginBottom: "1.5rem",
          display: "block",
          textTransform: "uppercase"
        }}>
          Contact Rowshanara Edu
        </span>
        <h1 className="hero-responsive-title" style={{ 
          marginBottom: "1.5rem", 
          lineHeight: 1.2,
          fontWeight: 800,
          color: "var(--text)"
        }}>
          Start Your Consultation Today
        </h1>
        <p style={{ 
          fontSize: "1.2rem", 
          opacity: 0.85, 
          maxWidth: "750px", 
          margin: "0 auto", 
          lineHeight: 1.7,
          color: "var(--text)"
        }}>
          Have questions about country eligibility, document preparation, or admission intakes? Drop us a line or visit our office. Our expert advisors are ready to assist.
        </p>
      </section>

      {/* Main Split Layout */}
      <section className="container">
        <div className="contact-split-layout" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "4rem", alignItems: "start" }}>
          
          {/* Left Panel: Contact Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            
            {/* Direct Connect */}
            <div className="glass" style={{
              padding: "2.5rem",
              borderRadius: "24px",
              background: "rgba(255, 255, 255, 0.75)",
              border: "1px solid rgba(224, 145, 0, 0.15)",
              boxShadow: "0 10px 30px rgba(224, 145, 0, 0.03)"
            }}>
              <h3 style={{ fontSize: "1.5rem", color: "var(--text)", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <i className="bi bi-chat-left-dots-fill" style={{ color: "var(--primary)" }}></i>
                Immediate Contact
              </h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <div style={{ width: "45px", height: "45px", borderRadius: "10px", background: "rgba(224, 145, 0, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <i className="bi bi-telephone-fill" style={{ color: "var(--primary)", fontSize: "1.1rem", margin: "0 auto" }}></i>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text)", opacity: 0.5, display: "block" }}>Call Our Advisor</span>
                    <a href="tel:+8801511710730" style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--text)" }}>+880 1511-710730</a>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <div style={{ width: "45px", height: "45px", borderRadius: "10px", background: "rgba(224, 145, 0, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <i className="bi bi-envelope-fill" style={{ color: "var(--primary)", fontSize: "1.1rem", margin: "0 auto" }}></i>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text)", opacity: 0.5, display: "block" }}>Email Inquiries</span>
                    <a href="mailto:info@rowshanaraedu.com" style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--text)" }}>info@rowshanaraedu.com</a>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <div style={{ width: "45px", height: "45px", borderRadius: "10px", background: "rgba(224, 145, 0, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <i className="bi bi-geo-alt-fill" style={{ color: "var(--primary)", fontSize: "1.1rem", margin: "0 auto" }}></i>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text)", opacity: 0.5, display: "block" }}>Headquarters Office</span>
                    <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text)" }}>60, Dilkusha, Motijheel C/A, Dhaka-1000, Bangladesh</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social & Chat Hub */}
            <div className="glass" style={{
              padding: "2.5rem",
              borderRadius: "24px",
              background: "rgba(255, 255, 255, 0.75)",
              border: "1px solid rgba(224, 145, 0, 0.15)",
              boxShadow: "0 10px 30px rgba(224, 145, 0, 0.03)",
              textAlign: "center"
            }}>
              <h3 style={{ fontSize: "1.4rem", color: "var(--text)", marginBottom: "1.5rem" }}>Connect Directly on WhatsApp</h3>
              <p style={{ fontSize: "0.95rem", color: "var(--text)", opacity: 0.7, marginBottom: "1.5rem" }}>
                Chat immediately with our dedicated student intake counselor for instant questions regarding courses & eligibility.
              </p>
              <a href="https://wa.me/8801511710730" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{
                background: "#25D366",
                color: "white",
                width: "100%",
                padding: "1rem",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                fontWeight: 700,
                fontSize: "1rem",
                boxShadow: "0 8px 20px rgba(37, 211, 102, 0.3)"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                <i className="bi bi-whatsapp" style={{ fontSize: "1.25rem" }}></i>
                Start WhatsApp Chat
              </a>
            </div>
          </div>

          {/* Right Panel: Form */}
          <div className="glass contact-form-card" style={{
            background: "white",
            borderRadius: "32px",
            border: "1px solid rgba(224, 145, 0, 0.15)",
            boxShadow: "0 20px 45px rgba(224, 145, 0, 0.06)"
          }}>
            <h2 style={{ fontSize: "2rem", color: "var(--text)", marginBottom: "0.5rem" }}>Inquire Now</h2>
            <p style={{ color: "var(--text)", opacity: 0.6, fontSize: "0.95rem", marginBottom: "2.5rem" }}>
              Please fill out the form below. Our consultants will evaluate your details and reach out within 24 hours.
            </p>

            {submitted ? (
              <div style={{
                padding: "3rem 2rem",
                textAlign: "center",
                background: "rgba(34, 197, 94, 0.08)",
                borderRadius: "20px",
                border: "1px dashed var(--cta)"
              }}>
                <i className="bi bi-check-circle-fill" style={{ color: "var(--cta)", fontSize: "3rem", display: "block", marginBottom: "1.5rem" }}></i>
                <h3 style={{ fontSize: "1.5rem", color: "var(--text)", marginBottom: "0.5rem" }}>Inquiry Submitted Successfully</h3>
                <p style={{ color: "var(--text)", opacity: 0.7, fontSize: "0.95rem", margin: 0 }}>
                  Thank you, <strong>{formData.name}</strong>. An educational advisor has been assigned to your profile and will contact you shortly via email/phone.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {/* Name */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label htmlFor="name" style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text)", opacity: 0.8 }}>Full Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      padding: "0.9rem 1.1rem",
                      borderRadius: "10px",
                      border: "2px solid rgba(224, 145, 0, 0.12)",
                      fontSize: "0.95rem",
                      fontFamily: "inherit",
                      outline: "none"
                    }}
                    onFocus={e => e.currentTarget.style.borderColor = "var(--primary)"}
                    onBlur={e => e.currentTarget.style.borderColor = "rgba(224, 145, 0, 0.12)"}
                  />
                </div>

                {/* Email / Phone Split */}
                <div className="contact-split-layout" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label htmlFor="email" style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text)", opacity: 0.8 }}>Email Address</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        padding: "0.9rem 1.1rem",
                        borderRadius: "10px",
                        border: "2px solid rgba(224, 145, 0, 0.12)",
                        fontSize: "0.95rem",
                        fontFamily: "inherit",
                        outline: "none"
                      }}
                      onFocus={e => e.currentTarget.style.borderColor = "var(--primary)"}
                      onBlur={e => e.currentTarget.style.borderColor = "rgba(224, 145, 0, 0.12)"}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label htmlFor="phone" style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text)", opacity: 0.8 }}>Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        padding: "0.9rem 1.1rem",
                        borderRadius: "10px",
                        border: "2px solid rgba(224, 145, 0, 0.12)",
                        fontSize: "0.95rem",
                        fontFamily: "inherit",
                        outline: "none"
                      }}
                      onFocus={e => e.currentTarget.style.borderColor = "var(--primary)"}
                      onBlur={e => e.currentTarget.style.borderColor = "rgba(224, 145, 0, 0.12)"}
                    />
                  </div>
                </div>

                {/* Country Destination */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label htmlFor="country" style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text)", opacity: 0.8 }}>Preferred Study Destination</label>
                  <select
                    id="country"
                    value={formData.country}
                    onChange={e => setFormData({ ...formData, country: e.target.value })}
                    style={{
                      padding: "0.9rem 1.1rem",
                      borderRadius: "10px",
                      border: "2px solid rgba(224, 145, 0, 0.12)",
                      fontSize: "0.95rem",
                      fontFamily: "inherit",
                      outline: "none",
                      background: "white"
                    }}
                    onFocus={e => e.currentTarget.style.borderColor = "var(--primary)"}
                    onBlur={e => e.currentTarget.style.borderColor = "rgba(224, 145, 0, 0.12)"}>
                    <option value="United Kingdom">United Kingdom 🇬🇧</option>
                    <option value="United States">United States 🇺🇸</option>
                    <option value="Canada">Canada 🇨🇦</option>
                    <option value="Australia">Australia 🇦🇺</option>
                    <option value="Europe / Sweden">Europe / Sweden 🇪🇺</option>
                  </select>
                </div>

                {/* Message */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label htmlFor="message" style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text)", opacity: 0.8 }}>Message / Profile Details</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly state your last completed academic degree, CGPA, IELTS score (if any), and questions..."
                    style={{
                      padding: "0.9rem 1.1rem",
                      borderRadius: "10px",
                      border: "2px solid rgba(224, 145, 0, 0.12)",
                      fontSize: "0.95rem",
                      fontFamily: "inherit",
                      outline: "none",
                      resize: "none"
                    }}
                    onFocus={e => e.currentTarget.style.borderColor = "var(--primary)"}
                    onBlur={e => e.currentTarget.style.borderColor = "rgba(224, 145, 0, 0.12)"}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{
                  padding: "1.1rem",
                  borderRadius: "10px",
                  fontWeight: 700,
                  fontSize: "1rem",
                  marginTop: "1rem"
                }}>
                  Submit Assessment Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
