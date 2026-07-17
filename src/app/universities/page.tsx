import React from "react";
import type { Metadata } from "next";
import UniversitiesPageClient from "@/components/universities/UniversitiesPageClient";

export const metadata: Metadata = {
  title: "Partner Universities | Rowshanara Edu",
  description: "Explore our global network of 500+ partner universities across 20+ countries. Search for institutions, programs, and scholarship opportunities.",
  alternates: {
    canonical: "https://rowshanaraedu.com/universities",
  },
};

export default function UniversitiesPage() {
  return <UniversitiesPageClient />;
}
