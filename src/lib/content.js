const API_BASE = import.meta.env.VITE_API_BASE || '';

export async function fetchContent() {
  if (!API_BASE) return null;
  try {
    const res = await fetch(`${API_BASE}/api/content`);
    if (!res.ok) throw new Error('bad status');
    return await res.json();
  } catch {
    return null;
  }
}

export async function saveContent(section, data) {
  const res = await fetch(`${API_BASE}/api/content/${section}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
