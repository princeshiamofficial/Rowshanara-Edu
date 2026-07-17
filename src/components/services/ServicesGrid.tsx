"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaBookOpen, FaFileLines, FaBriefcase, FaUsers, FaPlane, FaLocationDot, FaRegCircleCheck } from 'react-icons/fa6';

interface ServiceItem {
  id?: number;
  title: string;
  icon: string;
  image: string;
  description: string;
  highlights: string[];
}

const staticServices: ServiceItem[] = [
  {
    title: "Free Student Counselling",
    icon: "FaBookOpen",
    image: "/images/services/counselling.png",
    description: "Expert guidance to help you select the perfect university and course based on your academic profile and career goals.",
    highlights: ["Profile Assessment", "Course Selection", "University Shortlisting", "Career Mapping"]
  },
  {
    title: "University Application Service",
    icon: "FaFileLines",
    image: "/images/services/test_prep.png",
    description: "Complete support throughout the university application process, facilitating admission to over 500 partner institutions.",
    highlights: ["Application Strategy", "Document Review", "SOP Guidance", "Interview Prep"]
  },
  {
    title: "Visa Support Service",
    icon: "FaPlane",
    image: "/images/services/visa.png",
    description: "Specialized support and guidance throughout the student visa application and documentation process.",
    highlights: ["Visa Requirements Guide", "Documentation Assistance", "Interview Training", "Application Submission"]
  },
  {
    title: "Scholarship Assistance",
    icon: "FaBriefcase",
    image: "/images/services/scholarship.png",
    description: "Maximize your financial aid and scholarship opportunities to reduce tuition and overall study costs.",
    highlights: ["Scholarship Matching", "Application Support", "Essay Editing", "Financial Guidance"]
  },
  {
    title: "Pre-Departure Orientation",
    icon: "FaUsers",
    image: "/images/services/pre_departure.png",
    description: "Comprehensive briefing sessions to prepare you for your international travel, accommodation, and transition.",
    highlights: ["Cultural Orientation", "Accommodation Guide", "Travel Planning", "Health Insurance"]
  },
  {
    title: "Post-Arrival Student Support",
    icon: "FaLocationDot",
    image: "/images/services/post_arrival.png",
    description: "Ongoing mentoring and assistance to ensure a smooth transition and settle comfortably in your destination.",
    highlights: ["Arrival Assistance", "Local Orientation", "Ongoing Mentoring", "Emergency Support"]
  }
];

export default function ServicesGrid() {
  const [services, setServices] = useState<ServiceItem[]>(staticServices);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success' && Array.isArray(res.data) && res.data.length > 0) {
          setServices(res.data);
        }
      })
      .catch(err => console.error('Failed to load dynamic services:', err));
  }, []);

  return (
    <section className="container" style={{ paddingTop: "2.5rem", paddingBottom: "1.8rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2.5rem 2rem" }}>
        <AnimatePresence mode="popLayout">
          {services.map((service, index) => (
            <motion.div 
              key={service.id || index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(224, 145, 0, 0.08)", borderColor: "var(--primary)" }}
              style={{
                background: "#ffffff",
                borderRadius: "24px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)",
                cursor: "default",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                overflow: "hidden",
                position: "relative"
              }}
            >
              {/* Header Image */}
              <div style={{ position: "relative", width: "100%", height: "180px", overflow: "hidden" }}>
                <Image 
                  src={service.image} 
                  alt={service.title} 
                  fill 
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(255,255,255,1) 100%)"
                }} />
              </div>

              {/* Card Body */}
              <div style={{
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                flexGrow: 1
              }}>
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
                  {service.description}
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
                  {Array.isArray(service.highlights) && service.highlights.map((highlight, hIdx) => (
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
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
