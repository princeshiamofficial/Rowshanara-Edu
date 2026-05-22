"use client";

import React, { useState } from "react";

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState(0);

  const services = [
    {
      title: "Admission Counselling & Course Selection",
      icon: "🏫",
      desc: "Navigate the complex admissions process with expert guidance and select the perfect course to match your aspirations.",
      highlights: ["Personalized course matching", "University selection advising", "SOP & recommendation reviews"]
    },
    {
      title: "English Language Preparation (IELTS/PTE) & NAATI CCL",
      icon: "✍️",
      desc: "Excel in English proficiency exams such as IELTS, PTE, and NAATI CCL with our tailored preparation programs.",
      highlights: ["Certified expert trainers", "Comprehensive study materials", "Frequent mock testing loops"]
    },
    {
      title: "Scholarship & Financial Assistance",
      icon: "💰",
      desc: "Unlock opportunities for scholarships and financial aid to support your academic ambitions.",
      highlights: ["Bursary & grant screening", "100% tuition waiver prep", "Financial proof documentation advisory"]
    },
    {
      title: "Arranging Health Cover OSHC/OVHC",
      icon: "🩺",
      desc: "Ensure your well-being with hassle-free arrangements for Overseas Student Health Cover (OSHC) or Overseas Visitor Health Cover (OVHC).",
      highlights: ["Trusted partner cover providers", "Instant health policy generation", "Comprehensive medical compliance"]
    },
    {
      title: "Visa Assistance",
      icon: "🎫",
      desc: "Simplify the visa application process with our experienced team providing guidance and support every step of the way.",
      highlights: ["Step-by-step document guidance", "Mock visa interviews", "High visa success rates"]
    },
    {
      title: "Course Provider Changing",
      icon: "🔄",
      desc: "Explore options for changing course providers and optimizing your educational experience.",
      highlights: ["Provider release request support", "Credit transfer options evaluation", "Visa status safety compliance"]
    },
    {
      title: "Professional Year Admission",
      icon: "💼",
      desc: "Secure admission into professional year programs to kickstart your career journey in your chosen field.",
      highlights: ["Authorized PY provider options", "Internship placement assistance", "Valuable migration points prep"]
    }
  ];

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
          What We Offer
        </span>
        <h1 className="hero-responsive-title" style={{ 
          marginBottom: "1.5rem", 
          lineHeight: 1.2,
          fontWeight: 800,
          color: "var(--text)"
        }}>
          Empowering Your Global Education <br /> Journey With Premium Services
        </h1>
        <p style={{ 
          fontSize: "1.2rem", 
          opacity: 0.85, 
          maxWidth: "750px", 
          margin: "0 auto", 
          lineHeight: 1.7,
          color: "var(--text)"
        }}>
          From selecting the right academic program to landing safely in your dream destination, our professional team stands beside you every single step of the way.
        </p>
      </section>

      {/* Services Grid */}
      <section className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "2.5rem" }}>
          {services.map((service, index) => (
            <div key={index} className="glass" style={{
              padding: "3rem 2.5rem",
              borderRadius: "24px",
              background: "rgba(255, 255, 255, 0.75)",
              border: "1px solid rgba(224, 145, 0, 0.15)",
              boxShadow: "0 15px 35px rgba(224, 145, 0, 0.05)",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              cursor: "default"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 25px 45px rgba(224, 145, 0, 0.12)";
              e.currentTarget.style.borderColor = "var(--primary)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 15px 35px rgba(224, 145, 0, 0.05)";
              e.currentTarget.style.borderColor = "rgba(224, 145, 0, 0.15)";
            }}>
              <div style={{
                fontSize: "3rem",
                width: "70px",
                height: "70px",
                borderRadius: "16px",
                background: "rgba(224, 145, 0, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "2rem"
              }}>
                {service.icon}
              </div>
              <h3 style={{ fontSize: "1.75rem", marginBottom: "1rem", color: "var(--text)" }}>{service.title}</h3>
              <p style={{ color: "var(--text)", opacity: 0.8, marginBottom: "2rem", lineHeight: 1.6, fontSize: "1rem" }}>{service.desc}</p>
              
              <div style={{ borderTop: "1px solid rgba(224, 145, 0, 0.1)", paddingTop: "1.5rem" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--primary)", display: "block", marginBottom: "1rem" }}>
                  Key Highlights
                </span>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {service.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", fontSize: "0.95rem", color: "var(--text)" }}>
                      <i className="bi bi-patch-check-fill" style={{ color: "var(--cta)" }}></i>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="container" style={{ marginTop: "7rem" }}>
        <div className="glass-dark services-cta-padding" style={{
          borderRadius: "32px",
          textAlign: "center",
          background: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)",
          color: "white",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
        }}>
          <h2 style={{ fontSize: "2.75rem", marginBottom: "1.5rem", color: "white" }}>Ready to Take the Next Step?</h2>
          <p style={{ fontSize: "1.2rem", marginBottom: "3rem", opacity: 0.85, maxWidth: "650px", margin: "0 auto 3rem auto", lineHeight: 1.7 }}>
            Schedule an intensive, one-on-one virtual or physical consulting session with our senior counselor and turn your study dreams into reality.
          </p>
          <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center" }}>
            <button className="btn btn-secondary" style={{ padding: "1rem 3rem" }}>Book Free Consultation</button>
            <button className="btn btn-outline" style={{ border: "2px solid white", color: "white" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = "#0f172a"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "white"; }}>
              Speak with Advisors
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
