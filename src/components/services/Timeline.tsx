import React from "react";

const timelineSteps = [
  {
    number: 1,
    title: "Initial Consultation",
    desc: "Meet with our counselors to discuss your goals"
  },
  {
    number: 2,
    title: "Profile Assessment",
    desc: "Evaluate your academic and professional background"
  },
  {
    number: 3,
    title: "University Selection",
    desc: "Shortlist universities matching your profile"
  },
  {
    number: 4,
    title: "Application Preparation",
    desc: "Prepare all required documents and essays"
  },
  {
    number: 5,
    title: "Application Submission",
    desc: "Submit applications to selected universities"
  },
  {
    number: 6,
    title: "Visa & Departure",
    desc: "Complete visa process and prepare for departure"
  }
];

export default function Timeline() {
  return (
    <section className="container" style={{ marginTop: "1.8rem", marginBottom: "6rem" }}>
      <h2 style={{
        textAlign: "center",
        fontSize: "2.5rem",
        fontWeight: 800,
        color: "#0f172a",
        marginBottom: "4rem",
        fontFamily: "'Baloo 2', cursive"
      }}>
        Our Process Timeline
      </h2>

      <div style={{
        maxWidth: "600px",
        margin: "0 auto",
        position: "relative"
      }}>
        {/* Vertical Timeline Line */}
        <div style={{
          position: "absolute",
          left: "19px",
          top: "20px",
          bottom: "20px",
          width: "2px",
          background: "var(--primary)",
          opacity: 0.4,
          zIndex: 1
        }}></div>

        {/* Timeline Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {timelineSteps.map((step) => (
            <div key={step.number} style={{
              position: "relative",
              display: "flex",
              alignItems: "flex-start",
              minHeight: "60px"
            }}>
              {/* Circle Number Badge */}
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "var(--primary)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "1rem",
                boxShadow: "0 4px 10px rgba(224, 145, 0, 0.25)",
                zIndex: 2,
                position: "relative",
                flexShrink: 0
              }}>
                {step.number}
              </div>

              {/* Step Text Content */}
              <div style={{ paddingLeft: "1.5rem", paddingTop: "0.2rem" }}>
                <h3 style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "#1e293b",
                  marginBottom: "0.35rem",
                  fontFamily: "'Baloo 2', cursive"
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: "0.95rem",
                  color: "#64748b",
                  margin: 0,
                  fontFamily: "'Comic Neue', cursive",
                  lineHeight: 1.5
                }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
