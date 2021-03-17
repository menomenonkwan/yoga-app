import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { displayTime, getRandomInt } from './Helpers';
import { quotes } from './Content';
import tone from './audio/mixkit-happy-bell-alert-601.wav';

const alertBell = (time, bell) => {
  if(time === 5) {
    bell.play();
  }
}

const CircleTimer = ({ timerOn, completePose, currentPose }) => {
  const bell = new Audio(tone); 
  const text = quotes[ (getRandomInt(quotes.length)) ];

  return (
    <CountdownCircleTimer
      isPlaying={timerOn}
      duration={currentPose.duration}
      colors={[
          ['#282b66', 0.33],
          ['#675a69', 0.33],
          ['#9D1C4D', 0.33],
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
        flexDirection: 'column'
      }}
      >
      {remainingTime < 5 && <div style={{
        backgroundColor: 'var(--lightpurple)',
        filter: 'brightness(0.9)',
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: '-1',
      }}></div>}
      <p 
        style={{ 
          color: 'var(--dark)', 
          fontSize: '8rem',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
        }}
        >
      { displayTime(remainingTime) }
      { alertBell(remainingTime, bell) }
      </p>
      <p style={{ fontSize: '1.5rem' }}>{text}</p>
      </div>
      )}
  </CountdownCircleTimer>
  );
}

export default CircleTimer;