"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaGraduationCap,
  FaComments,
  FaBuildingColumns,
  FaFileSignature,
  FaPlaneDeparture,
  FaBookOpen,
  FaFileLines,
  FaBriefcase,
  FaUserGroup,
  FaPlane,
  FaLocationDot,
  FaStar
} from "react-icons/fa6";

const slides = [
  {
    title: "Study in Australia",
    image: "/sydney_opera_house.png",
    buttonText: "BOOK FREE CONSULTATION",
    link: "/contact",
    gradient: "linear-gradient(90deg, rgba(179, 18, 38, 0.85) 0%, rgba(179, 18, 38, 0.6) 24%, rgba(179, 18, 38, 0.2) 48%, rgba(179, 18, 38, 0) 66.6%)"
  },
  {
    title: "Study in Canada",
    image: "/canada_hero.png",
    buttonText: "BOOK FREE CONSULTATION",
    link: "/contact",
    gradient: "linear-gradient(90deg, rgba(179, 18, 38, 0.85) 0%, rgba(179, 18, 38, 0.6) 24%, rgba(179, 18, 38, 0.2) 48%, rgba(179, 18, 38, 0) 66.6%)"
  },
  {
    title: "Study in United Kingdom",
    image: "/uk_hero.png",
    buttonText: "BOOK FREE CONSULTATION",
    link: "/contact",
    gradient: "linear-gradient(90deg, rgba(179, 18, 38, 0.85) 0%, rgba(179, 18, 38, 0.6) 24%, rgba(179, 18, 38, 0.2) 48%, rgba(179, 18, 38, 0) 66.6%)"
  }
];

const universities = [
  "University of Sydney",
  "University of Toronto",
  "Oxford University",
  "University of Melbourne",
  "Harvard University",
  "University of British Columbia",
  "Cambridge University",
  "Stanford University"
];

const destinations = [
  { name: "United Kingdom", universities: 12, gradient: "linear-gradient(135deg, #5fa8ff 0%, #3e84ff 100%)", image: "/uk_hero.png" },
  { name: "Canada", universities: 10, gradient: "linear-gradient(135deg, #ff6b6b 0%, #ee4444 100%)", image: "/canada_hero.png" },
  { name: "Australia", universities: 8, gradient: "linear-gradient(135deg, #ffc107 0%, #ff9800 100%)", image: "/sydney_opera_house.png" },
  { name: "USA", universities: 15, gradient: "linear-gradient(135deg, #7c4dff 0%, #5e35b1 100%)", image: "/usa_landmark.png" },
  { name: "Germany", universities: 9, gradient: "linear-gradient(135deg, #616161 0%, #424242 100%)", image: "/germany_landmark.png" },
  { name: "Malaysia", universities: 7, gradient: "linear-gradient(135deg, #ff9800 0%, #f57c00 100%)", image: "/malaysia_landmark.png" }
];

const services = [
  { title: "Admission Counselling", description: "Expert guidance for university selection", icon: <FaBookOpen /> },
  { title: "Visa Assistance", description: "Complete visa processing support", icon: <FaFileLines /> },
  { title: "Scholarship Guidance", description: "Maximize your financial aid opportunities", icon: <FaBriefcase /> },
  { title: "Test Preparation", description: "IELTS, SAT, GRE coaching referrals", icon: <FaUserGroup /> },
  { title: "Pre-Departure Briefing", description: "Prepare for your journey abroad", icon: <FaPlane /> },
  { title: "Post-Arrival Support", description: "Continuous support after arrival", icon: <FaLocationDot /> }
];

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

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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
    <div>
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

      {/* Trusted By Section */}
      <section className="trusted-by-section">
        <div className="trusted-by-badge">
          <span className="badge-dot" />
          <span>Trusted By Leading Universities</span>
        </div>
        <div className="marquee-container">
          <div className="marquee-track">
            {[...universities, ...universities].map((uni, index) => (
              <div key={index} className="university-logo-card">
                <FaGraduationCap className="uni-icon" />
                <span>{uni}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="how-it-works-header">
          <h2 className="how-it-works-title">How It Works</h2>
          <p className="how-it-works-subtitle">Get closer to your study abroad dreams in 4 simple steps.</p>
        </div>
        <div className="how-it-works-steps">
          <div className="how-it-works-step">
            <span className="step-watermark">01</span>
            <div className="step-icon-circle">
              <FaComments />
              <span className="step-badge-number">1</span>
            </div>
            <h3 className="step-title">Free Counselling</h3>
            <p className="step-description">Initial consultation</p>
          </div>
          <div className="how-it-works-step">
            <span className="step-watermark">02</span>
            <div className="step-icon-circle">
              <FaBuildingColumns />
              <span className="step-badge-number">2</span>
            </div>
            <h3 className="step-title">Choose University</h3>
            <p className="step-description">Select your dream school</p>
          </div>
          <div className="how-it-works-step">
            <span className="step-watermark">03</span>
            <div className="step-icon-circle">
              <FaFileSignature />
              <span className="step-badge-number">3</span>
            </div>
            <h3 className="step-title">Application</h3>
            <p className="step-description">Complete your application</p>
          </div>
          <div className="how-it-works-step">
            <span className="step-watermark">04</span>
            <div className="step-icon-circle">
              <FaPlaneDeparture />
              <span className="step-badge-number">4</span>
            </div>
            <h3 className="step-title">Visa & Depart</h3>
            <p className="step-description">Get visa and travel</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">5000+</div>
            <div className="stat-label">Students Placed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">50+</div>
            <div className="stat-label">Partner Universities</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">20+</div>
            <div className="stat-label">Countries</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">98%</div>
            <div className="stat-label">Visa Success Rate</div>
          </div>
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="destinations-section">
        <h2 className="destinations-title">Popular Destinations</h2>
        <div className="destinations-grid">
          {destinations.map((dest, index) => (
            <div 
              key={index} 
              className="destination-card"
              style={{ background: dest.gradient }}
            >
              <img src={dest.image} alt={dest.name} className="destination-image" />
              <div className="destination-content">
                <h3 className="destination-name">{dest.name}</h3>
                <p className="destination-unis">{dest.universities} Partner Universities</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Services Section */}
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

      {/* Success Stories Section */}
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

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to Study Abroad?</h2>
          <p className="cta-description">
            Get personalized guidance from our expert counselors. Your first consultation is completely free!
          </p>
          <button className="cta-button">
            Get Free Counselling Today
          </button>
        </div>
      </section>
    </div>
  );
}
