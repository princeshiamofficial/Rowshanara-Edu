import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface ContactMessageRow {
  id: number;
  name: string;
  email: string;
  phone: string;
  country: string | null;
  services: string;
  message: string;
  status: string;
  created_at: Date;
}

async function ensureTable() {
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
}

function parseServices(value: string | null) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function mapRow(row: ContactMessageRow) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    country: row.country ?? "",
    services: parseServices(row.services),
    message: row.message,
    status: row.status,
    createdAt: row.created_at,
  };
}

export async function GET() {
  try {
    await ensureTable();
    const rows = await query<ContactMessageRow[]>("SELECT * FROM contact_messages ORDER BY created_at DESC, id DESC");
    return NextResponse.json({ status: "success", data: rows.map(mapRow) });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureTable();
    const body = await request.json();
    const { name, email, phone, country, services, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ status: "error", message: "Name, email, phone, and message are required" }, { status: 400 });
    }

    const servicesJson = JSON.stringify(Array.isArray(services) ? services : []);
    const result = await query<{ insertId: number }>(
      `INSERT INTO contact_messages (name, email, phone, country, services, message)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, email, phone, country || null, servicesJson, message]
    );

    return NextResponse.json({ status: "success", data: { id: result.insertId } });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await ensureTable();
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ status: "error", message: "Message ID and status are required" }, { status: 400 });
    }

    await query("UPDATE contact_messages SET status = ? WHERE id = ?", [status, id]);
    return NextResponse.json({ status: "success", message: "Message updated" });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await ensureTable();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ status: "error", message: "Missing message ID" }, { status: 400 });
    }

    await query("DELETE FROM contact_messages WHERE id = ?", [id]);
    return NextResponse.json({ status: "success", message: "Message deleted" });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}
