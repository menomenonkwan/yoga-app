import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTotalSeconds, getHours, getMinutes, getSeconds, displayTime } from './assets/Helpers';
// import { hoursArr, minsArr } from './assets/Content';
import { motion } from 'framer-motion';
// import Selection from './assets/Selection';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    marginTop: '3rem'
  },
}));

const PrettoSlider = withStyles({
  root: {
    color: 'var(--dark)',
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: 'var(--purple)',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  mark: {
    backgroundColor: 'var(--dark)',
    height: 8,

  },
  markActive: {
    backgroundColor: 'var(--purple)',
  },
  active: {
  },
  valueLabel: {
    left: 'calc(-50% + 4px)',
    color: 'var(--purple)',
    fontSize: '1.5rem',
    fontFamily: 'inherit',
  },
  track: {
    height: 8,
    borderRadius: 0,
  },
  rail: {
    height: 8,
    borderRadius: 0,
  },
})(Slider);

function valuetext(value) {
  return `${value}`;
}

const SlideTimeForm = ({ totalTime, setTotalTime, poses }) => {
  const [timeSet, setTimeSet] = useState(false);
  const [hours, setHours] = useState(getHours(totalTime));
  const [minutes, setMinutes] = useState(getMinutes(totalTime));
  const [seconds, setSeconds] = useState(getSeconds(totalTime));  
  const classes = useStyles();

  useEffect(() => {
    setTotalTime(getTotalSeconds(hours, minutes, seconds));
  }, [setTotalTime, totalTime, hours, minutes, seconds, poses])
 
  useEffect(() => {
      (totalTime !== 0 ? setTimeSet(true) : setTimeSet(false));
      if(poses.length <= 0) {setTimeSet(false)};
  }, [totalTime, poses]);
  
  const handleSliderChange = (name, newValue) => {
    if(name === 'hours') {
      setHours(newValue);
    }
    if(name === 'minutes') {
      setMinutes(newValue);
    }
    if(name === 'seconds') {
      setSeconds(newValue);
    }
  };

  return ( 
    <div className="section">
        <form>
          <fieldset> 
            <legend>Program Length: <span>{displayTime(totalTime)}</span></legend>
            <div className={classes.root}>
            <p className="legend" >Hours:</p>
            <PrettoSlider 
              value={hours}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={5}
              onChange={(e, value) => handleSliderChange('hours', value)}
              />
            <p className="legend" >Minutes:</p>
            <PrettoSlider
              value={minutes}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={59}
              onChange={(e, value) => handleSliderChange('minutes', value)}
              />
            <p className="legend" >Seconds:</p>
            <PrettoSlider
              value={seconds}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={5}
              marks
              min={0}
              max={55}
              onChange={(e, value) => handleSliderChange('seconds', value)}
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
 
export default SlideTimeForm;