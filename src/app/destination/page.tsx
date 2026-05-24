"use client";

import React from "react";
import { FaDollarSign, FaBriefcase, FaPassport } from "react-icons/fa6";

export default function DestinationPage() {
  const destinationList = [
    {
      code: "GB",
      name: "United Kingdom",
      region: "Europe",
      cost: "$15,000 - $35,000/year",
      work: "20 hours/week",
      pr: "Yes",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
    },
    {
      code: "CA",
      name: "Canada",
      region: "North America",
      cost: "$12,000 - $28,000/year",
      work: "20 hours/week",
      pr: "Yes",
      gradient: "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)"
    },
    {
      code: "AU",
      name: "Australia",
      region: "Oceania",
      cost: "$13,000 - $32,000/year",
      work: "20 hours/week",
      pr: "Yes",
      gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)"
    },
    {
      code: "US",
      name: "USA",
      region: "North America",
      cost: "$20,000 - $50,000/year",
      work: "20 hours/week",
      pr: "Through OPT",
      gradient: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)"
    },
    {
      code: "DE",
      name: "Germany",
      region: "Europe",
      cost: "$0 - $10,000/year",
      work: "20 hours/week",
      pr: "Yes",
      gradient: "linear-gradient(135deg, #475569 0%, #334155 100%)"
    },
    {
      code: "MY",
      name: "Malaysia",
      region: "Asia",
      cost: "$5,000 - $15,000/year",
      work: "20 hours/week",
      pr: "Limited",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
    },
    {
      code: "IE",
      name: "Ireland",
      region: "Europe",
      cost: "$10,000 - $25,000/year",
      work: "20 hours/week",
      pr: "Yes",
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
    },
    {
      code: "NZ",
      name: "New Zealand",
      region: "Oceania",
      cost: "$14,000 - $30,000/year",
      work: "20 hours/week",
      pr: "Yes",
      gradient: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)"
    }
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--background)", paddingTop: "140px" }}>
      {/* Header Banner */}
      <section style={{
        width: "95%",
        maxWidth: "1280px",
        margin: "0 auto 2.5rem auto",
        background: "linear-gradient(135deg, rgba(10, 28, 58, 0.88) 0%, rgba(6, 17, 36, 0.94) 100%), url('/hero-bg.png') no-repeat center center",
        backgroundSize: "cover",
        padding: "1.75rem 2rem",
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
            marginBottom: "0.25rem",
            color: "white",
            fontFamily: "'Baloo 2', cursive",
            lineHeight: 1.2
          }}>
            Study Destinations
          </h1>
          <p style={{
            fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
            color: "rgba(255, 255, 255, 0.85)",
            maxWidth: "750px",
            margin: "0 auto 0.75rem auto",
            lineHeight: 1.6,
            fontFamily: "'Comic Neue', cursive"
          }}>
            Explore 20+ countries and find your perfect study destination
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
            <span style={{ color: "white" }}>Destinations</span>
          </div>
        </div>
      </section>

      {/* Destinations Cards Grid */}
      <section className="container" style={{ marginTop: "4rem", marginBottom: "6rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem"
        }}>
          {destinationList.map((dest, index) => (
            <div key={index} style={{
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
                <span style={{
                  fontSize: "1.3rem",
                  fontWeight: 800,
                  opacity: 0.8,
                  display: "block",
                  marginBottom: "0.25rem",
                  letterSpacing: "0.05em"
                }}>
                  {dest.code}
                </span>
                
                <h3 style={{
                  fontSize: "1.85rem",
                  fontWeight: 800,
                  marginBottom: "0.25rem",
                  lineHeight: 1.2,
                  fontFamily: "'Baloo 2', cursive"
                }}>
                  {dest.name}
                </h3>
                
                <span style={{
                  fontSize: "0.9rem",
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
                  window.location.href = "/contact";
                }}
              >
                Explore Destination →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Destination Comparison */}
      <section className="container" style={{ marginTop: "4rem", marginBottom: "6rem" }}>
        <h2 style={{
          textAlign: "center",
          fontSize: "2.5rem",
          fontWeight: 800,
          color: "#0f172a",
          marginBottom: "3.5rem",
          fontFamily: "'Baloo 2', cursive"
        }}>
          Destination Comparison
        </h2>

        <div style={{
          background: "#ffffff",
          padding: "2rem",
          borderRadius: "28px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)",
          border: "1px solid #e2e8f0",
          overflowX: "auto"
        }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "750px",
            textAlign: "center"
          }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #2563eb" }}>
                <th style={{
                  textAlign: "left",
                  padding: "1.25rem 1rem",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "#0f172a",
                  fontFamily: "'Baloo 2', cursive"
                }}>
                  Metric
                </th>
                {[
                  { code: "GB", name: "UK" },
                  { code: "CA", name: "Canada" },
                  { code: "AU", name: "Australia" },
                  { code: "US", name: "USA" }
                ].map((country, idx) => (
                  <th key={idx} style={{
                    padding: "1.25rem 1rem",
                    fontSize: "1.05rem",
                    color: "#0f172a",
                    fontFamily: "'Baloo 2', cursive"
                  }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, opacity: 0.6, marginRight: "0.4rem", textTransform: "uppercase" }}>
                      {country.code}
                    </span>
                    <span style={{ fontWeight: 800 }}>{country.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { metric: "Tuition Cost", uk: "$15-35K", ca: "$12-28K", au: "$13-32K", us: "$20-50K" },
                { metric: "Living Cost", uk: "$12-18K", ca: "$15-20K", au: "$14-19K", us: "$18-25K" },
                { metric: "Work Rights", uk: "20 hrs/week", ca: "20 hrs/week", au: "20 hrs/week", us: "20 hrs/week" },
                { metric: "PR Opportunity", uk: "Yes", ca: "Yes", au: "Yes", us: "Through OPT" },
                { metric: "Language", uk: "English", ca: "English/French", au: "English", us: "English" },
                { metric: "Job Market", uk: "Excellent", ca: "Excellent", au: "Very Good", us: "Excellent" },
                { metric: "Visa Difficulty", uk: "Moderate", ca: "Easy", au: "Easy", us: "Moderate" }
              ].map((row, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{
                    textAlign: "left",
                    padding: "1.25rem 1rem",
                    fontWeight: 700,
                    color: "#0f172a",
                    fontSize: "1rem",
                    fontFamily: "'Baloo 2', cursive"
                  }}>
                    {row.metric}
                  </td>
                  <td style={{ padding: "1.25rem 1rem", color: "#475569", fontFamily: "'Comic Neue', cursive", fontSize: "0.95rem" }}>
                    {row.uk}
                  </td>
                  <td style={{ padding: "1.25rem 1rem", color: "#475569", fontFamily: "'Comic Neue', cursive", fontSize: "0.95rem" }}>
                    {row.ca}
                  </td>
                  <td style={{ padding: "1.25rem 1rem", color: "#475569", fontFamily: "'Comic Neue', cursive", fontSize: "0.95rem" }}>
                    {row.au}
                  </td>
                  <td style={{ padding: "1.25rem 1rem", color: "#475569", fontFamily: "'Comic Neue', cursive", fontSize: "0.95rem" }}>
                    {row.us}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" style={{ marginTop: "6rem", marginBottom: "4rem" }}>
        <div className="cta-container">
          <h2 className="cta-title">Ready to Study Abroad?</h2>
          <p className="cta-description">
            Get personalized guidance from our expert counselors. Your first consultation is completely free!
          </p>
          <button className="cta-button" onClick={() => window.location.href = "/contact"}>
            Get Free Counselling Today
          </button>
        </div>
      </section>
    </div>
  );
}
