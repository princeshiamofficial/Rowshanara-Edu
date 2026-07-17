"use client";

import React from "react";
import {
  FaAward,
  FaClipboardCheck,
  FaComments,
  FaEarthAsia,
  FaHandHoldingDollar,
  FaHeadset,
} from "react-icons/fa6";
import { useContentSection } from "@/lib/useContentSection";

const fallbackFeatures = [
  {
    itemKey: "counselling",
    title: "Personal Counselling",
    body: "One-to-one guidance shaped around your grades, budget, goals, and preferred destination.",
    metadata: { icon: "comments" },
  },
  {
    itemKey: "university_shortlist",
    title: "Smart University Shortlist",
    body: "Compare programs, intakes, tuition, and entry requirements before you apply.",
    metadata: { icon: "earth" },
  },
  {
    itemKey: "application_review",
    title: "Application Review",
    body: "Get your documents, SOP, references, and forms checked before submission.",
    metadata: { icon: "clipboard" },
  },
  {
    itemKey: "scholarship_planning",
    title: "Scholarship Planning",
    body: "Find realistic scholarship and funding routes early in the admission process.",
    metadata: { icon: "money" },
  },
  {
    itemKey: "visa_support",
    title: "Visa-Focused Support",
    body: "Prepare financial documents, interview answers, and timelines with confidence.",
    metadata: { icon: "award" },
  },
  {
    itemKey: "arrival_care",
    title: "Post-Arrival Care",
    body: "Stay supported with orientation, accommodation tips, and settling-in guidance.",
    metadata: { icon: "headset" },
  },
];

const icons: Record<string, React.ReactNode> = {
  award: <FaAward />,
  clipboard: <FaClipboardCheck />,
  comments: <FaComments />,
  earth: <FaEarthAsia />,
  headset: <FaHeadset />,
  money: <FaHandHoldingDollar />,
};

export default function WhyChooseRowshanara() {
  const features = useContentSection("home_why_choose_rowshanara", fallbackFeatures as any);

  return (
    <section className="why-rowshanara-section">
      <div className="why-rowshanara-container">
        <div className="why-rowshanara-header">
          <div>
            <span className="why-rowshanara-eyebrow">Why Rowshanara Edu</span>
            <h2 className="why-rowshanara-title">Everything your study abroad journey needs.</h2>
            <p className="why-rowshanara-subtitle">
              From choosing the right course to arriving on campus, our team keeps every step clear,
              practical, and student-first.
            </p>
          </div>
          <a className="why-rowshanara-link" href="/contact">
            Book free counselling
          </a>
        </div>

        <div className="why-rowshanara-grid">
          {features.map((feature, index) => {
            const iconName = typeof feature.metadata?.icon === "string" ? feature.metadata.icon : "comments";
            return (
              <article className="why-rowshanara-card" key={feature.itemKey || index}>
                <span className="why-rowshanara-icon">{icons[iconName] || icons.comments}</span>
                <h3>{feature.title}</h3>
                <p>{feature.body || feature.subtitle}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
