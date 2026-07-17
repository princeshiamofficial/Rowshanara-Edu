import React from "react";
import type { Metadata } from "next";
import HeaderBanner from "@/components/HeaderBanner";
import ContactForm from "@/components/contact/ContactForm";
import OfficeDetails from "@/components/contact/OfficeDetails";
import SocialBar from "@/components/contact/SocialBar";
import MapLocation from "@/components/contact/MapLocation";

export const metadata: Metadata = {
  title: "Contact Us & Get Global Study Solutions | Rowshanara Edu",
  description: "Get in touch with Rowshanara Edu. Contact our support or visit our offices for professional counseling and guidance on international education.",
  alternates: {
    canonical: "https://rowshanaraedu.com/contact",
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://rowshanaraedu.com/contact/#webpage",
  "url": "https://rowshanaraedu.com/contact",
  "name": "Contact Us | Rowshanara Edu",
  "description": "Get in touch with Rowshanara Edu. Contact our support or visit our offices for professional counseling and guidance on international education.",
  "mainEntity": {
    "@type": "EducationalOrganization",
    "name": "Rowshanara Edu",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "MNSN Tower, 60 Dilkusha",
      "addressLocality": "Dhaka",
      "postalCode": "1000",
      "addressCountry": "BD"
    },
    "telephone": "+880 1511-710730",
    "email": "info@rowshanaraedu.com"
  }
};

export default function ContactPage() {
  return (
    <div className="hero-gradient contact-page-wrapper" style={{ minHeight: "100vh", paddingBottom: "1.5rem" }}>
      <script
        type="application/ld+json"
        id="contact-jsonld"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
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
