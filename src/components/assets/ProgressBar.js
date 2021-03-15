import { displayTime } from './Helpers';
import { useEffect } from 'react';
import useCountDown from 'react-countdown-hook';

const ProgressBar = ({ totalTime }) => {
  const initialTime = totalTime * 1000; 
  const interval = 1000; 
  const [timeLeft, { start }] = useCountDown(initialTime, interval);
  let color;
  const elapsed = ((timeLeft / 1000) / totalTime);
  const percent = 100 - Math.round(elapsed * 100);  
  
  useEffect(() => {
    start();
  }, [start]);

  if(percent >= 50) { color = 'var(--light)'; } else { color = 'var(--purple)'}
  
  return ( 
    <div id="progress-bar">
      <div 
        id="program-progress" 
        style={{
          backgroundColor: `${color}`,
          width: `${percent}` < 3 ? 0 : `${percent}%`,
        }}
      >
        <p className="progress-left">
          {displayTime(timeLeft / 1000)}
        </p>
        <p className="progress-right">
          {percent ? percent : '0'}%
        </p>
      </div>
    </div>
   );
}
 
export default ProgressBar;