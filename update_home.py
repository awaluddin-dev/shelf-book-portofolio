import re

with open('src/pages/home/ui/Home.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add imports
imports = """import { experiencesList } from '@/entities/experience/model/experience-data';
import { skillCategoriesList } from '@/entities/skill/model/skill-data';
"""

content = content.replace("import { commitActivityData", imports + "import { commitActivityData")

# Remove the hardcoded experiencesList array
content = re.sub(r'const experiencesList = \[.*?\];', '', content, flags=re.DOTALL)

# Remove the hardcoded skillCategoriesList array
content = re.sub(r'const skillCategoriesList = \[.*?\];', '', content, flags=re.DOTALL)

with open('src/pages/home/ui/Home.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
