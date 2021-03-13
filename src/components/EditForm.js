import React, { useEffect, useState } from 'react';
import { getHours, getMinutes, getSeconds, getTotalSeconds } from './assets/Helpers';
import Selection from './assets/Selection';
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
  const [disabled, setDisabled] = useState(false);

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

  useEffect(() => {
    const totalSeconds = getTotalSeconds(hours, minutes, seconds);

    (totalSeconds > 0 ? setDisabled(false) : setDisabled(true));
  }, [hours, minutes, seconds]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    console.log(event.target.name);
    if(name === 'name') {
      setTitle(value);
    }
    if(name === 'hours') {
      setHours(value);
    }
    if(name === 'minutes') {
      setMinutes(value);
    }
    if(name === 'seconds') {
      setSeconds(value);
    }
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
      <form onSubmit={handleSubmit} >
        <fieldset>
          <legend>Edit Pose:</legend>
          <input 
            type="text" 
            name="name"
            placeholder="name" 
            value={title}
            onChange={handleChange}
          />
          <div 
            style={{
              padding: '2rem',
            }}
          >
            <Selection 
              name='hours'
              time={hours}
              handleChange={handleChange} 
              range={hoursArr}             
            />
            <Selection 
              name='minutes'
              time={minutes}
              handleChange={handleChange}      
              range={minsArr}        
            />
            <Selection 
              name='seconds'
              time={seconds}
              handleChange={handleChange}              
              range={minsArr}
            />
          </div>
          <motion.button 
            type="submit"
            className={disabled ? "off" : "on"}
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