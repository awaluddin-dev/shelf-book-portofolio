const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf-8');

const emailStr = `<a href="mailto:awal14h@gmail.com" className="flex items-center justify-between p-3 rounded-xl bg-neu-bg shadow-neu-inset hover:text-neu-accent transition-all group">
                  <span className="font-semibold text-neu-text">Email</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-neu-text-muted">awal14h@gmail.com</span>
                    <Mail size={16} className="text-neu-accent group-hover:scale-110 transition-transform" />
                  </div>
                </a>`;

if (code.includes(emailStr)) {
  code = code.replace(emailStr, '');
  fs.writeFileSync('app/page.tsx', code);
  console.log('Removed email successfully');
} else {
  console.log('Email block not found');
}
