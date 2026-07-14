"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface PartnerUniversity {
  id: number;
  logo: string;
  sortOrder: number;
  isActive: boolean;
}

const fallbackLogos = [
  { id: 1, logo: "/universities/harvard.png", sortOrder: 0, isActive: true },
  { id: 2, logo: "/universities/sydney.png", sortOrder: 1, isActive: true },
  { id: 3, logo: "/universities/toronto.png", sortOrder: 2, isActive: true },
  { id: 4, logo: "/universities/oxford.png", sortOrder: 3, isActive: true },
  { id: 5, logo: "/universities/melbourne.png", sortOrder: 4, isActive: true },
];

export default function TrustedBy() {
  const [universities, setUniversities] = useState<PartnerUniversity[]>(fallbackLogos);

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
          {[...universities, ...universities, ...universities, ...universities].map((uni, index) => (
            <div key={index} className="university-logo-card">
              <Image
                src={uni.logo}
                alt="University logo"
                width={80}
                height={56}
                style={{ objectFit: "contain", maxHeight: "56px", width: "auto" }}
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
