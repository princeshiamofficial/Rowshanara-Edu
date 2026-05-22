"use client";

import React, { useState, useMemo } from "react";

export default function UniversitiesPage() {
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const countries = ["All", "United Kingdom", "United States", "Canada", "Australia", "Europe"];

  const universities = [
    {
      name: "University of Greenwich",
      country: "United Kingdom",
      logo: "gb",
      location: "London, UK",
      ranking: "Top 501-600 (THE World)",
      courses: ["MBA", "MSc Data Science", "BEng Mechanical Engineering"],
      acceptanceRate: "64%",
      feeRange: "£14,500 - £17,500 / Yr"
    },
    {
      name: "Coventry University",
      country: "United Kingdom",
      logo: "gb",
      location: "Coventry, UK",
      ranking: "Top 30 UK (Guardian)",
      courses: ["MSc Cybersecurity", "MA Global Business", "BSc Computer Science"],
      acceptanceRate: "58%",
      feeRange: "£15,000 - £18,600 / Yr"
    },
    {
      name: "Arizona State University",
      country: "United States",
      logo: "us",
      location: "Phoenix, USA",
      ranking: "#1 in US for Innovation",
      courses: ["MS Computer Science", "MBA", "BS Biomedical Sciences"],
      acceptanceRate: "88%",
      feeRange: "$29,000 - $37,000 / Yr"
    },
    {
      name: "University of Illinois Chicago",
      country: "United States",
      logo: "us",
      location: "Chicago, USA",
      ranking: "Top 100 US Universities",
      courses: ["MS Business Analytics", "MS Electrical Engineering"],
      acceptanceRate: "72%",
      feeRange: "$28,000 - $34,000 / Yr"
    },
    {
      name: "York University",
      country: "Canada",
      logo: "ca",
      location: "Toronto, Canada",
      ranking: "Top 350 QS Global",
      courses: ["Schulich MBA", "MSc Business Analytics", "BBA"],
      acceptanceRate: "47%",
      feeRange: "CAD$28,000 - $36,000 / Yr"
    },
    {
      name: "Royal Roads University",
      country: "Canada",
      logo: "ca",
      location: "Victoria, Canada",
      ranking: "#1 for Active Learning",
      courses: ["MBA Global Leadership", "MGM Global Management"],
      acceptanceRate: "60%",
      feeRange: "CAD$22,000 - $26,000 / Yr"
    },
    {
      name: "Macquarie University",
      country: "Australia",
      logo: "au",
      location: "Sydney, Australia",
      ranking: "Top 130 QS Global",
      courses: ["Master of Professional Accounting", "Master of IT"],
      acceptanceRate: "40%",
      feeRange: "AUD$34,000 - $41,000 / Yr"
    },
    {
      name: "Deakin University",
      country: "Australia",
      logo: "au",
      location: "Melbourne, Australia",
      ranking: "Top 1% Worldwide",
      courses: ["Master of Business Analytics", "Bachelor of IT"],
      acceptanceRate: "70%",
      feeRange: "AUD$30,000 - $38,000 / Yr"
    },
    {
      name: "Halmstad University",
      country: "Europe",
      logo: "se",
      location: "Halmstad, Sweden",
      ranking: "Innovative Technical Hub",
      courses: ["MSc Embedded Systems", "MSc Mechanical Engineering"],
      acceptanceRate: "50%",
      feeRange: "€9,000 - €12,500 / Yr"
    }
  ];

  // Filtering Logic
  const filteredUniversities = useMemo(() => {
    return universities.filter(uni => {
      const matchCountry = selectedCountry === "All" || uni.country === selectedCountry;
      const matchSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          uni.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          uni.courses.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCountry && matchSearch;
    });
  }, [selectedCountry, searchQuery]);

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
          Partner Institutions
        </span>
        <h1 className="hero-responsive-title" style={{ 
          marginBottom: "1.5rem", 
          lineHeight: 1.2,
          fontWeight: 800,
          color: "var(--text)"
        }}>
          Find Your Ideal University
        </h1>
        <p style={{ 
          fontSize: "1.2rem", 
          opacity: 0.85, 
          maxWidth: "750px", 
          margin: "0 auto", 
          lineHeight: 1.7,
          color: "var(--text)"
        }}>
          We are officially affiliated with hundreds of world-class universities across the globe, providing students with seamless admissions and guaranteed admissions processing.
        </p>
      </section>

      {/* Search and Filters */}
      <section className="container" style={{ marginBottom: "3.5rem" }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          maxWidth: "950px",
          margin: "0 auto",
          background: "white",
          padding: "2rem",
          borderRadius: "24px",
          boxShadow: "0 10px 30px rgba(224, 145, 0, 0.04)",
          border: "1px solid rgba(224, 145, 0, 0.08)"
        }}>
          {/* Search bar */}
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <i className="bi bi-search" style={{ position: "absolute", left: "1.25rem", color: "var(--primary)", fontSize: "1.2rem" }}></i>
            <input
              type="text"
              placeholder="Search universities, locations, or specific programs..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "1.1rem 1.1rem 1.1rem 3.5rem",
                borderRadius: "14px",
                border: "2px solid rgba(224, 145, 0, 0.12)",
                fontSize: "1rem",
                outline: "none",
                fontFamily: "inherit",
                color: "var(--text)",
                transition: "all 0.3s ease"
              }}
              onFocus={e => e.currentTarget.style.borderColor = "var(--primary)"}
              onBlur={e => e.currentTarget.style.borderColor = "rgba(224, 145, 0, 0.12)"}
            />
          </div>

          {/* Country Tabs */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {countries.map((c, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCountry(c)}
                style={{
                  padding: "0.6rem 1.4rem",
                  borderRadius: "10px",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  background: selectedCountry === c ? "var(--primary)" : "rgba(224, 145, 0, 0.05)",
                  color: selectedCountry === c ? "white" : "var(--text)",
                  border: "none",
                  transition: "all 0.2s ease"
                }}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* University Grid */}
      <section className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "2rem" }}>
          {filteredUniversities.map((uni, index) => (
            <div key={index} className="glass" style={{
              background: "rgba(255, 255, 255, 0.75)",
              border: "1px solid rgba(224, 145, 0, 0.15)",
              borderRadius: "24px",
              padding: "2.5rem",
              boxShadow: "0 10px 30px rgba(224, 145, 0, 0.03)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(224, 145, 0, 0.08)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(224, 145, 0, 0.03)";
            }}>
              <div>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                  <div style={{
                    width: "55px",
                    height: "55px",
                    borderRadius: "12px",
                    background: "rgba(224, 145, 0, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <img src={`https://flagcdn.com/w40/${uni.logo}.png`} alt={uni.country} style={{ width: "32px", height: "auto", borderRadius: "2px" }} />
                  </div>
                  <span style={{
                    background: "rgba(34, 197, 94, 0.1)",
                    color: "var(--cta-hover)",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    padding: "0.3rem 0.8rem",
                    borderRadius: "20px",
                    textTransform: "uppercase"
                  }}>
                    Acceptance: {uni.acceptanceRate}
                  </span>
                </div>

                <h3 style={{ fontSize: "1.4rem", color: "var(--text)", marginBottom: "0.5rem" }}>{uni.name}</h3>
                
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", color: "var(--text)", opacity: 0.6, fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                  <i className="bi bi-geo-alt-fill" style={{ color: "var(--primary)" }}></i>
                  <span>{uni.location}</span>
                </div>

                {/* Parameters */}
                <div style={{ background: "white", padding: "1.2rem", borderRadius: "14px", border: "1px solid rgba(224, 145, 0, 0.05)", marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "0.85rem" }}>
                    <span style={{ fontWeight: 700, opacity: 0.6, color: "var(--text)" }}>Ranking</span>
                    <span style={{ fontWeight: 800, color: "var(--primary)" }}>{uni.ranking}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                    <span style={{ fontWeight: 700, opacity: 0.6, color: "var(--text)" }}>Est. Tuition Fee</span>
                    <span style={{ fontWeight: 800, color: "var(--cta-hover)" }}>{uni.feeRange}</span>
                  </div>
                </div>

                {/* Popular Courses */}
                <div style={{ marginBottom: "2rem" }}>
                  <span style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text)", opacity: 0.5, display: "block", marginBottom: "0.75rem" }}>
                    Popular Programs
                  </span>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {uni.courses.map((course, cIdx) => (
                      <span key={cIdx} style={{
                        background: "rgba(224, 145, 0, 0.05)",
                        color: "var(--text)",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        padding: "0.3rem 0.75rem",
                        borderRadius: "8px",
                        border: "1px solid rgba(224, 145, 0, 0.08)"
                      }}>
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button className="btn btn-outline" style={{ width: "100%", padding: "0.8rem", borderRadius: "12px", border: "1px solid var(--primary)", fontSize: "0.95rem" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "var(--primary)"; e.currentTarget.style.color = "white"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--primary)"; }}>
                Check Admission Eligibility
              </button>
            </div>
          ))}
        </div>

        {filteredUniversities.length === 0 && (
          <div style={{ textAlign: "center", padding: "5rem 2rem" }}>
            <i className="bi bi-folder-x" style={{ fontSize: "4rem", color: "var(--primary)", opacity: 0.3 }}></i>
            <h3 style={{ fontSize: "1.5rem", marginTop: "1rem", color: "var(--text)" }}>No Universities Found</h3>
            <p style={{ opacity: 0.6, color: "var(--text)", marginTop: "0.5rem" }}>
              Try adjusting your country filters or search query to find matching institutions.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
