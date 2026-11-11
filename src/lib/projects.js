import seed from '../data/projects.seed.json';

const API_BASE = import.meta.env.VITE_API_BASE || '';

export async function fetchProjects() {
  if (!API_BASE) return seed;
  try {
    const res = await fetch(`${API_BASE}/api/projects`);
    if (!res.ok) throw new Error('bad status');
    const data = await res.json();
    return Array.isArray(data) && data.length ? data : seed;
  } catch {
    return seed;
  }
}
