import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getTotalSeconds, getHours, getMinutes, getSeconds } from './assets/Helpers';
import TimeSelect from './assets/TimeSelect';
import { hoursArr, minsArr } from './assets/Content';

const TimeForm = ({ totalTime, setTotalTime }) => {
  const [timeSet, setTimeSet] = useState(false);
  const [hours, setHours] = useState(getHours(totalTime));
  const [minutes, setMinutes] = useState(getMinutes(totalTime));
  const [seconds, setSeconds] = useState(getSeconds(totalTime));


  const handleSubmit = (e) => {
    e.preventDefault();
    
    const totalseconds = getTotalSeconds(hours, minutes, seconds);
    if(totalseconds === 0) { return ; }
    setTotalTime(totalseconds);

    setTimeSet(true);
  }

  return ( 
    <div className="container">    
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Program Length:</legend>
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
          </div>
          {!timeSet && <button type="submit">Set Time</button>}
          {timeSet && 
            <div>
              <h1>Great!!!</h1>
              <p>You can still edit your program time, but let's go add a pose.</p>
              <button type="submit">Set Time</button>
              <Link to="/pose">
                <button>Add A Pose</button>
              </Link>
            </div>
          }
        </fieldset>
      </form>
    </div>
   );
}
 
export default TimeForm;

