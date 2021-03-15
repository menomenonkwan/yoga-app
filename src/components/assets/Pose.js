import { displayTime } from './Helpers';
import { FaChevronCircleUp, FaChevronCircleDown, FaEdit, FaTimes, FaArrowsAltV } from 'react-icons/fa';
import { useState } from 'react';
import { motion } from 'framer-motion';

const childVariants = {
  hidden: { opacity: 0, scale: 0.1 },
  show: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.1, 
    transition: { duration: 0.4 }
  }
}

const Pose = ({ pose, index, movePosition, editPose, deletePose }) => {
  const [isDragging, setIsDragging] = useState(false);

 
  const handleDrag = (e) => {
    setIsDragging(true);
  }
  const handleDrop = (e) => {
    setTimeout(() => {
      setIsDragging(false);
    }, 1000);
  }

  return ( 
    <motion.li className={isDragging ? "pose drag" : "pose"} onDrag={handleDrag} onDragEnd={handleDrop}
      whileHover={{ scale:1.1 }}
      variants={childVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      custom={index}
    >
      <FaChevronCircleDown className="pose-controls" onClick={() => movePosition(index, 1)}/>
      <FaChevronCircleUp className="pose-controls"  onClick={() =>movePosition(index, -1)}/>
      <p className="pose-name">
        {pose.name} 
      </p>
      <p className="pose-time">{displayTime(pose.duration)}</p>
      
      <FaArrowsAltV className="pose-drag"/>
      <FaEdit className="pose-controls"  onClick={() => editPose(index)}/>
      <FaTimes className="pose-controls"  onClick={() => deletePose(index)}/>
    </motion.li>
   );
}
 
export default Pose;