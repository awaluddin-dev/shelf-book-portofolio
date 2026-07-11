import os
import re

replacements = [
  (r'@/components/ThemeProvider', '@/shared/ui/ThemeProvider'),
  (r'@/lib/utils', '@/shared/lib/utils'),
  (r'@/lib/data', '@/entities/testimonial/model/data'),
  (r'@/lib/projects-data', '@/entities/project/model/projects-data'),
  (r'@/lib/github-data', '@/entities/project/model/github-data'),
  (r'@/lib/roadmap-data', '@/entities/skill/model/roadmap-data'),
  (r'@/lib/tech-icons', '@/shared/lib/tech-icons'),
  (r'@/lib/db', '@/shared/lib/db'),
  (r'@/components/SkillTree', '@/entities/skill/ui/SkillTree'),
  (r'@/components/ProjectArchitectureDiagram', '@/entities/project/ui/ProjectArchitectureDiagram'),
  (r'@/components/ProjectGalleryShowcase', '@/entities/project/ui/ProjectGalleryShowcase'),
  (r'@/components/ProjectLifecycleTracker', '@/entities/project/ui/ProjectLifecycleTracker'),
  (r'@/components/BookItem', '@/entities/project/ui/BookItem'),
  (r'@/hooks/use-mobile', '@/shared/lib/hooks/use-mobile'),
]

for root, _, files in os.walk('./src'):
    for file in files:
        if file.endswith('.ts') or file.endswith('.tsx'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            orig = content
            for old, new in replacements:
                content = re.sub(old, new, content)
                
            if content != orig:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated {path}")
