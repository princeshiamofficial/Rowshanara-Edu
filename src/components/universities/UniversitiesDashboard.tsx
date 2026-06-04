"use client";

import React, { useState, useMemo, useEffect } from "react";
import { FaFilter, FaLocationDot, FaBookOpen, FaStar, FaCheck, FaXmark } from "react-icons/fa6";
import { BsPatchCheckFill } from "react-icons/bs";

interface University {
  name: string;
  country: string;
  location: string;
  courses: number;
  tuitionMin: number;
  tuitionMax: number;
  acceptanceRate: string;
  rank: number;
  subjectAreas: string[];
  isOfficialPartner: boolean;
  image: string;
  description: string;
  established: number;
  popularPrograms: string[];
  requirements: string[];
}

const universities: University[] = [
  {
    name: "University of Oxford",
    country: "UK",
    location: "Oxford, UK",
    courses: 45,
    tuitionMin: 25000,
    tuitionMax: 35000,
    acceptanceRate: "~15%",
    rank: 1,
    subjectAreas: ["Arts", "Science", "Business", "Engineering", "Medicine"],
    isOfficialPartner: true,
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop",
    description: "The oldest university in the English-speaking world, Oxford is a unique and historic institution consistently ranked among the top universities globally. Known for its collegiate system and tutorial-based teaching.",
    established: 1096,
    popularPrograms: ["Philosophy, Politics and Economics (PPE)", "Computer Science", "Medicine", "MBA"],
    requirements: ["IELTS 7.5 or equivalent", "GPA 3.8+ (A-levels: A*A*A*)", "GRE/GMAT (for graduate business programs)", "Personal Statement & References"]
  },
  {
    name: "University of Cambridge",
    country: "UK",
    location: "Cambridge, UK",
    courses: 42,
    tuitionMin: 24000,
    tuitionMax: 34000,
    acceptanceRate: "~16%",
    rank: 2,
    subjectAreas: ["Arts", "Science", "Business", "Engineering", "Medicine"],
    isOfficialPartner: true,
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=600&auto=format&fit=crop",
    description: "A collegiate research university in Cambridge, United Kingdom. Founded in 1209, Cambridge is the world's fourth-oldest surviving university and is renowned for its scientific breakthroughs and rich academic history.",
    established: 1209,
    popularPrograms: ["Natural Sciences", "Mathematics", "Engineering", "Law"],
    requirements: ["IELTS 7.5 or TOEFL 110", "GPA 3.8+ (A-levels: A*A*A)", "Subject-specific entrance tests", "Academic Interview"]
  },
  {
    name: "MIT",
    country: "USA",
    location: "Boston, USA",
    courses: 55,
    tuitionMin: 45000,
    tuitionMax: 55000,
    acceptanceRate: "~3%",
    rank: 3,
    subjectAreas: ["Science", "Engineering", "Business"],
    isOfficialPartner: true,
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=600&auto=format&fit=crop",
    description: "The Massachusetts Institute of Technology is a private land-grant research university in Cambridge, Massachusetts. Known for its cutting-edge research, innovation, and intense academic environment in STEM fields.",
    established: 1861,
    popularPrograms: ["Computer Science & Engineering", "Physics", "Mechanical Engineering", "Finance"],
    requirements: ["TOEFL 100+ (IELTS 7.5+)", "Exceptional SAT/ACT scores", "Strong STEM portfolio", "Letters of Recommendation"]
  },
  {
    name: "Stanford University",
    country: "USA",
    location: "Stanford, USA",
    courses: 52,
    tuitionMin: 48000,
    tuitionMax: 58000,
    acceptanceRate: "~4%",
    rank: 4,
    subjectAreas: ["Science", "Engineering", "Business", "Arts", "Medicine"],
    isOfficialPartner: true,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop",
    description: "Located in the heart of Silicon Valley, Stanford is one of the world's leading research universities. It is famous for its entrepreneurial spirit, academic excellence, and close ties to the tech industry.",
    established: 1885,
    popularPrograms: ["Computer Science", "Electrical Engineering", "MBA", "Human Biology"],
    requirements: ["TOEFL 100+", "GPA 3.9+ (SAT/ACT recommended)", "Extracurricular leadership profile", "Three essays / letters of recommendation"]
  },
  {
    name: "Harvard University",
    country: "USA",
    location: "Cambridge, USA",
    courses: 58,
    tuitionMin: 50000,
    tuitionMax: 60000,
    acceptanceRate: "~3%",
    rank: 5,
    subjectAreas: ["Arts", "Science", "Business", "Medicine"],
    isOfficialPartner: false,
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop",
    description: "The oldest institution of higher learning in the United States, Harvard is a prestigious Ivy League research university. It has produced numerous Nobel laureates, heads of state, and global leaders.",
    established: 1636,
    popularPrograms: ["Economics", "Government/Political Science", "Computer Science", "Medicine (MD)"],
    requirements: ["TOEFL 100+ or IELTS 7.5+", "Excellent high school record / SAT", "Well-rounded extracurricular profile", "Teacher evaluations & essays"]
  },
  {
    name: "University of Toronto",
    country: "Canada",
    location: "Toronto, Canada",
    courses: 48,
    tuitionMin: 15000,
    tuitionMax: 25000,
    acceptanceRate: "~35%",
    rank: 21,
    subjectAreas: ["Arts", "Science", "Business", "Engineering", "Medicine"],
    isOfficialPartner: true,
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=600&auto=format&fit=crop",
    description: "Canada's top-ranked public research university, located in the vibrant city of Toronto. Known for its strong academic programs, diversity, and groundbreaking scientific research, including the discovery of insulin.",
    established: 1827,
    popularPrograms: ["Computer Science", "Engineering", "Commerce/Finance", "Life Sciences"],
    requirements: ["IELTS 6.5+ or TOEFL 100+", "GPA 3.3+ (IB 36+)", "High school transcript", "Online supplemental application (for some programs)"]
  },
  {
    name: "University of Melbourne",
    country: "Australia",
    location: "Melbourne, Australia",
    courses: 40,
    tuitionMin: 28000,
    tuitionMax: 38000,
    acceptanceRate: "~30%",
    rank: 33,
    subjectAreas: ["Arts", "Science", "Business", "Engineering", "Medicine"],
    isOfficialPartner: true,
    image: "https://images.unsplash.com/photo-1527891751199-7225231a68dd?q=80&w=600&auto=format&fit=crop",
    description: "Australia's leading research university, situated in the cultural capital of Melbourne. It features the unique 'Melbourne Model' of education, offering a broad undergraduate foundation followed by professional specialization.",
    established: 1853,
    popularPrograms: ["Business & Economics", "Biomedicine", "Engineering", "Arts & Humanities"],
    requirements: ["IELTS 6.5+ (no band less than 6.0)", "ATAR equivalent of 90+ / GPA 3.0+", "Academic Transcripts", "Secondary school qualifications"]
  },
  {
    name: "Technical University of Munich",
    country: "Germany",
    location: "Munich, Germany",
    courses: 35,
    tuitionMin: 3000,
    tuitionMax: 8000,
    acceptanceRate: "~20%",
    rank: 37,
    subjectAreas: ["Science", "Engineering", "Business"],
    isOfficialPartner: true,
    image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop",
    description: "One of Europe's top universities, TUM is known for its focus on engineering, technology, medicine, and applied sciences. It is a key hub for research and entrepreneurship in Germany.",
    established: 1868,
    popularPrograms: ["Informatics (Computer Science)", "Mechanical Engineering", "Management & Technology", "Physics"],
    requirements: ["IELTS 6.5 / German proficiency (for some courses)", "GPA 3.0+", "Entrance assessment exam", "CV & Motivation Letter"]
  },
  {
    name: "Universiti Malaya",
    country: "Malaysia",
    location: "Kuala Lumpur, Malaysia",
    courses: 38,
    tuitionMin: 8000,
    tuitionMax: 15000,
    acceptanceRate: "~25%",
    rank: 65,
    subjectAreas: ["Arts", "Science", "Business", "Engineering", "Medicine"],
    isOfficialPartner: true,
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=600&auto=format&fit=crop",
    description: "The oldest and premier public research university in Malaysia, located in Kuala Lumpur. It is highly ranked internationally and offers robust programs in engineering, medicine, and social sciences.",
    established: 1949,
    popularPrograms: ["Mechanical Engineering", "Medicine", "Business Administration", "Information Technology"],
    requirements: ["IELTS 6.0 or TOEFL 80+", "GPA 3.0+ / CGPA 3.0", "High school graduation certificate", "English proficiency test"]
  },
  {
    name: "Imperial College London",
    country: "UK",
    location: "London, UK",
    courses: 44,
    tuitionMin: 32000,
    tuitionMax: 42000,
    acceptanceRate: "~12%",
    rank: 6,
    subjectAreas: ["Science", "Engineering", "Medicine", "Business"],
    isOfficialPartner: false,
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=600&auto=format&fit=crop",
    description: "A world-class university based in London, focusing exclusively on science, engineering, medicine, and business. Imperial is highly regarded for its research impact and global collaboration.",
    established: 1907,
    popularPrograms: ["Computing (Software Engineering)", "Aeronautical Engineering", "Biochemistry", "Medicine"],
    requirements: ["IELTS 7.0 or TOEFL 100", "A*A*A at A-level / IB 39+", "Admissions test (for some subjects)", "Interview performance"]
  },
  {
    name: "Caltech",
    country: "USA",
    location: "Pasadena, USA",
    courses: 30,
    tuitionMin: 52000,
    tuitionMax: 62000,
    acceptanceRate: "~6%",
    rank: 7,
    subjectAreas: ["Science", "Engineering"],
    isOfficialPartner: false,
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=600&auto=format&fit=crop",
    description: "The California Institute of Technology is a world-renowned science and engineering institute that marshals some of the world's brightest minds to address fundamental scientific questions.",
    established: 1891,
    popularPrograms: ["Physics", "Computer Science", "Aerospace Engineering", "Chemistry"],
    requirements: ["TOEFL 100+ or IELTS 7.5+", "Outstanding academic background in STEM", "SAT/ACT tests", "Letters of evaluation from STEM teachers"]
  },
  {
    name: "Universiti Kebangsaan Malaysia",
    country: "Malaysia",
    location: "Selangor, Malaysia",
    courses: 32,
    tuitionMin: 7000,
    tuitionMax: 12000,
    acceptanceRate: "~30%",
    rank: 129,
    subjectAreas: ["Science", "Engineering", "Business", "Arts"],
    isOfficialPartner: true,
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=600&auto=format&fit=crop",
    description: "Also known as the National University of Malaysia, UKM is a top public university that aims to inspire the community and shape the future through quality education and research.",
    established: 1970,
    popularPrograms: ["Medicine", "Law", "Mechanical Engineering", "Islamic Studies"],
    requirements: ["IELTS 5.5 or TOEFL 500+", "CGPA 3.00 or equivalent", "High school graduation certificate", "Academic reference letter"]
  }
];

