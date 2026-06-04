"use client";

import React, { useState } from "react";
import { FaMagnifyingGlass, FaChevronDown } from 'react-icons/fa6';

const faqs = [
  {
    q: "What is the typical timeline for the entire process?",
    a: "The entire process from initial consultation to visa approval typically takes between 3 to 6 months, depending on the country, course intake, and university processing times. We recommend starting your application at least 6-8 months before your desired intake date."
  },
  {
    q: "How much does your counselling service cost?",
    a: "Our initial profile assessment and university admission counselling services are completely free. For specialized test preparations, NAATI CCL classes, and document processing assistance, minor administration fees may apply depending on the program selected."
  },
  {
    q: "Do you guarantee university admission?",
    a: "While we do not guarantee admission, we maintain a 98% admission success rate. Our counselors carefully evaluate your academic profile and match you with universities where you meet all entry requirements, significantly maximizing your acceptance probability."
  },
  {
    q: "Can you help with part-time work opportunities?",
    a: "Yes, during our pre-departure and post-arrival orientations, we guide you on student work rights, local employment regulations, CV writing matching international standards, and top platforms to secure part-time jobs in your study destination."
  },
  {
    q: "What if my visa application is rejected?",
    a: "In the rare event of a visa refusal, our compliance team reviews the rejection letter, addresses the specific concerns raised by immigration officers, updates your financial and SOP documentation, and assists you in filing a strong re-application or appeal."
  },
  {
    q: "Do you offer support for postgraduate studies?",
    a: "Absolutely! We offer comprehensive advisory services for Masters, MBA, and PhD programs, including research proposal guidance, supervisor communication support, statement of purpose (SOP) reviews, and postgraduate scholarship opportunities."
  },
  {
    q: "How do I stay in touch after I depart?",
    a: "We offer dedicated post-arrival student support, and our team remains reachable via our WhatsApp support hotline. We also help connect you with our student alumni network in your destination city for peer mentoring."
  },
  {
    q: "Can I change my university after admission?",
    a: "Yes, university changes are possible but subject to strict visa regulations and institution release policy compliance. Our team will guide you through the official credit transfers, release request filings, and visa status safety checks."
  }
];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filteredFaqs = faqs.filter(faq =>
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="container" style={{ marginTop: "4rem", marginBottom: "3rem" }}>
      <h2 style={{
        textAlign: "center",
        fontSize: "clamp(1.2rem, 5.5vw, 2.5rem)",
        fontWeight: 800,
        color: "#0f172a",
        marginBottom: "2rem",
        fontFamily: "'Baloo 2', cursive",
        whiteSpace: "nowrap"
      }}>
        Frequently Asked Questions
      </h2>

      {/* Minimal Search Bar */}
      <div style={{
        maxWidth: "700px",
        margin: "0 auto 2rem auto",
        position: "relative",
        borderRadius: "16px",
        border: isSearchFocused ? "1.5px solid var(--primary)" : "1px solid rgba(224, 145, 0, 0.12)",
        boxShadow: isSearchFocused ? "0 12px 30px rgba(224, 145, 0, 0.08)" : "0 4px 15px rgba(0, 0, 0, 0.015)",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        background: "#ffffff",
        display: "flex",
        alignItems: "center"
      }}>
        <FaMagnifyingGlass style={{
          position: "absolute",
          left: "1.1rem",
          color: isSearchFocused ? "var(--primary)" : "#94a3b8",
          fontSize: "1rem",
          transition: "color 0.2s"
        }} />
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          style={{
            width: "100%",
            padding: "0.95rem 1rem 0.95rem 2.85rem",
            borderRadius: "16px",
            border: "none",
            fontSize: "0.95rem",
            outline: "none",
            color: "#334155",
            background: "transparent",
            fontFamily: "'Comic Neue', cursive",
            fontWeight: 700
          }}
        />
      </div>

      {/* Minimal Accordion FAQ List */}
      <div style={{
        maxWidth: "700px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column"
      }}>
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`faq-card ${isOpen ? "open" : ""}`}
              >
                {/* Question header */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  style={{
                    width: "100%",
                    padding: "1.25rem 1.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left"
                  }}
                >
                  <span style={{
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    color: isOpen ? "var(--primary)" : "#1e293b",
                    fontFamily: "'Baloo 2', cursive",
                    lineHeight: 1.4,
                    transition: "color 0.2s"
                  }}>
                    {faq.q}
                  </span>
                  
                  {/* Chevron in wrapper */}
                  <div className="faq-chevron-wrapper">
                    <FaChevronDown style={{ fontSize: "0.8rem" }} />
                  </div>
                </button>

                {/* Answer content */}
                <div style={{
                  maxHeight: isOpen ? "250px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.25s ease-out",
                  background: "transparent"
                }}>
                  <p style={{
                    padding: "0 1.5rem 1.25rem 1.5rem",
                    margin: 0,
                    fontSize: "0.925rem",
                    color: "#475569",
                    lineHeight: 1.6,
                    fontFamily: "'Comic Neue', cursive"
                  }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p style={{
            textAlign: "center",
            color: "#94a3b8",
            fontFamily: "'Comic Neue', cursive",
            padding: "2rem"
          }}>
            No FAQs matched your search. Try searching another keyword!
          </p>
        )}
      </div>
    </section>
  );
}
