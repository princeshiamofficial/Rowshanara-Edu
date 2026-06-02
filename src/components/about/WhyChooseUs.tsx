import React from "react";

const whyChooseUsList = [
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
];

export default function WhyChooseUs() {
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
        Why Choose Us
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "2rem"
      }}>
        {whyChooseUsList.map((item, index) => (
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
  );
}
