import { motion } from 'framer-motion';
import { fadeUp } from '../../design/motion';

function Section({ id, children, className = '', ...rest }) {
  return (
    <section id={id} className={`py-24 sm:py-32 ${className}`} {...rest}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeUp}
      >
        {children}
      </motion.div>
    </section>
  );
}
export default Section;
