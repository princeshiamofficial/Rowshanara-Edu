"use client";

import React, { useState, useEffect } from "react";
import { FaFacebook, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function AboutPage() {
  const bgSlides = [
    "/sydney_opera_house.png",
    "/canada_hero.png",
    "/uk_hero.png"
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % bgSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);


  const milestones = [
    { year: "2009", title: "Company Founded", desc: "Started with a vision to help Bangladeshi students study abroad" },
    { year: "2012", title: "First 100 Students", desc: "Reached milestone of 100 successful placements" },
    { year: "2015", title: "International Expansion", desc: "Opened offices in UK and Canada" },
    { year: "2018", title: "Partner Network", desc: "Established partnerships with 50+ universities" },
    { year: "2021", title: "5000+ Students", desc: "Celebrated 5000 successful student placements" },
    { year: "2024", title: "Industry Leader", desc: "Recognized as leading education consultancy in South Asia" }
  ];

  return (
    <div className="hero-gradient" style={{ minHeight: "100vh", paddingTop: "140px", paddingBottom: "1.5rem" }}>
      {/* Brand Overview Section */}
      <section className="container" style={{ marginBottom: "1.5rem" }}>
        <div style={{
          background: "linear-gradient(135deg, rgba(10, 28, 58, 0.95) 0%, rgba(6, 17, 36, 0.98) 100%)",
          borderRadius: "28px",
          padding: "1.75rem 2rem",
          color: "white",
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.12)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
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
            <div style={{
              position: "relative",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "20px",
              padding: "2.5rem 2rem",
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

      {/* Our Journey Timeline */}
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

      {/* Mission, Vision & Values Section */}
      <section className="container" style={{ marginTop: "3.5rem", marginBottom: "1.75rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2rem"
        }}>
          {/* Mission Card */}
          <div style={{
            background: "white",
            border: "1px solid rgba(10, 28, 58, 0.08)",
            borderRadius: "24px",
            padding: "3.5rem 2.5rem",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <div style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              backgroundColor: "rgba(224, 145, 0, 0.1)", // Light brand container
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.5rem",
              color: "var(--primary)" // Brand primary icon
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="12" cy="12" r="1" />
              </svg>
            </div>
            <h3 style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "#0F172A",
              marginBottom: "1rem",
              fontFamily: "'Baloo 2', cursive"
            }}>
              Mission
            </h3>
            <p style={{
              fontSize: "1rem",
              color: "#475569",
              lineHeight: 1.6,
              margin: 0,
              fontFamily: "'Comic Neue', cursive"
            }}>
              To empower Bangladeshi students with world-class education opportunities and guidance for their international academic journey.
            </p>
          </div>

          {/* Vision Card */}
          <div style={{
            background: "white",
            border: "1px solid rgba(10, 28, 58, 0.08)",
            borderRadius: "24px",
            padding: "3.5rem 2.5rem",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <div style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              backgroundColor: "rgba(224, 145, 0, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.5rem",
              color: "var(--primary)"
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "#0F172A",
              marginBottom: "1rem",
              fontFamily: "'Baloo 2', cursive"
            }}>
              Vision
            </h3>
            <p style={{
              fontSize: "1rem",
              color: "#475569",
              lineHeight: 1.6,
              margin: 0,
              fontFamily: "'Comic Neue', cursive"
            }}>
              To be the most trusted and innovative education consultancy, transforming lives through global education.
            </p>
          </div>

          {/* Values Card */}
          <div style={{
            background: "white",
            border: "1px solid rgba(10, 28, 58, 0.08)",
            borderRadius: "24px",
            padding: "3.5rem 2.5rem",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <div style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              backgroundColor: "rgba(224, 145, 0, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.5rem",
              color: "var(--primary)"
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "#0F172A",
              marginBottom: "1rem",
              fontFamily: "'Baloo 2', cursive"
            }}>
              Values
            </h3>
            <p style={{
              fontSize: "1rem",
              color: "#475569",
              lineHeight: 1.6,
              margin: 0,
              fontFamily: "'Comic Neue', cursive"
            }}>
              Integrity, Excellence, Student-Centric Approach, and Continuous Innovation in everything we do.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" style={{ marginTop: "3.5rem", marginBottom: "0rem" }}>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">15+</div>
            <div className="stat-label">Years of Experience</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">5000+</div>
            <div className="stat-label">Students Placed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">50+</div>
            <div className="stat-label">Partner Universities</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">20+</div>
            <div className="stat-label">Countries Covered</div>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
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
          {[
            { name: "Dr. Md. Karim Hassan", role: "Founder & CEO", focus: "Education Strategy", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&h=300&fit=crop" },
            { name: "Fatima Ahmed Khan", role: "Head of Admissions", focus: "University Relations", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=300&fit=crop" },
            { name: "Amir Hossain", role: "Visa Specialist", focus: "Immigration Law", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=300&fit=crop" },
            { name: "Nadia Rahman", role: "Student Counselor", focus: "Career Guidance", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=300&fit=crop" },
            { name: "Rajib Kumar", role: "Operations Manager", focus: "Process Excellence", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=300&fit=crop" },
            { name: "Sophia Akter", role: "Student Support", focus: "Post-Arrival Services", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&h=300&fit=crop" }
          ].map((member, index) => (
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
              <div style={{ width: "100%", height: "200px", overflow: "hidden", position: "relative" }}>
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

                {/* Designation Pill Badge floating on bottom center of image */}
                <div style={{
                  position: "absolute",
                  bottom: "0.75rem",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(4px)",
                  border: "1px solid rgba(224, 145, 0, 0.25)",
                  color: "var(--primary)",
                  padding: "0.3rem 0.85rem",
                  borderRadius: "20px",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  fontFamily: "'Comic Neue', cursive",
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                  zIndex: 1,
                  opacity: hoveredCardIndex === index ? 0 : 1,
                  transition: "opacity 0.3s ease"
                }}>
                  {member.role}
                </div>

                {/* Social Overlay */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(10, 28, 58, 0.65)",
                  backdropFilter: "blur(2px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1.25rem",
                  opacity: hoveredCardIndex === index ? 1 : 0,
                  pointerEvents: hoveredCardIndex === index ? "auto" : "none",
                  transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  zIndex: 2
                }}>
                  <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "white", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"} onMouseLeave={(e) => e.currentTarget.style.color = "white"}>
                    <FaFacebook style={{ fontSize: "1.25rem" }} />
                  </a>
                  <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "white", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"} onMouseLeave={(e) => e.currentTarget.style.color = "white"}>
                    <FaLinkedin style={{ fontSize: "1.25rem" }} />
                  </a>
                  <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "white", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"} onMouseLeave={(e) => e.currentTarget.style.color = "white"}>
                    <FaXTwitter style={{ fontSize: "1.25rem" }} />
                  </a>
                </div>
              </div>

              {/* Details Container */}
              <div style={{ padding: "1.5rem 1.5rem 2rem 1.5rem", textAlign: "center" }}>
                <h3 style={{
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "#0F172A",
                  marginBottom: "0.4rem",
                  fontFamily: "'Baloo 2', cursive"
                }}>
                  {member.name}
                </h3>
                <p style={{
                  fontSize: "0.85rem",
                  color: "#64748B",
                  margin: 0,
                  fontFamily: "'Comic Neue', cursive"
                }}>
                  {member.focus}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="container" style={{ marginTop: "3.5rem", marginBottom: "0.75rem" }}>
        <h2 style={{
          textAlign: "center",
          fontSize: "clamp(2rem, 4vw, 2.75rem)",
          color: "var(--text)",
          marginBottom: "1rem",
          fontFamily: "'Baloo 2', cursive",
          fontWeight: 800
        }}>
          Why Choose Us
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2rem"
        }}>
          {[
            {
              title: "Expert Guidance",
              desc: "Our team has 15+ years of experience in international education.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )
            },
            {
              title: "Proven Track Record",
              desc: "5000+ successful placements with 98% visa success rate.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )
            },
            {
              title: "Personalized Service",
              desc: "Customized guidance tailored to each student's unique profile.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )
            },
            {
              title: "Strong Network",
              desc: "Partnerships with 50+ universities across 20+ countries.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10M12 2a15.3 15.3 0 00-4 10 15.3 15.3 0 004 10M2 12h20" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )
            },
            {
              title: "Affordable Pricing",
              desc: "Competitive rates with flexible payment options available.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )
            },
            {
              title: "Continuous Support",
              desc: "Support from application through post-arrival assistance.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              )
            }
          ].map((item, index) => (
            <div key={index} style={{
              background: "white",
              border: "1px solid rgba(10, 28, 58, 0.08)",
              borderRadius: "24px",
              padding: "1.5rem 1.5rem",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)",
              display: "flex",
              alignItems: "flex-start",
              gap: "1.5rem"
            }}>
              {/* Icon Container */}
              <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                backgroundColor: "rgba(224, 145, 0, 0.1)",
                color: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                {item.icon}
              </div>

              {/* Text Container */}
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "#0F172A",
                  marginBottom: "0.5rem",
                  fontFamily: "'Baloo 2', cursive",
                  lineHeight: "1.2"
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: "0.95rem",
                  color: "#475569",
                  lineHeight: "1.5",
                  margin: 0,
                  fontFamily: "'Comic Neue', cursive"
                }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" style={{ marginTop: "3.5rem", marginBottom: "1.5rem" }}>
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
