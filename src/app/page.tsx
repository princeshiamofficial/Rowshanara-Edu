"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="hero-gradient">
      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        minHeight: '85vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'url(/hero-bg.png) no-repeat center center',
        backgroundSize: 'cover',
        overflow: 'hidden'
      }}>
        {/* Dark Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.65)',
          zIndex: 1
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: 'white' }}>
          <div className="animate-fade-in">
            <span style={{ 
              color: 'var(--cta)', 
              fontWeight: 800, 
              letterSpacing: '0.2em', 
              fontSize: '0.875rem', 
              marginBottom: '1.5rem',
              display: 'block',
              textTransform: 'uppercase'
            }}>
              Learn the latest skill
            </span>
            <h1 style={{ 
              fontSize: '4.5rem', 
              marginBottom: '2rem', 
              lineHeight: 1.1,
              fontWeight: 800,
              maxWidth: '900px',
              margin: '0 auto 2rem auto'
            }}>
              Build Skills With <br /> Courses Flexible Online
            </h1>
            <p style={{ 
              fontSize: '1.25rem', 
              opacity: 0.8, 
              marginBottom: '3rem', 
              maxWidth: '700px', 
              margin: '0 auto 3rem auto',
              lineHeight: 1.6
            }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button className="btn" style={{ 
                background: 'var(--primary)', 
                color: 'white', 
                padding: '1.25rem 3rem', 
                borderRadius: '9999px',
                fontSize: '1.125rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 25px -5px rgba(0, 138, 61, 0.4)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 15px 30px -5px rgba(0, 138, 61, 0.5)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 138, 61, 0.4)';
              }}>
                Get Courses
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Arrows */}
        <button style={{
          position: 'absolute',
          left: '3rem',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '4rem',
          height: '4rem',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.3)',
          background: 'rgba(255,255,255,0.05)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 3,
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
          <i className="bi bi-chevron-left" style={{ fontSize: '1.5rem' }}></i>
        </button>
        <button style={{
          position: 'absolute',
          right: '3rem',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '4rem',
          height: '4rem',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.3)',
          background: 'rgba(255,255,255,0.05)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 3,
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
          <i className="bi bi-chevron-right" style={{ fontSize: '1.5rem' }}></i>
        </button>
      </section>

      {/* Features Section */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Why Choose Rowshanara Edu?</h2>
            <p style={{ color: 'var(--muted)', maxWidth: '600px', margin: '0 auto' }}>
              We combine cutting-edge technology with expert pedagogical approaches to deliver an unparalleled learning experience.
            </p>
          </div>
          <div className="grid grid-3">
            {[
              { title: "Expert Mentors", desc: "Learn from industry professionals with years of real-world experience.", icon: "🎓" },
              { title: "Flexible Learning", desc: "Study at your own pace with lifetime access to all course materials.", icon: "🕒" },
              { title: "Career Support", desc: "Get personalized guidance to help you land your dream job.", icon: "🚀" }
            ].map((feature, i) => (
              <div key={i} className="glass" style={{ 
                padding: '2.5rem', 
                borderRadius: '2rem',
                transition: 'transform 0.3s ease',
                cursor: 'default'
              }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'}
                 onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ 
                  fontSize: '2.5rem', 
                  marginBottom: '1.5rem',
                  background: 'rgba(79, 70, 229, 0.05)',
                  width: '64px',
                  height: '64px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '1rem'
                }}>{feature.icon}</div>
                <h3 style={{ marginBottom: '1rem' }}>{feature.title}</h3>
                <p style={{ color: 'var(--muted)' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section">
        <div className="container">
          <div className="glass-dark" style={{ 
            padding: '4rem', 
            borderRadius: '3rem', 
            textAlign: 'center',
            color: 'white'
          }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Ready to Start Your Journey?</h2>
            <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', opacity: 0.8, maxWidth: '700px', margin: '0 auto 2.5rem auto' }}>
              Join Rowshanara Edu today and gain access to premium courses, expert mentorship, and a global community of learners.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-secondary" style={{ padding: '1rem 2.5rem' }}>Join Now</button>
              <button className="btn btn-outline" style={{ border: '2px solid white', color: 'white' }}>View Courses</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
