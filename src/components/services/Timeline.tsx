"use client";

import React from "react";
import { useContentSection } from "@/lib/useContentSection";

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
  const steps = useContentSection("service_process", timelineSteps.map((step) => ({
    itemKey: String(step.number),
    title: step.title,
    body: step.desc,
    value: String(step.number),
  })) as any);

  return (
    <section className="container" style={{ marginTop: "1.8rem", marginBottom: "4rem" }}>
      <h2 style={{
        textAlign: "center",
        fontSize: "clamp(1.35rem, 5.5vw, 2.5rem)",
        fontWeight: 800,
        color: "#0f172a",
        marginBottom: "3rem",
        fontFamily: "'Baloo 2', cursive",
        whiteSpace: "nowrap"
      }}>
        Our Process Timeline
      </h2>

      <div style={{
        maxWidth: "650px",
        margin: "0 auto",
        position: "relative"
      }}>
        {/* Vertical Timeline Line */}
        <div style={{
          position: "absolute",
          left: "21px",
          transform: "translateX(-50%)",
          top: "15px",
          bottom: "15px",
          width: "4px",
          background: "linear-gradient(to bottom, var(--primary) 0%, rgba(224, 145, 0, 0.15) 100%)",
          borderRadius: "2px",
          zIndex: 1
        }}></div>

        {/* Timeline Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {steps.map((step, index) => (
            <div key={step.itemKey || index} style={{
              position: "relative",
              display: "flex",
              alignItems: "center"
            }}>
              {/* Circle Number Badge (3D Claymorphic style) */}
              <div style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #ffb834 0%, #e09100 100%)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "1.1rem",
                boxShadow: "0 6px 15px rgba(224, 145, 0, 0.3), inset 0 -3px 6px rgba(0, 0, 0, 0.1), inset 0 3px 6px rgba(255, 255, 255, 0.4)",
                zIndex: 2,
                position: "absolute",
                left: "21px",
                top: "50%",
                transform: "translate(-50%, -50%)",
                flexShrink: 0,
                fontFamily: "'Baloo 2', cursive"
              }}>
                {step.value || index + 1}
              </div>

              {/* Card Container */}
              <div 
                className="timeline-card"
                style={{
                  marginLeft: "3.5rem",
                  padding: "1.1rem 1.4rem",
                  borderRadius: "18px",
                  background: "#ffffff",
                  border: "1px solid rgba(224, 145, 0, 0.08)",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.02)",
                  width: "100%",
                  textAlign: "left",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
              >
                <h3 style={{
                  fontSize: "1.15rem",
                  fontWeight: 750,
                  color: "#1e293b",
                  marginBottom: "0.25rem",
                  fontFamily: "'Baloo 2', cursive",
                  lineHeight: 1.3
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: "0.925rem",
                  color: "#64748b",
                  margin: 0,
                  fontFamily: "'Comic Neue', cursive",
                  lineHeight: 1.5
                }}>
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
