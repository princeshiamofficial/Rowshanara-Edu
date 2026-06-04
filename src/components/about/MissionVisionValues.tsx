import React from "react";

export default function MissionVisionValues() {
  return (
    <section className="container" style={{ marginTop: "5rem", marginBottom: "1.75rem" }}>
      <div className="mission-vision-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "2.5rem 2rem"
      }}>
        {/* Mission Card */}
        <div style={{
          background: "linear-gradient(135deg, rgba(10, 28, 58, 0.93) 0%, rgba(6, 17, 36, 0.96) 100%), url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop') no-repeat center center",
          backgroundSize: "cover",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "24px",
          padding: "3.5rem 2rem 2.25rem 2rem",
          textAlign: "center",
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.12)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative"
        }}>
          <div className="mission-vision-badge" style={{
            border: "1px solid rgba(255, 78, 80, 0.15)",
            boxShadow: "0 10px 25px rgba(255, 78, 80, 0.2)"
          }}>
            <img 
              src="/images/about/mission.png" 
              alt="Mission Illustration" 
              style={{ width: "100%", height: "100%", objectFit: "cover" }} 
            />
          </div>
          <h3 style={{
            fontSize: "1.5rem",
            fontWeight: 800,
            color: "white",
            marginBottom: "1rem",
            fontFamily: "'Baloo 2', cursive"
          }}>
            Mission
          </h3>
          <p style={{
            fontSize: "1rem",
            color: "rgba(255, 255, 255, 0.85)",
            lineHeight: 1.6,
            margin: 0,
            fontFamily: "'Comic Neue', cursive"
          }}>
            To empower Bangladeshi students with world-class education opportunities and guidance for their international academic journey.
          </p>
        </div>

        {/* Vision Card */}
        <div style={{
          background: "linear-gradient(135deg, rgba(10, 28, 58, 0.93) 0%, rgba(6, 17, 36, 0.96) 100%), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop') no-repeat center center",
          backgroundSize: "cover",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "24px",
          padding: "3.5rem 2rem 2.25rem 2rem",
          textAlign: "center",
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.12)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative"
        }}>
          <div className="mission-vision-badge" style={{
            border: "1px solid rgba(0, 114, 255, 0.15)",
            boxShadow: "0 10px 25px rgba(0, 114, 255, 0.2)"
          }}>
            <img 
              src="/images/about/vision.png" 
              alt="Vision Illustration" 
              style={{ width: "100%", height: "100%", objectFit: "cover" }} 
            />
          </div>
          <h3 style={{
            fontSize: "1.5rem",
            fontWeight: 800,
            color: "white",
            marginBottom: "1rem",
            fontFamily: "'Baloo 2', cursive"
          }}>
            Vision
          </h3>
          <p style={{
            fontSize: "1rem",
            color: "rgba(255, 255, 255, 0.85)",
            lineHeight: 1.6,
            margin: 0,
            fontFamily: "'Comic Neue', cursive"
          }}>
            To be the most trusted and innovative education consultancy, transforming lives through global education.
          </p>
        </div>

        {/* Values Card */}
        <div style={{
          background: "linear-gradient(135deg, rgba(10, 28, 58, 0.93) 0%, rgba(6, 17, 36, 0.96) 100%), url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop') no-repeat center center",
          backgroundSize: "cover",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "24px",
          padding: "3.5rem 2rem 2.25rem 2rem",
          textAlign: "center",
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.12)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative"
        }}>
          <div className="mission-vision-badge" style={{
            border: "1px solid rgba(255, 8, 68, 0.15)",
            boxShadow: "0 10px 25px rgba(255, 8, 68, 0.2)"
          }}>
            <img 
              src="/images/about/values.png" 
              alt="Values Illustration" 
              style={{ width: "100%", height: "100%", objectFit: "cover" }} 
            />
          </div>
          <h3 style={{
            fontSize: "1.5rem",
            fontWeight: 800,
            color: "white",
            marginBottom: "1rem",
            fontFamily: "'Baloo 2', cursive"
          }}>
            Values
          </h3>
          <p style={{
            fontSize: "1rem",
            color: "rgba(255, 255, 255, 0.85)",
            lineHeight: 1.6,
            margin: 0,
            fontFamily: "'Comic Neue', cursive"
          }}>
            Integrity, Excellence, Student-Centric Approach, and Continuous Innovation in everything we do.
          </p>
        </div>
      </div>
    </section>
  );
}
