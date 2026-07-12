import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/shared/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = getDb();
  return NextResponse.json({ roadmap: db.roadmap || [] });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = getDb();
    
    if (!db.roadmap) db.roadmap = [];
    
    const newItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(7),
      ...body,
      createdAt: new Date().toISOString()
    };
    
    db.roadmap.push(newItem);
    saveDb(db);
    
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add item' }, { status: 500 });
  }
}
