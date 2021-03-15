import React, { useState } from 'react';
import List from './List';
import { Link } from 'react-router-dom';
import SlideEditForm from './SlideEditForm';
import Totals from './assets/Totals';
import { motion } from 'framer-motion';
import firebase from '../firebase';

const variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
}

const Edit = ({ poses, setPoses, movePosition, deletePose, totalTime, currentUser }) => {
  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [savingProgram, setSavingProgram] = useState(false);

  const editPose = (index) => {
    setEditIndex(index);
     setEdit(!edit);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.currentTarget.name.value;
    setSavingProgram(false);
    firebase
      .firestore()
      .collection(`${currentUser.user.email}`)
      .add({
        title,
        program: poses
      });
  }

  return ( 
    <div className="section-list">
      <h2>Current Program</h2>
      {savingProgram 
        ? <motion.form 
            onSubmit={handleSubmit}
            variants={variants}
            initial="hidden"
            animate="show"
          >
            <input 
            className="edit-input"
            type="text" 
            name="name"
            placeholder="Enter program name..." 
          />
          <motion.button 
            type="submit" 
            className={totalTime && poses.length > 0 ? 'on' : 'off'}
            whileHover={{
              scale:1.1,
              color: 'var(--bright)'
            }}
            whileTap={{scale:0.9}}
            disabled={!totalTime || poses.length <= 0}
          >
            Save
          </motion.button>
          </motion.form>
        : <motion.div
            variants={variants}
            initial="hidden"
            animate="show"
          >
          <Link to={totalTime && poses.length > 0 ? '/program' : '#'} >
            <motion.button 
              type="button" 
              className={totalTime && poses.length > 0 ? 'on' : 'off'}
              whileHover={{
                scale:1.1,
                color: 'var(--bright)'
              }}
              whileTap={{scale:0.9}}
              disabled={!totalTime || poses.length <= 0}
            >
              Start
            </motion.button>
          </Link> 
          <motion.button 
            type="button" 
            className={totalTime && poses.length > 0 && currentUser ? 'on' : 'off'}
            whileHover={{
              scale:1.1,
              color: 'var(--bright)'
            }}
            whileTap={{scale:0.9}}
            disabled={!totalTime || poses.length <= 0 }
            onClick={() => setSavingProgram(true)}
          >
            Save
          </motion.button>
          <motion.button 
            type="button" 
            className="on" 
            onClick={() => setPoses([])}
            whileHover={{
              scale:1.1,
              color: 'var(--bright)'
            }}
            whileTap={{scale:0.9}}
            style={{ 
              color: 'rgba(0,0,0,0.5)',
              backgroundColor: 'var(--purple)',
              border: '1px solid var(--dark)'
            }}
          >
            Clear Program
          </motion.button>
          </motion.div> 
      }
      <Totals 
        totalTime={totalTime} 
        poses={poses}
      />
      {edit 
        ? <SlideEditForm 
            index={editIndex}
            poses={poses}
            setPoses={setPoses}
            setEdit={setEdit}
          />
        : <List 
            poses={poses} 
            movePosition={movePosition} 
            editPose={editPose}
            deletePose={deletePose}
            setPoses={setPoses}
          />
      }
    </div>
  );
}
 
export default Edit;