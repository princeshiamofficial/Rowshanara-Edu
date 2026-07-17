import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import TrustedBy from "@/components/home/TrustedBy";
import HowItWorks from "@/components/home/HowItWorks";
import Stats from "@/components/home/Stats";
import Destinations from "@/components/home/Destinations";
import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Rowshanara Edu | Empowering Minds, Shaping Futures",
  description: "Rowshanara Edu is a leading educational platform dedicated to providing world-class learning experiences, tutoring, and university destination guidance.",
  alternates: {
    canonical: "https://rowshanaraedu.com",
  },
};

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
      <CTA style={{ marginTop: 0, marginBottom: 0 }} />
    </div>
  );
}
