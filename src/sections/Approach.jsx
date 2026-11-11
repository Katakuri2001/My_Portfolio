import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../design/motion';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';

const PRINCIPLES = [
  { n: '01', title: 'User Experience', body: 'Every interaction should have a purpose.' },
  { n: '02', title: 'Performance', body: 'Speed and responsiveness are essential.' },
  { n: '03', title: 'Architecture', body: 'Build maintainable systems that can evolve.' },
  { n: '04', title: 'Security', body: 'Protect data and implement responsible authentication.' },
  { n: '05', title: 'Scalability', body: 'Prepare infrastructure for future growth.' },
  { n: '06', title: 'Reliability', body: 'Build systems that behave predictably.' },
];

export default function Approach() {
  return (
    <Section id="approach">
      <Container>
        <div className="mb-16 max-w-3xl">
          <p className="eyebrow mb-4">Approach</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">Engineering Approach</h2>
          <p className="text-muted mt-4">Principles I apply when designing and building digital products.</p>
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger(0.08)} className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {PRINCIPLES.map((p) => (
            <motion.div key={p.n} variants={fadeUp} className="group py-8 grid md:grid-cols-12 gap-4 items-baseline hover:bg-white/[0.02] transition-colors px-2">
              <div className="md:col-span-1 text-xs font-mono text-accent-blue">{p.n}</div>
              <div className="md:col-span-4 text-xl sm:text-2xl font-semibold text-white group-hover:gradient-text transition-all">{p.title}</div>
              <div className="md:col-span-7 text-muted leading-relaxed">{p.body}</div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
