import React from "react";

export default function ComparisonTable() {
  return (
    <section className="container" style={{ marginTop: "2rem", marginBottom: "1.5rem" }}>
      <h2 style={{
        textAlign: "center",
        fontSize: "clamp(1.35rem, 5.5vw, 2.5rem)",
        fontWeight: 800,
        color: "#0f172a",
        marginBottom: "1.75rem",
        fontFamily: "'Baloo 2', cursive"
      }}>
        Destination Comparison
      </h2>

      <div style={{
        background: "#ffffff",
        padding: "2rem",
        borderRadius: "28px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)",
        border: "1px solid #e2e8f0",
        overflowX: "auto"
      }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          minWidth: "750px",
          textAlign: "center"
        }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--primary)" }}>
              <th style={{
                textAlign: "left",
                padding: "1.25rem 1rem",
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "#0f172a",
                fontFamily: "'Baloo 2', cursive"
              }}>
                Metric
              </th>
              {[
                { code: "GB", name: "UK" },
                { code: "CA", name: "Canada" },
                { code: "AU", name: "Australia" },
                { code: "US", name: "USA" }
              ].map((country, idx) => (
                <th key={idx} style={{
                  padding: "1.25rem 1rem",
                  fontSize: "1.05rem",
                  color: "#0f172a",
                  fontFamily: "'Baloo 2', cursive"
                }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                    <img 
                      src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`} 
                      alt={`${country.name} flag`} 
                      style={{ 
                        height: "14px", 
                        borderRadius: "2px",
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.15)"
                      }} 
                    />
                    <span style={{ fontWeight: 800 }}>{country.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { metric: "Tuition Cost", uk: "$15-35K", ca: "$12-28K", au: "$13-32K", us: "$20-50K" },
              { metric: "Living Cost", uk: "$12-18K", ca: "$15-20K", au: "$14-19K", us: "$18-25K" },
              { metric: "Work Rights", uk: "20 hrs/week", ca: "20 hrs/week", au: "20 hrs/week", us: "20 hrs/week" },
              { metric: "PR Opportunity", uk: "Yes", ca: "Yes", au: "Yes", us: "Through OPT" },
              { metric: "Language", uk: "English", ca: "English/French", au: "English", us: "English" },
              { metric: "Job Market", uk: "Excellent", ca: "Excellent", au: "Very Good", us: "Excellent" },
              { metric: "Visa Difficulty", uk: "Moderate", ca: "Easy", au: "Easy", us: "Moderate" }
            ].map((row, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{
                  textAlign: "left",
                  padding: "1.25rem 1rem",
                  fontWeight: 700,
                  color: "#0f172a",
                  fontSize: "1rem",
                  fontFamily: "'Baloo 2', cursive"
                }}>
                  {row.metric}
                </td>
                <td style={{ padding: "1.25rem 1rem", color: "#475569", fontFamily: "'Comic Neue', cursive", fontSize: "0.95rem" }}>
                  {row.uk}
                </td>
                <td style={{ padding: "1.25rem 1rem", color: "#475569", fontFamily: "'Comic Neue', cursive", fontSize: "0.95rem" }}>
                  {row.ca}
                </td>
                <td style={{ padding: "1.25rem 1rem", color: "#475569", fontFamily: "'Comic Neue', cursive", fontSize: "0.95rem" }}>
                  {row.au}
                </td>
                <td style={{ padding: "1.25rem 1rem", color: "#475569", fontFamily: "'Comic Neue', cursive", fontSize: "0.95rem" }}>
                  {row.us}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
