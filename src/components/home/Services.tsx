import React from "react";
import Image from "next/image";

const services = [
  { title: "Admission Counselling", description: "Expert guidance for university selection", icon: "/icons/admission.png" },
  { title: "Visa Assistance", description: "Complete visa processing support", icon: "/icons/visa.png" },
  { title: "Scholarship Guidance", description: "Maximize your financial aid opportunities", icon: "/icons/scholarship.png" },
  { title: "Test Preparation", description: "IELTS, SAT, GRE coaching referrals", icon: "/icons/test_prep.png" },
  { title: "Pre-Departure Briefing", description: "Prepare for your journey abroad", icon: "/icons/pre_departure.png" },
  { title: "Post-Arrival Support", description: "Continuous support after arrival", icon: "/icons/post_arrival.png" }
];

export default function Services() {
  return (
    <section className="services-section">
      <h2 className="services-title">Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon-wrapper">
              <Image 
                src={service.icon} 
                alt={service.title} 
                width={84} 
                height={84}
                style={{ objectFit: "contain" }}
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
