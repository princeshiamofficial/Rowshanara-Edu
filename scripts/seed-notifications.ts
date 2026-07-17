import { query } from "@/lib/db";

async function seed() {
  await query(`
    CREATE TABLE IF NOT EXISTS notifications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      type VARCHAR(40) NOT NULL,
      title VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      link VARCHAR(255) NULL,
      is_read TINYINT(1) NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const samples = [
    { type: "message", title: "New Contact Message", message: "Rahim Ahmed sent a new message from Dhaka", link: "/admin/dashboard/messages", is_read: 0 },
    { type: "consultation", title: "Consultation Status Updated", message: "Session S001 is now Scheduled", link: "/admin/dashboard/consultations", is_read: 1 },
    { type: "message", title: "New Contact Message", message: "Fatima Khan inquired about UK universities", link: "/admin/dashboard/messages", is_read: 0 },
    { type: "consultation", title: "Consultation Status Updated", message: "Session S045 is now Completed", link: "/admin/dashboard/consultations", is_read: 0 },
    { type: "message", title: "New Contact Message", message: "Karim Uddin wants to study in Canada", link: "/admin/dashboard/messages", is_read: 1 },
    { type: "consultation", title: "Consultation Status Updated", message: "Session S089 is now Pending", link: "/admin/dashboard/consultations", is_read: 0 },
    { type: "message", title: "New Contact Message", message: "Nasreen Akter requested a callback", link: "/admin/dashboard/messages", is_read: 0 },
    { type: "consultation", title: "Consultation Status Updated", message: "Session S102 is now Cancelled", link: "/admin/dashboard/consultations", is_read: 1 },
  ];

  for (const s of samples) {
    await query(
      `INSERT INTO notifications (type, title, message, link, is_read, created_at)
       VALUES (?, ?, ?, ?, ?, DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 7) DAY))`,
      [s.type, s.title, s.message, s.link, s.is_read]
    );
  }

  console.log(`Inserted ${samples.length} demo notifications`);
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
