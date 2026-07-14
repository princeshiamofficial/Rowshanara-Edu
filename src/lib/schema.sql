-- Table structure for study destinations
CREATE TABLE IF NOT EXISTS destinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(10) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  region VARCHAR(100) NOT NULL,
  cost VARCHAR(255) NOT NULL,
  work VARCHAR(255) NOT NULL,
  pr VARCHAR(100) NOT NULL,
  gradient VARCHAR(255) NOT NULL,
  bullets TEXT NOT NULL, -- Stored as JSON array string
  cities VARCHAR(255) NOT NULL,
  visa_info TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed values for study destinations
INSERT INTO destinations (code, name, region, cost, work, pr, gradient, bullets, cities, visa_info)
VALUES 
('GB', 'United Kingdom', 'Europe', '$15,000 - $35,000/year', '20 hours/week', 'Yes', 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', '["World-class education with prestigious universities", "Rich cultural heritage and diverse student community", "Strong post-study work visa opportunities"]', 'London, Oxford, Cambridge, Manchester', 'Student visa required, processing 3-4 weeks'),
('CA', 'Canada', 'North America', '$12,000 - $28,000/year', '20 hours/week', 'Yes', 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)', '["Top-quality education recognized globally", "Extremely welcoming and multicultural environment", "Post-graduation work permit (PGWP) pathways to PR"]', 'Toronto, Vancouver, Montreal, Waterloo', 'Study permit required, processing 4-8 weeks'),
('AU', 'Australia', 'Oceania', '$13,000 - $32,000/year', '20 hours/week', 'Yes', 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', '["High academic standards and modern research labs", "Excellent weather, beaches, and student lifestyle", "Post-study work rights and high minimum wage"]', 'Sydney, Melbourne, Brisbane, Adelaide', 'Student visa (Subclass 500) required, processing 2-4 weeks'),
('US', 'USA', 'North America', '$20,000 - $50,000/year', '20 hours/week', 'Through OPT', 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', '["Unmatched flexibility and choice of specializations", "World-leading research and Ivy League institutions", "OPT opportunities (up to 3 years for STEM fields)"]', 'New York, Boston, San Francisco, Chicago', 'F-1 student visa required, processing 1-3 weeks'),
('DE', 'Germany', 'Europe', 'Free - $3,000/year', '20 hours/week', 'Yes', 'linear-gradient(135deg, #10b981 0%, #059669 100%)', '["Virtually free tuition at world-class public universities", "Excellent job opportunities and post-study visa (18 months)", "Leader in engineering and technical sciences"]', 'Berlin, Munich, Frankfurt, Hamburg', 'Study visa required, processing 4-6 weeks'),
('NZ', 'New Zealand', 'Oceania', '$14,000 - $30,000/year', '20 hours/week', 'Yes', 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)', '["All universities ranked in the top 3% globally", "Stunning natural landscapes and safe environment", "Excellent post-study work visa options"]', 'Auckland, Wellington, Christchurch', 'Fee paying student visa required, processing 3-4 weeks')
ON DUPLICATE KEY UPDATE 
name=VALUES(name), region=VALUES(region), cost=VALUES(cost), work=VALUES(work), pr=VALUES(pr), gradient=VALUES(gradient), bullets=VALUES(bullets), cities=VALUES(cities), visa_info=VALUES(visa_info);
