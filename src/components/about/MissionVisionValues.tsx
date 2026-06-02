import React from "react";

export default function MissionVisionValues() {
  return (
    <section className="container" style={{ marginTop: "5rem", marginBottom: "1.75rem" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "2rem"
      }}>
        {/* Mission Card */}
        <div style={{
          background: "linear-gradient(135deg, rgba(10, 28, 58, 0.93) 0%, rgba(6, 17, 36, 0.96) 100%), url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop') no-repeat center center",
          backgroundSize: "cover",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "24px",
          padding: "2.25rem 2rem",
          textAlign: "center",
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.12)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <div style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            backgroundColor: "white",
            border: "1px solid rgba(255, 78, 80, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.5rem",
            boxShadow: "0 8px 20px rgba(255, 78, 80, 0.18)",
            marginTop: "-3.75rem",
            zIndex: 2,
            position: "relative"
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#FF4E50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" stroke="#FF4E50" fill="rgba(255, 78, 80, 0.05)" />
              <circle cx="12" cy="12" r="6" stroke="#FF8C00" fill="rgba(255, 140, 0, 0.1)" />
              <circle cx="12" cy="12" r="2" stroke="#FF4E50" fill="#FF4E50" />
            </svg>
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
          padding: "2.25rem 2rem",
          textAlign: "center",
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.12)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <div style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            backgroundColor: "white",
            border: "1px solid rgba(0, 114, 255, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.5rem",
            boxShadow: "0 8px 20px rgba(0, 114, 255, 0.18)",
            marginTop: "-3.75rem",
            zIndex: 2,
            position: "relative"
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0072FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#0072FF" fill="rgba(0, 114, 255, 0.05)" />
              <circle cx="12" cy="12" r="3" stroke="#00C6FF" fill="#0072FF" />
            </svg>
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
          padding: "2.25rem 2rem",
          textAlign: "center",
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.12)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <div style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            backgroundColor: "white",
            border: "1px solid rgba(255, 8, 68, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.5rem",
            boxShadow: "0 8px 20px rgba(255, 8, 68, 0.18)",
            marginTop: "-3.75rem",
            zIndex: 2,
            position: "relative"
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#FF0844" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="#FF0844" fill="#FF4E50" style={{ fillOpacity: 0.15 }} />
            </svg>
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
