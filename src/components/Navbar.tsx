"use client";

import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky-navbar" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 2000,
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '1.5rem'
    }}>
      <div className="navbar-floating-content" style={{
        width: '95%',
        maxWidth: '1280px',
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(16px)',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(224, 145, 0, 0.1)',
        border: '1px solid rgba(224, 145, 0, 0.15)',
        transition: 'all 0.3s ease'
      }}>
        {/* Top Bar (Integrated) - Responsive wrap */}
        <div className="top-bar-responsive" style={{ 
          background: '#E09100', 
          padding: '0.5rem 2rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          color: 'white',
          fontSize: '0.9rem',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <img src="https://flagcdn.com/w20/bd.png" alt="BD Flag" width="20" style={{ borderRadius: '2px' }} />
              <a href="tel:+8801511710730" style={{ fontWeight: 600, color: 'white' }}>+880 1511-710730</a>
            </div>
            <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className="bi bi-envelope" style={{ color: 'white' }}></i>
              <a href="mailto:info@rowshanaraedu.com" style={{ fontWeight: 600, color: 'white' }}>info@rowshanaraedu.com</a>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div className="hide-mobile" style={{ display: 'flex', gap: '0.75rem', color: 'white' }}>
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
            <div className="hide-mobile" style={{ height: '1rem', width: '1px', background: 'rgba(255,255,255,0.3)' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', color: 'white' }}>
              <img src="https://flagcdn.com/w20/us.png" alt="US" width="16" />
              <span>EN</span>
              <i className="bi bi-chevron-down" style={{ fontSize: '0.75rem' }}></i>
            </div>
          </div>
        </div>
 
        {/* Main Navigation */}
        <nav style={{ padding: '0.75rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <a href="/">
              <img 
                src="/logo.png" 
                alt="Rowshanara Edu" 
                style={{ 
                  height: '45px', 
                  width: 'auto',
                  display: 'block'
                }} 
              />
            </a>
          </div>
 
          {/* Desktop Navigation Links */}
          <div className="desktop-nav-links" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href="/" 
               style={{ fontWeight: 700, color: '#E09100', display: 'flex', alignItems: 'center', gap: '0.25rem', transition: 'color 0.2s' }}>
              Home <i className="bi bi-chevron-down" style={{ fontSize: '0.75rem' }}></i>
            </a>
            <a href="/services" 
               style={{ fontWeight: 700, color: '#4a3700', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '0.25rem', transition: 'all 0.2s' }}
               onMouseEnter={e => { e.currentTarget.style.color = '#E09100'; e.currentTarget.style.opacity = '1'; }}
               onMouseLeave={e => { e.currentTarget.style.color = '#4a3700'; e.currentTarget.style.opacity = '0.8'; }}>
              Services <i className="bi bi-chevron-down" style={{ fontSize: '0.75rem' }}></i>
            </a>
            <a href="/destination" 
               style={{ fontWeight: 700, color: '#4a3700', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '0.25rem', transition: 'all 0.2s' }}
               onMouseEnter={e => { e.currentTarget.style.color = '#E09100'; e.currentTarget.style.opacity = '1'; }}
               onMouseLeave={e => { e.currentTarget.style.color = '#4a3700'; e.currentTarget.style.opacity = '0.8'; }}>
              Destination <i className="bi bi-chevron-down" style={{ fontSize: '0.75rem' }}></i>
            </a>
            <a href="/universities" 
               style={{ fontWeight: 700, color: '#4a3700', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '0.25rem', transition: 'all 0.2s' }}
               onMouseEnter={e => { e.currentTarget.style.color = '#E09100'; e.currentTarget.style.opacity = '1'; }}
               onMouseLeave={e => { e.currentTarget.style.color = '#4a3700'; e.currentTarget.style.opacity = '0.8'; }}>
              Universities <i className="bi bi-chevron-down" style={{ fontSize: '0.75rem' }}></i>
            </a>
            <a href="/about" 
               style={{ fontWeight: 700, color: '#4a3700', opacity: 0.8, transition: 'all 0.2s' }}
               onMouseEnter={e => { e.currentTarget.style.color = '#E09100'; e.currentTarget.style.opacity = '1'; }}
               onMouseLeave={e => { e.currentTarget.style.color = '#4a3700'; e.currentTarget.style.opacity = '0.8'; }}>
              About Us
            </a>
            <a href="/contact" 
               style={{ fontWeight: 700, color: '#4a3700', opacity: 0.8, transition: 'all 0.2s' }}
               onMouseEnter={e => { e.currentTarget.style.color = '#E09100'; e.currentTarget.style.opacity = '1'; }}
               onMouseLeave={e => { e.currentTarget.style.color = '#4a3700'; e.currentTarget.style.opacity = '0.8'; }}>
              Contact Us
            </a>
          </div>
 
          {/* Desktop Consultation Button */}
          <div className="desktop-nav-btn" style={{ display: 'flex', alignItems: 'center' }}>
            <a href="/contact" style={{ 
              background: 'var(--cta)', 
              color: 'white', 
              padding: '0.6rem 1.4rem', 
              borderRadius: '14px',
              fontWeight: 700,
              fontSize: '0.875rem',
              letterSpacing: '0.05em',
              boxShadow: '0 8px 20px rgba(34, 197, 94, 0.3)',
              transition: 'all 0.3s ease',
              textAlign: 'center'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              Book Free Consultation
            </a>
          </div>

          {/* Hamburger Menu Toggle Icon */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              fontSize: '1.75rem',
              color: 'var(--text)',
              cursor: 'pointer'
            }}
            aria-label="Toggle navigation menu"
          >
            <i className={`bi bi-${isOpen ? 'x' : 'list'}`}></i>
          </button>
        </nav>

        {/* Mobile Dropdown Panel */}
        {isOpen && (
          <div className="mobile-dropdown-menu" style={{
            background: 'white',
            borderTop: '1px solid rgba(224, 145, 0, 0.1)',
            padding: '1.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
          }}>
            <a href="/" onClick={() => setIsOpen(false)} style={{ fontWeight: 700, color: '#E09100', fontSize: '1.1rem' }}>Home</a>
            <a href="/services" onClick={() => setIsOpen(false)} style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1.1rem' }}>Services</a>
            <a href="/destination" onClick={() => setIsOpen(false)} style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1.1rem' }}>Destination</a>
            <a href="/universities" onClick={() => setIsOpen(false)} style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1.1rem' }}>Universities</a>
            <a href="/about" onClick={() => setIsOpen(false)} style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1.1rem' }}>About Us</a>
            <a href="/contact" onClick={() => setIsOpen(false)} style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1.1rem' }}>Contact Us</a>
            
            <a href="/contact" onClick={() => setIsOpen(false)} style={{ 
              background: 'var(--cta)', 
              color: 'white', 
              padding: '0.8rem 1.5rem', 
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '1rem',
              textAlign: 'center',
              marginTop: '0.5rem',
              boxShadow: '0 8px 20px rgba(34, 197, 94, 0.3)'
            }}>
              Book Free Consultation
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
