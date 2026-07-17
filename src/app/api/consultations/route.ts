import { NextResponse } from "next/server";
import { query } from "@/lib/db";

type ConsultStatus = "Scheduled" | "Completed" | "Cancelled" | "Pending";
type ConsultMode = "Video Call" | "Phone Call" | "In-Person";



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
    const rows = await query<ConsultationRow[]>("SELECT * FROM consultations ORDER BY session_date DESC, session_id DESC");
    return NextResponse.json({ status: "success", data: rows.map(mapRow) });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureTableExists();
    const body = await request.json();
    const {
      studentName,
      email,
      phone,
      nationality,
      targetCountry,
      targetLevel,
      consultant,
      mode,
      sessionDate,
      sessionTime,
      duration,
      topic,
      notes,
      followUp,
      avatar,
      consultantAvatar,
    } = body;

    if (!studentName || !email || !phone || !targetCountry || !targetLevel) {
      return NextResponse.json({ status: "error", message: "Missing required fields" }, { status: 400 });
    }

    const sessionId = `S${Date.now().toString().slice(-6)}`;
    const now = new Date();
    const dateStr = sessionDate || now.toISOString().slice(0, 10);
    const timeStr = sessionTime || "Pending";

    await query(
      `INSERT INTO consultations 
        (session_id, student_name, email, phone, nationality, target_country, target_level, consultant, consultant_avatar, mode, session_date, session_time, duration, status, topic, notes, follow_up, avatar)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        sessionId,
        studentName,
        email,
        phone,
        nationality || "Not specified",
        targetCountry,
        targetLevel,
        consultant || "Unassigned",
        consultantAvatar || "?",
        mode || "Video Call",
        dateStr,
        timeStr,
        duration || "30 min",
        "Pending",
        topic || "University Inquiry",
        notes || "",
        followUp ? 1 : 0,
        avatar || (studentName?.[0] || "?").toUpperCase(),
      ]
    );

    return NextResponse.json({ status: "success", data: { id: sessionId } });
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
      await query(
        `INSERT INTO notifications (type, title, message, link)
         VALUES (?, ?, ?, ?)`,
        ["consultation", "Consultation Status Updated", `Session ${id} is now ${status}`, "/admin/dashboard/consultations"]
      );
    }

    return NextResponse.json({ status: "success", message: "Consultation updated successfully" });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}
