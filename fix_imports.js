const fs = require('fs');
const path = require('path');

const replacements = [
  { from: /@\/components\/ThemeProvider/g, to: '@/shared/ui/ThemeProvider' },
  { from: /@\/lib\/utils/g, to: '@/shared/lib/utils' },
  { from: /@\/lib\/data/g, to: '@/entities/testimonial/model/data' },
  { from: /@\/lib\/projects-data/g, to: '@/entities/project/model/projects-data' },
  { from: /@\/lib\/github-data/g, to: '@/entities/project/model/github-data' },
  { from: /@\/lib\/roadmap-data/g, to: '@/entities/skill/model/roadmap-data' },
  { from: /@\/lib\/tech-icons/g, to: '@/shared/lib/tech-icons' },
  { from: /@\/lib\/db/g, to: '@/shared/lib/db' },
  { from: /@\/components\/SkillTree/g, to: '@/entities/skill/ui/SkillTree' },
  { from: /@\/components\/ProjectArchitectureDiagram/g, to: '@/entities/project/ui/ProjectArchitectureDiagram' },
  { from: /@\/components\/ProjectGalleryShowcase/g, to: '@/entities/project/ui/ProjectGalleryShowcase' },
  { from: /@\/components\/ProjectLifecycleTracker/g, to: '@/entities/project/ui/ProjectLifecycleTracker' },
  { from: /@\/components\/BookItem/g, to: '@/entities/project/ui/BookItem' },
  { from: /@\/hooks\/use-mobile/g, to: '@/shared/lib/hooks/use-mobile' },
];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  replacements.forEach(rep => {
    content = content.replace(rep.from, rep.to);
  });
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
  }
});
