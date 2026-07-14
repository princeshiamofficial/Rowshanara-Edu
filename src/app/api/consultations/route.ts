import { NextResponse } from "next/server";
import { query } from "@/lib/db";

type ConsultStatus = "Scheduled" | "Completed" | "Cancelled" | "Pending";
type ConsultMode = "Video Call" | "Phone Call" | "In-Person";

const defaultConsultations = [
  { id: "CON-1041", studentName: "Nusrat Jahan", email: "nusrat@example.com", phone: "+880 1711-000002", nationality: "Bangladeshi", targetCountry: "Canada", targetLevel: "Bachelors", consultant: "Anika Sultana", consultantAvatar: "AS", mode: "Video Call", date: "2026-06-12", time: "10:00 AM", duration: "45 min", status: "Scheduled", topic: "University shortlisting for BBA Finance", notes: "Student prefers Toronto or Vancouver. Budget: $18k/yr.", followUp: false, avatar: "NJ" },
  { id: "CON-1040", studentName: "Arif Chowdhury", email: "arif@example.com", phone: "+880 1711-000005", nationality: "Bangladeshi", targetCountry: "Australia", targetLevel: "Masters", consultant: "Rafiq Ahmed", consultantAvatar: "RA", mode: "Phone Call", date: "2026-06-11", time: "02:30 PM", duration: "30 min", status: "Scheduled", topic: "Visa requirements and timeline", notes: "Previously rejected Canadian visa. Needs alternate route.", followUp: true, avatar: "AC" },
  { id: "CON-1039", studentName: "Farhana Begum", email: "farhana@example.com", phone: "+880 1711-000012", nationality: "Bangladeshi", targetCountry: "New Zealand", targetLevel: "Bachelors", consultant: "Anika Sultana", consultantAvatar: "AS", mode: "In-Person", date: "2026-06-10", time: "11:00 AM", duration: "60 min", status: "Scheduled", topic: "IELTS score review & application plan", notes: "IELTS score 5.5, needs 6.5. Counselling for retake.", followUp: false, avatar: "FB" },
  { id: "CON-1038", studentName: "Imran Hossain", email: "imran@example.com", phone: "+880 1711-000009", nationality: "Bangladeshi", targetCountry: "Germany", targetLevel: "Masters", consultant: "Tariq Hassan", consultantAvatar: "TH", mode: "Video Call", date: "2026-06-09", time: "03:00 PM", duration: "45 min", status: "Completed", topic: "Language requirement & blocked account", notes: "Advised to open Deutsche Bank blocked account. Referred to Goethe-Institut.", followUp: true, avatar: "IH" },
  { id: "CON-1037", studentName: "Karim Uddin", email: "karim@example.com", phone: "+880 1711-000011", nationality: "Bangladeshi", targetCountry: "Netherlands", targetLevel: "Masters", consultant: "Rafiq Ahmed", consultantAvatar: "RA", mode: "Video Call", date: "2026-06-08", time: "10:30 AM", duration: "30 min", status: "Completed", topic: "LLM programme options at Leiden", notes: "Shortlisted Leiden & Utrecht. Follow-up SOP session booked.", followUp: false, avatar: "KU" },
  { id: "CON-1036", studentName: "Rabeya Sultana", email: "rabeya@example.com", phone: "+880 1711-000006", nationality: "Bangladeshi", targetCountry: "United Kingdom", targetLevel: "Masters", consultant: "Anika Sultana", consultantAvatar: "AS", mode: "Phone Call", date: "2026-06-07", time: "04:00 PM", duration: "30 min", status: "Cancelled", topic: "Re-application strategy after rejection", notes: "Student cancelled at last minute. Rescheduling needed.", followUp: true, avatar: "RS" },
  { id: "CON-1035", studentName: "Mehedi Hasan", email: "mehedi@example.com", phone: "+880 1711-000007", nationality: "Bangladeshi", targetCountry: "Canada", targetLevel: "Bachelors", consultant: "Tariq Hassan", consultantAvatar: "TH", mode: "In-Person", date: "2026-06-06", time: "12:00 PM", duration: "60 min", status: "Completed", topic: "Scholarship opportunities at McGill", notes: "Conditional offer received. Guided on next steps.", followUp: false, avatar: "MH" },
  { id: "CON-1034", studentName: "Sharmin Akter", email: "sharmin@example.com", phone: "+880 1711-000008", nationality: "Bangladeshi", targetCountry: "Australia", targetLevel: "Doctorate", consultant: "Rafiq Ahmed", consultantAvatar: "RA", mode: "Video Call", date: "2026-06-05", time: "09:30 AM", duration: "60 min", status: "Completed", topic: "PhD supervisor outreach strategy", notes: "Reviewed 3 potential supervisors. Email templates provided.", followUp: true, avatar: "SA" },
  { id: "CON-1033", studentName: "Tania Islam", email: "tania@example.com", phone: "+880 1711-000010", nationality: "Bangladeshi", targetCountry: "United States", targetLevel: "Masters", consultant: "Anika Sultana", consultantAvatar: "AS", mode: "Video Call", date: "2026-06-13", time: "01:00 PM", duration: "45 min", status: "Pending", topic: "GRE score evaluation & program fit", notes: "Awaiting GRE result. Session tentatively booked.", followUp: false, avatar: "TI" },
  { id: "CON-1032", studentName: "Tanvir Rahman", email: "tanvir@example.com", phone: "+880 1711-000001", nationality: "Bangladeshi", targetCountry: "United Kingdom", targetLevel: "Masters", consultant: "Tariq Hassan", consultantAvatar: "TH", mode: "In-Person", date: "2026-06-14", time: "11:30 AM", duration: "30 min", status: "Pending", topic: "Post-offer visa appointment booking", notes: "Oxford offer confirmed. Visa appointment guidance needed.", followUp: false, avatar: "TR" },
  { id: "CON-1031", studentName: "Sanjida Akhter", email: "sanjida@example.com", phone: "+880 1711-000004", nationality: "Bangladeshi", targetCountry: "Germany", targetLevel: "Masters", consultant: "Rafiq Ahmed", consultantAvatar: "RA", mode: "Phone Call", date: "2026-06-04", time: "03:30 PM", duration: "30 min", status: "Completed", topic: "Scholarship confirmation at TU Munich", notes: "Partial scholarship confirmed. Budget gap covered by part-time plan.", followUp: true, avatar: "SA" },
  { id: "CON-1030", studentName: "Fahim Shakil", email: "fahim@example.com", phone: "+880 1711-000003", nationality: "Bangladeshi", targetCountry: "Australia", targetLevel: "Bachelors", consultant: "Anika Sultana", consultantAvatar: "AS", mode: "Video Call", date: "2026-06-03", time: "02:00 PM", duration: "45 min", status: "Cancelled", topic: "Application status review & timeline", notes: "Student unreachable. Second attempt scheduled.", followUp: true, avatar: "FS" },
] satisfies Array<{
  id: string;
  studentName: string;
  email: string;
  phone: string;
  nationality: string;
  targetCountry: string;
  targetLevel: string;
  consultant: string;
  consultantAvatar: string;
  mode: ConsultMode;
  date: string;
  time: string;
  duration: string;
  status: ConsultStatus;
  topic: string;
  notes: string;
  followUp: boolean;
  avatar: string;
}>;

