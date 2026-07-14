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
