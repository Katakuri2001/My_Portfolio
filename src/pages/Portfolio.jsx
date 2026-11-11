import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb, SiMysql, SiCloudflare } from 'react-icons/si';
import Navbar from '../components/navigation/Navbar';
import Hero from '../sections/Hero';
import LogoLoop from '../components/LogoLoop';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Architecture from '../sections/Architecture';
import Approach from '../sections/Approach';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';

function Portfolio() {
  return (
    <div className="min-h-screen bg-obsidian-bg text-silver">
      <Navbar />
      <main className="pb-24 md:pb-0">
        <Hero />
        <section className="py-12 border-y border-white/[0.06]">
          <LogoLoop
            logos={[
              { node: <SiReact />, title: 'React', href: 'https://react.dev', hoverColor: '#61dafb' },
              { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org', hoverColor: '#ffffff' },
              { node: <SiTypescript />, title: 'TypeScript', href: 'https://www.typescriptlang.org', hoverColor: '#3178c6' },
              { node: <SiTailwindcss />, title: 'Tailwind CSS', href: 'https://tailwindcss.com', hoverColor: '#38bdf8' },
              { node: <SiNodedotjs />, title: 'Node.js', href: 'https://nodejs.org', hoverColor: '#339933' },
              { node: <SiExpress />, title: 'Express', href: 'https://expressjs.com', hoverColor: '#ffffff' },
              { node: <SiMongodb />, title: 'MongoDB', href: 'https://www.mongodb.com', hoverColor: '#47a248' },
              { node: <SiMysql />, title: 'MySQL', href: 'https://www.mysql.com', hoverColor: '#4479a1' },
              { node: <SiCloudflare />, title: 'Cloudflare', href: 'https://cloudflare.com', hoverColor: '#f38020' },
            ]}
            speed={80}
            logoHeight={36}
            gap={48}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            ariaLabel="Technology stack"
          />
        </section>
        <About />
        <Skills />
        <Projects />
        <Architecture />
        <Approach />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default Portfolio;
