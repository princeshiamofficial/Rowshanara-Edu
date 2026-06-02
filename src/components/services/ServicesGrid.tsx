"use client";

import React from "react";
import { FaBookOpen, FaFileLines, FaBriefcase, FaUsers, FaPlane, FaLocationDot, FaRegCircleCheck } from 'react-icons/fa6';

const services = [
  {
    title: "University Admission Counselling",
    icon: <FaBookOpen />,
    desc: "Expert guidance to help you select the perfect university based on your academic profile and career goals.",
    highlights: ["Profile Assessment", "University Shortlisting", "Application Strategy", "Interview Prep"]
  },
  {
    title: "Student Visa Processing",
    icon: <FaFileLines />,
    desc: "Complete support throughout the visa application process with expert documentation guidance.",
    highlights: ["Document Preparation", "Application Filing", "Interview Training", "Status Tracking"]
  },
  {
    title: "Scholarship & Financial Aid Guidance",
    icon: <FaBriefcase />,
    desc: "Maximize your financial aid opportunities and secure scholarships to reduce your study costs.",
    highlights: ["Scholarship Search", "Application Assistance", "Financial Planning", "Loan Guidance"]
  },
  {
    title: "IELTS/SAT/GRE Test Prep Referral",
    icon: <FaUsers />,
    desc: "Connect with top test preparation centers to achieve your target scores.",
    highlights: ["Center Referrals", "Study Materials", "Mock Tests", "Score Improvement"]
  },
  {
    title: "Pre-Departure Orientation",
    icon: <FaPlane />,
    desc: "Comprehensive briefing to prepare you for your new life abroad.",
    highlights: ["Cultural Orientation", "Accommodation Guide", "Travel Planning", "Health Insurance"]
  },
  {
    title: "Post-Arrival Student Support",
    icon: <FaLocationDot />,
    desc: "Continuous support after you arrive at your destination to ensure smooth transition.",
    highlights: ["Arrival Assistance", "Local Orientation", "Ongoing Mentoring", "Emergency Support"]
  }
];

export default function ServicesGrid() {
  return (
    <section className="container" style={{ padding: "2rem 2rem 1.8rem 2rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
        {services.map((service, index) => (
          <div key={index} style={{
            padding: "2rem",
            borderRadius: "24px",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            cursor: "default",
            display: "flex",
            flexDirection: "column",
            height: "100%"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-6px)";
            e.currentTarget.style.boxShadow = "0 20px 40px rgba(224, 145, 0, 0.08)";
            e.currentTarget.style.borderColor = "var(--primary)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.02)";
            e.currentTarget.style.borderColor = "#e2e8f0";
          }}>
            {/* Icon */}
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "10px",
              background: "var(--primary)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.3rem",
              marginBottom: "1.5rem"
            }}>
              {service.icon}
            </div>

            {/* Title */}
            <h3 style={{ 
              fontSize: "1.35rem", 
              fontWeight: 700, 
              color: "#1e293b",
              marginBottom: "0.75rem",
              lineHeight: 1.3,
              fontFamily: "'Baloo 2', cursive"
            }}>
              {service.title}
            </h3>

            {/* Description */}
            <p style={{ 
              color: "#64748b", 
              fontSize: "0.925rem", 
              lineHeight: 1.6, 
              marginBottom: "1.5rem",
              fontFamily: "'Comic Neue', cursive",
              flexGrow: 1
            }}>
              {service.desc}
            </p>
            
            {/* Highlights */}
            <ul style={{ 
              listStyle: "none", 
              padding: 0, 
              margin: "0 0 1.75rem 0",
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem"
            }}>
              {service.highlights.map((highlight, hIdx) => (
                <li key={hIdx} style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "0.75rem", 
                  fontSize: "0.925rem", 
                  color: "#334155",
                  fontFamily: "'Comic Neue', cursive"
                }}>
                  <FaRegCircleCheck style={{ color: "var(--primary)", fontSize: "1.1rem", flexShrink: 0 }} />
                  {highlight}
                </li>
              ))}
            </ul>

            {/* Get Started Button */}
            <button 
              className="btn" 
              style={{
                width: "100%",
                padding: "0.8rem 1.5rem",
                background: "var(--primary)",
                color: "#ffffff",
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "0.95rem",
                fontFamily: "'Outfit', sans-serif",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "var(--primary-hover)";
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "var(--primary)";
                e.currentTarget.style.transform = "scale(1)";
              }}
              onClick={() => window.location.href = "/contact"}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
