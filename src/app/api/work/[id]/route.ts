import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/shared/lib/db';

export const dynamic = 'force-dynamic';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const db = getDb();
    
    if (!db.workExperience) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    
    const index = db.workExperience.findIndex((w: any) => w.id === id);
    if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    
    db.workExperience[index] = { ...db.workExperience[index], ...body };
    saveDb(db);
    
    return NextResponse.json(db.workExperience[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDb();
    
    if (!db.workExperience) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    
    const index = db.workExperience.findIndex((w: any) => w.id === id);
    if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    
    db.workExperience.splice(index, 1);
    saveDb(db);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
