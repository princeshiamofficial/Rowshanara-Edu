"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface DestinationItem {
  id: number;
  code: string;
  name: string;
  region: string;
  cost: string;
  work: string;
  pr: string;
  gradient: string;
  bullets: string[];
  cities: string;
  visaInfo: string;
}

const LANDMARK_MAP: Record<string, string> = {
  GB: "/uk_hero.png",
  CA: "/canada_hero.png",
  AU: "/sydney_opera_house.png",
  US: "/usa_landmark.png",
  DE: "/germany_landmark.png",
  MY: "/malaysia_landmark.png",
  IE: "/images/services/counselling.png",
  NZ: "/images/services/pre_departure.png"
};

const staticDestinations = [
  { name: "United Kingdom", code: "GB", gradient: "linear-gradient(135deg, #5fa8ff 0%, #3e84ff 100%)", image: "/uk_hero.png" },
  { name: "Canada", code: "CA", gradient: "linear-gradient(135deg, #ff6b6b 0%, #ee4444 100%)", image: "/canada_hero.png" },
  { name: "Australia", code: "AU", gradient: "linear-gradient(135deg, #ffc107 0%, #ff9800 100%)", image: "/sydney_opera_house.png" },
  { name: "USA", code: "US", gradient: "linear-gradient(135deg, #7c4dff 0%, #5e35b1 100%)", image: "/usa_landmark.png" },
  { name: "Germany", code: "DE", gradient: "linear-gradient(135deg, #616161 0%, #424242 100%)", image: "/germany_landmark.png" },
  { name: "Malaysia", code: "MY", gradient: "linear-gradient(135deg, #ff9800 0%, #f57c00 100%)", image: "/malaysia_landmark.png" }
];

export default function Destinations() {
  const [destinations, setDestinations] = useState<any[]>(staticDestinations);

  useEffect(() => {
    fetch('/api/destinations')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success' && Array.isArray(res.data) && res.data.length > 0) {
          const mapped = res.data.map((d: DestinationItem) => ({
            name: d.name,
            code: d.code,
            gradient: d.gradient,
            image: LANDMARK_MAP[d.code.toUpperCase()] || "/images/services/counselling.png"
          }));
          setDestinations(mapped);
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="destinations-section">
      <h2 className="destinations-title">Popular Destinations</h2>
      <div className="destinations-grid">
        {destinations.map((dest, index) => (
          <Link 
            key={index} 
            href={`/destination?country=${encodeURIComponent(dest.name)}`}
            className="destination-card"
            style={{ background: dest.gradient }}
          >
            <img 
              src={dest.image} 
              alt={dest.name} 
              className="destination-image" 
            />
            <div className="destination-content">
              <h3 className="destination-name">{dest.name}</h3>
              <p className="destination-unis">Explore Study Options</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
