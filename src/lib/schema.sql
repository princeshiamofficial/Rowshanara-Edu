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

-- Table structure for study services
CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL UNIQUE,
  icon VARCHAR(100) NOT NULL DEFAULT 'FaBookOpen',
  image VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  highlights TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed values for study services
INSERT INTO services (title, icon, image, description, highlights)
VALUES 
('University Admission Counselling', 'FaBookOpen', '/images/services/counselling.png', 'Expert guidance to help you select the perfect university based on your academic profile and career goals.', '["Profile Assessment", "University Shortlisting", "Application Strategy", "Interview Prep"]'),
('Student Visa Processing', 'FaFileLines', '/images/services/visa.png', 'Complete support throughout the visa application process with expert documentation guidance.', '["Document Preparation", "Application Filing", "Interview Training", "Status Tracking"]'),
('Scholarship & Financial Aid Guidance', 'FaBriefcase', '/images/services/scholarship.png', 'Maximize your financial aid opportunities and secure scholarships to reduce your study costs.', '["Scholarship Search", "Application Assistance", "Financial Planning", "Loan Guidance"]'),
('IELTS/SAT/GRE Test Prep Referral', 'FaUsers', '/images/services/test_prep.png', 'Connect with top test preparation centers to achieve your target scores.', '["Center Referrals", "Study Materials", "Mock Tests", "Score Improvement"]'),
('Pre-Departure Orientation', 'FaPlane', '/images/services/pre_departure.png', 'Comprehensive briefing to prepare you for your new life abroad.', '["Cultural Orientation", "Accommodation Guide", "Travel Planning", "Health Insurance"]'),
('Post-Arrival Student Support', 'FaLocationDot', '/images/services/post_arrival.png', 'Continuous support after you arrive at your destination to ensure smooth transition.', '["Arrival Assistance", "Local Orientation", "Ongoing Mentoring", "Emergency Support"]')
ON DUPLICATE KEY UPDATE 
icon=VALUES(icon), image=VALUES(image), description=VALUES(description), highlights=VALUES(highlights);

-- Generic editable content for public site sections
CREATE TABLE IF NOT EXISTS site_content (
  id INT AUTO_INCREMENT PRIMARY KEY,
  section VARCHAR(100) NOT NULL,
  item_key VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255) NULL,
  body TEXT NULL,
  value VARCHAR(255) NULL,
  image_url TEXT NULL,
  link_url TEXT NULL,
  metadata JSON NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_section_item (section, item_key)
);

-- Partner universities used on the public Universities page and admin list
CREATE TABLE IF NOT EXISTS universities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  country VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  courses INT NOT NULL DEFAULT 0,
  tuition_min INT NOT NULL DEFAULT 0,
  tuition_max INT NOT NULL DEFAULT 0,
  acceptance_rate VARCHAR(50) NOT NULL DEFAULT '',
  rank_order INT NOT NULL DEFAULT 0,
  subject_areas TEXT NOT NULL,
  is_official_partner TINYINT(1) NOT NULL DEFAULT 0,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  established INT NOT NULL DEFAULT 0,
  popular_programs TEXT NOT NULL,
  requirements TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Consultation sessions shown in the admin Consultations table
CREATE TABLE IF NOT EXISTS consultations (
  session_id VARCHAR(20) PRIMARY KEY,
  student_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(100) NOT NULL,
  nationality VARCHAR(100) NOT NULL,
  target_country VARCHAR(100) NOT NULL,
  target_level VARCHAR(100) NOT NULL,
  consultant VARCHAR(255) NOT NULL,
  consultant_avatar VARCHAR(10) NOT NULL,
  mode ENUM('Video Call', 'Phone Call', 'In-Person') NOT NULL,
  session_date DATE NOT NULL,
  session_time VARCHAR(20) NOT NULL,
  duration VARCHAR(50) NOT NULL,
  status ENUM('Scheduled', 'Completed', 'Cancelled', 'Pending') NOT NULL DEFAULT 'Pending',
  topic VARCHAR(255) NOT NULL,
  notes TEXT NOT NULL,
  follow_up TINYINT(1) NOT NULL DEFAULT 0,
  avatar VARCHAR(10) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
