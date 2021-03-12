import Pose from "./assets/Pose"
import ReactDragListView from 'react-drag-listview/lib/index.js';
import { motion, AnimatePresence } from 'framer-motion';

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
    opacity: 0, y: '20vh',
    transition: {
      duration: 0.2
    }
  }
}


const List = ({ poses, movePosition, editPose, deletePose, setPoses }) => {

  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      const data = [...poses];
      const item = data.splice(fromIndex, 1)[0];
      data.splice(toIndex, 0, item);
      setPoses( data );
    },
    lineClassName: 'global-drag-line',
    nodeSelector: 'li',
    handleSelector: '.pose-drag'
  };
  return (       
    <ReactDragListView {...dragProps}>
    <motion.ul className="list"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
    >
      <AnimatePresence>
        {poses.map((pose, index) => (
          
          <Pose   
            key={pose.id}
            pose={pose} 
            index={index}
            movePosition={movePosition}
            editPose={editPose}
            deletePose={deletePose}
          />    
        ))}   
      </AnimatePresence>
    </motion.ul>
    </ReactDragListView>
   );
}
 
export default List;