import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import crypto from "crypto";

export async function GET() {
  try {
    const admins = await query<any[]>(
      `SELECT a.id, a.email, a.name, a.is_active, a.created_at,
              GROUP_CONCAT(r.slug SEPARATOR ',') as roles,
              GROUP_CONCAT(r.name SEPARATOR ',') as role_names
       FROM admins a
       LEFT JOIN admin_roles ar ON a.id = ar.admin_id
       LEFT JOIN roles r ON ar.role_id = r.id
       GROUP BY a.id
       ORDER BY a.created_at DESC`
    );

    const data = admins.map((a) => ({
      id: a.id,
      email: a.email,
      name: a.name,
      isActive: Boolean(a.is_active),
      createdAt: a.created_at,
      roles: a.roles ? a.roles.split(",") : [],
      roleNames: a.role_names ? a.role_names.split(",") : [],
    }));

    const roles = await query<any[]>("SELECT id, name, slug FROM roles ORDER BY name ASC");

    return NextResponse.json({ status: "success", data, roles });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, password, roleIds } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ status: "error", message: "Name, email, and password are required" }, { status: 400 });
    }

    const existing = await query<any[]>("SELECT id FROM admins WHERE email = ?", [email]);
    if (existing.length > 0) {
      return NextResponse.json({ status: "error", message: "Email already exists" }, { status: 409 });
    }

    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

    const result = await query<any>(
      "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    const adminId = result.insertId;

    if (roleIds && Array.isArray(roleIds) && roleIds.length > 0) {
      for (const roleId of roleIds) {
        await query("INSERT INTO admin_roles (admin_id, role_id) VALUES (?, ?)", [adminId, roleId]);
      }
    } else {
      const viewerRole = await query<any[]>("SELECT id FROM roles WHERE slug = 'viewer'");
      if (viewerRole.length > 0) {
        await query("INSERT INTO admin_roles (admin_id, role_id) VALUES (?, ?)", [adminId, viewerRole[0].id]);
      }
    }

    return NextResponse.json({ status: "success", message: "Admin user created successfully", data: { id: adminId } });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}
