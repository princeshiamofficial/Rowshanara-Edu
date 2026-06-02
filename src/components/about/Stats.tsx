import React from "react";

export default function Stats() {
  return (
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
  );
}
