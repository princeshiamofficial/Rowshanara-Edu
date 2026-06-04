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
            border: "1px solid rgba(255, 78, 80, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.5rem",
            boxShadow: "0 10px 22px rgba(255, 78, 80, 0.2)",
            marginTop: "-3.75rem",
            zIndex: 2,
            position: "relative"
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 64 64" fill="none">
              <defs>
                <linearGradient id="targetRed" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF5E62" />
                  <stop offset="100%" stopColor="#FF1E27" />
                </linearGradient>
                <linearGradient id="targetOrange" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD97D" />
                  <stop offset="100%" stopColor="#FF8C00" />
                </linearGradient>
                <linearGradient id="targetGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF066" />
                  <stop offset="100%" stopColor="#E09100" />
                </linearGradient>
                <linearGradient id="glossHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="arrowWood" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E2E8F0" />
                  <stop offset="100%" stopColor="#94A3B8" />
                </linearGradient>
                <filter id="shadowFilter1" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.18" />
                </filter>
              </defs>
              <circle cx="32" cy="32" r="24" fill="url(#targetRed)" filter="url(#shadowFilter1)" />
              <circle cx="32" cy="32" r="24" fill="url(#glossHighlight)" />
              <circle cx="32" cy="32" r="16" fill="#FFFFFF" filter="url(#shadowFilter1)" />
              <circle cx="32" cy="32" r="11" fill="url(#targetOrange)" />
              <circle cx="32" cy="32" r="6" fill="url(#targetGold)" filter="url(#shadowFilter1)" />
              <g filter="url(#shadowFilter1)">
                <path d="M48 16 L34 30" stroke="url(#arrowWood)" strokeWidth="3" strokeLinecap="round" />
                <path d="M44 14 L49 13 L47 18 Z" fill="#FF1E27" />
                <path d="M46 12 L50 15 L45 17 Z" fill="#FF8C00" />
                <path d="M34 30 L32 32 L30 30" stroke="#E09100" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
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
            border: "1px solid rgba(0, 114, 255, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.5rem",
            boxShadow: "0 10px 22px rgba(0, 114, 255, 0.2)",
            marginTop: "-3.75rem",
            zIndex: 2,
            position: "relative"
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 64 64" fill="none">
              <defs>
                <linearGradient id="eyeBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00C6FF" />
                  <stop offset="100%" stopColor="#0072FF" />
                </linearGradient>
                <linearGradient id="irisCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00F2FE" />
                  <stop offset="100%" stopColor="#4FACFE" />
                </linearGradient>
                <filter id="shadowFilter2" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.18" />
                </filter>
              </defs>
              <path d="M8 32 C16 18, 48 18, 56 32 C48 46, 16 46, 8 32 Z" fill="#FFFFFF" filter="url(#shadowFilter2)" />
              <path d="M8 32 C16 18, 48 18, 56 32" stroke="url(#eyeBlue)" strokeWidth="3" strokeLinecap="round" />
              <path d="M8 32 C16 46, 48 46, 56 32" stroke="url(#eyeBlue)" strokeWidth="2" strokeLinecap="round" />
              <circle cx="32" cy="32" r="11" fill="url(#irisCyan)" filter="url(#shadowFilter2)" />
              <circle cx="32" cy="32" r="5" fill="#0F172A" />
              <path d="M28 25 A 5 5 0 0 1 36 25" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
              <circle cx="35" cy="29" r="1.5" fill="#FFFFFF" opacity="0.9" />
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
            border: "1px solid rgba(255, 8, 68, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.5rem",
            boxShadow: "0 10px 22px rgba(255, 8, 68, 0.2)",
            marginTop: "-3.75rem",
            zIndex: 2,
            position: "relative"
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 64 64" fill="none">
              <defs>
                <linearGradient id="heartRed" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF0844" />
                  <stop offset="100%" stopColor="#FF4E50" />
                </linearGradient>
                <linearGradient id="heartGloss" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>
                <filter id="shadowFilter3" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="1" dy="2.5" stdDeviation="2" floodColor="#FF0844" floodOpacity="0.3" />
                </filter>
              </defs>
              <path d="M32 54 C32 54, 52 38, 52 24 C52 14, 44 6, 35 6 C30 6, 26 10, 24 14 C22 10, 18 6, 13 6 C4 6, -4 14, -4 24 C-4 38, 16 54, 32 54 Z" 
                    fill="url(#heartRed)" 
                    filter="url(#shadowFilter3)"
                    transform="scale(0.8) translate(8, 6)" />
              <path d="M32 54 C32 54, 52 38, 52 24 C52 14, 44 6, 35 6 C30 6, 26 10, 24 14 C22 10, 18 6, 13 6 C4 6, -4 14, -4 24 C-4 38, 16 54, 32 54 Z" 
                    fill="url(#heartGloss)" 
                    transform="scale(0.8) translate(8, 6)"
                    opacity="0.45" />
              <ellipse cx="20" cy="18" rx="4" ry="2.5" transform="rotate(-30, 20, 18)" fill="#FFFFFF" opacity="0.75" />
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
