"use client";

import React, { useState } from "react";

export default function DestinationPage() {
  const [selectedDest, setSelectedDest] = useState(0);

  const destinations = [
    {
      country: "United Kingdom",
      flag: "gb",
      tagline: "World-class education & rich heritage in the heart of Europe.",
      description: "The UK is home to some of the world's oldest and most prestigious universities. With standard degrees taking 3 years for undergraduate and 1 year for postgraduate studies, it offers a highly efficient and world-renowned route to advanced learning.",
      features: [
        { label: "Post-Study Work", value: "2 Years Graduate Route" },
        { label: "Intakes Available", value: "September, January, May" },
        { label: "Part-time Work", value: "20 Hours/Week (Term-time)" },
        { label: "Tuition Fees Range", value: "£12,000 - £26,000 / Year" }
      ],
      reasons: [
        "Shorter course duration saves tuition and accommodation costs.",
        "Access to world-class libraries, cutting-edge research laboratories, and top-tier faculty.",
        "Generous scholarships and bursary schemes available for outstanding academic profiles."
      ]
    },
    {
      country: "United States",
      flag: "us",
      tagline: "Unparalleled academic flexibility & career opportunity.",
      description: "The USA offers an incredibly diverse academic ecosystem, hosting over 4,000 accredited universities. It is highly valued for practical training options (OPT/CPT) and pioneering developments in technology and business leadership.",
      features: [
        { label: "Post-Study Work", value: "1 - 3 Years OPT (STEM)" },
        { label: "Intakes Available", value: "Fall (Aug), Spring (Jan)" },
        { label: "Part-time Work", value: "20 Hours/Week (On-campus)" },
        { label: "Tuition Fees Range", value: "$18,000 - $45,000 / Year" }
      ],
      reasons: [
        "Unrivaled industry connections with Fortune 500 corporations.",
        "High degree of academic flexibility to design custom majors.",
        "Exceptional research grants and assistantships for postgraduate researchers."
      ]
    },
    {
      country: "Canada",
      flag: "ca",
      tagline: "Diverse, safe, & top choice for permanent migration pathways.",
      description: "Canada combines highly affordable education with an outstanding quality of life and extremely favorable post-study immigration pathways. It is widely considered one of the safest and most welcoming study environments.",
      features: [
        { label: "Post-Study Work", value: "Up to 3 Years PGWP" },
        { label: "Intakes Available", value: "September, January, May" },
        { label: "Part-time Work", value: "20 Hours/Week (Off-campus)" },
        { label: "Tuition Fees Range", value: "CAD$15,000 - $35,000 / Year" }
      ],
      reasons: [
        "Streamlined post-graduation work permit (PGWP) conversion.",
        "Extremely safe, multicultural environment with stunning natural landscapes.",
        "Highly affordable living standards and lower tuition than the US or UK."
      ]
    },
    {
      country: "Australia",
      flag: "au",
      tagline: "Stunning lifestyle, vibrant cities, & strong global recognition.",
      description: "Australia is highly popular for its incredible weather, vibrant metropolises, and globally accredited educational programs. Universities here excel in engineering, healthcare, accounting, and tourism management.",
      features: [
        { label: "Post-Study Work", value: "2 - 4 Years Post-Study Work Visa" },
        { label: "Intakes Available", value: "February, July, November" },
        { label: "Part-time Work", value: "48 Hours/Fortnight (In-session)" },
        { label: "Tuition Fees Range", value: "AUD$20,000 - $42,000 / Year" }
      ],
      reasons: [
        "Generous post-study work visa durations to gain critical international work experience.",
        "Top-ranked, sun-drenched coastal cities consistently voted among the most livable in the world.",
        "Strong focus on practical, vocationally-driven university courses."
      ]
    },
    {
      country: "European Union / Sweden",
      flag: "eu",
      tagline: "Pioneering innovation, rich culture, & sustainable academic focus.",
      description: "Study in progressive European destinations such as Sweden, Germany, or the Netherlands. Famed for green initiatives, tech innovation (Spotify, Ikea, ASML), and extremely high standards of English fluency.",
      features: [
        { label: "Post-Study Work", value: "1 Year Job Search Visa" },
        { label: "Intakes Available", value: "Autumn (August), Spring (January)" },
        { label: "Part-time Work", value: "Flexible (Germany/Sweden permit)" },
        { label: "Tuition Fees Range", value: "€9,000 - €18,000 / Year" }
      ],
      reasons: [
        "Focus on critical thinking, sustainability, and creative student collaboration.",
        "Abundant English-medium undergraduate and postgraduate degrees.",
        "Excellent travel and culture experiences across the entire Schengen Zone."
      ]
    }
  ];

  return (
    <div className="hero-gradient" style={{ minHeight: "100vh", paddingTop: "8rem", paddingBottom: "6rem" }}>
      {/* Banner */}
      <section className="container" style={{ textAlign: "center", marginBottom: "4rem" }}>
        <span style={{ 
          color: "var(--primary)", 
          fontWeight: 800, 
          letterSpacing: "0.2em", 
          fontSize: "0.875rem", 
          marginBottom: "1.5rem",
          display: "block",
          textTransform: "uppercase"
        }}>
          Study Destinations
        </span>
        <h1 className="hero-responsive-title" style={{ 
          marginBottom: "1.5rem", 
          lineHeight: 1.2,
          fontWeight: 800,
          color: "var(--text)"
        }}>
          Explore Your Academic Horizons
        </h1>
        <p style={{ 
          fontSize: "1.2rem", 
          opacity: 0.85, 
          maxWidth: "750px", 
          margin: "0 auto", 
          lineHeight: 1.7,
          color: "var(--text)"
        }}>
          Choose from the leading educational landscapes. We assist with applications, visas, and transitions across these highly coveted international study destinations.
        </p>
      </section>

      {/* Country Selection Tabs */}
      <section className="container" style={{ marginBottom: "4rem" }}>
        <div style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "1rem",
          padding: "0.5rem",
          background: "white",
          borderRadius: "20px",
          boxShadow: "0 10px 25px rgba(224, 145, 0, 0.05)",
          maxWidth: "900px",
          margin: "0 auto",
          border: "1px solid rgba(224, 145, 0, 0.1)"
        }}>
          {destinations.map((dest, index) => (
            <button
              key={index}
              onClick={() => setSelectedDest(index)}
              style={{
                padding: "0.8rem 1.6rem",
                borderRadius: "14px",
                fontSize: "1rem",
                fontWeight: 700,
                cursor: "pointer",
                background: selectedDest === index ? "var(--primary)" : "transparent",
                color: selectedDest === index ? "white" : "var(--text)",
                opacity: selectedDest === index ? 1 : 0.8,
                transition: "all 0.3s ease",
                border: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
              <img src={`https://flagcdn.com/w40/${dest.flag}.png`} alt={dest.country} style={{ width: "20px", height: "auto", borderRadius: "2px" }} />
              {dest.country}
            </button>
          ))}
        </div>
      </section>

      {/* Main Destination Details */}
      <section className="container">
        <div className="glass destination-grid destination-card-split" style={{
          borderRadius: "32px",
          background: "rgba(255, 255, 255, 0.8)",
          border: "1px solid rgba(224, 145, 0, 0.15)",
          boxShadow: "0 20px 45px rgba(224, 145, 0, 0.08)"
        }}>
          {/* Left Details */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <img src={`https://flagcdn.com/w80/${destinations[selectedDest].flag}.png`} alt={destinations[selectedDest].country} style={{ width: "50px", height: "auto", borderRadius: "4px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }} />
              <div>
                <span style={{ fontSize: "0.875rem", fontWeight: 800, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Featured Destination</span>
                <h2 style={{ fontSize: "2.75rem", margin: 0, color: "var(--text)" }}>{destinations[selectedDest].country}</h2>
              </div>
            </div>
            
            <h4 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--primary)", marginBottom: "1.5rem", fontStyle: "italic" }}>
              "{destinations[selectedDest].tagline}"
            </h4>

            <p style={{ fontSize: "1.05rem", lineHeight: 1.7, opacity: 0.85, marginBottom: "2.5rem", color: "var(--text)" }}>
              {destinations[selectedDest].description}
            </p>

            <div style={{ borderTop: "1px solid rgba(224, 145, 0, 0.1)", paddingTop: "2rem" }}>
              <h3 style={{ fontSize: "1.4rem", marginBottom: "1.5rem", color: "var(--text)" }}>Why Study in {destinations[selectedDest].country}?</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {destinations[selectedDest].reasons.map((reason, idx) => (
                  <li key={idx} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1rem", fontSize: "1rem", color: "var(--text)" }}>
                    <i className="bi bi-check2-circle" style={{ color: "var(--cta)", fontSize: "1.25rem", flexShrink: 0, marginTop: "0.2rem" }}></i>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Highlights Panel */}
          <div style={{
            background: "white",
            padding: "3rem 2.5rem",
            borderRadius: "24px",
            border: "1px solid rgba(224, 145, 0, 0.1)",
            boxShadow: "0 15px 35px rgba(0,0,0,0.02)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}>
            <div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "2rem", color: "var(--text)", borderBottom: "2px solid rgba(224, 145, 0, 0.1)", paddingBottom: "1rem" }}>
                Key Visa & Study Parameters
              </h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {destinations[selectedDest].features.map((feat, fIdx) => (
                  <div key={fIdx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(0,0,0,0.04)", paddingBottom: "0.75rem" }}>
                    <span style={{ fontWeight: 700, color: "var(--text)", opacity: 0.7, fontSize: "0.95rem" }}>{feat.label}</span>
                    <span style={{ fontWeight: 800, color: "var(--primary)", fontSize: "1rem", textAlign: "right" }}>{feat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: "3rem", textAlign: "center" }}>
              <p style={{ fontSize: "0.9rem", color: "var(--text)", opacity: 0.6, marginBottom: "1.5rem" }}>
                Interested in studying in {destinations[selectedDest].country}? Get a free assessment.
              </p>
              <button className="btn btn-primary" style={{ width: "100%", padding: "1rem" }}>
                Apply for {destinations[selectedDest].country}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
