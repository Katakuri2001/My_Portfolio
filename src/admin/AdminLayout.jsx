import { useState, useEffect } from 'react';
import { Routes, Route, NavLink, useNavigate, useParams, Link } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import ContentEditor from './ContentEditor';

const API_BASE = import.meta.env.VITE_API_BASE || '';

async function api(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...(options.headers || {}) } });
  if (!res.ok) throw new Error(await res.text());
  return res.status === 204 ? null : res.json();
}

function AdminNav() {
  const link = (to, label, icon, end = false) => (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
          isActive ? 'bg-white/[0.08] text-white' : 'text-muted hover:text-silver hover:bg-white/[0.04]'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span className={`${isActive ? 'text-accent-blue' : 'text-muted group-hover:text-silver'}`}>{icon}</span>
          <span className="font-medium">{label}</span>
          {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-blue" />}
        </>
      )}
    </NavLink>
  );

  return (
    <aside className="w-64 shrink-0 border-r border-white/10 bg-obsidian-secondary flex flex-col">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="KSH" className="w-9 h-9 rounded-lg object-contain" />
          <div>
            <div className="text-sm font-semibold text-white">Admin</div>
            <div className="text-[10px] font-mono tracking-widest text-muted">KSH PORTFOLIO</div>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {link('/admin', 'Projects', (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
        ), true)}
        {link('/admin/content', 'Site Content', (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round"/></svg>
        ))}
        {link('/admin/projects/new', 'New Project', (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5"><path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round"/></svg>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted hover:text-silver hover:bg-white/[0.04] transition-all">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5"><path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span className="font-medium">View site</span>
        </Link>
      </div>
    </aside>
  );
}

function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');

  const load = async () => {
    setLoading(true); setError(null);
    try { setProjects(await api('/api/projects')); }
    catch (e) { setError(String(e.message || e)); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!confirm('Delete this project?')) return;
    try { await api(`/api/projects/${id}`, { method: 'DELETE' }); setStatus('Deleted.'); load(); }
    catch (e) { setStatus('Delete failed: ' + (e.message || e)); }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-2">Dashboard</h1>
      <p className="text-muted text-sm mb-6">Manage your portfolio content and projects.</p>
      <h2 className="text-lg font-semibold text-white mb-4">Projects ({projects.length})</h2>
      {status && <p className="text-sm text-muted mb-4">{status}</p>}
      {error && <p className="text-sm text-red-400 mb-4">{error} (is the Worker running / VITE_API_BASE set?)</p>}
      {loading ? <p className="text-muted">Loading…</p> : (
        <div className="space-y-3">
          {projects.length === 0 && <p className="text-muted text-sm">No projects yet.</p>}
          {projects.map((p) => (
            <GlassCard key={p.id} className="p-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-white font-medium">{p.title}</div>
                <div className="text-xs text-muted">{p.category} · {p.tech.join(', ')}</div>
              </div>
              <div className="flex gap-2">
                <Link to={`/admin/projects/${p.id}`} className="px-3 py-1.5 rounded-lg text-xs glass-card text-silver hover:text-white">Edit</Link>
                <button onClick={() => remove(p.id)} className="px-3 py-1.5 rounded-lg text-xs border border-red-500/30 text-red-300 hover:bg-red-500/10">Delete</button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({ slug: '', title: '', category: 'conceptual', summary: '', description: '', tech: '', liveUrl: '', githubUrl: '', imageKey: '', featured: false, sortOrder: 0 });
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    api(`/api/projects/${id}`).then((p) => {
      setForm({
        slug: p.slug, title: p.title, category: p.category, summary: p.summary, description: p.description,
        tech: (p.tech || []).join(', '), liveUrl: p.liveUrl || '', githubUrl: p.githubUrl || '',
        imageKey: p.imageKey || '', featured: !!p.featured, sortOrder: p.sortOrder || 0,
      });
      setLoading(false);
    }).catch((e) => { setError(String(e.message || e)); setLoading(false); });
  }, [id, isEdit]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const onUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true); setError(null);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch(`${API_BASE}/api/upload`, { method: 'POST', body: fd });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setForm((f) => ({ ...f, imageKey: data.key }));
      setStatus(`Uploaded: ${data.key}`);
    } catch (err) {
      setError(String(err.message || err));
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null); setStatus('Saving…');
    const payload = {
      slug: form.slug, title: form.title, category: form.category, summary: form.summary,
      description: form.description, tech: form.tech.split(',').map((t) => t.trim()).filter(Boolean),
      liveUrl: form.liveUrl || null, githubUrl: form.githubUrl || null,
      imageKey: form.imageKey || null, featured: form.featured, sortOrder: Number(form.sortOrder) || 0,
    };
    try {
      if (isEdit) await api(`/api/projects/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
      else await api('/api/projects', { method: 'POST', body: JSON.stringify(payload) });
      setStatus('Saved.');
      navigate('/admin');
    } catch (e) { setError(String(e.message || e)); setStatus(''); }
  };

  if (loading) return <div className="p-8 text-muted">Loading…</div>;

  const field = (label, name, type = 'text', props = {}) => (
    <div>
      <label className="block text-xs font-mono tracking-widest text-muted mb-2">{label}</label>
      {type === 'textarea' ? (
        <textarea name={name} value={form[name]} onChange={onChange} rows={props.rows || 3} required={props.required}
          className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-silver focus:outline-none focus:border-accent-blue" />
      ) : type === 'checkbox' ? (
        <input type="checkbox" name={name} checked={form[name]} onChange={onChange} className="w-4 h-4" />
      ) : (
        <input type={type} name={name} value={form[name]} onChange={onChange} required={props.required}
          className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-silver focus:outline-none focus:border-accent-blue" />
      )}
    </div>
  );

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-6">{isEdit ? 'Edit Project' : 'New Project'}</h1>
      {error && <p className="text-sm text-red-400 mb-4">{error}</p>}
      {status && <p className="text-sm text-muted mb-4">{status}</p>}
      <form onSubmit={onSubmit} className="space-y-5">
        {field('SLUG', 'slug', 'text', { required: true })}
        {field('TITLE', 'title', 'text', { required: true })}
        <div>
          <label className="block text-xs font-mono tracking-widest text-muted mb-2">CATEGORY</label>
          <select name="category" value={form.category} onChange={onChange} className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-silver focus:outline-none focus:border-accent-blue">
            <option value="completed">Completed</option>
            <option value="personal">Personal</option>
            <option value="conceptual">Conceptual</option>
          </select>
        </div>
        {field('SUMMARY', 'summary', 'text', { required: true })}
        {field('DESCRIPTION', 'description', 'textarea', { rows: 5, required: true })}
        {field('TECH (comma separated)', 'tech')}
        {field('LIVE URL', 'liveUrl')}
        {field('GITHUB URL', 'githubUrl')}
        <div className="flex items-center gap-3">{field('SORT ORDER', 'sortOrder', 'number')}<label className="flex items-center gap-2 text-sm text-muted mt-6"><input type="checkbox" name="featured" checked={form.featured} onChange={onChange} /> Featured</label></div>
        <div>
          <label className="block text-xs font-mono tracking-widest text-muted mb-2">IMAGE</label>
          <input type="file" accept="image/*" onChange={onUpload} disabled={uploading}
            className="block w-full text-sm text-silver file:mr-3 file:px-3 file:py-2 file:rounded-lg file:border-0 file:bg-white/10 file:text-silver" />
          {uploading && <p className="text-xs text-muted mt-2">Uploading…</p>}
          {form.imageKey && <p className="text-xs text-muted mt-2">Current: {form.imageKey}</p>}
        </div>
        <div className="flex gap-3 pt-2">
          <Button type="submit">Save</Button>
          <Button variant="ghost" type="button" onClick={() => navigate('/admin')}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-obsidian-bg text-silver flex">
      <AdminNav />
      <main className="flex-1 overflow-y-auto">
        {!API_BASE && (
          <div className="m-4 p-3 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-200 text-sm">
            VITE_API_BASE is not set. Admin changes will not persist. Set it in .env to connect to your Cloudflare Worker.
          </div>
        )}
        <Routes>
          <Route index element={<ProjectsList />} />
          <Route path="content" element={<ContentEditor />} />
          <Route path="projects/new" element={<ProjectForm />} />
          <Route path="projects/:id" element={<ProjectForm />} />
        </Routes>
      </main>
    </div>
  );
}
