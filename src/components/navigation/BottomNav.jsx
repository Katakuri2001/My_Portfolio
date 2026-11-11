import NavItem from './NavItem';

const NAV = ['Home', 'About', 'Skills', 'Projects', 'Architecture', 'Contact'];

function BottomNav({ active, onNavigate }) {
  return (
    <nav className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-1 p-2 rounded-2xl glass-card-strong shadow-2xl">
      {NAV.map((item) => (
        <NavItem key={item} item={item} active={active} expanded={false} onClick={() => onNavigate(item.toLowerCase())} compact />
      ))}
    </nav>
  );
}
export default BottomNav;
