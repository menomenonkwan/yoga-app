import React, { useState } from 'react';
import { getHours, getMinutes, getSeconds, getTotalSeconds } from './assets/Helpers';
import TimeSelect from './assets/TimeSelect';
import { hoursArr, minsArr } from './assets/Content';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.1 },
  show: {
    opacity: 1, scale: 1,
    transition: {
      duration: 0.4,
    }
  },
  exit: { opacity: 0, 
    scale: 0.1 ,
    transition: {
      duration: 0.2
    }
  }
}

const EditForm = ({ index, poses, setPoses, setEdit }) => {
  const pose = poses[index];
  const id = poses[index].id;

  const [title, setTitle] = useState(pose.name);
  const [hours, setHours] = useState(getHours(pose.duration));
  const [minutes, setMinutes] = useState(getMinutes(pose.duration));
  const [seconds, setSeconds] = useState(getSeconds(pose.duration));

  const editPose = (name, updatedInput) => {
    if(name === 'name') {
      setTitle(updatedInput);
    }
    if(name === 'hours') {
      setHours(updatedInput);
    }
    if(name === 'minutes') {
      setMinutes(updatedInput);
    }
    if(name === 'seconds') {
      setSeconds(updatedInput);
    }

    const totalSeconds = getTotalSeconds(hours, minutes, seconds);
    const newPoses = [ ...poses ];    
    
    newPoses[index] = {
      id,
      name: title,
      duration: totalSeconds,
    }   

    setPoses(newPoses);
  }

  const handleChange = (e) => {
    const name = e.currentTarget.name;
    const updatedInput = e.currentTarget.value;

    editPose(name, updatedInput);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
        const name = e.currentTarget.name;
    const updatedInput = e.currentTarget.value;
    const totalSeconds = hours + minutes + seconds;

    if(!title || parseInt(totalSeconds) === 0) { return; }

    editPose(name, updatedInput);
    setEdit(false);
  }

  return ( 
    <motion.div 
      className="edit"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <p className="legend">Edit Pose:</p>
      <form onSubmit={handleSubmit} >
        <fieldset>
          <input 
            type="text" 
            name="name"
            placeholder="name" 
            value={title}
            onChange={handleChange}
          />
                    <div className="time-selection">
            <div className="time-selection-individual">
              <label>hours</label>
              <TimeSelect 
                arr={hoursArr} 
                handleChange={setHours}
                currentValue={hours}
              />
            </div>
            <div className="time-selection-individual">
              <label>minutes</label>
              <TimeSelect 
                arr={minsArr} 
                handleChange={setMinutes}
                currentValue={minutes}
              />
            </div>
            <div className="time-selection-individual">
              <label>seconds</label>
              <TimeSelect 
                arr={minsArr} 
                handleChange={setSeconds}
                currentValue={seconds}
              />
            </div>
          </div>
          <motion.button 
            type="submit"
            className="on"
            whileHover={{scale:1.1}}
            whileTap={{scale:0.9}}
          >
            Set Pose
          </motion.button>       
        </fieldset>
      </form>
    </motion.div>
  );
}
 
export default EditForm;