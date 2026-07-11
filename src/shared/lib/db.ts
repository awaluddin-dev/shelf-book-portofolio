import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data.json');

export function getDb() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({
      status: 'available',
      testimonials: []
    }));
  }
  return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}

export function saveDb(data: any) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}
