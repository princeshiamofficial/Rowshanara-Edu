import React from "react";
import { 
  FaGraduationCap, 
  FaAward, 
  FaUserCheck, 
  FaGlobe, 
  FaHandHoldingDollar, 
  FaHeadphones 
} from "react-icons/fa6";

const whyChooseUsList = [
  {
    title: "Expert Guidance",
    desc: "Our team has 15+ years of experience in international education.",
    icon: <FaGraduationCap style={{ fontSize: "1.6rem" }} />
  },
  {
    title: "Proven Track Record",
    desc: "5000+ successful placements with 98% visa success rate.",
    icon: <FaAward style={{ fontSize: "1.6rem" }} />
  },
  {
    title: "Personalized Service",
    desc: "Customized guidance tailored to each student's unique profile.",
    icon: <FaUserCheck style={{ fontSize: "1.6rem" }} />
  },
  {
    title: "Strong Network",
    desc: "Partnerships with 50+ universities across 20+ countries.",
    icon: <FaGlobe style={{ fontSize: "1.6rem" }} />
  },
  {
    title: "Affordable Pricing",
    desc: "Competitive rates with flexible payment options available.",
    icon: <FaHandHoldingDollar style={{ fontSize: "1.6rem" }} />
  },
  {
    title: "Continuous Support",
    desc: "Support from application through post-arrival assistance.",
    icon: <FaHeadphones style={{ fontSize: "1.6rem" }} />
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
          <div key={index} className="choose-us-card">
            {/* Icon Container */}
            <div className="choose-us-icon-wrapper">
              {item.icon}
            </div>

            {/* Text Container */}
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontSize: "1.225rem",
                fontWeight: 800,
                color: "#0F172A",
                marginBottom: "0.45rem",
                fontFamily: "'Baloo 2', cursive",
                lineHeight: "1.25"
              }}>
                {item.title}
              </h3>
              <p style={{
                fontSize: "0.925rem",
                color: "#475569",
                lineHeight: "1.55",
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
