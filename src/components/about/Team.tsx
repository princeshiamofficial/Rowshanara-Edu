"use client";

import React from "react";
import TeamCarousel, { type TeamMember as CarouselTeamMember } from "@/components/lightswind/team-carousel";
import { type SiteContentItem, useContentSection } from "@/lib/useContentSection";

const teamMembers = [
  { name: "Dr. Md. Karim Hassan", role: "Founder & CEO", focus: "Education Strategy", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&h=300&fit=crop" },
  { name: "Fatima Ahmed Khan", role: "Head of Admissions", focus: "University Relations", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=300&fit=crop" },
  { name: "Amir Hossain", role: "Visa Specialist", focus: "Immigration Law", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=300&fit=crop" },
  { name: "Nadia Rahman", role: "Student Counselor", focus: "Career Guidance", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=300&fit=crop" },
  { name: "Rajib Kumar", role: "Operations Manager", focus: "Process Excellence", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=300&fit=crop" },
  { name: "Sophia Akter", role: "Student Support", focus: "Post-Arrival Services", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&h=300&fit=crop" }
];

export default function Team() {
  const members = useContentSection("team", teamMembers.map((member, index): SiteContentItem => ({
    id: index,
    section: "team",
    itemKey: String(index),
    title: member.name,
    subtitle: member.role,
    body: member.focus,
    imageUrl: member.image,
    linkUrl: "",
    metadata: {},
    sortOrder: index + 1,
    isActive: true,
    value: "",
  })));

  const carouselMembers: CarouselTeamMember[] = members.map((member, index) => ({
    id: String(member.id ?? member.itemKey ?? index),
    name: member.title,
    role: member.subtitle,
    image: member.imageUrl,
    bio: member.body,
  }));

  return (
    <section className="container" style={{ marginTop: "4rem", marginBottom: "2.5rem" }}>
      <h2 style={{
        textAlign: "center",
        fontSize: "clamp(2rem, 4vw, 2.75rem)",
        color: "var(--text)",
        marginBottom: "3.5rem",
        fontFamily: "'Baloo 2', cursive",
        fontWeight: 800
      }}>
        Meet Our Team
      </h2>

      <TeamCarousel
        members={carouselMembers}
        title=""
        cardWidth={310}
        cardHeight={390}
        cardRadius={24}
        visibleCards={2}
        sideCardScale={0.88}
        sideCardOpacity={0.65}
        grayscaleEffect={false}
        autoPlay={4500}
        infoPosition="bottom"
        showDots={false}
        infoTextColor="#0a1c3a"
        className="min-h-[540px] justify-start overflow-visible"
        cardClassName="border border-[rgba(224,145,0,0.12)]"
      />
    </section>
  );
}
