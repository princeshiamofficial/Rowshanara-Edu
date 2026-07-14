"use client";

import React from "react";
import { useContentSection } from "@/lib/useContentSection";

const fallbackStats = [
  { title: "Years of Experience", value: "15+" },
  { title: "Students Placed", value: "5000+" },
  { title: "Partner Universities", value: "50+" },
  { title: "Countries Covered", value: "20+" },
];

export default function Stats() {
  const stats = useContentSection("about_stats", fallbackStats as any);

  return (
    <section className="stats-section" style={{ marginTop: "3.5rem", marginBottom: "0rem" }}>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div className="stat-card" key={stat.itemKey || index}>
            <div className="stat-number">{stat.value}</div>
            <div className="stat-label">{stat.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
