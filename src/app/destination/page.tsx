import React from "react";
import type { Metadata } from "next";
import HeaderBanner from "@/components/HeaderBanner";
import DestinationsGrid from "@/components/destination/DestinationsGrid";
import ComparisonTable from "@/components/destination/ComparisonTable";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Study Destinations | Rowshanara Edu",
  description: "Explore 20+ countries, compare study locations, tuition fees, and admission requirements to find your perfect study destination.",
  alternates: {
    canonical: "https://rowshanaraedu.com/destination",
  },
};

export default function DestinationPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--background)", paddingTop: "100px" }}>
      {/* Header Banner */}
      <HeaderBanner 
        title="Study Destinations" 
        subtitle="Explore 20+ countries and find your perfect study destination"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Destinations" }]}
      />

      <DestinationsGrid />
      <ComparisonTable />
      <CTA style={{ marginTop: "1.5rem", marginBottom: "2rem" }} />
    </div>
  );
}
