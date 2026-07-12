"use client";

import React from 'react';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const brandColor = '#E09100';
  const pathname = usePathname() || '';

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer role="contentinfo" style={{ 
      background: '#000', 
      color: '#fff', 
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* 1. Social Banner (Top Layer) */}
      <div style={{ 
        padding: '5rem 0 2.5rem 0' 
      }}>
        <div className="container" style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: '26px', // Matched ANU spacing exactly
          padding: '0 2rem',
          position: 'relative',
          top: '-2.5rem' // Lifted icons further above the line
        }}>
          {['facebook', 'twitter-x', 'linkedin', 'youtube', 'wechat'].map((icon) => (
            <a key={icon} href="#" style={{ 
              width: '32px', 
              height: '32px', 
              background: brandColor, 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#000',
              fontSize: '1rem',
              textDecoration: 'none'
            }}>
              <i className={`bi bi-${icon}`}></i>
            </a>
          ))}
        </div>
      </div>

      {/* 2. Middle & Bottom Layer Container */}
      <div style={{ padding: '1rem 0 3rem 0', position: 'relative' }}>
        <div className="container" style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 2rem',
          position: 'relative'
        }}>

          {/* Back to top arrow with Contact Us text */}
          <div style={{
            position: 'absolute', 
            top: '-5.1rem', // Centered with line
            right: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            zIndex: 20
          }}>
            <span style={{ color: '#fff', fontSize: '1rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Follow Us</span>
            <a id="btn-back-to-top" href="#" style={{ 
              background: brandColor, 
              width: '44px', 
              height: '44px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              textDecoration: 'none',
              color: '#000',
              fontSize: '1.25rem'
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://d1blp3aor2iuhp.cloudfront.net/images/icons/icon-arrow-up-solid.svg" alt="Arrow Up" style={{ width: '16px' }} />
            </a>
          </div>

          {/* Vertical Gold Line Accent (Above Logo) */}
          <div style={{ 
            position: 'absolute', 
            left: '3rem', 
            top: '-4rem', 
            height: '80px', 
            width: '2px', // Increased thickness
            background: brandColor,
            opacity: 0.6,
            zIndex: 1
          }}></div>

          {/* Vertical Gold Line Accent (Below Logo) */}
          <div style={{ 
            position: 'absolute', 
            left: '3rem', 
            top: '80px', 
            bottom: '42px', 
            width: '2px', // Increased thickness
            background: brandColor,
            opacity: 0.6,
            zIndex: 1
          }}></div>

          <div className="footer-content-wrapper" style={{ position: 'relative', zIndex: 2 }}> {/* Higher z-index for content */}
            {/* Top Divider (Line 1 - Matched with Line 2) */}
            {/* Top Divider (Line 1 - Matched with Line 2) */}
            <div style={{ 
              borderTop: '1px solid rgba(255, 255, 255, 0.8)', 
              position: 'relative', 
              top: '-4.0rem', // Adjusted up by another 2px
              width: 'calc(100% + 1.5rem - 180px)', // Shortened to avoid text and arrow
              marginLeft: '-1.5rem',
              zIndex: 5
            }}></div>
            
            {/* Logo and Address */}
            <div className="footer-logo-partners-row">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div className="footer-logo-container">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo.png" alt="Logo" style={{ height: '75px', filter: 'brightness(0) invert(1)' }} />
                </div>
                <div style={{ fontSize: '0.9375rem', fontWeight: 500, color: '#fff' }}>
                  <span>+880 1511-710730</span>
                  <span className="footer-pipe" style={{ margin: '0 0.5rem' }}>|</span>
                  <span>60, Dilkusha, Motijheel C/A, Dhaka-1000, Bangladesh</span>
                </div>
              </div>
            </div>

            {/* Acknowledgement Text */}
            <div style={{ display: 'none', marginBottom: '1.5rem', maxWidth: '850px' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.25rem', fontWeight: 600 }}>Acknowledgement of Country</h3>
              <p style={{ 
                fontSize: '1.0625rem', 
                lineHeight: '1.2', 
                opacity: 0.95
              }}>
                The Australian National University acknowledges, celebrates and pays our respects to the Ngunnawal and Ngambri people of the Canberra region and to all First Nations Australians on whose traditional lands we meet and work, and whose cultures are among the oldest continuing cultures in human history.
              </p>
            </div>

            {/* Sub-footer Divider Line */}
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.8)', marginBottom: '1.25rem', marginLeft: '-1.5rem', width: 'calc(100% + 1.5rem)' }}></div>

            {/* Bottom Metadata & Legal Links */}
            <div>
              <div className="footer-links-container" style={{ 
                display: 'none', 
                gap: '0.5rem 1.25rem', 
                flexWrap: 'wrap', 
                marginBottom: '1.25rem', 
                fontSize: '0.9375rem',
                fontWeight: 500
              }}>
                <a href="/contact" style={{ textDecoration: 'none', color: '#fff' }}>Contact Us</a>
                <span className="footer-pipe">|</span>
                <a href="#" style={{ textDecoration: 'none', color: '#fff' }}>Copyright</a>
                <span className="footer-pipe">|</span>
                <a href="#" style={{ textDecoration: 'none', color: '#fff' }}>Disclaimer</a>
                <span className="footer-pipe">|</span>
                <a href="#" style={{ textDecoration: 'none', color: '#fff' }}>Privacy</a>
                <span className="footer-pipe">|</span>
                <a href="#" style={{ textDecoration: 'none', color: '#fff' }}>Freedom of Information</a>
                <span className="footer-pipe">|</span>
                <a href="#" style={{ textDecoration: 'none', color: '#fff' }}>Accessibility</a>
              </div>
              
              {/* Partner Logos moved here */}
              <div className="footer-partners-container" style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <a href="#"><img src="/icef_logo.svg" alt="ICEF" style={{ height: '40px', width: 'auto' }} /></a>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <a href="#"><img src="/facdcab_logo.svg" alt="FACDCAB" style={{ height: '40px', width: 'auto' }} /></a>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <a href="#"><img src="/nafsa_logo.svg" alt="NAFSA" style={{ height: '45px', width: 'auto', filter: 'brightness(0) invert(1)' }} /></a>
              </div>

              {/* Added bottom divider */}
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.8)', marginBottom: '1.25rem', marginLeft: '-1.5rem', width: 'calc(100% + 1.5rem)' }}></div>

              {/* Copyright and Privacy Policy */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8125rem', fontWeight: 400, color: '#fff', opacity: 0.8 }}>
                <span>&copy; {new Date().getFullYear()} Rowshanara Edu. All Rights Reserved.</span>
                <a href="/privacy-policy" style={{ textDecoration: 'none', color: '#fff' }}>Privacy Policy</a>
              </div>

              <div className="footer-meta-line" style={{ display: 'none', fontSize: '0.9375rem', fontWeight: 500, opacity: 1 }}>
                <span>TEQSA Provider ID: PRV12002 (Australian University)</span>
                <span className="footer-pipe">|</span>
                <span>CRICOS Provider Code: 00120C</span>
                <span className="footer-pipe">|</span>
                <span>ABN: 52 234 063 906</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
