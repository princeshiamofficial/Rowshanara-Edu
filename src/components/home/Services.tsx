import React from "react";
import { 
  FaBookOpen, 
  FaFileLines, 
  FaBriefcase, 
  FaUserGroup, 
  FaPlane, 
  FaLocationDot 
} from "react-icons/fa6";

const services = [
  { title: "Admission Counselling", description: "Expert guidance for university selection", icon: <FaBookOpen /> },
  { title: "Visa Assistance", description: "Complete visa processing support", icon: <FaFileLines /> },
  { title: "Scholarship Guidance", description: "Maximize your financial aid opportunities", icon: <FaBriefcase /> },
  { title: "Test Preparation", description: "IELTS, SAT, GRE coaching referrals", icon: <FaUserGroup /> },
  { title: "Pre-Departure Briefing", description: "Prepare for your journey abroad", icon: <FaPlane /> },
  { title: "Post-Arrival Support", description: "Continuous support after arrival", icon: <FaLocationDot /> }
];

export default function Services() {
  return (
    <section className="services-section">
      <h2 className="services-title">Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon-wrapper">
              {service.icon}
            </div>
            <h3 className="service-name">{service.title}</h3>
            <p className="service-desc">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
