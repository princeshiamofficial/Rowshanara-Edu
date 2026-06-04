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

interface SocialButtonProps {
  icon: React.ReactNode;
  link: string;
}

function SocialButton({ icon, link }: SocialButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <a
      href={link}
      onClick={(e) => e.preventDefault()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: "34px",
        height: "34px",
        borderRadius: "50%",
        backgroundColor: isHovered ? "var(--primary)" : "rgba(10, 28, 58, 0.03)",
        border: isHovered ? "1px solid var(--primary)" : "1px solid rgba(10, 28, 58, 0.06)",
        color: isHovered ? "#ffffff" : "#64748b",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
      }}
    >
      {icon}
    </a>
  );
}

export default function Team() {
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  return (
    <section className="container" style={{ marginTop: "4rem", marginBottom: "2.5rem" }}>
      <h2 style={{
        textAlign: "center",
        fontSize: "clamp(2rem, 4vw, 2.75rem)",
        color: "var(--text)",
        marginBottom: "3.5rem",
        fontFamily: "'Baloo 2', cursive",
        fontWeight: 800
      }}>
        Meet Our Team
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "3.5rem 2rem"
      }}>
        {teamMembers.map((member, index) => (
          <div key={index}
            onMouseEnter={() => setHoveredCardIndex(index)}
            onMouseLeave={() => setHoveredCardIndex(null)}
            style={{
              background: "white",
              border: "1px solid rgba(224, 145, 0, 0.08)",
              borderRadius: "24px",
              boxShadow: hoveredCardIndex === index 
                ? "0 22px 45px rgba(224, 145, 0, 0.09)" 
                : "0 10px 30px rgba(0, 0, 0, 0.02)",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              transform: hoveredCardIndex === index ? "translateY(-6px)" : "none",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              paddingBottom: "1.75rem"
            }}
          >
            {/* Top Banner Gradient */}
            <div style={{
              width: "100%",
              height: "85px",
              background: "linear-gradient(135deg, #0a1c3a 0%, #1e293b 100%)",
              borderTopLeftRadius: "23px",
              borderTopRightRadius: "23px",
              position: "relative",
              overflow: "hidden"
            }}>
              {/* Subtle background glow decorative circle */}
              <div style={{
                position: "absolute",
                top: "-20px",
                right: "-20px",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.04)"
              }} />
            </div>

            {/* Floating Circular Image Avatar */}
            <div style={{
              width: "96px",
              height: "96px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "4px solid #ffffff",
              boxShadow: hoveredCardIndex === index 
                ? "0 10px 25px rgba(224, 145, 0, 0.25), 0 0 0 2px var(--primary)" 
                : "0 8px 20px rgba(0, 0, 0, 0.1), 0 0 0 1.5px rgba(224, 145, 0, 0.15)",
              position: "absolute",
              top: "37px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 3,
              backgroundColor: "#f1f5f9",
              transition: "all 0.3s ease"
            }}>
              <img
                src={member.image}
                alt={member.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top",
                  transform: hoveredCardIndex === index ? "scale(1.08)" : "scale(1)",
                  transition: "transform 0.4s ease"
                }}
              />
            </div>

            {/* Details Container */}
            <div style={{
              padding: "60px 1.5rem 0 1.5rem",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
              <h3 style={{
                fontSize: "1.3rem",
                fontWeight: 800,
                color: "#0f172a",
                margin: "0 0 0.35rem 0",
                fontFamily: "'Baloo 2', cursive"
              }}>
                {member.name}
              </h3>
              
              {/* Role Pill Badge */}
              <div style={{
                background: "rgba(224, 145, 0, 0.08)",
                color: "var(--primary)",
                border: "1px solid rgba(224, 145, 0, 0.15)",
                borderRadius: "20px",
                padding: "0.3rem 0.95rem",
                fontSize: "0.85rem",
                fontWeight: 700,
                fontFamily: "'Outfit', sans-serif",
                display: "inline-block",
                marginBottom: "0.5rem"
              }}>
                {member.role}
              </div>

              {/* Focus Specialization */}
              <p style={{
                fontSize: "0.85rem",
                color: "#64748b",
                margin: "0 0 1.25rem 0",
                fontFamily: "'Comic Neue', cursive",
                fontWeight: 700
              }}>
                {member.focus}
              </p>

              {/* Social Icons at the bottom */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.85rem"
              }}>
                <SocialButton icon={<FaFacebook style={{ fontSize: "1.05rem" }} />} link="#" />
                <SocialButton icon={<FaLinkedin style={{ fontSize: "1.05rem" }} />} link="#" />
                <SocialButton icon={<FaXTwitter style={{ fontSize: "1.05rem" }} />} link="#" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
