import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getTotalSeconds } from './assets/Helpers';
import uniqid from 'uniqid';

{/* <form onSubmit={handleSubmit}>
<fieldset>
  <legend>Program Length:</legend>
  <label>Hours</label>
  <input 
    type="number" 
    name="hours"
    min="0" 
    max="24" 
    value={hours}
    onChange={handleChange}
  />
  <label>Minutes</label>
  <input 
    type="number" 
    name="minutes"
    min="0" 
    max="59" 
    value={minutes}
    onChange={handleChange}
  />
  {!timeSet && <button type="submit">Set Time</button>}
</fieldset>
</form> */}

// const PoseForm = ({ poses, setPoses }) => {
//   const [newPose, setNewPose] = useState(true);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const form = e.target;
//     const name = form[1].value;
//     const hours = form[2].value;
//     const minutes = form[3].value;
//     const seconds = form[4].value;
//     let intervals = parseInt(form[5].value);
//     const totalSeconds = getTotalSeconds(hours, minutes, seconds);

//     if(!name || totalSeconds === 0) { return ; }
//     if(!intervals) { intervals = 1; }

//     let newPoses = [];
//     [...Array(intervals)].forEach(() => (
//       newPoses.push(
//         {
//           id: `pose${uniqid()}`,
//           name,
//           duration: totalSeconds,
//         }
//       )
//     ));
//     setPoses([ ...poses, ...newPoses ]);
//     form.reset();
//     setNewPose(!newPose);
//   }

//   return ( 
//     <div className="container">
//       {newPose ?
//         <form onSubmit={handleSubmit} >
//           <fieldset>
//             <legend>Add A Pose:</legend>
//             <input 
//               type="text" 
//               placeholder="name" 
//             />
//             <label>Hours</label>
//             <input 
//               type="number" 
//               placeholder="hours (0 - 24)"
//               min="0" 
//               max="24" 
//             />
//             <label>Minutes</label>
//             <input 
//               type="number" 
//               placeholder="minutes (0 - 59)" 
//               min="0" 
//               max="59" 
//             />  
//             <label>Seconds</label>      
//             <input 
//               type="number" 
//               placeholder="seconds (0 - 59)" 
//               min="0" 
//               max="59" 
//             />     
//             <label>Intervals</label>   
//             <input 
//               type="number" 
//               placeholder="intervals" 
//               min="1" 
//               max="10" 
//             /> 
//             <button type="submit">Add Pose</button>       
//           </fieldset>
//         </form>
//         : 
//         <div>
//           <h1>Awesome!</h1>
//           <div style={{display: 'flex', flexDirection: 'column'}}>
//             <button onClick={()=>setNewPose(!newPose)}>Add Pose</button>
//             <Link to="/edit">
//               <button>Edit Program</button>
//             </Link>
//           </div>
//         </div>
//       } 
//     </div>
//    );
// }
 
// export default PoseForm;