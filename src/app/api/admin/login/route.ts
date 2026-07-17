import { NextResponse } from 'next/server';
import pool, { query } from '@/lib/db';
import crypto from 'crypto';
import { encryptSession } from '@/lib/auth';

async function ensureTablesExist() {
  await query(`
    CREATE TABLE IF NOT EXISTS admins (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL DEFAULT '',
      password VARCHAR(255) NOT NULL,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await query(`
    CREATE TABLE IF NOT EXISTS roles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL UNIQUE,
      slug VARCHAR(100) NOT NULL UNIQUE,
      description TEXT,
      is_default TINYINT(1) NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await query(`
    CREATE TABLE IF NOT EXISTS admin_roles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      admin_id INT NOT NULL,
      role_id INT NOT NULL,
      FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE,
      FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
      UNIQUE KEY unique_admin_role (admin_id, role_id)
    )
  `);
  await query(`
    CREATE TABLE IF NOT EXISTS permissions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      module VARCHAR(100) NOT NULL,
      action VARCHAR(50) NOT NULL,
      UNIQUE KEY unique_module_action (module, action)
    )
  `);
  await query(`
    CREATE TABLE IF NOT EXISTS role_permissions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      role_id INT NOT NULL,
      permission_id INT NOT NULL,
      FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
      FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
      UNIQUE KEY unique_role_perm (role_id, permission_id)
    )
  `);
}

async function ensureRolesSeeded() {
  const roleCount = await query<any[]>("SELECT COUNT(*) as count FROM roles");
  if (roleCount[0].count === 0) {
    await query(`INSERT INTO roles (name, slug, description, is_default) VALUES
      ('Super Admin', 'super-admin', 'Full system access', 0),
      ('Admin', 'admin', 'Content and CRM management', 0),
      ('Editor', 'editor', 'Content management only', 0),
      ('Counselor', 'counselor', 'Student inquiries and consultations', 0),
      ('Viewer', 'viewer', 'Read-only access', 1)
      ON DUPLICATE KEY UPDATE name=VALUES(name)`);
  }

  const permCount = await query<any[]>("SELECT COUNT(*) as count FROM permissions");
  if (permCount[0].count === 0) {
    await query(`INSERT INTO permissions (module, action) VALUES
      ('dashboard', 'view'),
      ('home_page', 'view'), ('home_page', 'add'), ('home_page', 'edit'), ('home_page', 'delete'),
      ('services', 'view'), ('services', 'add'), ('services', 'edit'), ('services', 'delete'),
      ('destinations', 'view'), ('destinations', 'add'), ('destinations', 'edit'), ('destinations', 'delete'),
      ('universities', 'view'), ('universities', 'add'), ('universities', 'edit'), ('universities', 'delete'),
      ('about_us', 'view'), ('about_us', 'add'), ('about_us', 'edit'), ('about_us', 'delete'),
      ('testimonials', 'view'), ('testimonials', 'add'), ('testimonials', 'edit'), ('testimonials', 'delete'),
      ('faq', 'view'), ('faq', 'add'), ('faq', 'edit'), ('faq', 'delete'),
      ('team', 'view'), ('team', 'add'), ('team', 'edit'), ('team', 'delete'),
      ('contact_messages', 'view'), ('contact_messages', 'edit'), ('contact_messages', 'delete'),
      ('consultations', 'view'), ('consultations', 'edit'),
      ('admin_users', 'view'), ('admin_users', 'add'), ('admin_users', 'edit'), ('admin_users', 'delete'),
      ('settings', 'view'), ('settings', 'edit')
      ON DUPLICATE KEY UPDATE module=VALUES(module)`);
  }

  const rpCount = await query<any[]>("SELECT COUNT(*) as count FROM role_permissions");
  if (rpCount[0].count === 0) {
    await query(`INSERT INTO role_permissions (role_id, permission_id)
      SELECT r.id, p.id FROM roles r, permissions p WHERE r.slug = 'super-admin'
      ON DUPLICATE KEY UPDATE role_id=VALUES(role_id)`);
    await query(`INSERT INTO role_permissions (role_id, permission_id)
      SELECT r.id, p.id FROM roles r, permissions p
      WHERE r.slug = 'admin' AND NOT (p.module = 'admin_users')
      AND NOT (p.module = 'settings' AND p.action = 'delete')
      ON DUPLICATE KEY UPDATE role_id=VALUES(role_id)`);
    await query(`INSERT INTO role_permissions (role_id, permission_id)
      SELECT r.id, p.id FROM roles r, permissions p
      WHERE r.slug = 'editor' AND p.module IN ('dashboard','home_page','services','destinations','universities','about_us','testimonials','faq','team','contact_messages')
      AND p.action != 'delete'
      ON DUPLICATE KEY UPDATE role_id=VALUES(role_id)`);
    await query(`INSERT INTO role_permissions (role_id, permission_id)
      SELECT r.id, p.id FROM roles r, permissions p
      WHERE r.slug = 'counselor' AND p.module IN ('dashboard','universities','contact_messages','consultations')
      AND p.action IN ('view', 'edit')
      ON DUPLICATE KEY UPDATE role_id=VALUES(role_id)`);
    await query(`INSERT INTO role_permissions (role_id, permission_id)
      SELECT r.id, p.id FROM roles r, permissions p
      WHERE r.slug = 'viewer' AND p.action = 'view'
      ON DUPLICATE KEY UPDATE role_id=VALUES(role_id)`);
  }
}

async function getUserPermissions(roleId: number): Promise<string[]> {
  const perms = await query<any[]>(
    `SELECT CONCAT(p.module, ':', p.action) AS perm
     FROM role_permissions rp
     JOIN permissions p ON rp.permission_id = p.id
     WHERE rp.role_id = ?`,
    [roleId]
  );
  return perms.map((p: any) => p.perm);
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email and password are required' }, { status: 400 });
    }

    await ensureTablesExist();
    await ensureRolesSeeded();

    const adminsCount = await query<any[]>('SELECT COUNT(*) as count FROM admins');
    if (adminsCount[0].count === 0) {
      const defaultPassword = crypto.createHash('sha256').update('admin123').digest('hex');
      await query('INSERT INTO admins (email, name, password) VALUES (?, ?, ?)', ['admin@example.com', 'Super Admin', defaultPassword]);

      const superAdminRole = await query<any[]>("SELECT id FROM roles WHERE slug = 'super-admin'");
      if (superAdminRole.length > 0) {
        const newAdmin = await query<any[]>("SELECT id FROM admins WHERE email = 'admin@example.com'");
        if (newAdmin.length > 0) {
          await query('INSERT INTO admin_roles (admin_id, role_id) VALUES (?, ?)', [newAdmin[0].id, superAdminRole[0].id]);
        }
      }
    }

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    const users = await query<any[]>(
      'SELECT id, email, name, is_active FROM admins WHERE email = ? AND password = ?',
      [email, hashedPassword]
    );

    if (users.length === 0) {
      return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 });
    }

    const user = users[0];

    if (!user.is_active) {
      return NextResponse.json({ success: false, message: 'Account is deactivated. Contact administrator.' }, { status: 403 });
    }

    const roles = await query<any[]>(
      `SELECT r.id, r.name, r.slug
       FROM admin_roles ar
       JOIN roles r ON ar.role_id = r.id
       WHERE ar.admin_id = ?`,
      [user.id]
    );

    let roleSlug = 'viewer';
    let roleId = 0;
    let roleName = 'Viewer';

    if (roles.length > 0) {
      roleSlug = roles[0].slug;
      roleId = roles[0].id;
      roleName = roles[0].name;
    } else {
      const viewerRole = await query<any[]>("SELECT id, name, slug FROM roles WHERE slug = 'viewer'");
      if (viewerRole.length > 0) {
        roleId = viewerRole[0].id;
        roleSlug = viewerRole[0].slug;
        roleName = viewerRole[0].name;
        await query('INSERT INTO admin_roles (admin_id, role_id) VALUES (?, ?)', [user.id, roleId]);
      }
    }

    const permissions = await getUserPermissions(roleId);

    const sessionPayload = {
      userId: user.id,
      email: user.email,
      name: user.name || '',
      role: roleSlug,
      roleId: roleId,
      permissions: permissions,
      createdAt: Date.now(),
    };

    const token = await encryptSession(sessionPayload);

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: roleSlug,
        roleName: roleName,
        permissions: permissions,
      },
    });

    response.cookies.set({
      name: 'admin_session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'An internal error occurred' }, { status: 500 });
  }
}
