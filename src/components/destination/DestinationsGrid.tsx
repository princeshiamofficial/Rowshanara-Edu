"use client";

import React, { useState, useEffect } from "react";
import { FaDollarSign, FaBriefcase, FaPassport, FaXmark } from "react-icons/fa6";

const destinationList = [
  {
    code: "GB",
    name: "United Kingdom",
    region: "Europe",
    cost: "$15,000 - $35,000/year",
    work: "20 hours/week",
    pr: "Yes",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    bullets: [
      "World-class education with prestigious universities",
      "Rich cultural heritage and diverse student community",
      "Strong post-study work visa opportunities"
    ],
    cities: "London, Oxford, Cambridge, Manchester",
    visaInfo: "Student visa required, processing 3-4 weeks"
  },
  {
    code: "CA",
    name: "Canada",
    region: "North America",
    cost: "$12,000 - $28,000/year",
    work: "20 hours/week",
    pr: "Yes",
    gradient: "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)",
    bullets: [
      "Top-quality education recognized globally",
      "Extremely welcoming and multicultural environment",
      "Post-graduation work permit (PGWP) pathways to PR"
    ],
    cities: "Toronto, Vancouver, Montreal, Waterloo",
    visaInfo: "Study permit required, processing 4-8 weeks"
  },
  {
    code: "AU",
    name: "Australia",
    region: "Oceania",
    cost: "$13,000 - $32,000/year",
    work: "20 hours/week",
    pr: "Yes",
    gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
    bullets: [
      "High academic standards and modern research labs",
      "Excellent weather, beaches, and student lifestyle",
      "Post-study work rights and high minimum wage"
    ],
    cities: "Sydney, Melbourne, Brisbane, Adelaide",
    visaInfo: "Student visa (Subclass 500) required, processing 2-4 weeks"
  },
  {
    code: "US",
    name: "USA",
    region: "North America",
    cost: "$20,000 - $50,000/year",
    work: "20 hours/week",
    pr: "Through OPT",
    gradient: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
    bullets: [
      "Unmatched flexibility and choice of specializations",
      "World-leading research and Ivy League institutions",
      "OPT opportunities (up to 3 years for STEM fields)"
    ],
    cities: "New York, Boston, San Francisco, Chicago",
    visaInfo: "F-1 student visa required, processing 1-3 weeks"
  },
  {
    code: "DE",
    name: "Germany",
    region: "Europe",
    cost: "$0 - $10,000/year",
    work: "20 hours/week",
    pr: "Yes",
    gradient: "linear-gradient(135deg, #475569 0%, #334155 100%)",
    bullets: [
      "No tuition fees at public universities",
      "Highly praised engineering and technology programs",
      "18-month post-study job seeker visa"
    ],
    cities: "Berlin, Munich, Frankfurt, Aachen",
    visaInfo: "Student visa required, blocked account needed, processing 4-6 weeks"
  },
  {
    code: "MY",
    name: "Malaysia",
    region: "Asia",
    cost: "$5,000 - $15,000/year",
    work: "20 hours/week",
    pr: "Limited",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    bullets: [
      "Low cost of living and affordable tuition fees",
      "Branch campuses of top UK & Australian universities",
      "Vibrant, safe and culturally diverse Asian hub"
    ],
    cities: "Kuala Lumpur, Penang, Johor Bahru",
    visaInfo: "Student pass (VAL) required, processing 3-4 weeks"
  },
  {
    code: "IE",
    name: "Ireland",
    region: "Europe",
    cost: "$10,000 - $25,000/year",
    work: "20 hours/week",
    pr: "Yes",
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    bullets: [
      "Only English-speaking country in the Eurozone",
      "European hub for tech giants (Google, Apple, Meta)",
      "2-year post-study work visa for graduates"
    ],
    cities: "Dublin, Cork, Galway, Limerick",
    visaInfo: "Study visa required, processing 4-6 weeks"
  },
  {
    code: "NZ",
    name: "New Zealand",
    region: "Oceania",
    cost: "$14,000 - $30,000/year",
    work: "20 hours/week",
    pr: "Yes",
    gradient: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
    bullets: [
      "All universities ranked in the top 3% globally",
      "Stunning natural landscapes and safe environment",
      "Excellent post-study work visa options"
    ],
    cities: "Auckland, Wellington, Christchurch",
    visaInfo: "Fee paying student visa required, processing 3-4 weeks"
  }
];

