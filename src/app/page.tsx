"use client";

import Hero from "@/components/home/Hero";
import TrustedBy from "@/components/home/TrustedBy";
import HowItWorks from "@/components/home/HowItWorks";
import Stats from "@/components/home/Stats";
import Destinations from "@/components/home/Destinations";
import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <div>
      <Hero />
      <TrustedBy />
      <HowItWorks />
      <Stats />
      <Destinations />
      <Services />
      <Testimonials />
      <CTA />
    </div>
  );
}
