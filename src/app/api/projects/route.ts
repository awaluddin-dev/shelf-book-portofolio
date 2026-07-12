import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/shared/lib/db';

export async function GET() {
  const db = getDb();
  return NextResponse.json({ projects: db.projects || [] });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const db = getDb();
    
    if (!db.projects) db.projects = [];
    
    const newProject = {
      id: data.id || 'proj_' + Date.now(),
      title: data.title || '',
      subtitle: data.subtitle || '',
      category: data.category || '',
      tags: data.tags || [],
      spineColor: data.spineColor || 'bg-blue-600',
      coverColor: data.coverColor || 'bg-blue-900',
      spineText: data.spineText || '',
      date: data.date || '',
      demoUrl: data.demoUrl || '',
      github: data.github || '',
      stats: data.stats || [],
      phases: data.phases || [],
      markdown: data.markdown || ''
    };
    
    db.projects.push(newProject);
    saveDb(db);
    
    return NextResponse.json({ success: true, project: newProject });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create project' }, { status: 500 });
  }
}
