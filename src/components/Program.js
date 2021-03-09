import { useEffect, useState, useMemo } from 'react';
import { FaHome, FaPlayCircle, FaPauseCircle, FaStopCircle, FaRegPlayCircle } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import uniqid from 'uniqid';
import CircleTimer from './assets/CircleTimer';
import ProgressBar from './assets/ProgressBar';
import { countdown } from './assets/Content';

const newKey = () => {
  return uniqid();
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

  const completePose = () => {
    setActive(false);
    setCount(count + 1);
    if(count >= currentProgram.length - 1) {
      setTimerOn(false)
    } else {
      setActive(true);
    };
  }

  const Victory = () => (
    <div><h2>You Did It, Buddy.</h2><h1>See You Tomorrow!</h1></div>
  );

  return ( 
    <div className="program">
      <h1>{currentPose ? currentPose.name : <Victory />}</h1>

      {active && 
      <div className="circle">
        <CircleTimer 
          key={key}
          timerOn={timerOn} 
          completePose={completePose} 
          currentPose={currentPose}
        />
      </div>  }    

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

      

      <Link to="/" className="to-home">
        <button style={{
        }}>
          <FaHome />Home
        </button>
      </Link>        
      <div className="program-controls">
        <button onClick={() => {
          setTimerOn(true);
          setProgramOn(true);
          }}
        >
          <FaPlayCircle />
          Start
          </button>
        <button onClick={() => setTimerOn(!timerOn)}>
          <FaPauseCircle />
          Pause
        </button>
        <button onClick={() => {
          setTimerOn(false); 
          setProgramOn(false);
          }}
        >
          <FaStopCircle />
          Stop/End
        </button>
        <button onClick={() => {
          setKey(newKey());
          setTimerOn(false);
          setCount(0);
          setCurrentPose(currentProgram[0]);
          setActive(true);
          setProgramOn(false);
        }}>
          <FaRegPlayCircle />
          Reset
        </button>
      </div>

      

      {programOn &&
        <ProgressBar 
          totalTime={totalTime}
        />
      }
    </div>
   );
}
 
export default Program;