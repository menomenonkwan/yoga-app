import { displayTime } from './assets/Helpers';
import { FaChevronCircleUp, FaChevronCircleDown, FaEdit, FaDizzy, FaArrowsAltV } from 'react-icons/fa';
import { useState } from 'react';

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
    <li className={isDragging ? "pose drag" : "pose"} onDrag={handleDrag} onDragEnd={handleDrop}>
      <FaChevronCircleDown className="pose-controls" onClick={() => movePosition(index, 1)}/>
      <FaChevronCircleUp className="pose-controls"  onClick={() =>movePosition(index, -1)}/>
      <p className="pose-name">
        {pose.name} 
      </p>
      <p className="pose-time">{displayTime(pose.duration)}</p>
      
      <FaArrowsAltV className="pose-drag"/>
      <FaEdit className="pose-controls"  onClick={() => editPose(index)}/>
      <FaDizzy className="pose-controls"  onClick={() => deletePose(index)}/>
    </li>
   );
}
 
export default Pose;