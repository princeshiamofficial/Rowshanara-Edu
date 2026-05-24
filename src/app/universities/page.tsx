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
  }: {
    label: string;
    checked: boolean;
    onChange: () => void;
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
        {label}
      </label>
    );
  };

  return (
    <div className="hero-gradient" style={{ minHeight: "100vh", paddingTop: "140px", paddingBottom: "6rem" }}>
      {/* Header Banner */}
      <section style={{
        width: "95%",
        maxWidth: "1280px",
        margin: "0 auto 2.5rem auto",
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
        marginTop: "2.5rem"
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
          <div style={{ marginBottom: "2rem" }}>
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
              <CheckboxItem label="UK" checked={selectedCountries.includes("UK")} onChange={() => handleFilterChange("country", "UK")} />
              <CheckboxItem label="USA" checked={selectedCountries.includes("USA")} onChange={() => handleFilterChange("country", "USA")} />
              <CheckboxItem label="Canada" checked={selectedCountries.includes("Canada")} onChange={() => handleFilterChange("country", "Canada")} />
              <CheckboxItem label="Australia" checked={selectedCountries.includes("Australia")} onChange={() => handleFilterChange("country", "Australia")} />
              <CheckboxItem label="Germany" checked={selectedCountries.includes("Germany")} onChange={() => handleFilterChange("country", "Germany")} />
              <CheckboxItem label="Malaysia" checked={selectedCountries.includes("Malaysia")} onChange={() => handleFilterChange("country", "Malaysia")} />
            </div>
          </div>

          {/* World Ranking Filters */}
          <div style={{ marginBottom: "2rem" }}>
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
                  padding: "2rem",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)",
                  border: "1px solid rgba(10, 28, 58, 0.05)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "all 0.3s ease"
                }}
                className="glass-card-hover"
              >
                <div>
                  {/* Top line row */}
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1.25rem"
                  }}>
                    {/* Left: letter logo & partner label */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        background: "#1971c2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: 800,
                        fontSize: "1.2rem",
                        fontFamily: "'Baloo 2', cursive"
                      }}>
                        {uni.name[0]}
                      </div>
                      {uni.isOfficialPartner && (
                        <span style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.25rem",
                          background: "#e6fcf5",
                          color: "#0ca678",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          padding: "0.3rem 0.6rem",
                          borderRadius: "8px",
                          marginLeft: "0.75rem"
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
                      color: "#fab005",
                      fontSize: "0.9rem",
                      fontWeight: 800
                    }}>
                      <FaArrowTrendUp />
                      <span>#{uni.rank}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: "1.35rem",
                    fontWeight: 800,
                    color: "var(--text)",
                    marginBottom: "0.75rem",
                    fontFamily: "'Baloo 2', cursive",
                    lineHeight: 1.25
                  }}>
                    {uni.name}
                  </h3>

                  {/* Location detail */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "var(--text)",
                    opacity: 0.65,
                    fontSize: "0.9rem",
                    marginBottom: "0.5rem"
                  }}>
                    <FaLocationDot style={{ color: "#adb5bd" }} />
                    <span>{uni.location}</span>
                  </div>

                  {/* Courses count */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "var(--text)",
                    opacity: 0.65,
                    fontSize: "0.9rem",
                    marginBottom: "0.75rem"
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
                    marginBottom: "0.5rem"
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
                    marginBottom: "0.75rem"
                  }}>
                    <div style={{
                      width: `${Math.min(100, Math.max(10, (uni.tuitionMax / 65000) * 100))}%`,
                      height: "100%",
                      background: "#1c7ed6",
                      borderRadius: "10px"
                    }}></div>
                  </div>

                  {/* Acceptance rate */}
                  <div style={{
                    fontSize: "0.8rem",
                    color: "var(--text)",
                    opacity: 0.5,
                    marginBottom: "1.5rem"
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
                      background: "#1c7ed6",
                      color: "white",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#1971c2"}
                    onMouseLeave={e => e.currentTarget.style.background = "#1c7ed6"}
                  >
                    Apply Now
                  </button>
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
      <section className="cta-section" style={{ marginTop: "6rem", marginBottom: "4rem" }}>
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