type ConsultationRow = {
  session_id: string;
  student_name: string;
  email: string;
  phone: string;
  nationality: string;
  target_country: string;
  target_level: string;
  consultant: string;
  consultant_avatar: string;
  mode: ConsultMode;
  session_date: string;
  session_time: string;
  duration: string;
  status: ConsultStatus;
  topic: string;
  notes: string;
  follow_up: number;
  avatar: string;
};

async function ensureTableExists() {
  await query(`
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
    )
  `);
}

async function seedDefaults() {
  for (const item of defaultConsultations) {
    await query(
      `INSERT INTO consultations
        (session_id, student_name, email, phone, nationality, target_country, target_level, consultant, consultant_avatar, mode, session_date, session_time, duration, status, topic, notes, follow_up, avatar)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE session_id = session_id`,
      [
        item.id,
        item.studentName,
        item.email,
        item.phone,
        item.nationality,
        item.targetCountry,
        item.targetLevel,
        item.consultant,
        item.consultantAvatar,
        item.mode,
        item.date,
        item.time,
        item.duration,
        item.status,
        item.topic,
        item.notes,
        item.followUp ? 1 : 0,
        item.avatar,
      ]
    );
  }
}

function toDateString(value: string | Date) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}

function mapRow(row: ConsultationRow) {
  return {
    id: row.session_id,
    studentName: row.student_name,
    email: row.email,
    phone: row.phone,
    nationality: row.nationality,
    targetCountry: row.target_country,
    targetLevel: row.target_level,
    consultant: row.consultant,
    consultantAvatar: row.consultant_avatar,
    mode: row.mode,
    date: toDateString(row.session_date),
    time: row.session_time,
    duration: row.duration,
    status: row.status,
    topic: row.topic,
    notes: row.notes,
    followUp: Boolean(row.follow_up),
    avatar: row.avatar,
  };
}

export async function GET() {
  try {
    await ensureTableExists();
    await seedDefaults();
    const rows = await query<ConsultationRow[]>("SELECT * FROM consultations ORDER BY session_date DESC, session_id DESC");
    return NextResponse.json({ status: "success", data: rows.map(mapRow) });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await ensureTableExists();
    const body = await request.json();
    const { id, status } = body;

    if (!id) {
      return NextResponse.json({ status: "error", message: "Missing consultation ID" }, { status: 400 });
    }

    if (status && !["Scheduled", "Completed", "Cancelled", "Pending"].includes(status)) {
      return NextResponse.json({ status: "error", message: "Invalid status" }, { status: 400 });
    }

    if (status) {
      await query("UPDATE consultations SET status = ? WHERE session_id = ?", [status, id]);
    }

    return NextResponse.json({ status: "success", message: "Consultation updated successfully" });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}
