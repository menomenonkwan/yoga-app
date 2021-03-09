import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { displayTime } from './Helpers';

const CircleTimer = ({ timerOn, completePose, currentPose }) => {

  return (
    <CountdownCircleTimer 
      isPlaying={timerOn}
      duration={currentPose.duration}
      colors={[
          ['#004777', 0.33],
          ['#F7B801', 0.33],
          ['#A30000', 0.33],
        ]}
      size={300}
      onComplete={completePose}
    >
    {({ remainingTime }) => (
      <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
      >
      <p 
        style={{ 
          color: 'var(--dark)', 
          fontSize: '8rem',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
        }}
        >
      { displayTime(remainingTime) }
      </p>
      <p style={{ fontSize: '1.5rem' }}>You Can Do It!</p>
      </div>
      )}
  </CountdownCircleTimer>
  );
}

export default CircleTimer;