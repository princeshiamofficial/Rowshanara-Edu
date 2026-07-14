"use client";

import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa6";
import { useContentSection } from "@/lib/useContentSection";

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
  const stories = useContentSection("success_stories", testimonials.map((item, index) => ({
    itemKey: String(index),
    title: item.name,
    subtitle: item.university,
    body: item.text,
    imageUrl: item.image,
    metadata: { country: item.country },
  })) as any);
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIndex, stories.length]);

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
      setActiveIndex((prev) => (prev + 1) % stories.length);
    } else if (isRightSwipe) {
      setActiveIndex((prev) => (prev - 1 + stories.length) % stories.length);
    }
  };

  return (
    <section className="testimonials-section">
      <h2 className="testimonials-title">Success Stories</h2>

      {/* Desktop view */}
      <div className="testimonials-grid">
        {stories.map((item, index) => (
          <div key={index} className="testimonial-card">
            <div className="testimonial-header">
              <div className="testimonial-user-info">
                <h3 className="testimonial-name">{item.title}</h3>
              </div>
            </div>
            <div className="testimonial-stars">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="star-icon" />
              ))}
            </div>
            <p className="testimonial-text">{item.body}</p>
            <p className="testimonial-university">{item.subtitle}</p>
            <img src={item.imageUrl} alt={item.title} className="testimonial-student-image" />
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
          {stories.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <div 
                key={index} 
                className={`testimonial-card-wrapper ${isActive ? "active" : ""}`}
              >
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="testimonial-user-info">
                        <h3 className="testimonial-name">{item.title}</h3>
                    </div>
                  </div>
                  <div className="testimonial-stars">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="star-icon" />
                    ))}
                  </div>
                  <p className="testimonial-text">{item.body}</p>
                  <p className="testimonial-university">{item.subtitle}</p>
                  <img src={item.imageUrl} alt={item.title} className="testimonial-student-image" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
