"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    setErrorMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        if (data.data) {
          localStorage.setItem('admin_permissions', JSON.stringify(data.data.permissions));
          localStorage.setItem('admin_role', data.data.role);
          localStorage.setItem('admin_user', JSON.stringify({ id: data.data.userId, email: data.data.email, name: data.data.name, role: data.data.role, roleName: data.data.roleName }));
        }
        router.push('/admin/dashboard');
      } else {
        setErrorMessage(data.message || 'Invalid credentials');
        setIsLoading(false);
      }
    } catch (err) {
      setErrorMessage('An error occurred during login');
      setIsLoading(false);
    }
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
          <Image
            src="/logo.png"
            alt="Rowshanara Edu"
            width={120}
            height={42}
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
                height: '32px',
                background: '#f3f4f6',
                border: 'none',
                outline: 'none',
                fontSize: '0.85rem',
                color: '#1f2937',
                fontFamily: 'var(--font-sans), sans-serif',
                borderRadius: '6px',
                padding: '2px 4px',
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
              marginBottom: '1.25rem',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
              transition: 'all 0.2s ease',
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
                height: '32px',
                background: '#f3f4f6',
                border: 'none',
                outline: 'none',
                fontSize: '0.85rem',
                color: '#1f2937',
                fontFamily: 'var(--font-sans), sans-serif',
                borderRadius: '6px',
                padding: '2px 4px',
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

          {/* Submit Button */}
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
          >
            {isLoading ? 'Signing in...' : 'Get Started'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem' }}>
          <Link href="/" style={{ fontSize: '12px', color: '#0891B2', textDecoration: 'none', fontWeight: 600 }}>
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
