import { useState } from 'react';
import { Link } from 'react-router-dom';
import TimeSelect from './assets/TimeSelect';
import { hoursArr, minsArr, intArr } from './assets/Content';
import { getTotalSeconds } from './assets/Helpers';
import uniqid from 'uniqid';
import PoseSelection from './assets/PoseSelection';

const PoseForm = ({ poses, setPoses }) => {
  const [newPose, setNewPose] = useState(true);
  const [names, setNames] = useState([]);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [intervals, setIntervals] = useState(1);



  const handleSubmit = (e) => {
    e.preventDefault();

    const totalSeconds = getTotalSeconds(hours, minutes, seconds);
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
  }         

  return ( 
    <div className="container">
      {newPose ?
        <form onSubmit={handleSubmit} >
          <fieldset>
            <legend>Add A Pose:</legend>         
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
            <button type="submit">Add Pose</button>       
          </fieldset>
        </form>
        : 
        <div>
          <h1>Awesome!</h1>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <button onClick={()=>setNewPose(!newPose)}>Add Pose</button>
            <Link to="/edit">
              <button>Edit Program</button>
            </Link>
          </div>
        </div>
      } 
    </div>
   );
}
 
export default PoseForm;