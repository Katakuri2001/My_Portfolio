import { motion } from 'framer-motion';

const ICONS = {
  Home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
      <path d="M3 11l9-8 9 8M5 10v10h14V10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  About: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
      <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" strokeLinecap="round" />
    </svg>
  ),
  Skills: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
      <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Projects: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  Architecture: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
      <path d="M4 4h16v4H4zM4 10h16v4H4zM4 16h16v4H4z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Approach: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2" strokeLinecap="round" />
    </svg>
  ),
  Contact: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

function NavItem({ item, active, expanded, onClick, compact = false }) {
  const isActive = active === item.toLowerCase();
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: expanded ? 2 : 0 }}
      className={`group relative flex items-center justify-center md:justify-start gap-3 w-full min-h-[44px] min-w-[44px] px-3 py-2.5 rounded-xl transition-all duration-300 cursor-pointer ${
        isActive ? 'bg-white/[0.08] text-white' : 'text-muted hover:text-silver hover:bg-white/[0.04]'
      }`}
      aria-label={item}
      aria-current={isActive ? 'true' : undefined}
    >
      <span className={`${isActive ? 'text-accent-blue' : ''}`}>{ICONS[item]}</span>
      {expanded && <span className="text-sm font-medium whitespace-nowrap">{item}</span>}
      {!expanded && (
        <span className="absolute left-full ml-3 px-2 py-1 rounded-md bg-obsidian-elevated border border-white/10 text-xs text-silver opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          {item}
        </span>
      )}
      {isActive && (
        <motion.span
          layoutId="nav-indicator"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-gradient-to-b from-accent-blue to-accent-violet rounded-full"
        />
      )}
    </motion.button>
  );
}
export default NavItem;
export { ICONS };
