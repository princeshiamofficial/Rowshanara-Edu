import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

interface FaqRow {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
}

const defaultFaqs = [
  { question: "What is the typical timeline for the entire process?", answer: "The entire process from initial consultation to visa approval typically takes between 3 to 6 months, depending on the country, course intake, and university processing times. We recommend starting your application at least 6-8 months before your desired intake date.", sort_order: 0 },
  { question: "How much does your counselling service cost?", answer: "Our initial profile assessment and university admission counselling services are completely free. For specialized test preparations, NAATI CCL classes, and document processing assistance, minor administration fees may apply depending on the program selected.", sort_order: 1 },
  { question: "Do you guarantee university admission?", answer: "While we do not guarantee admission, we maintain a 98% admission success rate. Our counselors carefully evaluate your academic profile and match you with universities where you meet all entry requirements, significantly maximizing your acceptance probability.", sort_order: 2 },
  { question: "Can you help with part-time work opportunities?", answer: "Yes, during our pre-departure and post-arrival orientations, we guide you on student work rights, local employment regulations, CV writing matching international standards, and top platforms to secure part-time jobs in your study destination.", sort_order: 3 },
  { question: "What if my visa application is rejected?", answer: "In the rare event of a visa refusal, our compliance team reviews the rejection letter, addresses the specific concerns raised by immigration officers, updates your financial and SOP documentation, and assists you in filing a strong re-application or appeal.", sort_order: 4 },
  { question: "Do you offer support for postgraduate studies?", answer: "Absolutely! We offer comprehensive advisory services for Masters, MBA, and PhD programs, including research proposal guidance, supervisor communication support, statement of purpose (SOP) reviews, and postgraduate scholarship opportunities.", sort_order: 5 },
  { question: "How do I stay in touch after I depart?", answer: "We offer dedicated post-arrival student support, and our team remains reachable via our WhatsApp support hotline. We also help connect you with our student alumni network in your destination city for peer mentoring.", sort_order: 6 },
  { question: "Can I change my university after admission?", answer: "Yes, university changes are possible but subject to strict visa regulations and institution release policy compliance. Our team will guide you through the official credit transfers, release request filings, and visa status safety checks.", sort_order: 7 },
];

async function ensureTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS faqs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      sort_order INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export async function GET() {
  try {
    await ensureTable();
    let rows = await query<FaqRow[]>('SELECT * FROM faqs ORDER BY sort_order ASC, id ASC');
    if (rows.length === 0) {
      for (const f of defaultFaqs) {
        await query(
          'INSERT INTO faqs (question, answer, sort_order) VALUES (?, ?, ?)',
          [f.question, f.answer, f.sort_order]
        );
      }
      rows = await query<FaqRow[]>('SELECT * FROM faqs ORDER BY sort_order ASC, id ASC');
    }
    const faqs = rows.map(r => ({ id: r.id, q: r.question, a: r.answer, sortOrder: r.sort_order }));
    return NextResponse.json({ status: 'success', data: faqs });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureTable();
    const { question, answer } = await request.json();
    if (!question || !answer) {
      return NextResponse.json({ status: 'error', message: 'Question and answer are required' }, { status: 400 });
    }
    const maxRes = await query<{ m: number }[]>('SELECT COALESCE(MAX(sort_order), -1) as m FROM faqs');
    const nextOrder = (maxRes[0]?.m ?? -1) + 1;
    const result = await query<{ insertId: number }>(
      'INSERT INTO faqs (question, answer, sort_order) VALUES (?, ?, ?)',
      [question, answer, nextOrder]
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
    const { id, question, answer } = await request.json();
    if (!id || !question || !answer) {
      return NextResponse.json({ status: 'error', message: 'Missing required fields' }, { status: 400 });
    }
    await query('UPDATE faqs SET question = ?, answer = ? WHERE id = ?', [question, answer, id]);
    return NextResponse.json({ status: 'success', message: 'FAQ updated' });
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
    await query('DELETE FROM faqs WHERE id = ?', [id]);
    return NextResponse.json({ status: 'success', message: 'FAQ deleted' });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    await ensureTable();
    const { order } = await request.json();
    if (!Array.isArray(order)) {
      return NextResponse.json({ status: 'error', message: 'Invalid payload' }, { status: 400 });
    }
    for (const item of order) {
      await query('UPDATE faqs SET sort_order = ? WHERE id = ?', [item.sortOrder, item.id]);
    }
    return NextResponse.json({ status: 'success', message: 'Order saved' });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
