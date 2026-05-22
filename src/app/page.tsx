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




    </div>
  );
}
