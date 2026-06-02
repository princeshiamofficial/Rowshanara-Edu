import React from "react";
import { FaComments, FaBuildingColumns, FaFileSignature, FaPlaneDeparture } from "react-icons/fa6";

export default function HowItWorks() {
  return (
    <section className="how-it-works-section">
      <div className="how-it-works-header">
        <h2 className="how-it-works-title">How It Works</h2>
        <p className="how-it-works-subtitle">Get closer to your study abroad dreams in 4 simple steps.</p>
      </div>
      <div className="how-it-works-steps">
        <div className="how-it-works-step step-1">
          <span className="step-watermark">01</span>
          <div className="step-icon-circle">
            <FaComments />
            <span className="step-badge-number">1</span>
          </div>
          <h3 className="step-title">Free Counselling</h3>
          <p className="step-description">Initial consultation</p>
        </div>
        <div className="how-it-works-step step-2">
          <span className="step-watermark">02</span>
          <div className="step-icon-circle">
            <FaBuildingColumns />
            <span className="step-badge-number">2</span>
          </div>
          <h3 className="step-title">Choose University</h3>
          <p className="step-description">Select your dream school</p>
        </div>
        <div className="how-it-works-step step-3">
          <span className="step-watermark">03</span>
          <div className="step-icon-circle">
            <FaFileSignature />
            <span className="step-badge-number">3</span>
          </div>
          <h3 className="step-title">Application</h3>
          <p className="step-description">Complete your application</p>
        </div>
        <div className="how-it-works-step step-4">
          <span className="step-watermark">04</span>
          <div className="step-icon-circle">
            <FaPlaneDeparture />
            <span className="step-badge-number">4</span>
          </div>
          <h3 className="step-title">Visa & Depart</h3>
          <p className="step-description">Get visa and travel</p>
        </div>
      </div>
    </section>
  );
}
