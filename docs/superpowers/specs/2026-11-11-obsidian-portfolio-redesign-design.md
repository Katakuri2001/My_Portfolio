# Design Spec: OBSIDIAN — Portfolio Redesign + Admin Dashboard

**Date:** 2026-11-11
**Status:** Draft (pending user review)
**Repo:** https://github.com/Katakuri2001/portofolio-website.git

## 1. Goal

Completely redesign the existing React+Vite portfolio into a premium, futuristic "OBSIDIAN — The Digital Engineer" experience, and add a Cloudflare-backed admin dashboard so the owner (Kaung Set Hmue) can upload/manage project details.

## 2. Non-goals

- No invented live URLs, GitHub repos, clients, achievements, or metrics.
- No fake contact-form success. No fictional verified social links.
- No full backend rewrite beyond Cloudflare edge (Workers/D1/R2).
- No deployment to a Cloudflare account without explicit user approval of which account.

## 3. Architecture

### 3.1 Frontend
- React 19 + Vite 7 + Tailwind 3 + Framer Motion (existing).
- Add `react-router-dom` for `/`, `/admin`, `/admin/projects/*`.
- SPA deployed to Cloudflare Pages.
- Design tokens centralized in `tailwind.config.js` + `src/design/tokens.css`.

### 3.2 Backend (Cloudflare)
- Worker (Hono or plain fetch handler) at `worker/`.
- D1 database `portfolio_db` with `projects` table.
- R2 bucket `portfolio-images` for project images.
- Bindings declared in `wrangler.toml`.
- Admin routes protected by Cloudflare Access at the edge (no app-level auth).

### 3.3 Data model
```sql
CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,        -- completed | personal | conceptual
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  tech TEXT NOT NULL,            -- JSON array
  live_url TEXT,
  github_url TEXT,
  image_key TEXT,
  featured INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### 3.4 API (Worker)
- `GET /api/projects` — list (public).
- `GET /api/projects/:slug` — detail (public).
- `POST /api/projects` — create (admin, behind Access).
- `PUT /api/projects/:id` — update (admin).
- `DELETE /api/projects/:id` — delete (admin).
- `POST /api/upload` — presigned/R2 upload (admin).

Portfolio fetches `/api/projects` at runtime with a static fallback (`src/data/projects.seed.json`).

## 4. Visual design system (OBSIDIAN)

Colors:
- bg-primary #050507, bg-secondary #0A0A0F, bg-elevated #11111A
- accent-blue #5B8CFF, accent-violet #A78BFA, silver #D9DEEA, muted #9299AA
- Glass: translucent white, fine borders, layered blur, subtle highlights.

Typography: editorial, oversized headings, controlled line breaks. (Inter + a display serif/sans pairing TBD in implementation; prefer system + Inter to avoid extra font deps; may add one Google Font.)

Motion: Framer Motion, transform/opacity only, `prefers-reduced-motion`.

## 5. Navigation
- Desktop: floating liquid-glass sidebar, left edge, compact default, expands on click, KSH monogram, status indicator, active-section detection, hover tooltips, keyboard accessible.
- Mobile: floating bottom nav, ≤5 items, no content overlap.

Nav items: Home, About, Skills, Projects, Architecture, Approach, Contact.

## 6. Sections

### 6.1 Hero
Eyebrow "WEBSITE ENGINEER / FULL-STACK DEVELOPER"; heading "I Engineer Digital Experiences." with gradient highlights; description; CTAs "Explore My Work" / "Let's Connect"; availability indicator; SVG connected-system visual (CORE, Frontend/UI, API, Database, Cloud/EDGE) with animated lines, particles, orbital rings, parallax; scroll indicator.

### 6.2 About
Editorial: "Beyond writing code. I engineer complete systems." 4 numbered areas: Frontend (React, TS, modern interfaces), Backend (Node, Express, APIs, auth), Data (MySQL, MongoDB, data architecture), Cloud (Cloudflare, Workers, D1, R2). Asymmetric, fine dividers, glass surfaces, scroll reveals.

### 6.3 Skills
Categories FRONTEND (HTML, CSS, JS, TS, React, Next.js), BACKEND (Node, Express, Nest, JWT), DATABASE (MySQL, MongoDB), CLOUD (Cloudflare, Workers, D1, R2). Radial tech ecosystem (desktop) → category selector (mobile). No proficiency percentages.

### 6.4 Projects
Premium gallery, distinct presentations, detail modal (a11y), image zoom, hover, reveal. Seed 6 projects as conceptual/personal with neutral descriptions, no fake URLs. Images: original SVG/CSS visuals or local assets.

### 6.5 Architecture
Vertical layered diagram: Experience → Frontend → API/Backend → Data → Infrastructure, animated connectors + particles.

### 6.6 Approach
6 principles: UX, Performance, Architecture, Security, Scalability, Reliability. Editorial numbered layout.

### 6.7 Contact
"Have an idea? Let's engineer it." Form (name, email, project details, message) with honest states + mailto fallback. GitHub/LinkedIn/email placeholders (verified URLs to be provided).

### 6.8 Footer
KSH monogram, name, title, nav links, socials, dynamic year, back-to-top.

## 7. Admin dashboard
Routes under `/admin`: list, new, edit. Form fields per data model. Image upload to R2. Honest status. Protected by Cloudflare Access.

## 8. Responsive
Breakpoints: 320, 375, 390, 430, 768, 1024, 1280, 1440, 1920. No horizontal overflow, no clipped text, no broken SVGs, intentional mobile layouts.

## 9. Accessibility
WCAG AA contrast, keyboard nav, focus management in modals, `prefers-reduced-motion`, aria labels on icon buttons.

## 10. Testing
Build (`tsc -b && vite build`), lint, manual responsive check, reduced-motion, console errors, asset checks.

## 11. Open items requiring user input
- Cloudflare account selection (notify before creating resources).
- Verified GitHub/LinkedIn/email URLs.
- Real project screenshots (optional; SVG/CSS placeholders used otherwise).

## 12. Out of scope for this iteration
- Actual deployment to Cloudflare (code + config shipped; deploy after account confirmation).
- Email delivery for contact form (mailto fallback only).