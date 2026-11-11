import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiNodedotjs,
  SiNestjs, SiHono, SiPrisma, SiMysql, SiPostgresql, SiCloudflare, SiRailway,
  SiJsonwebtokens,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa6';
import { fadeUp, stagger } from '../design/motion';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import GlassCard from '../components/ui/GlassCard';
import { useContent } from '../lib/ContentContext.jsx';

const SKILL_META = {
  'HTML': { Icon: SiHtml5, color: '#E34F26' },
  'CSS': { Icon: SiCss, color: '#1572B6' },
  'JavaScript': { Icon: SiJavascript, color: '#F7DF1E' },
  'TypeScript': { Icon: SiTypescript, color: '#3178C6' },
  'React': { Icon: SiReact, color: '#61DAFB' },
  'Next.js': { Icon: SiNextdotjs, color: '#FFFFFF' },
  'Node.js': { Icon: SiNodedotjs, color: '#339933' },
  'Nest.js': { Icon: SiNestjs, color: '#E0234E' },
  'Hono': { Icon: SiHono, color: '#FF5A00' },
  'Java': { Icon: FaJava, color: '#ED8B00' },
  'JWT': { Icon: SiJsonwebtokens, color: '#FB015B' },
  'Prisma': { Icon: SiPrisma, color: '#2D3748' },
  'MySQL': { Icon: SiMysql, color: '#4479A1' },
  'PostgreSQL': { Icon: SiPostgresql, color: '#4169E1' },
  'Cloudflare': { Icon: SiCloudflare, color: '#F38020' },
  'Railway': { Icon: SiRailway, color: '#FFFFFF' },
};
const catColor = { FRONTEND: '#5B8CFF', BACKEND: '#A78BFA', DATABASE: '#D9DEEA', CLOUD: '#9299AA' };

export default function Skills() {
  const { content } = useContent();
  const cats = content.skills?.categories || [];
  const CATEGORIES = cats.map((c) => ({ key: c.key, color: catColor[c.key] || '#9299AA', pos: { x: 50, y: 12 } }));
  // positions for up to 4 categories
  const positions = [{ x: 50, y: 12 }, { x: 88, y: 50 }, { x: 50, y: 88 }, { x: 12, y: 50 }];
  CATEGORIES.forEach((c, i) => { c.pos = positions[i % positions.length]; });
  const [active, setActive] = useState(cats[0]?.key || 'FRONTEND');
  const [hovered, setHovered] = useState(null);

  const activeCat = cats.find((c) => c.key === active) || cats[0];
  const activeSkills = (activeCat?.skills || []).map((name) => ({ name, ...(SKILL_META[name] || { Icon: SiReact, color: '#D9DEEA' }) }));
  const CATEGORIES_COLOR = (key) => catColor[key] || '#9299AA';

  return (
    <Section id="skills">
      <Container>
        <div className="text-center mb-16">
          <p className="eyebrow mb-4">Skills</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">Technical Skills</h2>
          <p className="text-muted mt-4 max-w-2xl mx-auto">A connected ecosystem of technologies I use to design, build, and ship complete products.</p>
        </div>

        <div className="hidden lg:grid grid-cols-12 gap-8 items-center">
          <div className="col-span-5">
            <div className="relative aspect-square max-w-md mx-auto">
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                {CATEGORIES.map((c) => (
                  <motion.line
                    key={c.key}
                    x1="50" y1="50" x2={c.pos.x} y2={c.pos.y}
                    stroke={active === c.key ? c.color : 'rgba(255,255,255,0.08)'}
                    strokeWidth={active === c.key ? 0.9 : 0.4}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: active === c.key ? 1 : 0.35 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  />
                ))}
                <circle cx="50" cy="50" r="9" fill="rgba(91,140,255,0.15)" stroke="#5B8CFF" strokeWidth="1" />
                <text x="50" y="52" textAnchor="middle" fill="#D9DEEA" fontSize="3.5" fontFamily="Inter">CORE</text>
              </svg>
              {CATEGORIES.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setActive(c.key)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group"
                  style={{ left: `${c.pos.x}%`, top: `${c.pos.y}%` }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300"
                    style={{
                      borderColor: active === c.key ? c.color : 'rgba(255,255,255,0.12)',
                      background: active === c.key ? `${c.color}22` : 'rgba(255,255,255,0.04)',
                      boxShadow: active === c.key ? `0 0 24px ${c.color}55` : 'none',
                    }}
                  >
                    <span className="text-xs font-mono font-bold" style={{ color: c.color }}>{c.key[0]}</span>
                  </div>
                  <span className={`text-[10px] tracking-widest ${active === c.key ? 'text-white' : 'text-muted'}`}>{c.key}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-2xl font-bold" style={{ color: CATEGORIES_COLOR(active) }}>{active}</span>
                  <span className="text-muted text-sm">{activeSkills.length} technologies</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {activeSkills.map((s, i) => {
                    const Icon = s.Icon;
                    return (
                      <motion.div
                        key={s.name}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onMouseEnter={() => setHovered(s.name)}
                        onMouseLeave={() => setHovered(null)}
                        className="glass-card p-5 flex items-center gap-3 hover:bg-white/[0.06] transition-colors"
                      >
                        <Icon size={28} color={hovered === s.name ? s.color : '#D9DEEA'} style={{ transition: 'color 0.3s ease' }} />
                        <span className="text-sm font-medium text-silver">{s.name}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="lg:hidden">
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 -mx-4 px-4">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                onClick={() => setActive(c.key)}
                className={`relative shrink-0 px-4 py-2 text-xs font-mono tracking-widest transition-all ${
                  active === c.key ? 'text-white' : 'text-muted'
                }`}
                style={active === c.key ? { color: c.color } : {}}
              >
                {c.key}
                {active === c.key && (
                  <motion.span
                    layoutId="skill-tab-underline"
                    className="absolute left-0 right-0 -bottom-1 h-px"
                    style={{ background: c.color }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 gap-3"
            >
              {activeSkills.map((s) => {
                const Icon = s.Icon;
                return (
                  <GlassCard key={s.name} className="p-4 flex items-center gap-3">
                    <Icon size={24} color={s.color} />
                    <span className="text-sm font-medium text-silver">{s.name}</span>
                  </GlassCard>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-16 glass-card p-8 max-w-3xl mx-auto text-center">
          <h3 className="text-xl font-bold gradient-text mb-3">Full-Stack Expertise</h3>
          <p className="text-muted leading-relaxed text-sm">
            From crafting responsive user interfaces with React and modern CSS to building robust backend systems with Node.js and Nest.js, and deploying scalable applications on Cloudflare and Railway — I bring comprehensive full-stack capabilities to every project.
          </p>
        </div>
      </Container>
    </Section>
  );
}
