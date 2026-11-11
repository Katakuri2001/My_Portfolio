import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../design/motion';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import GlassCard from '../components/ui/GlassCard';

const LAYERS = [
  { n: '01', title: 'Experience Layer', body: 'User interfaces and interactions.', color: '#5B8CFF' },
  { n: '02', title: 'Frontend Layer', body: 'React, TypeScript, Next.js.', color: '#7aa2ff' },
  { n: '03', title: 'API / Backend Layer', body: 'Node.js, Express, authentication.', color: '#A78BFA' },
  { n: '04', title: 'Data Layer', body: 'MySQL, MongoDB.', color: '#c4b5fd' },
  { n: '05', title: 'Infrastructure Layer', body: 'Cloudflare and edge delivery.', color: '#D9DEEA' },
];

export default function Architecture() {
  return (
    <Section id="architecture">
      <Container>
        <div className="text-center mb-16">
          <p className="eyebrow mb-4">Architecture</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">System Architecture</h2>
          <p className="text-muted mt-4 max-w-2xl mx-auto">How I approach building complete digital products — from experience to edge.</p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* connector line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue via-accent-violet to-silver opacity-30" />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger(0.12)} className="space-y-6">
            {LAYERS.map((l, i) => (
              <motion.div key={l.n} variants={fadeUp} className="relative pl-16">
                <div className="absolute left-0 top-6 w-12 h-12 rounded-xl glass-card flex items-center justify-center">
                  <span className="text-xs font-mono font-bold" style={{ color: l.color }}>{l.n}</span>
                </div>
                {i < LAYERS.length - 1 && (
                  <motion.div
                    className="absolute left-[23px] top-12 w-0.5 h-6"
                    style={{ background: l.color, opacity: 0.4 }}
                    animate={{ scaleY: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                )}
                <GlassCard className="p-6 hover:bg-white/[0.06] transition-colors">
                  <h3 className="text-lg font-semibold text-white mb-1">{l.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{l.body}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-16 glass-card p-8 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-mono tracking-widest text-accent-blue mb-4">FRONTEND EXCELLENCE</h4>
              <ul className="space-y-2 text-sm text-muted">
                {['Component-based React architecture', 'Responsive design with Tailwind CSS', 'Smooth animations with Framer Motion'].map((x) => (
                  <li key={x} className="flex items-start gap-2"><span className="text-emerald-400">✓</span>{x}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-mono tracking-widest text-accent-violet mb-4">BACKEND & INFRASTRUCTURE</h4>
              <ul className="space-y-2 text-sm text-muted">
                {['RESTful APIs with Node.js / Express', 'Database design (SQL & NoSQL)', 'Edge delivery with Cloudflare'].map((x) => (
                  <li key={x} className="flex items-start gap-2"><span className="text-emerald-400">✓</span>{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
