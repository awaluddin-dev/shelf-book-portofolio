import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { status } = await req.json();

    const db = getDb();
    if (!db.testimonials) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const index = db.testimonials.findIndex((t: any) => t.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    db.testimonials[index].status = status;
    saveDb(db);

    return NextResponse.json({ success: true, testimonial: db.testimonials[index] });
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
