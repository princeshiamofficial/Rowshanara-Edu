"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaGraduationCap } from "react-icons/fa6";

interface PartnerUniversity {
  id: number;
  name: string;
  logo: string;
  sortOrder: number;
  isActive: boolean;
}

const fallbackUniversities: PartnerUniversity[] = [
  { id: 1, name: "University of Sydney", logo: "", sortOrder: 1, isActive: true },
  { id: 2, name: "University of Toronto", logo: "", sortOrder: 2, isActive: true },
  { id: 3, name: "Oxford University", logo: "", sortOrder: 3, isActive: true },
  { id: 4, name: "University of Melbourne", logo: "", sortOrder: 4, isActive: true },
  { id: 5, name: "Harvard University", logo: "", sortOrder: 5, isActive: true },
];

export default function TrustedBy() {
  const [universities, setUniversities] = useState<PartnerUniversity[]>(fallbackUniversities);

  useEffect(() => {
    fetch("/api/partner-universities")
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success" && Array.isArray(res.data) && res.data.length > 0) {
          setUniversities(res.data.filter((u: PartnerUniversity) => u.isActive));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="trusted-by-section">
      <div className="trusted-by-badge">
        <span className="badge-dot" />
        <span>Trusted By Leading Universities</span>
      </div>
      <div className="marquee-container">
        <div className="marquee-track">
          {[...universities, ...universities].map((uni, index) => (
            <div key={index} className="university-logo-card">
              {uni.logo ? (
                <Image
                  src={uni.logo}
                  alt={uni.name}
                  width={28}
                  height={28}
                  style={{ objectFit: "contain" }}
                  unoptimized
                />
              ) : (
                <FaGraduationCap className="uni-icon" />
              )}
              <span>{uni.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
