import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { displayTime } from './Helpers';

const CircleTimer = ({ timerOn, completePose, currentPose }) => {
  return (
    <CountdownCircleTimer 
      isPlaying={timerOn}
      duration={currentPose.duration}
      colors={[
          ['#282b66', 0.33],
          ['#cab665', 0.33],
          ['#825142', 0.33]
        ]}
      trailColor='#a3b4aa'
      size={350}
      strokeWidth={20}
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