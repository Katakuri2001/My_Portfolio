import { useEffect, useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import { useContent } from '../lib/ContentContext.jsx';

export default function Footer() {
  const { content } = useContent();
  const f = content.footer;
  const [year, setYear] = useState(new Date().getFullYear());
  useEffect(() => setYear(new Date().getFullYear()), []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="border-t border-white/[0.06] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="KSH" className="w-9 h-9 rounded-lg object-contain" />
            <div>
              <div className="text-sm font-semibold text-white">{f.name}</div>
              <div className="text-xs text-muted">{f.title}</div>
            </div>
          </div>
          <nav className="flex flex-wrap gap-6 text-sm text-muted">
            {['Home', 'About', 'Skills', 'Projects', 'Architecture', 'Approach', 'Contact'].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-white transition-colors">{l}</a>
            ))}
          </nav>
          <button onClick={scrollToTop} aria-label="Back to top" className="w-10 h-10 glass-card flex items-center justify-center text-muted hover:text-white transition-colors">
            ↑
          </button>
        </div>
        <div className="mt-8 pt-6 border-t border-white/[0.06] text-center text-xs text-muted">
          © {year} Kaung Set Hmue. Crafted with care.
        </div>
      </div>
    </footer>
  );
}
