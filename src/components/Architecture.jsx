import { motion } from 'framer-motion';

const Architecture = () => {
  const architectureFlow = [
    {
      title: 'React Frontend',
      description: 'Modern, responsive user interfaces with component-based architecture',
      icon: '⚛️',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Node.js/Express API',
      description: 'RESTful APIs with middleware, authentication, and business logic',
      icon: '🚀',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Database Layer',
      description: 'SQL and NoSQL solutions for data persistence and management',
      icon: '🗄️',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Cloudflare CDN',
      description: 'Global content delivery, edge computing, and security',
      icon: '☁️',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section id="architecture" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">System Architecture</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full" />
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Building scalable, maintainable applications with modern full-stack architecture
          </p>
        </motion.div>

        {/* Desktop Horizontal Flow */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connection Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-green-500 via-purple-500 to-orange-500 transform -translate-y-1/2"
            />

            <div className="grid grid-cols-4 gap-8 relative">
              {architectureFlow.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 20px 40px rgba(168, 85, 247, 0.3)',
                  }}
                  className="relative"
                >
                  {/* Arrow Indicator */}
                  {index < architectureFlow.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                      className="absolute top-1/2 -right-4 transform -translate-y-1/2 text-2xl z-10"
                    >
                      →
                    </motion.div>
                  )}

                  <div className="glass-card p-6 text-center h-full">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                      className={`text-4xl mb-4 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Vertical Flow */}
        <div className="lg:hidden space-y-6">
          {architectureFlow.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 20px 40px rgba(168, 85, 247, 0.3)',
              }}
              className="relative"
            >
              {/* Arrow Indicator for Mobile */}
              {index < architectureFlow.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full text-2xl mt-2"
                >
                  ↓
                </motion.div>
              )}

              <div className="glass-card p-6">
                <div className="flex items-center space-x-4">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                    className={`text-3xl bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                  >
                    {item.icon}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Architecture Summary */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold gradient-text mb-6 text-center">
              Modern Full-Stack Development
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Frontend Excellence</h4>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Component-based React architecture
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Responsive design with Tailwind CSS
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Smooth animations with Framer Motion
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Backend & Infrastructure</h4>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    RESTful APIs with Express.js
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Database optimization (SQL/NoSQL)
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Cloud deployment with Cloudflare
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Architecture;
