"use client";

import React from "react";

interface CTAProps {
  style?: React.CSSProperties;
}

export default function CTA({ style }: CTAProps) {
  return (
    <section className="cta-section" style={style}>
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
  );
}
