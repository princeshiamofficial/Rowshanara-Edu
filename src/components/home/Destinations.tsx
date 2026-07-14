"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface DestinationItem {
  id: number;
  code: string;
  name: string;
  image: string;
  color: string;
  isPopular: boolean;
  region: string;
  cost: string;
  work: string;
  pr: string;
  gradient: string;
  bullets: string[];
  cities: string;
  visaInfo: string;
}

interface PopularDestination {
  name: string;
  code: string;
  gradient: string;
  image: string;
}

const FALLBACK_IMAGE_MAP: Record<string, string> = {
  GB: "/uk_hero.png",
  CA: "/canada_hero.png",
  AU: "/sydney_opera_house.png",
  US: "/usa_landmark.png",
  DE: "/germany_landmark.png",
  MY: "/malaysia_landmark.png",
  IE: "/images/services/counselling.png",
  NZ: "/images/services/pre_departure.png"
};

const staticDestinations: PopularDestination[] = [
  { name: "United Kingdom", code: "GB", gradient: "linear-gradient(135deg, #5fa8ff 0%, #3e84ff 100%)", image: "/uk_hero.png" },
  { name: "Canada", code: "CA", gradient: "linear-gradient(135deg, #ff6b6b 0%, #ee4444 100%)", image: "/canada_hero.png" },
  { name: "Australia", code: "AU", gradient: "linear-gradient(135deg, #ffc107 0%, #ff9800 100%)", image: "/sydney_opera_house.png" },
  { name: "USA", code: "US", gradient: "linear-gradient(135deg, #7c4dff 0%, #5e35b1 100%)", image: "/usa_landmark.png" },
  { name: "Germany", code: "DE", gradient: "linear-gradient(135deg, #616161 0%, #424242 100%)", image: "/germany_landmark.png" },
  { name: "Malaysia", code: "MY", gradient: "linear-gradient(135deg, #ff9800 0%, #f57c00 100%)", image: "/malaysia_landmark.png" }
];

export default function Destinations() {
  const [destinations, setDestinations] = useState<PopularDestination[]>(staticDestinations);

  useEffect(() => {
    fetch('/api/destinations')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success' && Array.isArray(res.data) && res.data.length > 0) {
          const mapped = res.data
            .filter((d: DestinationItem) => d.isPopular)
            .map((d: DestinationItem) => ({
              name: d.name,
              code: d.code,
              gradient: d.gradient || `linear-gradient(135deg, ${d.color || "#3b82f6"} 0%, ${d.color || "#3b82f6"} 100%)`,
              image: d.image || FALLBACK_IMAGE_MAP[d.code.toUpperCase()] || "/images/services/counselling.png"
            }));
          if (mapped.length > 0) {
            setDestinations(mapped);
          }
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
            <Image
              src={dest.image} 
              alt={dest.name} 
              className="destination-image" 
              width={360}
              height={220}
              unoptimized
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
