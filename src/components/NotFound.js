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
      staggerChildren: 0.6,
      duration: 0.4,
    }
  },
  exit: {
    opacity: 0, y: '25vh',
    transition: {
      duration: 0.2
    }
  }
}

const childVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
}

const NotFound = () => {
  return ( 
    <div className="container">
      <motion.div 
        className="wrapper"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
      >    
        <motion.h1 variants={childVariants}>Oh no!</motion.h1> 
        <h2>
          <motion.span variants={childVariants}>Page </motion.span> 
          <motion.span variants={childVariants}>Not </motion.span> 
          <motion.span variants={childVariants}>Found </motion.span>
          <motion.span variants={childVariants}>. </motion.span>
          <motion.span variants={childVariants}>. </motion.span>
          <motion.span variants={childVariants}>.</motion.span>
        </h2>
        

      </motion.div>
    </div>
   );
}
 
export default NotFound;