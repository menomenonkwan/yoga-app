import React, { useState, useEffect } from 'react';
import { hoursArr, minsArr, intArr } from './assets/Content';
import { getTotalSeconds } from './assets/Helpers';
import uniqid from 'uniqid';
import PoseSelection from './assets/PoseSelection';
import { motion } from 'framer-motion';
import Selection from './assets/Selection';

const PoseForm = ({ poses, setPoses }) => {
  const [names, setNames] = useState([]);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [intervals, setIntervals] = useState(1);
  const [disabled, setDisabled] = useState(true);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [hrs, setHrs] = useState([...hoursArr]);
  const [minSecs, setMinSecs] = useState([...minsArr]);
  const [ints, setInts] = useState([...intArr]);

  useEffect(() => {
    setTotalSeconds(getTotalSeconds(hours, minutes, seconds));

    (names.length > 0 && totalSeconds > 0 ? setDisabled(false) : setDisabled(true));   
  }, [totalSeconds, hours, minutes, seconds, names.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(names.length <= 0 || totalSeconds === 0) { return ; }
 
    let newPoses = [];
    names.forEach(name => {
      [...Array(parseInt(intervals))].forEach(() => (
        newPoses.push(
          {
            id: `pose${uniqid()}`,
            name: name.value,
            duration: totalSeconds,
          }
        )
      ));
    });
    setPoses([ ...poses, ...newPoses ]);
    setNames([]);
    setHrs([...hoursArr]);
    setMinSecs([...minsArr]);
    setInts([...intArr]);

  }        

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if(name === 'hours') {
      setHours(value);
    }
    if(name === 'minutes') {
      setMinutes(value);
    }
    if(name === 'seconds') {
      setSeconds(value);
    }
    if(name === 'intervals') {
      setIntervals(value);
    }
  }

  return ( 
    <div className="section">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Add A Pose:</legend>
          <PoseSelection
            names={names}
            setNames={setNames}
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
              range={hrs}             
            />
            <Selection 
              name='minutes'
              time={minutes}
              handleChange={handleChange}      
              range={minSecs}        
            />
            <Selection 
              name='seconds'
              time={seconds}
              handleChange={handleChange}              
              range={minSecs}
            />
            <Selection 
              name='intervals'
              time={intervals}
              handleChange={handleChange}  
              range={ints}           
            />
          </div>           
          <div className="time-controls">
            <motion.button
              className={!disabled ? 'on' : 'off'}
              whileHover={{scale:1.1}}
              whileTap={{scale:0.9}}
              disabled={disabled}
            >
              Add Pose
            </motion.button> 
          </div>
        </fieldset>
      </form>
    </div>
  );
}
 
export default PoseForm;