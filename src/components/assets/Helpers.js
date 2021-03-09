import React from 'react';

const Move = (arr, from, to) => {
  let newLocation = from + to;

  // added to prevent first from becoming last
  if(newLocation < 0) { newLocation = 0;}

  const item = arr.splice(from, 1);
  arr.splice(newLocation, 0, item[0]);

  return arr;
}

const getTotalSeconds = (hrs = 0, mins = 0, secs = 0) => {
  const hours = parseInt(hrs) * 60 * 60;
  const minutes = parseInt(mins) * 60;
  const seconds = parseInt(secs) * 1;
  const totalSeconds = (hours ? hours : 0) + (minutes ? minutes : 0) + (seconds ? seconds : 0);

  return totalSeconds;
}

const getHours = (duration) => {
  const hours = Math.floor(duration / 3600);
  return hours;
}

const getMinutes = (duration) => {
  const minutes = (Math.floor(duration / 60) % 60);
  return minutes;
}

const getSeconds = (duration) => {
  const seconds = duration % 60;
  return seconds;
}

// const AddToTime = (time) => {
//   const noTime = { duration: 0}
//   const reducedTime = time.reduce((a, b) => ({duration: a.duration + b.duration}), noTime);
  
//   const totalTime = reducedTime.duration;
//   const hrs = Math.floor(totalTime / 3600);
//   const min = Math.floor(totalTime / 60) % 60;
//   const sec = totalTime % 60;
//   const newTime = {
//     duration: totalTime,
//     hours: hrs,
//     minutes: min,
//     seconds: sec,
//   };

//   return newTime;
// }

const displayTime = (duration) => {
  let number = duration;

  if(duration < 0) {
    const positive = duration.toString().substring(1);
    number = parseInt(positive);
  }

  return (
    <React.Fragment>
      {duration < 0 ? '-' : ''}
      {Math.floor(number / 3600) > 0 ? `${Math.floor(number / 3600)}:` : ''}{('0' + Math.floor(number / 60) % 60).slice(-2)}:{('0' + number % 60).slice(-2)}
    </React.Fragment>
  );
}

const getTotalTime = (arr) => {
  const time = arr.reduce((total, cur) => {
    return total + cur.duration;
  }, 0);

  return time;
}

export { Move, getTotalSeconds, displayTime, getHours, getMinutes, getSeconds, getTotalTime };
