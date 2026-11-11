import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../design/motion';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import GlassCard from '../components/ui/GlassCard';
import { useContent } from '../lib/ContentContext.jsx';

const AREAS = [
  { n: '01', title: 'Frontend Engineering', body: 'React, TypeScript, modern interfaces.' },
  { n: '02', title: 'Backend Engineering', body: 'Node.js, Express.js, APIs, authentication.' },
  { n: '03', title: 'Data Engineering', body: 'MySQL, MongoDB, data architecture.' },
  { n: '04', title: 'Cloud Infrastructure', body: 'Cloudflare, Workers, D1, R2.' },
];

export default function About() {
  const { content } = useContent();
  const a = content.about;
  return (
    <Section id="about">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6">About</p>
            <motion.h2
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-8 whitespace-pre-line"
            >
              {a.heading.split('\\n').map((line, i) => (
                <span key={i}>{i > 0 && <br />}{i === 1 ? <span className="gradient-text">{line}</span> : line}</span>
              ))}
            </motion.h2>
            <div className="space-y-5 text-muted leading-relaxed max-w-2xl">
              <p>{a.body1}</p>
              <p>{a.body2}</p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <GlassCard className="p-6 overflow-hidden">
              <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden mb-6 bg-obsidian-elevated">
                <img src="/profile-photo.jpg" alt="Kaung Set Hmue" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-bg/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white font-semibold text-lg">{content.footer?.name || 'Kaung Set Hmue'}</div>
                  <div className="text-xs text-muted">{content.footer?.title || 'Website Engineer'}</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-2">
                {(a.stats || []).map((s) => (
                  <div key={s.l} className="text-center">
                    <div className="text-2xl font-bold gradient-text">{s.n}</div>
                    <div className="text-xs text-muted mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger(0.1)}
          className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.08]"
        >
          {AREAS.map((a) => (
            <motion.div key={a.n} variants={fadeUp} className="bg-obsidian-bg p-8 hover:bg-obsidian-elevated transition-colors">
              <div className="text-xs text-accent-blue font-mono mb-4">{a.n}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{a.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{a.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
