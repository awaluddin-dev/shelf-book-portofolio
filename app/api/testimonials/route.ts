import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';
import { testimonials as defaultTestimonials } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = getDb();
  // Merge default with custom ones
  return NextResponse.json({ testimonials: [...defaultTestimonials, ...(db.testimonials || [])] });
}

export async function POST(req: Request) {
  const data = await req.json();
  const db = getDb();
  if (!db.testimonials) db.testimonials = [];
  
  db.testimonials.push({
    id: 't' + Date.now(),
    name: data.name,
    role: data.role || 'Guest',
    company: data.company || 'Unknown',
    photoUrl: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=200&h=200',
    testimonial: data.testimonial,
    relationship: data.relationship || 'Colleague',
    tags: ['Community', 'Endorsement']
  });
  
  saveDb(db);
  return NextResponse.json({ success: true });
}
