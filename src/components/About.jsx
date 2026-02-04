import { motion } from 'framer-motion';

const About = () => {
  const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '12+', label: 'Technologies Mastered' },
    { number: 'Full-Stack', label: 'Engineer' }
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">About Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* About Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card p-8"
          >
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              Crafting Digital Excellence
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              I'm a passionate full-stack developer with expertise in building modern web applications 
              that deliver exceptional user experiences. My journey in web development has been driven 
              by curiosity and a commitment to staying at the forefront of technology.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Specializing in React, Node.js, and cloud technologies, I transform complex problems into 
              elegant solutions. From responsive frontends to scalable backend architectures, I bring 
              ideas to life with clean, efficient code.
            </p>
            <p className="text-gray-300 leading-relaxed">
              My approach combines technical excellence with creative problem-solving, ensuring that 
              every project not only meets requirements but exceeds expectations in performance, 
              security, and user satisfaction.
            </p>
          </motion.div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="glass-card p-6 text-center glow-hover"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  className="text-3xl md:text-4xl font-bold gradient-text mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
