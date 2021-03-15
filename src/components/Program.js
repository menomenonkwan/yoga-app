import React, { useEffect, useState, useMemo } from 'react';
import { FaAngleDoubleRight,FaHome, FaPlayCircle, FaPauseCircle, FaStopCircle, FaRegPlayCircle } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import uniqid from 'uniqid';
import CircleTimer from './assets/CircleTimer';
import ProgressBar from './assets/ProgressBar';
import { countdown } from './assets/Content';
import { AnimatePresence, motion } from 'framer-motion';

const newKey = () => {
  return uniqid();
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.3,
    }
  },
  exit: {
    opacity: 0, 
    transition: {
      duration: 0.2
    }
  }
}

const Program = ({ poses, totalTime }) => {
  const currentProgram = useMemo(() => [ ...countdown, ...poses ], [poses]);
  const [count, setCount] = useState(0);
  const [currentPose, setCurrentPose] = useState( currentProgram[count] );
  const [timerOn, setTimerOn] = useState(false);
  const [programOn, setProgramOn] = useState(false);
  const [key, setKey] = useState(newKey());
  const [active, setActive] = useState(true);

  useEffect(() => {
    setCurrentPose(currentProgram[count]);
  }, [currentProgram, count]);

  useEffect(() => {
    document.body.addEventListener("keydown", KeyPressPause);    
    return () => { 
      document.body.removeEventListener("keydown", KeyPressPause); }
  });

  const KeyPressPause = (e) => {
    // spacebar is jenky
    if(e.keyCode !== 32 && programOn){
      setTimerOn(!timerOn);
    }
  }
   
  const completePose = () => {
    setActive(false);
    setCount(count + 1);
    if(count >= currentProgram.length - 1) {
      setTimerOn(false)
    } else {
      setActive(true);
    };
  }

  const handleSkip = () => {
    setTimerOn(false);
    setActive(false);
    setCount(count + 1);
    if(count >= currentProgram.length - 1) {
      setTimerOn(false);
    } else {
      setTimeout(() => {
      setActive(true);
      }, 10);
    }
  }

  const Victory = () => (
    <div>
      <h3>Cooldown</h3>
      <h2>You Did It, Buddy.</h2>
      <h1>See You Tomorrow!</h1>
    </div>
  );


  return ( 
    <div className="container">   
      <motion.div 
        className="program"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        <h1>{currentPose ? currentPose.name : <Victory />}</h1>
        {active && 
          <AnimatePresence>
            <motion.div 
              className="circle"
              initial={{opacity: 0, scale: 0.1}}
              animate={{opacity: 1, scale: 1}}
            >
              <CircleTimer 
                key={key}
                timerOn={timerOn} 
                completePose={completePose} 
                currentPose={currentPose}
              />
              <motion.button 
                className="on" 
                onClick={handleSkip}
                whileHover={{scale:1.1}}
                whileTap={{scale:0.9}}
              >
                <FaAngleDoubleRight />
                skip
              </motion.button>
            </motion.div>
          </AnimatePresence>
        }    
        {currentPose 
          ? <div className="next">
              <h2>up next:</h2>
              <p>
                {currentProgram[count + 1] 
                  ? currentProgram[count + 1].name 
                  : 'cooldown'
                }
              </p>
            </div>
          : null
        }
        <Link to="/build" className="to-home">
          <motion.button
            className="on"
            whileHover={{scale:1.1}}
            whileTap={{scale:0.9}}
            style={{
              backgroundColor: 'transparent',
              border: '2px solid var(--lightpurple)',
              color: 'var(--lightpurple)'
            }}
          >
            <FaHome />Edit
          </motion.button>
        </Link>        
        <div className="program-controls">
          <motion.button 
            className="on"
            onClick={() => {
              setTimerOn(true);
              setProgramOn(true);
            }}
            whileHover={{scale:1.1}}
            whileTap={{scale:0.9}}
          >
            <FaPlayCircle />
            Start
            </motion.button>
          <motion.button
            className="on" 
            onClick={() => setTimerOn(!timerOn)}
            whileHover={{scale:1.1}}
            whileTap={{scale:0.9}}
          >
            <FaPauseCircle />
            Pause
          </motion.button>
          <motion.button 
            className="on"
            onClick={() => {
              setTimerOn(false); 
              setProgramOn(false);
            }}
            whileHover={{scale:1.1}}
            whileTap={{scale:0.9}}
          >
            <FaStopCircle />
            Stop/End
          </motion.button>
          <motion.button 
            className="on"
            onClick={() => {
              setKey(newKey());
              setTimerOn(false);
              setCount(0);
              setCurrentPose(currentProgram[0]);
              setActive(true);
              setProgramOn(false);
            }}
            whileHover={{scale:1.1}}
            whileTap={{scale:0.9}}
          >
            <FaRegPlayCircle />
            Reset
          </motion.button>
        </div>
        {programOn &&
          <ProgressBar 
            totalTime={totalTime}
          />
        }
      </motion.div>
    </div>
  );
}
 
export default Program;