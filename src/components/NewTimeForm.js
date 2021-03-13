import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTotalSeconds, getHours, getMinutes, getSeconds, displayTime } from './assets/Helpers';
import { hoursArr, minsArr } from './assets/Content';
import { motion } from 'framer-motion';
import Selection from './assets/Selection';

const NewTimeForm = ({ totalTime, setTotalTime, poses }) => {
  const [timeSet, setTimeSet] = useState(false);
  const [hours, setHours] = useState(getHours(totalTime));
  const [minutes, setMinutes] = useState(getMinutes(totalTime));
  const [seconds, setSeconds] = useState(getSeconds(totalTime));

  useEffect(() => {
    setTotalTime(getTotalSeconds(hours, minutes, seconds));
    (totalTime !== 0 ? setTimeSet(true) : setTimeSet(false));
    if(poses.length <= 0) {setTimeSet(false)};
  }, [setTotalTime, totalTime, hours, minutes, seconds, poses])

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
  }

  return ( 
    <div className="section">
        <form>
          <fieldset> 
            <legend>Program Length: <span>{displayTime(totalTime)}</span></legend>
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
            <div className="time-controls">
              <Link to={timeSet ? '/program' : '#'} >
                <motion.button
                  className={timeSet ? 'on' : 'off'}
                  whileHover={{scale:1.1}}
                  whileTap={{scale:0.9}}
                  disabled={!timeSet}
                >
                  Start Program
                </motion.button> 
              </Link>
            </div>
          </fieldset>
        </form>

    </div>
   );
}
 
export default NewTimeForm;

