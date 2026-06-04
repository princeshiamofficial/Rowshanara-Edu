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
        maxWidth: "800px",
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
                width: "90px",
                textAlign: "right",
                paddingRight: "24px",
                fontSize: "1.5rem",
                fontWeight: 800,
                color: isHovered ? "#c78100" : "var(--primary)",
                fontFamily: "'Baloo 2', cursive",
                lineHeight: "1.2",
                paddingTop: "12px",
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
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  border: isHovered ? "2px solid var(--primary)" : "2px solid rgba(224, 145, 0, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 2,
                  marginTop: "16px",
                  transition: "all 0.25s ease",
                  transform: isHovered ? "scale(1.2)" : "scale(1)",
                  boxShadow: isHovered ? "0 0 10px rgba(224, 145, 0, 0.15)" : "none"
                }}>
                  {/* Inner Dot */}
                  <div style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "var(--primary)",
                    boxShadow: isHovered ? "0 0 6px var(--primary)" : "none",
                    transition: "all 0.25s ease"
                  }}></div>
                </div>

                {/* Line connecting to the next dot */}
                {index !== milestones.length - 1 && (
                  <div style={{
                    position: "absolute",
                    top: "36px",
                    bottom: "-2rem",
                    width: "3px",
                    background: isHovered 
                      ? "linear-gradient(to bottom, var(--primary) 0%, rgba(224, 145, 0, 0.4) 100%)" 
                      : "linear-gradient(to bottom, rgba(224, 145, 0, 0.35) 0%, rgba(224, 145, 0, 0.15) 100%)",
                    zIndex: 1,
                    transition: "background 0.25s ease"
                  }}></div>
                )}
              </div>

              {/* Content Card column */}
              <div style={{
                flex: 1,
                paddingLeft: "12px",
                transform: isHovered ? "translateX(6px)" : "none",
                transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
              }}>
                <div style={{
                  background: "#ffffff",
                  border: isHovered ? "1px solid rgba(224, 145, 0, 0.2)" : "1px solid rgba(224, 145, 0, 0.07)",
                  borderRadius: "16px",
                  padding: "1rem 1.4rem",
                  boxShadow: isHovered 
                    ? "0 12px 30px rgba(224, 145, 0, 0.04)" 
                    : "0 6px 20px rgba(0, 0, 0, 0.015)",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                }}>
                  <h3 style={{
                    fontSize: "1.2rem",
                    fontWeight: 750,
                    color: "#1e293b",
                    fontFamily: "'Baloo 2', cursive",
                    margin: "0 0 0.35rem 0",
                    lineHeight: "1.3"
                  }}>
                    {ms.title}
                  </h3>
                  <p style={{
                    fontSize: "0.925rem",
                    color: "#475569",
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
