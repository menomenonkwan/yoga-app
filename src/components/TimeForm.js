import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTotalSeconds, getHours, getMinutes, getSeconds } from './assets/Helpers';
import TimeSelect from './assets/TimeSelect';
import { hoursArr, minsArr } from './assets/Content';
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

const TimeForm = ({ totalTime, setTotalTime }) => {
  const [timeSet, setTimeSet] = useState(false);
  const [hours, setHours] = useState(getHours(totalTime));
  const [minutes, setMinutes] = useState(getMinutes(totalTime));
  const [seconds, setSeconds] = useState(getSeconds(totalTime));
  const [totalSeconds, setTotalSeconds] = useState(
    getTotalSeconds(hours, minutes, seconds)
  )

  useEffect(() => {
    setTotalSeconds(getTotalSeconds(hours, minutes, seconds));
    (totalSeconds !== 0 ? setTimeSet(true) : setTimeSet(false));
  }, [totalSeconds, hours, minutes, seconds])

  useEffect(() => {
    setTotalTime(totalSeconds);
  }, [setTotalTime, totalSeconds]);

  return ( 
    <div className="container">
      <motion.div
        className="wrapper"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
      > 
        <motion.p className="legend" variants={childVariants}>Program Length:</motion.p>
        <motion.form variants={childVariants}>
          <fieldset> 
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
          </fieldset>
          {timeSet 
            ? <Link to="/pose" >
                <motion.button
                  className="on"
                  type="submit"
                  whileHover={{scale:1.1}}
                  whileTap={{scale:0.9}}
                >
                  Set Time
                </motion.button>
              </Link>            
            : <Link to="#" >
                <button 
                  className="off"
                  disabled
                >
                  Set Time
                </button>
              </Link>
          } 
        </motion.form>
    </motion.div>
    </div>
   );
}
 
export default TimeForm;

