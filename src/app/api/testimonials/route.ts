import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface TestimonialRow {
  id: number;
  student_name: string;
  photo_url: string;
  rating: number;
  comment: string;
  is_featured: number;
  created_at: Date;
}

const defaultTestimonials = [
  {
    name: "Fatima Ahmed (University of Toronto)",
    image: "/fatima.png",
    rating: 5,
    comment: "Rowshanara Edu made my dream of studying abroad a reality. Their guidance was invaluable!",
    featured: 1
  },
  {
    name: "Karim Hassan (University of Melbourne)",
    image: "/karim.png",
    rating: 5,
    comment: "Professional, efficient, and genuinely caring team. Highly recommended!",
    featured: 1
  },
  {
    name: "Aisha Khan (London School of Economics)",
    image: "/aisha.png",
    rating: 5,
    comment: "Best decision I made was choosing Rowshanara Edu. Worth every penny!",
    featured: 1
  }
];

async function ensureTableExists() {
  await query(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id INT AUTO_INCREMENT PRIMARY KEY,
      student_name VARCHAR(255) NOT NULL,
      photo_url VARCHAR(512) NOT NULL DEFAULT '',
      rating INT NOT NULL DEFAULT 5,
      comment TEXT NOT NULL,
      is_featured TINYINT(1) NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

async function seedDefaults() {
  const countRes = await query<any[]>("SELECT COUNT(*) as count FROM testimonials");
  if (countRes[0].count === 0) {
    for (const item of defaultTestimonials) {
      await query(
        `INSERT INTO testimonials (student_name, photo_url, rating, comment, is_featured)
         VALUES (?, ?, ?, ?, ?)`,
        [item.name, item.image, item.rating, item.comment, item.featured]
      );
    }
  }
}

function mapRow(row: TestimonialRow) {
  return {
    id: row.id,
    studentName: row.student_name,
    photoUrl: row.photo_url || "",
    rating: row.rating,
    comment: row.comment,
    isFeatured: Boolean(row.is_featured),
    createdAt: row.created_at
  };
}

export async function GET(request: Request) {
  try {
    await ensureTableExists();
    await seedDefaults();

    const { searchParams } = new URL(request.url);
    const onlyFeatured = searchParams.get("featured") === "true";

    let rows;
    if (onlyFeatured) {
      rows = await query<TestimonialRow[]>("SELECT * FROM testimonials WHERE is_featured = 1 ORDER BY created_at DESC");
    } else {
      rows = await query<TestimonialRow[]>("SELECT * FROM testimonials ORDER BY created_at DESC");
    }

    return NextResponse.json({ status: "success", data: rows.map(mapRow) });
  } catch (error: any) {
    console.error("GET Testimonials error:", error);
    return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureTableExists();
    const body = await request.json();
    const { studentName, photoUrl, rating, comment, isFeatured } = body;

    if (!studentName || !comment) {
      return NextResponse.json({ status: "error", message: "Name and comment are required" }, { status: 400 });
    }

    const result = await query<{ insertId: number }>(
      `INSERT INTO testimonials (student_name, photo_url, rating, comment, is_featured)
       VALUES (?, ?, ?, ?, ?)`,
      [studentName, photoUrl || "", Number(rating || 5), comment, isFeatured ? 1 : 0]
    );

    return NextResponse.json({ status: "success", data: { id: result.insertId } });
  } catch (error: any) {
    console.error("POST Testimonial error:", error);
    return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await ensureTableExists();
    const body = await request.json();
    const { id, studentName, photoUrl, rating, comment, isFeatured } = body;

    if (!id || !studentName || !comment) {
      return NextResponse.json({ status: "error", message: "ID, name, and comment are required" }, { status: 400 });
    }

    await query(
      `UPDATE testimonials
       SET student_name = ?, photo_url = ?, rating = ?, comment = ?, is_featured = ?
       WHERE id = ?`,
      [studentName, photoUrl || "", Number(rating || 5), comment, isFeatured ? 1 : 0, id]
    );

    return NextResponse.json({ status: "success", message: "Testimonial updated successfully" });
  } catch (error: any) {
    console.error("PUT Testimonial error:", error);
    return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await ensureTableExists();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ status: "error", message: "Missing testimonial ID" }, { status: 400 });
    }

    await query("DELETE FROM testimonials WHERE id = ?", [id]);
    return NextResponse.json({ status: "success", message: "Testimonial deleted successfully" });
  } catch (error: any) {
    console.error("DELETE Testimonial error:", error);
    return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
  }
}
