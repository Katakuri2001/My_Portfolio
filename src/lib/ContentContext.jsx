import { createContext, useContext, useEffect, useState } from 'react';
import { fetchContent } from './content';

const DEFAULTS = {
  hero: {
    eyebrow: 'Website Engineer / Full-Stack Developer',
    title: 'I Engineer',
    highlight: 'Digital Experiences.',
    description: 'I build modern digital products by connecting thoughtful interfaces, reliable backend systems, and scalable cloud infrastructure.',
    ctaPrimary: 'Explore My Work',
    ctaSecondary: "Let's Connect",
    availability: 'Available for work',
  },
  about: {
    heading: 'Beyond writing code.\nI engineer complete systems.',
    body1: "I'm a website engineer who designs and builds complete digital products — from the first pixel of an interface to the last line of infrastructure.",
    body2: 'I care about the whole system: performance, maintainability, security, and the experience of the people who use and build on what I ship.',
    stats: [{ n: '50+', l: 'Projects' }, { n: '12+', l: 'Technologies' }, { n: 'Full-Stack', l: 'Engineer' }],
  },
  contact: {
    email: 'hello@portfolio.com',
    location: 'Available worldwide',
    availability: 'Open to opportunities',
    github: '',
    linkedin: '',
    twitter: '',
  },
  footer: { name: 'Kaung Set Hmue', title: 'Website Engineer' },
  projectCategories: ['completed', 'personal', 'conceptual'],
  skills: { categories: [
    { key: 'FRONTEND', skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js'] },
    { key: 'BACKEND', skills: ['Node.js', 'Nest.js', 'Hono', 'Java', 'JWT', 'Prisma'] },
    { key: 'DATABASE', skills: ['MySQL', 'PostgreSQL'] },
    { key: 'CLOUD', skills: ['Cloudflare', 'Railway'] },
  ]},
};

const Ctx = createContext({ content: DEFAULTS, loading: false });

export function ContentProvider({ children }) {
  const [content, setContent] = useState(DEFAULTS);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchContent().then((c) => {
      if (c) setContent((prev) => ({ ...prev, ...c }));
      setLoading(false);
    });
  }, []);
  return <Ctx.Provider value={{ content, loading }}>{children}</Ctx.Provider>;
}

export function useContent() {
  return useContext(Ctx);
}
