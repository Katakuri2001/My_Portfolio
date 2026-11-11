import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavItem from './NavItem';

const NAV = ['Home', 'About', 'Skills', 'Projects', 'Architecture', 'Approach', 'Contact'];

function Sidebar({ active, onNavigate }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.aside
      animate={{ width: expanded ? 220 : 64 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-50 flex-col gap-2 p-2 rounded-2xl glass-card-strong shadow-2xl"
      style={{ maxHeight: '90vh' }}
    >
      {/* Monogram + toggle */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/[0.04] transition-colors"
        aria-label={expanded ? 'Collapse navigation' : 'Expand navigation'}
        aria-expanded={expanded}
      >
        <img src="/logo.png" alt="KSH" className="w-8 h-8 rounded-lg object-contain shrink-0" />
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              className="flex flex-col leading-tight"
            >
              <span className="text-xs font-semibold text-white">Kaung Set Hmue</span>
              <span className="text-[10px] text-muted flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Available
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <div className="divider my-1" />

      <nav className="flex flex-col gap-1">
        {NAV.map((item) => (
          <NavItem
            key={item}
            item={item}
            active={active}
            expanded={expanded}
            onClick={() => onNavigate(item.toLowerCase())}
          />
        ))}
      </nav>
    </motion.aside>
  );
}
export default Sidebar;
