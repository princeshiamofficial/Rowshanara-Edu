import React from "react";
import HeaderBanner from "@/components/HeaderBanner";
import DestinationsGrid from "@/components/destination/DestinationsGrid";
import ComparisonTable from "@/components/destination/ComparisonTable";
import CTA from "@/components/CTA";

export default function DestinationPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--background)", paddingTop: "140px" }}>
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
