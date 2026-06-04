import React from "react";
import HeaderBanner from "@/components/HeaderBanner";
import ContactForm from "@/components/contact/ContactForm";
import OfficeDetails from "@/components/contact/OfficeDetails";
import SocialBar from "@/components/contact/SocialBar";
import MapLocation from "@/components/contact/MapLocation";

export default function ContactPage() {
  return (
    <div className="hero-gradient" style={{ minHeight: "100vh", paddingTop: "140px", paddingBottom: "1.5rem" }}>
      {/* Header Banner */}
      <HeaderBanner 
        title="Contact Us" 
        subtitle="Get in touch with our team. We're here to help!"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      {/* Main Content Layout */}
      <section className="container" style={{ marginTop: "3.5rem" }}>
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
