import { NextResponse } from "next/server";
import { query } from "@/lib/db";

const defaultUniversities = [
  {
    name: "University of Oxford",
    country: "UK",
    location: "Oxford, UK",
    courses: 45,
    tuitionMin: 25000,
    tuitionMax: 35000,
    acceptanceRate: "~15%",
    rank: 1,
    subjectAreas: ["Arts", "Science", "Business", "Engineering", "Medicine"],
    isOfficialPartner: true,
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop",
    description: "The oldest university in the English-speaking world, Oxford is a unique and historic institution consistently ranked among the top universities globally.",
    established: 1096,
    popularPrograms: ["Philosophy, Politics and Economics (PPE)", "Computer Science", "Medicine", "MBA"],
    requirements: ["IELTS 7.5 or equivalent", "GPA 3.8+", "Personal Statement & References"],
  },
  {
    name: "University of Toronto",
    country: "Canada",
    location: "Toronto, Canada",
    courses: 48,
    tuitionMin: 15000,
    tuitionMax: 25000,
    acceptanceRate: "~35%",
    rank: 21,
    subjectAreas: ["Arts", "Science", "Business", "Engineering", "Medicine"],
    isOfficialPartner: true,
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=600&auto=format&fit=crop",
    description: "Canada's top-ranked public research university, located in the vibrant city of Toronto.",
    established: 1827,
    popularPrograms: ["Computer Science", "Engineering", "Commerce/Finance", "Life Sciences"],
    requirements: ["IELTS 6.5+ or TOEFL 100+", "GPA 3.3+", "High school transcript"],
  },
  {
    name: "University of Melbourne",
    country: "Australia",
    location: "Melbourne, Australia",
    courses: 40,
    tuitionMin: 28000,
    tuitionMax: 38000,
    acceptanceRate: "~30%",
    rank: 33,
    subjectAreas: ["Arts", "Science", "Business", "Engineering", "Medicine"],
    isOfficialPartner: true,
    image: "https://images.unsplash.com/photo-1527891751199-7225231a68dd?q=80&w=600&auto=format&fit=crop",
    description: "Australia's leading research university, situated in the cultural capital of Melbourne.",
    established: 1853,
    popularPrograms: ["Business & Economics", "Biomedicine", "Engineering", "Arts & Humanities"],
    requirements: ["IELTS 6.5+", "GPA 3.0+", "Academic transcripts"],
  },
];

type UniversityRow = {
  id: number;
  name: string;
  country: string;
  location: string;
  courses: number;
  tuition_min: number;
  tuition_max: number;
  acceptance_rate: string;
  rank_order: number;
  subject_areas: string;
  is_official_partner: number;
  image: string;
  description: string;
  established: number;
  popular_programs: string;
  requirements: string;
};

async function ensureTableExists() {
  await query(`
    CREATE TABLE IF NOT EXISTS universities (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      country VARCHAR(100) NOT NULL,
      location VARCHAR(255) NOT NULL,
      courses INT NOT NULL DEFAULT 0,
      tuition_min INT NOT NULL DEFAULT 0,
      tuition_max INT NOT NULL DEFAULT 0,
      acceptance_rate VARCHAR(50) NOT NULL DEFAULT '',
      rank_order INT NOT NULL DEFAULT 0,
      subject_areas TEXT NOT NULL,
      is_official_partner TINYINT(1) NOT NULL DEFAULT 0,
      image TEXT NOT NULL,
      description TEXT NOT NULL,
      established INT NOT NULL DEFAULT 0,
      popular_programs TEXT NOT NULL,
      requirements TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
}

async function seedDefaults() {
  for (const university of defaultUniversities) {
    await query(
      `INSERT INTO universities
        (name, country, location, courses, tuition_min, tuition_max, acceptance_rate, rank_order, subject_areas, is_official_partner, image, description, established, popular_programs, requirements)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE name = name`,
      [
        university.name,
        university.country,
        university.location,
        university.courses,
        university.tuitionMin,
        university.tuitionMax,
        university.acceptanceRate,
        university.rank,
        JSON.stringify(university.subjectAreas),
        university.isOfficialPartner ? 1 : 0,
        university.image,
        university.description,
        university.established,
        JSON.stringify(university.popularPrograms),
        JSON.stringify(university.requirements),
      ]
    );
  }
}

function parseList(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}

function mapRow(row: UniversityRow) {
  return {
    id: row.id,
    name: row.name,
    country: row.country,
    location: row.location,
    courses: row.courses,
    tuitionMin: row.tuition_min,
    tuitionMax: row.tuition_max,
    acceptanceRate: row.acceptance_rate,
    rank: row.rank_order,
    subjectAreas: parseList(row.subject_areas),
    isOfficialPartner: Boolean(row.is_official_partner),
    image: row.image,
    description: row.description,
    established: row.established,
    popularPrograms: parseList(row.popular_programs),
    requirements: parseList(row.requirements),
  };
}

export async function GET() {
  try {
    await ensureTableExists();
    await seedDefaults();
    const rows = await query<UniversityRow[]>("SELECT * FROM universities ORDER BY rank_order ASC, name ASC");
    return NextResponse.json({ status: "success", data: rows.map(mapRow) });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureTableExists();
    const university = await request.json();
    if (!university.name || !university.country || !university.location) {
      return NextResponse.json({ status: "error", message: "Name, country, and location are required" }, { status: 400 });
    }

    const result = await query<{ insertId: number }>(
      `INSERT INTO universities
        (name, country, location, courses, tuition_min, tuition_max, acceptance_rate, rank_order, subject_areas, is_official_partner, image, description, established, popular_programs, requirements)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        university.name,
        university.country,
        university.location,
        Number(university.courses || 0),
        Number(university.tuitionMin || 0),
        Number(university.tuitionMax || 0),
        university.acceptanceRate || "",
        Number(university.rank || 0),
        JSON.stringify(university.subjectAreas || []),
        university.isOfficialPartner ? 1 : 0,
        university.image || "",
        university.description || "",
        Number(university.established || 0),
        JSON.stringify(university.popularPrograms || []),
        JSON.stringify(university.requirements || []),
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
    const university = await request.json();
    if (!university.id) {
      return NextResponse.json({ status: "error", message: "Missing university ID" }, { status: 400 });
    }

    await query(
      `UPDATE universities
       SET name = ?, country = ?, location = ?, courses = ?, tuition_min = ?, tuition_max = ?, acceptance_rate = ?, rank_order = ?, subject_areas = ?, is_official_partner = ?, image = ?, description = ?, established = ?, popular_programs = ?, requirements = ?
       WHERE id = ?`,
      [
        university.name,
        university.country,
        university.location,
        Number(university.courses || 0),
        Number(university.tuitionMin || 0),
        Number(university.tuitionMax || 0),
        university.acceptanceRate || "",
        Number(university.rank || 0),
        JSON.stringify(university.subjectAreas || []),
        university.isOfficialPartner ? 1 : 0,
        university.image || "",
        university.description || "",
        Number(university.established || 0),
        JSON.stringify(university.popularPrograms || []),
        JSON.stringify(university.requirements || []),
        university.id,
      ]
    );

    return NextResponse.json({ status: "success", message: "University updated successfully" });
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
      return NextResponse.json({ status: "error", message: "Missing university ID" }, { status: 400 });
    }

    await query("DELETE FROM universities WHERE id = ?", [id]);
    return NextResponse.json({ status: "success", message: "University deleted successfully" });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}
