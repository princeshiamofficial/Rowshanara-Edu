"use client";

import React, { useRef, useEffect, useState } from "react";
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

  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationId: number;
    let scrollPos = 0;
    const speed = 0.5;

    const getSingleSetWidth = () => {
      const half = track.scrollWidth / 2;
      return half;
    };

    const animate = () => {
      if (!isPaused) {
        scrollPos += speed;
        const singleSet = getSingleSetWidth();
        if (scrollPos >= singleSet) {
          scrollPos -= singleSet;
        }
        track.style.transform = `translateX(-${scrollPos}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  const allStories = [...stories, ...stories];

  return (
    <section className="testimonials-section">
      <h2 className="testimonials-title">Success Stories</h2>

      <div
        className="testimonials-carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="testimonials-carousel-track" ref={trackRef}>
          {allStories.map((item, index) => (
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
      </div>
    </section>
  );
}
