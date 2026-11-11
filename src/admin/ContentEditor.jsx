import { useState, useEffect } from 'react';
import { useContent } from '../lib/ContentContext.jsx';
import { saveContent } from '../lib/content';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';

const API_BASE = import.meta.env.VITE_API_BASE || '';

async function api(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...(options.headers || {}) } });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

function Field({ label, value, onChange, textarea = false, rows = 3 }) {
  return (
    <div>
      <label className="block text-xs font-mono tracking-widest text-muted mb-2">{label}</label>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows}
          className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-silver focus:outline-none focus:border-accent-blue resize-none" />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-silver focus:outline-none focus:border-accent-blue" />
      )}
    </div>
  );
}

export default function ContentEditor() {
  const { content, loading } = useContent();
  const [hero, setHero] = useState(null);
  const [about, setAbout] = useState(null);
  const [contact, setContact] = useState(null);
  const [footer, setFooter] = useState(null);
  const [skills, setSkills] = useState(null);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (loading) return;
    setHero({ ...content.hero });
    setAbout({ ...content.about, stats: (content.about.stats || []).map((s) => ({ ...s })) });
    setContact({ ...content.contact });
    setFooter({ ...content.footer });
    setSkills(content.skills ? JSON.parse(JSON.stringify(content.skills)) : { categories: [] });
  }, [loading, content]);

  const save = async (section, data, setter) => {
    setError(''); setStatus(`Saving ${section}…`);
    try {
      await saveContent(section, data);
      setStatus(`${section} saved.`);
    } catch (e) {
      setError(String(e.message || e));
      setStatus('');
    }
  };

  if (loading || !hero) return <div className="p-8 text-muted">Loading…</div>;

  return (
    <div className="p-8 max-w-3xl space-y-8">
      <h1 className="text-2xl font-bold text-white">Site Content</h1>
      {error && <p className="text-sm text-red-400">{error}</p>}
      {status && <p className="text-sm text-muted">{status}</p>}

      <GlassCard className="p-6 space-y-4">
        <h2 className="text-lg font-semibold text-white">Hero</h2>
        <Field label="EYEBROW" value={hero.eyebrow} onChange={(v) => setHero({ ...hero, eyebrow: v })} />
        <Field label="TITLE" value={hero.title} onChange={(v) => setHero({ ...hero, title: v })} />
        <Field label="HIGHLIGHT" value={hero.highlight} onChange={(v) => setHero({ ...hero, highlight: v })} />
        <Field label="DESCRIPTION" value={hero.description} onChange={(v) => setHero({ ...hero, description: v })} textarea rows={3} />
        <Field label="CTA PRIMARY" value={hero.ctaPrimary} onChange={(v) => setHero({ ...hero, ctaPrimary: v })} />
        <Field label="CTA SECONDARY" value={hero.ctaSecondary} onChange={(v) => setHero({ ...hero, ctaSecondary: v })} />
        <Field label="AVAILABILITY" value={hero.availability} onChange={(v) => setHero({ ...hero, availability: v })} />
        <Button onClick={() => save('hero', hero, setHero)}>Save Hero</Button>
      </GlassCard>

      <GlassCard className="p-6 space-y-4">
        <h2 className="text-lg font-semibold text-white">About</h2>
        <Field label="HEADING" value={about.heading} onChange={(v) => setAbout({ ...about, heading: v })} textarea rows={2} />
        <Field label="BODY 1" value={about.body1} onChange={(v) => setAbout({ ...about, body1: v })} textarea rows={3} />
        <Field label="BODY 2" value={about.body2} onChange={(v) => setAbout({ ...about, body2: v })} textarea rows={3} />
        <div className="space-y-2">
          <label className="block text-xs font-mono tracking-widest text-muted">STATS</label>
          {(about.stats || []).map((s, i) => (
            <div key={i} className="flex gap-2">
              <input value={s.n} onChange={(e) => { const stats = [...about.stats]; stats[i] = { ...stats[i], n: e.target.value }; setAbout({ ...about, stats }); }}
                className="w-24 px-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg text-silver" placeholder="value" />
              <input value={s.l} onChange={(e) => { const stats = [...about.stats]; stats[i] = { ...stats[i], l: e.target.value }; setAbout({ ...about, stats }); }}
                className="flex-1 px-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg text-silver" placeholder="label" />
              <button onClick={() => { const stats = about.stats.filter((_, j) => j !== i); setAbout({ ...about, stats }); }} className="px-3 text-red-300">✕</button>
            </div>
          ))}
          <button onClick={() => setAbout({ ...about, stats: [...(about.stats || []), { n: '0', l: 'Label' }] })} className="text-xs text-accent-blue">+ Add stat</button>
        </div>
        <Button onClick={() => save('about', about, setAbout)}>Save About</Button>
      </GlassCard>

      <GlassCard className="p-6 space-y-4">
        <h2 className="text-lg font-semibold text-white">Contact</h2>
        <Field label="EMAIL" value={contact.email} onChange={(v) => setContact({ ...contact, email: v })} />
        <Field label="LOCATION" value={contact.location} onChange={(v) => setContact({ ...contact, location: v })} />
        <Field label="AVAILABILITY" value={contact.availability} onChange={(v) => setContact({ ...contact, availability: v })} />
        <Field label="GITHUB URL" value={contact.github} onChange={(v) => setContact({ ...contact, github: v })} />
        <Field label="LINKEDIN URL" value={contact.linkedin} onChange={(v) => setContact({ ...contact, linkedin: v })} />
        <Field label="TWITTER URL" value={contact.twitter} onChange={(v) => setContact({ ...contact, twitter: v })} />
        <Button onClick={() => save('contact', contact, setContact)}>Save Contact</Button>
      </GlassCard>

      <GlassCard className="p-6 space-y-4">
        <h2 className="text-lg font-semibold text-white">Footer</h2>
        <Field label="NAME" value={footer.name} onChange={(v) => setFooter({ ...footer, name: v })} />
        <Field label="TITLE" value={footer.title} onChange={(v) => setFooter({ ...footer, title: v })} />
        <Button onClick={() => save('footer', footer, setFooter)}>Save Footer</Button>
      </GlassCard>

      <GlassCard className="p-6 space-y-4">
        <h2 className="text-lg font-semibold text-white">Skills (JSON)</h2>
        <p className="text-xs text-muted">Edit categories and skill names. Icons are mapped automatically by skill name.</p>
        <Field label="SKILLS JSON" value={JSON.stringify(skills, null, 2)} onChange={(v) => { try { setSkills(JSON.parse(v)); setError(''); } catch { setError('Invalid JSON'); } }} textarea rows={12} />
        <Button onClick={() => save('skills', skills, setSkills)}>Save Skills</Button>
      </GlassCard>
    </div>
  );
}
