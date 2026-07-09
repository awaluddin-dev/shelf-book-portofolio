import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = getDb();
  return NextResponse.json({ status: db.status });
}

export async function POST(req: Request) {
  const { status } = await req.json();
  const db = getDb();
  db.status = status;
  saveDb(db);
  return NextResponse.json({ success: true, status: db.status });
}
