import React from "react";

const destinations = [
  { name: "United Kingdom", universities: 12, gradient: "linear-gradient(135deg, #5fa8ff 0%, #3e84ff 100%)", image: "/uk_hero.png" },
  { name: "Canada", universities: 10, gradient: "linear-gradient(135deg, #ff6b6b 0%, #ee4444 100%)", image: "/canada_hero.png" },
  { name: "Australia", universities: 8, gradient: "linear-gradient(135deg, #ffc107 0%, #ff9800 100%)", image: "/sydney_opera_house.png" },
  { name: "USA", universities: 15, gradient: "linear-gradient(135deg, #7c4dff 0%, #5e35b1 100%)", image: "/usa_landmark.png" },
  { name: "Germany", universities: 9, gradient: "linear-gradient(135deg, #616161 0%, #424242 100%)", image: "/germany_landmark.png" },
  { name: "Malaysia", universities: 7, gradient: "linear-gradient(135deg, #ff9800 0%, #f57c00 100%)", image: "/malaysia_landmark.png" }
];

export default function Destinations() {
  return (
    <section className="destinations-section">
      <h2 className="destinations-title">Popular Destinations</h2>
      <div className="destinations-grid">
        {destinations.map((dest, index) => (
          <div 
            key={index} 
            className="destination-card"
            style={{ background: dest.gradient }}
          >
            <img src={dest.image} alt={dest.name} className="destination-image" />
            <div className="destination-content">
              <h3 className="destination-name">{dest.name}</h3>
              <p className="destination-unis">{dest.universities} Partner Universities</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
