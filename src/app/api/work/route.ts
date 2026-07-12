import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/shared/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = getDb();
  return NextResponse.json({ workExperience: db.workExperience || [] });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = getDb();
    
    if (!db.workExperience) db.workExperience = [];
    
    const newWork = {
      id: Date.now().toString() + Math.random().toString(36).substring(7),
      ...body,
      createdAt: new Date().toISOString()
    };
    
    db.workExperience.push(newWork);
    saveDb(db);
    
    return NextResponse.json(newWork, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add work experience' }, { status: 500 });
  }
}
