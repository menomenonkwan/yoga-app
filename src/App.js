import { useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Program from './components/Program';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import { Move } from './components/assets/Helpers';
import { AnimatePresence, motion } from 'framer-motion';
import Build from './components/Build';
import Login from './components/Login';
import Account from './components/assets/Account';
import firebase from './firebase';
import MobileMenu from './components/assets/MobileMenu.js';

const variants = {
  hidden: { opacity: 0,},
  visible: { opacity: 1,
    transition: { duration: 0.5 }
  }
}

function App() {
  const [totalTime, setTotalTime] = useState(0);
  const [poses, setPoses] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();
  const auth = firebase.auth();

  const signOut = () => {
    auth.signOut().then(() => {
      console.log('user has signed out');
      setCurrentUser(null);
      setTotalTime(0);
      setPoses([]);
    });
  }

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
      <Header 
        currentUser={currentUser} 
        signOut={signOut}
      />
      <MobileMenu 
        currentUser={currentUser} 
        signOut={signOut}
      />
      <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.key}>
        <Route path="/program">
          <Program 
            poses={poses}
            totalTime={totalTime}
          />
        </Route>
        <Route path="/build">
          <Build 
            poses={poses}
            setPoses={setPoses}
            totalTime={totalTime}
            setTotalTime={setTotalTime}
            movePosition={movePosition} 
            deletePose={deletePose}
            currentUser={currentUser}
          />
        </Route>
        <Route path="/login">
          <Login 
            auth={auth}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            signOut={signOut}
            setPoses={setPoses}
          />
        </Route>
        <Route path="/account">
          <Account 
            currentUser={currentUser}
            signOut={signOut}
            setPoses={setPoses}
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
