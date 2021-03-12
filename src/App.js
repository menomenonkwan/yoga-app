import React, { useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import TimeForm from './components/TimeForm';
import PoseForm from './components/PoseForm';
import Program from './components/Program';
import Footer from './components/Footer';
import Edit from './components/Edit';
import NotFound from './components/NotFound';
// import Totals from './components/assets/Totals';
import { Move } from './components/assets/Helpers';
import { poseList as Sample, sampleTime } from './components/assets/Content';
import { AnimatePresence, motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0,},
  visible: { opacity: 1,
    transition: { duration: 0.5 }
  }
}

function App() {
  const [totalTime, setTotalTime] = useState(sampleTime);
  const [poses, setPoses] = useState([ ...Sample ]);
  const location = useLocation();

  const deletePose = (index) => {
    const adjustedPoses = [ ...poses ];
    adjustedPoses.splice(index, 1);
    
    setPoses(adjustedPoses);
  }

  const movePosition = (index, newIndex) => {
    const posesCopy = [ ...poses ];
    const newPoseOrder = Move(posesCopy, index, newIndex);

    setPoses(newPoseOrder);
  }

  return (
    <motion.div className="App"
      variants={variants}
      initial="hidden"
      animate="visible"     
    >
      <Header />
      {/* {totalTime > 0 &&
      <Totals 
        totalTime={totalTime} 
        poses={poses}
        setPoses={setPoses}
      />} */}
      <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.key}>
        <Route path="/time">
          <TimeForm 
            totalTime={totalTime} 
            setTotalTime={setTotalTime}
            />
        </Route>
        <Route path="/pose">
          <PoseForm 
            poses={poses} 
            setPoses={setPoses}
            totalTime={totalTime}
            />
        </Route>
        <Route path="/edit">
          <Edit 
            poses={poses} 
            setPoses={setPoses}
            movePosition={movePosition} 
            deletePose={deletePose}
            totalTime={totalTime}
          />
        </Route>
        <Route path="/program">
          <Program 
            poses={poses}
            totalTime={totalTime}
          />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route component={NotFound} />
      </Switch>
      </AnimatePresence>
      <Footer />
    </motion.div>
  );
}

export default App;
