import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
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

    const rows = await query<{
      id: number;
      type: string;
      title: string;
      message: string;
      link: string | null;
      is_read: number;
      created_at: Date;
    }[]>(
      "SELECT id, type, title, message, link, is_read, created_at FROM notifications ORDER BY created_at DESC LIMIT 50"
    );

    const data = rows.map((r) => ({
      id: r.id,
      type: r.type,
      title: r.title,
      message: r.message,
      link: r.link ?? null,
      isRead: Boolean(r.is_read),
      createdAt: r.created_at,
    }));

    const unreadCount = data.filter((n) => !n.isRead).length;

    return NextResponse.json({ status: "success", data, unreadCount });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, isRead } = await request.json();

    if (!id) {
      return NextResponse.json({ status: "error", message: "Missing notification ID" }, { status: 400 });
    }

    await query("UPDATE notifications SET is_read = ? WHERE id = ?", [isRead ? 1 : 0, id]);

    return NextResponse.json({ status: "success", message: "Notification updated" });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ status: "error", message: "Missing notification ID" }, { status: 400 });
    }

    await query("DELETE FROM notifications WHERE id = ?", [id]);
    return NextResponse.json({ status: "success", message: "Notification deleted" });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}
