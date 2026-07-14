import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

const defaultDestinations = [
  {
    code: "GB",
    name: "United Kingdom",
    image: "/uk_hero.png",
    color: "#3b82f6",
    isPopular: true,
    region: "Europe",
    cost: "$15,000 - $35,000/year",
    work: "20 hours/week",
    pr: "Yes",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    bullets: JSON.stringify([
      "World-class education with prestigious universities",
      "Rich cultural heritage and diverse student community",
      "Strong post-study work visa opportunities"
    ]),
    cities: "London, Oxford, Cambridge, Manchester",
    visaInfo: "Student visa required, processing 3-4 weeks"
  },
  {
    code: "CA",
    name: "Canada",
    image: "/canada_hero.png",
    color: "#f43f5e",
    isPopular: true,
    region: "North America",
    cost: "$12,000 - $28,000/year",
    work: "20 hours/week",
    pr: "Yes",
    gradient: "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)",
    bullets: JSON.stringify([
      "Top-quality education recognized globally",
      "Extremely welcoming and multicultural environment",
      "Post-graduation work permit (PGWP) pathways to PR"
    ]),
    cities: "Toronto, Vancouver, Montreal, Waterloo",
    visaInfo: "Study permit required, processing 4-8 weeks"
  },
  {
    code: "AU",
    name: "Australia",
    image: "/sydney_opera_house.png",
    color: "#f97316",
    isPopular: true,
    region: "Oceania",
    cost: "$13,000 - $32,000/year",
    work: "20 hours/week",
    pr: "Yes",
    gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
    bullets: JSON.stringify([
      "High academic standards and modern research labs",
      "Excellent weather, beaches, and student lifestyle",
      "Post-study work rights and high minimum wage"
    ]),
    cities: "Sydney, Melbourne, Brisbane, Adelaide",
    visaInfo: "Student visa (Subclass 500) required, processing 2-4 weeks"
  },
  {
    code: "US",
    name: "USA",
    image: "/usa_landmark.png",
    color: "#6366f1",
    isPopular: true,
    region: "North America",
    cost: "$20,000 - $50,000/year",
    work: "20 hours/week",
    pr: "Through OPT",
    gradient: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
    bullets: JSON.stringify([
      "Unmatched flexibility and choice of specializations",
      "World-leading research and Ivy League institutions",
      "OPT opportunities (up to 3 years for STEM fields)"
    ]),
    cities: "New York, Boston, San Francisco, Chicago",
    visaInfo: "F-1 student visa required, processing 1-3 weeks"
  },
  {
    code: "DE",
    name: "Germany",
    image: "/germany_landmark.png",
    color: "#475569",
    isPopular: true,
    region: "Europe",
    cost: "$0 - $10,000/year",
    work: "20 hours/week",
    pr: "Yes",
    gradient: "linear-gradient(135deg, #475569 0%, #334155 100%)",
    bullets: JSON.stringify([
      "No tuition fees at public universities",
      "Highly praised engineering and technology programs",
      "18-month post-study job seeker visa"
    ]),
    cities: "Berlin, Munich, Frankfurt, Aachen",
    visaInfo: "Student visa required, blocked account needed, processing 4-6 weeks"
  },
  {
    code: "MY",
    name: "Malaysia",
    image: "/malaysia_landmark.png",
    color: "#f59e0b",
    isPopular: true,
    region: "Asia",
    cost: "$5,000 - $15,000/year",
    work: "20 hours/week",
    pr: "Limited",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    bullets: JSON.stringify([
      "Low cost of living and affordable tuition fees",
      "Branch campuses of top UK & Australian universities",
      "Vibrant, safe and culturally diverse Asian hub"
    ]),
    cities: "Kuala Lumpur, Penang, Johor Bahru",
    visaInfo: "Student pass (VAL) required, processing 3-4 weeks"
  },
  {
    code: "IE",
    name: "Ireland",
    image: "/images/services/counselling.png",
    color: "#10b981",
    isPopular: false,
    region: "Europe",
    cost: "$10,000 - $25,000/year",
    work: "20 hours/week",
    pr: "Yes",
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    bullets: JSON.stringify([
      "Only English-speaking country in the Eurozone",
      "European hub for tech giants (Google, Apple, Meta)",
      "2-year post-study work visa for graduates"
    ]),
    cities: "Dublin, Cork, Galway, Limerick",
    visaInfo: "Study visa required, processing 4-6 weeks"
  },
  {
    code: "NZ",
    name: "New Zealand",
    image: "/images/services/pre_departure.png",
    color: "#14b8a6",
    isPopular: false,
    region: "Oceania",
    cost: "$14,000 - $30,000/year",
    work: "20 hours/week",
    pr: "Yes",
    gradient: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
    bullets: JSON.stringify([
      "All universities ranked in the top 3% globally",
      "Stunning natural landscapes and safe environment",
      "Excellent post-study work visa options"
    ]),
    cities: "Auckland, Wellington, Christchurch",
    visaInfo: "Fee paying student visa required, processing 3-4 weeks"
  }
];

