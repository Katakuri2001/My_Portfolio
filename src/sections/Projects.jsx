import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, stagger } from '../design/motion';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import FlexCarousel from '../components/FlexCarousel';
import { flexCarouselItems } from '../data/flexCarouselImages';
import { fetchProjects } from '../lib/projects';

const CATEGORY_LABEL = { completed: 'Completed', personal: 'Personal', conceptual: 'Conceptual' };
const CATEGORY_COLOR = { completed: '#34d399', personal: '#5B8CFF', conceptual: '#A78BFA' };

function ProjectVisual({ project }) {
  const hue = (project.title.charCodeAt(0) * 37) % 360;
  return (
    <div
      className="relative w-full aspect-[16/10] overflow-hidden rounded-xl"
      style={{ background: `linear-gradient(135deg, hsl(${hue}, 60%, 18%), hsl(${(hue + 60) % 360}, 50%, 12%))` }}
    >
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl sm:text-4xl font-bold text-white/80 tracking-tight">{project.title}</span>
      </div>
      <div className="absolute top-3 left-3 px-2 py-1 rounded-md text-[10px] font-mono tracking-widest border" style={{ borderColor: CATEGORY_COLOR[project.category], color: CATEGORY_COLOR[project.category], background: 'rgba(0,0,0,0.4)' }}>
        {CATEGORY_LABEL[project.category].toUpperCase()}
      </div>
    </div>
  );
}

function Modal({ project, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    ref.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          ref={ref}
          tabIndex={-1}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-card-strong p-6 sm:p-8 focus:outline-none"
          role="dialog" aria-modal="true" aria-labelledby="project-title"
        >
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono tracking-widest" style={{ color: CATEGORY_COLOR[project.category] }}>
                {CATEGORY_LABEL[project.category].toUpperCase()}
              </span>
              <h3 id="project-title" className="text-2xl sm:text-3xl font-bold text-white mt-1">{project.title}</h3>
            </div>
            <button onClick={onClose} aria-label="Close" className="text-muted hover:text-white text-2xl leading-none">×</button>
          </div>
          <ProjectVisual project={project} />
          <p className="text-muted leading-relaxed mt-6">{project.description}</p>
          <div className="flex flex-wrap gap-2 mt-6">
            {project.tech.map((t) => (
              <span key={t} className="px-3 py-1 rounded-full text-xs border border-white/10 text-silver bg-white/[0.04]">{t}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-8">
            {project.liveUrl ? (
              <Button as="a" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live Demo</Button>
            ) : (
              <span className="text-xs text-muted self-center">No live demo available</span>
            )}
            {project.githubUrl ? (
              <Button variant="ghost" as="a" href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</Button>
            ) : (
              <span className="text-xs text-muted self-center">No repository link available</span>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const [projects, setProjects] = useState([]);
  useEffect(() => { fetchProjects().then(setProjects); }, []);

  return (
    <Section id="projects">
      <div className="w-full" style={{ height: 'clamp(320px, 50vh, 560px)', position: 'relative' }}>
        <FlexCarousel items={flexCarouselItems || undefined} preset="liquid" intro="rise" cardHeight={0.5} gap={12} squeeze={0.2} focusOnClick captions />
      </div>
      <Container>
        <div className="text-center mb-16">
          <p className="eyebrow mb-4">Projects</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">Selected Work</h2>
          <p className="text-muted mt-4 max-w-2xl mx-auto">
            A selection of personal experiments and conceptual studies. Each is labeled honestly by status.
          </p>
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger(0.1)} className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div key={p.id} variants={fadeUp} className={i === 0 ? 'md:col-span-2' : ''}>
              <GlassCard
                className="overflow-hidden group cursor-pointer hover:bg-white/[0.06] transition-colors focus-within:ring-2 focus-within:ring-accent-blue/60"
                onClick={() => setSelected(p)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(p); } }}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${p.title}`}
              >
                <ProjectVisual project={p} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:gradient-text transition-all">{p.title}</h3>
                    <span className="text-xs font-mono tracking-widest" style={{ color: CATEGORY_COLOR[p.category] }}>
                      {CATEGORY_LABEL[p.category]}
                    </span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed line-clamp-2">{p.summary}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {p.tech.slice(0, 4).map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full text-[11px] border border-white/10 text-silver/80">{t}</span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {selected && <Modal project={selected} onClose={() => setSelected(null)} />}
    </Section>
  );
}
