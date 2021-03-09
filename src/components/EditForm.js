import React, { useState } from 'react';
import { getHours, getMinutes, getSeconds, getTotalSeconds } from './assets/Helpers';
import TimeSelect from './assets/TimeSelect';
import { hoursArr, minsArr } from './assets/Content';

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
    <div className="edit">
      <form onSubmit={handleSubmit} >
        <fieldset>
          <legend>Add A Pose:</legend>
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
          {/* <label>Hours</label>
          <input 
            type="number" 
            name="hours"
            placeholder="hours (0 - 24)"
            min="0" 
            max="24" 
            value={hours}
            onChange={handleChange}
          />
          <label>Minutes</label>
          <input 
            type="number" 
            name="minutes"
            placeholder="minutes (0 - 59)" 
            min="0" 
            max="59" 
            value={minutes}
            onChange={handleChange}
          />  
          <label>Seconds</label>      
          <input 
            type="number" 
            name="seconds"
            placeholder="seconds (0 - 59)" 
            min="0" 
            max="59" 
            value={seconds}
            onChange={handleChange}
          />      */}
          <button type="submit">Set Pose</button>       
        </fieldset>
      </form>
    </div>
  );
}
 
export default EditForm;