import React from "react";
import { FaGraduationCap } from "react-icons/fa6";

const universities = [
  "University of Sydney",
  "University of Toronto",
  "Oxford University",
  "University of Melbourne",
  "Harvard University",
  "University of British Columbia",
  "Cambridge University",
  "Stanford University"
];

export default function TrustedBy() {
  return (
    <section className="trusted-by-section">
      <div className="trusted-by-badge">
        <span className="badge-dot" />
        <span>Trusted By Leading Universities</span>
      </div>
      <div className="marquee-container">
        <div className="marquee-track">
          {[...universities, ...universities].map((uni, index) => (
            <div key={index} className="university-logo-card">
              <FaGraduationCap className="uni-icon" />
              <span>{uni}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
