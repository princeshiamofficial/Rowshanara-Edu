import React from "react";
import type { Metadata } from "next";
import HeaderBanner from "@/components/HeaderBanner";
import ContactForm from "@/components/contact/ContactForm";
import OfficeDetails from "@/components/contact/OfficeDetails";
import SocialBar from "@/components/contact/SocialBar";
import MapLocation from "@/components/contact/MapLocation";

export const metadata: Metadata = {
  title: "Contact Us | Rowshanara Edu",
  description: "Get in touch with Rowshanara Edu. Contact our support or visit our offices for professional counseling and guidance on international education.",
  alternates: {
    canonical: "https://rowshanaraedu.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="hero-gradient contact-page-wrapper" style={{ minHeight: "100vh", paddingBottom: "1.5rem" }}>
      {/* Header Banner */}
      <HeaderBanner 
        title="Contact Us" 
        subtitle="Get in touch with our team. We're here to help!"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      {/* Main Content Layout */}
      <section className="container contact-page-container" style={{ marginTop: "3.5rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "4rem",
          alignItems: "stretch"
        }} className="contact-grid">
          <ContactForm />
          <OfficeDetails />
        </div>
      </section>

      {/* Social Media Bar */}
      <SocialBar />

      {/* Map Location Section */}
      <MapLocation />
    </div>
  );
}
