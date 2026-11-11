// Cloudflare Pages Function: handles all /api/* routes (mirrors worker/index.js).
export async function onRequest(context) {
  const { request, env, params } = context;
  const url = new URL(request.url);
  const origin = env.ALLOWED_ORIGIN || '*';

  const json = (data, status = 200) =>
    new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } });

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } });
  }

  const rowToProject = (row) => ({
    id: row.id, slug: row.slug, title: row.title, category: row.category, summary: row.summary,
    description: row.description, tech: JSON.parse(row.tech || '[]'), liveUrl: row.live_url,
    githubUrl: row.github_url, imageKey: row.image_key, featured: !!row.featured, sortOrder: row.sort_order,
    createdAt: row.created_at, updatedAt: row.updated_at,
  });

  try {
    if (url.pathname === '/api/projects' && request.method === 'GET') {
      const { results } = await env.DB.prepare('SELECT * FROM projects ORDER BY sort_order ASC, created_at DESC').all();
      return json(results.map(rowToProject));
    }
    const m = url.pathname.match(/^\/api\/projects\/([^/]+)$/);
    if (m && request.method === 'GET') {
      const row = await env.DB.prepare('SELECT * FROM projects WHERE slug = ? OR id = ?').bind(m[1], m[1]).first();
      if (!row) return json({ error: 'Not found' }, 404);
      return json(rowToProject(row));
    }
    if (url.pathname === '/api/projects' && request.method === 'POST') {
      const body = await request.json();
      const id = body.slug || crypto.randomUUID();
      const now = new Date().toISOString();
      await env.DB.prepare(`INSERT INTO projects (id, slug, title, category, summary, description, tech, live_url, github_url, image_key, featured, sort_order, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
        .bind(id, body.slug, body.title, body.category, body.summary, body.description, JSON.stringify(body.tech || []), body.liveUrl || null, body.githubUrl || null, body.imageKey || null, body.featured ? 1 : 0, body.sortOrder || 0, now, now).run();
      return json({ id, slug: body.slug }, 201);
    }
    if (m && request.method === 'PUT') {
      const body = await request.json();
      const now = new Date().toISOString();
      await env.DB.prepare(`UPDATE projects SET title=?, category=?, summary=?, description=?, tech=?, live_url=?, github_url=?, image_key=?, featured=?, sort_order=?, updated_at=? WHERE id=?`)
        .bind(body.title, body.category, body.summary, body.description, JSON.stringify(body.tech || []), body.liveUrl || null, body.githubUrl || null, body.imageKey || null, body.featured ? 1 : 0, body.sortOrder || 0, now, m[1]).run();
      return json({ ok: true });
    }
    if (m && request.method === 'DELETE') {
      await env.DB.prepare('DELETE FROM projects WHERE id = ?').bind(m[1]).run();
      return json({ ok: true });
    }
    if (url.pathname === '/api/content' && request.method === 'GET') {
      const { results } = await env.DB.prepare('SELECT section, data FROM site_content').all();
      const out = {};
      for (const r of results) { try { out[r.section] = JSON.parse(r.data); } catch { out[r.section] = r.data; } }
      return json(out);
    }
    const cm = url.pathname.match(/^\/api\/content\/([^/]+)$/);
    if (cm && request.method === 'GET') {
      const row = await env.DB.prepare('SELECT data FROM site_content WHERE section = ?').bind(cm[1]).first();
      if (!row) return json({ error: 'Not found' }, 404);
      try { return json(JSON.parse(row.data)); } catch { return json(row.data); }
    }
    if (cm && request.method === 'PUT') {
      const body = await request.json();
      const now = new Date().toISOString();
      await env.DB.prepare('INSERT INTO site_content (section, data, updated_at) VALUES (?,?,?) ON CONFLICT(section) DO UPDATE SET data=excluded.data, updated_at=excluded.updated_at')
        .bind(cm[1], JSON.stringify(body), now).run();
      return json({ ok: true });
    }
    if (url.pathname === '/api/upload' && request.method === 'POST') {
      if (!env.IMAGES) return json({ error: 'R2 not configured' }, 503);
      const form = await request.formData();
      const file = form.get('file');
      if (!file) return json({ error: 'No file' }, 400);
      const key = `${Date.now()}-${file.name}`;
      await env.IMAGES.put(key, file.stream(), { httpMetadata: { contentType: file.type } });
      return json({ key, url: `/images/${key}` }, 201);
    }
    return json({ error: 'Not found' }, 404);
  } catch (err) {
    return json({ error: String(err?.message || err) }, 500);
  }
}
