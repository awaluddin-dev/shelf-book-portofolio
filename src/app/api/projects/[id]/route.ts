import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/shared/lib/db';

export async function PATCH(req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const { id } = params;
    const data = await req.json();
    const db = getDb();
    
    if (!db.projects) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    
    const index = db.projects.findIndex((p: any) => p.id === id);
    if (index === -1) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    
    db.projects[index] = { ...db.projects[index], ...data };
    saveDb(db);
    
    return NextResponse.json({ success: true, project: db.projects[index] });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const { id } = params;
    const db = getDb();
    
    if (!db.projects) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    
    const index = db.projects.findIndex((p: any) => p.id === id);
    if (index === -1) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    
    db.projects.splice(index, 1);
    saveDb(db);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete project' }, { status: 500 });
  }
}
