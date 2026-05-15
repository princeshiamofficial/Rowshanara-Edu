"use client";

import React from 'react';

const Navbar = () => {
  return (
    <div className="sticky-navbar">
      <div className="navbar-floating-content">
        {/* Top Bar (Integrated) */}
        <div style={{ 
          background: '#E09100', 
          padding: '0.5rem 2rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          color: 'white',
          fontSize: '1rem'
        }}>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <img src="https://flagcdn.com/w20/bd.png" alt="BD Flag" width="20" style={{ borderRadius: '2px' }} />
              <a href="tel:+8801511710730" style={{ fontWeight: 600, color: 'white' }}>+880 1511-710730</a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className="bi bi-envelope" style={{ color: 'white' }}></i>
              <a href="mailto:info@rowshanaraedu.com" style={{ fontWeight: 600, color: 'white' }}>info@rowshanaraedu.com</a>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', color: 'white' }}>
              {['facebook', 'twitter-x', 'linkedin', 'youtube', 'wechat'].map((icon) => (
                <a key={icon} href="#" style={{ 
                  width: '22px', 
                  height: '22px', 
                  background: 'white', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#E09100',
                  fontSize: '0.75rem',
                  textDecoration: 'none',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                  <i className={`bi bi-${icon}`}></i>
                </a>
              ))}
            </div>
            <div style={{ height: '1rem', width: '1px', background: 'rgba(255,255,255,0.3)' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', color: 'white' }}>
              <img src="https://flagcdn.com/w20/us.png" alt="US" width="16" />
              <span>EN</span>
              <i className="bi bi-chevron-down" style={{ fontSize: '0.75rem' }}></i>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav style={{ padding: '0.75rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <a href="/">
              <img 
                src="/logo.png" 
                alt="Rowshanara Edu" 
                style={{ 
                  height: '50px', 
                  width: 'auto',
                  display: 'block'
                }} 
              />
            </a>
          </div>

          <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
            <a href="#" style={{ fontWeight: 700, color: '#E09100', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Home <i className="bi bi-chevron-down" style={{ fontSize: '0.75rem' }}></i></a>
            <a href="#" style={{ fontWeight: 700, color: '#4a3700', opacity: 0.8 }}>Courses</a>
            <a href="#" style={{ fontWeight: 700, color: '#4a3700', opacity: 0.8 }}>About</a>
            <a href="#" style={{ fontWeight: 700, color: '#4a3700', opacity: 0.8 }}>Blog</a>
            <a href="#" style={{ fontWeight: 700, color: '#4a3700', opacity: 0.8 }}>Contact</a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button style={{ 
              background: 'var(--cta)', 
              color: 'white', 
              padding: '0.6rem 1.4rem', 
              borderRadius: '14px',
              fontWeight: 700,
              fontSize: '0.875rem',
              letterSpacing: '0.05em',
              boxShadow: '0 8px 20px rgba(34, 197, 94, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              Book Free Consultation
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
