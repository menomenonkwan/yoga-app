import { useState, useEffect } from 'react';
import firebase from '../../firebase';
import { motion } from 'framer-motion';
import { NavLink as Link } from 'react-router-dom';
import { displayTime } from './Helpers';

function useProgram(currentUser) {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection(currentUser.user.email)
      .onSnapshot((snapshot) => {
        const savedPrograms = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setPrograms(savedPrograms);
      })

      return () => unsubscribe();
  }, [currentUser]);

  return programs;
}



const Account = ({ currentUser, signOut, setPoses }) => {
  const programs = useProgram(currentUser);
  const db = firebase.firestore();

  const handleClick = (e) => {
    const selection = e.currentTarget.value;
    const newProgram = programs[selection].program;
    setPoses(newProgram);
  }

  const handleDelete = (e) => {
    const selection = e.currentTarget.value;
    const id = programs[selection].id;

    db.collection(currentUser.user.email).doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
  }


  return ( 
    <div className="container account"
      style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}
    >
      <h1>{currentUser ? currentUser.user.email : null}</h1>
      <h2 style={{
        color: 'var(--dark)'
      }}>saved programs</h2>
      <div className="saved-programs-grid">
        {programs.map((program, index) => (
          <div key={program.id} className="saved-list">
            <h3>{program.title}</h3>
            <Link to='/build'>
            <motion.button
              value={index}
              onClick={handleClick}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1, cursor: 'pointer' }}
            >select
            </motion.button>
            </Link>
            <motion.button
              value={index}
              onClick={handleDelete}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1, cursor: 'pointer' }}
              style={{ backgroundColor: 'var(--orange)', color: 'var(--white)'}}
            >delete
            </motion.button>
            <ol className="saved-pose-list">
              {program.program.map(pose => (
                <li key={pose.id} className="saved-pose">{pose.name} - {displayTime(pose.duration)}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      <Link 
        to="/" 
        style={{ textDecoration: 'none' }}
      >
      <motion.button 
          type="button" 
          onClick={signOut}
          style={{ margin: 0 }}
          className="off"
          whileHover={{ cursor: 'pointer', scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Sign Out
        </motion.button>
      </Link>
    </div>
   );
}
 
export default Account;