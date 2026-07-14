import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

interface HeroSlideRow {
  id: number;
  title: string;
  image: string;
  button_text: string;
  link: string;
  sort_order: number;
}

const defaultSlides = [
  { title: 'Study in Australia', image: '/sydney_opera_house.png', button_text: 'BOOK FREE CONSULTATION', link: '/contact', sort_order: 0 },
  { title: 'Study in Canada',    image: '/canada_hero.png',        button_text: 'BOOK FREE CONSULTATION', link: '/contact', sort_order: 1 },
  { title: 'Study in United Kingdom', image: '/uk_hero.png',      button_text: 'BOOK FREE CONSULTATION', link: '/contact', sort_order: 2 },
];

async function ensureTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS hero_slides (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      image VARCHAR(512) NOT NULL,
      button_text VARCHAR(255) NOT NULL DEFAULT 'BOOK FREE CONSULTATION',
      link VARCHAR(255) NOT NULL DEFAULT '/contact',
      sort_order INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export async function GET() {
  try {
    await ensureTable();
    let rows = await query<HeroSlideRow[]>('SELECT * FROM hero_slides ORDER BY sort_order ASC, id ASC');
    if (rows.length === 0) {
      for (const s of defaultSlides) {
        await query(
          'INSERT INTO hero_slides (title, image, button_text, link, sort_order) VALUES (?, ?, ?, ?, ?)',
          [s.title, s.image, s.button_text, s.link, s.sort_order]
        );
      }
      rows = await query<HeroSlideRow[]>('SELECT * FROM hero_slides ORDER BY sort_order ASC, id ASC');
    }
    const slides = rows.map(r => ({
      id: r.id,
      title: r.title,
      image: r.image,
      buttonText: r.button_text,
      link: r.link,
      sortOrder: r.sort_order,
      gradient: "linear-gradient(90deg, rgba(224, 145, 0, 0.85) 0%, rgba(224, 145, 0, 0.6) 24%, rgba(224, 145, 0, 0.2) 48%, rgba(224, 145, 0, 0) 66.6%)"
    }));
    return NextResponse.json({ status: 'success', data: slides });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureTable();
    const body = await request.json();
    const { title, image, buttonText, link } = body;
    if (!title || !image) {
      return NextResponse.json({ status: 'error', message: 'Title and image are required' }, { status: 400 });
    }
    const maxOrder = await query<{ m: number }[]>('SELECT COALESCE(MAX(sort_order), -1) as m FROM hero_slides');
    const nextOrder = (maxOrder[0]?.m ?? -1) + 1;
    const result = await query<{ insertId: number }>(
      'INSERT INTO hero_slides (title, image, button_text, link, sort_order) VALUES (?, ?, ?, ?, ?)',
      [title, image, buttonText || 'BOOK FREE CONSULTATION', link || '/contact', nextOrder]
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
    const { id, title, image, buttonText, link } = body;
    if (!id || !title || !image) {
      return NextResponse.json({ status: 'error', message: 'Missing required fields' }, { status: 400 });
    }
    await query(
      'UPDATE hero_slides SET title = ?, image = ?, button_text = ?, link = ? WHERE id = ?',
      [title, image, buttonText || 'BOOK FREE CONSULTATION', link || '/contact', id]
    );
    return NextResponse.json({ status: 'success', message: 'Slide updated' });
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
    await query('DELETE FROM hero_slides WHERE id = ?', [id]);
    return NextResponse.json({ status: 'success', message: 'Slide deleted' });
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
      await query('UPDATE hero_slides SET sort_order = ? WHERE id = ?', [item.sortOrder, item.id]);
    }
    return NextResponse.json({ status: 'success', message: 'Order saved' });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
