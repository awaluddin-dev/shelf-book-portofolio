const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf-8');

// Replace standard testimonials import logic to load dynamically
code = code.replace(
  "import { projects, testimonials } from '@/lib/data';",
  "import { projects } from '@/lib/data';\nimport { Testimonial } from '@/lib/data';"
);

// We need to add state for testimonials
const stateInsertPos = code.indexOf("const [portfolioStatus, setPortfolioStatus]");
const stateCode = "const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>([]);\n  useEffect(() => {\n    fetch('/api/testimonials').then(res => res.json()).then(data => setTestimonialsList(data.testimonials));\n  }, []);\n  ";
code = code.slice(0, stateInsertPos) + stateCode + code.slice(stateInsertPos);

// Now replace mapping over testimonials to use testimonialsList
code = code.replace(/\{\[\.\.\.testimonials, \.\.\.testimonials, \.\.\.testimonials\]\.map/g, "{[...testimonialsList, ...testimonialsList, ...testimonialsList].map");

fs.writeFileSync('app/page.tsx', code);
console.log('testimonials patched');
