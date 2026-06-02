import React from "react";

const milestones = [
  { year: "2009", title: "Company Founded", desc: "Started with a vision to help Bangladeshi students study abroad" },
  { year: "2012", title: "First 100 Students", desc: "Reached milestone of 100 successful placements" },
  { year: "2015", title: "International Expansion", desc: "Opened offices in UK and Canada" },
  { year: "2018", title: "Partner Network", desc: "Established partnerships with 50+ universities" },
  { year: "2021", title: "5000+ Students", desc: "Celebrated 5000 successful student placements" },
  { year: "2024", title: "Industry Leader", desc: "Recognized as leading education consultancy in South Asia" }
];

export default function Journey() {
  return (
    <section className="container" style={{ marginTop: "3.5rem", marginBottom: "1.75rem" }}>
      <h2 style={{ 
        textAlign: "center", 
        fontSize: "clamp(2rem, 4vw, 2.75rem)", 
        color: "var(--text)", 
        marginBottom: "1.15rem",
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
        {milestones.map((ms, index) => (
          <div key={index} style={{
            display: "flex",
            alignItems: "stretch",
            position: "relative"
          }}>
            {/* Year column */}
            <div style={{
              width: "90px",
              textAlign: "right",
              paddingRight: "20px",
              fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
              fontWeight: 800,
              color: "var(--primary)",
              fontFamily: "'Baloo 2', cursive",
              lineHeight: "1.2",
              paddingTop: "4px"
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
              {/* The Dot */}
              <div style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "var(--primary)",
                border: "2px solid var(--background)",
                boxShadow: "0 0 0 2px var(--primary)",
                zIndex: 2,
                marginTop: "8px"
              }}></div>

              {/* Line connecting to the next dot */}
              {index !== milestones.length - 1 && (
                <div style={{
                  position: "absolute",
                  top: "18px",
                  bottom: 0,
                  width: "3px",
                  background: "var(--primary)",
                  opacity: 0.4,
                  zIndex: 1
                }}></div>
              )}
            </div>

            {/* Content column */}
            <div style={{
              flex: 1,
              paddingLeft: "15px",
              paddingBottom: index === milestones.length - 1 ? 0 : "1.8rem"
            }}>
              <h3 style={{
                fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                fontWeight: 700,
                color: "var(--text)",
                fontFamily: "'Baloo 2', cursive",
                margin: "0 0 0.4rem 0",
                lineHeight: "1.2"
              }}>
                {ms.title}
              </h3>
              <p style={{
                fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
                color: "var(--text)",
                opacity: 0.85,
                margin: 0,
                fontFamily: "'Comic Neue', cursive",
                lineHeight: "1.5"
              }}>
                {ms.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
