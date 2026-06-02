import React from "react";
import { FaStar } from "react-icons/fa6";

const testimonials = [
  {
    name: "Fatima Ahmed",
    image: "/fatima.png",
    country: "Bangladesh",
    initial: "F",
    text: '"Global Study Pathways made my dream of studying abroad a reality. Their guidance was invaluable!"',
    university: "University of Toronto"
  },
  {
    name: "Karim Hassan",
    image: "/karim.png",
    country: "Bangladesh",
    initial: "K",
    text: '"Professional, efficient, and genuinely caring team. Highly recommended!"',
    university: "University of Melbourne"
  },
  {
    name: "Aisha Khan",
    image: "/aisha.png",
    country: "Bangladesh",
    initial: "A",
    text: '"Best decision I made was choosing Global Study Pathways. Worth every penny!"',
    university: "London School of Economics"
  }
];

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <h2 className="testimonials-title">Success Stories</h2>
      <div className="testimonials-grid">
        {testimonials.map((item, index) => (
          <div key={index} className="testimonial-card">
            <div className="testimonial-header">
              <div className="testimonial-user-info">
                <h3 className="testimonial-name">{item.name}</h3>
              </div>
            </div>
            <div className="testimonial-stars">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="star-icon" />
              ))}
            </div>
            <p className="testimonial-text">{item.text}</p>
            <p className="testimonial-university">{item.university}</p>
            <img src={item.image} alt={item.name} className="testimonial-student-image" />
          </div>
        ))}
      </div>
    </section>
  );
}
