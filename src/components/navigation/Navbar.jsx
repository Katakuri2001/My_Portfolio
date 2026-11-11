import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

const SECTIONS = ['home', 'about', 'skills', 'projects', 'architecture', 'approach', 'contact'];

function Navbar() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const observers = [];
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const navigate = (id) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Sidebar active={active} onNavigate={navigate} />
      <BottomNav active={active} onNavigate={navigate} />
    </>
  );
}
export default Navbar;
