"use client";

import React from "react";
import { 
  FaGraduationCap, 
  FaAward, 
  FaUserCheck, 
  FaGlobe, 
  FaHandHoldingDollar, 
  FaHeadphones 
} from "react-icons/fa6";
import { useContentSection } from "@/lib/useContentSection";

const whyChooseUsList = [
  {
    title: "Expert Guidance",
    desc: "Our team has 15+ years of experience in international education.",
    icon: <FaGraduationCap className="choose-us-icon" />
  },
  {
    title: "Proven Track Record",
    desc: "5000+ successful placements with 98% visa success rate.",
    icon: <FaAward className="choose-us-icon" />
  },
  {
    title: "Personalized Service",
    desc: "Customized guidance tailored to each student's unique profile.",
    icon: <FaUserCheck className="choose-us-icon" />
  },
  {
    title: "Strong Network",
    desc: "Partnerships with 50+ universities across 20+ countries.",
    icon: <FaGlobe className="choose-us-icon" />
  },
  {
    title: "Affordable Pricing",
    desc: "Competitive rates with flexible payment options available.",
    icon: <FaHandHoldingDollar className="choose-us-icon" />
  },
  {
    title: "Continuous Support",
    desc: "Support from application through post-arrival assistance.",
    icon: <FaHeadphones className="choose-us-icon" />
  }
];

const iconMap: Record<string, React.ReactNode> = {
  graduation: <FaGraduationCap className="choose-us-icon" />,
  award: <FaAward className="choose-us-icon" />,
  user: <FaUserCheck className="choose-us-icon" />,
  globe: <FaGlobe className="choose-us-icon" />,
  money: <FaHandHoldingDollar className="choose-us-icon" />,
  support: <FaHeadphones className="choose-us-icon" />,
};

export default function WhyChooseUs() {
  const items = useContentSection("why_choose_us", whyChooseUsList.map((item, index) => ({
    itemKey: String(index),
    title: item.title,
    body: item.desc,
    metadata: { icon: ["graduation", "award", "user", "globe", "money", "support"][index] },
  })) as any);

  return (
    <section className="container" style={{ marginTop: "3.5rem", marginBottom: "0.75rem" }}>
      <h2 style={{
        textAlign: "center",
        fontSize: "clamp(2rem, 4vw, 2.75rem)",
        color: "var(--text)",
        marginBottom: "1.5rem",
        fontFamily: "'Baloo 2', cursive",
        fontWeight: 800
      }}>
        Why Choose Us
      </h2>

      <div className="choose-us-grid">
        {items.map((item, index) => {
          const iconName = typeof item.metadata?.icon === "string" ? item.metadata.icon : "graduation";
          return (
          <div key={index} className="choose-us-card">
            {/* Icon Container */}
            <div className="choose-us-icon-wrapper">
              {iconMap[iconName] || iconMap.graduation}
            </div>

            {/* Text Container */}
            <div className="choose-us-text-container">
              <h3 className="choose-us-card-title">
                {item.title}
              </h3>
              <p className="choose-us-card-desc">
                {item.body}
              </p>
            </div>
          </div>
        )})}
      </div>
    </section>
  );
}
