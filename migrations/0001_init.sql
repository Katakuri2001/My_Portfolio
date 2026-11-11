CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  tech TEXT NOT NULL,
  live_url TEXT,
  github_url TEXT,
  image_key TEXT,
  featured INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- Seed projects (conceptual/personal, no fake URLs)
INSERT OR IGNORE INTO projects (id, slug, title, category, summary, description, tech, live_url, github_url, image_key, featured, sort_order, created_at, updated_at) VALUES
('aurora-commerce','aurora-commerce','Aurora Commerce','conceptual','A conceptual storefront exploring catalog browsing, cart state, and checkout flow.','A self-initiated concept project exploring the structure of a modern e-commerce experience.','["React","TypeScript","Tailwind CSS","Zustand"]',NULL,NULL,NULL,1,0,datetime('now'),datetime('now')),
('signal-analytics','signal-analytics','Signal Analytics','conceptual','A dashboard concept for visualizing time-series metrics and alerts.','An experimental analytics dashboard exploring data visualization and alert affordances.','["React","TypeScript","Recharts","Tailwind CSS"]',NULL,NULL,NULL,1,1,datetime('now'),datetime('now')),
('forge-api','forge-api','Forge API','personal','A personal REST API experiment with auth and resource endpoints.','A personal backend experiment implementing a small REST API with authentication and CRUD.','["Node.js","Express.js","JWT","MySQL"]',NULL,NULL,NULL,0,2,datetime('now'),datetime('now')),
('atlas-docs','atlas-docs','Atlas Docs','conceptual','A documentation site concept with search and structured navigation.','A concept documentation experience exploring sidebar navigation and search.','["React","TypeScript","MDX","Tailwind CSS"]',NULL,NULL,NULL,0,3,datetime('now'),datetime('now')),
('pulse-monitor','pulse-monitor','Pulse Monitor','personal','A personal uptime/health monitoring experiment.','A personal experiment in health-check polling and status presentation.','["Node.js","Cloudflare Workers","D1"]',NULL,NULL,NULL,0,4,datetime('now'),datetime('now')),
('nimbus-studio','nimbus-studio','Nimbus Studio','conceptual','A landing-page concept for a creative studio.','A self-initiated landing page concept exploring hero composition and motion.','["React","Framer Motion","Tailwind CSS"]',NULL,NULL,NULL,0,5,datetime('now'),datetime('now'));