async function ensureTableExists() {
  await query(`
    CREATE TABLE IF NOT EXISTS destinations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      code VARCHAR(10) NOT NULL UNIQUE,
      name VARCHAR(100) NOT NULL,
      image VARCHAR(512) NOT NULL DEFAULT '',
      color VARCHAR(20) NOT NULL DEFAULT '#3b82f6',
      is_popular TINYINT(1) NOT NULL DEFAULT 1,
      region VARCHAR(100) NOT NULL,
      cost VARCHAR(255) NOT NULL,
      work VARCHAR(255) NOT NULL,
      pr VARCHAR(100) NOT NULL,
      gradient VARCHAR(255) NOT NULL,
      bullets TEXT NOT NULL,
      cities VARCHAR(255) NOT NULL,
      visa_info TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await ensureColumn("image", "ALTER TABLE destinations ADD COLUMN image VARCHAR(512) NOT NULL DEFAULT '' AFTER name");
  await ensureColumn("color", "ALTER TABLE destinations ADD COLUMN color VARCHAR(20) NOT NULL DEFAULT '#3b82f6' AFTER image");
  await ensureColumn("is_popular", "ALTER TABLE destinations ADD COLUMN is_popular TINYINT(1) NOT NULL DEFAULT 1 AFTER color");
  await backfillDefaultDisplayFields();
}

async function ensureColumn(columnName: string, alterSql: string) {
  const rows = await query<{ COLUMN_NAME: string }[]>(
    `SELECT COLUMN_NAME
     FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = 'destinations'
       AND COLUMN_NAME = ?`,
    [columnName]
  );
  if (rows.length === 0) {
    await query(alterSql);
  }
}

async function backfillDefaultDisplayFields() {
  for (const destination of defaultDestinations) {
    await query(
      "UPDATE destinations SET image = ?, color = ? WHERE code = ? AND image = ''",
      [destination.image, destination.color, destination.code]
    );
  }
}

interface DestinationRow {
  id: number;
  code: string;
  name: string;
  image: string;
  color: string;
  is_popular: number;
  region: string;
  cost: string;
  work: string;
  pr: string;
  gradient: string;
  bullets: string;
  cities: string;
  visa_info: string;
}

const imageFallbacks: Record<string, string> = {
  GB: "/uk_hero.png",
  CA: "/canada_hero.png",
  AU: "/sydney_opera_house.png",
  US: "/usa_landmark.png",
  DE: "/germany_landmark.png",
  MY: "/malaysia_landmark.png",
  IE: "/images/services/counselling.png",
  NZ: "/images/services/pre_departure.png",
};

function gradientFromColor(color: string) {
  return `linear-gradient(135deg, ${color} 0%, ${color} 100%)`;
}

function codeFromName(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || String(Date.now()).slice(-2);
}

export async function GET() {
  try {
    await ensureTableExists();
    let rows = await query<DestinationRow[]>('SELECT * FROM destinations ORDER BY id ASC');
    
    // Seed default destinations if the table is empty
    if (rows.length === 0) {
      for (const dest of defaultDestinations) {
        await query(
          `INSERT INTO destinations (code, name, image, color, is_popular, region, cost, work, pr, gradient, bullets, cities, visa_info) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [dest.code, dest.name, dest.image, dest.color, dest.isPopular ? 1 : 0, dest.region, dest.cost, dest.work, dest.pr, dest.gradient, dest.bullets, dest.cities, dest.visaInfo]
        );
      }
      rows = await query<DestinationRow[]>('SELECT * FROM destinations ORDER BY id ASC');
    }

    // Convert bullets back to JS Array
    const destinations = rows.map((r) => ({
      ...r,
      image: r.image || imageFallbacks[r.code.toUpperCase()] || "/images/services/counselling.png",
      color: r.color || "#3b82f6",
      isPopular: Boolean(r.is_popular),
      visaInfo: r.visa_info,
      bullets: typeof r.bullets === 'string' ? JSON.parse(r.bullets) : r.bullets
    }));

    return NextResponse.json({ status: 'success', data: destinations });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureTableExists();
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({ status: 'error', message: 'Destination name is required' }, { status: 400 });
    }

    const code = (body.code || codeFromName(name)).toUpperCase();
    const image = body.image || imageFallbacks[code] || "/images/services/counselling.png";
    const color = body.color || "#3b82f6";
    const isPopular = body.isPopular === false ? 0 : 1;
    const region = body.region || "Featured";
    const cost = body.cost || "Contact us for guidance";
    const work = body.work || "Varies by program";
    const pr = body.pr || "Consult advisor";
    const bullets = body.bullets || ["Personalized study abroad guidance"];
    const bulletsStr = Array.isArray(bullets) ? JSON.stringify(bullets.filter(Boolean)) : JSON.stringify([bullets]);
    const cities = body.cities || "Popular student cities";
    const visaInfo = body.visaInfo || "Visa guidance available with our consultants";
    const finalGradient = body.gradient || gradientFromColor(color);

    const result = await query<{ insertId: number }>(
      `INSERT INTO destinations (code, name, image, color, is_popular, region, cost, work, pr, gradient, bullets, cities, visa_info) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [code, name, image, color, isPopular, region, cost, work, pr, finalGradient, bulletsStr, cities, visaInfo]
    );

    return NextResponse.json({ status: 'success', data: { id: result.insertId, code, name } });
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
      return NextResponse.json({ status: 'error', message: 'Missing destination ID' }, { status: 400 });
    }

    await query('DELETE FROM destinations WHERE id = ?', [id]);
    return NextResponse.json({ status: 'success', message: 'Destination deleted successfully' });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await ensureTableExists();
    const body = await request.json();
    const { id, name } = body;

    if (!id || !name) {
      return NextResponse.json({ status: 'error', message: 'Destination ID and name are required' }, { status: 400 });
    }

    const code = (body.code || codeFromName(name)).toUpperCase();
    const image = body.image || imageFallbacks[code] || "/images/services/counselling.png";
    const color = body.color || "#3b82f6";
    const isPopular = body.isPopular === false ? 0 : 1;
    const region = body.region || "Featured";
    const cost = body.cost || "Contact us for guidance";
    const work = body.work || "Varies by program";
    const pr = body.pr || "Consult advisor";
    const bullets = body.bullets || ["Personalized study abroad guidance"];
    const bulletsStr = Array.isArray(bullets) ? JSON.stringify(bullets.filter(Boolean)) : JSON.stringify([bullets]);
    const cities = body.cities || "Popular student cities";
    const visaInfo = body.visaInfo || "Visa guidance available with our consultants";
    const finalGradient = body.gradient || gradientFromColor(color);

    await query(
      `UPDATE destinations 
       SET code = ?, name = ?, image = ?, color = ?, is_popular = ?, region = ?, cost = ?, work = ?, pr = ?, gradient = ?, bullets = ?, cities = ?, visa_info = ? 
       WHERE id = ?`,
      [code, name, image, color, isPopular, region, cost, work, pr, finalGradient, bulletsStr, cities, visaInfo, id]
    );

    return NextResponse.json({ status: 'success', message: 'Destination updated successfully' });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
