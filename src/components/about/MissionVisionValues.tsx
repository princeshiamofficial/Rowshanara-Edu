import React from "react";

export default function MissionVisionValues() {
  return (
    <section className="container" style={{ marginTop: "3rem", marginBottom: "4rem" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "2.25rem"
      }}>
        {/* Mission Card */}
        <div style={{
          background: "#ffffff",
          border: "1px solid rgba(224, 145, 0, 0.08)",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.015)",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s ease"
        }} className="glass-card-hover">
          {/* Header Illustration */}
          <div style={{ width: "100%", height: "160px", overflow: "hidden", position: "relative", background: "#fcf9f2" }}>
            <img 
              src="/images/about/mission.png" 
              alt="Mission Illustration" 
              style={{ 
                width: "100%", 
                height: "100%", 
                objectFit: "cover",
                opacity: 0.95
              }} 
            />
          </div>
          {/* Body Content */}
          <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", flex: 1, textAlign: "left" }}>
            <h3 style={{
              fontSize: "1.4rem",
              fontWeight: 800,
              color: "#0F172A",
              marginBottom: "0.75rem",
              fontFamily: "'Baloo 2', cursive"
            }}>
              Mission
            </h3>
            <p style={{
              fontSize: "0.95rem",
              color: "#475569",
              lineHeight: 1.55,
              margin: 0,
              fontFamily: "'Comic Neue', cursive"
            }}>
              To empower Bangladeshi students with world-class education opportunities and guidance for their international academic journey.
            </p>
          </div>
        </div>

        {/* Vision Card */}
        <div style={{
          background: "#ffffff",
          border: "1px solid rgba(224, 145, 0, 0.08)",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.015)",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s ease"
        }} className="glass-card-hover">
          {/* Header Illustration */}
          <div style={{ width: "100%", height: "160px", overflow: "hidden", position: "relative", background: "#f5f9ff" }}>
            <img 
              src="/images/about/vision.png" 
              alt="Vision Illustration" 
              style={{ 
                width: "100%", 
                height: "100%", 
                objectFit: "cover",
                opacity: 0.95
              }} 
            />
          </div>
          {/* Body Content */}
          <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", flex: 1, textAlign: "left" }}>
            <h3 style={{
              fontSize: "1.4rem",
              fontWeight: 800,
              color: "#0F172A",
              marginBottom: "0.75rem",
              fontFamily: "'Baloo 2', cursive"
            }}>
              Vision
            </h3>
            <p style={{
              fontSize: "0.95rem",
              color: "#475569",
              lineHeight: 1.55,
              margin: 0,
              fontFamily: "'Comic Neue', cursive"
            }}>
              To be the most trusted and innovative education consultancy, transforming lives through global education.
            </p>
          </div>
        </div>

        {/* Values Card */}
        <div style={{
          background: "#ffffff",
          border: "1px solid rgba(224, 145, 0, 0.08)",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.015)",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s ease"
        }} className="glass-card-hover">
          {/* Header Illustration */}
          <div style={{ width: "100%", height: "160px", overflow: "hidden", position: "relative", background: "#fff5f5" }}>
            <img 
              src="/images/about/values.png" 
              alt="Values Illustration" 
              style={{ 
                width: "100%", 
                height: "100%", 
                objectFit: "cover",
                opacity: 0.95
              }} 
            />
          </div>
          {/* Body Content */}
          <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", flex: 1, textAlign: "left" }}>
            <h3 style={{
              fontSize: "1.4rem",
              fontWeight: 800,
              color: "#0F172A",
              marginBottom: "0.75rem",
              fontFamily: "'Baloo 2', cursive"
            }}>
              Values
            </h3>
            <p style={{
              fontSize: "0.95rem",
              color: "#475569",
              lineHeight: 1.55,
              margin: 0,
              fontFamily: "'Comic Neue', cursive"
            }}>
              Integrity, Excellence, Student-Centric Approach, and Continuous Innovation in everything we do.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
