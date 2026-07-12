import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/shared/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = getDb();
  return NextResponse.json({ proficiency: db.proficiency || [] });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = getDb();
    
    if (!db.proficiency) db.proficiency = [];
    
    const newItem = {
      id: Date.now().toString() + Math.random().toString(36).substring(7),
      ...body,
      createdAt: new Date().toISOString()
    };
    
    db.proficiency.push(newItem);
    saveDb(db);
    
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add item' }, { status: 500 });
  }
}
