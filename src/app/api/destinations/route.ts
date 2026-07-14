import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

const defaultDestinations = [
  {
    code: "GB",
    name: "United Kingdom",
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
}

export async function GET() {
  try {
    await ensureTableExists();
    let rows = await query('SELECT * FROM destinations ORDER BY id ASC');
    
    // Seed default destinations if the table is empty
    if (rows.length === 0) {
      for (const dest of defaultDestinations) {
        await query(
          `INSERT INTO destinations (code, name, region, cost, work, pr, gradient, bullets, cities, visa_info) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [dest.code, dest.name, dest.region, dest.cost, dest.work, dest.pr, dest.gradient, dest.bullets, dest.cities, dest.visaInfo]
        );
      }
      rows = await query('SELECT * FROM destinations ORDER BY id ASC');
    }

    // Convert bullets back to JS Array
    const destinations = rows.map((r: any) => ({
      ...r,
      visaInfo: r.visa_info,
      bullets: typeof r.bullets === 'string' ? JSON.parse(r.bullets) : r.bullets
    }));

    return NextResponse.json({ status: 'success', data: destinations });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureTableExists();
    const body = await request.json();
    const { code, name, region, cost, work, pr, gradient, bullets, cities, visaInfo } = body;

    if (!code || !name || !region || !cost || !work || !pr || !bullets || !cities || !visaInfo) {
      return NextResponse.json({ status: 'error', message: 'Missing required fields' }, { status: 400 });
    }

    const bulletsStr = Array.isArray(bullets) ? JSON.stringify(bullets) : JSON.stringify([bullets]);
    const finalGradient = gradient || 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';

    const result = await query(
      `INSERT INTO destinations (code, name, region, cost, work, pr, gradient, bullets, cities, visa_info) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [code, name, region, cost, work, pr, finalGradient, bulletsStr, cities, visaInfo]
    );

    return NextResponse.json({ status: 'success', data: { id: result.insertId, code, name } });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
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
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await ensureTableExists();
    const body = await request.json();
    const { id, code, name, region, cost, work, pr, gradient, bullets, cities, visaInfo } = body;

    if (!id || !code || !name || !region || !cost || !work || !pr || !bullets || !cities || !visaInfo) {
      return NextResponse.json({ status: 'error', message: 'Missing required fields' }, { status: 400 });
    }

    const bulletsStr = Array.isArray(bullets) ? JSON.stringify(bullets) : JSON.stringify([bullets]);
    const finalGradient = gradient || 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';

    await query(
      `UPDATE destinations 
       SET code = ?, name = ?, region = ?, cost = ?, work = ?, pr = ?, gradient = ?, bullets = ?, cities = ?, visa_info = ? 
       WHERE id = ?`,
      [code, name, region, cost, work, pr, finalGradient, bulletsStr, cities, visaInfo, id]
    );

    return NextResponse.json({ status: 'success', message: 'Destination updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
