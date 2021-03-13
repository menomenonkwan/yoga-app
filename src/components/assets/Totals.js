import { displayTime, getTotalTime } from './Helpers';

const Totals = ({ totalTime, poses }) => {
  const remainingTime = totalTime - getTotalTime(poses);

  return ( 
    <div className="totals">
      <div className="totals-display">
        <h3>Total Time: 
          <span>
            {displayTime(getTotalTime(poses))}
          </span>
        </h3>
        <h3>Time Remaining: 
          <span className={remainingTime < 0 ? 'overtime' : ''}>
            {displayTime(remainingTime)}
          </span>
        </h3>
      </div>
    </div>
  );
}
 
export default Totals;