import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TimeSelect from './assets/TimeSelect';
import { hoursArr, minsArr, intArr } from './assets/Content';
import { getTotalSeconds } from './assets/Helpers';
import uniqid from 'uniqid';
import PoseSelection from './assets/PoseSelection';
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
      staggerChildren: 0.7,
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

const childVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
}

const PoseForm = ({ poses, setPoses, totalTime }) => {
  const [newPose, setNewPose] = useState(true);
  const [names, setNames] = useState([]);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [intervals, setIntervals] = useState(1);
  const [disabled, setDisabled] = useState(true);
  const [totalSeconds, setTotalSeconds] = useState(0);

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
    setNewPose(!newPose);
    setDisabled(true);
  }         

  return ( 
    <div className="container">
      <motion.div 
        className="wrapper"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
      >          
        {newPose ? 
          <React.Fragment>
            <motion.p className="legend" variants={childVariants}>Program Length:</motion.p>
            <motion.form onSubmit={handleSubmit} variants={childVariants}>
              <fieldset>
                <PoseSelection
                  setNames={setNames}
                />
                <div className="time-selection">
                  <div className="time-selection-individual">
                    <label>hours</label>
                    <TimeSelect 
                      arr={hoursArr} 
                      handleChange={setHours}
                    />
                  </div>
                  <div className="time-selection-individual">
                    <label>minutes</label>
                    <TimeSelect 
                      arr={minsArr} 
                      handleChange={setMinutes}
                    />
                  </div>
                  <div className="time-selection-individual">
                    <label>seconds</label>
                    <TimeSelect 
                      arr={minsArr} 
                      handleChange={setSeconds}
                    />
                  </div>              
                  <div className="time-selection-individual">
                    <label>Intervals</label>   
                    <TimeSelect 
                      arr={intArr} 
                      handleChange={setIntervals}
                    />
                  </div>              
                </div>
                {disabled 
                  ? 
                    <button 
                      className="off"
                      disabled
                    >
                      Set Time
                    </button>         
                  : 
                    <motion.button
                      className="on"
                      type="submit"
                      whileHover={{scale:1.1}}
                      whileTap={{scale:0.9}}
                    >
                      Set Time
                    </motion.button>
                } 
              </fieldset>
            </motion.form>
          </React.Fragment>
        : 
          <motion.div
            className="wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h1>Awesome!</h1>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <motion.button 
                className="on"
                whileHover={{scale:1.1}}
                whileTap={{scale:0.9}}
                onClick={()=>setNewPose(!newPose)}
              >
                Add Another Pose
              </motion.button>
              <Link to="/edit">
                <motion.button
                  className="on"
                  whileHover={{scale:1.1}}
                  whileTap={{scale:0.9}}
                >
                  Edit Program
                </motion.button>
              </Link>
            </div></motion.div>
        } 
      </motion.div>
    </div>
  );
}
 
export default PoseForm;