"use client";

import React, { useState, useEffect } from "react";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    } else if (isRightSwipe) {
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  return (
    <section className="testimonials-section">
      <h2 className="testimonials-title">Success Stories</h2>

      {/* Desktop view */}
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

      {/* Mobile view: swipeable carousel */}
      <div className="testimonials-mobile-carousel">
        <div 
          className="testimonials-carousel-track"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {testimonials.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <div 
                key={index} 
                className={`testimonial-card-wrapper ${isActive ? "active" : ""}`}
              >
                <div className="testimonial-card">
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
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
