const fs = require('fs');
const dbPath = './data.json';

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

if (!db.heroConfig) {
  db.heroConfig = {
    resumeUrl: "https://github.com/awaluddin-dev",
    expertise: "Async pipelines, event-driven architecture, and LLM integration for enterprise & fintech.",
    grit: "Survived a solo OJK & BI regulatory audit as the only engineer. Moved from HVAC blueprints to production microservices in under 2 years.",
    service: "I don't just ship code — I reduce costs, cut vendors, and leave systems better than I found them."
  };
}

if (!db.metrics) {
  db.metrics = [
    { id: "m_1", val: "5+ Years", label: "Engineering Experience", icon: "Code2", isSavings: false },
    { id: "m_2", val: "Enterprise & Fintech", label: "INDUSTRY EXPERIENCE", icon: "Briefcase", isSavings: false },
    { id: "m_3", val: "$18K/yr", label: "Infra Cost Savings", icon: "TrendingUp", isSavings: true },
    { id: "m_4", val: "@ Astra Group", label: "CURRENT CONTRACT", icon: "MapPin", isSavings: false }
  ];
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log("Database seeded successfully.");
