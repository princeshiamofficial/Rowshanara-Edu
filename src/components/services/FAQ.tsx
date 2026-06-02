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

  const filteredFaqs = faqs.filter(faq =>
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="container" style={{ marginTop: "6rem", marginBottom: "6rem" }}>
      <h2 style={{
        textAlign: "center",
        fontSize: "2.5rem",
        fontWeight: 800,
        color: "#0f172a",
        marginBottom: "3.5rem",
        fontFamily: "'Baloo 2', cursive"
      }}>
        Frequently Asked Questions
      </h2>

      {/* Search Bar */}
      <div style={{
        maxWidth: "800px",
        margin: "0 auto 2.5rem auto",
        position: "relative"
      }}>
        <FaMagnifyingGlass style={{
          position: "absolute",
          left: "1rem",
          top: "50%",
          transform: "translateY(-50%)",
          color: "#94a3b8",
          fontSize: "1.1rem"
        }} />
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "1rem 1rem 1rem 3rem",
            borderRadius: "12px",
            border: "1px solid #cbd5e1",
            fontSize: "1rem",
            outline: "none",
            color: "#334155",
            fontFamily: "'Comic Neue', cursive",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
            transition: "border-color 0.2s"
          }}
          onFocus={e => e.currentTarget.style.borderColor = "var(--primary)"}
          onBlur={e => e.currentTarget.style.borderColor = "#cbd5e1"}
        />
      </div>

      {/* FAQ list */}
      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
      }}>
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} style={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                background: isOpen ? "#f8fafc" : "#ffffff",
                overflow: "hidden",
                transition: "all 0.2s ease"
              }}>
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
                    color: "#1e293b",
                    fontFamily: "'Baloo 2', cursive"
                  }}>
                    {faq.q}
                  </span>
                  <span style={{
                    color: "var(--primary)",
                    fontSize: "0.85rem",
                    marginLeft: "1rem",
                    display: "flex",
                    alignItems: "center",
                    transition: "transform 0.2s ease",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"
                  }}>
                    <FaChevronDown />
                  </span>
                </button>

                {/* Answer content with transition */}
                <div style={{
                  maxHeight: isOpen ? "200px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.2s cubic-bezier(0, 1, 0, 1)",
                  background: "#ffffff",
                  borderTop: isOpen ? "1px solid #e2e8f0" : "none"
                }}>
                  <p style={{
                    padding: "1.25rem 1.5rem",
                    margin: 0,
                    fontSize: "0.95rem",
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
