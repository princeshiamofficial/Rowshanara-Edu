-- Table structure for admin users
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL DEFAULT '',
  password VARCHAR(255) NOT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table structure for study destinations
CREATE TABLE IF NOT EXISTS destinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(10) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  image VARCHAR(512) NOT NULL DEFAULT '',
  color VARCHAR(20) NOT NULL DEFAULT '#3b82f6',
  is_popular TINYINT(1) NOT NULL DEFAULT 1,
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
INSERT INTO destinations (code, name, image, color, is_popular, region, cost, work, pr, gradient, bullets, cities, visa_info)
VALUES 
('GB', 'United Kingdom', '/uk_hero.png', '#3b82f6', 1, 'Europe', '$15,000 - $35,000/year', '20 hours/week', 'Yes', 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', '["World-class education with prestigious universities", "Rich cultural heritage and diverse student community", "Strong post-study work visa opportunities"]', 'London, Oxford, Cambridge, Manchester', 'Student visa required, processing 3-4 weeks'),
('CA', 'Canada', '/canada_hero.png', '#f43f5e', 1, 'North America', '$12,000 - $28,000/year', '20 hours/week', 'Yes', 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)', '["Top-quality education recognized globally", "Extremely welcoming and multicultural environment", "Post-graduation work permit (PGWP) pathways to PR"]', 'Toronto, Vancouver, Montreal, Waterloo', 'Study permit required, processing 4-8 weeks'),
('AU', 'Australia', '/sydney_opera_house.png', '#f97316', 1, 'Oceania', '$13,000 - $32,000/year', '20 hours/week', 'Yes', 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', '["High academic standards and modern research labs", "Excellent weather, beaches, and student lifestyle", "Post-study work rights and high minimum wage"]', 'Sydney, Melbourne, Brisbane, Adelaide', 'Student visa (Subclass 500) required, processing 2-4 weeks'),
('US', 'USA', '/usa_landmark.png', '#6366f1', 1, 'North America', '$20,000 - $50,000/year', '20 hours/week', 'Through OPT', 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', '["Unmatched flexibility and choice of specializations", "World-leading research and Ivy League institutions", "OPT opportunities (up to 3 years for STEM fields)"]', 'New York, Boston, San Francisco, Chicago', 'F-1 student visa required, processing 1-3 weeks'),
('DE', 'Germany', '/germany_landmark.png', '#10b981', 1, 'Europe', 'Free - $3,000/year', '20 hours/week', 'Yes', 'linear-gradient(135deg, #10b981 0%, #059669 100%)', '["Virtually free tuition at world-class public universities", "Excellent job opportunities and post-study visa (18 months)", "Leader in engineering and technical sciences"]', 'Berlin, Munich, Frankfurt, Hamburg', 'Study visa required, processing 4-6 weeks'),
('NZ', 'New Zealand', '/images/services/pre_departure.png', '#14b8a6', 0, 'Oceania', '$14,000 - $30,000/year', '20 hours/week', 'Yes', 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)', '["All universities ranked in the top 3% globally", "Stunning natural landscapes and safe environment", "Excellent post-study work visa options"]', 'Auckland, Wellington, Christchurch', 'Fee paying student visa required, processing 3-4 weeks')
ON DUPLICATE KEY UPDATE 
name=VALUES(name), image=VALUES(image), color=VALUES(color), is_popular=VALUES(is_popular), region=VALUES(region), cost=VALUES(cost), work=VALUES(work), pr=VALUES(pr), gradient=VALUES(gradient), bullets=VALUES(bullets), cities=VALUES(cities), visa_info=VALUES(visa_info);

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

-- ============================================
-- ROLE-BASED ACCESS CONTROL (RBAC) TABLES
-- ============================================

-- Roles table
CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  is_default TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Permissions table
CREATE TABLE IF NOT EXISTS permissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  module VARCHAR(100) NOT NULL,
  action VARCHAR(50) NOT NULL,
  UNIQUE KEY unique_module_action (module, action)
);

-- Role-Permission mapping
CREATE TABLE IF NOT EXISTS role_permissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role_id INT NOT NULL,
  permission_id INT NOT NULL,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
  FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
  UNIQUE KEY unique_role_perm (role_id, permission_id)
);

-- Admin-Role mapping
CREATE TABLE IF NOT EXISTS admin_roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  admin_id INT NOT NULL,
  role_id INT NOT NULL,
  FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
  UNIQUE KEY unique_admin_role (admin_id, role_id)
);

-- Seed default roles
INSERT INTO roles (name, slug, description, is_default) VALUES
('Super Admin', 'super-admin', 'Full system access including user management and settings', 0),
('Admin', 'admin', 'Content and CRM management, cannot manage users', 0),
('Editor', 'editor', 'Content management only, no delete permissions', 0),
('Counselor', 'counselor', 'Student inquiries and consultation management', 0),
('Viewer', 'viewer', 'Read-only access to all modules', 1)
ON DUPLICATE KEY UPDATE name=VALUES(name), description=VALUES(description);

-- Seed permissions (13 modules x actions)
INSERT INTO permissions (module, action) VALUES
('dashboard', 'view'),
('home_page', 'view'), ('home_page', 'add'), ('home_page', 'edit'), ('home_page', 'delete'),
('services', 'view'), ('services', 'add'), ('services', 'edit'), ('services', 'delete'),
('destinations', 'view'), ('destinations', 'add'), ('destinations', 'edit'), ('destinations', 'delete'),
('universities', 'view'), ('universities', 'add'), ('universities', 'edit'), ('universities', 'delete'),
('about_us', 'view'), ('about_us', 'add'), ('about_us', 'edit'), ('about_us', 'delete'),
('testimonials', 'view'), ('testimonials', 'add'), ('testimonials', 'edit'), ('testimonials', 'delete'),
('faq', 'view'), ('faq', 'add'), ('faq', 'edit'), ('faq', 'delete'),
('team', 'view'), ('team', 'add'), ('team', 'edit'), ('team', 'delete'),
('contact_messages', 'view'), ('contact_messages', 'edit'), ('contact_messages', 'delete'),
('consultations', 'view'), ('consultations', 'edit'),
('admin_users', 'view'), ('admin_users', 'add'), ('admin_users', 'edit'), ('admin_users', 'delete'),
('settings', 'view'), ('settings', 'edit')
ON DUPLICATE KEY UPDATE module=VALUES(module);

-- Assign Super Admin permissions (ALL)
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p WHERE r.slug = 'super-admin'
ON DUPLICATE KEY UPDATE role_id=VALUES(role_id);

-- Assign Admin permissions (no admin_users, no settings-delete)
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.slug = 'admin'
AND NOT (p.module = 'admin_users')
AND NOT (p.module = 'settings' AND p.action = 'delete')
ON DUPLICATE KEY UPDATE role_id=VALUES(role_id);

-- Assign Editor permissions (content only, no delete)
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.slug = 'editor'
AND p.module IN ('dashboard', 'home_page', 'services', 'destinations', 'universities', 'about_us', 'testimonials', 'faq', 'team', 'contact_messages')
AND p.action != 'delete'
ON DUPLICATE KEY UPDATE role_id=VALUES(role_id);

-- Assign Counselor permissions (CRM only)
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.slug = 'counselor'
AND p.module IN ('dashboard', 'universities', 'contact_messages', 'consultations')
AND p.action IN ('view', 'edit')
ON DUPLICATE KEY UPDATE role_id=VALUES(role_id);

-- Assign Viewer permissions (view only, default)
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.slug = 'viewer'
AND p.action = 'view'
ON DUPLICATE KEY UPDATE role_id=VALUES(role_id);
