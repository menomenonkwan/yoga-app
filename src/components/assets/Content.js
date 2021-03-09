const poseList = [
  {id: 1, name: 'one', duration: 1},
  {id: 2, name: 'two', duration: 2},
  {id: 3, name: 'three', duration: 1},
  // {id: 4, name: 'four', duration: 5},
  // {id: 5, name: 'five', duration: 1},
  // {id: 6, name: 'six', duration: 4},
  // {id: 7, name: 'seven', duration: 3},
  // {id: 8, name: 'eight', duration: 4},
  // {id: 9, name: 'nine', duration: 2},
];

const countdown = [
  {id: 0, name: 'countdown', duration: 2}
];

const sampleTime = 60;

const poseNames = [
  { value: 'oneoneone', label: 'oneoneone' },
  { value: 'twotwowtwo', label: 'twotwowtwo' },
  { value: 'threethreethree', label: 'threethreethree' },
  { value: 'fourfourfour', label: 'fourfourfour' },
  { value: 'fivefivefive', label: 'fivefivefive' },
  { value: 'sixsixsix', label: 'sixsixsix' },
  { value: 'sevensevenseven', label: 'sevensevenseven' },
  { value: 'eighteighteight', label: 'eighteighteight' },
  { value: 'nineninenine', label: 'nineninenine' },
  { value: 'tententen', label: 'tententen' },
];

const hoursArr = new Array(24).fill(null).map((_,i) => ({ id: `${i}`, value: `${i}` }));
const minsArr = new Array(60).fill(null).map((_,i) => ({ id: `${i}`, value: `${i}` }));
const intArr = new Array(10).fill(null).map((_,i) => ({ id: `${parseInt(i) + 1}`, value: `${parseInt(i) + 1}` }));

export { poseList, sampleTime, poseNames, hoursArr, minsArr, intArr, countdown };