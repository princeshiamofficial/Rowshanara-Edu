"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    setErrorMessage('');
    setIsLoading(true);

    // Mock authentication transition
    setTimeout(() => {
      setIsLoading(false);
      router.push('/admin/dashboard');
    }, 1200);
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

      {/* Main Glassmorphic Login Card */}
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
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Entry Icon */}
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
          {/* ->] Arrow right to bracket icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" y1="12" x2="3" y2="12" />
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
          Admin Sign In
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
          Manage courses, applications, and settings.
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

        {/* Form Container */}
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
              marginBottom: '0.75rem',
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
              type="text"
              placeholder="Username or Email"
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

          {/* Password Input Field */}
          <div
            style={{
              width: '100%',
              height: '46px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              padding: '0 1rem',
              marginBottom: '0.4rem',
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
            {/* Lock SVG Icon */}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8b8e98" strokeWidth="2" style={{ marginRight: '0.75rem', flexShrink: 0 }}>
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {/* Eye Hide/Show SVG Icon */}
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', flexShrink: 0 }}>
              {showPassword ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8b8e98"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPassword(false);
                  }}
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8b8e98"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPassword(true);
                  }}
                >
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                  <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                  <line x1="2" y1="22" x2="22" y2="2" />
                </svg>
              )}
            </div>
          </div>

          {/* Forgot Password Link */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.25rem' }}>
            <Link
              href="/admin/forgot-password"
              style={{
                fontSize: '11px',
                color: '#6b7280',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#111827')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')}
            >
              Forgot password?
            </Link>
          </div>

          {/* Get Started Button */}
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
            {isLoading ? 'Signing in...' : 'Get Started'}
          </button>
        </form>

        {/* Divider separator */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '1.5rem 0',
          }}
        >
          <div style={{ flexGrow: 1, height: '1px', borderTop: '1px dashed #e5e7eb' }}></div>
          <span
            style={{
              fontSize: '11px',
              color: '#9ca3af',
              padding: '0 0.75rem',
              textTransform: 'none',
              fontWeight: 400,
            }}
          >
            Or sign in with
          </span>
          <div style={{ flexGrow: 1, height: '1px', borderTop: '1px dashed #e5e7eb' }}></div>
        </div>

        {/* Social Buttons Container */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '0.75rem',
          }}
        >
          {/* Google Button */}
          <button
            type="button"
            style={{
              flexGrow: 1,
              height: '42px',
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.02)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            onClick={() => alert('Sign in with Google clicked')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
          </button>

          {/* Facebook Button */}
          <button
            type="button"
            style={{
              flexGrow: 1,
              height: '42px',
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.02)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            onClick={() => alert('Sign in with Facebook clicked')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </button>

          {/* Apple Button */}
          <button
            type="button"
            style={{
              flexGrow: 1,
              height: '42px',
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.02)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            onClick={() => alert('Sign in with Apple clicked')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#000000">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.51-.64.74-1.2 1.88-1.05 2.99 1.11.09 2.24-.55 3-1.44z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
