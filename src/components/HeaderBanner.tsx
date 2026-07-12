"use client";

import React from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface HeaderBannerProps {
  title: string;
  subtitle: string;
  breadcrumbs?: BreadcrumbItem[];
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export default function HeaderBanner({ title, subtitle, breadcrumbs, children, style }: HeaderBannerProps) {
  return (
    <section className="header-banner-section" style={{
      width: "95%",
      maxWidth: "1280px",
      margin: "0 auto 0 auto",
      background: "linear-gradient(135deg, rgba(10, 28, 58, 0.88) 0%, rgba(6, 17, 36, 0.94) 100%), url('/hero-bg.png') no-repeat center center",
      backgroundSize: "cover",
      padding: children ? "1.75rem 1rem" : "0.875rem 1rem",
      borderRadius: "28px",
      textAlign: "center",
      color: "white",
      boxShadow: "0 15px 35px rgba(0, 0, 0, 0.15)",
      position: "relative",
      overflow: "hidden",
      ...style
    }}>
      <div className="container">
        <h1 className="hero-responsive-title" style={{
          fontSize: "clamp(2.25rem, 5vw, 3.25rem)",
          fontWeight: 800,
          marginBottom: children ? "0.75rem" : "0.25rem",
          color: "white",
          fontFamily: "'Baloo 2', cursive",
          lineHeight: 1.2
        }}>
          {title}
        </h1>
        <p style={{
          fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
          color: "rgba(255, 255, 255, 0.85)",
          maxWidth: "750px",
          margin: children ? "0 auto 1.75rem auto" : "0 auto 0.75rem auto",
          lineHeight: 1.6,
          fontFamily: "'Comic Neue', cursive"
        }}>
          {subtitle}
        </p>

        {breadcrumbs && (
          <div className="hide-mobile" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.95rem",
            fontWeight: 700,
            color: "rgba(255, 255, 255, 0.6)",
            marginBottom: children ? "1.5rem" : 0
          }}>
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              if (isLast) {
                return <span key={idx} style={{ color: "white" }}>{crumb.label}</span>;
              }
              return (
                <React.Fragment key={idx}>
                  <a href={crumb.href || "/"} style={{ 
                    color: "rgba(255, 255, 255, 0.6)", 
                    textDecoration: "none", 
                    transition: "color 0.2s" 
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = "var(--primary)"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)"}>
                    {crumb.label}
                  </a>
                  <span>/</span>
                </React.Fragment>
              );
            })}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}
