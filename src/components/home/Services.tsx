"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ServiceItem {
  id?: number;
  title: string;
  icon: string;
  image: string;
  description: string;
}

const staticServices: ServiceItem[] = [
  { title: "Admission Counselling", description: "Expert guidance for university selection", icon: "/icons/admission.png", image: "/icons/admission.png" },
  { title: "Visa Assistance", description: "Complete visa processing support", icon: "/icons/visa.png", image: "/icons/visa.png" },
  { title: "Scholarship Guidance", description: "Maximize your financial aid opportunities", icon: "/icons/scholarship.png", image: "/icons/scholarship.png" },
  { title: "Test Preparation", description: "IELTS, SAT, GRE coaching referrals", icon: "/icons/test_prep.png", image: "/icons/test_prep.png" },
  { title: "Pre-Departure Briefing", description: "Prepare for your journey abroad", icon: "/icons/pre_departure.png", image: "/icons/pre_departure.png" },
  { title: "Post-Arrival Support", description: "Continuous support after arrival", icon: "/icons/post_arrival.png", image: "/icons/post_arrival.png" }
];

const ICON_MAP: Record<string, string> = {
  "University Admission Counselling": "/icons/admission.png",
  "Student Visa Processing": "/icons/visa.png",
  "Scholarship & Financial Aid Guidance": "/icons/scholarship.png",
  "IELTS/SAT/GRE Test Prep Referral": "/icons/test_prep.png",
  "Pre-Departure Orientation": "/icons/pre_departure.png",
  "Post-Arrival Student Support": "/icons/post_arrival.png"
};

export default function Services() {
  const [services, setServices] = useState<ServiceItem[]>(staticServices);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success' && Array.isArray(res.data) && res.data.length > 0) {
          const mapped = res.data.map((s: any) => ({
            id: s.id,
            title: s.title,
            description: s.description,
            icon: ICON_MAP[s.title] || s.image || "/icons/admission.png",
            image: s.image
          }));
          setServices(mapped);
        }
      })
      .catch(err => console.error('Failed to load dynamic home services:', err));
  }, []);

  return (
    <section className="services-section">
      <h2 className="services-title">Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={service.id || index} className="service-card">
            <div className="service-icon-wrapper">
              <img 
                src={service.icon} 
                alt={service.title} 
                style={{ width: "84px", height: "84px", objectFit: "contain" }}
              />
            </div>
            <h3 className="service-name">{service.title}</h3>
            <p className="service-desc">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
