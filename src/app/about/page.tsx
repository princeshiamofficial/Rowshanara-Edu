import React from "react";
import type { Metadata } from "next";
import BrandOverview from "@/components/about/BrandOverview";
import Journey from "@/components/about/Journey";
import MissionVisionValues from "@/components/about/MissionVisionValues";
import Stats from "@/components/about/Stats";
import Team from "@/components/about/Team";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "About Us & Global Study Solutions | Rowshanara Edu",
  description: "Learn more about Rowshanara Edu, our official mission, vision, and how we empower students worldwide to pursue global education opportunities.",
  alternates: {
    canonical: "https://rowshanaraedu.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="hero-gradient about-page-wrapper" style={{ minHeight: "100vh", paddingBottom: "1.5rem" }}>
      <BrandOverview />
      <Journey />
      <MissionVisionValues />
      <Stats />
      <Team />
      <WhyChooseUs />
      <CTA style={{ marginTop: "3.5rem", marginBottom: "1.5rem" }} />
    </div>
  );
}
