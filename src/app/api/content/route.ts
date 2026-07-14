import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { contentDefaults } from "@/lib/contentDefaults";

type ContentRow = {
  id: number;
  section: string;
  item_key: string;
  title: string;
  subtitle: string | null;
  body: string | null;
  value: string | null;
  image_url: string | null;
  link_url: string | null;
  metadata: string | null;
  sort_order: number;
  is_active: number;
};

async function ensureTableExists() {
  await query(`
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
    )
  `);
}

async function seedDefaults() {
  for (const item of contentDefaults) {
    await query(
      `INSERT INTO site_content
        (section, item_key, title, subtitle, body, value, image_url, link_url, metadata, sort_order, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE section = section`,
      [
        item.section,
        item.itemKey,
        item.title,
        item.subtitle ?? null,
        item.body ?? null,
        item.value ?? null,
        item.imageUrl ?? null,
        item.linkUrl ?? null,
        JSON.stringify(item.metadata ?? {}),
        item.sortOrder ?? 0,
        item.isActive === false ? 0 : 1,
      ]
    );
  }
}

function parseMetadata(value: string | null) {
  if (!value) return {};
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}

function mapRow(row: ContentRow) {
  return {
    id: row.id,
    section: row.section,
    itemKey: row.item_key,
    title: row.title,
    subtitle: row.subtitle ?? "",
    body: row.body ?? "",
    value: row.value ?? "",
    imageUrl: row.image_url ?? "",
    linkUrl: row.link_url ?? "",
    metadata: parseMetadata(row.metadata),
    sortOrder: row.sort_order,
    isActive: Boolean(row.is_active),
  };
}

export async function GET(request: Request) {
  try {
    await ensureTableExists();
    await seedDefaults();

    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section");
    const includeInactive = searchParams.get("includeInactive") === "true";

    const where: string[] = [];
    const params: unknown[] = [];
    if (section) {
      where.push("section = ?");
      params.push(section);
    }
    if (!includeInactive) {
      where.push("is_active = 1");
    }

    const rows = await query<ContentRow[]>(
      `SELECT * FROM site_content ${where.length ? `WHERE ${where.join(" AND ")}` : ""} ORDER BY section ASC, sort_order ASC, id ASC`,
      params
    );

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
    const { section, itemKey, title, subtitle, body: text, value, imageUrl, linkUrl, metadata, sortOrder, isActive } = body;

    if (!section || !itemKey || !title) {
      return NextResponse.json({ status: "error", message: "Section, item key, and title are required" }, { status: 400 });
    }

    const result = await query<{ insertId: number }>(
      `INSERT INTO site_content
        (section, item_key, title, subtitle, body, value, image_url, link_url, metadata, sort_order, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        section,
        itemKey,
        title,
        subtitle || null,
        text || null,
        value || null,
        imageUrl || null,
        linkUrl || null,
        JSON.stringify(metadata || {}),
        Number(sortOrder || 0),
        isActive === false ? 0 : 1,
      ]
    );

    return NextResponse.json({ status: "success", data: { id: result.insertId } });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await ensureTableExists();
    const body = await request.json();
    const { id, section, itemKey, title, subtitle, body: text, value, imageUrl, linkUrl, metadata, sortOrder, isActive } = body;

    if (!id || !section || !itemKey || !title) {
      return NextResponse.json({ status: "error", message: "ID, section, item key, and title are required" }, { status: 400 });
    }

    await query(
      `UPDATE site_content
       SET section = ?, item_key = ?, title = ?, subtitle = ?, body = ?, value = ?, image_url = ?, link_url = ?, metadata = ?, sort_order = ?, is_active = ?
       WHERE id = ?`,
      [
        section,
        itemKey,
        title,
        subtitle || null,
        text || null,
        value || null,
        imageUrl || null,
        linkUrl || null,
        JSON.stringify(metadata || {}),
        Number(sortOrder || 0),
        isActive === false ? 0 : 1,
        id,
      ]
    );

    return NextResponse.json({ status: "success", message: "Content updated successfully" });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await ensureTableExists();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ status: "error", message: "Missing content ID" }, { status: 400 });
    }

    await query("DELETE FROM site_content WHERE id = ?", [id]);
    return NextResponse.json({ status: "success", message: "Content deleted successfully" });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}