export default function DestinationsGrid() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const countryParam = params.get("country");
      if (countryParam) {
        const idx = destinationList.findIndex(
          (dest) => dest.name.toLowerCase() === countryParam.toLowerCase() || dest.code.toLowerCase() === countryParam.toLowerCase()
        );
        if (idx !== -1) {
          setExpandedIndex(idx);
          setTimeout(() => {
            const el = document.getElementById(`dest-card-${idx}`);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
          }, 200);
        }
      }
    }
  }, []);

  return (
    <section className="container" style={{ marginTop: "2rem", marginBottom: "3rem" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
        gap: "2rem"
      }}>
        {destinationList.map((dest, index) => {
          const isExpanded = expandedIndex === index;
          if (isExpanded) {
            return (
              <div key={index} id={`dest-card-${index}`} style={{
                background: "#f0f7ff",
                color: "#1e293b",
                padding: "2.25rem 2rem",
                borderRadius: "24px",
                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.05)",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "440px",
                border: "1px solid #d0e5ff",
                cursor: "default",
                position: "relative",
                textAlign: "left"
              }}>
                {/* Close button at top right */}
                <button 
                  onClick={() => setExpandedIndex(null)}
                  style={{
                    position: "absolute",
                    top: "1.25rem",
                    right: "1.25rem",
                    background: "#e1efff",
                    border: "none",
                    borderRadius: "50%",
                    width: "30px",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "#0066cc",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#cbe3ff";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "#e1efff";
                  }}
                >
                  <FaXmark style={{ fontSize: "0.95rem" }} />
                </button>

                <div>
                  {/* Header */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                    <img 
                      src={`https://flagcdn.com/w40/${dest.code.toLowerCase()}.png`} 
                      alt={`${dest.name} flag`} 
                      style={{ 
                        height: "18px", 
                        borderRadius: "3px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)"
                      }} 
                    />
                    <h3 style={{
                      fontSize: "1.35rem",
                      fontWeight: 800,
                      margin: 0,
                      color: "#0f172a",
                      fontFamily: "'Baloo 2', cursive"
                    }}>
                      {dest.name}
                    </h3>
                  </div>

                  {/* Why Study Here: */}
                  <div style={{ marginBottom: "1.25rem" }}>
                    <h4 style={{
                      fontSize: "0.95rem",
                      fontWeight: 800,
                      color: "#0f172a",
                      marginBottom: "0.5rem",
                      fontFamily: "'Baloo 2', cursive"
                    }}>
                      Why Study Here:
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      {dest.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.5rem",
                          fontSize: "0.88rem",
                          color: "#475569",
                          fontFamily: "'Comic Neue', cursive",
                          lineHeight: 1.35
                        }}>
                          <span style={{ color: "#f59e0b", fontWeight: "bold" }}>✓</span>
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Popular Cities: */}
                  <div style={{ marginBottom: "1.25rem" }}>
                    <h4 style={{
                      fontSize: "0.95rem",
                      fontWeight: 800,
                      color: "#0f172a",
                      marginBottom: "0.25rem",
                      fontFamily: "'Baloo 2', cursive"
                    }}>
                      Popular Cities:
                    </h4>
                    <p style={{
                      fontSize: "0.88rem",
                      color: "#475569",
                      margin: 0,
                      fontFamily: "'Comic Neue', cursive",
                      lineHeight: 1.4
                    }}>
                      {dest.cities}
                    </p>
                  </div>

                  {/* Visa Info: */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <h4 style={{
                      fontSize: "0.95rem",
                      fontWeight: 800,
                      color: "#0f172a",
                      marginBottom: "0.25rem",
                      fontFamily: "'Baloo 2', cursive"
                    }}>
                      Visa Info:
                    </h4>
                    <p style={{
                      fontSize: "0.88rem",
                      color: "#475569",
                      margin: 0,
                      fontFamily: "'Comic Neue', cursive",
                      lineHeight: 1.4
                    }}>
                      {dest.visaInfo}
                    </p>
                  </div>
                </div>

                {/* Explore Universities Button */}
                <button
                  className="btn"
                  style={{
                    width: "100%",
                    padding: "0.75rem 1.5rem",
                    background: "#2b4cff",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "12px",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    fontFamily: "'Outfit', sans-serif",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#1c3be6";
                    e.currentTarget.style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "#2b4cff";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                  onClick={() => {
                    window.location.href = `/universities?country=${dest.code === "GB" ? "UK" : dest.name}`;
                  }}
                >
                  Explore Universities →
                </button>
              </div>
            );
          }

          return (
            <div key={index} id={`dest-card-${index}`} style={{
              background: dest.gradient,
              color: "#ffffff",
              padding: "2.25rem 2rem",
              borderRadius: "24px",
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.08)",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "330px",
              cursor: "default"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 25px 45px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.08)";
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                  <img 
                    src={`https://flagcdn.com/w80/${dest.code.toLowerCase()}.png`} 
                    alt={`${dest.name} flag`} 
                    style={{ 
                      height: "24px", 
                      borderRadius: "4px",
                      boxShadow: "0 3px 6px rgba(0, 0, 0, 0.15)" 
                    }} 
                  />
                  <h3 style={{
                    fontSize: "clamp(1.35rem, 5.2vw, 1.85rem)",
                    fontWeight: 800,
                    lineHeight: 1.2,
                    fontFamily: "'Baloo 2', cursive",
                    margin: 0,
                    whiteSpace: "nowrap"
                  }}>
                    {dest.name}
                  </h3>
                </div>
                
                <span style={{
                  fontSize: "0.95rem",
                  opacity: 0.85,
                  display: "block",
                  marginBottom: "2rem"
                }}>
                  {dest.region}
                </span>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontFamily: "'Comic Neue', cursive" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.95rem" }}>
                    <FaDollarSign style={{ fontSize: "1.1rem", flexShrink: 0 }} />
                    <span>{dest.cost}</span>
                  </div>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.95rem" }}>
                    <FaBriefcase style={{ fontSize: "1.1rem", flexShrink: 0 }} />
                    <span>{dest.work}</span>
                  </div>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.95rem" }}>
                    <FaPassport style={{ fontSize: "1.1rem", flexShrink: 0 }} />
                    <span>PR: {dest.pr}</span>
                  </div>
                </div>
              </div>

              <button 
                className="btn"
                style={{
                  width: "100%",
                  padding: "0.8rem 1.5rem",
                  background: "rgba(255, 255, 255, 0.16)",
                  border: "none",
                  borderRadius: "12px",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  fontFamily: "'Outfit', sans-serif",
                  cursor: "pointer",
                  marginTop: "2.5rem",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.26)";
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.16)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
                onClick={() => {
                  setExpandedIndex(index);
                }}
              >
                Explore Destination →
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
