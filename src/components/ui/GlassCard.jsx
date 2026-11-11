function GlassCard({ children, className = '', strong = false, ...rest }) {
  return (
    <div className={`${strong ? 'glass-card-strong' : 'glass-card'} ${className}`} {...rest}>
      {children}
    </div>
  );
}
export default GlassCard;
