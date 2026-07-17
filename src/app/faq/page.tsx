import React from "react";
import type { Metadata } from "next";
import FAQ from "@/components/services/FAQ";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Rowshanara Edu",
  description: "Find answers to frequently asked questions about studying abroad, student visa processing, scholarship options, and admission requirements.",
  alternates: {
    canonical: "https://rowshanaraedu.com/faq",
  },
};

export default function FAQPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--background)", paddingTop: "100px" }}>
      <FAQ />
    </div>
  );
}
