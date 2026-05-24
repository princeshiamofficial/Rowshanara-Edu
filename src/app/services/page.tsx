"use client";

import React, { useState } from "react";
import { FaBookOpen, FaFileLines, FaBriefcase, FaUsers, FaPlane, FaLocationDot, FaRegCircleCheck, FaMagnifyingGlass } from 'react-icons/fa6';

export default function ServicesPage() {
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

  const timelineSteps = [
    {
      number: 1,
      title: "Initial Consultation",
      desc: "Meet with our counselors to discuss your goals"
    },
    {
      number: 2,
      title: "Profile Assessment",
      desc: "Evaluate your academic and professional background"
    },
    {
      number: 3,
      title: "University Selection",
      desc: "Shortlist universities matching your profile"
    },
    {
      number: 4,
      title: "Application Preparation",
      desc: "Prepare all required documents and essays"
    },
    {
      number: 5,
      title: "Application Submission",
      desc: "Submit applications to selected universities"
    },
    {
      number: 6,
      title: "Visa & Departure",
      desc: "Complete visa process and prepare for departure"
    }
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is the typical timeline for the entire process?",
      a: "The entire process from initial consultation to visa approval typically takes between 3 to 6 months, depending on the country, course intake, and university processing times. We recommend starting your application at least 6-8 months before your desired intake date."
    },
    {
      q: "How much does your counselling service cost?",
      a: "Our initial profile assessment and university admission counselling services are completely free. For specialized test preparations, NAATI CCL classes, and document processing assistance, minor administration fees may apply depending on the program selected."
    },
    {
      q: "Do you guarantee university admission?",
      a: "While we do not guarantee admission, we maintain a 98% admission success rate. Our counselors carefully evaluate your academic profile and match you with universities where you meet all entry requirements, significantly maximizing your acceptance probability."
    },
    {
      q: "Can you help with part-time work opportunities?",
      a: "Yes, during our pre-departure and post-arrival orientations, we guide you on student work rights, local employment regulations, CV writing matching international standards, and top platforms to secure part-time jobs in your study destination."
    },
    {
      q: "What if my visa application is rejected?",
      a: "In the rare event of a visa refusal, our compliance team reviews the rejection letter, addresses the specific concerns raised by immigration officers, updates your financial and SOP documentation, and assists you in filing a strong re-application or appeal."
    },
    {
      q: "Do you offer support for postgraduate studies?",
      a: "Absolutely! We offer comprehensive advisory services for Masters, MBA, and PhD programs, including research proposal guidance, supervisor communication support, statement of purpose (SOP) reviews, and postgraduate scholarship opportunities."
    },
    {
      q: "How do I stay in touch after I depart?",
      a: "We offer dedicated post-arrival student support, and our team remains reachable via our WhatsApp support hotline. We also help connect you with our student alumni network in your destination city for peer mentoring."
    },
    {
      q: "Can I change my university after admission?",
      a: "Yes, university changes are possible but subject to strict visa regulations and institution release policy compliance. Our team will guide you through the official credit transfers, release request filings, and visa status safety checks."
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", background: "var(--background)", paddingTop: "140px" }}>
      {/* Header Banner */}
      <section style={{
        width: "95%",
        maxWidth: "1280px",
        margin: "0 auto 2.5rem auto",
        background: "linear-gradient(135deg, rgba(10, 28, 58, 0.88) 0%, rgba(6, 17, 36, 0.94) 100%), url('/hero-bg.png') no-repeat center center",
        backgroundSize: "cover",
        padding: "1.75rem 2rem",
        borderRadius: "28px",
        textAlign: "center",
        color: "white",
        boxShadow: "0 15px 35px rgba(0, 0, 0, 0.15)",
        position: "relative",
        overflow: "hidden"
      }}>
        <div className="container">
          <h1 className="hero-responsive-title" style={{
            fontSize: "clamp(2.25rem, 5vw, 3.25rem)",
            fontWeight: 800,
            marginBottom: "0.25rem",
            color: "white",
            fontFamily: "'Baloo 2', cursive",
            lineHeight: 1.2
          }}>
            Our Services
          </h1>
          <p style={{
            fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
            color: "rgba(255, 255, 255, 0.85)",
            maxWidth: "750px",
            margin: "0 auto 0.75rem auto",
            lineHeight: 1.6,
            fontFamily: "'Comic Neue', cursive"
          }}>
            Comprehensive support for every step of your study abroad journey
          </p>
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.95rem",
            fontWeight: 700,
            color: "rgba(255, 255, 255, 0.6)"
          }}>
            <a href="/" style={{ 
              color: "rgba(255, 255, 255, 0.6)", 
              textDecoration: "none", 
              transition: "color 0.2s" 
            }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--primary)"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)"}>
              Home
            </a>
            <span>/</span>
            <span style={{ color: "white" }}>Services</span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container" style={{ padding: "2rem 2rem 6rem 2rem" }}>
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
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(37, 99, 235, 0.08)";
              e.currentTarget.style.borderColor = "#2563eb";
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
                background: "#2563eb",
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
                    <FaRegCircleCheck style={{ color: "#2563eb", fontSize: "1.1rem", flexShrink: 0 }} />
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
                  background: "#2563eb",
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
                  e.currentTarget.style.background = "#1d4ed8";
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "#2563eb";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Our Process Timeline */}
      <section className="container" style={{ marginTop: "6rem", marginBottom: "6rem" }}>
        <h2 style={{
          textAlign: "center",
          fontSize: "2.5rem",
          fontWeight: 800,
          color: "#0f172a",
          marginBottom: "4rem",
          fontFamily: "'Baloo 2', cursive"
        }}>
          Our Process Timeline
        </h2>

        <div style={{
          maxWidth: "600px",
          margin: "0 auto",
          position: "relative"
        }}>
          {/* Vertical Timeline Line */}
          <div style={{
            position: "absolute",
            left: "19px",
            top: "20px",
            bottom: "20px",
            width: "2px",
            background: "#3b82f6",
            opacity: 0.4,
            zIndex: 1
          }}></div>

          {/* Timeline Steps */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {timelineSteps.map((step) => (
              <div key={step.number} style={{
                position: "relative",
                display: "flex",
                alignItems: "flex-start",
                minHeight: "60px"
              }}>
                {/* Circle Number Badge */}
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "#2563eb",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "1rem",
                  boxShadow: "0 4px 10px rgba(37, 99, 235, 0.25)",
                  zIndex: 2,
                  position: "relative",
                  flexShrink: 0
                }}>
                  {step.number}
                </div>

                {/* Step Text Content */}
                <div style={{ paddingLeft: "1.5rem", paddingTop: "0.2rem" }}>
                  <h3 style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "#1e293b",
                    marginBottom: "0.35rem",
                    fontFamily: "'Baloo 2', cursive"
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    fontSize: "0.95rem",
                    color: "#64748b",
                    margin: 0,
                    fontFamily: "'Comic Neue', cursive",
                    lineHeight: 1.5
                  }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="container" style={{ marginTop: "6rem", marginBottom: "6rem" }}>
        <h2 style={{
          textAlign: "center",
          fontSize: "2.5rem",
          fontWeight: 800,
          color: "#0f172a",
          marginBottom: "3.5rem",
          fontFamily: "'Baloo 2', cursive"
        }}>
          Frequently Asked Questions
        </h2>

        {/* Search Bar */}
        <div style={{
          maxWidth: "800px",
          margin: "0 auto 2.5rem auto",
          position: "relative"
        }}>
          <FaMagnifyingGlass style={{
            position: "absolute",
            left: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#94a3b8",
            fontSize: "1.1rem"
          }} />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "1rem 1rem 1rem 3rem",
              borderRadius: "12px",
              border: "1px solid #cbd5e1",
              fontSize: "1rem",
              outline: "none",
              color: "#334155",
              fontFamily: "'Comic Neue', cursive",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
              transition: "border-color 0.2s"
            }}
            onFocus={e => e.currentTarget.style.borderColor = "#2563eb"}
            onBlur={e => e.currentTarget.style.borderColor = "#cbd5e1"}
          />
        </div>

        {/* FAQ list */}
        <div style={{
          maxWidth: "800px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} style={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  background: isOpen ? "#f8fafc" : "#ffffff",
                  overflow: "hidden",
                  transition: "all 0.2s ease"
                }}>
                  {/* Question header */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    style={{
                      width: "100%",
                      padding: "1.25rem 1.5rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left"
                    }}
                  >
                    <span style={{
                      fontWeight: 700,
                      fontSize: "1.05rem",
                      color: "#1e293b",
                      fontFamily: "'Baloo 2', cursive"
                    }}>
                      {faq.q}
                    </span>
                    <span style={{
                      color: "#2563eb",
                      fontSize: "0.85rem",
                      marginLeft: "1rem",
                      display: "flex",
                      alignItems: "center",
                      transition: "transform 0.2s"
                    }}>
                      {isOpen ? "▲" : "▼"}
                    </span>
                  </button>

                  {/* Answer content with transition */}
                  <div style={{
                    maxHeight: isOpen ? "200px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.2s cubic-bezier(0, 1, 0, 1)",
                    background: "#ffffff",
                    borderTop: isOpen ? "1px solid #e2e8f0" : "none"
                  }}>
                    <p style={{
                      padding: "1.25rem 1.5rem",
                      margin: 0,
                      fontSize: "0.95rem",
                      color: "#475569",
                      lineHeight: 1.6,
                      fontFamily: "'Comic Neue', cursive"
                    }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p style={{
              textAlign: "center",
              color: "#94a3b8",
              fontFamily: "'Comic Neue', cursive",
              padding: "2rem"
            }}>
              No FAQs matched your search. Try searching another keyword!
            </p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" style={{ marginTop: "6rem", marginBottom: "4rem" }}>
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
