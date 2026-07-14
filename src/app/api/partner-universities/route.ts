import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

interface PartnerUniversityRow {
  id: number;
  name: string;
  logo: string;
  sort_order: number;
  is_active: number;
}

const defaultUniversities = [
  { name: 'Harvard University', logo: '/universities/harvard.png', sort_order: 0 },
  { name: 'University of Sydney', logo: '/universities/sydney.png', sort_order: 1 },
  { name: 'University of Toronto', logo: '/universities/toronto.png', sort_order: 2 },
  { name: 'Oxford University', logo: '/universities/oxford.png', sort_order: 3 },
  { name: 'University of Melbourne', logo: '/universities/melbourne.png', sort_order: 4 },
];

async function ensureTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS partner_universities (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      logo VARCHAR(512) NOT NULL,
      sort_order INT NOT NULL DEFAULT 0,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export async function GET() {
  try {
    await ensureTable();
    let rows = await query<PartnerUniversityRow[]>('SELECT * FROM partner_universities ORDER BY sort_order ASC, id ASC');
    if (rows.length === 0) {
      for (const u of defaultUniversities) {
        await query(
          'INSERT INTO partner_universities (name, logo, sort_order) VALUES (?, ?, ?)',
          [u.name, u.logo, u.sort_order]
        );
      }
      rows = await query<PartnerUniversityRow[]>('SELECT * FROM partner_universities ORDER BY sort_order ASC, id ASC');
    }
    const universities = rows.map(r => ({
      id: r.id,
      name: r.name,
      logo: r.logo,
      sortOrder: r.sort_order,
      isActive: Boolean(r.is_active),
    }));
    return NextResponse.json({ status: 'success', data: universities });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureTable();
    const body = await request.json();
    const { name, logo } = body;
    if (!name || !logo) {
      return NextResponse.json({ status: 'error', message: 'Name and logo are required' }, { status: 400 });
    }
    const maxOrder = await query<{ m: number }[]>('SELECT COALESCE(MAX(sort_order), -1) as m FROM partner_universities');
    const nextOrder = (maxOrder[0]?.m ?? -1) + 1;
    const result = await query<{ insertId: number }>(
      'INSERT INTO partner_universities (name, logo, sort_order) VALUES (?, ?, ?)',
      [name, logo, nextOrder]
    );
    return NextResponse.json({ status: 'success', data: { id: result.insertId } });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await ensureTable();
    const body = await request.json();
    const { id, name, logo, isActive } = body;
    if (!id || !name || !logo) {
      return NextResponse.json({ status: 'error', message: 'Missing required fields' }, { status: 400 });
    }
    await query(
      'UPDATE partner_universities SET name = ?, logo = ?, is_active = ? WHERE id = ?',
      [name, logo, isActive ? 1 : 0, id]
    );
    return NextResponse.json({ status: 'success', message: 'University updated' });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await ensureTable();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ status: 'error', message: 'Missing id' }, { status: 400 });
    await query('DELETE FROM partner_universities WHERE id = ?', [id]);
    return NextResponse.json({ status: 'success', message: 'University deleted' });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    await ensureTable();
    const { order } = await request.json();
    if (!Array.isArray(order)) return NextResponse.json({ status: 'error', message: 'Invalid payload' }, { status: 400 });
    for (const item of order) {
      await query('UPDATE partner_universities SET sort_order = ? WHERE id = ?', [item.sortOrder, item.id]);
    }
    return NextResponse.json({ status: 'success', message: 'Order saved' });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
