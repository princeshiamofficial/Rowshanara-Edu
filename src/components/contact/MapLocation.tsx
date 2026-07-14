"use client";

import React from "react";
import { useContentSection } from "@/lib/useContentSection";

export default function MapLocation() {
  const [location] = useContentSection("location", [{
    itemKey: "map",
    title: "Our Location",
    linkUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.1574144561273!2d90.4401676855508!3d23.706072035573392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b74097c9ee29%3A0x4ed71eb5b2894d99!2sColor%20Hut!5e0!3m2!1sen!2sbd!4v1779648925770!5m2!1sen!2sbd",
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
