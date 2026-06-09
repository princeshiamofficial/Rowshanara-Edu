"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    setErrorMessage('');
    setIsLoading(true);

    // Mock reset link send transition
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: "url('/sky_clouds_bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
        fontFamily: 'var(--font-sans), system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Dynamic Background Circles */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <svg
          width="2000"
          height="2000"
          viewBox="0 0 2000 2000"
          style={{
            position: 'absolute',
            opacity: 0.12,
            transform: 'scale(1)',
          }}
        >
          <circle cx="1000" cy="1000" r="220" fill="none" stroke="white" strokeWidth="1" />
          <circle cx="1000" cy="1000" r="380" fill="none" stroke="white" strokeWidth="1" />
          <circle cx="1000" cy="1000" r="580" fill="none" stroke="white" strokeWidth="1" />
          <circle cx="1000" cy="1000" r="820" fill="none" stroke="white" strokeWidth="1" />
          <circle cx="1000" cy="1000" r="1100" fill="none" stroke="white" strokeWidth="1" />
        </svg>
      </div>

      {/* Brand Header top-left */}
      <div
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          zIndex: 10,
        }}
      >
        <Link href="/" style={{ textDecoration: 'none' }}>
          <img
            src="/logo.png"
            alt="Rowshanara Edu"
            style={{
              height: '42px',
              width: 'auto',
              display: 'block',
            }}
          />
        </Link>
      </div>

      {/* Main Glassmorphic Card */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          width: '430px',
          maxWidth: '90%',
          backgroundColor: 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.45)',
          borderRadius: '32px',
          padding: '2.75rem 2.5rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Key Icon */}
        <div
          style={{
            width: '46px',
            height: '46px',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            borderRadius: '14px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.03)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem',
          }}
        >
          {/* Key SVG Icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 1.5 1.5M15.5 7.5 14 6" />
          </svg>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontSize: '1.4rem',
            fontWeight: 700,
            color: '#111827',
            marginBottom: '0.4rem',
            fontFamily: 'var(--font-sans), sans-serif',
            letterSpacing: '-0.01em',
          }}
        >
          Forgot Password
        </h1>

        {/* Subdescription */}
        <p
          style={{
            fontSize: '0.825rem',
            color: '#8b8e98',
            lineHeight: '1.45',
            maxWidth: '280px',
            marginBottom: '1.75rem',
            fontWeight: 400,
          }}
        >
          {isSent
            ? 'We have sent a reset link to your email address.'
            : 'Enter your email address to receive a password reset link.'}
        </p>

        {/* Error Message if any */}
        {errorMessage && (
          <div
            style={{
              width: '100%',
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.15)',
              borderRadius: '10px',
              padding: '0.6rem',
              color: '#dc2626',
              fontSize: '0.75rem',
              marginBottom: '1rem',
              textAlign: 'left',
              fontWeight: 500,
            }}
          >
            {errorMessage}
          </div>
        )}

        {isSent ? (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div
              style={{
                width: '100%',
                backgroundColor: 'rgba(34, 197, 94, 0.08)',
                border: '1px solid rgba(34, 197, 94, 0.15)',
                borderRadius: '12px',
                padding: '1rem',
                color: '#16a34a',
                fontSize: '0.8rem',
                fontWeight: 500,
                textAlign: 'center',
                lineHeight: '1.4',
              }}
            >
              Please check your inbox at <strong>{email}</strong> for instructions on how to reset your password.
            </div>
            
            <Link
              href="/admin"
              style={{
                width: '100%',
                height: '46px',
                backgroundColor: '#1f1e25',
                color: '#ffffff',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(31, 30, 37, 0.15)',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2f2e35')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1f1e25')}
            >
              Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Email Input Field */}
            <div
              style={{
                width: '100%',
                height: '46px',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 1rem',
                marginBottom: '1.25rem',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                transition: 'all 0.2s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.18)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.04)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.02)';
              }}
            >
              {/* Email Envelope SVG Icon */}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8b8e98" strokeWidth="2" style={{ marginRight: '0.75rem', flexShrink: 0 }}>
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.85rem',
                  color: '#1f2937',
                  fontFamily: 'var(--font-sans), sans-serif',
                }}
                required
              />
            </div>

            {/* Send Link Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                height: '46px',
                backgroundColor: '#1f1e25',
                color: '#ffffff',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '0.85rem',
                border: 'none',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 12px rgba(31, 30, 37, 0.15)',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-sans), sans-serif',
                marginBottom: '1.5rem',
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = '#2f2e35';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = '#1f1e25';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {isLoading ? 'Sending link...' : 'Send Reset Link'}
            </button>

            {/* Back to Sign In Link */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Link
                href="/admin"
                style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#111827')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')}
              >
                Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
