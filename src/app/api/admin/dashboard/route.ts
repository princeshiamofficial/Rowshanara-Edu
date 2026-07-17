import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    // Ensure tables exist
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
    await query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(100) NOT NULL,
        country VARCHAR(120) NULL,
        services TEXT NULL,
        message TEXT NOT NULL,
        status VARCHAR(40) NOT NULL DEFAULT 'New',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Stats
    const [totalConsultations] = await query<{ count: number }[]>(
      "SELECT COUNT(*) as count FROM consultations"
    );
    const [pendingConsultations] = await query<{ count: number }[]>(
      "SELECT COUNT(*) as count FROM consultations WHERE status = 'Pending'"
    );
    const [completedConsultations] = await query<{ count: number }[]>(
      "SELECT COUNT(*) as count FROM consultations WHERE status = 'Completed'"
    );
    const [totalMessages] = await query<{ count: number }[]>(
      "SELECT COUNT(*) as count FROM contact_messages"
    );
    const [newMessages] = await query<{ count: number }[]>(
      "SELECT COUNT(*) as count FROM contact_messages WHERE status = 'New'"
    );

    // Recent consultations (last 5)
    const recentConsultations = await query<{
      session_id: string;
      student_name: string;
      target_country: string;
      status: string;
      session_date: Date;
    }[]>(
      "SELECT session_id, student_name, target_country, status, session_date FROM consultations ORDER BY created_at DESC LIMIT 5"
    );

    // Recent messages (last 5)
    const recentMessages = await query<{
      id: number;
      name: string;
      country: string;
      status: string;
      created_at: Date;
    }[]>(
      "SELECT id, name, country, status, created_at FROM contact_messages ORDER BY created_at DESC LIMIT 5"
    );

    // Consultation trends (last 7 days)
    const consultationTrends = await query<{
      date: string;
      count: number;
    }[]>(
      `SELECT DATE(created_at) as date, COUNT(*) as count 
       FROM consultations 
       WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) 
       GROUP BY DATE(created_at) 
       ORDER BY date ASC`
    );

    // Message trends (last 7 days)
    const messageTrends = await query<{
      date: string;
      count: number;
    }[]>(
      `SELECT DATE(created_at) as date, COUNT(*) as count 
       FROM contact_messages 
       WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) 
       GROUP BY DATE(created_at) 
       ORDER BY date ASC`
    );

    return NextResponse.json({
      status: "success",
      data: {
        stats: {
          totalConsultations: totalConsultations.count,
          pendingConsultations: pendingConsultations.count,
          completedConsultations: completedConsultations.count,
          totalMessages: totalMessages.count,
          newMessages: newMessages.count,
        },
        recentConsultations: recentConsultations.map((r) => ({
          id: r.session_id,
          studentName: r.student_name,
          targetCountry: r.target_country,
          status: r.status,
          date: r.session_date instanceof Date
            ? r.session_date.toISOString().slice(0, 10)
            : String(r.session_date).slice(0, 10),
        })),
        recentMessages: recentMessages.map((r) => ({
          id: r.id,
          name: r.name,
          country: r.country,
          status: r.status,
          createdAt: r.created_at,
        })),
        consultationTrends: consultationTrends.map((t) => ({
          date: new Date(t.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
          count: t.count,
        })),
        messageTrends: messageTrends.map((t) => ({
          date: new Date(t.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
          count: t.count,
        })),
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}
