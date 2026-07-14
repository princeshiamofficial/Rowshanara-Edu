"use client";

import React from "react";
import { useContentSection } from "@/lib/useContentSection";

const fallbackStats = [
  { title: "Students Placed", value: "5000+" },
  { title: "Partner Universities", value: "50+" },
  { title: "Countries", value: "20+" },
  { title: "Visa Success Rate", value: "98%" },
];

export default function Stats() {
  const stats = useContentSection("home_stats", fallbackStats as any);

  return (
    <section className="stats-section">
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
