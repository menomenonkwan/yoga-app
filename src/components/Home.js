import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: '-125vh' },
  show: {
    opacity: 1, y: 0,
    transition: {
      type: 'spring',
      damping: 10, 
      mass: 0.5, 
      stiffness: 120,
      staggerChildren: 1,
      duration: 0.4,
      delay: 0.5
    }
  },
  exit: {
    opacity: 0, y: '20vh',
    transition: {
      duration: 0.2
    }
  }
}

const childVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
}

const Welcome = () => {
  return ( 
    <div className="container" style={{ alignItems: 'center' }}>

      <motion.div
        className="wrapper"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
      > 
        <motion.h1 variants={childVariants}>Welcome, Buddy!</motion.h1>
        <motion.h2 variants={childVariants}>Let's Get Started...</motion.h2>
        <Link to="/build">
          <motion.button
            className="on"
            variants={childVariants}
            whileHover={{scale:1.1}}
            whileTap={{scale:0.9}}
          >
            Build Program
          </motion.button>
        </Link>
      </motion.div>
    </div>
   );
}
 
export default Welcome;