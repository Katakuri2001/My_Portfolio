import { motion } from 'framer-motion';

function Button({ children, variant = 'primary', className = '', as, ...rest }) {
  const base = 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/60';
  const styles = {
    primary: 'bg-gradient-to-r from-accent-blue to-accent-violet text-white hover:shadow-lg hover:shadow-accent-blue/30',
    ghost: 'glass-card text-silver hover:bg-white/[0.08]',
    link: 'text-accent-blue hover:text-accent-violet underline-offset-4 hover:underline',
  };
  const Comp = as ? motion[as] : motion.button;
  return (
    <Comp whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </Comp>
  );
}
export default Button;
