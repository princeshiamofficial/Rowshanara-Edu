import React from "react";

export default function Stats() {
  return (
    <section className="stats-section">
      <div className="stats-grid">
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
          <div className="stat-label">Countries</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">98%</div>
          <div className="stat-label">Visa Success Rate</div>
        </div>
      </div>
    </section>
  );
}
