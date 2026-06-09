"use client";

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams ? searchParams.get('token') : null;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }
    setErrorMessage('');
    setIsLoading(true);

    // Mock reset action transition
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  const hasToken = !!token;

  return (
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
      {/* Shield/Alert Icon */}
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
        {hasToken ? (
          /* Shield SVG Icon */
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        ) : (
          /* Warning/Alert SVG Icon */
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        )}
      </div>

      {/* Heading */}
      <h1
        style={{
          fontSize: '1.3rem',
          fontWeight: 700,
          color: hasToken ? '#111827' : '#dc2626',
          marginBottom: '0.4rem',
          fontFamily: 'var(--font-sans), sans-serif',
          letterSpacing: '-0.01em',
        }}
      >
        {hasToken ? 'Reset Password' : 'Link Expired or Invalid'}
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
        {isSuccess
          ? 'Your password has been reset successfully.'
          : hasToken
          ? 'Create a new secure password for your administrative account.'
          : 'The password reset token is missing, invalid, or expired.'}
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

      {isSuccess ? (
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
            Your administrative account password has been updated. You can now use your new password to sign in.
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
      ) : hasToken ? (
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* New Password Input Field */}
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
            {/* Lock SVG Icon */}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8b8e98" strokeWidth="2" style={{ marginRight: '0.75rem', flexShrink: 0 }}>
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="New Password"
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

          {/* Confirm Password Input Field */}
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
            {/* Lock SVG Icon */}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8b8e98" strokeWidth="2" style={{ marginRight: '0.75rem', flexShrink: 0 }}>
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              {showConfirmPassword ? (
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
                    setShowConfirmPassword(false);
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
                    setShowConfirmPassword(true);
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

          {/* Reset Button */}
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
            {isLoading ? 'Resetting password...' : 'Reset Password'}
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
      ) : (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div
            style={{
              width: '100%',
              backgroundColor: 'rgba(220, 38, 38, 0.08)',
              border: '1px solid rgba(220, 38, 38, 0.15)',
              borderRadius: '12px',
              padding: '1rem',
              color: '#dc2626',
              fontSize: '0.8rem',
              fontWeight: 500,
              textAlign: 'center',
              lineHeight: '1.45',
            }}
          >
            This password reset link is invalid or has expired. Please request a new link.
          </div>
          
          <Link
            href="/admin/forgot-password"
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
            Request New Link
          </Link>
        </div>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: "url('/sky_clouds_bg2.gif')",
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

      {/* Suspense Wrapper to parse searchParams */}
      <Suspense fallback={
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
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#8b8e98',
            fontSize: '0.85rem',
          }}
        >
          Loading portal...
        </div>
      }>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
