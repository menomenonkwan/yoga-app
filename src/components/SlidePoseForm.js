import { useState, useEffect } from 'react';
import { getTotalSeconds, displayTime } from './assets/Helpers';
import uniqid from 'uniqid';
import PoseSelection from './assets/PoseSelection';
import { motion } from 'framer-motion';
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


const SlidePoseForm = ({ poses, setPoses }) => {
  const [names, setNames] = useState([]);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [intervals, setIntervals] = useState(1);
  const [disabled, setDisabled] = useState(true);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const classes = useStyles();

  
  const handleSliderChange = (name, newValue) => {
    if(name === 'minutes') {
      setMinutes(newValue);
    }
    if(name === 'seconds') {
      setSeconds(newValue);
    }
    if(name === 'intervals') {
      setIntervals(newValue);
    }
  };

  useEffect(() => {
    setTotalSeconds(getTotalSeconds(0, minutes, seconds));

    (names.length > 0 && totalSeconds > 0 ? setDisabled(false) : setDisabled(true));   
  }, [totalSeconds, minutes, seconds, names.length]);

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
  }        

  return ( 
    <div className="section">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Add A Pose: <span>{displayTime(totalSeconds)}</span></legend>
            <div className={classes.root}>
          <PoseSelection
            names={names}
            setNames={setNames}
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
            <p className="legend" >Intervals:</p>
              <PrettoSlider
                value={intervals}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={10}
                onChange={(e, value) => handleSliderChange('intervals', value)}
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
 
export default SlidePoseForm;