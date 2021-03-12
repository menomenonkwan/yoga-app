import { displayTime, getTotalTime } from './Helpers';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.5,
    }
  }
}

const Totals = ({ totalTime, poses }) => {
  const remainingTime = totalTime - getTotalTime(poses);

  return ( 
    <motion.div 
      className="totals"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      <h2>Program Time: 
        <span>
          {displayTime(totalTime)}
        </span>
      </h2>

      <h2>Time Remaining: 
        <span className={remainingTime < 0 ? 'overtime' : ''}>
          {displayTime(remainingTime)}
        </span>
      </h2>
    </motion.div>
   );
}
 
export default Totals;