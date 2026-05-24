"use client";

import React, { useState } from "react";
import { FaLocationDot, FaPhone, FaEnvelope, FaClock, FaPaperPlane, FaWhatsapp, FaFacebookF, FaXTwitter, FaLinkedinIn, FaYoutube, FaWeixin } from "react-icons/fa6";

export default function ContactPage() {
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
    <div className="hero-gradient" style={{ minHeight: "100vh", paddingTop: "140px", paddingBottom: "6rem" }}>
      {/* Header Banner */}
      <section style={{
        width: "95%",
        maxWidth: "1280px",
        margin: "0 auto 2.5rem auto",
        background: "linear-gradient(135deg, rgba(10, 28, 58, 0.88) 0%, rgba(6, 17, 36, 0.94) 100%), url('/hero-bg.png') no-repeat center center",
        backgroundSize: "cover",
        padding: "3.5rem 2rem",
        borderRadius: "28px",
        textAlign: "center",
        color: "white",
        boxShadow: "0 15px 35px rgba(0, 0, 0, 0.15)",
        position: "relative",
        overflow: "hidden"
      }}>
        <div className="container">
          <h1 className="hero-responsive-title" style={{
            fontSize: "clamp(2.25rem, 5vw, 3.25rem)",
            fontWeight: 800,
            marginBottom: "0.75rem",
            color: "white",
            fontFamily: "'Baloo 2', cursive",
            lineHeight: 1.2
          }}>
            Contact Us
          </h1>
          <p style={{
            fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
            color: "rgba(255, 255, 255, 0.85)",
            maxWidth: "750px",
            margin: "0 auto 1.5rem auto",
            lineHeight: 1.6,
            fontFamily: "'Comic Neue', cursive"
          }}>
            Get in touch with our team. We're here to help!
          </p>
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.95rem",
            fontWeight: 700,
            color: "rgba(255, 255, 255, 0.6)"
          }}>
            <a href="/" style={{ 
              color: "rgba(255, 255, 255, 0.6)", 
              textDecoration: "none", 
              transition: "color 0.2s" 
            }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--primary)"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)"}>
              Home
            </a>
            <span>/</span>
            <span style={{ color: "white" }}>Contact</span>
          </div>
        </div>
      </section>

      {/* Main Content split layout */}
      <section className="container" style={{ marginTop: "3.5rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "4rem",
          alignItems: "start"
        }} className="contact-grid">
          
          {/* Left Column: Form Card */}
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
                    {servicesList.map((service, idx) => (
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
                          checked={formData.services.includes(service)}
                          onChange={() => handleServiceChange(service)}
                          style={{
                            width: "16px",
                            height: "16px",
                            accentColor: "var(--primary)"
                          }}
                        />
                        {service}
                      </label>
                    ))}
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

          {/* Right Column: Office Details Timeline */}
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

        </div>
      </section>

      {/* Social Media Bar */}
      <section className="container" style={{ marginTop: "4rem" }}>
        <div style={{
          background: "black",
          borderRadius: "20px",
          padding: "1.25rem 2.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          flexWrap: "wrap",
          gap: "1.5rem"
        }}>
          <span style={{
            fontSize: "1.15rem",
            fontWeight: 700,
            color: "white",
            opacity: 0.95,
            fontFamily: "'Comic Neue', cursive"
          }}>
            Follow us on social media
          </span>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {/* Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(10, 28, 58, 0.08)",
              transition: "all 0.2s",
              textDecoration: "none"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.background = "#f8f9fa";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = "white";
            }}>
              <FaFacebookF style={{ color: "#1877f2", fontSize: "0.95rem" }} />
            </a>

            {/* Twitter-X */}
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(10, 28, 58, 0.08)",
              transition: "all 0.2s",
              textDecoration: "none"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.background = "#f8f9fa";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = "white";
            }}>
              <FaXTwitter style={{ color: "#0f1419", fontSize: "0.95rem" }} />
            </a>

            {/* LinkedIn */}
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(10, 28, 58, 0.08)",
              transition: "all 0.2s",
              textDecoration: "none"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.background = "#f8f9fa";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = "white";
            }}>
              <FaLinkedinIn style={{ color: "#0a66c2", fontSize: "0.95rem" }} />
            </a>

            {/* YouTube */}
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(10, 28, 58, 0.08)",
              transition: "all 0.2s",
              textDecoration: "none"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.background = "#f8f9fa";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = "white";
            }}>
              <FaYoutube style={{ color: "#ff0000", fontSize: "0.95rem" }} />
            </a>

            {/* WeChat */}
            <a href="#" target="_blank" rel="noopener noreferrer" style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(10, 28, 58, 0.08)",
              transition: "all 0.2s",
              textDecoration: "none"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.background = "#f8f9fa";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = "white";
            }}>
              <FaWeixin style={{ color: "#07c160", fontSize: "1rem" }} />
            </a>
          </div>
        </div>
      </section>

      {/* Map Location Section */}
      <section className="container" style={{ marginTop: "4rem", marginBottom: "4rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2 style={{
            fontSize: "2rem",
            fontWeight: 800,
            color: "var(--text)",
            fontFamily: "'Baloo 2', cursive"
          }}>
            Our Location
          </h2>
        </div>
        <div style={{
          width: "100%",
          height: "450px",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.08)",
          border: "1px solid rgba(10, 28, 58, 0.06)"
        }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.1574144561273!2d90.4401676855508!3d23.706072035573392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b74097c9ee29%3A0x4ed71eb5b2894d99!2sColor%20Hut!5e0!3m2!1sen!2sbd!4v1779648925770!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
