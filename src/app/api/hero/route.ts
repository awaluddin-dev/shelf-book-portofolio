import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/shared/lib/db';

export async function GET() {
  const db = getDb();
  return NextResponse.json({
    heroConfig: db.heroConfig || {},
    metrics: db.metrics || []
  });
}

export async function PATCH(req: Request) {
  try {
    const data = await req.json();
    const db = getDb();
    
    if (data.heroConfig) {
      db.heroConfig = { ...db.heroConfig, ...data.heroConfig };
    }
    if (data.metrics) {
      db.metrics = data.metrics;
    }
    
    saveDb(db);
    return NextResponse.json({ success: true, heroConfig: db.heroConfig, metrics: db.metrics });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update hero config' }, { status: 500 });
  }
}
