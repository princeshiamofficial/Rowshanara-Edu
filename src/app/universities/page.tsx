"use client";

import React, { useState, useMemo } from "react";
import { FaMagnifyingGlass, FaFilter, FaLocationDot, FaBookOpen, FaArrowTrendUp, FaCheck } from "react-icons/fa6";

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
}

export default function UniversitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<string[]>(["All"]);
  const [selectedRankings, setSelectedRankings] = useState<string[]>(["All"]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(["All"]);

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
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop"
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
      image: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=600&auto=format&fit=crop"
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
      image: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=600&auto=format&fit=crop"
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
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop"
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
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop"
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
      image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=600&auto=format&fit=crop"
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
      image: "https://images.unsplash.com/photo-1527891751199-7225231a68dd?q=80&w=600&auto=format&fit=crop"
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
      image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop"
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
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=600&auto=format&fit=crop"
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
      image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=600&auto=format&fit=crop"
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
      image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=600&auto=format&fit=crop"
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
      image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=600&auto=format&fit=crop"
    }
  ];

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
            width: "18px",
            height: "18px",
            accentColor: "var(--primary)",
            cursor: "pointer"
          }}
        />
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
    <div className="hero-gradient" style={{ minHeight: "100vh", paddingTop: "140px", paddingBottom: "1.5rem" }}>
      {/* Header Banner */}
      <section style={{
        width: "95%",
        maxWidth: "1280px",
        margin: "0 auto 3rem auto",
        background: "linear-gradient(135deg, rgba(10, 28, 58, 0.88) 0%, rgba(6, 17, 36, 0.94) 100%), url('/hero-bg.png') no-repeat center center",
        backgroundSize: "cover",
        padding: "3.5rem 2rem",
        borderRadius: "28px",
        textAlign: "center",
        color: "white",
        boxShadow: "0 15px 35px rgba(0, 0, 0, 0.15)",
        position: "relative",
        overflow: "hidden"
      }}>
        <div className="container">
          <h1 className="hero-responsive-title" style={{
            fontSize: "clamp(2.25rem, 5vw, 3.25rem)",
            fontWeight: 800,
            marginBottom: "0.75rem",
            color: "white",
            fontFamily: "'Baloo 2', cursive",
            lineHeight: 1.2
          }}>
            Partner Universities
          </h1>
          <p style={{
            fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
            color: "rgba(255, 255, 255, 0.85)",
            maxWidth: "750px",
            margin: "0 auto 1.75rem auto",
            lineHeight: 1.6,
            fontFamily: "'Comic Neue', cursive"
          }}>
            Explore our network of 50+ partner universities across 20+ countries
          </p>

          {/* Integrated Search Input */}
          <div style={{
            position: "relative",
            maxWidth: "680px",
            width: "100%",
            margin: "0 auto",
            display: "flex",
            alignItems: "center"
          }}>
            <FaMagnifyingGlass style={{
              position: "absolute",
              left: "1.25rem",
              color: "rgba(255, 255, 255, 0.5)",
              fontSize: "1.1rem"
            }} />
            <input
              type="text"
              placeholder="Search universities or countries..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "1.1rem 1.1rem 1.1rem 3.25rem",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "14px",
                fontSize: "1rem",
                outline: "none",
                fontFamily: "inherit",
                color: "white",
                transition: "all 0.3s ease",
                backdropFilter: "blur(8px)"
              }}
              onFocus={e => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.45)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)";
              }}
              onBlur={e => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
              }}
            />
          </div>
        </div>
      </section>

      {/* Main Content Dashboard */}
      <section className="container" style={{
        display: "flex",
        gap: "2rem",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        marginTop: "0.5rem"
      }}>
        {/* Left Column - Filter Sidebar */}
        <div style={{
          flex: "1 1 280px",
          maxWidth: "320px",
          width: "100%",
          background: "white",
          borderRadius: "24px",
          padding: "2rem",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)",
          border: "1px solid rgba(10, 28, 58, 0.06)",
          position: "sticky",
          top: "110px"
        }}>
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
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "var(--text)",
            fontFamily: "'Comic Neue', cursive",
            opacity: 0.85
          }}>
            Showing {filteredUniversities.length} universities
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
                          gap: "0.25rem",
                          background: "rgba(230, 252, 245, 0.95)",
                          color: "#0ca678",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          padding: "0.3rem 0.6rem",
                          borderRadius: "8px",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                          backdropFilter: "blur(4px)"
                        }}>
                          <FaCheck style={{ fontSize: "0.7rem", strokeWidth: 3 }} /> Official Partner
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
                      fontSize: "0.9rem",
                      fontWeight: 800,
                      padding: "0.3rem 0.6rem",
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                      backdropFilter: "blur(4px)"
                    }}>
                      <FaArrowTrendUp />
                      <span>#{uni.rank}</span>
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
                      onClick={() => alert(`Showing details for ${uni.name}`)}
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
                      onClick={() => alert(`Starting application process for ${uni.name}`)}
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
      </section>

      {/* CTA Section */}
      <section className="cta-section" style={{ marginTop: "3.5rem", marginBottom: "1.5rem" }}>
        <div className="cta-container">
          <h2 className="cta-title">Ready to Study Abroad?</h2>
          <p className="cta-description">
            Get personalized guidance from our expert counselors. Your first consultation is completely free!
          </p>
          <button className="cta-button" onClick={() => window.location.href = "/contact"}>
            Get Free Counselling Today
          </button>
        </div>
      </section>
    </div>
  );
}
