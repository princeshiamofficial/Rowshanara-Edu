"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface HeroSlide {
  id?: number;
  title: string;
  image: string;
  buttonText: string;
  link: string;
  gradient: string;
}

const defaultSlides: HeroSlide[] = [
  {
    title: "Study in Australia",
    image: "/sydney_opera_house.png",
    buttonText: "BOOK FREE CONSULTATION",
    link: "/contact",
    gradient: "linear-gradient(90deg, rgba(224, 145, 0, 0.85) 0%, rgba(224, 145, 0, 0.6) 24%, rgba(224, 145, 0, 0.2) 48%, rgba(224, 145, 0, 0) 66.6%)"
  },
  {
    title: "Study in Canada",
    image: "/canada_hero.png",
    buttonText: "BOOK FREE CONSULTATION",
    link: "/contact",
    gradient: "linear-gradient(90deg, rgba(224, 145, 0, 0.85) 0%, rgba(224, 145, 0, 0.6) 24%, rgba(224, 145, 0, 0.2) 48%, rgba(224, 145, 0, 0) 66.6%)"
  },
  {
    title: "Study in United Kingdom",
    image: "/uk_hero.png",
    buttonText: "BOOK FREE CONSULTATION",
    link: "/contact",
    gradient: "linear-gradient(90deg, rgba(224, 145, 0, 0.85) 0%, rgba(224, 145, 0, 0.6) 24%, rgba(224, 145, 0, 0.2) 48%, rgba(224, 145, 0, 0) 66.6%)"
  }
];

export default function Hero() {
  const [slides, setSlides] = useState<HeroSlide[]>(defaultSlides);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/hero")
      .then((response) => response.json())
      .then((result) => {
        if (
          isMounted &&
          result.status === "success" &&
          Array.isArray(result.data) &&
          result.data.length > 0
        ) {
          setSlides(result.data);
          setActiveIndex(0);
        }
      })
      .catch(() => {
        if (isMounted) {
          setSlides(defaultSlides);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      handleNext();
    }, 5000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [activeIndex]);

  const handleSlideChange = (newIndex: number) => {
    if (newIndex === activeIndex || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(newIndex);
      setIsTransitioning(false);
    }, 150);
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % slides.length;
    handleSlideChange(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + slides.length) % slides.length;
    handleSlideChange(prevIndex);
  };

  return (
    <div className="hero-section-wrapper">
      <div className="hero-card">
        {/* Background Layers */}
        {slides.map((slide, index) => (
          <div
            key={`bg-${index}`}
            style={{
              position: "absolute",
              inset: 0,
              background: `url(${slide.image}) no-repeat center center`,
              backgroundSize: "cover",
              opacity: activeIndex === index ? 1 : 0,
              transition: "opacity 0.8s ease-in-out",
              zIndex: activeIndex === index ? 0 : -1
            }}
          />
        ))}

        {/* Gradient Overlay Layers */}
        {slides.map((slide, index) => (
          <div
            key={`overlay-${index}`}
            className="hero-gradient-overlay"
            style={{
              opacity: activeIndex === index ? 1 : 0,
              transition: "opacity 0.8s ease-in-out",
              zIndex: 1,
              background: slide.gradient
            }}
          />
        ))}

        {/* Content Panel */}
        <div className="hero-content" style={{ zIndex: 2 }}>
          <h1
            className="hero-title"
            style={{
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? "translateY(10px)" : "translateY(0)",
              transition: "opacity 0.2s ease, transform 0.2s ease"
            }}
          >
            {slides[activeIndex].title}
          </h1>
          <button
            className="hero-button"
            onClick={() => window.location.href = slides[activeIndex].link}
            style={{
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? "translateY(10px)" : "translateY(0)",
              transition: "opacity 0.2s ease, transform 0.2s ease"
            }}
          >
            <span className="hero-button-text">
              {slides[activeIndex].buttonText}
            </span>
            <div className="hero-button-arrow">
              <FaChevronRight />
            </div>
          </button>
        </div>

        {/* Navigation Arrows */}
        <button
          className="hero-arrow-btn"
          onClick={handlePrev}
          style={{ left: "1.5rem" }}
          aria-label="Previous Slide"
        >
          <FaChevronLeft />
        </button>
        <button
          className="hero-arrow-btn"
          onClick={handleNext}
          style={{ right: "1.5rem" }}
          aria-label="Next Slide"
        >
          <FaChevronRight />
        </button>

        {/* Indicator Dots */}
        <div className="hero-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`hero-dot ${activeIndex === index ? "active" : ""}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
