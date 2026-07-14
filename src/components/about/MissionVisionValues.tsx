"use client";

import React from "react";
import Image from "next/image";
import { type SiteContentItem, useContentSection } from "@/lib/useContentSection";

const fallbackItems = [
  { itemKey: "mission", title: "Mission", body: "To empower Bangladeshi students with world-class education opportunities and guidance for their international academic journey.", imageUrl: "/images/about/mission.png" },
  { itemKey: "vision", title: "Vision", body: "To be the most trusted and innovative education consultancy, transforming lives through global education.", imageUrl: "/images/about/vision.png" },
  { itemKey: "values", title: "Values", body: "Integrity, Excellence, Student-Centric Approach, and Continuous Innovation in everything we do.", imageUrl: "/images/about/values.png" },
];

const backgrounds = [
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
];

export default function MissionVisionValues() {
  const items = useContentSection("mission_vision_values", fallbackItems.map((item, index): SiteContentItem => ({
    id: index,
    section: "mission_vision_values",
    itemKey: item.itemKey,
    title: item.title,
    subtitle: "",
    body: item.body,
    value: "",
    imageUrl: item.imageUrl,
    linkUrl: "",
    metadata: {},
    sortOrder: index + 1,
    isActive: true,
  })));

  return (
    <section className="container" style={{ marginTop: "5rem", marginBottom: "1.75rem" }}>
      <div className="mission-vision-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "2.5rem 2rem"
      }}>
        {items.map((item, index) => (
        <div key={item.itemKey || index} className={`mvv-card ${index % 2 === 0 ? "mvv-card-left" : "mvv-card-right"}`} style={{
          background: `linear-gradient(135deg, rgba(10, 28, 58, 0.93) 0%, rgba(6, 17, 36, 0.96) 100%), url('${backgrounds[index % backgrounds.length]}') no-repeat center center`,
          backgroundSize: "cover",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "24px",
          padding: "3.5rem 2rem 2.25rem 2rem",
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.12)",
          display: "flex",
          flexDirection: "column",
          position: "relative"
        }}>
          <div className={`mission-vision-badge ${index % 2 === 0 ? "mvv-badge-left" : "mvv-badge-right"}`} style={{
            border: "1px solid rgba(255, 78, 80, 0.15)",
            boxShadow: "0 10px 25px rgba(255, 78, 80, 0.2)"
          }}>
            <Image
              src={item.imageUrl || "/images/about/mission.png"} 
              alt={`${item.title} Illustration`} 
              fill
              sizes="72px"
              style={{ objectFit: "cover" }}
              unoptimized
            />
          </div>
          <h3 style={{
            fontSize: "1.5rem",
            fontWeight: 800,
            color: "white",
            marginBottom: "1rem",
            fontFamily: "'Baloo 2', cursive"
          }}>
            {item.title}
          </h3>
          <p style={{
            fontSize: "1rem",
            color: "rgba(255, 255, 255, 0.85)",
            lineHeight: 1.6,
            margin: 0,
            fontFamily: "'Comic Neue', cursive"
          }}>
            {item.body}
          </p>
        </div>
        ))}
      </div>
    </section>
  );
}
