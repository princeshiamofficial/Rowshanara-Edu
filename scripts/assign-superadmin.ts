import { query } from "@/lib/db";

async function main() {
  const admins = await query<any[]>("SELECT id, email FROM admins");
  console.log("Admins:", admins);

  const roles = await query<any[]>("SELECT id, name, slug FROM roles");
  console.log("Roles:", roles);

  const admin = await query<any[]>("SELECT id FROM admins WHERE email = ?", ["admin@example.com"]);
  if (admin.length === 0) {
    console.log("Admin not found");
    return;
  }

  const role = await query<any[]>("SELECT id FROM roles WHERE slug = ?", ["super-admin"]);
  if (role.length === 0) {
    console.log("Role not found");
    return;
  }

  await query("INSERT IGNORE INTO admin_roles (admin_id, role_id) VALUES (?, ?)", [admin[0].id, role[0].id]);
  console.log("Assigned super-admin to admin@example.com");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
