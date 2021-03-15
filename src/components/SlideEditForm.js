import React, { useEffect, useState } from 'react';
import { getMinutes, getSeconds, getTotalSeconds, displayTime } from './assets/Helpers';
import { motion } from 'framer-motion';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

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

const SlideEditForm = ({ index, poses, setPoses, setEdit }) => {
  const pose = poses[index];
  const id = poses[index].id;

  const [title, setTitle] = useState(pose.name);
  const [minutes, setMinutes] = useState(getMinutes(pose.duration));
  const [seconds, setSeconds] = useState(getSeconds(pose.duration));
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const classes = useStyles();

  const editPose = () => {
    const newPoses = [ ...poses ];    
    
    newPoses[index] = {
      id,
      name: title,
      duration: totalSeconds,
    }   

    setPoses(newPoses);
  }

  useEffect(() => {
    setTotalSeconds(getTotalSeconds(0, minutes, seconds));

    (totalSeconds > 0 ? setDisabled(false) : setDisabled(true));
  }, [totalSeconds, minutes, seconds]);

  const handleNameChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if(name === 'name') {
      setTitle(value);
    }
  }
  
  const handleSliderChange = (name, newValue) => {
    if(name === 'minutes') {
      setMinutes(newValue);
    }
    if(name === 'seconds') {
      setSeconds(newValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.currentTarget);
    const name = e.currentTarget.name;
    const updatedInput = e.currentTarget.value;
    const totalSeconds = 0 + minutes + seconds;

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
          <legend>Edit Pose: <span>{displayTime(totalSeconds)}</span></legend>
          <input 
            className="edit-input"
            type="text" 
            name="name"
            placeholder="name" 
            value={title}
            onChange={handleNameChange}
          />
          <div className={classes.root}>
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
 
export default SlideEditForm;