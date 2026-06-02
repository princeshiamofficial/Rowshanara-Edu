"use client";

import React, { useState } from "react";
import { FaFacebook, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const teamMembers = [
  { name: "Dr. Md. Karim Hassan", role: "Founder & CEO", focus: "Education Strategy", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&h=300&fit=crop" },
  { name: "Fatima Ahmed Khan", role: "Head of Admissions", focus: "University Relations", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=300&fit=crop" },
  { name: "Amir Hossain", role: "Visa Specialist", focus: "Immigration Law", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=300&fit=crop" },
  { name: "Nadia Rahman", role: "Student Counselor", focus: "Career Guidance", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=300&fit=crop" },
  { name: "Rajib Kumar", role: "Operations Manager", focus: "Process Excellence", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=300&fit=crop" },
  { name: "Sophia Akter", role: "Student Support", focus: "Post-Arrival Services", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&h=300&fit=crop" }
];

export default function Team() {
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  return (
    <section className="container" style={{ marginTop: "3.5rem", marginBottom: "0.75rem" }}>
      <h2 style={{
        textAlign: "center",
        fontSize: "clamp(2rem, 4vw, 2.75rem)",
        color: "var(--text)",
        marginBottom: "1rem",
        fontFamily: "'Baloo 2', cursive",
        fontWeight: 800
      }}>
        Meet Our Team
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "2rem"
      }}>
        {teamMembers.map((member, index) => (
          <div key={index}
            onMouseEnter={() => setHoveredCardIndex(index)}
            onMouseLeave={() => setHoveredCardIndex(null)}
            style={{
              background: "white",
              border: "1px solid rgba(10, 28, 58, 0.08)",
              borderRadius: "24px",
              boxShadow: hoveredCardIndex === index 
                ? "0 20px 40px rgba(0, 0, 0, 0.06)" 
                : "0 10px 30px rgba(0, 0, 0, 0.02)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              transform: hoveredCardIndex === index ? "translateY(-4px)" : "none",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
            className="glass-card-hover"
          >
            {/* Full Width Image on top */}
            <div style={{ width: "100%", height: "230px", overflow: "hidden", position: "relative" }}>
              <img
                src={member.image}
                alt={member.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top",
                  transform: hoveredCardIndex === index ? "scale(1.05)" : "scale(1)",
                  transition: "transform 0.4s ease"
                }}
              />
            </div>

            {/* Details Container */}
            <div style={{ padding: "1rem 1.25rem 1.25rem 1.25rem", textAlign: "center", backgroundColor: "#F8FAFC", borderTop: "1px solid rgba(10, 28, 58, 0.05)" }}>
              <h3 style={{
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "#0F172A",
                margin: "0 0 0.25rem 0",
                fontFamily: "'Baloo 2', cursive"
              }}>
                {member.name}
              </h3>
              <p style={{
                fontSize: "1rem",
                color: "var(--primary)",
                fontWeight: 700,
                margin: "0 0 0.25rem 0",
                fontFamily: "'Comic Neue', cursive"
              }}>
                {member.role}
              </p>
              <p style={{
                fontSize: "0.85rem",
                color: "#64748B",
                margin: 0,
                fontFamily: "'Comic Neue', cursive"
              }}>
                {member.focus}
              </p>

              {/* Social Icons at the bottom */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1.25rem",
                maxHeight: hoveredCardIndex === index ? "40px" : "0px",
                marginTop: hoveredCardIndex === index ? "1rem" : "0px",
                opacity: hoveredCardIndex === index ? 1 : 0,
                overflow: "hidden",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              }}>
                <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "#64748B", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"} onMouseLeave={(e) => e.currentTarget.style.color = "#64748B"}>
                  <FaFacebook style={{ fontSize: "1.1rem" }} />
                </a>
                <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "#64748B", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"} onMouseLeave={(e) => e.currentTarget.style.color = "#64748B"}>
                  <FaLinkedin style={{ fontSize: "1.1rem" }} />
                </a>
                <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "#64748B", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"} onMouseLeave={(e) => e.currentTarget.style.color = "#64748B"}>
                  <FaXTwitter style={{ fontSize: "1.1rem" }} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
