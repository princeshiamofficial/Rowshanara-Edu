"use client";

import React from "react";

export default function AboutPage() {
  const values = [
    { title: "Integrity First", icon: "🤝", desc: "We provide honest, transparent assessment of profile eligibilities, university criteria, and visa requirements, putting student outcomes above all else." },
    { title: "Student Centricity", icon: "❤️", desc: "Every student profile is unique. We customize study pathways to respect individual aspirations, financial budgets, and long-term career goals." },
    { title: "Global Partnerships", icon: "🌐", desc: "We maintain direct, trusted relations with high-quality institutions globally, guaranteeing swift and credible application turnarounds." }
  ];

  const milestones = [
    { year: "2018", title: "Founding Journey", desc: "Rowshanara Edu was established with a singular focus: simplifying study abroad advising with unmatched counselor professionalism." },
    { year: "2020", title: "Virtual Expansion", desc: "Successfully launched advanced digital systems, connecting students from remote divisions to global partner universities." },
    { year: "2022", title: "1000+ Visas Secured", desc: "Celebrated the milestone of helping over 1,000 students enroll at prestigious universities in the UK, USA, and Canada." },
    { year: "2025", title: "Global Consultancy Leader", desc: "Voted one of the most reliable educational advisors, partnering directly with over 300+ accredited universities." }
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
          About Rowshanara Edu
        </span>
        <h1 className="hero-responsive-title" style={{ 
          marginBottom: "1.5rem", 
          lineHeight: 1.2,
          fontWeight: 800,
          color: "var(--text)"
        }}>
          Empowering Minds, Shaping Futures
        </h1>
        <p style={{ 
          fontSize: "1.2rem", 
          opacity: 0.85, 
          maxWidth: "750px", 
          margin: "0 auto", 
          lineHeight: 1.7,
          color: "var(--text)"
        }}>
          Rowshanara Edu is a leading international educational consultancy platform. We specialize in paving seamless, reliable pathways for students seeking to pursue higher studies in the world's finest universities.
        </p>
      </section>

      {/* Vision & Mission Split */}
      <section className="container" style={{ marginBottom: "6rem" }}>
        <div className="about-mission-vision" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem" }}>
          {/* Mission Card */}
          <div className="glass" style={{
            padding: "4rem 3rem",
            borderRadius: "28px",
            background: "rgba(255, 255, 255, 0.75)",
            border: "1px solid rgba(224, 145, 0, 0.15)",
            boxShadow: "0 15px 35px rgba(224, 145, 0, 0.04)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <i className="bi bi-compass" style={{ fontSize: "2rem", color: "var(--primary)" }}></i>
              <h2 style={{ fontSize: "2rem", color: "var(--text)", margin: 0 }}>Our Mission</h2>
            </div>
            <p style={{ fontSize: "1.1rem", lineHeight: 1.7, color: "var(--text)", opacity: 0.85 }}>
              To democratize global higher education pathways by delivering honest, professional, and personalized consulting. We aim to guide students towards institutions that cultivate their full academic potentials, equipping them for global impact and future-readiness.
            </p>
          </div>

          {/* Vision Card */}
          <div className="glass" style={{
            padding: "4rem 3rem",
            borderRadius: "28px",
            background: "rgba(255, 255, 255, 0.75)",
            border: "1px solid rgba(224, 145, 0, 0.15)",
            boxShadow: "0 15px 35px rgba(224, 145, 0, 0.04)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <i className="bi bi-eye" style={{ fontSize: "2rem", color: "var(--primary)" }}></i>
              <h2 style={{ fontSize: "2rem", color: "var(--text)", margin: 0 }}>Our Vision</h2>
            </div>
            <p style={{ fontSize: "1.1rem", lineHeight: 1.7, color: "var(--text)", opacity: 0.85 }}>
              To be recognized as the absolute gold-standard for ethical and transformative educational consulting. We envision a future where geographical boundaries do not limit student ambition, making world-class degrees accessible to all deserving minds.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="container" style={{ marginBottom: "7rem" }}>
        <h2 style={{ textAlign: "center", fontSize: "2.5rem", color: "var(--text)", marginBottom: "3.5rem" }}>
          Our Pillars of Excellence
        </h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem" }}>
          {values.map((val, idx) => (
            <div key={idx} style={{
              background: "white",
              padding: "3rem 2.5rem",
              borderRadius: "24px",
              border: "1px solid rgba(224, 145, 0, 0.08)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
              textAlign: "center"
            }}>
              <div style={{
                fontSize: "2.5rem",
                width: "60px",
                height: "60px",
                background: "rgba(224, 145, 0, 0.08)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem auto"
              }}>
                {val.icon}
              </div>
              <h3 style={{ fontSize: "1.35rem", marginBottom: "1rem", color: "var(--text)" }}>{val.title}</h3>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--text)", opacity: 0.75 }}>{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Historical Milestones */}
      <section className="container">
        <h2 style={{ textAlign: "center", fontSize: "2.5rem", color: "var(--text)", marginBottom: "4rem" }}>
          Our Professional Milestones
        </h2>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          maxWidth: "850px",
          margin: "0 auto",
          position: "relative"
        }}>
          {/* Vertical central bar */}
          <div style={{
            position: "absolute",
            left: "50px",
            top: "20px",
            bottom: "20px",
            width: "3px",
            background: "rgba(224, 145, 0, 0.2)"
          }}></div>

          {milestones.map((ms, index) => (
            <div key={index} style={{
              display: "flex",
              alignItems: "center",
              gap: "2.5rem",
              position: "relative"
            }}>
              {/* Year indicator pill */}
              <div style={{
                width: "100px",
                height: "50px",
                borderRadius: "25px",
                background: "var(--primary)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "1.1rem",
                flexShrink: 0,
                zIndex: 2,
                boxShadow: "0 8px 16px rgba(224, 145, 0, 0.3)"
              }}>
                {ms.year}
              </div>
              
              {/* Detail box */}
              <div className="glass" style={{
                padding: "2rem 2.5rem",
                borderRadius: "20px",
                background: "rgba(255, 255, 255, 0.8)",
                border: "1px solid rgba(224, 145, 0, 0.1)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.02)",
                flexGrow: 1
              }}>
                <h3 style={{ fontSize: "1.25rem", color: "var(--text)", marginBottom: "0.5rem" }}>{ms.title}</h3>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--text)", opacity: 0.75, margin: 0 }}>{ms.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
