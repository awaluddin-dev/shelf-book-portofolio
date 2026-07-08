const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf-8');

// Replace state init
code = code.replace(
  "const [portfolioStatus, setPortfolioStatus] = useState<'available' | 'busy'>('available');",
  "const [portfolioStatus, setPortfolioStatus] = useState<'available' | 'busy'>('available');\n  useEffect(() => {\n    fetch('/api/status').then(res => res.json()).then(data => setPortfolioStatus(data.status));\n  }, []);"
);

// Remove the toggle button from hero section
const toggleRegex = /\s*{\/\* Elegant low-profile toggle switch \*\/}[\s\S]*?<\/button>/;
code = code.replace(toggleRegex, '');

fs.writeFileSync('app/page.tsx', code);
console.log('patched');
