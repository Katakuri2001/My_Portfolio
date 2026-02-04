import { useState } from 'react';
import { motion } from 'framer-motion';
import cssLogo from '../assets/images/free-css-3d-icon-png-download-7578024.webp';
import jwtLogo from '../assets/images/jwt-logo-png_seeklogo-428033.png';

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  
  const skills = [
    { name: 'HTML', icon: 'HTML5', color: 'E34F26' },
    { name: 'CSS', icon: 'image', color: '1572B6', imagePath: cssLogo },
    { name: 'JavaScript', icon: 'JavaScript', color: 'F7DF1E' },
    { name: 'TypeScript', icon: 'TypeScript', color: '3178C6' },
    { name: 'React', icon: 'React', color: '61DAFB' },
    { name: 'Node.js', icon: 'Node.js', color: '339933' },
    { name: 'Express', icon: 'Express', color: '000000' },
    { name: 'MySQL', icon: 'MySQL', color: '4479A1' },
    { name: 'MongoDB', icon: 'MongoDB', color: '47A248' },
    { name: 'Cloudflare', icon: 'Cloudflare', color: 'F38020' },
    { name: 'JWT', icon: 'image', color: '000000', imagePath: jwtLogo }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Technical Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(168, 85, 247, 0.3)',
              }}
              whileTap={{ scale: 0.95 }}
              className="glass-card p-6 text-center cursor-pointer group"
              onHoverStart={() => setHoveredSkill(skill.name)}
              onHoverEnd={() => setHoveredSkill(null)}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.1
                  }}
                />
                <div className="relative z-10">
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                    className="text-4xl mb-3 flex items-center justify-center h-12"
                  >
                    <div className="w-10 h-10 flex items-center justify-center">
                      {skill.icon === 'image' ? (
                        <img 
                          src={skill.imagePath}
                          alt={skill.name}
                          className="w-10 h-10 object-contain"
                          style={{ 
                            filter: hoveredSkill === skill.name ? 'none' : 'brightness(0) invert(1)',
                            transition: 'filter 0.3s ease'
                          }}
                        />
                      ) : (
                        <img 
                          src={`https://cdn.simpleicons.org/${skill.icon}/${hoveredSkill === skill.name ? skill.color : 'white'}`}
                          alt={skill.name}
                          className="w-10 h-10 object-contain"
                        />
                      )}
                    </div>
                  </motion.div>
                  <div className="text-lg font-bold text-white mb-2 group-hover:gradient-text transition-all duration-300">
                    {skill.name}
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mx-auto"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="glass-card p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Full-Stack Expertise
            </h3>
            <p className="text-gray-300 leading-relaxed">
              From crafting responsive user interfaces with React and modern CSS to building 
              robust backend systems with Node.js and Express, I bring comprehensive full-stack 
              capabilities to every project. My experience spans from database design with SQL 
              and NoSQL solutions to deploying scalable applications on cloud platforms like Cloudflare.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
