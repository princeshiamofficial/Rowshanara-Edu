"use client";

import React from "react";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaYoutube, FaWeixin } from "react-icons/fa6";

export default function SocialBar() {
  return (
    <section className="container" style={{ marginTop: "4rem" }}>
      <div style={{
        background: "black",
        borderRadius: "20px",
        padding: "1.25rem 2.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        flexWrap: "wrap",
        gap: "1.5rem"
      }}>
        <span style={{
          fontSize: "1.15rem",
          fontWeight: 700,
          color: "white",
          opacity: 0.95,
          fontFamily: "'Comic Neue', cursive"
        }}>
          Follow us on social media
        </span>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {/* Facebook */}
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(10, 28, 58, 0.08)",
            transition: "all 0.2s",
            textDecoration: "none"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.background = "#f8f9fa";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.background = "white";
          }}>
            <FaFacebookF style={{ color: "#1877f2", fontSize: "0.95rem" }} />
          </a>

          {/* Twitter-X */}
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(10, 28, 58, 0.08)",
            transition: "all 0.2s",
            textDecoration: "none"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.background = "#f8f9fa";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.background = "white";
          }}>
            <FaXTwitter style={{ color: "#0f1419", fontSize: "0.95rem" }} />
          </a>

          {/* LinkedIn */}
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(10, 28, 58, 0.08)",
            transition: "all 0.2s",
            textDecoration: "none"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.background = "#f8f9fa";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.background = "white";
          }}>
            <FaLinkedinIn style={{ color: "#0a66c2", fontSize: "0.95rem" }} />
          </a>

          {/* YouTube */}
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(10, 28, 58, 0.08)",
            transition: "all 0.2s",
            textDecoration: "none"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.background = "#f8f9fa";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.background = "white";
          }}>
            <FaYoutube style={{ color: "#ff0000", fontSize: "0.95rem" }} />
          </a>

          {/* WeChat */}
          <a href="#" target="_blank" rel="noopener noreferrer" style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(10, 28, 58, 0.08)",
            transition: "all 0.2s",
            textDecoration: "none"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.background = "#f8f9fa";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.background = "white";
          }}>
            <FaWeixin style={{ color: "#07c160", fontSize: "1rem" }} />
          </a>
        </div>
      </div>
    </section>
  );
}
