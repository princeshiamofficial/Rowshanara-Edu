"use client";

import React, { useState, useEffect } from "react";

const bgSlides = [
  "/sydney_opera_house.png",
  "/canada_hero.png",
  "/uk_hero.png"
];

export default function BrandOverview() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % bgSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="brand-overview-section" style={{ marginBottom: "1.5rem" }}>
      <div className="brand-overview-card" style={{
        background: "linear-gradient(135deg, rgba(10, 28, 58, 0.95) 0%, rgba(6, 17, 36, 0.98) 100%)",
        color: "white",
        boxShadow: "0 15px 35px rgba(0, 0, 0, 0.12)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
        gap: "1.5rem",
        alignItems: "center"
      }}>
        {/* Left Column */}
        <div>
          <h2 style={{
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            fontWeight: 800,
            color: "white",
            marginBottom: "0.75rem",
            fontFamily: "'Baloo 2', cursive",
            lineHeight: 1.15
          }}>
            About Rowshanara Edu
          </h2>
          <p style={{
            fontSize: "0.95rem",
            color: "rgba(255, 255, 255, 0.85)",
            lineHeight: 1.5,
            marginBottom: "1.25rem",
            fontFamily: "'Comic Neue', cursive"
          }}>
            Founded in 2009, we've been helping Bangladeshi students achieve their dreams of studying abroad. With 15+ years of experience and 5000+ successful placements, we're the trusted partner for your international education journey.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              "50+ Partner Universities",
              "20+ Countries Covered",
              "98% Visa Success Rate"
            ].map((item, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ color: "var(--primary)", fontSize: "1.2rem", fontWeight: "bold" }}>✓</span>
                <span style={{ fontSize: "1rem", fontWeight: 700, color: "white" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div>
          <div className="brand-overview-quote-card" style={{
            position: "relative",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "280px",
            overflow: "hidden"
          }}>
            {/* Background Images with Fade & Zoom effect */}
            {bgSlides.map((slide, index) => (
              <div
                key={`bg-slide-${index}`}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `url(${slide}) no-repeat center center`,
                  backgroundSize: "cover",
                  opacity: currentBgIndex === index ? 0.75 : 0,
                  transform: currentBgIndex === index ? "scale(1.08)" : "scale(1)",
                  transition: "opacity 1s ease-in-out, transform 5s linear",
                  zIndex: 0
                }}
              />
            ))}

            {/* Red Gradient Overlay (matching home page hero section with optimized opacity) */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(179, 18, 38, 0.6) 0%, rgba(10, 28, 58, 0.7) 100%)",
              zIndex: 1
            }} />

            {/* Content Panel */}
            <div style={{ position: "relative", zIndex: 2 }}>
              <h3 style={{
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "white",
                marginBottom: "1rem",
                fontFamily: "'Baloo 2', cursive",
                lineHeight: 1.4
              }}>
                "Transforming Lives Through Global Education"
              </h3>
              <p style={{
                fontSize: "0.95rem",
                color: "rgba(255, 255, 255, 0.85)",
                fontStyle: "italic",
                lineHeight: 1.6,
                margin: 0,
                fontFamily: "'Comic Neue', cursive",
                maxWidth: "280px"
              }}>
                Our commitment is to provide world-class guidance and support to every student we work with.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
