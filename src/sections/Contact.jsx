import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../design/motion';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { useContent } from '../lib/ContentContext.jsx';

export default function Contact() {
  const { content } = useContent();
  const c = content.contact;
  const [form, setForm] = useState({ name: '', email: '', details: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | fallback | error

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    // No backend wired yet: use mailto fallback (honest).
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || 'visitor'}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nProject details:\n${form.details}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:${c.email || 'hello@portfolio.com'}?subject=${subject}&body=${body}`;
    setTimeout(() => setStatus('fallback'), 600);
  };

  return (
    <Section id="contact">
      <Container size="md">
        <div className="text-center mb-16">
          <p className="eyebrow mb-4">Contact</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Have an idea?<br /><span className="gradient-text">Let's engineer it.</span>
          </h2>
          <p className="text-muted mt-4 max-w-2xl mx-auto">
            Whether you're building a new product, improving an existing platform, or looking for an engineering partner, let's talk.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Let's Connect</h3>
              <p className="text-sm text-muted leading-relaxed mb-5">
                I'm always interested in hearing about new projects and opportunities.
              </p>
              <div className="space-y-3 text-sm text-muted">
                <div className="flex items-center gap-3"><span className="text-accent-blue">✉</span> {c.email}</div>
                <div className="flex items-center gap-3"><span className="text-accent-blue">◎</span> {c.location}</div>
                <div className="flex items-center gap-3"><span className="text-accent-blue">●</span> {c.availability}</div>
              </div>
            </GlassCard>
            <div className="flex gap-3">
              {[
                { label: 'GitHub', href: c.github, icon: 'GH' },
                { label: 'LinkedIn', href: c.linkedin, icon: 'LI' },
                { label: 'Twitter', href: c.twitter, icon: 'TW' },
                { label: 'Email', href: c.email ? `mailto:${c.email}` : null, icon: '@' },
              ].map((s) => (
                s.href ? (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className="w-11 h-11 glass-card flex items-center justify-center text-silver hover:text-white hover:bg-white/[0.08] transition-colors text-xs font-mono">
                    {s.icon}
                  </a>
                ) : (
                  <span key={s.label} title={`${s.label} — link not configured`} aria-label={`${s.label} (not configured)`}
                    className="w-11 h-11 glass-card flex items-center justify-center text-muted/50 text-xs font-mono cursor-not-allowed">
                    {s.icon}
                  </span>
                )
              ))}
            </div>
          </div>

          <GlassCard className="md:col-span-3 p-6 sm:p-8">
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono tracking-widest text-muted mb-2">NAME</label>
                  <input id="name" name="name" value={form.name} onChange={onChange} required
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-silver placeholder-muted/50 focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 transition-all" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-mono tracking-widest text-muted mb-2">EMAIL</label>
                  <input id="email" name="email" type="email" value={form.email} onChange={onChange} required
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-silver placeholder-muted/50 focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 transition-all" />
                </div>
              </div>
              <div>
                <label htmlFor="details" className="block text-xs font-mono tracking-widest text-muted mb-2">PROJECT DETAILS</label>
                <textarea id="details" name="details" rows={3} value={form.details} onChange={onChange}
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-silver placeholder-muted/50 focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 transition-all resize-none" />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-mono tracking-widest text-muted mb-2">MESSAGE</label>
                <textarea id="message" name="message" rows={4} value={form.message} onChange={onChange} required
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-silver placeholder-muted/50 focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 transition-all resize-none" />
              </div>
              <div className="flex items-center gap-4">
                <Button type="submit" disabled={status === 'sending'}>Send Message</Button>
                {status === 'fallback' && (
                  <span className="text-xs text-muted">Your email client should have opened with the message. No backend is connected yet.</span>
                )}
              </div>
            </form>
          </GlassCard>
        </div>
      </Container>
    </Section>
  );
}
