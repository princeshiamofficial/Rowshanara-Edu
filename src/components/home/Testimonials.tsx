"use client";

import React from "react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { useContentSection, type SiteContentItem } from "@/lib/useContentSection";

const defaultTestimonials = [
  {
    name: "Fatima Ahmed",
    image: "/fatima.png",
    country: "Bangladesh",
    text: '"Global Study Pathways made my dream of studying abroad a reality. Their guidance was invaluable!"',
    university: "University of Toronto",
  },
  {
    name: "Karim Hassan",
    image: "/karim.png",
    country: "Bangladesh",
    text: '"Professional, efficient, and genuinely caring team. Highly recommended!"',
    university: "University of Melbourne",
  },
  {
    name: "Aisha Khan",
    image: "/aisha.png",
    country: "Bangladesh",
    text: '"Best decision I made was choosing Global Study Pathways. Worth every penny!"',
    university: "London School of Economics",
  },
];

const fallbackTestimonials: SiteContentItem[] = defaultTestimonials.map((item, index) => ({
  id: index,
  section: "success_stories",
  itemKey: String(index),
  title: item.name,
  subtitle: item.university,
  body: item.text,
  value: "",
  imageUrl: item.image,
  linkUrl: "",
  metadata: { country: item.country },
  sortOrder: index,
  isActive: true,
}));

export default function Testimonials() {
  const stories = useContentSection("success_stories", fallbackTestimonials);

  const animatedStories = stories.map((item) => ({
    quote: item.body,
    name: item.title,
    designation: item.subtitle,
    src: item.imageUrl && item.imageUrl !== "" ? item.imageUrl : "",
    rating: typeof item.metadata?.rating === "number" ? item.metadata.rating : 5,
  }));

  return (
    <section className="testimonials-section">
      <h2 className="testimonials-title">Success Stories</h2>
      <AnimatedTestimonials testimonials={animatedStories} autoplay />
    </section>
  );
}
