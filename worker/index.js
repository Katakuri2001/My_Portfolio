// Cloudflare Worker: portfolio projects API + image upload.
// Bindings: DB (D1), IMAGES (R2). Admin routes are protected by Cloudflare Access at the edge.

const json = (data, status = 200, origin = '*') =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' },
  });

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = env.ALLOWED_ORIGIN || '*';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } });
    }

    try {
      // Public: site content
      if (url.pathname === '/api/content' && request.method === 'GET') {
        const { results } = await env.DB.prepare('SELECT section, data FROM site_content').all();
        const out = {};
        for (const r of results) { try { out[r.section] = JSON.parse(r.data); } catch { out[r.section] = r.data; } }
        return json(out, 200, origin);
      }
      const cm = url.pathname.match(/^\/api\/content\/([^/]+)$/);
      if (cm && request.method === 'GET') {
        const row = await env.DB.prepare('SELECT data FROM site_content WHERE section = ?').bind(cm[1]).first();
        if (!row) return json({ error: 'Not found' }, 404, origin);
        try { return json(JSON.parse(row.data), 200, origin); } catch { return json(row.data, 200, origin); }
      }
      if (cm && request.method === 'PUT') {
        const body = await request.json();
        const now = new Date().toISOString();
        await env.DB.prepare('INSERT INTO site_content (section, data, updated_at) VALUES (?,?,?) ON CONFLICT(section) DO UPDATE SET data=excluded.data, updated_at=excluded.updated_at')
          .bind(cm[1], JSON.stringify(body), now).run();
        return json({ ok: true }, 200, origin);
      }

      // Public
      if (url.pathname === '/api/projects' && request.method === 'GET') {
        const { results } = await env.DB.prepare('SELECT * FROM projects ORDER BY sort_order ASC, created_at DESC').all();
        return json(results.map(rowToProject), 200, origin);
      }
      const m = url.pathname.match(/^\/api\/projects\/([^/]+)$/);
      if (m && request.method === 'GET') {
        const row = await env.DB.prepare('SELECT * FROM projects WHERE slug = ?').bind(m[1]).first();
        if (!row) return json({ error: 'Not found' }, 404, origin);
        return json(rowToProject(row), 200, origin);
      }

      // Admin (protected by Cloudflare Access at edge)
      if (url.pathname === '/api/projects' && request.method === 'POST') {
        const body = await request.json();
        const id = body.slug || crypto.randomUUID();
        const now = new Date().toISOString();
        await env.DB.prepare(
          `INSERT INTO projects (id, slug, title, category, summary, description, tech, live_url, github_url, image_key, featured, sort_order, created_at, updated_at)
           VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
        ).bind(id, body.slug, body.title, body.category, body.summary, body.description, JSON.stringify(body.tech || []), body.liveUrl || null, body.githubUrl || null, body.imageKey || null, body.featured ? 1 : 0, body.sortOrder || 0, now, now).run();
        return json({ id, slug: body.slug }, 201, origin);
      }

      if (m && request.method === 'PUT') {
        const body = await request.json();
        const now = new Date().toISOString();
        await env.DB.prepare(
          `UPDATE projects SET title=?, category=?, summary=?, description=?, tech=?, live_url=?, github_url=?, image_key=?, featured=?, sort_order=?, updated_at=? WHERE id=?`
        ).bind(body.title, body.category, body.summary, body.description, JSON.stringify(body.tech || []), body.liveUrl || null, body.githubUrl || null, body.imageKey || null, body.featured ? 1 : 0, body.sortOrder || 0, now, m[1]).run();
        return json({ ok: true }, 200, origin);
      }

      if (m && request.method === 'DELETE') {
        await env.DB.prepare('DELETE FROM projects WHERE id = ?').bind(m[1]).run();
        return json({ ok: true }, 200, origin);
      }

      if (url.pathname === '/api/upload' && request.method === 'POST') {
        if (!env.IMAGES) return json({ error: 'R2 not configured. Enable R2 in Cloudflare Dashboard.' }, 503, origin);
        const form = await request.formData();
        const file = form.get('file');
        if (!file) return json({ error: 'No file' }, 400, origin);
        const key = `${Date.now()}-${file.name}`;
        await env.IMAGES.put(key, file.stream(), { httpMetadata: { contentType: file.type } });
        return json({ key, url: `/images/${key}` }, 201, origin);
      }

      return json({ error: 'Not found' }, 404, origin);
    } catch (err) {
      return json({ error: String(err?.message || err) }, 500, origin);
    }
  },
};

function rowToProject(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    summary: row.summary,
    description: row.description,
    tech: JSON.parse(row.tech || '[]'),
    liveUrl: row.live_url,
    githubUrl: row.github_url,
    imageKey: row.image_key,
    featured: !!row.featured,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
