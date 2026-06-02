"use client";

import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import HeaderBanner from "@/components/HeaderBanner";
import UniversitiesDashboard from "@/components/universities/UniversitiesDashboard";
import CTA from "@/components/CTA";

export default function UniversitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="hero-gradient" style={{ minHeight: "100vh", paddingTop: "140px", paddingBottom: "1.5rem" }}>
      {/* Header Banner */}
      <HeaderBanner 
        title="Partner Universities" 
        subtitle="Explore our network of 50+ partner universities across 20+ countries"
        style={{ margin: "0 auto 3rem auto" }}
      >
        {/* Integrated Search Input */}
        <div style={{
          position: "relative",
          maxWidth: "680px",
          width: "100%",
          margin: "0 auto",
          display: "flex",
          alignItems: "center"
        }}>
          <FaMagnifyingGlass style={{
            position: "absolute",
            left: "1.25rem",
            color: "rgba(255, 255, 255, 0.5)",
            fontSize: "1.1rem"
          }} />
          <input
            type="text"
            placeholder="Search universities or countries..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "1.1rem 1.1rem 1.1rem 3.25rem",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "14px",
              fontSize: "1rem",
              outline: "none",
              fontFamily: "inherit",
              color: "white",
              transition: "all 0.3s ease",
              backdropFilter: "blur(8px)"
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.45)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)";
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
            }}
          />
        </div>
      </HeaderBanner>

      <UniversitiesDashboard searchQuery={searchQuery} />
      <CTA style={{ marginTop: "3.5rem", marginBottom: "1.5rem" }} />
    </div>
  );
}
