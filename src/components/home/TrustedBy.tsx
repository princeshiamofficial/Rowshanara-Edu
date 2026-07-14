"use client";

import React from "react";
import { FaGraduationCap } from "react-icons/fa6";
import { useContentSection } from "@/lib/useContentSection";

const universities = ["University of Sydney", "University of Toronto", "Oxford University", "University of Melbourne", "Harvard University"];

export default function TrustedBy() {
  const items = useContentSection("trusted_universities", universities.map((title, index) => ({ title, itemKey: String(index) })) as any);

  return (
    <section className="trusted-by-section">
      <div className="trusted-by-badge">
        <span className="badge-dot" />
        <span>Trusted By Leading Universities</span>
      </div>
      <div className="marquee-container">
        <div className="marquee-track">
          {[...items, ...items].map((uni, index) => (
            <div key={index} className="university-logo-card">
              <FaGraduationCap className="uni-icon" />
              <span>{uni.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
