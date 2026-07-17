import React from "react";
import type { Metadata } from "next";
import FAQ from "@/components/services/FAQ";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Rowshanara Edu",
  description: "Find answers to frequently asked questions about studying abroad, student visa processing, scholarship options, and admission requirements.",
  alternates: {
    canonical: "https://rowshanaraedu.com/faq",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the typical timeline for the entire process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The entire process from initial consultation to visa approval typically takes between 3 to 6 months, depending on the country, course intake, and university processing times. We recommend starting your application at least 6-8 months before your desired intake date."
      }
    },
    {
      "@type": "Question",
      "name": "How much does your counselling service cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our initial profile assessment and university admission counselling services are completely free. For specialized test preparations, NAATI CCL classes, and document processing assistance, minor administration fees may apply depending on the program selected."
      }
    },
    {
      "@type": "Question",
      "name": "Do you guarantee university admission?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While we do not guarantee admission, we maintain a 98% admission success rate. Our counselors carefully evaluate your academic profile and match you with universities where you meet all entry requirements, significantly maximizing your acceptance probability."
      }
    },
    {
      "@type": "Question",
      "name": "Can you help with part-time work opportunities?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, during our pre-departure and post-arrival orientations, we guide you on student work rights, local employment regulations, CV writing matching international standards, and top platforms to secure part-time jobs in your study destination."
      }
    },
    {
      "@type": "Question",
      "name": "What if my visa application is rejected?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In the rare event of a visa refusal, our compliance team reviews the rejection letter, addresses the specific concerns raised by immigration officers, updates your financial and SOP documentation, and assists you in filing a strong re-application or appeal."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer support for postgraduate studies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely! We offer comprehensive advisory services for Masters, MBA, and PhD programs, including research proposal guidance, supervisor communication support, statement of purpose (SOP) reviews, and postgraduate scholarship opportunities."
      }
    },
    {
      "@type": "Question",
      "name": "How do I stay in touch after I depart?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer dedicated post-arrival student support, and our team remains reachable via our WhatsApp support hotline. We also help connect you with our student alumni network in your destination city for peer mentoring."
      }
    },
    {
      "@type": "Question",
      "name": "Can I change my university after admission?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, university changes are possible but subject to strict visa regulations and institution release policy compliance. Our team will guide you through the official credit transfers, release request filings, and visa status safety checks."
      }
    }
  ]
};

export default function FAQPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--background)", paddingTop: "100px" }}>
      <script
        type="application/ld+json"
        id="faq-jsonld"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FAQ />
    </div>
  );
}
