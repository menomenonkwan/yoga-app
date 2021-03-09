import { displayTime, getTotalTime } from './assets/Helpers';

const Totals = ({ totalTime, poses, setPoses }) => {
  const remainingTime = totalTime - getTotalTime(poses);

  return ( 
    <div className="totals">
      <h2>Program Time: 
        <span>
          {displayTime(totalTime)}
        </span>
      </h2>
      <button type="button" onClick={() => setPoses([])}>
        Clear Program
      </button>
      <h2>Time Remaining: 
        <span className={remainingTime < 0 ? 'overtime' : ''}>
          {displayTime(remainingTime)}
        </span>
      </h2>
    </div>
   );
}
 
export default Totals;