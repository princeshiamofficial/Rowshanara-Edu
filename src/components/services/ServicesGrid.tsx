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
    title: "University Admission Counselling",
    icon: "FaBookOpen",
    image: "/images/services/counselling.png",
    description: "Expert guidance to help you select the perfect university based on your academic profile and career goals.",
    highlights: ["Profile Assessment", "University Shortlisting", "Application Strategy", "Interview Prep"]
  },
  {
    title: "Student Visa Processing",
    icon: "FaFileLines",
    image: "/images/services/visa.png",
    description: "Complete support throughout the visa application process with expert documentation guidance.",
    highlights: ["Document Preparation", "Application Filing", "Interview Training", "Status Tracking"]
  },
  {
    title: "Scholarship & Financial Aid Guidance",
    icon: "FaBriefcase",
    image: "/images/services/scholarship.png",
    description: "Maximize your financial aid opportunities and secure scholarships to reduce your study costs.",
    highlights: ["Scholarship Search", "Application Assistance", "Financial Planning", "Loan Guidance"]
  },
  {
    title: "IELTS/SAT/GRE Test Prep Referral",
    icon: "FaUsers",
    image: "/images/services/test_prep.png",
    description: "Connect with top test preparation centers to achieve your target scores.",
    highlights: ["Center Referrals", "Study Materials", "Mock Tests", "Score Improvement"]
  },
  {
    title: "Pre-Departure Orientation",
    icon: "FaPlane",
    image: "/images/services/pre_departure.png",
    description: "Comprehensive briefing to prepare you for your new life abroad.",
    highlights: ["Cultural Orientation", "Accommodation Guide", "Travel Planning", "Health Insurance"]
  },
  {
    title: "Post-Arrival Student Support",
    icon: "FaLocationDot",
    image: "/images/services/post_arrival.png",
    description: "Continuous support after you arrive at your destination to ensure smooth transition.",
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
      <div className="services-grid-4col">
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
