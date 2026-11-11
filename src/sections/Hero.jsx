import { motion } from 'framer-motion';
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiNestjs,
  SiHono, SiPrisma, SiMysql, SiPostgresql, SiCloudflare, SiRailway,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa6';
import { SiJsonwebtokens } from 'react-icons/si';
import { fadeUp, stagger } from '../design/motion';
import Button from '../components/ui/Button';
import { useContent } from '../lib/ContentContext.jsx';
import OrbitImages from '../components/OrbitImages';

export default function Hero() {
  const { content } = useContent();
  const h = content.hero;
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-8 pb-24">
      {/* ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-accent-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[36rem] h-[36rem] bg-accent-violet/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }} />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Copy */}
        <motion.div initial="hidden" animate="visible" variants={stagger(0.12)} className="max-w-2xl">
          <motion.p variants={fadeUp} className="eyebrow mb-6">{h.eyebrow}</motion.p>
          <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-6">
            {h.title}<br />
            <span className="gradient-text">{h.highlight}</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-muted leading-relaxed mb-8 max-w-xl">
            {h.description}
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 items-center">
            <Button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              {h.ctaPrimary}
            </Button>
            <Button variant="ghost" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              {h.ctaSecondary}
            </Button>
            <span className="flex items-center gap-2 text-sm text-muted ml-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> {h.availability}
            </span>
          </motion.div>
        </motion.div>

        {/* Visual */}
        <div className="hidden md:flex items-center justify-center w-full" style={{ height: '460px' }}>
          <OrbitImages
            items={[
              { node: <SiReact size={48} color="#61DAFB" />, alt: 'React' },
              { node: <SiNextdotjs size={48} color="#FFFFFF" />, alt: 'Next.js' },
              { node: <SiTypescript size={48} color="#3178C6" />, alt: 'TypeScript' },
              { node: <SiTailwindcss size={48} color="#38BDF8" />, alt: 'Tailwind CSS' },
              { node: <SiNodedotjs size={48} color="#339933" />, alt: 'Node.js' },
              { node: <SiNestjs size={48} color="#E0234E" />, alt: 'Nest.js' },
              { node: <SiHono size={48} color="#FF5A00" />, alt: 'Hono' },
              { node: <SiPrisma size={48} color="#2D3748" />, alt: 'Prisma' },
              { node: <SiMysql size={48} color="#4479A1" />, alt: 'MySQL' },
              { node: <SiPostgresql size={48} color="#4169E1" />, alt: 'PostgreSQL' },
              { node: <SiCloudflare size={48} color="#F38020" />, alt: 'Cloudflare' },
              { node: <SiRailway size={48} color="#FFFFFF" />, alt: 'Railway' },
              { node: <FaJava size={48} color="#ED8B00" />, alt: 'Java' },
              { node: <SiJsonwebtokens size={48} color="#FB015B" />, alt: 'JWT' },
            ]}
            shape="ellipse"
            radiusX={260}
            radiusY={70}
            rotation={-8}
            duration={28}
            itemSize={72}
            depth={0.6}
            showPath
          />
        </div>
      </div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted text-xs"
      >
        <span className="tracking-widest uppercase text-[10px]">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-px h-8 bg-gradient-to-b from-accent-blue to-transparent" />
      </motion.div>
    </section>
  );
}
