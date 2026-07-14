"use client";

import React from "react";
import { FaComments, FaBuildingColumns, FaFileSignature, FaPlaneDeparture } from "react-icons/fa6";
import { useContentSection } from "@/lib/useContentSection";

const fallbackSteps = [
  { itemKey: "free_counselling", title: "Free Counselling", subtitle: "Initial consultation", value: "1", metadata: { icon: "comments" } },
  { itemKey: "choose_university", title: "Choose University", subtitle: "Select your dream school", value: "2", metadata: { icon: "building" } },
  { itemKey: "application", title: "Application", subtitle: "Complete your application", value: "3", metadata: { icon: "file" } },
  { itemKey: "visa_depart", title: "Visa & Depart", subtitle: "Get visa and travel", value: "4", metadata: { icon: "plane" } },
];

const icons: Record<string, React.ReactNode> = {
  comments: <FaComments />,
  building: <FaBuildingColumns />,
  file: <FaFileSignature />,
  plane: <FaPlaneDeparture />,
};

export default function HowItWorks() {
  const steps = useContentSection("how_it_works", fallbackSteps as any);

  return (
    <section className="how-it-works-section">
      <div className="how-it-works-header">
        <h2 className="how-it-works-title">How It Works</h2>
        <p className="how-it-works-subtitle">Get closer to your study abroad dreams in 4 simple steps.</p>
      </div>
      <div className="how-it-works-steps">
        {steps.map((step, index) => {
          const number = step.value || String(index + 1);
          const iconName = typeof step.metadata?.icon === "string" ? step.metadata.icon : "comments";
          return (
            <div className={`how-it-works-step step-${index + 1}`} key={step.itemKey || index}>
              <span className="step-watermark">{number.padStart(2, "0")}</span>
              <div className="step-icon-circle">
                {icons[iconName] || icons.comments}
                <span className="step-badge-number">{number}</span>
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.subtitle}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
