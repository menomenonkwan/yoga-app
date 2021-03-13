import NewPoseForm from './NewPoseForm';
import Edit from './Edit';
import { motion } from 'framer-motion';
import SlideTimeForm from './SlideTimeForm';

const formVariants = {
  hidden: { opacity: 0, x: '-100vw' },
  show: {
    opacity: 1, x: 0,
    transition: {
      type: 'spring',
      duration: 1,
    }
  }
}

const listVariants = {
  hidden: { opacity: 0, x: '100vw' },
  show: {
    opacity: 1, x: 0,
    transition: {
      type: 'spring',
      duration: 1,
    }
  }  
}

const Build = ({ poses, setPoses, totalTime, setTotalTime, movePosition, deletePose }) => {

  return ( 
    <div className="container">
      <motion.div 
        className="inputs"
        variants={formVariants}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        <SlideTimeForm 
          totalTime={totalTime} 
          setTotalTime={setTotalTime}
          poses={poses}        
        />
        {/* <NewTimeForm 
          totalTime={totalTime} 
          setTotalTime={setTotalTime}
          poses={poses}
        /> */}
        <NewPoseForm 
          poses={poses} 
          setPoses={setPoses}
        />
      </motion.div>
      <motion.div 
        className="current-list"
        variants={listVariants}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        <Edit 
          poses={poses} 
          setPoses={setPoses}
          movePosition={movePosition} 
          deletePose={deletePose}
          totalTime={totalTime}
        />       
      </motion.div>     
    </div>
   );
}
 


export default Build;