interface UniversitiesDashboardProps {
  searchQuery: string;
}

export default function UniversitiesDashboard({ searchQuery }: UniversitiesDashboardProps) {
  const [selectedCountries, setSelectedCountries] = useState<string[]>(["All"]);
  const [selectedRankings, setSelectedRankings] = useState<string[]>(["All"]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(["All"]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const [activeUniversity, setActiveUniversity] = useState<University | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "programs" | "inquiry">("overview");

  // Form states for the modal inquiry
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formDegree, setFormDegree] = useState("Undergraduate");
  const [formMessage, setFormMessage] = useState("");
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveUniversity(null);
      }
    };
    if (activeUniversity) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeUniversity]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (!selectedCountries.includes("All")) count += selectedCountries.length;
    if (!selectedRankings.includes("All")) count += selectedRankings.length;
    if (!selectedSubjects.includes("All")) count += selectedSubjects.length;
    return count;
  }, [selectedCountries, selectedRankings, selectedSubjects]);

  const handleFilterChange = (
    type: "country" | "ranking" | "subject",
    value: string
  ) => {
    if (type === "country") {
      if (value === "All") {
        setSelectedCountries(["All"]);
      } else {
        const next = selectedCountries.filter((c) => c !== "All");
        if (next.includes(value)) {
          const updated = next.filter((c) => c !== value);
          setSelectedCountries(updated.length === 0 ? ["All"] : updated);
        } else {
          setSelectedCountries([...next, value]);
        }
      }
    } else if (type === "ranking") {
      if (value === "All") {
        setSelectedRankings(["All"]);
      } else {
        const next = selectedRankings.filter((r) => r !== "All");
        if (next.includes(value)) {
          const updated = next.filter((r) => r !== value);
          setSelectedRankings(updated.length === 0 ? ["All"] : updated);
        } else {
          setSelectedRankings([...next, value]);
        }
      }
    } else if (type === "subject") {
      if (value === "All") {
        setSelectedSubjects(["All"]);
      } else {
        const next = selectedSubjects.filter((s) => s !== "All");
        if (next.includes(value)) {
          const updated = next.filter((s) => s !== value);
          setSelectedSubjects(updated.length === 0 ? ["All"] : updated);
        } else {
          setSelectedSubjects([...next, value]);
        }
      }
    }
  };

  const filteredUniversities = useMemo(() => {
    return universities.filter((uni) => {
      // 1. Search Query Match
      const matchSearch =
        searchQuery === "" ||
        uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.location.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Country Match
      const matchCountry =
        selectedCountries.includes("All") ||
        selectedCountries.includes(uni.country);

      // 3. Ranking Match
      let matchRanking = selectedRankings.includes("All");
      if (!matchRanking) {
        matchRanking = selectedRankings.some((range) => {
          if (range === "1-10") return uni.rank >= 1 && uni.rank <= 10;
          if (range === "11-50") return uni.rank >= 11 && uni.rank <= 50;
          if (range === "51-100") return uni.rank >= 51 && uni.rank <= 100;
          if (range === "100+") return uni.rank > 100;
          return false;
        });
      }

      // 4. Subject Area Match
      let matchSubject = selectedSubjects.includes("All");
      if (!matchSubject) {
        matchSubject = selectedSubjects.some((sub) =>
          uni.subjectAreas.includes(sub)
        );
      }

      return matchSearch && matchCountry && matchRanking && matchSubject;
    });
  }, [searchQuery, selectedCountries, selectedRankings, selectedSubjects]);

  const CheckboxItem = ({
    label,
    checked,
    onChange,
    code,
  }: {
    label: string;
    checked: boolean;
    onChange: () => void;
    code?: string;
  }) => {
    return (
      <label style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        fontSize: "0.95rem",
        fontWeight: checked ? 700 : 500,
        color: checked ? "var(--primary)" : "var(--text)",
        cursor: "pointer",
        padding: "0.25rem 0",
        transition: "all 0.2s"
      }}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          style={{
            position: "absolute",
            opacity: 0,
            width: 0,
            height: 0
          }}
        />
        <div style={{
          width: "18px",
          height: "18px",
          borderRadius: "4px",
          border: checked ? "1px solid var(--primary)" : "2px solid #cbd5e1",
          backgroundColor: checked ? "var(--primary)" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all 0.2s"
        }}>
          {checked && <FaCheck style={{ fontSize: "0.65rem", color: "white" }} />}
        </div>
        {code && (
          <img 
            src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`} 
            alt={`${label} flag`} 
            style={{ 
              height: "12px", 
              borderRadius: "2px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
            }} 
          />
        )}
        {label}
      </label>
    );
  };

  return (
    <section className="container" style={{
      display: "flex",
      gap: "2rem",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "flex-start",
      marginTop: "0.5rem"
    }}>
      {/* Left Column - Filter Sidebar */}
      <div 
        className="filter-sidebar"
        style={{
          flex: "1 1 280px",
          maxWidth: "320px",
          width: "100%",
          background: "white",
          borderRadius: "24px",
          padding: "2rem",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)",
          border: "1px solid rgba(10, 28, 58, 0.06)"
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          marginBottom: "2rem",
          borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
          paddingBottom: "1rem"
        }}>
          <FaFilter style={{ color: "var(--primary)", fontSize: "1.1rem" }} />
          <h3 style={{
            fontSize: "1.25rem",
            fontWeight: 800,
            color: "var(--text)",
            margin: 0,
            fontFamily: "'Baloo 2', cursive"
          }}>
            Filters
          </h3>
        </div>

        {/* Country Filters */}
        <div style={{ marginBottom: "1rem" }}>
          <h4 style={{
            fontSize: "1rem",
            fontWeight: 800,
            color: "var(--text)",
            marginBottom: "1rem",
            fontFamily: "'Baloo 2', cursive"
          }}>
            Country
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <CheckboxItem label="All Countries" checked={selectedCountries.includes("All")} onChange={() => handleFilterChange("country", "All")} />
            <CheckboxItem label="UK" code="gb" checked={selectedCountries.includes("UK")} onChange={() => handleFilterChange("country", "UK")} />
            <CheckboxItem label="USA" code="us" checked={selectedCountries.includes("USA")} onChange={() => handleFilterChange("country", "USA")} />
            <CheckboxItem label="Canada" code="ca" checked={selectedCountries.includes("Canada")} onChange={() => handleFilterChange("country", "Canada")} />
            <CheckboxItem label="Australia" code="au" checked={selectedCountries.includes("Australia")} onChange={() => handleFilterChange("country", "Australia")} />
            <CheckboxItem label="Germany" code="de" checked={selectedCountries.includes("Germany")} onChange={() => handleFilterChange("country", "Germany")} />
            <CheckboxItem label="Malaysia" code="my" checked={selectedCountries.includes("Malaysia")} onChange={() => handleFilterChange("country", "Malaysia")} />
          </div>
        </div>

        {/* World Ranking Filters */}
        <div style={{ marginBottom: "1rem" }}>
          <h4 style={{
            fontSize: "1rem",
            fontWeight: 800,
            color: "var(--text)",
            marginBottom: "1rem",
            fontFamily: "'Baloo 2', cursive"
          }}>
            World Ranking
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <CheckboxItem label="All Rankings" checked={selectedRankings.includes("All")} onChange={() => handleFilterChange("ranking", "All")} />
            <CheckboxItem label="Rank 1-10" checked={selectedRankings.includes("1-10")} onChange={() => handleFilterChange("ranking", "1-10")} />
            <CheckboxItem label="Rank 11-50" checked={selectedRankings.includes("11-50")} onChange={() => handleFilterChange("ranking", "11-50")} />
            <CheckboxItem label="Rank 51-100" checked={selectedRankings.includes("51-100")} onChange={() => handleFilterChange("ranking", "51-100")} />
            <CheckboxItem label="Rank 100+" checked={selectedRankings.includes("100+")} onChange={() => handleFilterChange("ranking", "100+")} />
          </div>
        </div>

        {/* Subject Area Filters */}
        <div>
          <h4 style={{
            fontSize: "1rem",
            fontWeight: 800,
            color: "var(--text)",
            marginBottom: "1rem",
            fontFamily: "'Baloo 2', cursive"
          }}>
            Subject Area
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <CheckboxItem label="All Subjects" checked={selectedSubjects.includes("All")} onChange={() => handleFilterChange("subject", "All")} />
            <CheckboxItem label="Engineering" checked={selectedSubjects.includes("Engineering")} onChange={() => handleFilterChange("subject", "Engineering")} />
            <CheckboxItem label="Business" checked={selectedSubjects.includes("Business")} onChange={() => handleFilterChange("subject", "Business")} />
            <CheckboxItem label="Medicine" checked={selectedSubjects.includes("Medicine")} onChange={() => handleFilterChange("subject", "Medicine")} />
            <CheckboxItem label="Arts" checked={selectedSubjects.includes("Arts")} onChange={() => handleFilterChange("subject", "Arts")} />
            <CheckboxItem label="Science" checked={selectedSubjects.includes("Science")} onChange={() => handleFilterChange("subject", "Science")} />
          </div>
        </div>
      </div>

      {/* Right Column - University Cards list */}
      <div style={{
        flex: "3 1 600px",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem"
      }}>
        {/* Top Counter Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          paddingBottom: "0.75rem",
          borderBottom: "1px solid rgba(224, 145, 0, 0.08)",
          marginBottom: "0.25rem"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            fontSize: "1.05rem",
            fontWeight: 700,
            color: "#475569",
            fontFamily: "'Baloo 2', cursive"
          }}>
            <span>Showing</span>
            <span style={{
              background: "rgba(224, 145, 0, 0.08)",
              color: "var(--primary)",
              padding: "0.2rem 0.65rem",
              borderRadius: "8px",
              fontWeight: 800,
              fontSize: "0.95rem"
            }}>{filteredUniversities.length}</span>
            <span>partner universities</span>
          </div>
        </div>

        {/* Grid list of cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.5rem"
        }}>
          {filteredUniversities.map((uni, index) => (
            <div
              key={index}
              style={{
                background: "white",
                borderRadius: "24px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)",
                border: "1px solid rgba(10, 28, 58, 0.05)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "all 0.3s ease",
                overflow: "hidden"
              }}
              className="glass-card-hover"
            >
              {/* Image on top with badges overlay */}
              <div style={{ width: "100%", height: "200px", overflow: "hidden", position: "relative" }}>
                <img 
                  src={uni.image} 
                  alt={uni.name} 
                  style={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "cover"
                  }} 
                />
                {/* Bottom dark gradient for text readability */}
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "60px",
                  background: "linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)",
                  zIndex: 1
                }} />

                {/* Overlay Top Badges */}
                <div style={{
                  position: "absolute",
                  top: "0.75rem",
                  left: "0.75rem",
                  right: "0.75rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  zIndex: 2
                }}>
                  {/* Left: partner label */}
                  <div>
                    {uni.isOfficialPartner && (
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        background: "rgba(255, 255, 255, 0.95)",
                        color: "#1E293B",
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        padding: "0.3rem 0.6rem",
                        borderRadius: "20px",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
                        backdropFilter: "blur(4px)",
                        border: "1px solid rgba(24, 119, 242, 0.15)"
                      }}>
                        <BsPatchCheckFill style={{ color: "#1877F2", fontSize: "0.9rem", flexShrink: 0 }} /> Official Partner
                      </span>
                    )}
                  </div>
                  {/* Right: Ranking trend tag */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    background: "rgba(255, 255, 255, 0.95)",
                    color: "#fab005",
                    fontSize: "0.85rem",
                    fontWeight: 800,
                    padding: "0.3rem 0.6rem",
                    borderRadius: "20px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
                    backdropFilter: "blur(4px)",
                    border: "1px solid rgba(250, 176, 5, 0.2)"
                  }}>
                    <FaStar style={{ fontSize: "0.8rem" }} />
                    <span>Rank {uni.rank}</span>
                  </div>
                </div>

                {/* Overlay Bottom Location Info */}
                <div style={{
                  position: "absolute",
                  bottom: "0.75rem",
                  left: "0.75rem",
                  right: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "white",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  zIndex: 2
                }}>
                  <FaLocationDot style={{ color: "#ffffff", opacity: 0.85 }} />
                  <img 
                    src={`https://flagcdn.com/w40/${
                      uni.country.toLowerCase() === "uk" ? "gb" :
                      uni.country.toLowerCase() === "usa" ? "us" :
                      uni.country.toLowerCase() === "canada" ? "ca" :
                      uni.country.toLowerCase() === "australia" ? "au" :
                      uni.country.toLowerCase() === "germany" ? "de" :
                      uni.country.toLowerCase() === "malaysia" ? "my" : "un"
                    }.png`} 
                    alt={`${uni.country} flag`} 
                    style={{ 
                      height: "11px", 
                      borderRadius: "2px",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.2)" 
                    }} 
                  />
                  <span style={{ textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}>{uni.location}</span>
                </div>
              </div>

              <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
                <div>
                  {/* Title */}
                  <h3 style={{
                    fontSize: "1.35rem",
                    fontWeight: 800,
                    color: "var(--text)",
                    marginBottom: "0.5rem",
                    fontFamily: "'Baloo 2', cursive",
                    lineHeight: 1.25
                  }}>
                    {uni.name}
                  </h3>

                  {/* Courses count */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "var(--text)",
                    opacity: 0.65,
                    fontSize: "0.9rem",
                    marginBottom: "0.5rem"
                  }}>
                    <FaBookOpen style={{ color: "#adb5bd" }} />
                    <span>{uni.courses} courses available</span>
                  </div>

                  {/* Tuition info */}
                  <div style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "var(--text)",
                    opacity: 0.85,
                    marginBottom: "0.4rem"
                  }}>
                    Tuition: ${uni.tuitionMin.toLocaleString()} - ${uni.tuitionMax.toLocaleString()}
                  </div>

                  {/* Progress bar */}
                  <div style={{
                    width: "100%",
                    height: "6px",
                    background: "#e9ecef",
                    borderRadius: "10px",
                    overflow: "hidden",
                    marginBottom: "0.5rem"
                  }}>
                    <div style={{
                      width: `${Math.min(100, Math.max(10, (uni.tuitionMax / 65000) * 100))}%`,
                      height: "100%",
                      background: "var(--primary)",
                      borderRadius: "10px"
                    }}></div>
                  </div>

                  {/* Acceptance rate */}
                  <div style={{
                    fontSize: "0.8rem",
                    color: "var(--text)",
                    opacity: 0.5,
                    marginBottom: "1rem"
                  }}>
                    Acceptance rate: {uni.acceptanceRate}
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button
                    onClick={() => {
                      setActiveUniversity(uni);
                      setActiveTab("overview");
                      setIsSubmitted(false);
                      setFormName("");
                      setFormEmail("");
                      setFormMessage("");
                      setFormErrors({});
                    }}
                    style={{
                      flex: 1,
                      padding: "0.75rem",
                      borderRadius: "12px",
                      border: "none",
                      background: "#f1f3f5",
                      color: "var(--text)",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#e9ecef"}
                    onMouseLeave={e => e.currentTarget.style.background = "#f1f3f5"}
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      setActiveUniversity(uni);
                      setActiveTab("inquiry");
                      setIsSubmitted(false);
                      setFormName("");
                      setFormEmail("");
                      setFormMessage("");
                      setFormErrors({});
                    }}
                    style={{
                      flex: 1,
                      padding: "0.75rem",
                      borderRadius: "12px",
                      border: "none",
                      background: "var(--primary)",
                      color: "white",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "var(--primary-hover)"}
                    onMouseLeave={e => e.currentTarget.style.background = "var(--primary)"}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredUniversities.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: "5rem 2rem",
            background: "white",
            borderRadius: "24px",
            border: "1px solid rgba(10, 28, 58, 0.05)"
          }}>
            <FaFilter style={{ fontSize: "3rem", color: "#adb5bd", opacity: 0.5, marginBottom: "1rem" }} />
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text)" }}>No Universities Found</h3>
            <p style={{ opacity: 0.6, color: "var(--text)", marginTop: "0.5rem" }}>
              Try adjusting your filter checkboxes or clearing your search query.
            </p>
          </div>
        )}
      </div>

      {/* Mobile Sticky Filters Trigger Button */}
      <button 
        className="mobile-filter-fab"
        onClick={() => setIsMobileFilterOpen(true)}
      >
        <FaFilter style={{ fontSize: "0.85rem" }} />
        <span>Filters</span>
        {activeFiltersCount > 0 && (
          <span style={{
            background: "white",
            color: "var(--primary)",
            borderRadius: "50%",
            width: "18px",
            height: "18px",
            fontSize: "0.75rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "0.25rem",
            fontWeight: 800
          }}>
            {activeFiltersCount}
          </span>
        )}
      </button>

      {/* Mobile slide-up Bottom Sheet */}
      {isMobileFilterOpen && (
        <div 
          className="bottom-sheet-backdrop"
          onClick={() => setIsMobileFilterOpen(false)}
        />
      )}
      <div className={`bottom-sheet-container ${isMobileFilterOpen ? "open" : ""}`}>
        <div className="bottom-sheet-drag-handle" />
        <div className="bottom-sheet-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FaFilter style={{ color: "var(--primary)", fontSize: "0.95rem" }} />
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, margin: 0, fontFamily: "'Baloo 2', cursive" }}>Filters</h3>
          </div>
          <button 
            onClick={() => setIsMobileFilterOpen(false)}
            style={{ background: "none", border: "none", fontSize: "1.25rem", cursor: "pointer", color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <FaXmark />
          </button>
        </div>
        <div className="bottom-sheet-content">
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            {/* Country Filters */}
            <div>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--text)", marginBottom: "0.75rem", fontFamily: "'Baloo 2', cursive" }}>
                Country
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <CheckboxItem label="All Countries" checked={selectedCountries.includes("All")} onChange={() => handleFilterChange("country", "All")} />
                <CheckboxItem label="UK" code="gb" checked={selectedCountries.includes("UK")} onChange={() => handleFilterChange("country", "UK")} />
                <CheckboxItem label="USA" code="us" checked={selectedCountries.includes("USA")} onChange={() => handleFilterChange("country", "USA")} />
                <CheckboxItem label="Canada" code="ca" checked={selectedCountries.includes("Canada")} onChange={() => handleFilterChange("country", "Canada")} />
                <CheckboxItem label="Australia" code="au" checked={selectedCountries.includes("Australia")} onChange={() => handleFilterChange("country", "Australia")} />
                <CheckboxItem label="Germany" code="de" checked={selectedCountries.includes("Germany")} onChange={() => handleFilterChange("country", "Germany")} />
                <CheckboxItem label="Malaysia" code="my" checked={selectedCountries.includes("Malaysia")} onChange={() => handleFilterChange("country", "Malaysia")} />
              </div>
            </div>

            {/* World Ranking Filters */}
            <div>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--text)", marginBottom: "0.75rem", fontFamily: "'Baloo 2', cursive" }}>
                World Ranking
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <CheckboxItem label="All Rankings" checked={selectedRankings.includes("All")} onChange={() => handleFilterChange("ranking", "All")} />
                <CheckboxItem label="Rank 1-10" checked={selectedRankings.includes("1-10")} onChange={() => handleFilterChange("ranking", "1-10")} />
                <CheckboxItem label="Rank 11-50" checked={selectedRankings.includes("11-50")} onChange={() => handleFilterChange("ranking", "11-50")} />
                <CheckboxItem label="Rank 51-100" checked={selectedRankings.includes("51-100")} onChange={() => handleFilterChange("ranking", "51-100")} />
                <CheckboxItem label="Rank 100+" checked={selectedRankings.includes("100+")} onChange={() => handleFilterChange("ranking", "100+")} />
              </div>
            </div>

            {/* Subject Area Filters */}
            <div>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--text)", marginBottom: "0.75rem", fontFamily: "'Baloo 2', cursive" }}>
                Subject Area
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <CheckboxItem label="All Subjects" checked={selectedSubjects.includes("All")} onChange={() => handleFilterChange("subject", "All")} />
                <CheckboxItem label="Engineering" checked={selectedSubjects.includes("Engineering")} onChange={() => handleFilterChange("subject", "Engineering")} />
                <CheckboxItem label="Business" checked={selectedSubjects.includes("Business")} onChange={() => handleFilterChange("subject", "Business")} />
                <CheckboxItem label="Medicine" checked={selectedSubjects.includes("Medicine")} onChange={() => handleFilterChange("subject", "Medicine")} />
                <CheckboxItem label="Arts" checked={selectedSubjects.includes("Arts")} onChange={() => handleFilterChange("subject", "Arts")} />
                <CheckboxItem label="Science" checked={selectedSubjects.includes("Science")} onChange={() => handleFilterChange("subject", "Science")} />
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-sheet-footer">
          <button 
            onClick={() => setIsMobileFilterOpen(false)}
            style={{
              width: "100%",
              padding: "0.85rem",
              background: "var(--primary)",
              color: "white",
              fontWeight: 800,
              fontSize: "0.95rem",
              border: "none",
              borderRadius: "14px",
              cursor: "pointer",
              fontFamily: "'Outfit', sans-serif"
            }}
          >
            Apply & Show {filteredUniversities.length} Universities
          </button>
        </div>
      </div>

      {/* University Details Modal Overlay */}
      {activeUniversity && (
        <div
          onClick={() => setActiveUniversity(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(10, 28, 58, 0.45)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 3000,
            padding: "1rem",
            animation: "fadeIn 0.25s ease-out"
          }}
        >
          {/* Modal Container */}
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              borderRadius: "28px",
              width: "100%",
              maxWidth: "800px",
              maxHeight: "85vh",
              overflow: "hidden",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              border: "1px solid rgba(224, 145, 0, 0.1)",
              animation: "slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveUniversity(null)}
              style={{
                position: "absolute",
                top: "1.25rem",
                right: "1.25rem",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.9)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#1e293b",
                cursor: "pointer",
                zIndex: 10,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "all 0.2s"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "rotate(90deg) scale(1.05)";
                e.currentTarget.style.background = "#ffffff";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.9)";
              }}
            >
              <FaXmark style={{ fontSize: "1.1rem" }} />
            </button>

            {/* Header/Banner Image */}
            <div className="modal-banner" style={{ height: "240px", position: "relative", width: "100%", flexShrink: 0 }}>
              <img
                src={activeUniversity.image}
                alt={activeUniversity.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(10, 28, 58, 0.95) 0%, rgba(10, 28, 58, 0.35) 100%)",
                zIndex: 1
              }} />

              {/* Title & Location details inside the banner */}
              <div style={{
                position: "absolute",
                bottom: "1.25rem",
                left: "1.5rem",
                right: "1.5rem",
                zIndex: 2,
                color: "white"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  {activeUniversity.isOfficialPartner && (
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      background: "rgba(255, 255, 255, 0.95)",
                      color: "#1E293B",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      padding: "0.3rem 0.6rem",
                      borderRadius: "20px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
                      backdropFilter: "blur(4px)",
                      border: "1px solid rgba(24, 119, 242, 0.15)"
                    }}>
                      <BsPatchCheckFill style={{ color: "#1877F2", fontSize: "0.9rem", flexShrink: 0 }} /> Official Partner
                    </span>
                  )}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    background: "rgba(255, 255, 255, 0.95)",
                    color: "#fab005",
                    fontSize: "0.85rem",
                    fontWeight: 800,
                    padding: "0.3rem 0.6rem",
                    borderRadius: "20px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
                    backdropFilter: "blur(4px)",
                    border: "1px solid rgba(250, 176, 5, 0.2)"
                  }}>
                    <FaStar style={{ fontSize: "0.8rem" }} />
                    <span>Rank {activeUniversity.rank}</span>
                  </div>
                </div>
                <h2 className="modal-banner-title" style={{
                  fontSize: "1.85rem",
                  fontWeight: 800,
                  fontFamily: "'Baloo 2', cursive",
                  margin: 0,
                  lineHeight: 1.2,
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.4)"
                }}>
                  {activeUniversity.name}
                </h2>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "white",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  marginTop: "0.5rem",
                  opacity: 0.9
                }}>
                  <FaLocationDot style={{ color: "#ffffff", opacity: 0.85 }} />
                  <img
                    src={`https://flagcdn.com/w40/${
                      activeUniversity.country.toLowerCase() === "uk" ? "gb" :
                      activeUniversity.country.toLowerCase() === "usa" ? "us" :
                      activeUniversity.country.toLowerCase() === "canada" ? "ca" :
                      activeUniversity.country.toLowerCase() === "australia" ? "au" :
                      activeUniversity.country.toLowerCase() === "germany" ? "de" :
                      activeUniversity.country.toLowerCase() === "malaysia" ? "my" : "un"
                    }.png`}
                    alt={`${activeUniversity.country} flag`}
                    style={{
                      height: "11px",
                      borderRadius: "2px",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.2)"
                    }}
                  />
                  <span style={{ textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}>{activeUniversity.location}</span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div style={{
              display: "flex",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
              background: "#f8fafc",
              padding: "0 1.5rem",
              flexShrink: 0
            }}>
              {(["overview", "programs", "inquiry"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "1.1rem 1.25rem",
                    fontSize: "0.95rem",
                    fontWeight: activeTab === tab ? 800 : 600,
                    color: activeTab === tab ? "var(--primary)" : "#64748b",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    position: "relative",
                    fontFamily: "'Outfit', sans-serif",
                    textTransform: "capitalize",
                    transition: "all 0.2s"
                  }}
                >
                  {tab === "inquiry" ? "Admission Inquiry" : tab === "programs" ? "Academic Programs" : tab}
                  {activeTab === tab && (
                    <div style={{
                      position: "absolute",
                      bottom: 0,
                      left: "1.25rem",
                      right: "1.25rem",
                      height: "3px",
                      background: "var(--primary)",
                      borderRadius: "3px 3px 0 0"
                    }} />
                  )}
                </button>
              ))}
            </div>

            {/* Scrollable Content Pane */}
            <div
              className="modal-content-pane"
              style={{
                padding: "1.75rem",
                overflowY: "auto",
                flex: 1,
                backgroundColor: "#ffffff",
                fontSize: "1rem",
                color: "#334155"
              }}
            >
              {/* Tab 1: Overview */}
              {activeTab === "overview" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", animation: "fadeInTab 0.2s ease-out" }}>
                  <div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text)", marginBottom: "0.5rem", fontFamily: "'Baloo 2', cursive" }}>
                      About the University
                    </h3>
                    <p style={{ lineHeight: 1.6, color: "#475569" }}>
                      {activeUniversity.description}
                    </p>
                  </div>

                  {/* Fact Grid */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: "1rem",
                    background: "#f8fafc",
                    padding: "1.25rem",
                    borderRadius: "16px",
                    border: "1px solid rgba(0, 0, 0, 0.03)"
                  }}>
                    <div>
                      <span style={{ fontSize: "0.75rem", color: "#94a3b8", display: "block", textTransform: "uppercase", fontWeight: 700 }}>Established</span>
                      <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#334155" }}>{activeUniversity.established}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: "0.75rem", color: "#94a3b8", display: "block", textTransform: "uppercase", fontWeight: 700 }}>Acceptance Rate</span>
                      <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#334155" }}>{activeUniversity.acceptanceRate}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: "0.75rem", color: "#94a3b8", display: "block", textTransform: "uppercase", fontWeight: 700 }}>Courses Available</span>
                      <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#334155" }}>{activeUniversity.courses} Programs</span>
                    </div>
                    <div>
                      <span style={{ fontSize: "0.75rem", color: "#94a3b8", display: "block", textTransform: "uppercase", fontWeight: 700 }}>Est. Tuition / Year</span>
                      <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#334155" }}>
                        ${activeUniversity.tuitionMin.toLocaleString()} - ${activeUniversity.tuitionMax.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text)", marginBottom: "0.6rem", fontFamily: "'Baloo 2', cursive" }}>
                      Entry Requirements (International Students)
                    </h3>
                    <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem", paddingLeft: "1.2rem", color: "#475569" }}>
                      {activeUniversity.requirements.map((req, idx) => (
                        <li key={idx} style={{ lineHeight: 1.5, fontSize: "0.95rem" }}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Tab 2: Academic Programs */}
              {activeTab === "programs" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", animation: "fadeInTab 0.2s ease-out" }}>
                  <div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text)", marginBottom: "0.75rem", fontFamily: "'Baloo 2', cursive" }}>
                      Subject Areas Offered
                    </h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {activeUniversity.subjectAreas.map((subj, idx) => (
                        <span
                          key={idx}
                          style={{
                            background: "rgba(224, 145, 0, 0.08)",
                            color: "var(--primary)",
                            padding: "0.4rem 0.8rem",
                            borderRadius: "20px",
                            fontSize: "0.85rem",
                            fontWeight: 700
                          }}
                        >
                          {subj}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text)", marginBottom: "0.75rem", fontFamily: "'Baloo 2', cursive" }}>
                      Popular Programs
                    </h3>
                    <div className="popular-programs-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                      {activeUniversity.popularPrograms.map((prog, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            padding: "0.75rem 1rem",
                            background: "#f8fafc",
                            borderRadius: "12px",
                            border: "1px solid rgba(0, 0, 0, 0.02)"
                          }}
                        >
                          <div style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: "var(--primary)",
                            flexShrink: 0
                          }} />
                          <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#334155" }}>{prog}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Inquiry Form */}
              {activeTab === "inquiry" && (
                <div style={{ position: "relative", animation: "fadeInTab 0.25s ease-out" }}>
                  {isSubmitted ? (
                    /* Success State */
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "2.5rem 1rem",
                      textAlign: "center",
                      animation: "scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
                    }}>
                      <div style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "50%",
                        background: "rgba(34, 197, 94, 0.1)",
                        color: "#22c55e",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.75rem",
                        marginBottom: "1.25rem"
                      }}>
                        <FaCheck />
                      </div>
                      <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1e293b", fontFamily: "'Baloo 2', cursive", marginBottom: "0.5rem" }}>
                        Inquiry Received!
                      </h3>
                      <p style={{ color: "#64748b", maxWidth: "420px", margin: "0 auto 1.5rem auto", lineHeight: 1.6, fontSize: "0.95rem" }}>
                        Thank you for your interest in {activeUniversity.name}. One of our senior study-abroad advisors from Rowshanara Edu will contact you at <strong>{formEmail}</strong> within 24 hours.
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        style={{
                          background: "#f1f3f5",
                          color: "var(--text)",
                          padding: "0.6rem 1.5rem",
                          borderRadius: "10px",
                          fontWeight: 700,
                          cursor: "pointer"
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = "#e9ecef"}
                        onMouseLeave={e => e.currentTarget.style.background = "#f1f3f5"}
                      >
                        Submit another inquiry
                      </button>
                    </div>
                  ) : (
                    /* The Inquiry Form */
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const errors: { name?: string; email?: string } = {};
                        if (!formName.trim()) errors.name = "Full Name is required";
                        if (!formEmail.trim()) {
                          errors.email = "Email Address is required";
                        } else if (!/\S+@\S+\.\S+/.test(formEmail)) {
                          errors.email = "Please enter a valid email address";
                        }

                        if (Object.keys(errors).length > 0) {
                          setFormErrors(errors);
                          return;
                        }

                        setFormErrors({});
                        setIsSubmitting(true);

                        // Simulate API Submitting
                        setTimeout(() => {
                          setIsSubmitting(false);
                          setIsSubmitted(true);
                        }, 1000);
                      }}
                      style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
                    >
                      <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text)", marginBottom: "0.25rem", fontFamily: "'Baloo 2', cursive" }}>
                        Contact our Advisor about {activeUniversity.name}
                      </h3>
                      <p style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "-0.6rem", marginBottom: "0.25rem" }}>
                        Fill out the details below to receive specialized admissions support and scholarship advice for free.
                      </p>

                      <div className="inquiry-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        {/* Name Field */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                          <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#475569" }}>Full Name *</label>
                          <input
                            type="text"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            disabled={isSubmitting}
                            placeholder="John Doe"
                            style={{
                              padding: "0.7rem 0.9rem",
                              borderRadius: "10px",
                              border: formErrors.name ? "1px solid #ef4444" : "1.5px solid #cbd5e1",
                              fontSize: "0.9rem",
                              outline: "none"
                            }}
                          />
                          {formErrors.name && (
                            <span style={{ fontSize: "0.75rem", color: "#ef4444", fontWeight: 600 }}>{formErrors.name}</span>
                          )}
                        </div>

                        {/* Email Field */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                          <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#475569" }}>Email Address *</label>
                          <input
                            type="email"
                            value={formEmail}
                            onChange={(e) => setFormEmail(e.target.value)}
                            disabled={isSubmitting}
                            placeholder="john@example.com"
                            style={{
                              padding: "0.7rem 0.9rem",
                              borderRadius: "10px",
                              border: formErrors.email ? "1px solid #ef4444" : "1.5px solid #cbd5e1",
                              fontSize: "0.9rem",
                              outline: "none"
                            }}
                          />
                          {formErrors.email && (
                            <span style={{ fontSize: "0.75rem", color: "#ef4444", fontWeight: 600 }}>{formErrors.email}</span>
                          )}
                        </div>
                      </div>

                      {/* Degree Program Selector */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                        <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#475569" }}>Intended Level of Study</label>
                        <select
                          value={formDegree}
                          onChange={(e) => setFormDegree(e.target.value)}
                          disabled={isSubmitting}
                          style={{
                            padding: "0.7rem 0.9rem",
                            borderRadius: "10px",
                            border: "1.5px solid #cbd5e1",
                            fontSize: "0.9rem",
                            outline: "none",
                            background: "white"
                          }}
                        >
                          <option value="Undergraduate">Undergraduate (Bachelor's)</option>
                          <option value="Graduate">Graduate (Master's / MBA)</option>
                          <option value="Doctoral">Doctoral (PhD)</option>
                          <option value="Diploma">Diploma / Foundation Program</option>
                        </select>
                      </div>

                      {/* Message Field */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                        <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#475569" }}>Message / Specific Questions</label>
                        <textarea
                          rows={3}
                          value={formMessage}
                          onChange={(e) => setFormMessage(e.target.value)}
                          disabled={isSubmitting}
                          placeholder="Tell us about your preferred course, budget, or other questions..."
                          style={{
                            padding: "0.7rem 0.9rem",
                            borderRadius: "10px",
                            border: "1.5px solid #cbd5e1",
                            fontSize: "0.9rem",
                            outline: "none",
                            resize: "vertical",
                            fontFamily: "inherit"
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                          background: "var(--primary)",
                          color: "white",
                          padding: "0.8rem",
                          borderRadius: "12px",
                          fontWeight: 800,
                          fontSize: "0.95rem",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.5rem",
                          transition: "all 0.2s"
                        }}
                        onMouseEnter={e => {
                          if (!isSubmitting) e.currentTarget.style.background = "var(--primary-hover)";
                        }}
                        onMouseLeave={e => {
                          if (!isSubmitting) e.currentTarget.style.background = "var(--primary)";
                        }}
                      >
                        {isSubmitting ? "Submitting Inquiry..." : "Submit Admission Inquiry"}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Style Sheet block for animations & responsive fixes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideUpMobile {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes fadeInTab {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        /* Custom Scrollbar for Modal content */
        .modal-content-pane::-webkit-scrollbar {
          width: 6px;
        }
        .modal-content-pane::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        .modal-content-pane::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .modal-content-pane::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        @media (max-width: 768px) {
          .modal-container {
            max-height: 92vh !important;
            border-radius: 24px 24px 0 0 !important;
            margin-top: auto !important;
            animation: slideUpMobile 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
          .modal-banner {
            height: 180px !important;
          }
          .modal-banner-title {
            font-size: 1.4rem !important;
          }
          .modal-content-pane {
            padding: 1.25rem !important;
          }
          .popular-programs-grid {
            grid-template-columns: 1fr !important;
          }
          .inquiry-form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
