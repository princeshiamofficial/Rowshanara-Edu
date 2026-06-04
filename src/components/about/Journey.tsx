"use client";

import React, { useState } from "react";

const milestones = [
  { year: "2009", title: "Company Founded", desc: "Started with a vision to help Bangladeshi students study abroad" },
  { year: "2012", title: "First 100 Students", desc: "Reached milestone of 100 successful placements" },
  { year: "2015", title: "International Expansion", desc: "Opened offices in UK and Canada" },
  { year: "2018", title: "Partner Network", desc: "Established partnerships with 50+ universities" },
  { year: "2021", title: "5000+ Students", desc: "Celebrated 5000 successful student placements" },
  { year: "2024", title: "Industry Leader", desc: "Recognized as leading education consultancy in South Asia" }
];

export default function Journey() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="container" style={{ marginTop: "4.5rem", marginBottom: "2.5rem" }}>
      <h2 style={{ 
        textAlign: "center", 
        fontSize: "clamp(2rem, 4vw, 2.75rem)", 
        color: "var(--text)", 
        marginBottom: "3rem",
        fontFamily: "'Baloo 2', cursive",
        fontWeight: 800
      }}>
        Our Journey
      </h2>

      <div style={{
        position: "relative",
        maxWidth: "700px", // slightly narrower container for a more focused minimal look
        margin: "0 auto",
        padding: "0 1rem"
      }}>
        {milestones.map((ms, index) => {
          const isHovered = hoveredIndex === index;
          return (
            <div key={index} 
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                display: "flex",
                alignItems: "stretch",
                position: "relative",
                marginBottom: index === milestones.length - 1 ? 0 : "2rem"
              }}
            >
              {/* Year column */}
              <div style={{
                width: "80px", // reduced from 90px for cleaner spacing
                textAlign: "right",
                paddingRight: "20px",
                fontSize: "1.4rem",
                fontWeight: 800,
                color: isHovered ? "var(--primary)" : "#64748b",
                fontFamily: "'Baloo 2', cursive",
                lineHeight: "1.2",
                paddingTop: "6px",
                transition: "color 0.25s ease"
              }}>
                {ms.year}
              </div>

              {/* Dot column */}
              <div style={{
                width: "40px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative"
              }}>
                {/* The Dot Ring */}
                <div style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  border: isHovered ? "2px solid var(--primary)" : "2px solid rgba(224, 145, 0, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 2,
                  marginTop: "10px",
                  transition: "all 0.25s ease",
                  transform: isHovered ? "scale(1.2)" : "scale(1)",
                  boxShadow: isHovered ? "0 0 8px rgba(224, 145, 0, 0.12)" : "none"
                }}>
                  {/* Inner Dot */}
                  <div style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "var(--primary)",
                    opacity: isHovered ? 1 : 0.6,
                    transition: "all 0.25s ease"
                  }}></div>
                </div>

                {/* Line connecting to the next dot */}
                {index !== milestones.length - 1 && (
                  <div style={{
                    position: "absolute",
                    top: "28px",
                    bottom: "-2rem",
                    width: "2px", // reduced from 3px for extra minimalism
                    background: isHovered 
                      ? "var(--primary)" 
                      : "rgba(224, 145, 0, 0.15)",
                    zIndex: 1,
                    transition: "background 0.25s ease"
                  }}></div>
                )}
              </div>

              {/* Content Card column */}
              <div style={{
                flex: 1,
                paddingLeft: "10px",
                transform: isHovered ? "translateX(4px)" : "none",
                transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
              }}>
                <div style={{
                  padding: "6px 0",
                  transition: "all 0.3s ease"
                }}>
                  <h3 style={{
                    fontSize: "1.15rem",
                    fontWeight: 750,
                    color: isHovered ? "var(--primary)" : "#1e293b",
                    fontFamily: "'Baloo 2', cursive",
                    margin: "0 0 0.3rem 0",
                    lineHeight: "1.3",
                    transition: "color 0.25s ease"
                  }}>
                    {ms.title}
                  </h3>
                  <p style={{
                    fontSize: "0.9rem",
                    color: "#64748b",
                    margin: 0,
                    fontFamily: "'Comic Neue', cursive",
                    lineHeight: "1.5"
                  }}>
                    {ms.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
