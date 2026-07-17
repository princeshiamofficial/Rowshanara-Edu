import React from "react";
import type { Metadata } from "next";
import ServicesGrid from "@/components/services/ServicesGrid";
import Timeline from "@/components/services/Timeline";
import FAQ from "@/components/services/FAQ";
import CTA from "@/components/CTA";
import HeaderBanner from "@/components/HeaderBanner";

export const metadata: Metadata = {
  title: "Our Services | Rowshanara Edu",
  description: "Explore our comprehensive support services including university search, admission assistance, visa processing, and post-arrival counseling.",
  alternates: {
    canonical: "https://rowshanaraedu.com/services",
  },
};

export default function ServicesPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--background)", paddingTop: "100px" }}>
      <HeaderBanner 
        title="Our Services" 
        subtitle="Comprehensive support for every step of your study abroad journey"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <ServicesGrid />
      <Timeline />
      <FAQ />
      <CTA style={{ marginTop: "1.5rem", marginBottom: "2rem" }} />
    </div>
  );
}
