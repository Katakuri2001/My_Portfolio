CREATE TABLE IF NOT EXISTS site_content (
  section TEXT PRIMARY KEY,
  data TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- Seed default content
INSERT OR IGNORE INTO site_content (section, data, updated_at) VALUES
('hero', '{"eyebrow":"Website Engineer / Full-Stack Developer","title":"I Engineer","highlight":"Digital Experiences.","description":"I build modern digital products by connecting thoughtful interfaces, reliable backend systems, and scalable cloud infrastructure.","ctaPrimary":"Explore My Work","ctaSecondary":"Let’s Connect","availability":"Available for work"}', datetime('now')),
('about', '{"heading":"Beyond writing code.\\nI engineer complete systems.","body1":"I’m a website engineer who designs and builds complete digital products — from the first pixel of an interface to the last line of infrastructure.","body2":"I care about the whole system: performance, maintainability, security, and the experience of the people who use and build on what I ship.","stats":[{"n":"50+","l":"Projects"},{"n":"12+","l":"Technologies"},{"n":"Full-Stack","l":"Engineer"}]}', datetime('now')),
('contact', '{"email":"hello@portfolio.com","location":"Available worldwide","availability":"Open to opportunities","github":"","linkedin":"","twitter":""}', datetime('now')),
('footer', '{"name":"Kaung Set Hmue","title":"Website Engineer"}', datetime('now')),
('skills', '{"categories":[{"key":"FRONTEND","skills":["HTML","CSS","JavaScript","TypeScript","React","Next.js"]},{"key":"BACKEND","skills":["Node.js","Nest.js","Hono","Java","JWT","Prisma"]},{"key":"DATABASE","skills":["MySQL","PostgreSQL"]},{"key":"CLOUD","skills":["Cloudflare","Railway"]}]}', datetime('now'));
