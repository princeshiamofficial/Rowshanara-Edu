import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

const defaultServices = [
  {
    title: "University Admission Counselling",
    icon: "FaBookOpen",
    image: "/images/services/counselling.png",
    description: "Expert guidance to help you select the perfect university based on your academic profile and career goals.",
    highlights: JSON.stringify(["Profile Assessment", "University Shortlisting", "Application Strategy", "Interview Prep"])
  },
  {
    title: "Student Visa Processing",
    icon: "FaFileLines",
    image: "/images/services/visa.png",
    description: "Complete support throughout the visa application process with expert documentation guidance.",
    highlights: JSON.stringify(["Document Preparation", "Application Filing", "Interview Training", "Status Tracking"])
  },
  {
    title: "Scholarship & Financial Aid Guidance",
    icon: "FaBriefcase",
    image: "/images/services/scholarship.png",
    description: "Maximize your financial aid opportunities and secure scholarships to reduce your study costs.",
    highlights: JSON.stringify(["Scholarship Search", "Application Assistance", "Financial Planning", "Loan Guidance"])
  },
  {
    title: "IELTS/SAT/GRE Test Prep Referral",
    icon: "FaUsers",
    image: "/images/services/test_prep.png",
    description: "Connect with top test preparation centers to achieve your target scores.",
    highlights: JSON.stringify(["Center Referrals", "Study Materials", "Mock Tests", "Score Improvement"])
  },
  {
    title: "Pre-Departure Orientation",
    icon: "FaPlane",
    image: "/images/services/pre_departure.png",
    description: "Comprehensive briefing to prepare you for your new life abroad.",
    highlights: JSON.stringify(["Cultural Orientation", "Accommodation Guide", "Travel Planning", "Health Insurance"])
  },
  {
    title: "Post-Arrival Student Support",
    icon: "FaLocationDot",
    image: "/images/services/post_arrival.png",
    description: "Continuous support after you arrive at your destination to ensure smooth transition.",
    highlights: JSON.stringify(["Arrival Assistance", "Local Orientation", "Ongoing Mentoring", "Emergency Support"])
  }
];

interface ServiceRow {
  id: number;
  title: string;
  icon: string;
  image: string;
  description: string;
  highlights: string;
  sort_order: number;
}

async function ensureTableExists() {
  await query(`
    CREATE TABLE IF NOT EXISTS services (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL UNIQUE,
      icon VARCHAR(100) NOT NULL DEFAULT 'FaBookOpen',
      image VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      highlights TEXT NOT NULL,
      sort_order INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  // Add sort_order column if it doesn't exist (for existing tables)
  try {
    await query(`ALTER TABLE services ADD COLUMN sort_order INT NOT NULL DEFAULT 0`);
  } catch {
    // Column already exists, ignore
  }
}

export async function GET() {
  try {
    await ensureTableExists();
    let rows = await query<ServiceRow[]>('SELECT * FROM services ORDER BY sort_order ASC, id ASC');

    if (rows.length === 0) {
      for (let i = 0; i < defaultServices.length; i++) {
        const s = defaultServices[i];
        await query(
          `INSERT INTO services (title, icon, image, description, highlights, sort_order) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [s.title, s.icon, s.image, s.description, s.highlights, i]
        );
      }
      rows = await query<ServiceRow[]>('SELECT * FROM services ORDER BY sort_order ASC, id ASC');
    }

    const services = rows.map((r) => ({
      ...r,
      sortOrder: r.sort_order,
      highlights: typeof r.highlights === 'string' ? JSON.parse(r.highlights) : r.highlights
    }));

    return NextResponse.json({ status: 'success', data: services });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureTableExists();
    const body = await request.json();
    const { title, icon, image, description, highlights } = body;

    if (!title || !image || !description || !highlights) {
      return NextResponse.json({ status: 'error', message: 'Missing required fields' }, { status: 400 });
    }

    const iconStr = icon || 'FaBookOpen';
    const highlightsStr = Array.isArray(highlights) ? JSON.stringify(highlights) : JSON.stringify([highlights]);

    const result = await query<{ insertId: number }>(
      `INSERT INTO services (title, icon, image, description, highlights) 
       VALUES (?, ?, ?, ?, ?)`,
      [title, iconStr, image, description, highlightsStr]
    );

    return NextResponse.json({ status: 'success', data: { id: result.insertId, title } });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await ensureTableExists();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ status: 'error', message: 'Missing service ID' }, { status: 400 });
    }

    await query('DELETE FROM services WHERE id = ?', [id]);
    return NextResponse.json({ status: 'success', message: 'Service deleted successfully' });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await ensureTableExists();
    const body = await request.json();
    const { id, title, icon, image, description, highlights } = body;

    if (!id || !title || !image || !description || !highlights) {
      return NextResponse.json({ status: 'error', message: 'Missing required fields' }, { status: 400 });
    }

    const iconStr = icon || 'FaBookOpen';
    const highlightsStr = Array.isArray(highlights) ? JSON.stringify(highlights) : JSON.stringify([highlights]);

    await query(
      `UPDATE services 
       SET title = ?, icon = ?, image = ?, description = ?, highlights = ? 
       WHERE id = ?`,
      [title, iconStr, image, description, highlightsStr, id]
    );

    return NextResponse.json({ status: 'success', message: 'Service updated successfully' });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    await ensureTableExists();
    const body = await request.json();
    const { order } = body; // array of { id, sortOrder }

    if (!Array.isArray(order)) {
      return NextResponse.json({ status: 'error', message: 'Invalid order payload' }, { status: 400 });
    }

    for (const item of order) {
      await query('UPDATE services SET sort_order = ? WHERE id = ?', [item.sortOrder, item.id]);
    }

    return NextResponse.json({ status: 'success', message: 'Order saved successfully' });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
