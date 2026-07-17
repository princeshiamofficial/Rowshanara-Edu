"use client";

import React, { useState, useEffect } from "react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

interface Testimonial {
  id: number;
  studentName: string;
  photoUrl: string;
  rating: number;
  comment: string;
  isFeatured: boolean;
}

export default function Testimonials() {
  const [stories, setStories] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/testimonials?featured=true")
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success" && Array.isArray(res.data)) {
          setStories(res.data);
        }
      })
      .catch((err) => console.error("Failed to load featured testimonials:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const animatedStories = stories.map((item) => {
    // Parse designation like "Fatima Ahmed (University of Toronto)"
    const parts = item.studentName.match(/^([^(]+)(?:\(([^)]+)\))?$/);
    const name = parts ? parts[1].trim() : item.studentName;
    const designation = parts && parts[2] ? parts[2].trim() : "Student Visa Client";

    return {
      quote: item.comment,
      name: name,
      designation: designation,
      src: item.photoUrl && item.photoUrl !== "" ? item.photoUrl : "/logo.png",
    };
  });

  if (isLoading) {
    return (
      <section className="testimonials-section" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#94a3b8', fontSize: '0.9rem' }} className="animate-pulse">Loading success stories...</div>
      </section>
    );
  }

  if (stories.length === 0) {
    return null; // Don't render testimonial section if empty
  }

  return (
    <section className="testimonials-section">
      <h2 className="testimonials-title">Success Stories</h2>
      <AnimatedTestimonials testimonials={animatedStories} autoplay />
    </section>
  );
}
