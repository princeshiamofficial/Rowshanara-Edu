const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Determine env file path (reads local .env on the server)
const envPath = path.join(__dirname, '../.env');
let envConfig = {};
try {
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        let value = match[2] ? match[2].trim() : '';
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.substring(1, value.length - 1);
        }
        envConfig[match[1]] = value;
      }
    });
  }
} catch (err) {
  console.error("Error reading .env:", err.message);
}

const dbConfig = {
  host: envConfig.DB_HOST || 'localhost',
  port: parseInt(envConfig.DB_PORT || '3306', 10),
  user: envConfig.DB_USER || 'root',
  password: envConfig.DB_PASSWORD || '',
  database: envConfig.DB_NAME || 'rowshanara_edu',
};

const updatedServices = [
  {
    title: "Free Student Counselling",
    icon: "FaBookOpen",
    image: "/images/services/counselling.png",
    description: "Expert guidance to help you select the perfect university and course based on your academic profile and career goals.",
    highlights: JSON.stringify(["Profile Assessment", "Course Selection", "University Shortlisting", "Career Mapping"])
  },
  {
    title: "University Application Service",
    icon: "FaFileLines",
    image: "/images/services/test_prep.png",
    description: "Complete support throughout the university application process, facilitating admission to over 500 partner institutions.",
    highlights: JSON.stringify(["Application Strategy", "Document Review", "SOP Guidance", "Interview Prep"])
  },
  {
    title: "Visa Support Service",
    icon: "FaPlane",
    image: "/images/services/visa.png",
    description: "Specialized support and guidance throughout the student visa application and documentation process.",
    highlights: JSON.stringify(["Visa Requirements Guide", "Documentation Assistance", "Interview Training", "Application Submission"])
  },
  {
    title: "Scholarship Assistance",
    icon: "FaBriefcase",
    image: "/images/services/scholarship.png",
    description: "Maximize your financial aid and scholarship opportunities to reduce tuition and overall study costs.",
    highlights: JSON.stringify(["Scholarship Matching", "Application Support", "Essay Editing", "Financial Guidance"])
  },
  {
    title: "Pre-Departure Orientation",
    icon: "FaUsers",
    image: "/images/services/pre_departure.png",
    description: "Comprehensive briefing sessions to prepare you for your international travel, accommodation, and transition.",
    highlights: JSON.stringify(["Cultural Orientation", "Accommodation Guide", "Travel Planning", "Health Insurance"])
  },
  {
    title: "Post-Arrival Student Support",
    icon: "FaLocationDot",
    image: "/images/services/post_arrival.png",
    description: "Ongoing mentoring and assistance to ensure a smooth transition and settle comfortably in your destination.",
    highlights: JSON.stringify(["Arrival Assistance", "Local Orientation", "Ongoing Mentoring", "Emergency Support"])
  }
];

async function main() {
  console.log("Connecting to Database using environment credentials...");
  console.log(`Host: ${dbConfig.host}, Database: ${dbConfig.database}`);
  
  const connection = await mysql.createConnection(dbConfig);
  try {
    // 1. Update contact information
    console.log("Updating contact_information section in database...");
    
    // Address
    await connection.execute(
      "UPDATE site_content SET body = ? WHERE section = ? AND item_key = ?",
      ["Dhaka Office:\nMNSN Tower, 60 Dilkusha\nDhaka 1000, Bangladesh", "contact_information", "address"]
    );
    
    // Phones
    await connection.execute(
      "UPDATE site_content SET body = ? WHERE section = ? AND item_key = ?",
      ["Bangladesh: +880 1511-710730", "contact_information", "phones"]
    );
    
    // Hours
    await connection.execute(
      "UPDATE site_content SET body = ? WHERE section = ? AND item_key = ?",
      ["Saturday - Wednesday: 10:00 AM - 7:00 PM\nThursday: 10:00 AM - 6:00 PM\nFriday: Closed\nSunday: 10:00 AM - 7:00 PM", "contact_information", "hours"]
    );

    // 2. Update map location
    console.log("Updating map location section in database...");
    const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.7032746401083!2d90.415842!3d23.722288800000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b85a3fa8f5d1%3A0xe541c45f5c862e3d!2sRowshanara%20Edu!5e0!3m2!1sen!2sbd!4v1721245000000!5m2!1sen!2sbd";
    await connection.execute(
      "UPDATE site_content SET value = ? WHERE section = ? AND item_key = ?",
      [mapSrc, "location", "map"]
    );

    // 3. Update Partner Universities stats
    console.log("Updating partner universities count stats in database...");
    await connection.execute(
      "UPDATE site_content SET value = ? WHERE section = ? AND item_key = ?",
      ["500+", "home_stats", "partner_universities"]
    );
    await connection.execute(
      "UPDATE site_content SET value = ? WHERE section = ? AND item_key = ?",
      ["500+", "about_stats", "partner_universities"]
    );
    await connection.execute(
      "UPDATE site_content SET body = ? WHERE section = ? AND item_key = ?",
      ["Established partnerships with 500+ universities", "journey", "partner_network"]
    );
    await connection.execute(
      "UPDATE site_content SET body = ? WHERE section = ? AND item_key = ?",
      ["Partnerships with 500+ universities across 20+ countries.", "why_choose_us", "network"]
    );

    // 4. Update services list
    console.log("Truncating and repopulating services table in database...");
    await connection.execute('TRUNCATE TABLE services');
    for (let i = 0; i < updatedServices.length; i++) {
      const s = updatedServices[i];
      await connection.execute(
        `INSERT INTO services (title, icon, image, description, highlights, sort_order) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [s.title, s.icon, s.image, s.description, s.highlights, i]
      );
    }

    console.log("Production database successfully synced!");

  } catch (err) {
    console.error("Database sync failed:", err.message);
  } finally {
    await connection.end();
  }
}

main();
