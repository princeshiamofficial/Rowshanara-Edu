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
    <footer className="premium-footer" role="contentinfo">
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
        
        {/* Modern Back to Top Arrow */}
        <a className="premium-back-to-top" href="#" id="btn-back-to-top" title="Back to Top">
          <i className="bi bi-arrow-up" style={{ fontSize: '1.25rem' }}></i>
        </a>

        <div className="premium-footer-grid">
          
          {/* Column 1: Brand & Contact */}
          <div className="premium-footer-col">
            <div style={{ marginBottom: '0.5rem' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Rowshanara Edu" style={{ height: '70px', filter: 'brightness(0) invert(1)' }} />
            </div>
            <p className="premium-footer-desc">
              Your gateway to global education. Empowering minds, shaping successful futures by connecting students with top-tier universities worldwide.
            </p>
            <ul className="premium-footer-contact-list">
              <li className="premium-footer-contact-item">
                <i className="bi bi-telephone-fill"></i>
                <span>+880 1511-710730</span>
              </li>
              <li className="premium-footer-contact-item">
                <i className="bi bi-geo-alt-fill"></i>
                <span>60, Dilkusha, Motijheel C/A, Dhaka-1000, Bangladesh</span>
              </li>
              <li className="premium-footer-contact-item">
                <i className="bi bi-envelope-fill"></i>
                <span>info@rowshanaraedu.com</span>
              </li>
            </ul>
            <div className="premium-footer-socials">
              {['facebook', 'twitter-x', 'linkedin', 'youtube', 'wechat'].map((icon) => (
                <a key={icon} className="premium-footer-social-icon" href="#">
                  <i className={`bi bi-${icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="premium-footer-col">
            <h4 className="premium-footer-title">Quick Links</h4>
            <ul className="premium-footer-links-list">
              <li><a className="premium-footer-link" href="/about">About Us</a></li>
              <li><a className="premium-footer-link" href="/services">Our Services</a></li>
              <li><a className="premium-footer-link" href="/universities">Universities</a></li>
              <li><a className="premium-footer-link" href="/contact">Contact Us</a></li>
              <li><a className="premium-footer-link" href="/apply">Apply Now</a></li>
              <li><a className="premium-footer-link" href="/faq">FAQ</a></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="premium-footer-col">
            <h4 className="premium-footer-title">Our Services</h4>
            <ul className="premium-footer-links-list">
              <li><a className="premium-footer-link" href="/services">Admission Counselling</a></li>
              <li><a className="premium-footer-link" href="/services">Visa Assistance</a></li>
              <li><a className="premium-footer-link" href="/services">Scholarship Guidance</a></li>
              <li><a className="premium-footer-link" href="/services">Test Preparation</a></li>
              <li><a className="premium-footer-link" href="/services">Pre-Departure Briefing</a></li>
              <li><a className="premium-footer-link" href="/services">Post-Arrival Support</a></li>
            </ul>
          </div>

          {/* Column 4: Partner Logos */}
          <div className="premium-footer-col">
            <h4 className="premium-footer-title">Accreditations</h4>
            <div className="premium-footer-partner-grid">
              
              <div className="premium-footer-partner-box">
                <div className="premium-footer-partner-label">Official Accreditation</div>
                <div className="premium-footer-partner-logos">
                  <a href="#">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/icef_logo.svg" alt="ICEF" />
                  </a>
                  <a href="#">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/facdcab_logo.svg" alt="FACDCAB" />
                  </a>
                </div>
              </div>

              <div className="premium-footer-partner-box">
                <div className="premium-footer-partner-label">Global Memberships</div>
                <div className="premium-footer-partner-logos">
                  <a href="#">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/nafsa_logo.svg" alt="NAFSA" style={{ filter: 'brightness(0) invert(1) grayscale(1) opacity(0.85)' }} />
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Sub-footer Section */}
        <div className="premium-footer-divider"></div>
        <div className="premium-footer-bottom">
          <span>&copy; {new Date().getFullYear()} Rowshanara Edu. All Rights Reserved.</span>
          <div className="premium-footer-bottom-links">
            <a className="premium-footer-bottom-link" href="/privacy-policy">Privacy Policy</a>
            <a className="premium-footer-bottom-link" href="/terms">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
