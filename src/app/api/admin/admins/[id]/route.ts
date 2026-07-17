import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import crypto from "crypto";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  try {
    const admins = await query<any[]>(
      `SELECT a.id, a.email, a.name, a.is_active, a.created_at,
              GROUP_CONCAT(r.slug) as roles,
              GROUP_CONCAT(r.name) as role_names
       FROM admins a
       LEFT JOIN admin_roles ar ON a.id = ar.admin_id
       LEFT JOIN roles r ON ar.role_id = r.id
       WHERE a.id = ?
       GROUP BY a.id`,
      [id]
    );

    if (admins.length === 0) {
      return NextResponse.json({ status: "error", message: "Admin not found" }, { status: 404 });
    }

    const a = admins[0];
    return NextResponse.json({
      status: "success",
      data: {
        id: a.id,
        email: a.email,
        name: a.name,
        isActive: Boolean(a.is_active),
        createdAt: a.created_at,
        roles: a.roles ? a.roles.split(",") : [],
        roleNames: a.role_names ? a.role_names.split(",") : [],
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  try {
    const { name, email, password, roleIds, isActive } = await request.json();

    const existing = await query<any[]>("SELECT id FROM admins WHERE id = ?", [id]);
    if (existing.length === 0) {
      return NextResponse.json({ status: "error", message: "Admin not found" }, { status: 404 });
    }

    if (password) {
      const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
      await query("UPDATE admins SET name = ?, email = ?, password = ?, is_active = ? WHERE id = ?", [
        name,
        email,
        hashedPassword,
        isActive !== undefined ? (isActive ? 1 : 0) : 1,
        id,
      ]);
    } else {
      await query("UPDATE admins SET name = ?, email = ?, is_active = ? WHERE id = ?", [
        name,
        email,
        isActive !== undefined ? (isActive ? 1 : 0) : 1,
        id,
      ]);
    }

    await query("DELETE FROM admin_roles WHERE admin_id = ?", [id]);

    if (roleIds && Array.isArray(roleIds) && roleIds.length > 0) {
      for (const roleId of roleIds) {
        await query("INSERT INTO admin_roles (admin_id, role_id) VALUES (?, ?)", [id, roleId]);
      }
    }

    return NextResponse.json({ status: "success", message: "Admin updated successfully" });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  try {
    await query("DELETE FROM admin_roles WHERE admin_id = ?", [id]);
    await query("DELETE FROM admins WHERE id = ?", [id]);
    return NextResponse.json({ status: "success", message: "Admin deleted successfully" });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}
