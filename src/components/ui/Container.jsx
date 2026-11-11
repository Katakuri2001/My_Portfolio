function Container({ children, className = '', size = 'lg' }) {
  const sizes = { sm: 'max-w-3xl', md: 'max-w-5xl', lg: 'max-w-6xl', xl: 'max-w-7xl' };
  return <div className={`${sizes[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}
export default Container;
