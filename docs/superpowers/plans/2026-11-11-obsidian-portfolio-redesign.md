# OBSIDIAN Portfolio Redesign — Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Redesign the portfolio into the OBSIDIAN aesthetic and add a Cloudflare-backed admin dashboard for project management.

**Architecture:** Single React+Vite SPA with react-router. Cloudflare Pages + Worker (D1 + R2) for projects API. Admin at /admin protected by Cloudflare Access. Public portfolio fetches projects at runtime with static seed fallback.

**Tech Stack:** React 19, Vite 7, Tailwind 3, Framer Motion 12, react-router-dom, TypeScript (config), Cloudflare Workers + D1 + R2 + Wrangler.

**Spec:** docs/superpowers/specs/2026-11-11-obsidian-portfolio-redesign-design.md

## Global Constraints
- Colors exact per spec (bg #050507/#0A0A0F/#11111A; accents #5B8CFF/#A78BFA/#D9DEEA/#9299AA).
- No invented URLs/metrics/clients.
- Placeholders OK for social/contact URLs.
- Seed 6 projects as conceptual/personal with neutral descriptions.
- Transform/opacity only for animations; respect prefers-reduced-motion.
- No horizontal overflow at any breakpoint.
- Cloudflare account: DO NOT create resources without user confirmation.

## Review Focus
- Production asset paths (import SVGs, not /src strings).
- Broken favicon (public/vite.svg deleted) — restore or replace.
- Admin auth is edge-level (Cloudflare Access) — app must not fake auth.
- Contact form must not claim success without backend.
- Mobile layouts must not just shrink desktop.

---

## Phase 0 — Foundation (routing, tokens, layout shell)

### Task 0.1: Install react-router-dom
- [ ] Run `npm install react-router-dom`
- [ ] Commit.

### Task 0.2: Design tokens
- Create `src/design/tokens.css` with CSS vars for colors/glass/spacing/motion.
- Update `tailwind.config.js` theme.extend.colors to reference tokens + add obsidian palette.
- Commit.

### Task 0.3: Routing shell
- Modify `src/main.tsx` to use BrowserRouter.
- Rewrite `src/App.jsx` to define routes: `/` (Portfolio), `/admin` (AdminLayout), `/admin/projects/new`, `/admin/projects/:id`.
- Commit.

### Task 0.4: Remove dead template files
- Delete `src/App.tsx`, `src/App.css`.
- Commit.

## Phase 1 — UI primitives

### Task 1.1: GlassCard, Button, Section, Container components
- Create `src/components/ui/GlassCard.jsx`, `Button.jsx`, `Section.jsx`, `Container.jsx`.
- Commit.

### Task 1.2: Motion variants
- Create `src/design/motion.js` with shared Framer variants (fadeIn, stagger, etc.) respecting reduced motion.
- Commit.

## Phase 2 — Navigation

### Task 2.1: Sidebar (desktop) + BottomNav (mobile)
- Create `src/components/navigation/Sidebar.jsx`, `BottomNav.jsx`, `NavItem.jsx`.
- Implement expand/collapse, active detection, tooltips, keyboard.
- Commit.

## Phase 3 — Sections (Hero, About, Skills)

### Task 3.1: Hero with SVG connected system
### Task 3.2: About editorial
### Task 3.3: Skills radial ecosystem

## Phase 4 — Projects + Architecture + Approach + Contact + Footer

### Task 4.1: Projects gallery + modal
### Task 4.2: Architecture diagram
### Task 4.3: Approach principles
### Task 4.4: Contact form (honest states)
### Task 4.5: Footer

## Phase 5 — Admin dashboard

### Task 5.1: Admin layout + list
### Task 5.2: Project form (create/edit)
### Task 5.3: Delete + status

## Phase 6 — Cloudflare backend

### Task 6.1: wrangler.toml + worker scaffold
### Task 6.2: D1 migration + seed
### Task 6.3: Worker routes (CRUD + upload)
### Task 6.4: Portfolio API client + fallback

## Phase 7 — Polish & testing

### Task 7.1: Responsive audit
### Task 7.2: Reduced motion
### Task 7.3: Build + lint
### Task 7.4: Remove leftover issues (favicon, asset paths)

---

## Execution notes
- Build after each phase.
- Commit after each task.
- Notify user before creating Cloudflare resources.