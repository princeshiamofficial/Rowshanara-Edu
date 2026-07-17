"use client";

import React from "react";
import { useContentSection } from "@/lib/useContentSection";

export default function MapLocation() {
  const [location] = useContentSection("location", [{
    itemKey: "map",
    title: "Our Location",
    linkUrl: "https://maps.google.com/maps?q=Rowshanara%20Edu,%20MNSN%20Tower,%2060%20Dilkusha,%20Dhaka%201000,%20Bangladesh&t=&z=15&ie=UTF8&iwloc=B&output=embed",
  }] as any);

  return (
    <section className="container" style={{ marginTop: "2rem", marginBottom: "1.5rem" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2 style={{
          fontSize: "2rem",
          fontWeight: 800,
          color: "var(--text)",
          fontFamily: "'Baloo 2', cursive"
        }}>
          {location?.title || "Our Location"}
        </h2>
      </div>
      <div className="map-iframe-wrapper">
        <iframe
          src={location?.linkUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}
